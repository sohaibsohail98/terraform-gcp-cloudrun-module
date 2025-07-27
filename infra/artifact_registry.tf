resource "google_artifact_registry_repository" "hello_world_repo" {
  provider      = google-beta
  location      = var.region
  repository_id = var.repository_id
  description   = "Docker repository for ${var.service_name} Hello World application"
  format        = "DOCKER"

  labels = {
    environment = var.environment
  }
}

resource "google_artifact_registry_repository_iam_member" "repo_admin" {
  provider   = google-beta
  project    = var.project_id
  location   = var.region
  repository = google_artifact_registry_repository.hello_world_repo.name
  role       = "roles/artifactregistry.reader"
  member     = "serviceAccount:${google_service_account.cloud_run_sa.email}"
}