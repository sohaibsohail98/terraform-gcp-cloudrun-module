output "service_url" {
  value       = google_cloud_run_v2_service.hello_world_service.uri
  description = "Direct URL of the deployed Cloud Run service"
}

output "load_balancer_ip" {
  value       = google_compute_global_address.default.address
  description = "Load balancer IP address"
}

output "application_url" {
  value       = "http://${google_compute_global_address.default.address}"
  description = "Public URL to access the application via load balancer"
}

output "application_urls" {
  description = "URLs to access the application"
  value = var.enable_ssl && var.domain_name != "" ? [
    "https://${var.domain_name}",
    "https://www.${var.domain_name}",
    "http://${google_compute_global_address.default.address}"
    ] : [
    "http://${google_compute_global_address.default.address}"
  ]
}

output "ssl_certificate_name" {
  description = "Name of the SSL certificate"
  value       = var.enable_ssl && var.domain_name != "" ? google_compute_managed_ssl_certificate.default[0].name : "SSL disabled"
}

output "artifact_registry_url" {
  value       = "${var.region}-docker.pkg.dev/${var.project_id}/${var.repository_id}"
  description = "Artifact Registry repository URL"
}

output "service_account_email" {
  value       = google_service_account.cloud_run_sa.email
  description = "Service account email"
}

output "security_policy_name" {
  value       = google_compute_security_policy.default.name
  description = "Cloud Armor security policy name"
}