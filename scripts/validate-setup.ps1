# scripts/validate-setup.ps1
$ErrorActionPreference = "Stop"

# Verify Docker availability
if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
    throw "Docker not found in PATH"
}

# Start DeepSeek container if missing
$containerId = docker ps -q --filter "name=deepseek"
if (-not $containerId) {
    Write-Host "Starting LLM container..."
    docker-compose -f docker-compose.llm.yml up -d
    
    # Wait for container to start with timeout
    $attempts = 0
    $maxAttempts = 20
    while (-not $containerId -and $attempts -lt $maxAttempts) {
        Start-Sleep -Seconds 5
        $containerId = docker ps -q --filter "name=deepseek"
        $attempts++
        Write-Host "Waiting for container to start... Attempt $attempts of $maxAttempts"
    }
}

if (-not $containerId) {
    throw "DeepSeek container not found after start attempt"
}

# Verify container status
$containerStatus = docker inspect $containerId --format '{{.State.Status}}'
if ($containerStatus -ne "running") {
    throw "DeepSeek container failed to start (Status: $containerStatus)"
}

# Test API health endpoint
try {
    $response = Invoke-WebRequest -Uri http://localhost:8000/health -UseBasicParsing -TimeoutSec 30
    Write-Host "API Health Check Successful: $($response.Content)"
} catch {
    throw "API health check failed: $($_.Exception.Message)"
}

Write-Host "`nSystem validation passed!" -ForegroundColor Green