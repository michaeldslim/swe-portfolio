# 52. TypeScript: Mapped Types (Readonly, Record, Custom)

## 질문 (Question)

다음 코드에서 `A`, `B`, `C` 의 타입과, 어떤 줄에서 컴파일 에러가 발생하는지 예측해 보세요.

```typescript
interface User {
  id: string;
  name: string;
  age?: number;
}

type ReadonlyUser = Readonly<User>;

type Flags = {
  isAdmin: boolean;
  isActive: boolean;
};

type FlagNames = keyof Flags; // 'isAdmin' | 'isActive'

type FlagRecord = Record<FlagNames, 'Y' | 'N'>;

type OptionalFlags<T> = {
  [K in keyof T]?: T[K] | null;
};

type C = OptionalFlags<Flags>;

const u: ReadonlyUser = { id: 'u1', name: 'Mike' };

// A
u.name = 'John';

const flags: FlagRecord = {
  isAdmin: 'Y',
  isActive: 'N',
};

// B
const flags2: FlagRecord = {
  isAdmin: 'Y',
  // isActive 누락
};

const c: C = {
  isAdmin: null,
  isActive: true,
};
```

1. `ReadonlyUser`, `FlagRecord`, `C` 의 구조를 설명해 보세요.
2. A, B 중 어떤 줄에서 컴파일 에러가 발생하나요?

---

## 정답 & 해설 (Answer & Explanation)

### 타입 구조 (Type Structures)

- `ReadonlyUser = Readonly<User>`

```typescript
type ReadonlyUser = {
  readonly id: string;
  readonly name: string;
  readonly age?: number;
};
```

- **모든 프로퍼티가 readonly** 가 됩니다.

- `FlagRecord = Record<FlagNames, 'Y' | 'N'>`

```typescript
type FlagRecord = {
  isAdmin: 'Y' | 'N';
  isActive: 'Y' | 'N';
};
```

- `Record<K, V>` 는 key 집합 K 에 대해 모든 key 가 존재하고, 값 타입이 V 인 객체 타입을 만듭니다.

- `C = OptionalFlags<Flags>`

```typescript
type C = {
  isAdmin?: boolean | null;
  isActive?: boolean | null;
};
```

- 커스텀 mapped type 으로, 모든 프로퍼티를 optional 로 만들고 값 타입에 `null` 을 추가.

### 에러 라인 (Error Lines)

- **A: `u.name = 'John';`**
  - `ReadonlyUser` 의 `name` 은 `readonly` 이므로, 재할당 시 **컴파일 에러**.

- **B: `const flags2: FlagRecord = { isAdmin: 'Y' };`**
  - `FlagRecord` 에는 `isAdmin`, `isActive` 둘 다 필요합니다.
  - `isActive` 가 누락되었으므로 **컴파일 에러**.

`c` 선언은 OK 입니다 (`isActive` 에 `true` 할당 가능: `boolean | null`).

---

## 요약 (Summary)

- **KO**: `Readonly<T>` 는 모든 프로퍼티를 읽기 전용으로 만들고, `Record<K, V>` 는 주어진 key 집합에 대해 모든 key 를 필수로 갖는 객체 타입을 생성합니다. 커스텀 mapped type 은 `[K in keyof T]` 패턴을 통해 원하는 방식으로 optional/nullable 등을 조합할 수 있습니다.
- **EN**: `Readonly<T>` makes all properties read-only, `Record<K, V>` creates an object type with all keys K mapped to V, and custom mapped types using `[K in keyof T]` let you flexibly adjust optionality and value types.
