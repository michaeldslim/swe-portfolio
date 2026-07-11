# 61. JavaScript: var / let / const, Hoisting, Duplicate Array, Custom flat

## 1. 질문 (Question)

- JavaScript 에서 `var`, `let`, `const` 의 차이는 무엇인가요?
- Hoisting(호이스팅) 은 무엇이며, `var` vs `let`/`const` 에서 어떻게 다르게 동작하나요?
- 배열에서 **중복 원소 제거(duplicate array problem)** 를 해결하는 방법을 설명해 보세요.
- 중첩 배열을 평탄화하는(custom `flat`) 함수를 직접 구현해 보세요.

---

## 2. var / let / const 차이 (Differences)

### 스코프 (Scope)

#### 한국어 (Korean)

- `var`
  - **함수 스코프(function scope)**.
  - 블록(`if`, `for` 등) 안에서 선언해도 **함수 전체에서 접근 가능**.
- `let`, `const`
  - **블록 스코프(block scope)**.
  - 선언된 블록(`{ ... }`) 내부에서만 유효.

#### English

- `var` is function-scoped.
- `let` and `const` are block-scoped.

---

### 재선언 / 재할당 (Redeclaration / Reassignment)

- `var`
  - **재선언 가능**: 같은 스코프에서 `var x = 1; var x = 2;` 허용.
  - 재할당 가능.
- `let`
  - **재선언 불가** (같은 스코프 내): `let x = 1; let x = 2;` → 에러.
  - 재할당 가능.
- `const`
  - **재선언 불가**, **재할당 불가**.
  - 단, `const obj = { a: 1 }` 에서 `obj.a = 2` 처럼 **객체 내부 속성 변경은 가능** (참조 자체는 고정).

---

## 3. Hoisting & TDZ (Temporal Dead Zone)

### 3.1 var 의 Hoisting

```js
console.log(x); // undefined (에러 아님)
var x = 10;
console.log(x); // 10
```

- **KO**
  - `var x` 선언이 **호이스팅되어 함수/스크립트의 상단에서 선언된 것처럼 처리**됨.
  - 초기화(`= 10`)는 원래 위치에서 실행되므로, 첫 번째 `console.log` 시점에는 값이 `undefined`.
- **EN**
  - Declaration is hoisted, initialization is not.
  - Accessing `x` before assignment yields `undefined`, not a ReferenceError.

### 3.2 let / const 의 Hoisting + TDZ

```js
console.log(y); // ReferenceError
let y = 20;
```

- **KO**
  - `let`/`const` 도 내부적으로는 선언이 호이스팅되지만, **TDZ(Temporal Dead Zone)** 에 들어감.
  - 실제 선언문(`let y = 20;`) 이전에 접근하면 `ReferenceError`.
- **EN**
  - `let`/`const` are hoisted but not initialized before their declaration.
  - The period before initialization is the **Temporal Dead Zone**; accessing the variable then throws a `ReferenceError`.

---

## 4. Duplicate Array Problem (중복 제거)

### 4.1 Set 을 활용한 간단한 중복 제거

```js
const arr = [1, 2, 2, 3, 3, 3, 4];
const unique = [...new Set(arr)];
console.log(unique); // [1, 2, 3, 4]
```

- **KO**
  - `Set` 은 중복을 허용하지 않는 컬렉션.
  - 배열을 `Set` 으로 만들었다가 다시 펼치면(spread) 중복이 제거된 배열.
- **EN**
  - `Set` naturally removes duplicates; spreading back into an array gives a deduped list.

### 4.2 filter + indexOf 를 이용한 중복 제거

```js
const arr = [1, 2, 2, 3, 3, 3, 4];
const unique = arr.filter((value, index) => arr.indexOf(value) === index);
console.log(unique); // [1, 2, 3, 4]
```

- **KO**
  - `indexOf(value)` 는 해당 값이 **처음 등장하는 인덱스**.
  - 현재 인덱스(`index`)가 `indexOf(value)` 와 같을 때만 통과시킴 → 첫 등장만 남김.
