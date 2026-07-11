# TypeScript 101 — 고급 주제

고급 TypeScript 인터뷰 질문과 실용 예제를 소개합니다.

---

## 조건부 타입이란? `T extends U ? X : Y`와 유니온에 대한 분배 특성

```ts
type IsString<T> = T extends string ? true : false;
type A = IsString<string>;     // true
type B = IsString<number>;     // false

// 분배적 조건부 타입
type ToArray<T> = T extends any ? T[] : never;
type C = ToArray<string | number>; // string[] | number[]
```

---

## 조건부 타입에서의 `infer` 활용 예시
`infer`는 위치에서 타입을 추출해 재사용하도록 캡처합니다.

```ts
type ReturnTypeOf<T> = T extends (...args: any[]) => infer R ? R : never;

function f() { return { ok: true as const, value: 42 } }
type R = ReturnTypeOf<typeof f>; // { ok: true; value: 42 }
```

---

## 매핑 타입과 키 리매핑(key remapping)

```ts
interface User { id: string; name: string; email?: string }

type OptionalFlags<T> = { [K in keyof T]?: T[K] };

type PrefixGetters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K]
};

type UGetters = PrefixGetters<User>;
```

---

## 공변성/반공변성/양변성 — 함수 타입의 분산
- 함수 매개변수는 대부분 양변성(bivariance)으로 체크됨(역사적 타협)
- 반환 타입은 공변성(covariance)
- 특히 제네릭 컨텍스트에서 더 엄격한 체크가 필요하면 `--strictFunctionTypes` 사용

```ts
type FnA = (x: Animal) => Dog;
type FnB = (x: Dog) => Animal;
// FnA와 FnB 간의 할당 가능성은 설정과 문맥에 따라 달라집니다.
```

---

## `never`를 활용한 switch 완전성 검사

```ts
type Shape = { kind: 'circle'; r: number } | { kind: 'square'; s: number } | { kind: 'rect'; w: number; h: number };

function area(s: Shape): number {
  switch (s.kind) {
    case 'circle': return Math.PI * s.r ** 2;
    case 'square': return s.s * s.s;
    case 'rect': return s.w * s.h;
    default: {
      const _exhaustive: never = s; // 누락된 경우 컴파일 오류 유도
      return _exhaustive;
    }
  }
}
```

---

## 템플릿 리터럴 타입과 패턴 강제

```ts
type Hex = `#${string}`;
const color: Hex = '#1e90ff'; // 반드시 '#'로 시작

type EventName<Entity extends string, Action extends string> = `${Entity}:${Action}`;
const e: EventName<'user', 'login' | 'logout'> = 'user:login';
```

---

## 브랜디드(의사 명목) 타입으로 원시 타입 혼용 방지

```ts
type Brand<T, B extends string> = T & { readonly __brand: B };

type UserId = Brand<string, 'UserId'>;

declare const uid: UserId;
const s: string = uid; // 구조적 타이핑이라 string에 할당은 가능
// const uid2: UserId = 'abc'; // 생성자/팩토리 없이 직접 대입은 지양
```

---

## `satisfies` 키워드는 무엇이며 언제 유용한가요?
값이 특정 타입을 만족함을 보장하면서도, 가능한 한 구체적인 리터럴 타입을 유지합니다.

```ts
const cfg = {
  port: 5432,
  mode: 'prod',
} as const satisfies { port: number; mode: 'dev' | 'prod' };

// cfg.mode는 string이 아니라 'prod'로 추론됨
```

---

## 데코레이터는 어떻게 동작하나요?
현재 실험적 기능(2025 기준 stage-3). 클래스/멤버를 주석처럼 장식/수정하는 용도로 사용합니다.

```ts
function Log(target: any, key: string, descriptor: PropertyDescriptor) {
  const orig = descriptor.value;
  descriptor.value = function(...args: unknown[]) {
    console.log(`Calling ${key} with`, args);
    return orig.apply(this, args);
  }
}

class Calculator {
  @Log
  add(a: number, b: number) { return a + b }
}
```

---

## 모듈 해석 전략과 경로 매핑

```jsonc
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@src/*": ["src/*"],
      "@components/*": ["src/components/*"]
    }
  }
}
```

```ts
import Button from '@components/Button';
```

---

## 대규모 TS 프로젝트 성능 팁
- `incremental`, `skipLibCheck` 활성화
- 모노레포/멀티 패키지는 프로젝트 참조(project references) 활용
- 타입은 단순하게 유지, 뜨거운 경로에서는 깊은 조건부 타입 남용 금지
- `any` 남용 대신 `unknown` + 좁히기 사용
