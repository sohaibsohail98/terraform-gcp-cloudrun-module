terraform {
  required_version = ">= 1.7"

  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "6.34.0"
    }
    google-beta = {
      source  = "hashicorp/google-beta"
      version = "6.34.0"
    }
  }

  backend "gcs" {
    bucket = "hello-world-app-terraform-state"
    # prefix is configured dynamically via CLI in the GitHub Actions workflow
    # e.g., "terraform/state/dev" or "terraform/state/prod"
  }
}

provider "google" {
  project = var.project_id
  region  = var.region
  zone    = var.zone
}

provider "google-beta" {
  project = var.project_id
  region  = var.region
  zone    = var.zone
}