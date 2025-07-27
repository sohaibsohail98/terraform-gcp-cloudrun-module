resource "google_cloud_run_v2_service" "hello_world_service" {
  name     = var.service_name
  location = var.region
  ingress  = "INGRESS_TRAFFIC_INTERNAL_LOAD_BALANCER" # Traffic via load balancer only

  template {
    containers {
      image = var.container_image

      ports {
        container_port = var.container_port
      }

      env {
        name  = "NODE_ENV"
        value = var.environment == "prod" ? "production" : "development"
      }

      startup_probe {
        timeout_seconds   = var.startup_probe_timeout_seconds
        period_seconds    = var.startup_probe_period_seconds
        failure_threshold = var.startup_probe_failure_threshold
        tcp_socket {
          port = var.container_port
        }
      }

      resources {
        limits = {
          cpu    = "1000m"
          memory = "512Mi"
        }
      }
    }

    scaling {
      min_instance_count = var.min_instance_count
      max_instance_count = var.max_instance_count
    }

    service_account = google_service_account.cloud_run_sa.email
  }

  traffic {
    percent = 100
    type    = "TRAFFIC_TARGET_ALLOCATION_TYPE_LATEST"
  }
}
# Allow unauthenticated access to the Cloud Run service
resource "google_cloud_run_service_iam_member" "public_access" {
  location = google_cloud_run_v2_service.hello_world_service.location
  service  = google_cloud_run_v2_service.hello_world_service.name
  role     = "roles/run.invoker"
  member   = "allUsers"
}
