# React Todo 앱과 Firebase에 Terraform 활용하기

React와 Firebase를 사용한 Todo 앱에서 Terraform을 활용하는 방법에 대해 알아보겠습니다. Terraform을 통해 Firebase 인프라를 코드로 관리하면 일관된 환경 구성과 자동화된 배포가 가능해집니다.

## 1. Firebase 프로젝트 및 리소스 관리

Terraform을 사용하여 Firebase 프로젝트와 관련 리소스를 코드로 관리할 수 있습니다:

```hcl
# Firebase 프로젝트 생성
resource "google_firebase_project" "default" {
  provider = google-beta
  project  = google_project.project.project_id
}

# Firestore 데이터베이스 설정
resource "google_firestore_database" "database" {
  provider = google-beta
  project  = google_project.project.project_id
  name     = "(default)"
  location_id = "asia-northeast3" # 서울 리전
  type     = "FIRESTORE_NATIVE"
}

# Firebase 호스팅 설정
resource "google_firebase_hosting_site" "default" {
  provider = google-beta
  project  = google_project.project.project_id
  site_id  = "todo-app"
}
```

## 2. Firebase 인증 및 보안 규칙 관리

Firebase 인증 설정과 보안 규칙을 Terraform으로 관리할 수 있습니다:

```hcl
# Firebase 인증 설정
resource "google_identity_platform_config" "default" {
  provider = google-beta
  project  = google_project.project.project_id
  
  # 이메일/비밀번호 인증 활성화
  sign_in {
    email {
      enabled = true
    }
  }
}

# Firestore 보안 규칙 설정
resource "google_firestore_document" "security_rules" {
  provider    = google-beta
  project     = google_project.project.project_id
  collection  = "_firestore_rules"
  document_id = "security_rules"
  
  fields = jsonencode({
    rules = {
      stringValue = <<-EOT
        rules_version = '2';
        service cloud.firestore {
          match /databases/{database}/documents {
            match /todos/{todoId} {
              allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
            }
          }
        }
      EOT
    }
  })
}
```

## 3. CI/CD 파이프라인 구성

GitHub Actions나 다른 CI/CD 도구와 Terraform을 통합하여 자동화된 배포 파이프라인을 구성할 수 있습니다:

```hcl
# GitHub Actions 배포를 위한 서비스 계정
resource "google_service_account" "github_actions" {
  account_id   = "github-actions"
  display_name = "GitHub Actions Deployment"
  project      = google_project.project.project_id
}

# 서비스 계정에 필요한 권한 부여
resource "google_project_iam_member" "firebase_admin" {
  project = google_project.project.project_id
  role    = "roles/firebase.admin"
  member  = "serviceAccount:${google_service_account.github_actions.email}"
}
```

GitHub Actions 워크플로우 예시:

```yaml
name: Deploy Firebase with Terraform

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Terraform
        uses: hashicorp/setup-terraform@v1
        with:
          terraform_version: 1.0.0
      
      - name: Terraform Init
        run: terraform init
      
      - name: Terraform Apply
        run: terraform apply -auto-approve
        env:
          GOOGLE_CREDENTIALS: ${{ secrets.GOOGLE_CREDENTIALS }}
      
      - name: Deploy React App
        run: |
          npm install
          npm run build
          firebase deploy --only hosting
        env:
          FIREBASE_TOKEN: ${{ secrets.FIREBASE_TOKEN }}
```

## 4. 개발/스테이징/운영 환경 분리

Terraform 워크스페이스나 환경별 구성을 사용하여 여러 환경(개발, 스테이징, 운영)을 관리할 수 있습니다:

```hcl
# 환경별 변수 설정
locals {
  env_config = {
    dev = {
      project_id = "todo-app-dev"
      location   = "asia-northeast3"
      firestore_mode = "DATASTORE_MODE"
    },
    prod = {
      project_id = "todo-app-prod"
      location   = "asia-northeast3"
      firestore_mode = "NATIVE_MODE"
    }
  }
  
  config = local.env_config[terraform.workspace]
}

# 환경별 Firebase 프로젝트 설정
resource "google_firebase_project" "default" {
  provider = google-beta
  project  = local.config.project_id
}
```

환경별 배포 명령어:

```bash
# 개발 환경 배포
terraform workspace select dev
terraform apply

# 운영 환경 배포
terraform workspace select prod
terraform apply
```

## 5. Firebase 함수(Cloud Functions) 관리

Firebase 함수를 Terraform으로 배포하고 관리할 수 있습니다:

```hcl
# Cloud Functions 배포
resource "google_cloudfunctions_function" "todo_api" {
  name        = "todoApi"
  description = "Todo API Functions"
  runtime     = "nodejs16"
  
  available_memory_mb   = 256
  source_archive_bucket = google_storage_bucket.function_bucket.name
  source_archive_object = google_storage_bucket_object.function_zip.name
  trigger_http          = true
  entry_point           = "todoApi"
  
  environment_variables = {
    FIREBASE_CONFIG = jsonencode({
      projectId = google_project.project.project_id
    })
  }
}

# 함수에 대한 공개 접근 허용
resource "google_cloudfunctions_function_iam_member" "invoker" {
  project        = google_project.project.project_id
  region         = google_cloudfunctions_function.todo_api.region
  cloud_function = google_cloudfunctions_function.todo_api.name
  
  role   = "roles/cloudfunctions.invoker"
  member = "allUsers"
}
```

