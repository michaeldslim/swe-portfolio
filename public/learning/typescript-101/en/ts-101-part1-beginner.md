# TypeScript 101 — Beginner Core

Welcome! This section covers beginner-friendly TypeScript interview questions, with short answers and sample code.

---

## What is TypeScript and why use it over JavaScript?
TypeScript is a typed superset of JavaScript that compiles to plain JS. Benefits:
- Static type checking improves reliability and refactoring safety
- Better IDE experience (intellisense, jump-to-definition)
- Modern language features with configurable target output

```ts
// Example: catching errors at compile-time
function add(a: number, b: number) {
  return a + b;
}

// add('1', 2); // Error: Argument of type 'string' is not assignable to parameter of type 'number'.
```

---

## What are basic types in TypeScript?
Common primitives: `string`, `number`, `boolean`, `null`, `undefined`, `symbol`, `bigint`. Structural types: `object`, arrays, tuples. Special types: `any`, `unknown`, `never`, `void`.

```ts
let username: string = 'Ada';
let age: number = 37;
let isAdmin: boolean = false;
let ids: number[] = [1, 2, 3];
let tuple: [number, string] = [200, 'OK'];
```

---

## What is the difference between `any` and `unknown`?
- `any`: Opts out of type checking; you can do anything with it (unsafe)
- `unknown`: You must narrow before use (safer default escape hatch)

```ts
function handle(v: unknown) {
  // console.log(v.trim()); // Error: Object is of type 'unknown'.
  if (typeof v === 'string') {
    console.log(v.trim()); // safe after narrowing
  }
}
```

---

## What are interfaces and type aliases? When to use each?
Both describe shapes. Interfaces are extendable/mergeable; type aliases are more general (can alias primitives, unions, tuples).

```ts
interface User { id: number; name: string }
type UserId = number;
type Result<T> = { ok: true; value: T } | { ok: false; error: string };
```

Use interfaces for object shapes you want to extend/implement. Use types for unions and more complex compositions.

---

## What are union and intersection types?
- Union `A | B`: value can be A or B
- Intersection `A & B`: value must satisfy both A and B

```ts
type ApiState = 'idle' | 'loading' | 'error' | 'success';

type WithTimestamps = { createdAt: Date; updatedAt: Date };
interface User { id: number; name: string }

type UserWithTimestamps = User & WithTimestamps; // intersection
```

---

## What is type narrowing? Give common techniques.
Refining a union to a specific subtype using checks:
- `typeof`, `instanceof`, truthiness
- Equality discriminants
- Custom type predicates

```ts
type Shape = { kind: 'circle'; r: number } | { kind: 'square'; size: number };

function area(s: Shape) {
  if (s.kind === 'circle') return Math.PI * s.r ** 2; // narrowed to circle
  return s.size * s.size; // square
}
```

---

## What is type assertion vs. non-null assertion?
- Type assertion: `value as T` tells the compiler to treat value as T
- Non-null assertion: `value!` tells compiler value is not `null`/`undefined`
Avoid when possible; prefer proper checks.

```ts
const el = document.getElementById('app') as HTMLDivElement; // assertion
console.log(el!.id); // non-null assertion
```

---

## How do enums work? When to avoid them?
`enum` creates a runtime object and a type. In libraries, prefer union literals for tree-shaking and type safety.

```ts
enum Direction { Up, Down, Left, Right }
// Better in many cases:
type Dir = 'up' | 'down' | 'left' | 'right';
```

---

## How do you type functions including optional and default params?

```ts
function greet(name: string, title?: string): string {
  return title ? `${title} ${name}` : `Hello ${name}`;
}

function pow(base: number, exp: number = 2): number { return base ** exp; }

// Function type
const adder: (a: number, b: number) => number = (a, b) => a + b;
```

---

## How to define arrays and tuples?

```ts
const nums: number[] = [1, 2, 3];
const pairs: Array<[string, number]> = [['a', 1], ['b', 2]];
const rgb: [r: number, g: number, b: number] = [255, 128, 64];
```
