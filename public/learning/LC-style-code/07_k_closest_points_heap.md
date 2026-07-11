# 7. 원점에서 가장 가까운 K개 점 (K Closest Points to Origin with Heap)

> Related LeetCode: [K Closest Points to Origin](https://leetcode.com/problems/k-closest-points-to-origin/)

## 문제 설명 (Problem Description)

2차원 평면 위의 점들이 `points[i] = [x, y]` 형태로 주어졌을 때,
원점 `(0, 0)` 에서 **가장 가까운 K개의 점**을 찾는 문제입니다.

Given an array of points where `points[i] = [x, y]`, return the **`k` closest points to the origin** `(0, 0)`.
You may return the answer in **any order**.

---

## 입력 (Input)

- 2차원 정수 배열 `points`
- 정수 `k` (선택할 점의 개수)

A 2D integer array `points` and an integer `k`.

---

## 출력 (Output)

- 원점에서 거리가 가장 짧은 점 `k`개를 담은 2차원 배열을 반환합니다.
- 각 원소는 `[x, y]` 형태의 점입니다.

Return a 2D array of `k` points, each as `[x, y]`, that are closest to the origin.

---

## 예시 (Example)

### 예시 1

- 입력 / Input: `points = [[1,3],[-2,2]]`, `k = 1`
- 출력 / Output: `[[-2, 2]]`
- 설명 / Explanation:
  - `(1,3)` 의 거리: `sqrt(1^2 + 3^2) = sqrt(10)`
  - `(-2,2)` 의 거리: `sqrt(4 + 4) = sqrt(8)`
  - `sqrt(8) < sqrt(10)` 이므로 `[-2, 2]` 가 더 가깝습니다.

---

## 접근 방법 (Approach)

### 설명 (Korean)

이 문제는 **최대 힙(Max Heap)** 을 이용하여 효율적으로 해결할 수 있습니다.

1. 각 점의 거리 비교에는 실제 거리 `sqrt(x^2 + y^2)` 를 쓸 필요 없이,
   **제곱 거리 `d2 = x^2 + y^2`** 를 사용해도 순서가 동일합니다.
2. 최대 크기가 `k`인 **최대 힙**을 유지합니다.
   - 힙에는 `[d2, point]` 형태로 저장합니다.
3. 모든 점에 대해 다음을 수행합니다.
   - 점 `p = [x, y]` 의 제곱 거리 `d2` 를 계산합니다.
   - 힙에 `[d2, p]` 를 push 합니다.
   - 만약 힙의 크기가 `k`를 초과하면, **가장 먼 점(가장 큰 d2)** 을 pop 하여 제거합니다.
4. 모든 점을 처리한 후, 힙에 남아 있는 점들이 **가장 가까운 k개 점** 입니다.

이 방법은 힙의 크기를 항상 `k`로 유지하기 때문에, 각 삽입/삭제 연산은 `O(log k)` 이고,
전체 시간 복잡도는 `O(n log k)` 입니다.

### Description (English)

We can solve this efficiently with a **max-heap** of size at most `k`.

1. For each point `p = [x, y]`, compute its **squared distance** `d2 = x*x + y*y`.
   - We use squared distance because the square root is monotonic; we don't need the actual distance.
2. Maintain a max-heap storing pairs `[d2, p]`.
3. For each point:
   - Push `[d2, p]` into the heap.
   - If the heap size exceeds `k`, pop the top element (the farthest point).
4. After processing all points, the heap contains exactly the `k` closest points.

Each heap operation is `O(log k)`, and we do this for all `n` points,
so the total time complexity is `O(n log k)`.

---

## JavaScript 코드 (JavaScript Code)

JavaScript에는 내장 힙 자료구조가 없으므로, 간단한 **최대 힙 클래스**를 구현합니다.

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

  push(item) {
    this.data.push(item);
    this._siftUp(this.data.length - 1);
  }

  pop() {
    if (this.data.length === 0) return undefined;

    const top = this.data[0];
    const last = this.data.pop();

    if (this.data.length > 0) {
      this.data[0] = last;
      this._siftDown(0);
    }

    return top;
  }

  _siftUp(index) {
    while (index > 0) {
      const parent = Math.floor((index - 1) / 2);
      // Compare by distance (stored at index 0 of [distance, point])
      if (this.data[parent][0] >= this.data[index][0]) break;
      [this.data[parent], this.data[index]] = [this.data[index], this.data[parent]];
      index = parent;
    }
  }

  _siftDown(index) {
    const n = this.data.length;

    while (true) {
      let largest = index;
      const left = 2 * index + 1;
      const right = 2 * index + 2;

      if (left < n && this.data[left][0] > this.data[largest][0]) {
        largest = left;
      }

      if (right < n && this.data[right][0] > this.data[largest][0]) {
        largest = right;
      }

      if (largest === index) break;

      [this.data[index], this.data[largest]] = [this.data[largest], this.data[index]];
      index = largest;
    }
  }
}

