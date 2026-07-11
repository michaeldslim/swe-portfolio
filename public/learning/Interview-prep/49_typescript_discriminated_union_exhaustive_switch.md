# 49. TypeScript: Discriminated Union + Exhaustive switch + never 체크

## 질문 (Question)

다음 코드를 보고, **컴파일 에러가 나는지 / 안 나는지**, 그리고 `checkExhaustive` 호출이 어떤 역할을 하는지 설명해 보세요.

```typescript
type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'square'; size: number }
  | { kind: 'triangle'; base: number; height: number };

function area(shape: Shape): number {
  switch (shape.kind) {
    case 'circle':
      return Math.PI * shape.radius * shape.radius;
    case 'square':
      return shape.size * shape.size;
    default:
      return checkExhaustive(shape);
  }
}

function checkExhaustive(x: never): never {
  throw new Error('Unexpected shape: ' + JSON.stringify(x));
}
```

1. 현재 코드에서 TypeScript 는 에러를 낼까요?
2. `triangle` 을 타입에서 제거하거나, `switch` 문에 새 케이스를 추가/삭제하면 어떤 일이 발생할까요?
3. `checkExhaustive` 패턴이 면접에서 왜 자주 나오는지 설명해 보세요.

---

## 정답 & 해설 (Answer & Explanation)

### 한국어 (Korean)

- `Shape` 타입에는 `triangle` 이 포함되어 있지만, `switch` 문에는 `triangle` 케이스가 없습니다.
- `default` 분기에서 `checkExhaustive(shape)` 를 호출하고 있는데, 이 함수는 인자로 **`never` 타입만 허용**합니다.
- 그러나 실제로는 `shape` 의 타입이 `never` 가 아니라, 아직 **`{ kind: 'triangle'; ... }`** 가능성이 남아 있습니다.
- 따라서 TypeScript 는 `Argument of type 'Shape' is not assignable to parameter of type 'never'.` 와 같은 **컴파일 에러**를 발생시킵니다.

- 이 패턴의 의미:
  - 모든 케이스를 처리했다면 `default` 분기에서 `shape` 타입이 `never` 가 되어야 합니다.
  - 그런데 `never` 가 아니라면, **처리되지 않은 union 멤버가 있다는 신호**이므로 컴파일 에러로 잡을 수 있습니다.

### English

- The `Shape` union includes `triangle`, but the `switch` only handles `'circle'` and `'square'`.
- In the `default` branch, we call `checkExhaustive(shape)`, where `shape` must be of type `never`.
- Since `triangle` is still possible, `shape` is **not `never`**, so the call is a **type error**.

This pattern forces the compiler to warn you whenever you forget to handle one of the union members.

---

## 변형 시나리오 (Variations)

### 1) triangle 을 Shape 타입에서 제거하면?

```typescript
type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'square'; size: number };
```

- 이제 `switch` 에서 모든 케이스를 처리했으므로, `default` 분기에서의 `shape` 타입은 `never` 가 됩니다.
- `checkExhaustive(shape)` 호출은 **정상 컴파일**됩니다 (실행 시에는 여전히 예외를 던질 수 있음).

### 2) triangle 케이스를 switch 에 추가하면?

```typescript
function area(shape: Shape): number {
  switch (shape.kind) {
    case 'circle':
      return Math.PI * shape.radius * shape.radius;
    case 'square':
      return shape.size * shape.size;
    case 'triangle':
      return 0.5 * shape.base * shape.height;
    default:
      return checkExhaustive(shape);
  }
}
```

- 이 경우에도 모든 `Shape` 멤버를 커버했으므로, `default` 분기에 도달하는 타입은 `never` → 정상 컴파일.

---

## 요약 (Summary)

- **KO**: Discriminated Union (`kind` 필드 기반) + `never` 타입을 이용하면, `switch` 문에서 **새로운 union 멤버를 빼먹었을 때 컴파일 단계에서 바로 잡아낼 수 있는 패턴**을 만들 수 있습니다.
- **EN**: Using a discriminated union plus a `never`-typed `checkExhaustive` function enforces that every union member is handled in the `switch`, turning missing cases into compile-time errors.
