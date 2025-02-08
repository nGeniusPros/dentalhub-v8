FROM nvidia/cuda:12.1.1-base-ubuntu22.04

WORKDIR /app

# Install system dependencies
RUN apt-get update && \
    apt-get install -y \
    python3 \
    python3-pip \
    curl \
    git \
    build-essential \
    ninja-build \
    && rm -rf /var/lib/apt/lists/*

# Set environment variables for CUDA
ENV CUDA_HOME=/usr/local/cuda
ENV PATH=${CUDA_HOME}/bin:${PATH}
ENV LD_LIBRARY_PATH=${CUDA_HOME}/lib64:${LD_LIBRARY_PATH}

# Install Python dependencies
COPY llm-requirements.txt .
RUN pip3 install --no-cache-dir -r llm-requirements.txt

# Copy API implementation
COPY deepseek_api.py .

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8000/health || exit 1

EXPOSE 8000

CMD ["python3", "-m", "uvicorn", "deepseek_api:app", "--host", "0.0.0.0", "--port", "8000"]
