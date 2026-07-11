# TypeScript 101 — Advanced Topics

Advanced TypeScript interview questions with practical examples.

---

## What are conditional types? Show `T extends U ? X : Y` and distribution over unions

```ts
type IsString<T> = T extends string ? true : false;
type A = IsString<string>;     // true
type B = IsString<number>;     // false

// Distributive behavior
type ToArray<T> = T extends any ? T[] : never;
type C = ToArray<string | number>; // string[] | number[]
```

---

## Explain `infer` in conditional types with examples
`infer` captures a type from a position to reuse it.

```ts
type ReturnTypeOf<T> = T extends (...args: any[]) => infer R ? R : never;

function f() { return { ok: true as const, value: 42 } }
type R = ReturnTypeOf<typeof f>; // { ok: true; value: 42 }
```

---

## What are mapped types and key remapping?

```ts
interface User { id: string; name: string; email?: string }

type OptionalFlags<T> = { [K in keyof T]?: T[K] };

type PrefixGetters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K]
};

type UGetters = PrefixGetters<User>;
```

---

## Variance in TypeScript: covariance, contravariance, bivariance
- Function parameter types are mostly checked bivariantly (historical compromise)
- Return types are covariant
- Use `--strictFunctionTypes` for stricter checks (especially in generic positions)

```ts
type FnA = (x: Animal) => Dog;
type FnB = (x: Dog) => Animal;
// Assignability between FnA and FnB depends on settings and context.
```

---

## Exhaustive checks with `never` and `switch`

```ts
type Shape = { kind: 'circle'; r: number } | { kind: 'square'; s: number } | { kind: 'rect'; w: number; h: number };

function area(s: Shape): number {
  switch (s.kind) {
    case 'circle': return Math.PI * s.r ** 2;
    case 'square': return s.s * s.s;
    case 'rect': return s.w * s.h;
    default: {
      const _exhaustive: never = s; // compile-time error if a case is missing
      return _exhaustive;
    }
  }
}
```

---

## Template literal types and pattern enforcement

```ts
type Hex = `#${string}`;
const color: Hex = '#1e90ff'; // must start with '#'

type EventName<Entity extends string, Action extends string> = `${Entity}:${Action}`;
const e: EventName<'user', 'login' | 'logout'> = 'user:login';
```

---

## Branded (nominal-ish) types to avoid mixing primitives

```ts
type Brand<T, B extends string> = T & { readonly __brand: B };

type UserId = Brand<string, 'UserId'>;

declare const uid: UserId;
const s: string = uid; // OK (structural)
// const uid2: UserId = 'abc'; // unsafe without constructor; prefer factory
```

---

## What is `satisfies`? When is it useful?
Ensures a value conforms to a type while preserving the most specific literal types.

```ts
const cfg = {
  port: 5432,
  mode: 'prod',
} as const satisfies { port: number; mode: 'dev' | 'prod' };

// cfg.mode inferred as 'prod' not string
```

---

## How do decorators work in TypeScript?
Currently experimental (2025: stage-3 decorators available behind compiler setting). Used to annotate/modify classes and members.

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

## Module resolution strategies and path mapping

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

## Performance tips for large TS projects
- Enable `incremental`, `skipLibCheck`
- Use project references for multi-package repos
- Keep types simple; prefer `type` aliases over deep conditional types in hot paths
- Avoid excessive `any`; prefer `unknown` + narrow
