resource "google_service_account" "cloud_run_sa" {
  account_id   = var.service_account_name
  display_name = "${var.service_name} Service Account"
  description  = "Service account for Cloud Run service ${var.service_name}"
}

# Grant minimal required roles to the service account
resource "google_project_iam_member" "cloud_run_sa_roles" {
  for_each = toset([
    "roles/logging.logWriter",
    "roles/monitoring.metricWriter"
  ])

  project = var.project_id
  role    = each.key
  member  = "serviceAccount:${google_service_account.cloud_run_sa.email}"
}