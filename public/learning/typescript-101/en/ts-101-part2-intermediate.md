# TypeScript 101 — Intermediate Deep Dive

This section covers intermediate TypeScript interview questions with concise explanations and examples.

---

## How does structural typing work in TypeScript?
TypeScript uses structural typing: compatibility is based on the shape of types rather than their nominal identity.

```ts
type Point = { x: number; y: number };
interface Coord { x: number; y: number; }

const p: Point = { x: 0, y: 1 };
const c: Coord = p; // OK: same structure
```

---

## Explain type narrowing strategies: typeof, instanceof, in, discriminated unions

```ts
function print(val: string | Date | { value: string }) {
  if (typeof val === 'string') { /* string */ }
  else if (val instanceof Date) { /* Date */ }
  else if ('value' in val) { /* object with value */ }
}

type Result = { kind: 'ok'; data: string } | { kind: 'err'; error: Error };
function handle(r: Result) {
  switch (r.kind) { // discriminated union
    case 'ok': return r.data;
    case 'err': return r.error.message;
  }
}
```

---

## What are generics and how do you use constraints and defaults?
Generics parameterize types; constraints restrict them; defaults provide fallback.

```ts
function first<T extends { length: number } = string>(arr: T): number {
  return arr.length; // length is safe due to constraint
}

interface Box<T = unknown> { value: T }
const a: Box = { value: 123 }; // T defaults to unknown
```

---

## What are utility types like Partial, Required, Readonly, Pick, Omit, Record?
Built-in helpers to transform shapes.

```ts
interface User { id: string; name: string; email?: string }

type UserPatch = Partial<User>;         // all optional
type StrictUser = Required<User>;        // all required
type ReadUser = Readonly<User>;          // all readonly

type UserIdName = Pick<User, 'id' | 'name'>
type UserNoId = Omit<User, 'id'>

type Roles = 'admin' | 'user'
const perms: Record<Roles, number> = { admin: 10, user: 1 };
```

---

## How do you type asynchronous code: Promises, async/await, and callbacks?

```ts
async function getUser(id: string): Promise<{ id: string; name: string }> {
  const res = await fetch(`/api/users/${id}`);
  return res.json();
}

// Callback-style
function withRetry<T>(fn: () => Promise<T>, retries = 3): Promise<T> {
  return fn().catch(err => retries > 0 ? withRetry(fn, retries - 1) : Promise.reject(err));
}
```

---

## How to annotate this for functions and classes? Explain `this` parameter.
Use a fake `this` parameter as the first argument to annotate context.

```ts
function move(this: { x: number; y: number }, dx: number, dy: number) {
  this.x += dx; this.y += dy;
}
const point = { x: 0, y: 0, move };
point.move(5, 3);
```

---

## What are declaration merging and module augmentation?
Interfaces and namespaces can merge; you can augment modules to add types.

```ts
// declaration merging
interface Window { appName?: string }
interface Window { appVersion?: string }

// module augmentation (d.ts context)
declare module 'express-serve-static-core' {
  interface Request { userId?: string }
}
```

---

## What are ambient declarations and when do you write .d.ts files?
Ambient declarations describe types for existing JS without emitting JS.

```ts
// globals.d.ts
declare const VERSION: string;
declare function track(event: string, data?: unknown): void;
```

Write .d.ts to type untyped libraries, expose global vars, or ship type definitions.

---

## How do you configure tsconfig.json for lib/target/module/strict?
- `target`: JS output version (e.g., ES2019)
- `module`: module system (e.g., ESNext, CommonJS)
- `lib`: DOM, ES features to include
- `strict`: turn on strictness family (recommended)

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

## How to use keyof, typeof, indexed access types?

```ts
const cfg = { host: 'localhost', port: 5432 } as const;

type Cfg = typeof cfg;            // { readonly host: "localhost"; readonly port: 5432 }
export type Keys = keyof Cfg;     // 'host' | 'port'
export type PortType = Cfg['port']; // 5432 (literal)
```
