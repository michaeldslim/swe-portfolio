# 27. 마지막 돌의 무게 (Last Stone Weight with Max Heap)

> Related LeetCode: [Last Stone Weight](https://leetcode.com/problems/last-stone-weight/)

## 문제 설명 (Problem Description)

양의 정수 배열 `stones` 가 주어졌을 때, 각 원소는 돌의 무게를 나타냅니다.
게임은 다음과 같이 진행됩니다.

- 매 턴마다 가장 무거운 두 돌을 선택합니다 (`x <= y`).
- 두 돌을 동시에 부딪힙니다.
  - `x === y` 이면 두 돌 모두 사라집니다.
  - `x !== y` 이면 무거운 돌의 무게는 `y - x` 로 줄어들고, 가벼운 돌은 사라집니다.

더 이상 돌이 남지 않거나 하나만 남을 때까지 반복했을 때,
**마지막에 남는 돌의 무게**를 반환하는 문제입니다. 아무 돌도 남지 않으면 `0`을 반환합니다.

You are given an array `stones` where `stones[i]` is the weight of the `i`-th stone.
On each turn, pick the two heaviest stones and smash them together.
Return the weight of the last remaining stone (or `0` if none remain).

---

## 입력 (Input)

- 양의 정수 배열 `stones`

An array of positive integers `stones`.

---

## 출력 (Output)

- 마지막에 남는 돌의 무게(정수). 아무 돌도 남지 않으면 `0`.

Return an integer representing the last stone's weight, or `0` if no stones remain.

---

## 예시 (Example)

### 예시 1

- 입력 / Input: `stones = [2,7,4,1,8,1]`
- 출력 / Output: `1`
- 설명 / Explanation:
  - 가장 무거운 두 돌: 8, 7 -> 부딪혀서 1이 남음 (배열: [2,4,1,1,1])
  - 다시: 4,2 -> 2가 남음 (배열: [2,1,1,1])
  - 다시: 2,1 -> 1이 남음 (배열: [1,1,1])
  - 다시: 1,1 -> 둘 다 사라짐 (배열: [1])
  - 마지막 돌의 무게는 1입니다.

---

## 접근 방식 (Approach)

### 아이디어 (Korean)

- 매번 가장 무거운 두 돌을 빠르게 꺼내기 위해 **최대 힙(Max Heap)** 자료구조를 사용합니다.
- 모든 돌을 최대 힙에 넣습니다.
- 힙의 크기가 2 이상인 동안:
  - 가장 큰 값 `y` 를 꺼내고,
  - 다음으로 큰 값 `x` 를 꺼냅니다.
  - `y !== x` 이면 `y - x` 를 다시 힙에 넣습니다.
- 힙이 비면 `0`, 하나 남으면 그 값을 반환합니다.

### Idea (English)

- Use a **max heap** so we can repeatedly extract the two heaviest stones efficiently.
- Push all stone weights into the max heap.
- While the heap size is at least 2:
  - Pop the heaviest stone `y`.
  - Pop the second heaviest stone `x`.
  - If `y !== x`, push `y - x` back into the heap.
- If the heap is empty, return `0`; otherwise, return the top element.

---

## 자바스크립트 코드 (JavaScript Code)

```javascript
class MaxHeap {
  constructor() {
    this.data = [];
  }

  size() {
    return this.data.length;
  }

  peek() {
    return this.data[0];
  }

  push(val) {
    this.data.push(val);
    this.bubbleUp(this.data.length - 1);
  }

  pop() {
    if (this.data.length === 0) {
      return null;
    }

    const max = this.data[0];
    const last = this.data.pop();

    if (this.data.length > 0) {
      this.data[0] = last;
      this.bubbleDown(0);
    }

    return max;
  }

  bubbleUp(index) {
    while (index > 0) {
      const parent = Math.floor((index - 1) / 2);
      if (this.data[parent] >= this.data[index]) {
        break;
      }
      [this.data[parent], this.data[index]] = [this.data[index], this.data[parent]];
      index = parent;
    }
  }

  bubbleDown(index) {
    const n = this.data.length;
    while (true) {
      let largest = index;
      const left = index * 2 + 1;
      const right = index * 2 + 2;

      if (left < n && this.data[left] > this.data[largest]) {
        largest = left;
      }
      if (right < n && this.data[right] > this.data[largest]) {
        largest = right;
      }
      if (largest === index) {
        break;
      }

      [this.data[largest], this.data[index]] = [this.data[index], this.data[largest]];
      index = largest;
    }
  }
}

function lastStoneWeight(stones) {
  const heap = new MaxHeap();

  for (const s of stones) {
    heap.push(s);
  }

  while (heap.size() > 1) {
    const y = heap.pop();
    const x = heap.pop();

    if (y !== x) {
      heap.push(y - x);
    }
  }

  return heap.size() === 0 ? 0 : heap.peek();
}
```

---

## 코드 라인별 설명 (Line-by-line Explanation)

### 한국어 (Korean)

- `class MaxHeap { ... }`  
  - 최대 힙을 구현한 클래스입니다.
- `this.data = [];`  
  - 힙 원소들을 저장할 배열입니다.
- `size(), peek()`  
  - 현재 힙 크기와 최댓값(루트)을 반환하는 편의 메서드입니다.
- `push(val)`  
  - 새 값을 배열 끝에 추가한 뒤, `bubbleUp` 으로 힙 조건이 유지되도록 위로 올립니다.
- `pop()`  
  - 최댓값(루트)을 꺼내고, 마지막 원소를 루트로 옮긴 후 `bubbleDown` 으로 다시 힙을 정리합니다.
- `bubbleUp(index)`  
  - 부모 노드와 비교하며, 현재 값이 더 크면 서로 교환하고 위로 올라갑니다.
- `bubbleDown(index)`  
  - 왼쪽/오른쪽 자식 중 더 큰 쪽과 비교해, 자식이 더 크면 교환하면서 아래로 내려갑니다.
- `function lastStoneWeight(stones) { ... }`  
  - 게임 로직을 구현한 함수입니다.
- `for (const s of stones) { heap.push(s); }`  
  - 모든 돌의 무게를 힙에 집어넣습니다.
- `while (heap.size() > 1) { ... }`  
  - 돌이 2개 이상 남아 있는 동안 반복합니다.
- `const y = heap.pop(); const x = heap.pop();`  
  - 가장 무거운 두 돌을 꺼냅니다.
- `if (y !== x) { heap.push(y - x); }`  
  - 두 돌의 무게가 다르면 차이만큼 남은 돌을 다시 힙에 넣습니다.
- `return heap.size() === 0 ? 0 : heap.peek();`  
  - 돌이 남아 있지 않으면 0, 하나 남아 있으면 그 무게를 반환합니다.

### English

- `class MaxHeap { ... }`  
  - Class implementing a max heap.
- `this.data = [];`  
  - Array storing heap elements.
- `size(), peek()`  
  - Convenience methods to get the heap size and the maximum element.
- `push(val)`  
  - Insert `val` at the end and restore heap property by calling `bubbleUp`.
- `pop()`  
  - Remove and return the maximum element, move the last element to the root, then restore heap property via `bubbleDown`.
- `bubbleUp(index)`  
  - While the element is greater than its parent, swap them and move upward.
- `bubbleDown(index)`  
  - Compare with left and right children, swap with the larger child if needed, and move downward.
- `function lastStoneWeight(stones) { ... }`  
  - Implements the stone-smashing game.
- `for (const s of stones) { heap.push(s); }`  
  - Initialize the heap with all stone weights.
- `while (heap.size() > 1) { ... }`  
  - Repeat while at least two stones remain.
- `const y = heap.pop(); const x = heap.pop();`  
  - Extract the two heaviest stones.
- `if (y !== x) { heap.push(y - x); }`  
  - If they have different weights, push the difference back into the heap.
- `return heap.size() === 0 ? 0 : heap.peek();`  
  - If the heap is empty, return 0; otherwise return the last stone's weight.

---

## 시간 및 공간 복잡도 (Time and Space Complexity)

- 시간 복잡도 (Time Complexity): `O(n log n)`  
  - `n`개의 돌을 힙에 넣는 데 `O(n)`, 그 후 최대 `n`번까지만 꺼내고 넣기를 반복하며 각 연산은 `O(log n)` 입니다.
- 공간 복잡도 (Space Complexity): `O(n)`  
  - 힙에 최대 `n`개의 돌을 저장합니다.
