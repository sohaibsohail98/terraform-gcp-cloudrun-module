resource "google_compute_security_policy" "default" {
  name        = "${var.service_name}-security-policy"
  description = "Security policy for ${var.service_name} with rate limiting and basic protections"

  # Default rule - allow all with rate limiting
  rule {
    action   = "allow"
    priority = "2147483647"
    match {
      versioned_expr = "SRC_IPS_V1"
      config {
        src_ip_ranges = ["*"]
      }
    }
    description = "Default allow with rate limiting"
    rate_limit_options {
      rate_limit_threshold {
        count        = 100
        interval_sec = 60
      }
      ban_duration_sec = 600
      ban_threshold {
        count        = 1000
        interval_sec = 600
      }
    }
  }

  # Block common attack patterns
  rule {
    action   = "deny(403)"
    priority = "1000"
    match {
      expr {
        expression = "origin.region_code == 'CN' || origin.region_code == 'RU'"
      }
    }
    description = "Block traffic from high-risk regions"
  }

  # Rate limiting for specific paths
  rule {
    action   = "rate_based_ban"
    priority = "2000"
    match {
      expr {
        expression = "request.path.matches('/api/')"
      }
    }
    description = "Rate limit API endpoints"
    rate_limit_options {
      rate_limit_threshold {
        count        = 50
        interval_sec = 60
      }
      ban_duration_sec = 300
      ban_threshold {
        count        = 100
        interval_sec = 300
      }
    }
  }

  # OWASP Top 10 protection
  rule {
    action   = "deny(403)"
    priority = "3000"
    match {
      expr {
        expression = <<-EOF
          has(request.headers['user-agent']) && 
          (request.headers['user-agent'].contains('sqlmap') ||
           request.headers['user-agent'].contains('nikto') ||
           request.headers['user-agent'].contains('nmap') ||
           request.headers['user-agent'].contains('masscan'))
        EOF
      }
    }
    description = "Block known attack tools"
  }

  # Allow Google health checks
  rule {
    action   = "allow"
    priority = "500"
    match {
      versioned_expr = "SRC_IPS_V1"
      config {
        src_ip_ranges = [
          "130.211.0.0/22",
          "35.191.0.0/16",
          "35.235.240.0/20"
        ]
      }
    }
    description = "Allow Google Cloud health checks"
  }

  adaptive_protection_config {
    layer_7_ddos_defense_config {
      enable          = true
      rule_visibility = "STANDARD"
    }
  }
}