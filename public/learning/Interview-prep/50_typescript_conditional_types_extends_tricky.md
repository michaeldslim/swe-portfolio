# 50. TypeScript: conditional types와 extends 제약 트릭

## 질문 (Question)

다음 코드에서 `A`, `B`, `C`, `D` 의 타입을 예측해 보세요.

```typescript
type IsString<T> = T extends string ? 'yes' : 'no';

type A = IsString<string>;
type B = IsString<number>;

type C = IsString<string | number>;

type D<T> = T extends { id: string } ? T['id'] : never;

type D1 = D<{ id: string; name: string }>;
type D2 = D<{ name: string }>;
```

1. `A`, `B`, `C`, `D1`, `D2` 의 최종 타입은 무엇인가요?
2. `IsString<string | number>` 가 단순히 `'yes' | 'no'` 가 아니라 **분배형(distributive)** 으로 동작하는 이유를 설명해 보세요.

---

## 정답 & 해설 (Answer & Explanation)

### 타입 계산 (Type Computation)

- `IsString<T> = T extends string ? 'yes' : 'no'`

1. `A = IsString<string>`
   - `string extends string` → `true` → `'yes'`.
2. `B = IsString<number>`
   - `number extends string` → `false` → `'no'`.
3. `C = IsString<string | number>`
   - 분배 규칙에 의해:
     - `IsString<string>` → `'yes'`
     - `IsString<number>` → `'no'`
   - 따라서 `C = 'yes' | 'no'`.

- `D<T> = T extends { id: string } ? T['id'] : never;`

4. `D1 = D<{ id: string; name: string }>`
   - 조건 `T extends { id: string }` 는 참 → `T['id']` → `string`.
5. `D2 = D<{ name: string }>`
   - 조건이 거짓 → `never`.

### 한국어 (Korean)

- **분배형 조건부 타입 (Distributive Conditional Types)**
  - `IsString<T>` 에서 `T` 가 `string | number` 같은 union 이면,
  - `IsString<string | number>` 는 `IsString<string> | IsString<number>` 로 **분배되어 평가**됩니다.
  - 그래서 `C` 가 `'yes' | 'no'` 가 됩니다.

- `D<T>` 는 `T` 에 `id` 필드가 있는지 검사한 뒤, 있으면 그 필드의 타입을 뽑아오고, 없으면 `never` 를 반환하는 패턴입니다.

### English

- Conditional types distribute over unions by default, so:
  - `IsString<string | number>` = `IsString<string> | IsString<number>` = `'yes' | 'no'`.
- `D<T>` is a typical pattern: "if T has `{ id: string }`, return the type of `id`, otherwise `never`".

---

## 요약 (Summary)

- **KO**: `T extends U ? X : Y` 형태의 조건부 타입은 기본적으로 **union 에 대해 분배형**으로 동작하며, 이를 이용해 **유연한 타입 필터링/추출** 을 구현할 수 있습니다.
- **EN**: Conditional types of the form `T extends U ? X : Y` are distributive over unions, which is a powerful way to build type-level filters and extractors (like "if T has `id`, give me its type").
