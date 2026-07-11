# 48. TypeScript: generics + keyof + as const 추론

## 질문 (Question)

다음 코드에서 `a`, `b`, `c` 의 타입과 에러 여부를 예측해 보세요.

```typescript
const config = {
  env: 'dev',
  retries: 3,
} as const;

function getConfig<K extends keyof typeof config>(key: K) {
  return config[key];
}

const a = getConfig('env');      // ?
const b = getConfig('retries');  // ?
const c = getConfig('missing');  // ?
```

1. `a`, `b` 의 타입은 각각 무엇일까요?
2. `c` 는 컴파일 에러일까요, 아니면 런타임 에러 가능성일까요?
3. `as const` 와 `keyof typeof` 가 여기서 어떤 역할을 하는지 설명해 보세요.

---

## 정답 & 해설 (Answer & Explanation)

### 타입 추론 (Type Inference)

- `config` 는 `as const` 덕분에 다음과 같이 추론됩니다.

```typescript
const config: {
  readonly env: 'dev';
  readonly retries: 3;
}
```

- `keyof typeof config` 는 `'env' | 'retries'` 가 됩니다.
- `getConfig` 의 제네릭 매개변수 `K` 는 `'env' | 'retries'` 중 하나로 제한됩니다.

따라서:

- `const a = getConfig('env');`
  - `K` 는 `'env'` 로 추론 → 반환 타입은 `config['env']` → **`'dev'` (리터럴 타입)**.
- `const b = getConfig('retries');`
  - `K` 는 `'retries'` → 반환 타입은 `config['retries']` → **`3` (리터럴 타입)**.
- `const c = getConfig('missing');`
  - `'missing'` 은 `'env' | 'retries'` 에 속하지 않으므로 **컴파일 에러**.

### English

- `as const` makes `config.env` type `'dev'` and `config.retries` type `3`.
- `keyof typeof config` becomes `'env' | 'retries'`.
- `getConfig('env')` returns type `'dev'`.
- `getConfig('retries')` returns type `3`.
- `getConfig('missing')` is a **compile-time error** because `'missing'` is not in the key union.

---

## as const, keyof 의 역할 (Role)

### 한국어 (Korean)

- `as const`
  - 객체의 각 프로퍼티를 **읽기 전용 리터럴 타입**으로 고정합니다.
  - 문자열을 단순히 `string` 이 아니라 `'dev'` 로, 숫자를 `number` 가 아니라 `3` 으로 취급.
- `keyof typeof config`
  - `config` 객체의 **키 집합**(`'env' | 'retries'`) 을 타입으로 만듭니다.
  - 제네릭 `K` 를 이 집합으로 제한해서, 존재하는 key 만 허용.

### English

- `as const` turns values into **literal types** and makes properties readonly.
- `keyof typeof config` gives a union of the keys, used to constrain the generic parameter.

---

## 요약 (Summary)

- **KO**: `as const` + `keyof typeof` 를 조합하면, 객체 설정값에 대해 **존재하는 key만 허용하고, 각 key별로 더 구체적인 리터럴 타입을 유지**할 수 있습니다. 인터뷰에서는 "config-style 객체에서 타입 안전하게 key를 받는 함수" 패턴으로 자주 출제됩니다.
- **EN**: Combining `as const` with `keyof typeof` lets you accept only valid config keys and preserve precise literal types for each value; this is a common TypeScript interview pattern for type-safe configuration access.
