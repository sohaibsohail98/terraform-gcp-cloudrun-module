# Global IP address
resource "google_compute_global_address" "default" {
  name = "${var.service_name}-global-ip"
}

# NEG for Cloud Run
resource "google_compute_region_network_endpoint_group" "cloudrun_neg" {
  name                  = "${var.service_name}-neg"
  network_endpoint_type = "SERVERLESS"
  region                = var.region
  cloud_run {
    service = google_cloud_run_v2_service.hello_world_service.name
  }
}

# Backend service
resource "google_compute_backend_service" "default" {
  name                  = "${var.service_name}-backend"
  load_balancing_scheme = "EXTERNAL"
  protocol              = "HTTP"
  port_name             = "http"
  timeout_sec           = 30

  backend {
    group = google_compute_region_network_endpoint_group.cloudrun_neg.id
  }

  security_policy = google_compute_security_policy.default.id

  log_config {
    enable      = true
    sample_rate = 1.0
  }
}

# URL map
resource "google_compute_url_map" "default" {
  name            = "${var.service_name}-urlmap"
  default_service = google_compute_backend_service.default.id

  host_rule {
    hosts        = var.domain_name != "" ? [var.domain_name, "www.${var.domain_name}"] : ["*"]
    path_matcher = "allpaths"
  }

  path_matcher {
    name            = "allpaths"
    default_service = google_compute_backend_service.default.id

    path_rule {
      paths   = ["/health"]
      service = google_compute_backend_service.default.id
    }

    path_rule {
      paths   = ["/api/*"]
      service = google_compute_backend_service.default.id
    }
  }
}

# SSL certificate (conditional)
resource "google_compute_managed_ssl_certificate" "default" {
  count = var.enable_ssl && var.domain_name != "" ? 1 : 0
  name  = "${var.service_name}-ssl-cert"

  managed {
    domains = [var.domain_name, "www.${var.domain_name}"]
  }
}

# HTTPS proxy (conditional)
resource "google_compute_target_https_proxy" "default" {
  count            = var.enable_ssl && var.domain_name != "" ? 1 : 0
  name             = "${var.service_name}-https-proxy"
  url_map          = google_compute_url_map.default.id
  ssl_certificates = [google_compute_managed_ssl_certificate.default[0].id]
}

# HTTP proxy
resource "google_compute_target_http_proxy" "default" {
  name    = "${var.service_name}-http-proxy"
  url_map = google_compute_url_map.default.id
}

# Global forwarding rule (HTTPS)
resource "google_compute_global_forwarding_rule" "https" {
  count                 = var.enable_ssl && var.domain_name != "" ? 1 : 0
  name                  = "${var.service_name}-https-forwarding-rule"
  ip_protocol           = "TCP"
  load_balancing_scheme = "EXTERNAL"
  port_range            = "443"
  target                = google_compute_target_https_proxy.default[0].id
  ip_address            = google_compute_global_address.default.id
}

# Global forwarding rule (HTTP)
resource "google_compute_global_forwarding_rule" "http" {
  name                  = "${var.service_name}-http-forwarding-rule"
  ip_protocol           = "TCP"
  load_balancing_scheme = "EXTERNAL"
  port_range            = "80"
  target                = google_compute_target_http_proxy.default.id
  ip_address            = google_compute_global_address.default.id
}