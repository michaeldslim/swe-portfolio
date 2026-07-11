# 28. 이진 탐색 (Binary Search on Sorted Array)

> Related LeetCode: [Binary Search](https://leetcode.com/problems/binary-search/)

## 문제 설명 (Problem Description)

**오름차순 정렬된** 정수 배열 `nums` 와 정수 `target` 이 주어졌을 때,
`target` 이 배열에 존재한다면 그 **인덱스**를, 존재하지 않는다면 `-1`을 반환하는 문제입니다.

Given an array of integers `nums` which is sorted in ascending order, and an integer `target`, return the index of `target` if it exists in the array; otherwise, return `-1`.

---

## 입력 (Input)

- 오름차순 정렬된 정수 배열 `nums`
- 정수 `target`

A sorted integer array `nums` (ascending) and an integer `target`.

---

## 출력 (Output)

- `target` 이 존재하면 그 인덱스, 아니면 `-1`.

Return the index of `target` in `nums`, or `-1` if not found.

---

## 예시 (Example)

### 예시 1

- 입력 / Input: `nums = [-1,0,3,5,9,12]`, `target = 9`
- 출력 / Output: `4`

### 예시 2

- 입력 / Input: `nums = [-1,0,3,5,9,12]`, `target = 2`
- 출력 / Output: `-1`

---

## 접근 방식 (Approach)

### 아이디어 (Korean)

- 배열이 정렬되어 있으므로 **이진 탐색(Binary Search)** 를 사용할 수 있습니다.
- 구간을 `[left, right]` 로 두고 다음을 반복합니다.
  - `mid = (left + right) / 2` (정수 나눗셈) 를 계산합니다.
  - `nums[mid]` 와 `target` 을 비교합니다.
    - 같으면 `mid` 를 반환합니다.
    - `nums[mid] < target` 이면, `left = mid + 1` 로 오른쪽 절반에서만 탐색합니다.
    - `nums[mid] > target` 이면, `right = mid - 1` 로 왼쪽 절반에서만 탐색합니다.
- `left` 가 `right` 를 넘어가면 탐색 대상이 없으므로 `-1` 입니다.

### Idea (English)

- Since the array is sorted, we can use **binary search**.
- Maintain two pointers `left` and `right` defining the current search range.
- While `left <= right`:
  - Compute `mid = Math.floor((left + right) / 2)`.
  - If `nums[mid] === target`, return `mid`.
  - If `nums[mid] < target`, search the right half by setting `left = mid + 1`.
  - If `nums[mid] > target`, search the left half by setting `right = mid - 1`.
- If we exit the loop, `target` is not in the array; return `-1`.

---

## 자바스크립트 코드 (JavaScript Code)

```javascript
function search(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] === target) {
      return mid;
    }

    if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1;
}
```

---

## 코드 라인별 설명 (Line-by-line Explanation)

### 한국어 (Korean)

- `function search(nums, target) { ... }`  
  - 정렬된 배열에서 이진 탐색으로 `target` 을 찾는 함수입니다.
- `let left = 0; let right = nums.length - 1;`  
  - 탐색 구간의 양 끝 인덱스를 초기화합니다.
- `while (left <= right) { ... }`  
  - 탐색 구간이 유효한 동안 반복합니다.
- `const mid = Math.floor((left + right) / 2);`  
  - 현재 구간의 중간 인덱스를 계산합니다.
- `if (nums[mid] === target) { return mid; }`  
  - 중간 값이 `target` 과 같으면 바로 인덱스를 반환합니다.
- `if (nums[mid] < target) { left = mid + 1; }`  
  - 중간 값이 `target` 보다 작으면, `target` 은 오른쪽에만 있을 수 있으므로 왼쪽 경계를 옮깁니다.
- `else { right = mid - 1; }`  
  - 중간 값이 `target` 보다 크면, `target` 은 왼쪽에만 있을 수 있으므로 오른쪽 경계를 옮깁니다.
- `return -1;`  
  - 루프를 빠져나오면 값이 배열에 없으므로 `-1`을 반환합니다.

### English

- `function search(nums, target) { ... }`  
  - Function that performs binary search on a sorted array.
- `let left = 0; let right = nums.length - 1;`  
  - Initialize search boundaries.
- `while (left <= right) { ... }`  
  - Continue while there is a valid search range.
- `const mid = Math.floor((left + right) / 2);`  
  - Compute the middle index.
- `if (nums[mid] === target) { return mid; }`  
  - If the middle element equals `target`, return its index.
- `if (nums[mid] < target) { left = mid + 1; }`  
  - If the middle element is smaller, discard the left half.
- `else { right = mid - 1; }`  
  - If the middle element is larger, discard the right half.
- `return -1;`  
  - If the loop ends, `target` is not present; return `-1`.

---

## 시간 및 공간 복잡도 (Time and Space Complexity)

- 시간 복잡도 (Time Complexity): `O(log n)`  
  - 매 단계에서 탐색 범위를 절반으로 줄입니다.
- 공간 복잡도 (Space Complexity): `O(1)`  
  - 추가적인 메모리를 거의 사용하지 않습니다.
