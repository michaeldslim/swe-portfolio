# 22. 피벗 인덱스 찾기 (Find Pivot Index with Prefix Sum)

> Related LeetCode: [Find Pivot Index](https://leetcode.com/problems/find-pivot-index/)

## 문제 설명 (Problem Description)

정수 배열 `nums`가 주어졌을 때, **자신의 왼쪽 원소들의 합과 오른쪽 원소들의 합이 같은 위치**의 인덱스를 찾는 문제입니다.
이런 인덱스를 **피벗 인덱스(pivot index)** 라고 합니다.

피벗 인덱스가 여러 개라면 **가장 왼쪽** 인덱스를 반환하고,
없다면 `-1`을 반환합니다.

Given an integer array `nums`, return the **pivot index** where the sum of all the numbers strictly to the left of the index is equal to the sum of all the numbers strictly to the right of the index.

If the index is on the left edge, the left sum is `0`, and if it is on the right edge, the right sum is `0`.
If no such index exists, return `-1`.

---

## 입력 (Input)

- 정수 배열 `nums`

An integer array `nums`.

---

## 출력 (Output)

- 피벗 인덱스를 나타내는 정수 (없다면 `-1`).

Return an integer representing the pivot index, or `-1` if it does not exist.

---

## 예시 (Example)

### 예시 1

- 입력 / Input: `nums = [1, 7, 3, 6, 5, 6]`
- 출력 / Output: `3`
- 설명 / Explanation:
  - 인덱스 3의 값은 `6` 입니다.
  - 왼쪽 합: `1 + 7 + 3 = 11`
  - 오른쪽 합: `5 + 6 = 11`
  - 왼쪽과 오른쪽 합이 같으므로 피벗 인덱스입니다.

### 예시 2

- 입력 / Input: `nums = [1, 2, 3]`
- 출력 / Output: `-1`
- 설명 / Explanation:
  - 어떤 위치에서도 왼쪽 합과 오른쪽 합이 같지 않습니다.

### 예시 3

- 입력 / Input: `nums = [2, 1, -1]`
- 출력 / Output: `0`
- 설명 / Explanation:
  - 인덱스 0의 값은 `2` 입니다.
  - 왼쪽 합: 빈 구간이므로 `0`
  - 오른쪽 합: `1 + (-1) = 0`
  - 왼쪽과 오른쪽 합이 같으므로 피벗 인덱스는 0입니다.

### 예시 4

- 입력 / Input: `nums = [0, 0, 0, 0]`
- 출력 / Output: `0`
- 설명 / Explanation:
  - 인덱스 0의 왼쪽 합은 `0`, 오른쪽 합은 `0 + 0 + 0 = 0` 으로 같으므로 가장 왼쪽 피벗 인덱스는 0입니다.

---

## 접근 방식 (Approach)

### 아이디어 (Korean)

- 전체 합(`totalSum`)을 먼저 계산합니다.
- 왼쪽 합(`leftSum`)을 0에서 시작합니다.
- 인덱스 `i`를 순회하면서:
  - 현재 인덱스를 기준으로 오른쪽 합은 `rightSum = totalSum - leftSum - nums[i]` 입니다.
  - 만약 `leftSum === rightSum` 이면, 현재 인덱스가 피벗 인덱스입니다.
  - 아니라면, `leftSum += nums[i]` 를 해 주고 다음 인덱스로 이동합니다.
- 끝까지 찾지 못하면 `-1`을 반환합니다.
- 배열을 한 번만 순회하므로 시간 복잡도는 `O(n)` 입니다.

### Idea (English)

- Compute the total sum of the array (`totalSum`).
- Maintain a running left sum (`leftSum`), starting from 0.
- For each index `i`:
  - The right sum is `rightSum = totalSum - leftSum - nums[i]`.
  - If `leftSum === rightSum`, `i` is the pivot index, return it.
  - Otherwise, update `leftSum += nums[i]` and continue.
- If we finish the loop without finding any index, return `-1`.
- We only traverse the array once, so the time complexity is `O(n)`.

---

## 자바스크립트 코드 (JavaScript Code)

```javascript
function pivotIndex(nums) {
  let totalSum = 0;
  for (const num of nums) {
    totalSum += num;
  }

  let leftSum = 0;
  for (let i = 0; i < nums.length; i++) {
    const rightSum = totalSum - leftSum - nums[i];
    if (leftSum === rightSum) {
      return i;
    }
    leftSum += nums[i];
  }

  return -1;
}
```

---

## 코드 라인별 설명 (Line-by-line Explanation)

### 한국어 (Korean)

- `function pivotIndex(nums) {`  
  - 피벗 인덱스를 찾는 함수 정의입니다.
- `let totalSum = 0;`  
  - 전체 합을 저장할 변수를 0으로 초기화합니다.
- `for (const num of nums) { totalSum += num; }`  
  - 배열의 모든 원소를 순회하며 `totalSum`에 더해 전체 합을 계산합니다.
- `let leftSum = 0;`  
  - 왼쪽 부분 합을 나타내는 변수를 0으로 시작합니다.
- `for (let i = 0; i < nums.length; i++) { ... }`  
  - 인덱스 `i`를 0부터 끝까지 순회합니다.
- `const rightSum = totalSum - leftSum - nums[i];`  
  - 현재 인덱스 `i` 기준 오른쪽 합을 계산합니다.
  - 전체 합에서 왼쪽 합과 현재 값 `nums[i]`를 빼면 오른쪽 합이 됩니다.
- `if (leftSum === rightSum) { return i; }`  
  - 왼쪽 합과 오른쪽 합이 같다면, 현재 인덱스가 피벗 인덱스이므로 바로 반환합니다.
- `leftSum += nums[i];`  
  - 피벗이 아니라면, 현재 값을 왼쪽 합에 더하고 다음 인덱스로 이동합니다.
- `return -1;`  
  - 끝까지 순회했는데도 피벗 인덱스를 찾지 못하면 `-1`을 반환합니다.

### English

- `function pivotIndex(nums) {`  
  - Define a function to find the pivot index.
- `let totalSum = 0;`  
  - Initialize a variable to store the total sum of the array.
- `for (const num of nums) { totalSum += num; }`  
  - Loop through all elements and accumulate them into `totalSum`.
- `let leftSum = 0;`  
  - Initialize `leftSum` to track the sum of elements to the left of index `i`.
- `for (let i = 0; i < nums.length; i++) { ... }`  
  - Iterate over each index `i` in the array.
- `const rightSum = totalSum - leftSum - nums[i];`  
  - Compute the sum on the right side of index `i` by subtracting `leftSum` and `nums[i]` from `totalSum`.
- `if (leftSum === rightSum) { return i; }`  
  - If left sum equals right sum, we found the pivot index; return `i`.
- `leftSum += nums[i];`  
  - Otherwise, add the current value to `leftSum` and continue to the next index.
- `return -1;`  
  - If no index satisfies the condition, return `-1`.

---

## 시간 및 공간 복잡도 (Time and Space Complexity)

- 시간 복잡도 (Time Complexity): `O(n)`  
  - 배열을 두 번 선형으로 순회합니다 (전체 합 계산 1번 + 피벗 탐색 1번).
- 공간 복잡도 (Space Complexity): `O(1)`  
  - 추가로 사용하는 변수는 상수 개수뿐입니다.