- **EN**
  - Keep only the first occurrence of each value by comparing the current index to `indexOf(value)`.

### 4.3 reduce 를 이용한 중복 제거 (연습용)

```js
const arr = [1, 2, 2, 3, 3, 3, 4];
const unique = arr.reduce((acc, cur) => {
  if (!acc.includes(cur)) {
    acc.push(cur);
  }
  return acc;
}, []);

console.log(unique); // [1, 2, 3, 4]
```

- **KO**: `reduce` 로 누적 배열(`acc`)을 만들면서, 아직 없는 값만 push.
- **EN**: Build up an accumulator array, adding values only if they aren’t already included.

---

## 5. Custom flat 구현 (Nested Array Flattening)

### 5.1 Array.prototype.flat 이 하는 일

```js
[1, [2, [3, 4]], 5].flat(2); // [1, 2, 3, 4, 5]
```

- **KO**: 중첩 배열을 지정한 깊이까지 평탄화.
- **EN**: Flattens nested arrays up to a given depth.

### 5.2 재귀적으로 flat 구현하기

```js
function customFlat(arr, depth = 1) {
  if (depth < 1) return arr.slice();

  const result = [];

  for (const item of arr) {
    if (Array.isArray(item)) {
      result.push(...customFlat(item, depth - 1));
    } else {
      result.push(item);
    }
  }

  return result;
}

console.log(customFlat([1, [2, [3, 4]], 5], 1)); // [1, 2, [3, 4], 5]
console.log(customFlat([1, [2, [3, 4]], 5], 2)); // [1, 2, 3, 4, 5]
```

```js
function flatDeep(arr) {
  const result = [];

  arr.forEach((item) => {
    if (Array.isArray(item)) {
      // 배열이면 재귀적으로 평탄화
      result.push(...flatDeep(item));
    } else {
      result.push(item);
    }
  });

  return result;
}

// 사용 예시
const nested = [1, [2, [3, 4], 5], 6];
console.log(flatDeep(nested)); // [1, 2, 3, 4, 5, 6]
```
#### 설명 (KO)

- `depth` 가 0 이면 더 이상 평탄화하지 않고 그대로 복사.
- 배열 원소를 순회하면서:
  - `Array.isArray(item)` 이면 재귀 호출로 한 단계(depth-1) 더 평탄화.
  - 아니면 그대로 결과 배열에 push.

#### Explanation (EN)

- If `depth` is 0, return a shallow copy.
- For each element:
  - If it’s an array, recursively flatten with `depth - 1`.
  - Otherwise, push the element directly.

---

## 6. 면접 포인트 (Interview Angle)

### 한국어 (Korean)

- `var` vs `let`/`const`:
  - 스코프(함수 vs 블록), 재선언/재할당 가능 여부, hoisting & TDZ 를 함께 설명.
- 중복 제거:
  - 간단한 경우 `Set` 이 가장 깔끔하고, 과거 방식으로 `filter` + `indexOf` 도 언급.
- custom `flat`:
  - 재귀를 이용한 depth 기반 평탄화 로직을 설명할 수 있으면 좋음.

### English

- For `var`/`let`/`const`, emphasize scope differences and hoisting behavior.
- For duplicates, mention `Set` and `filter`-based approaches.
- For `flat`, show you can implement a depth-limited recursive flattener.

---

## 7. 한 줄 요약 (Summary)

- **KO**: JavaScript 에서 `var`/`let`/`const` 는 스코프와 hoisting/TDZ 동작이 다르며, 배열 중복 제거는 `Set` 이나 `filter`/`reduce` 로 구현할 수 있고, 중첩 배열 평탄화는 재귀를 이용한 custom `flat` 으로 depth 를 조절하며 처리할 수 있습니다.
- **EN**: In JavaScript, `var`, `let`, and `const` differ in scope and hoisting/TDZ behavior; array duplicates can be removed via `Set`, `filter`, or `reduce`, and nested arrays can be flattened with a recursive, depth-aware custom `flat` implementation.
