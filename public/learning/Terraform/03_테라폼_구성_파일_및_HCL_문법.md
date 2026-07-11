# 테라폼 구성 파일 및 HCL 문법

## 테라폼 구성 파일

테라폼 프로젝트는 `.tf` 확장자를 가진 파일들로 구성됩니다. 일반적인 테라폼 프로젝트의 파일 구조는 다음과 같습니다:

```
프로젝트_디렉토리/
  ├── main.tf         # 주요 리소스 정의
  ├── variables.tf    # 입력 변수 정의
  ├── outputs.tf      # 출력 값 정의
  ├── providers.tf    # 공급자 구성
  ├── terraform.tfvars # 변수 값 설정 (버전 관리에서 제외하는 것이 좋음)
  └── backend.tf      # 백엔드 구성 (상태 저장소)
```

## HCL(HashiCorp Configuration Language) 문법

HCL은 테라폼에서 사용하는 선언적 구성 언어입니다. 주요 문법 요소를 살펴보겠습니다.

### 1. 블록(Blocks)

블록은 HCL의 기본 구조로, 중괄호(`{}`)로 묶인 구성 요소입니다.

```hcl
resource "aws_instance" "example" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t2.micro"
}
```

주요 블록 유형:
- `resource`: 인프라 리소스 정의
- `provider`: 공급자 구성
- `variable`: 입력 변수 정의
- `output`: 출력 값 정의
- `module`: 모듈 사용
- `data`: 데이터 소스 참조
- `locals`: 로컬 값 정의
- `terraform`: 테라폼 자체 설정

### 2. 인수(Arguments)

블록 내부에 `키 = 값` 형태로 정의되는 설정입니다.

```hcl
resource "aws_instance" "example" {
  ami           = "ami-0c55b159cbfafe1f0"  # 인수
  instance_type = "t2.micro"               # 인수
  tags = {                                 # 맵 형태의 인수
    Name = "example-instance"
  }
}
```

### 3. 식별자(Identifiers)

리소스나 변수 등을 식별하는 이름입니다.

```hcl
resource "aws_instance" "example" {  # "example"이 식별자
  # ...
}
```

### 4. 표현식(Expressions)

값을 계산하는 코드입니다. 다양한 형태가 있습니다:

```hcl
# 문자열 보간
name = "server-${var.environment}"

# 조건식
instance_type = var.environment == "prod" ? "t2.medium" : "t2.micro"

# 함수 호출
availability_zone = element(var.availability_zones, count.index)
```

### 5. 변수(Variables)

재사용 가능한 값을 정의합니다.

```hcl
# variables.tf에서 변수 정의
variable "region" {
  description = "AWS 리전"
  type        = string
  default     = "us-west-2"
}

# 다른 파일에서 변수 사용
provider "aws" {
  region = var.region
}
```

### 6. 출력(Outputs)

테라폼 실행 후 표시할 값을 정의합니다.

```hcl
output "instance_ip_addr" {
  description = "인스턴스의 공인 IP 주소"
  value       = aws_instance.example.public_ip
}
```

### 7. 로컬 값(Locals)

모듈 내에서 재사용할 값을 정의합니다.

```hcl
locals {
  common_tags = {
    Project     = "MyProject"
    Environment = var.environment
  }
}

resource "aws_instance" "example" {
  # ...
  tags = merge(local.common_tags, {
    Name = "example-instance"
  })
}
```

### 8. 데이터 소스(Data Sources)

기존 인프라 리소스의 정보를 가져옵니다.

```hcl
data "aws_ami" "ubuntu" {
  most_recent = true
  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-*"]
  }
  owners = ["099720109477"] # Canonical
}

resource "aws_instance" "example" {
  ami = data.aws_ami.ubuntu.id
  # ...
}
```

### 9. 메타 인수(Meta-Arguments)

리소스 블록에서 특별한 동작을 정의하는 인수입니다.

```hcl
# count: 여러 동일한 리소스 생성
resource "aws_instance" "server" {
  count = 3
  ami   = "ami-0c55b159cbfafe1f0"
  # ...
  tags = {
    Name = "server-${count.index}"
  }
}

# for_each: 맵이나 집합을 기반으로 여러 리소스 생성
resource "aws_iam_user" "users" {
  for_each = toset(["user1", "user2", "user3"])
  name     = each.value
}

# depends_on: 명시적 의존성 정의
resource "aws_instance" "example" {
  # ...
  depends_on = [aws_s3_bucket.example]
}
```

## 실습 예제: 기본 구성 파일

다음은 AWS에 간단한 EC2 인스턴스를 배포하는 기본 테라폼 구성 예제입니다:

### providers.tf
```hcl
provider "aws" {
  region = var.region
}
```

### variables.tf
```hcl
variable "region" {
  description = "AWS 리전"
  type        = string
  default     = "ap-northeast-2"  # 서울 리전
}

variable "instance_type" {
  description = "EC2 인스턴스 타입"
  type        = string
  default     = "t2.micro"
}

variable "ami_id" {
  description = "AMI ID"
  type        = string
  default     = "ami-0c55b159cbfafe1f0"  # 예시 AMI ID (실제 사용 시 변경 필요)
}
```

### main.tf
```hcl
resource "aws_instance" "example" {
  ami           = var.ami_id
  instance_type = var.instance_type
  
  tags = {
    Name = "terraform-example"
  }
}
```

### outputs.tf
```hcl
output "instance_id" {
  description = "생성된 인스턴스 ID"
  value       = aws_instance.example.id
}

output "public_ip" {
  description = "인스턴스 공인 IP 주소"
  value       = aws_instance.example.public_ip
}
```

## 다음 단계

다음 파일에서는 테라폼 상태 관리와 백엔드 구성에 대해 알아보겠습니다.
