# 26. 플러드 필 (Flood Fill with DFS/BFS)

> Related LeetCode: [Flood Fill](https://leetcode.com/problems/flood-fill/)

## 문제 설명 (Problem Description)

`image`라는 2D 그리드가 있고, 각 칸은 색깔을 나타내는 정수 값을 가집니다.
시작 좌표 `(sr, sc)` 와 새 색깔 `newColor` 가 주어졌을 때,
시작 픽셀과 **같은 색**을 가진 연결된 영역(상하좌우 인접)을 모두 `newColor` 로 바꾸는 문제입니다.

You are given an `image` represented by a 2D array.
Given a starting pixel `(sr, sc)` and a `newColor`, perform a **flood fill** so that all pixels connected to `(sr, sc)` (4-directionally) with the same original color are changed to `newColor`.

---

## 입력 (Input)

- 2차원 정수 배열 `image`
- 정수 `sr`, `sc` (시작 좌표: row, column)
- 정수 `newColor`

An integer 2D array `image`, integers `sr`, `sc`, and `newColor`.

---

## 출력 (Output)

- 색칠이 완료된 2차원 배열 `image`.

Return the modified `image` after flood fill.

---

## 예시 (Example)

### 예시 1

- 입력 / Input:

```text
image = [
  [1,1,1],
  [1,1,0],
  [1,0,1]
]
sr = 1, sc = 1, newColor = 2
```

- 출력 / Output:

```text
[
  [2,2,2],
  [2,2,0],
  [2,0,1]
]
```

---

## 접근 방식 (Approach)

### 아이디어 (Korean)

- 시작 픽셀 `(sr, sc)` 의 **원래 색**을 `original` 이라고 합니다.
- 만약 `original === newColor` 라면 아무 것도 할 필요가 없으므로 바로 반환합니다.
- DFS(또는 BFS)를 사용해 상하좌우 네 방향으로 퍼지면서:
  - 범위를 벗어나면 무시합니다.
  - 현재 색이 `original` 이 아니면 무시합니다.
  - 색을 `newColor` 로 바꾼 뒤, 네 방향으로 계속 탐색합니다.

### Idea (English)

- Let `original` be the color at `image[sr][sc]`.
- If `original === newColor`, return the image directly (nothing to change).
- Use DFS (or BFS) to explore 4-directionally (up, down, left, right):
  - If out of bounds, return.
  - If the current pixel's color is not `original`, return.
  - Otherwise, change its color to `newColor` and recurse to neighbors.

---

## 자바스크립트 코드 (JavaScript Code)

```javascript
function floodFill(image, sr, sc, newColor) {
  const original = image[sr][sc];
  if (original === newColor) {
    return image;
  }

  const rows = image.length;
  const cols = image[0].length;

  function dfs(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= cols) {
      return;
    }
    if (image[r][c] !== original) {
      return;
    }

    image[r][c] = newColor;

    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  }

  dfs(sr, sc);
  return image;
}
```

---

## 코드 라인별 설명 (Line-by-line Explanation)

### 한국어 (Korean)

- `function floodFill(image, sr, sc, newColor) { ... }`  
  - 플러드 필을 수행하는 메인 함수입니다.
- `const original = image[sr][sc];`  
  - 시작 픽셀의 원래 색을 저장합니다.
- `if (original === newColor) { return image; }`  
  - 이미 원하는 색과 같다면 더 이상 작업할 필요가 없습니다.
- `const rows = image.length; const cols = image[0].length;`  
  - 이미지의 행, 열 수를 저장합니다.
- `function dfs(r, c) { ... }`  
  - DFS로 (r, c) 위치에서 4방향으로 퍼져 나가는 재귀 함수입니다.
- 범위 체크 `if (r < 0 || r >= rows || c < 0 || c >= cols) { return; }`  
  - 그리드 밖으로 나가면 바로 종료합니다.
- 색 체크 `if (image[r][c] !== original) { return; }`  
  - 원래 색이 아닌 칸은 채우지 않습니다.
- `image[r][c] = newColor;`  
  - 현재 칸의 색을 새 색으로 변경합니다.
- 네 방향 재귀 호출  
  - `dfs(r + 1, c); dfs(r - 1, c); dfs(r, c + 1); dfs(r, c - 1);`
  - 상, 하, 좌, 우 이웃 칸으로 확장합니다.
- `dfs(sr, sc);`  
  - 시작 좌표에서 DFS를 시작합니다.
- `return image;`  
  - 색칠이 완료된 이미지를 반환합니다.

### English

- `function floodFill(image, sr, sc, newColor) { ... }`  
  - Main function that performs flood fill.
- `const original = image[sr][sc];`  
  - Store the original color of the starting pixel.
- `if (original === newColor) { return image; }`  
  - If the original color is already `newColor`, nothing needs to be changed.
- `const rows = image.length; const cols = image[0].length;`  
  - Cache the number of rows and columns.
- `function dfs(r, c) { ... }`  
  - Recursive helper function for DFS starting from `(r, c)`.
- Bounds check  
  - `if (r < 0 || r >= rows || c < 0 || c >= cols) { return; }`  
  - Stop if we go out of bounds.
- Color check  
  - `if (image[r][c] !== original) { return; }`  
  - Only fill cells that still have the original color.
- `image[r][c] = newColor;`  
  - Recolor the current cell.
- DFS in 4 directions  
  - `dfs(r + 1, c); dfs(r - 1, c); dfs(r, c + 1); dfs(r, c - 1);`
  - Explore neighbors up, down, left, and right.
- `dfs(sr, sc);`  
  - Start DFS from the given starting pixel.
- `return image;`  
  - Return the modified image.

---

## 시간 및 공간 복잡도 (Time and Space Complexity)

- 시간 복잡도 (Time Complexity): `O(m * n)`  
  - 최악의 경우 모든 칸을 한 번씩 방문할 수 있습니다.
- 공간 복잡도 (Space Complexity): `O(m * n)` (재귀 DFS 기준)  
  - 재귀 호출 스택이 최대 전체 칸 수에 비례할 수 있습니다. 실제로는 연결된 영역의 크기에 비례합니다.
