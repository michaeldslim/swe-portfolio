# 02. 배열로 스택 구현 / Implement a Stack Using an Array

## 질문 (Question)

- **KO**: "배열을 사용해서 스택(Stack) 자료구조를 구현해 보세요. push, pop, peek, isEmpty 같은 연산을 설계하고, 시간 복잡도도 설명해 주세요."
- **EN**: "Implement a stack data structure using an array. Design operations such as push, pop, peek, and isEmpty, and explain their time complexity."

---

## 개념 정리 (Concept)

### 한국어 (Korean)

- **스택(Stack)**: LIFO (Last-In, First-Out) 구조
  - 마지막에 들어온 원소가 가장 먼저 나갑니다.
- 핵심 연산
  - `push(x)`: 스택의 맨 위(top)에 원소를 추가
  - `pop()`: 스택의 맨 위 원소를 제거하고 반환
  - `peek()`: 제거하지 않고 맨 위 원소만 확인
  - `isEmpty()`: 스택이 비어 있는지 확인
- 배열로 구현하면, **배열의 끝을 스택의 top** 으로 사용하는 것이 자연스럽습니다.
  - JS의 `push/pop` 은 배열의 끝에서 `O(1)` 입니다.

### English

- **Stack**: LIFO (Last-In, First-Out) data structure.
  - The most recently added element is removed first.
- Core operations:
  - `push(x)`: add an element to the top of the stack
  - `pop()`: remove and return the top element
  - `peek()`: return the top element without removing it
  - `isEmpty()`: check if the stack is empty
- When using an array, we typically treat the **end of the array as the top** of the stack.
  - In JavaScript, `push` and `pop` at the end are `O(1)`.

---

## 자바스크립트 구현 (JavaScript Implementation)

```javascript
class Stack {
  constructor() {
    this.items = []; // 내부 배열 (underlying array)
  }

  // 원소 추가: O(1)
  push(element) {
    this.items.push(element);
  }

  // 맨 위 원소 제거 + 반환: O(1)
  pop() {
    if (this.isEmpty()) {
      // 비어 있을 때의 동작은 설계에 따라 다를 수 있음
      return null; // 또는 throw new Error('Stack is empty');
    }
    return this.items.pop();
  }

  // 맨 위 원소 조회 (제거 X): O(1)
  peek() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items[this.items.length - 1];
  }

  // 비어 있는지 여부: O(1)
  isEmpty() {
    return this.items.length === 0;
  }

  // 현재 크기: O(1)
  size() {
    return this.items.length;
  }
}

// 사용 예시 (Usage)
const stack = new Stack();
stack.push(10);
stack.push(20);
stack.push(30);

console.log(stack.peek());   // 30
console.log(stack.pop());    // 30
console.log(stack.pop());    // 20
console.log(stack.isEmpty()); // false
console.log(stack.pop());    // 10
console.log(stack.isEmpty()); // true
```

---

## 라인별 설명 (Line-by-line Explanation)

### 한국어 (Korean)

- `class Stack { ... }`
  - 스택 자료구조를 나타내는 클래스입니다.
- `this.items = [];`
  - 실제 데이터를 저장할 **내부 배열**입니다.
- `push(element)`
  - 배열의 끝에 원소를 추가합니다. 스택의 top을 배열의 끝으로 보는 구현입니다.
- `pop()`
  - 비어 있는지 먼저 확인하고, 비어 있지 않으면 `Array.prototype.pop()` 으로 마지막 원소를 제거하고 반환합니다.
- `peek()`
  - 제거하지 않고 마지막 원소만 조회합니다.
- `isEmpty()`
  - 배열 길이가 0인지로 비어 있는지 판단합니다.
- `size()`
  - 현재 스택에 들어 있는 원소 개수를 반환합니다.

### English

- `class Stack { ... }`
  - Represents a stack data structure.
- `this.items = [];`
  - Internal array that stores stack elements.
- `push(element)`
  - Adds an element to the end of the array, which we treat as the top of the stack.
- `pop()`
  - Checks if the stack is empty; if not, removes and returns the last element using `Array.prototype.pop()`.
- `peek()`
  - Returns the last element *without* removing it.
- `isEmpty()`
  - Returns `true` if there are no elements, `false` otherwise.
- `size()`
  - Returns the number of elements in the stack.

---

## 시간 및 공간 복잡도 (Time & Space Complexity)

- **push**: `O(1)` 평균 (amortized)
- **pop**: `O(1)` 평균
- **peek**: `O(1)`
- **isEmpty / size**: `O(1)`
- **공간 (Space)**: `O(n)` — 최대 `n`개의 원소를 저장한다고 가정할 때

---

## 면접에서 추가로 이야기할 수 있는 부분 (Extra Interview Points)

- **배열 앞쪽을 top으로 사용하면 안 되는 이유**
  - JS에서 `shift/unshift` 는 배열의 앞에서 동작하며, 내부적으로 다른 원소들을 한 칸씩 밀기 때문에 `O(n)` 이 될 수 있습니다.
  - 따라서 스택 구현에서는 **항상 배열의 끝을 top으로 사용하는 것이 좋다**고 설명할 수 있습니다.
- **배열 대신 연결 리스트로도 스택을 구현할 수 있다**는 점을 간단히 언급하면 좋습니다 (top을 head로 두는 단일 연결 리스트 등).

---

## 요약 (Summary)

- **KO**: 스택은 LIFO 구조이며, 배열의 끝을 top으로 보면 `push/pop/peek/isEmpty` 모두 `O(1)`에 구현할 수 있습니다.
- **EN**: A stack is LIFO; by treating the end of an array as the top, we can implement `push`, `pop`, `peek`, and `isEmpty` all in `O(1)` time on average.
