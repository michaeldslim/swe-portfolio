# TypeScript 101 — 중급 심화

이 섹션은 중급 수준의 TypeScript 인터뷰 질문을 간결한 설명과 예제로 다룹니다.

---

## TypeScript의 구조적 타이핑(Structural Typing)은 무엇인가요?
TypeScript는 구조적 타이핑을 사용합니다. 즉, 명목적 동일성보다 타입의 “모양(프로퍼티 구조)”이 호환성 판단의 기준입니다.

```ts
type Point = { x: number; y: number };
interface Coord { x: number; y: number; }

const p: Point = { x: 0, y: 1 };
const c: Coord = p; // OK: 같은 구조
```

---

## 타입 좁히기 전략: typeof, instanceof, in, 구분된 유니온

```ts
function print(val: string | Date | { value: string }) {
  if (typeof val === 'string') { /* string */ }
  else if (val instanceof Date) { /* Date */ }
  else if ('value' in val) { /* value 프로퍼티가 있는 객체 */ }
}

type Result = { kind: 'ok'; data: string } | { kind: 'err'; error: Error };
function handle(r: Result) {
  switch (r.kind) { // 구분자(discriminant)에 의한 좁히기
    case 'ok': return r.data;
    case 'err': return r.error.message;
  }
}
```

---

## 제네릭(Generics), 제약(extends), 기본 타입 파라미터(defaults)

```ts
function first<T extends { length: number } = string>(arr: T): number {
  return arr.length; // 제약 덕분에 length 사용이 안전
}

interface Box<T = unknown> { value: T }
const a: Box = { value: 123 }; // T는 기본값 unknown
```

---

## 유틸리티 타입: Partial, Required, Readonly, Pick, Omit, Record
형태 변환을 돕는 내장 헬퍼들입니다.

```ts
interface User { id: string; name: string; email?: string }

type UserPatch = Partial<User>;         // 모두 옵션
type StrictUser = Required<User>;        // 모두 필수
type ReadUser = Readonly<User>;          // 모두 읽기 전용

type UserIdName = Pick<User, 'id' | 'name'>
type UserNoId = Omit<User, 'id'>

type Roles = 'admin' | 'user'
const perms: Record<Roles, number> = { admin: 10, user: 1 };
```

---

## 비동기 코드 타이핑: Promise, async/await, 콜백

```ts
async function getUser(id: string): Promise<{ id: string; name: string }> {
  const res = await fetch(`/api/users/${id}`);
  return res.json();
}

// 콜백/재시도 래퍼
function withRetry<T>(fn: () => Promise<T>, retries = 3): Promise<T> {
  return fn().catch(err => retries > 0 ? withRetry(fn, retries - 1) : Promise.reject(err));
}
```

---

## 함수의 this 타입 표기법 — this 파라미터
첫 번째 인자에 가짜 `this` 파라미터를 선언해 컨텍스트를 명시합니다.

```ts
function move(this: { x: number; y: number }, dx: number, dy: number) {
  this.x += dx; this.y += dy;
}
const point = { x: 0, y: 0, move };
point.move(5, 3);
```

---

## 선언 병합(Declaration Merging)과 모듈 보강(Module Augmentation)
인터페이스/네임스페이스는 병합될 수 있으며, 기존 모듈의 타입을 확장할 수 있습니다.

```ts
// 선언 병합
interface Window { appName?: string }
interface Window { appVersion?: string }

// 모듈 보강 (d.ts 컨텍스트)
declare module 'express-serve-static-core' {
  interface Request { userId?: string }
}
```

---

## 주변(ambient) 선언과 .d.ts 파일은 언제 작성하나요?
주변 선언은 기존 JS의 타입만 설명하며 JS 출력은 생성하지 않습니다.

```ts
// globals.d.ts
declare const VERSION: string;
declare function track(event: string, data?: unknown): void;
```

타이프되지 않은 라이브러리를 타이핑하거나, 전역을 노출하거나, 타입 정의를 배포할 때 .d.ts를 작성합니다.

---

## tsconfig.json에서 lib/target/module/strict 설정은?
- `target`: 출력 JS 버전 (예: ES2020)
- `module`: 모듈 시스템 (예: ESNext, CommonJS)
- `lib`: 포함할 DOM/ES 기능 집합
- `strict`: 엄격 모드 일괄 활성화 (권장)

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM"],
    "strict": true,
    "skipLibCheck": true
  }
}
```

---

## keyof, typeof, 인덱스드 액세스 타입은 어떻게 쓰나요?

```ts
const cfg = { host: 'localhost', port: 5432 } as const;

type Cfg = typeof cfg;             // { readonly host: "localhost"; readonly port: 5432 }
export type Keys = keyof Cfg;      // 'host' | 'port'
export type PortType = Cfg['port']; // 5432 (리터럴)
```
