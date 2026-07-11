# 56. REST API, SOLID, Design Patterns in JavaScript

## 1. REST API 기본 개념 (REST API Basics)

### 한국어 (Korean)

- **REST(Representational State Transfer)**
  - 리소스(예: `/users`, `/posts`)를 **URI로 표현**하고,
  - 그 리소스에 대한 행위는 **HTTP 메서드(GET, POST, PUT, DELETE 등)** 로 표현하는 아키텍처 스타일.
- 핵심 아이디어
  - **리소스 지향**: 엔드포인트는 `/doSomething` 보다는 `/users`, `/users/{id}` 형태.
  - **HTTP 메서드 의미 활용**:
    - `GET /users` → 유저 목록 조회
    - `POST /users` → 유저 생성
    - `GET /users/:id` → 특정 유저 조회
    - `PUT/PATCH /users/:id` → 수정
    - `DELETE /users/:id` → 삭제
  - **Stateless**: 각 요청은 필요한 정보를 모두 포함, 서버는 세션 상태를 최소화.

### English

- **REST** is an architectural style where:
  - Resources are exposed via URIs (e.g., `/users`, `/posts/:id`).
  - Actions are expressed via HTTP methods: GET/POST/PUT/PATCH/DELETE.
- Emphasizes:
  - Resource-oriented endpoints.
  - Stateless interactions.
  - Use of standard HTTP semantics (status codes, headers, caching).

---

## 2. SOLID 원칙 요약 (SOLID Principles Summary)

### S: Single Responsibility Principle

- **KO**: 한 클래스/모듈은 **단 하나의 변경 이유**만 가져야 한다.
- **EN**: A module should have only one reason to change.

### O: Open/Closed Principle

- **KO**: 확장에는 열려 있고, 수정에는 닫혀 있어야 한다.
- **EN**: Open for extension, closed for modification.

### L: Liskov Substitution Principle

- **KO**: 하위 타입은 상위 타입을 대체할 수 있어야 한다.
- **EN**: Subtypes should be substitutable for their base types.

### I: Interface Segregation Principle

- **KO**: 클라이언트는 사용하지 않는 메서드에 의존하면 안 된다.
- **EN**: Clients shouldn’t be forced to depend on methods they don’t use.

### D: Dependency Inversion Principle

- **KO**: 구체 구현이 아니라 **추상(인터페이스)** 에 의존해야 한다.
- **EN**: Depend on abstractions, not concretions.

---

## 3. JavaScript/TypeScript에서 SOLID 적용 예시 (High-level)

### 예: 서비스 레이어 + 리포지토리 패턴

```ts
// types/index.ts (예시)
export interface IUser {
  id: string;
  name: string;
}

export interface IUserRepository {
  findById(id: string): Promise<IUser | null>;
  create(user: IUser): Promise<void>;
}

export class UserService {
  constructor(private readonly repo: IUserRepository) {}

  async getUserProfile(id: string) {
    const user = await this.repo.findById(id);
    if (!user) throw new Error('User not found');
    return user;
  }
}
```

- **SRP**: `UserService` 는 "유저 도메인 로직" 에만 책임.
- **DIP**: `UserService` 는 구체적인 DB 클라이언트가 아니라 `IUserRepository` 인터페이스에 의존.
- 이렇게 하면 테스트 시 **mock repository** 를 주입하기 쉬움.

---

## 4. JavaScript 기반 Design Patterns (주요 몇 가지)

### 1) Module Pattern / ES Modules

- **KO**: 관련된 함수/변수를 하나의 모듈로 묶고, 외부에 필요한 것만 export.
- **EN**: Group related code into modules, expose only what’s needed.

```ts
// userController.ts
import { UserService } from './userService';

const service = new UserService(/* repo impl */);

export async function getUserHandler(req, res) {
  const user = await service.getUserProfile(req.params.id);
  res.json(user);
}
```

### 2) Repository Pattern

- **KO**: DB 접근 로직을 `Repository` 로 분리해서, 서비스/컨트롤러가 **비즈니스 로직에 집중**하도록.
- **EN**: Abstract persistence logic behind repository interfaces.

```ts
class UserRepositoryMongo implements IUserRepository {
  async findById(id: string) { /* Mongo query */ }
  async create(user: IUser) { /* Mongo insert */ }
}
```

### 3) Strategy Pattern (예: 다양한 할인 정책)

- **KO**: 알고리즘을 인터페이스 뒤에 숨기고, 런타임에 구현을 바꿀 수 있게.
- **EN**: Encapsulate algorithms and swap them at runtime.

```ts
interface IPricingStrategy {
  calc(price: number): number;
}

class NoDiscount implements IPricingStrategy {
  calc(price: number) { return price; }
}

class PercentageDiscount implements IPricingStrategy {
  constructor(private percent: number) {}
  calc(price: number) { return price * (1 - this.percent); }
}

class Cart {
  constructor(private strategy: IPricingStrategy) {}
  total(base: number) { return this.strategy.calc(base); }
}
```

### 4) Factory Pattern (예: 환경별 구현 선택)

- **KO**: 생성 로직을 감추고, 호출자는 "무엇을 만들지"만 알도록.
- **EN**: Hide creation logic behind a factory.

```ts
function createUserRepository(): IUserRepository {
  if (process.env.NODE_ENV === 'test') return new InMemoryUserRepo();
  return new UserRepositoryMongo();
}
```

---

## 5. REST + SOLID + 패턴을 함께 묶어서 설명하기 (Interview Angle)

### 한국어 (Korean)

- REST API 설계 시:
  - **엔드포인트는 리소스 중심**으로 (`/users`, `/orders/:id`).
  - 컨트롤러(라우트 핸들러)는 **요청/응답 형식 처리에 집중**.
  - 서비스 레이어는 **도메인 로직** 담당.
  - 리포지토리는 **DB 접근** 담당.
- 이렇게 레이어를 나누면:
  - SRP: 각 레이어/클래스가 책임 하나에 집중.
  - DIP: 상위 레이어는 인터페이스에 의존, 구현 교체/테스트가 쉬움.
  - Strategy/Factory 등의 패턴을 이용해 **환경/요구사항에 따라 구현 교체**.

### English

- For REST APIs:
  - Design **resource-based endpoints**.
  - Controllers handle HTTP concerns (validation, status codes).
  - Services encapsulate business rules.
  - Repositories handle data access.
- This layering naturally applies SOLID and patterns:
  - SRP & DIP via service/repository split.
  - Strategy/factory for pluggable behaviors.

---

## 6. 한 줄 요약 (Summary)

- **KO**: REST는 리소스 + HTTP 메서드 중심의 API 스타일이고, SOLID와 디자인 패턴(서비스/리포지토리, Strategy, Factory 등)을 JavaScript/TypeScript 코드에 적용하면 모듈 간 책임을 분리하고 테스트/유지보수를 쉽게 만들 수 있습니다.
- **EN**: REST focuses on resource-oriented, stateless HTTP APIs; applying SOLID and patterns like service/repository, strategy, and factory in JS/TS leads to cleaner separation of concerns and more maintainable, testable backend code.
