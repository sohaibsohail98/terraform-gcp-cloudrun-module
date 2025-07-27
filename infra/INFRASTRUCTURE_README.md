# Infrastructure Setup for Vertex AI Reasoning Engine

This document explains the infrastructure changes required to support the Google Auth Library and Vertex AI Reasoning Engine integration.

## Key Changes Made

### 1. Service Account Permissions (`iam.tf`)

Added the following IAM roles to the Cloud Run service account:

- `roles/aiplatform.user` - Access to Vertex AI services
- `roles/ml.developer` - Machine Learning APIs access

### 2. Environment Variables (`cloud_run.tf`)

The Cloud Run service now includes these environment variables:

- `GOOGLE_CLOUD_PROJECT_ID` - Automatically set to the project ID
- `GOOGLE_CLOUD_LOCATION` - Location for Vertex AI services (us-central1)
- `VERTEX_AI_AGENT_ENGINE_ID` - Your reasoning engine ID

### 3. New Terraform Variables (`variables.tf`)

Added variables for Vertex AI configuration:

- `vertex_ai_agent_engine_id` - The reasoning engine ID
- `google_cloud_location` - Location for Vertex AI (defaults to us-central1)

### 4. Updated Configuration (`vars/dev.tfvars`)

Added the specific values for your environment:

```hcl
vertex_ai_agent_engine_id = "8007584855418208256"
google_cloud_location     = "us-central1"
```

## Authentication in Cloud Run

### How it Works in Production

1. **Service Account**: Cloud Run uses the service account defined in `iam.tf`
2. **Application Default Credentials (ADC)**: The Google Auth Library automatically uses the service account attached to Cloud Run
3. **No Manual Token Management**: Tokens are automatically refreshed by Google's infrastructure

### Key Benefits

- ✅ **Automatic token refresh** - No manual JWT token management
- ✅ **Secure** - Uses Google's recommended authentication patterns
- ✅ **Scalable** - Works across multiple instances
- ✅ **Auditable** - All API calls are logged with the service account identity

## Deployment Process

### Option 1: Using the Deploy Script

```bash
cd infra/
./deploy.sh
```

### Option 2: Manual Deployment

```bash
cd infra/

# 1. Build and push the Docker image
IMAGE_PATH="europe-west2-docker.pkg.dev/hello-world-app-project/hello-world-repo/hello-world-app:latest"
docker build -f dockerfile -t $IMAGE_PATH ..
gcloud auth configure-docker europe-west2-docker.pkg.dev
docker push $IMAGE_PATH

# 2. Apply Terraform changes
terraform init
terraform plan -var-file=vars/dev.tfvars
terraform apply -var-file=vars/dev.tfvars
```

## Environment Differences

### Local Development

- Uses `gcloud auth application-default login`
- Reads from `.env.local` file
- Direct access to your user credentials

### Cloud Run Production

- Uses the attached service account
- Reads environment variables from Cloud Run configuration
- Automatic ADC via metadata server

## Troubleshooting

### Common Issues

1. **Permission Denied Errors**

   ```
   Solution: Ensure the service account has the required IAM roles
   Check: gcloud projects get-iam-policy hello-world-app-project
   ```

2. **Authentication Errors in Logs**

   ```
   Solution: Verify the service account is properly attached to Cloud Run
   Check: Cloud Run service configuration in GCP Console
   ```

3. **Environment Variables Not Set**
   ```
   Solution: Ensure terraform apply was successful
   Check: Cloud Run service environment variables in GCP Console
   ```

### Verification Commands

```bash
# Check service account permissions
gcloud projects get-iam-policy hello-world-app-project \
  --flatten="bindings[].members" \
  --filter="bindings.members:sa-hello-world-dev@hello-world-app-project.iam.gserviceaccount.com"

# Check Cloud Run service configuration
gcloud run services describe hello-world-app-dev \
  --region=europe-west2 \
  --format="export"
```

## Security Considerations

1. **Least Privilege**: The service account only has the minimum required permissions
2. **Network Security**: Cloud Run service is behind Cloud Armor and Load Balancer
3. **IP Restrictions**: Only allowed IP ranges can access the application
4. **No Hardcoded Secrets**: All authentication is handled via Google's infrastructure

## Monitoring

Monitor the reasoning engine integration through:

- **Cloud Run Logs**: Application logs and errors
- **Cloud Monitoring**: Request metrics and latency
- **Vertex AI Logs**: API usage and performance metrics