## 6. Firebase 호스팅 및 배포 구성

React 앱의 Firebase 호스팅 설정을 Terraform으로 관리할 수 있습니다:

```hcl
# Firebase 호스팅 사이트 설정
resource "google_firebase_hosting_site" "default" {
  provider = google-beta
  project  = google_project.project.project_id
  site_id  = "${local.config.project_id}-site"
}

# 커스텀 도메인 설정 (필요한 경우)
resource "google_firebase_hosting_custom_domain" "default" {
  provider   = google-beta
  site_id    = google_firebase_hosting_site.default.site_id
  domain_id  = "todo.example.com"
  project    = google_project.project.project_id
}
```

## 실제 구현 시 고려사항

### 1. 권한 설정

Terraform이 Firebase 리소스에 접근하려면 적절한 권한이 필요합니다. Google Cloud 서비스 계정을 생성하고 필요한 권한을 부여해야 합니다:

```hcl
# Terraform용 서비스 계정 생성
resource "google_service_account" "terraform" {
  account_id   = "terraform"
  display_name = "Terraform Service Account"
  project      = google_project.project.project_id
}

# 필요한 권한 부여
resource "google_project_iam_member" "terraform_admin" {
  project = google_project.project.project_id
  role    = "roles/editor"
  member  = "serviceAccount:${google_service_account.terraform.email}"
}

resource "google_project_iam_member" "firebase_admin" {
  project = google_project.project.project_id
  role    = "roles/firebase.admin"
  member  = "serviceAccount:${google_service_account.terraform.email}"
}
```

### 2. 상태 관리

Terraform 상태 파일을 안전하게 관리하기 위해 원격 백엔드(예: GCS 버킷)를 사용하는 것이 좋습니다:

```hcl
terraform {
  backend "gcs" {
    bucket  = "terraform-state-todo-app"
    prefix  = "terraform/state"
  }
  
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 4.0"
    }
    google-beta = {
      source  = "hashicorp/google-beta"
      version = "~> 4.0"
    }
  }
}
```

### 3. 환경 변수 및 비밀 관리

민감한 정보는 환경 변수나 Secret Manager를 통해 관리하는 것이 좋습니다:

```hcl
# Secret Manager 설정
resource "google_secret_manager_secret" "api_key" {
  secret_id = "firebase-api-key"
  
  replication {
    automatic = true
  }
}

resource "google_secret_manager_secret_version" "api_key" {
  secret      = google_secret_manager_secret.api_key.id
  secret_data = var.firebase_api_key
}

# 서비스 계정에 Secret 접근 권한 부여
resource "google_secret_manager_secret_iam_member" "api_key_access" {
  secret_id = google_secret_manager_secret.api_key.id
  role      = "roles/secretmanager.secretAccessor"
  member    = "serviceAccount:${google_service_account.github_actions.email}"
}
```

## 전체 프로젝트 구조 예시

```
firebase-terraform-project/
  ├── main.tf                # 주 구성 파일
  ├── variables.tf           # 변수 정의
  ├── outputs.tf             # 출력 값
  ├── backend.tf             # 백엔드 구성
  ├── providers.tf           # 공급자 구성
  │
  ├── modules/               # 모듈 디렉토리
  │   ├── firebase/          # Firebase 모듈
  │   ├── hosting/           # 호스팅 모듈
  │   └── functions/         # Cloud Functions 모듈
  │
  ├── environments/          # 환경별 구성
  │   ├── dev/               # 개발 환경
  │   │   └── terraform.tfvars
  │   └── prod/              # 운영 환경
  │       └── terraform.tfvars
  │
  └── react-app/             # React 앱 소스 코드
      ├── src/
      ├── public/
      └── package.json
```

## 결론

Terraform을 사용하여 Firebase 인프라를 코드로 관리하면 다음과 같은 이점이 있습니다:

1. **인프라의 버전 관리**: Git과 같은 버전 관리 시스템을 통해 인프라 변경 사항을 추적할 수 있습니다.
2. **반복 가능한 배포**: 동일한 구성을 여러 환경에 일관되게 적용할 수 있습니다.
3. **자동화**: CI/CD 파이프라인과 통합하여 배포 프로세스를 자동화할 수 있습니다.
4. **문서화**: 코드 자체가 인프라의 문서 역할을 합니다.
5. **환경 분리**: 개발, 스테이징, 운영 환경을 명확히 분리하여 관리할 수 있습니다.

React Todo 앱과 Firebase를 사용할 때 Terraform을 도입하면 인프라 관리의 복잡성을 줄이고 개발 워크플로우를 개선할 수 있습니다.
