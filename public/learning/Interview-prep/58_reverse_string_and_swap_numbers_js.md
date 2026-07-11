# 58. Reverse a String & Swap Two Numbers in JavaScript

## 1. 질문 (Question)

- JavaScript 로 문자열을 **뒤집는(reversing)** 방법을 여러 가지 설명해 보세요.
- 두 숫자 변수의 값을 **교환(swap)** 하는 방법을 설명해 보세요.
- 각 방법의 장단점이나 주의할 점이 있다면 함께 설명해 보세요.

---

## 2. 문자열 뒤집기 (Reverse a String)

### 2.1 가장 단순한 방법: `split` + `reverse` + `join`

#### 한국어 (Korean)

```js
function reverseString(str) {
  return str.split('').reverse().join('');
}

console.log(reverseString('hello')); // "olleh"
```

- `str.split('')` → 문자열을 문자 배열로 분할: `'hello'` → `['h','e','l','l','o']`
- `.reverse()` → 배열 순서를 뒤집음: `['o','l','l','e','h']`
- `.join('')` → 다시 문자열로 합침: `'olleh'`

#### English

- `split('')` converts the string into an array of characters.
- `reverse()` reverses the array in place.
- `join('')` concatenates them back into a string.
- Very readable and idiomatic for simple ASCII strings.

> **주의 (Caution)**: 이 방식은 단순한 문자(ASCII) 기준이며, **유니코드 surrogate pair / 결합 문자** 같은 복잡한 케이스에서는 완벽하지 않을 수 있습니다. 인터뷰에서는 보통 기본 개념 수준까지만 묻는 경우가 많습니다.

---

### 2.2 for 루프를 이용한 수동 뒤집기

#### 한국어 (Korean)

```js
function reverseStringLoop(str) {
  let result = '';
  for (let i = str.length - 1; i >= 0; i--) {
    result += str[i];
  }
  return result;
}

console.log(reverseStringLoop('hello')); // "olleh"
```

- 문자열을 뒤에서부터 한 글자씩 읽어 `result` 에 더해 나가는 방식.
- `split/reverse/join` 을 사용하지 않고, 로우 레벨 로직을 직접 보여줄 수 있음.

#### English

- Iterate from the end of the string to the beginning.
- Append characters one by one to `result`.
- Shows you understand the mechanics of reversing without relying on helpers.

---

### 2.3 배열 메서드를 활용한 `reduce` 버전 (연습용)

```js
function reverseStringReduce(str) {
  return str.split('').reduce((acc, ch) => ch + acc, '');
}

console.log(reverseStringReduce('hello')); // "olleh"
```

- `reduce` 를 이용해 앞에서부터 순회하면서, 누적값 앞에 새 문자를 붙여 나가는 방식.
- 실무에서 굳이 이렇게 할 필요는 없지만, **고차 함수 사용 능력**을 보여줄 수 있습니다.

---

## 3. 두 숫자 값 교환하기 (Swap Two Numbers)

### 3.1 임시 변수 사용 (고전적인 방법)

#### 한국어 (Korean)

```js
let a = 1;
let b = 2;

console.log('before:', a, b); // 1  2

let temp = a;
a = b;
b = temp;

console.log('after:', a, b); // 2  1
```

- 가장 직관적인 방법:
  - `temp` 에 `a` 를 잠시 보관.
  - `a` 에 `b` 를 대입.
  - `b` 에 `temp` 를 대입.
- 읽기 쉽고, 대부분의 언어에서 통하는 패턴.

#### English

- Use a temporary variable to hold one value while you overwrite it.
- Very clear and works in almost any language.

---

### 3.2 ES6 구조 분해 할당(Destructuring)을 이용한 swap

#### 한국어 (Korean)

```js
let a = 1;
let b = 2;

console.log('before:', a, b); // 1  2

[a, b] = [b, a];

console.log('after:', a, b); // 2  1
```

- ES6 의 배열 구조 분해 할당을 사용한 패턴.
- 간결하고 의도가 분명해서 요즘 JavaScript 코드에서 많이 사용.

#### English

- Use array destructuring to swap values in one line.
- Reads naturally as "assign `[b, a]` back into `[a, b]`".

---

### 3.3 (권장 X) 산술 연산을 이용한 swap

```js
let a = 1;
let b = 2;

a = a + b;
b = a - b;
a = a - b;
```

- **KO**: 이 방식은 오버플로우 등 문제 소지가 있고, 코드 읽기도 나빠서 요즘에는 거의 사용하지 않습니다. 인터뷰에서 언급은 가능하지만, 실제로 쓰는 것은 비추천.
- **EN**: Arithmetic swapping can overflow and is harder to read; it’s more of a trivia trick than a recommended practice.

---

## 4. 면접 포인트 (Interview Angle)

### 한국어 (Korean)

- 문자열 뒤집기
  - 가장 먼저 떠올릴 수 있는 `split` + `reverse` + `join` 방식.
  - 저수준 루프 방식도 이해하고 있음을 보여주면 좋음.
- 숫자 swap
  - 임시 변수 방식과 ES6 구조 분해 방식 둘 다 설명할 수 있으면 좋음.
  - 산술 기반 swap 은 **알고는 있지만 실제로는 쓰지 않는다** 정도로 언급.

### English

- String reversal
  - `split`/`reverse`/`join` is the go-to answer.
  - Demonstrating a manual loop shows a deeper understanding.
- Swapping numbers
  - Show the classic temp-variable method and the modern destructuring swap.
  - Note that arithmetic swaps are mostly a curiosity.

---

## 5. 한 줄 요약 (Summary)

- **KO**: 문자열 뒤집기는 `split` + `reverse` + `join` 이 가장 간단하고, 루프나 `reduce` 로도 구현할 수 있으며, 숫자 swap 은 임시 변수 또는 ES6 구조 분해 할당으로 직관적으로 구현할 수 있습니다.
- **EN**: You can reverse a string using `split`/`reverse`/`join` or manual loops, and swap two numbers either with a temporary variable or with ES6 destructuring in a clear one-liner.
