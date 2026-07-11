# 18. 2차원 배열 나선형 순회 (Array Traversal in Spiral Order)

> Related LeetCode: [Spiral Matrix](https://leetcode.com/problems/spiral-matrix/)

## 문제 설명 (Problem Description)

`m x n` 2차원 배열 `matrix` 가 주어졌을 때,
배열의 원소들을 **나선형(spiral) 순서로** 순회하여 1차원 배열로 반환하는 문제입니다.

Given an `m x n` matrix, return all elements of the matrix in **spiral order**.

---

## 입력 (Input)

- 2차원 정수 배열 `matrix`

An `m x n` integer matrix `matrix`.

---

## 출력 (Output)

- 나선형 순서로 방문한 원소들을 담은 1차원 정수 배열을 반환합니다.

Return a 1D array of elements in spiral order.

---

## 예시 (Example)

### 예시 1

- 입력 / Input:

```text
matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
]
```

- 출력 / Output: `[1, 2, 3, 6, 9, 8, 7, 4, 5]`

---

## 접근 방법 (Approach)

### 설명 (Korean)

이 문제는 **경계(boundary)를 줄여 가며 배열을 순회**하는 전형적인 배열 순회 문제입니다.

- 네 개의 포인터를 사용합니다:
  - `top` (현재 남은 가장 위쪽 행 인덱스)
  - `bottom` (가장 아래 행 인덱스)
  - `left` (가장 왼쪽 열 인덱스)
  - `right` (가장 오른쪽 열 인덱스)

1. 위쪽 행을 왼쪽에서 오른쪽으로 순회합니다. (`top` 고정, `left -> right`)
   - 그런 다음 `top++` (위쪽 경계를 한 칸 아래로 내립니다.)
2. 오른쪽 열을 위에서 아래로 순회합니다. (`right` 고정, `top -> bottom`)
   - 그런 다음 `right--` (오른쪽 경계를 한 칸 왼쪽으로 줄입니다.)
3. 아직 `top <= bottom` 이라면, 아래쪽 행을 오른쪽에서 왼쪽으로 순회합니다.
   - 그런 다음 `bottom--`.
4. 아직 `left <= right` 이라면, 왼쪽 열을 아래에서 위로 순회합니다.
   - 그런 다음 `left++`.

이 과정을 `top <= bottom` 그리고 `left <= right` 인 동안 반복합니다.

### Description (English)

We maintain four boundaries and peel off one "layer" of the matrix at a time:

- `top`, `bottom`, `left`, `right`.

For each layer:

1. Traverse the top row from `left` to `right`, then increment `top`.
2. Traverse the right column from `top` to `bottom`, then decrement `right`.
3. If `top <= bottom`, traverse the bottom row from `right` to `left`, then decrement `bottom`.
4. If `left <= right`, traverse the left column from `bottom` to `top`, then increment `left`.

Repeat while `top <= bottom` and `left <= right`.

---

## JavaScript 코드 (JavaScript Code)

```javascript
function spiralOrder(matrix) {
  const result = [];
  if (matrix.length === 0 || matrix[0].length === 0) return result;

  let top = 0;
  let bottom = matrix.length - 1;
  let left = 0;
  let right = matrix[0].length - 1;

  while (top <= bottom && left <= right) {
    // Traverse top row
    for (let col = left; col <= right; col++) {
      result.push(matrix[top][col]);
    }
    top++;

    // Traverse right column
    for (let row = top; row <= bottom; row++) {
      result.push(matrix[row][right]);
    }
    right--;

    // Traverse bottom row (if still valid)
    if (top <= bottom) {
      for (let col = right; col >= left; col--) {
        result.push(matrix[bottom][col]);
      }
      bottom--;
    }

    // Traverse left column (if still valid)
    if (left <= right) {
      for (let row = bottom; row >= top; row--) {
        result.push(matrix[row][left]);
      }
      left++;
    }
  }

  return result;
}
```

## 코드 라인별 설명 (Line-by-Line Explanation)

- `function spiralOrder(matrix) { ... }`
  - **KO:** 2차원 배열 `matrix`를 나선형 순서로 순회하는 함수입니다.
  - **EN:** Returns the elements of `matrix` in spiral order.

- `const result = [];`
  - **KO:** 나선형 순서로 방문한 원소들을 저장할 배열입니다.
  - **EN:** Stores elements in the order they are visited.

- `if (matrix.length === 0 || matrix[0].length === 0) return result;`
  - **KO:** 빈 행렬인 경우 바로 빈 배열을 반환합니다.
  - **EN:** Handles the empty-matrix edge case.

- `let top = 0, bottom = matrix.length - 1, left = 0, right = matrix[0].length - 1;`
  - **KO:** 현재 남은 부분 행렬의 네 경계를 초기화합니다.
  - **EN:** Initializes top, bottom, left, and right boundaries.

- `while (top <= bottom && left <= right) { ... }`
  - **KO:** 경계가 유효한 동안 한 겹(layer)씩 순회합니다.
  - **EN:** Continues peeling layers while there is still a valid submatrix.

- `for (let col = left; col <= right; col++) { result.push(matrix[top][col]); }`
  - **KO:** 위쪽 행을 왼쪽에서 오른쪽으로 순회합니다.
  - **EN:** Traverses the top row from left to right.

- `top++;`
  - **KO:** 위쪽 행을 처리했으므로 `top` 경계를 한 칸 아래로 이동합니다.
  - **EN:** Moves the top boundary down.

- `for (let row = top; row <= bottom; row++) { result.push(matrix[row][right]); }`
  - **KO:** 오른쪽 열을 위에서 아래로 순회합니다.
  - **EN:** Traverses the right column from top to bottom.

- `right--;`
  - **KO:** 오른쪽 열을 처리했으므로 `right` 경계를 한 칸 왼쪽으로 이동합니다.
  - **EN:** Moves the right boundary left.

- `if (top <= bottom) { ... bottom row ... }`
  - **KO:** 아직 남은 행이 있다면, 아래쪽 행을 오른쪽에서 왼쪽으로 순회합니다.
  - **EN:** If there is still a row left, traverses the bottom row from right to left.

- `if (left <= right) { ... left column ... }`
  - **KO:** 아직 남은 열이 있다면, 왼쪽 열을 아래에서 위로 순회합니다.
  - **EN:** If there is still a column left, traverses the left column from bottom to top.

- `return result;`
  - **KO:** 나선형으로 방문한 모든 원소를 반환합니다.
  - **EN:** Returns the collected spiral order.

---

## 시간 및 공간 복잡도 (Time and Space Complexity)

- 시간 복잡도 (Time Complexity): `O(m * n)`
  - 각 원소를 정확히 한 번씩 방문합니다.
- 공간 복잡도 (Space Complexity): `O(1)` (출력 배열 제외)
  - 추가적인 변수는 상수 개수뿐입니다.
