# 31. 빗물 트래핑 (Trapping Rain Water with Two Pointers)

> Related LeetCode: [Trapping Rain Water](https://leetcode.com/problems/trapping-rain-water/)

## 문제 설명 (Problem Description)

높이를 나타내는 비음이 아닌 정수 배열 `height` 가 주어졌을 때,
각 인덱스 i에서의 기둥 높이가 `height[i]` 라고 할 수 있습니다.

이 기둥들 사이에 비가 내렸을 때, **고일 수 있는 전체 빗물의 양**을 구하는 문제입니다.

Given `n` non-negative integers representing an elevation map where the width of each bar is 1,
compute how much **water** it can trap after raining.

---

## 입력 (Input)

- 비음이 아닌 정수 배열 `height`

An array of non-negative integers `height`.

---

## 출력 (Output)

- 고일 수 있는 전체 빗물의 양 (정수).

Return an integer representing the total amount of trapped rain water.

---

## 예시 (Example)

### 예시 1

- 입력 / Input: `height = [0,1,0,2,1,0,1,3,2,1,2,1]`
- 출력 / Output: `6`
- 설명 / Explanation:
  - 시각적으로 그려보면, 총 6 칸만큼의 물이 고입니다.

### 예시 2

- 입력 / Input: `height = [4,2,0,3,2,5]`
- 출력 / Output: `9`
- 설명 / Explanation:
  - 인덱스별로 고인 물의 양을 더하면 `1 + 3 + 1 + 0 + 4 = 9` 입니다.

---

## 접근 방식 (Approach)

### 아이디어 (Korean)

- 각 위치 i에서 고일 수 있는 물의 양은 다음과 같습니다:
  - `water[i] = min(왼쪽 최고 높이, 오른쪽 최고 높이) - height[i]`
  - 단, 이 값이 음수가 되면 0으로 간주합니다.
- 단순하게는 왼쪽/오른쪽 최고 높이를 매번 구하면 `O(n^2)` 이 되지만,
  **두 포인터(two pointers)** 를 사용하면 `O(n)` 에 풀 수 있습니다.
- 두 포인터 `left`, `right` 를 양 끝에서 시작하고,
  각각 현재까지의 최대 높이 `leftMax`, `rightMax` 를 유지합니다.
- 루프:
  - `height[left]` 와 `height[right]` 를 비교합니다.
  - 만약 `height[left] <= height[right]` 이면:
    - `leftMax` 와 `height[left]` 를 비교해 갱신합니다.
    - `leftMax > height[left]` 이면, 그 차이만큼 물이 고입니다.
    - 그런 뒤 `left++` 합니다.
  - 반대로 `height[left] > height[right]` 이면:
    - 대칭적으로 `rightMax` 쪽을 업데이트하고 `right--` 합니다.
- 왜 이게 가능한가?
  - `height[left] <= height[right]` 인 상황에서는, 오른쪽 쪽에는
    적어도 `height[left]` 만큼의 벽이 있기 때문에,
    왼쪽 칸에서 고일 수 있는 물의 높이는 **왼쪽 최대 높이만 보면 충분**합니다.

### Idea (English)

- At each index `i`, the trapped water is:
  - `water[i] = min(maxLeft, maxRight) - height[i]`
  - If this is negative, treat it as 0.
- A naive solution recomputes `maxLeft` and `maxRight` for every index → `O(n^2)`.
- We can use **two pointers** with running maxima to achieve `O(n)` time.
- Use two pointers `left` and `right` at the ends of the array, and two variables
  `leftMax` and `rightMax` to track the maximum height seen so far on each side.
- While `left <= right`:
  - If `height[left] <= height[right]`:
    - If `height[left] >= leftMax`, update `leftMax`.
    - Else, `leftMax - height[left]` is the water trapped at `left`.
    - Move `left` to the right.
  - Else (i.e., `height[left] > height[right]`):
    - Symmetrically handle the `right` side with `rightMax`.

---

## 자바스크립트 코드 (JavaScript Code)

```javascript
function trap(height) {
  let left = 0;
  let right = height.length - 1;
  let leftMax = 0;
  let rightMax = 0;
  let totalWater = 0;

  while (left <= right) {
    if (height[left] <= height[right]) {
      if (height[left] >= leftMax) {
        leftMax = height[left];
      } else {
        totalWater += leftMax - height[left];
      }
      left++;
    } else {
      if (height[right] >= rightMax) {
        rightMax = height[right];
      } else {
        totalWater += rightMax - height[right];
      }
      right--;
    }
  }

  return totalWater;
}
```

---

## 코드 라인별 설명 (Line-by-line Explanation)

### 한국어 (Korean)

- `function trap(height) { ... }`  
  - 빗물 트래핑 문제를 해결하는 메인 함수입니다.
- `let left = 0; let right = height.length - 1;`  
  - 배열 양 끝에서 시작하는 두 포인터입니다.
- `let leftMax = 0; let rightMax = 0;`  
  - 현재까지 왼쪽/오른쪽에서 본 최고 높이를 저장합니다.
- `let totalWater = 0;`  
  - 전체 고인 빗물의 양을 누적하는 변수입니다.
- `while (left <= right) { ... }`  
  - 두 포인터가 교차할 때까지 반복합니다.
- `if (height[left] <= height[right]) { ... } else { ... }`  
  - 더 낮은 쪽을 기준으로 물을 계산합니다.
- `if (height[left] >= leftMax) { leftMax = height[left]; }`  
  - 왼쪽 현재 높이가 지금까지의 최대보다 크면, 최대 높이를 갱신합니다.
- `else { totalWater += leftMax - height[left]; }`  
  - 그렇지 않으면, `leftMax` 를 기준으로 현재 칸에 고일 수 있는 물의 양을 더합니다.
- `left++;` / `right--;`  
  - 해당 방향의 포인터를 한 칸 이동합니다.
- `return totalWater;`  
  - 모든 칸을 처리한 뒤 고인 물의 총합을 반환합니다.

### English

- `function trap(height) { ... }`  
  - Main function that computes the total trapped water.
- `let left = 0; let right = height.length - 1;`  
  - Two pointers starting from the leftmost and rightmost indices.
- `let leftMax = 0; let rightMax = 0;`  
  - Track the maximum height seen so far from the left and from the right.
- `let totalWater = 0;`  
  - Accumulates the total amount of trapped water.
- `while (left <= right) { ... }`  
  - Iterate until the two pointers meet or cross.
- `if (height[left] <= height[right]) { ... } else { ... }`  
  - Always process the side with the lower current height, because its max bound is known.
- `if (height[left] >= leftMax) { leftMax = height[left]; }`  
  - Update `leftMax` when we see a new higher bar on the left.
- `else { totalWater += leftMax - height[left]; }`  
  - Otherwise, the water trapped at `left` is `leftMax - height[left]`.
- `if (height[right] >= rightMax) { rightMax = height[right]; }` / corresponding `else`  
  - Symmetric logic for the right pointer.
- `left++;` / `right--;`  
  - Move pointers inward each step.
- `return totalWater;`  
  - Return the total trapped water after processing all indices.

---

## 시간 및 공간 복잡도 (Time and Space Complexity)

- 시간 복잡도 (Time Complexity): `O(n)`  
  - 배열을 양 끝에서 시작해 한 번만 순회합니다.
- 공간 복잡도 (Space Complexity): `O(1)`  
  - 추가로 사용하는 변수는 상수 개수뿐입니다.
