# 🎬 StreamFlix - AWS OTT Platform

A production-style video streaming platform built with modern AWS services and DevOps practices.

## 🚀 Features

- **User Management**: Registration, authentication, profile management
- **Content Delivery**: Video streaming with HLS/DASH, adaptive bitrate
- **Recommendations**: ML-based content recommendations
- **Admin Dashboard**: Content upload and management
- **Scalable Architecture**: Kubernetes on AWS EKS
- **CI/CD Pipeline**: Automated deployments with GitHub Actions
- **Monitoring**: Full observability stack (Prometheus, Grafana, ELK)
- **Security**: IAM, WAF, TLS, Secrets Management

## 🏗️ Architecture

![Architecture Diagram](docs/architecture/system-architecture.md)

### Core Services

- **Frontend**: Next.js + React (Server-side rendering)
- **Backend**: Node.js + Express (REST API)
- **Database**: PostgreSQL (RDS) + DynamoDB (NoSQL)
- **Cache**: Redis (ElastiCache)
- **CDN**: CloudFront with Edge Caching
- **Container Platform**: Amazon EKS
- **Video Processing**: AWS Elemental MediaConvert
- **Storage**: S3 for video files and static assets
- **CI/CD**: GitHub Actions

## 📋 Prerequisites

- Node.js (v18+)
- Docker & Docker Compose
- AWS CLI configured with appropriate credentials
- Terraform (v1.0+)
- kubectl & Helm
- Git

## 🔧 Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/streamflix.git
cd streamflix