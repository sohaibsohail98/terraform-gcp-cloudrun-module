# Project Configuration
project_id  = "hello-world-app-project"
region      = "europe-west2"
zone        = "europe-west2-a"
environment = "dev"

# Repository Configuration
repository_id = "hello-world-repo"

# Service Configuration
service_name         = "hello-world-app-dev"
service_account_name = "sa-hello-world-dev"

# Container Configuration
container_image = "europe-west2-docker.pkg.dev/hello-world-app-project/hello-world-repo/hello-world-app:latest"
container_port  = 3000

# Resource Limits
# cpu_limit          = "1000m"
# memory_limit       = "2Gi"
min_instance_count = 1
max_instance_count = 3

# Startup Probe Configuration
startup_probe_timeout_seconds   = 300
startup_probe_period_seconds    = 15
startup_probe_failure_threshold = 5

# Optional domain configuration (comment out if not needed)
domain_name = "hello-world-app.com"
enable_ssl  = false
