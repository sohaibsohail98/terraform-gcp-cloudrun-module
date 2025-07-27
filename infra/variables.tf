variable "project_id" {
  description = "GCP project ID"
  type        = string
}

variable "region" {
  description = "GCP region"
  type        = string
}

variable "zone" {
  description = "GCP zone"
  type        = string
}

variable "environment" {
  description = "Environment (e.g., dev, prod)"
  type        = string
}

variable "service_name" {
  description = "Cloud Run service name"
  type        = string
}

variable "repository_id" {
  description = "Artifact Registry repository ID"
  type        = string
}

variable "service_account_name" {
  description = "Service account name for Cloud Run"
  type        = string
}

variable "container_image" {
  description = "Full container image path"
  type        = string
}

variable "container_port" {
  description = "Port the container listens on"
  type        = number
}

variable "min_instance_count" {
  description = "Minimum number of instances"
  type        = number
}

variable "max_instance_count" {
  description = "Maximum number of instances"
  type        = number
}

variable "startup_probe_timeout_seconds" {
  description = "Startup probe timeout in seconds"
  type        = number
}

variable "startup_probe_period_seconds" {
  description = "Startup probe period in seconds"
  type        = number
}

variable "startup_probe_failure_threshold" {
  description = "Startup probe failure threshold"
  type        = number
}

# Optional variables for future enhancements
variable "domain_name" {
  description = "Custom domain name for the application (optional)"
  type        = string
}

variable "enable_ssl" {
  description = "Enable SSL certificate"
  type        = bool
}