# 24. 호이스팅 + TDZ (var vs let vs const) / Hoisting & TDZ

## 질문 (Question)

다음 코드에서 콘솔 출력 결과와 발생하는 에러를 예측해 보세요.

```javascript
console.log('a before =', a);
// console.log('b before =', b); // 주석을 풀면?
// console.log('c before =', c); // 주석을 풀면?

var a = 1;
let b = 2;
const c = 3;

console.log('a after  =', a);
console.log('b after  =', b);
console.log('c after  =', c);
```

1. 현재 코드에서 실제 출력은 무엇인가요?
2. `b before`, `c before` 를 주석 해제하면 어떤 일이 일어나나요?
3. 이를 통해 `var`, `let`, `const` 의 호이스팅 차이를 설명해 보세요.

---

## 정답 (Answer)

### 현재 코드 실행 시 (with `b before`, `c before` commented)

```text
a before = undefined
a after  = 1
b after  = 2
c after  = 3
```

### `b before`, `c before` 주석 해제 시

```text
ReferenceError: Cannot access 'b' before initialization
```

(또는 `c` 에 대해서도 동일하게 TDZ 관련 ReferenceError 발생)

---

## 이유 (Why This Happens)

### 한국어 (Korean)

- **var a**
  - `var` 선언은 **호이스팅(hoisting)** 되어, 선언 자체는 스코프의 최상단으로 끌어올려집니다.
  - 초기값은 `undefined` 로 설정되므로, 선언 이전에 접근해도 `undefined` 가 출력됩니다.
- **let b, const c**
  - `let` 과 `const` 도 선언 자체는 호이스팅되지만, 초기화되기 전까지는 **TDZ(Temporal Dead Zone)** 에 있습니다.
  - TDZ 구간에서는 변수를 참조하려고 하면 `ReferenceError` 가 발생합니다.

### English

- **var a**
  - `var` declarations are hoisted and initialized to `undefined` at the top of their scope.
  - Accessing `a` before the actual assignment yields `undefined`.
- **let b, const c**
  - Declarations are hoisted but remain in the **Temporal Dead Zone (TDZ)** until the actual declaration line is executed.
  - Accessing them before initialization throws a `ReferenceError`.

---

## 추가 예시 (More Examples)

```javascript
function demo() {
  console.log(x); // undefined
  // console.log(y); // ReferenceError

  var x = 10;
  let y = 20;
}
```

- **KO**: `x` 는 `var` 이라 `undefined` 로 초기화된 상태에서 접근 가능하지만, `y` 는 TDZ 때문에 초기화 전 접근이 막힙니다.
- **EN**: `x` (var) is accessible as `undefined` before assignment; `y` (let) is in TDZ and cannot be accessed.

---

## 요약 (Summary)

- **KO**: `var` 는 호이스팅 + `undefined` 초기화 덕분에 선언 전에도 접근은 되지만, 이는 버그를 유발하기 쉬운 패턴입니다. `let`/`const` 는 TDZ 덕분에 초기화 전 접근을 막아, 의도치 않은 사용을 방지합니다.
- **EN**: `var` is hoisted and initialized to `undefined`, allowing pre-declaration access (often a source of bugs), while `let`/`const` stay in TDZ and throw if accessed before initialization, making code behavior safer and more explicit.
