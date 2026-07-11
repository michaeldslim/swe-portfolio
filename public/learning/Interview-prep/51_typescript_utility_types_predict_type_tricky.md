# 51. TypeScript Utility Types: Partial, Pick, Omit, ReturnType

## 질문 (Question)

다음 코드에서 `A`, `B`, `C`, `D` 의 타입을 예측해 보세요.

```typescript
interface User {
  id: string;
  name: string;
  age?: number;
}

function createUser(name: string): User {
  return { id: 'u1', name };
}

type A = Partial<User>;
type B = Pick<User, 'id' | 'name'>;
type C = Omit<User, 'age'>;
type D = ReturnType<typeof createUser>;
```

1. `A`, `B`, `C`, `D` 의 각 프로퍼티들이 optional 인지, 어떤 타입을 가지는지 설명해 보세요.
2. `Partial`, `Pick`, `Omit`, `ReturnType` 이 실무에서 어떻게 쓰이는지도 간단히 설명해 보세요.

---

## 정답 & 해설 (Answer & Explanation)

### 타입 분석 (Type Analysis)

- `User`:

```typescript
interface User {
  id: string;
  name: string;
  age?: number;
}
```

- **A = Partial<User>**

```typescript
type A = {
  id?: string | undefined;
  name?: string | undefined;
  age?: number | undefined;
};
```

- 모든 프로퍼티가 **optional** 이 됩니다.

- **B = Pick<User, 'id' | 'name'>**

```typescript
type B = {
  id: string;
  name: string;
};
```

- `id`, `name` 만 가져오며, optional 여부도 원래 타입 그대로 유지.

- **C = Omit<User, 'age'>**

```typescript
type C = {
  id: string;
  name: string;
};
```

- `User` 에서 `age` 를 제외한 나머지 프로퍼티만 포함.

- **D = ReturnType<typeof createUser>**

```typescript
function createUser(name: string): User { ... }
```

- `D` 는 `User` 와 동일한 타입입니다.

### 한국어 (Korean)

- `Partial<T>`: T 의 모든 프로퍼티를 optional 로 만든다.
- `Pick<T, K>`: T 에서 일부 key K 만 골라서 새로운 타입을 만든다.
- `Omit<T, K>`: T 에서 key K 를 제외한 나머지 프로퍼티만으로 타입을 만든다.
- `ReturnType<F>`: 함수 F 의 반환 타입을 추출한다.

### English

- `Partial<T>`: all properties become optional.
- `Pick<T, K>`: select a subset of properties.
- `Omit<T, K>`: remove some properties from T.
- `ReturnType<F>`: infer the return type of a function.

---

## 요약 (Summary)

- **KO**: Utility types 는 기존 타입을 기반으로 **부분 선택, 제외, 옵셔널 처리, 함수 반환 타입 추출** 등을 손쉽게 할 수 있게 해 주며, 중복 타입 선언을 줄이고 유지보수를 쉽게 만들어 줍니다.
- **EN**: Utility types help you derive new types from existing ones (by making properties optional, picking/omitting fields, or extracting return types), reducing duplication and keeping your type system DRY and maintainable.
