# 11. 격자에서의 유일한 경로 (Unique Paths in Grid with DP)

> Related LeetCode: [Unique Paths](https://leetcode.com/problems/unique-paths/)

## 문제 설명 (Problem Description)

`m x n` 격자(grid)가 있고, 로봇이 왼쪽 위 칸 `(0, 0)` 에서 시작해 오른쪽 아래 칸 `(m-1, n-1)` 로 이동하려고 합니다.
로봇은 **오른쪽(right)** 또는 **아래(down)** 로만 이동할 수 있습니다.

이때, 시작점에서 도착점까지 이동할 수 있는 **서로 다른 경로의 개수**를 구하는 문제입니다.

A robot is located at the top-left corner `(0, 0)` of an `m x n` grid.
The robot can only move either **down** or **right** at any point in time.

Given `m` and `n`, return the **number of unique paths** that the robot can take to reach the bottom-right corner.

---

## 입력 (Input)

- 정수 `m`, `n` (행과 열의 수)

Two integers `m` and `n`.

---

## 출력 (Output)

- 시작점에서 도착점까지 가능한 **유일한 경로의 개수**를 정수로 반환합니다.

Return an integer representing the number of unique paths.

---

## 예시 (Example)

### 예시 1

- 입력 / Input: `m = 3`, `n = 7`
- 출력 / Output: `28`

---

## 접근 방법 (Approach)

### 설명 (Korean)

이 문제는 전형적인 **2차원 동적 계획법(DP)** 문제입니다.

아이디어:

- `dp[i][j]` 를 `(0, 0)` 에서 `(i, j)` 까지 도달하는 **유일한 경로의 개수**라고 정의합니다.
- 로봇은 오른쪽 또는 아래로만 움직일 수 있으므로, `(i, j)` 에 도달하는 경로는
  - 위에서 내려오는 경로: `dp[i-1][j]`
  - 왼쪽에서 오는 경로: `dp[i][j-1]`
  - 둘을 합친 `dp[i][j] = dp[i-1][j] + dp[i][j-1]` 입니다.
- 맨 위 행(`i = 0`)과 맨 왼쪽 열(`j = 0`)은 각각 한 방향으로만 이동 가능하므로, 경로의 개수는 항상 1입니다.

구현:

1. `m x n` 크기의 2차원 배열 `dp`를 생성합니다.
2. 첫 행과 첫 열은 모두 1로 초기화합니다.
3. 나머지 칸들에 대해 `dp[i][j] = dp[i-1][j] + dp[i][j-1]` 를 채워 넣습니다.
4. 최종 답은 `dp[m-1][n-1]` 입니다.

### Description (English)

This is a classic **2D Dynamic Programming** problem.

Idea:

- Define `dp[i][j]` as the **number of unique paths** to reach cell `(i, j)` from `(0, 0)`.
- Since the robot can move only down or right, to reach `(i, j)` we can come from:
  - Above: `(i-1, j)` → `dp[i-1][j]`
  - Left: `(i, j-1)` → `dp[i][j-1]`
  - So `dp[i][j] = dp[i-1][j] + dp[i][j-1]`.
- The first row and first column have only one way to move (straight right or straight down), so all those cells have `dp = 1`.

Implementation steps:

1. Create a 2D array `dp` of size `m x n`.
2. Initialize the first row and first column to 1.
3. For each cell `(i, j)` with `i > 0` and `j > 0`, set `dp[i][j] = dp[i-1][j] + dp[i][j-1]`.
4. Return `dp[m-1][n-1]`.

---

## JavaScript 코드 (JavaScript Code)

```javascript
function uniquePaths(m, n) {
  // Initialize a 2D DP array with all 1s for the first row and first column
  const dp = Array.from({ length: m }, () => Array(n).fill(1));

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
    }
  }

  return dp[m - 1][n - 1];
}
```

## 코드 라인별 설명 (Line-by-Line Explanation)

- `function uniquePaths(m, n) {`
  - **KO:** 격자 크기 `m`, `n`을 받아 유일한 경로 수를 구하는 함수입니다.
  - **EN:** Declares a function that returns the number of unique paths in an `m x n` grid.

- `const dp = Array.from({ length: m }, () => Array(n).fill(1));`
  - **KO:** `m x n` 크기의 2차원 배열을 만들고, 모든 값을 1로 초기화합니다.
    - 첫 행과 첫 열은 항상 경로가 1개이므로, 이 초기화가 자연스럽게 그 의미를 포함합니다.
  - **EN:** Creates an `m x n` 2D array filled with `1`s, which correctly handles the first row/column base cases.

- `for (let i = 1; i < m; i++) {`
  - **KO:** 두 번째 행부터 마지막 행까지 순회합니다.
  - **EN:** Iterates from the second row to the last row.

- `for (let j = 1; j < n; j++) {`
  - **KO:** 두 번째 열부터 마지막 열까지 순회합니다.
  - **EN:** Iterates from the second column to the last column.

- `dp[i][j] = dp[i - 1][j] + dp[i][j - 1];`
  - **KO:** 위 칸과 왼쪽 칸에서 오는 경로 수를 더해 현재 칸의 경로 수를 구합니다.
  - **EN:** Sets each cell to the sum of the number of paths from above and from the left.

- `return dp[m - 1][n - 1];`
  - **KO:** 오른쪽 아래 도착점까지의 유일한 경로 수를 반환합니다.
  - **EN:** Returns the number of paths to the bottom-right corner.

---

## 시간 및 공간 복잡도 (Time and Space Complexity)

- 시간 복잡도 (Time Complexity): `O(m * n)`
  - 모든 칸을 한 번씩 채웁니다.
- 공간 복잡도 (Space Complexity): `O(m * n)`
  - `m x n` 크기의 DP 배열을 사용합니다.