function kClosest(points, k) {
  const heap = new MaxHeap();

  for (const p of points) {
    const x = p[0];
    const y = p[1];
    const d2 = x * x + y * y; // squared distance

    heap.push([d2, p]);

    if (heap.size() > k) {
      heap.pop(); // remove farthest
    }
  }

  // Extract only the points from the heap
  return heap.data.map(([_, point]) => point);
}
```

## 코드 라인별 설명 (Line-by-Line Explanation)

### MaxHeap 클래스 (MaxHeap Class)

- `class MaxHeap { ... }`
  - **KO:** 최대 힙 자료구조를 구현한 클래스입니다.
  - **EN:** Implements a max-heap data structure.

- `constructor() { this.data = []; }`
  - **KO:** 내부 배열 `data`를 초기화하여 힙의 요소들을 저장합니다.
  - **EN:** Initializes an empty array to store heap elements.

- `size() { return this.data.length; }`
  - **KO:** 현재 힙에 저장된 요소 개수를 반환합니다.
  - **EN:** Returns the current number of elements in the heap.

- `peek() { return this.data[0]; }`
  - **KO:** 힙의 루트(가장 큰 값)를 반환합니다.
  - **EN:** Returns the root element, which has the maximum key.

- `push(item) { this.data.push(item); this._siftUp(this.data.length - 1); }`
  - **KO:** 새 요소를 배열 끝에 추가한 뒤, `_siftUp`을 호출하여 최대 힙 속성이 유지되도록 합니다.
  - **EN:** Adds a new item to the end and sifts it up to maintain the max-heap property.

- `pop() { ... }`
  - **KO:** 루트 요소(가장 큰 값)를 제거하고 반환합니다.
    - 마지막 요소를 루트로 옮긴 후 `_siftDown`으로 힙 구조를 복구합니다.
  - **EN:** Removes and returns the root element, then moves the last element to the root and sifts it down.

- `_siftUp(index) { ... }`
  - **KO:** 새로 추가된 요소를 부모와 비교하며 위로 올려, 부모보다 항상 작지 않도록 유지합니다.
  - **EN:** Moves an element up the tree while it is larger than its parent.

- `const parent = Math.floor((index - 1) / 2);`
  - **KO:** 현재 노드의 부모 인덱스를 계산합니다.
  - **EN:** Computes the parent index in the binary heap array.

- `if (this.data[parent][0] >= this.data[index][0]) break;`
  - **KO:** 부모의 거리 값이 자식보다 크거나 같으면, 힙 속성이 만족되어 루프를 종료합니다.
  - **EN:** Stops sifting up if the parent’s distance is already greater or equal.

- `[this.data[parent], this.data[index]] = [this.data[index], this.data[parent]];`
  - **KO:** 부모와 자식 요소를 교환합니다.
  - **EN:** Swaps the parent and child elements.

- `_siftDown(index) { ... }`
  - **KO:** 루트나 중간 노드에서 시작하여, 더 큰 자식과 비교하며 아래로 내려가게 함으로써 최대 힙을 유지합니다.
  - **EN:** Moves an element down the tree, swapping with the larger child when necessary.

- `const left = 2 * index + 1; const right = 2 * index + 2;`
  - **KO:** 현재 노드의 왼쪽, 오른쪽 자식 인덱스를 계산합니다.
  - **EN:** Computes the indices of the left and right children.

- `if (left < n && this.data[left][0] > this.data[largest][0]) { largest = left; }`
  - **KO:** 왼쪽 자식이 존재하고, 현재까지 가장 큰 값보다 크면 `largest`를 왼쪽 자식으로 갱신합니다.
  - **EN:** Updates `largest` to the left child if it has a bigger distance.

- `if (right < n && this.data[right][0] > this.data[largest][0]) { largest = right; }`
  - **KO:** 오른쪽 자식도 마찬가지로 비교하여 더 큰 쪽을 `largest`로 선택합니다.
  - **EN:** Similarly checks the right child and sets `largest` to the bigger child.

- `if (largest === index) break;`
  - **KO:** 현재 노드가 이미 두 자식보다 크거나 같으면, 더 이상 내려갈 필요가 없어 루프를 종료합니다.
  - **EN:** Stops when the current node is already larger than both children.

### kClosest 함수 (kClosest Function)

- `function kClosest(points, k) {`
  - **KO:** 점 배열 `points`와 정수 `k`를 받아, 원점에서 가장 가까운 `k`개의 점을 반환하는 함수입니다.
  - **EN:** Declares a function that returns the `k` closest points to the origin.

- `const heap = new MaxHeap();`
  - **KO:** 최대 힙 인스턴스를 생성하여, 현재까지의 가장 가까운 `k`개 점을 관리합니다.
  - **EN:** Creates a max-heap to store up to `k` closest points.

- `for (const p of points) { ... }`
  - **KO:** 모든 점 `p = [x, y]`를 순회합니다.
  - **EN:** Iterates over each point in `points`.

- `const x = p[0]; const y = p[1];`
  - **KO:** 점의 x, y 좌표를 분리해서 변수에 저장합니다.
  - **EN:** Extracts the x and y coordinates from the point.

- `const d2 = x * x + y * y; // squared distance`
  - **KO:** 제곱 거리 `d2`를 계산합니다. 제곱근을 쓰지 않아도 상대적인 크기 비교는 동일합니다.
  - **EN:** Computes the squared distance to the origin; no need for the square root.

- `heap.push([d2, p]);`
  - **KO:** `[거리 제곱, 점]` 형태로 힙에 추가합니다.
  - **EN:** Pushes the pair `[distanceSquared, point]` into the max-heap.

- `if (heap.size() > k) { heap.pop(); }`
  - **KO:** 힙 크기가 `k`를 초과하면, 가장 먼 점(루트)을 제거하여 항상 `k`개 이하만 유지합니다.
  - **EN:** If the heap grows beyond size `k`, removes the farthest point (the root).

- `return heap.data.map(([_, point]) => point);`
  - **KO:** 힙 배열에서 거리 정보는 버리고, 점 좌표들만 추출하여 반환합니다.
  - **EN:** Maps over the heap array and returns only the point part of each `[distance, point]` pair.

---

## 시간 및 공간 복잡도 (Time and Space Complexity)

- 시간 복잡도 (Time Complexity): `O(n log k)`
  - 각 점에 대해 힙 연산(push/pop)을 수행하며, 힙 크기는 최대 `k`입니다.
- 공간 복잡도 (Space Complexity): `O(k)`
  - 힙에 최대 `k`개의 점만 저장합니다.
