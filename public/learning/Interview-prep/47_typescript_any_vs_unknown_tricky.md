# 47. TypeScript: any vs unknown, 어디가 헷갈릴까?

## 질문 (Question)

아래 코드에서 **컴파일 에러가 나는 줄**과 **정상 컴파일되는 줄**을 구분해 보세요.
(실행 결과보다 타입 시스템 관점에서 생각하는 문제입니다.)

```typescript
function takesString(value: string) {}

let vAny: any = 123;
let vUnknown: unknown = 123;

// A
takesString(vAny);

// B
takesString(vUnknown);

// C
if (typeof vUnknown === 'string') {
  takesString(vUnknown);
}

// D
const strFromAny: string = vAny;

// E
const strFromUnknown: string = vUnknown;
```

1. A~E 중에서 TypeScript 컴파일러가 에러를 내는 줄은 어느 것들인가요?
2. `any` 와 `unknown` 의 차이를 설명해 보세요.

---

## 정답 & 해설 (Answer & Explanation)

### 어떤 줄이 에러인가? (Which lines are errors?)

- **A**: `takesString(vAny);` → **OK (no error)**
- **B**: `takesString(vUnknown);` → **에러**
- **C**: `takesString(vUnknown);` (if 안) → **OK (no error)**
- **D**: `const strFromAny: string = vAny;` → **OK (no error)**
- **E**: `const strFromUnknown: string = vUnknown;` → **에러**

### 한국어 (Korean)

- `any`
  - TypeScript 타입 시스템에서 **"타입 검사 포기"** 를 의미.
  - `any` 를 어디에 넘기든, 어디에 대입하든 **거의 모든 타입 체크가 생략**됩니다.
  - 그래서 A, D 는 모두 컴파일 에러 없이 통과합니다 (대신 런타임 버그 가능성↑).

- `unknown`
  - **"아직 무슨 타입인지 모른다"** 를 의미하는, 보다 안전한 상위 타입.
  - `unknown` 값을 다른 구체 타입(예: `string`) 에 바로 대입/전달하면 컴파일 에러.
  - 하지만 **type narrowing** (예: `typeof vUnknown === 'string'`) 을 통해 타입을 좁히면, 좁혀진 타입으로 사용할 수 있습니다.
  - 그래서 B, E 는 에러지만, C 는 if 블록 안에서 `vUnknown` 이 string 으로 좁혀졌기 때문에 OK 입니다.

### English

- `any`
  - Essentially **turns off type checking** for that variable.
  - You can pass `any` to any function or assign it to any type without compile-time errors (but with potential runtime bugs).

- `unknown`
  - Means **"some value of unknown type"**, a safer top type.
  - You **cannot** use it where a specific type is expected until you narrow it.
  - After narrowing (e.g., `typeof vUnknown === 'string'`), TypeScript allows using it as that narrower type.

---

## 요약 (Summary)

- **KO**: `any` 는 타입 시스템을 우회해서 무엇이든 통과시키지만, `unknown` 은 먼저 타입을 좁히지 않으면 사용할 수 없습니다. 면접에서는 `unknown` 을 **타입 안전한 any** 로 이해하고, 실제 코드에서는 `any` 대신 `unknown` + narrowing 을 선호하는 것이 좋습니다.
- **EN**: `any` disables type checking, while `unknown` forces you to narrow before use; in interviews, it’s good to explain that `unknown` is a safer alternative to `any` and encourages explicit type guards.
