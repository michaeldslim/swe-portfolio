# 21. for 루프 + 비동기 콜백에서 var vs let / Closures in Loops (var vs let)

## 질문 (Question)

다음 코드에서 실제 출력 값을 예측해 보세요.

```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log('var i =', i);
  }, 0);
}

for (let j = 0; j < 3; j++) {
  setTimeout(() => {
    console.log('let j =', j);
  }, 0);
}
```

1. 실제 콘솔 출력은 어떻게 되나요?
2. `var` 와 `let` 의 차이, 그리고 클로저(closure)가 어떻게 작동하는지 설명해 보세요.

---

## 정답 (Answer)

### 예상 출력 (Typical Output)

```text
var i = 3
var i = 3
var i = 3
let j = 0
let j = 1
let j = 2
```

(정확한 순서는 환경마다 약간 달라질 수 있으나, `var` 쪽 3개가 모두 `3` 이고, `let` 쪽은 `0,1,2` 가 된다는 점이 핵심입니다.)

---

## 이유 (Why This Happens)

### 한국어 (Korean)

- `var i = 0; i < 3; i++`
  - `var` 는 **함수 스코프(function-scoped)** 입니다.
  - 루프가 모두 끝난 뒤, `i` 의 최종 값은 `3` 입니다.
  - 모든 콜백은 **동일한 `i` 변수**(하나의 공유된 바인딩)를 참조하므로, 나중에 실행될 때 항상 `3` 을 찍습니다.
- `let j = 0; j < 3; j++`
  - `let` 은 **블록 스코프(block-scoped)** 입니다.
  - ES6 스펙 상 `for (let j = ...)` 루프에서는 **각 반복마다 새로운 `j` 바인딩**이 생성됩니다.
  - 따라서 첫 번째 콜백은 `j = 0`, 두 번째는 `j = 1`, 세 번째는 `j = 2` 를 캡처합니다.

### English

- `var i` loop
  - `var` is **function-scoped**.
  - After the loop finishes, `i` is `3`.
  - All callbacks close over the **same `i` variable**, so when they run later, they all see `i === 3`.
- `let j` loop
  - `let` is **block-scoped**.
  - ES6 defines that each iteration of a `for (let j = ...)` loop has its own binding.
  - Each callback captures a different `j` (0, 1, 2 respectively).

---

## var 사용 시 의도한 동작으로 만드는 방법 (Fixing var Version)

### 1) IIFE (Immediately Invoked Function Expression)

```javascript
for (var i = 0; i < 3; i++) {
  (function (x) {
    setTimeout(() => {
      console.log('fixed var x =', x);
    }, 0);
  })(i);
}
```

- **KO**: IIFE 인자로 현재 `i` 값을 넘겨, 각 반복마다 다른 `x` 를 캡처합니다.
- **EN**: Use an IIFE to capture the current `i` value as `x` so each callback sees a different value.

### 2) 애초에 `let` 사용 (Prefer `let`)

```javascript
for (let i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log('better let i =', i);
  }, 0);
}
```

- **KO**: 현대 자바스크립트에서는 의도적으로 `let` 을 사용해 이런 버그를 피하는 것이 일반적입니다.
- **EN**: In modern JavaScript, we typically just use `let` to avoid this pitfall.

---

## 요약 (Summary)

- **KO**: `var` 는 루프 전체에서 하나의 변수를 공유하기 때문에 비동기 콜백이 모두 최종 값을 보게 되고, `let` 은 반복마다 새로운 변수를 만들어 클로저가 각기 다른 값을 캡처합니다.
- **EN**: `var` shares a single variable across the whole loop, so async callbacks all see the final value; `let` creates a new binding per iteration, so each closure sees its own value.
