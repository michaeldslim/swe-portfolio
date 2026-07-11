# TypeScript 101 — 초급 핵심

환영합니다! 이 섹션은 초급 수준의 TypeScript 인터뷰 질문을 짧은 답변과 샘플 코드와 함께 다룹니다.

---

## TypeScript란 무엇이며 왜 JavaScript보다 사용할까요?
TypeScript는 JavaScript의 상위(슈퍼셋) 언어로 정적 타입을 제공하고, 일반 JS로 컴파일됩니다. 장점:
- 정적 타입 체크로 신뢰성과 리팩터링 안전성 향상
- IDE 경험 향상 (인텔리센스, 정의로 이동 등)
- 타깃 출력 버전을 설정 가능한 현대적 문법 지원

```ts
// 컴파일 타임에 오류를 잡는 예시
function add(a: number, b: number) {
  return a + b;
}

// add('1', 2); // 오류: 'string'은 'number'에 할당할 수 없음
```

---

## TypeScript의 기본 타입은 무엇이 있나요?
기본 원시 타입: `string`, `number`, `boolean`, `null`, `undefined`, `symbol`, `bigint`.
구조적 타입: `object`, 배열, 튜플.
특수 타입: `any`, `unknown`, `never`, `void`.

```ts
let username: string = 'Ada';
let age: number = 37;
let isAdmin: boolean = false;
let ids: number[] = [1, 2, 3];
let tuple: [number, string] = [200, 'OK'];
```

---

## `any`와 `unknown`의 차이는?
- `any`: 타입 체크를 포기합니다. 무엇이든 할 수 있으나 위험합니다.
- `unknown`: 사용 전에 반드시 좁혀야 합니다. 보다 안전한 탈출구입니다.

```ts
function handle(v: unknown) {
  // console.log(v.trim()); // 오류: 'unknown' 타입은 사용할 수 없음
  if (typeof v === 'string') {
    console.log(v.trim()); // 좁히기 후 안전
  }
}
```

---

## 인터페이스와 타입 별칭의 차이와 사용 시점은?
둘 다 구조(모양)를 기술합니다. 인터페이스는 확장/병합 가능, 타입 별칭은 더 일반적(원시, 유니온, 튜플 등도 별칭 가능).

```ts
interface User { id: number; name: string }
type UserId = number;
type Result<T> = { ok: true; value: T } | { ok: false; error: string };
```

객체 형태를 확장/구현하고 싶다면 인터페이스를, 유니온 등 복합 조합에는 타입 별칭을 선호합니다.

---

## 유니온과 인터섹션 타입은?
- 유니온 `A | B`: 값이 A 또는 B 일 수 있음
- 인터섹션 `A & B`: 두 타입을 모두 만족해야 함

```ts
type ApiState = 'idle' | 'loading' | 'error' | 'success';

type WithTimestamps = { createdAt: Date; updatedAt: Date };
interface User { id: number; name: string }

type UserWithTimestamps = User & WithTimestamps; // 인터섹션
```

---

## 타입 좁히기란? 일반적인 기법은?
유니온 타입을 특정 하위 타입으로 좁히는 것:
- `typeof`, `instanceof`, truthiness 체크
- 구분자(discriminant) 동등성 비교
- 커스텀 타입 가드(predicate)

```ts
type Shape = { kind: 'circle'; r: number } | { kind: 'square'; size: number };

function area(s: Shape) {
  if (s.kind === 'circle') return Math.PI * s.r ** 2; // circle로 좁혀짐
  return s.size * s.size; // square
}
```

---

## 타입 단언과 non-null 단언의 차이?
- 타입 단언: `value as T` — 컴파일러에게 값을 T로 취급하라 지시
- Non-null 단언: `value!` — 값이 `null`/`undefined` 아님을 보장
가능하면 지양하고 적절한 체크를 우선하세요.

```ts
const el = document.getElementById('app') as HTMLDivElement; // 타입 단언
console.log(el!.id); // non-null 단언
```

---

## enum은 어떻게 동작하며 언제 피해야 하나요?
`enum`은 런타임 객체와 타입을 생성합니다. 라이브러리에서는 트리셰이킹과 타입 안정성 관점에서 리터럴 유니온을 선호합니다.

```ts
enum Direction { Up, Down, Left, Right }
// 많은 경우 더 나은 대안:
type Dir = 'up' | 'down' | 'left' | 'right';
```

---

## 선택/기본 파라미터 등 함수 타입 지정은?

```ts
function greet(name: string, title?: string): string {
  return title ? `${title} ${name}` : `Hello ${name}`;
}

function pow(base: number, exp: number = 2): number { return base ** exp; }

// 함수 타입
const adder: (a: number, b: number) => number = (a, b) => a + b;
```

---

## 배열과 튜플은 어떻게 정의하나요?

```ts
const nums: number[] = [1, 2, 3];
const pairs: Array<[string, number]> = [['a', 1], ['b', 2]];
const rgb: [r: number, g: number, b: number] = [255, 128, 64];
```
