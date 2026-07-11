# 12. `var1 == var2` vs `var1 === var2` 차이 / Loose vs Strict Equality in JavaScript

## 질문 (Question)

- **KO**: "자바스크립트에서 `var1 == var2` 와 `var1 === var2` 의 차이를 설명해 보세요. 특히 타입 변환과 객체 비교에서 어떤 차이가 나는지 예제를 들어 설명해 주세요."
- **EN**: "In JavaScript, what is the difference between `var1 == var2` and `var1 === var2`? Explain with examples, especially regarding type coercion and object comparison."

---

## 핵심 개념 (Core Concept)

### 한국어 (Korean)

- `==` (느슨한 동등, **loose equality**)
  - 비교 전에 **타입 강제 변환(type coercion)** 을 수행합니다.
  - 예: `"1" == 1` 은 문자열 "1" 을 숫자 1로 바꾼 뒤 비교하므로 `true`.
- `===` (엄격한 동등, **strict equality**)
  - **타입도 같고 값도 같을 때만** `true`.
  - 예: `"1" === 1` 은 타입이 다르므로 `false`.
- 객체 비교
  - `==` 와 `===` 모두 **참조 동일성(reference equality)** 만 비교합니다.
  - 즉, 같은 내용을 가진 서로 다른 객체는 `===` 로 비교해도 `false` 입니다.

### English

- `==` (loose equality)
  - Performs **type coercion** before comparison.
  - Example: `"1" == 1` is `true` because the string is coerced to a number.
- `===` (strict equality)
  - Returns `true` only if **both type and value** are the same.
  - Example: `"1" === 1` is `false` because the types differ.
- Objects
  - Both `==` and `===` compare **references**, not deep content.
  - Two different objects with the same properties are not strictly equal.

---

## 예시 코드 (JavaScript Example)

```javascript
// 1) 기본 타입에서의 == vs ===
console.log('1' == 1);   // true  (타입 강제 변환 후 비교)
console.log('1' === 1);  // false (타입이 다름)

console.log(false == 0);  // true  (false -> 0 변환)
console.log(false === 0); // false

// 2) 객체 비교
const a = { value: 1 };
const b = { value: 1 };
const c = a;

console.log(a == b);   // false (서로 다른 객체 참조)
console.log(a === b);  // false
console.log(a === c);  // true  (같은 객체 참조)
```

### 설명 (Explanation)

- **KO**
  - `'1' == 1` 은 문자열이 숫자로 변환된 뒤 비교되어 `true` 이지만, `'1' === 1` 은 타입이 다르므로 `false` 입니다.
  - `false == 0` 도 마찬가지로 타입 변환 때문에 `true` 가 되어 버릴 수 있어, 예측하기 어렵습니다.
  - 객체 `a` 와 `b` 는 내용은 같지만 참조가 다르기 때문에 `===` 로 비교하면 `false` 입니다. 같은 참조를 가진 `a` 와 `c` 만 `===` 로 `true` 가 됩니다.
- **EN**
  - `'1' == 1` returns `true` due to type coercion, while `'1' === 1` is `false` because the types differ.
  - `false == 0` is `true` because `false` is coerced to `0`, which can be surprising.
  - Objects `a` and `b` have the same shape but are different instances, so `a === b` is `false`; only `a === c` is `true` because they reference the same object.

---

## 요약 포인트 (Summary Points)

### 한국어 (Korean)

- `==` 는 타입 강제 변환을 수행하므로 **예상치 못한 true/false** 가 나올 수 있습니다.
- `===` 는 타입과 값이 모두 같을 때만 true 이므로, **대부분의 경우 `===` 사용을 권장**합니다.
- 객체 비교에서 `==` 와 `===` 는 모두 **참조 동일성**만 체크합니다.

### English

- `==` performs type coercion and can lead to surprising results.
- `===` compares both type and value, so it is generally recommended in JavaScript.
- For objects, both `==` and `===` check reference equality, not deep structural equality.

---

## 면접 답변 팁 (Interview Tips)

- 자바스크립트에서 동등 비교를 설명할 때는 **type coercion 테이블**(MDN `Abstract Equality Comparison`)을 간단히 언급하되, 실제 코드에서는 `===` 를 기본으로 사용한다고 말하면 좋습니다.
- 객체의 깊은 비교가 필요하면 `JSON.stringify`, Lodash `isEqual`, 직접 재귀 비교 등 **별도의 유틸 함수**가 필요하다는 점도 함께 언급할 수 있습니다.

---

## 요약 (Summary)

- **KO**: 자바스크립트에서 `==` 는 타입 강제 변환을 하며, `===` 는 타입과 값이 모두 같을 때만 true 이므로, 대부분의 경우 `===` 를 사용하는 것이 안전합니다. 객체 비교에서는 두 연산자 모두 참조 동일성만 비교합니다.
- **EN**: In JavaScript, `==` performs type coercion while `===` requires both type and value to match; using `===` is recommended in most cases, and for objects both operators check only reference equality.
