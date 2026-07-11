# 20. 병합 정렬 구현 (Implement Merge Sort)

> Related LeetCode: [Sort an Array](https://leetcode.com/problems/sort-an-array/)

## 문제 설명 (Problem Description)

정수 배열 `nums`가 주어졌을 때, **병합 정렬(Merge Sort)** 알고리즘을 사용하여
배열을 **오름차순으로 정렬**하는 함수를 구현하는 문제입니다.

Given an integer array `nums`, implement **merge sort** to sort the array in ascending order.

---

## 입력 (Input)

- 정수 배열 `nums`

An integer array `nums`.

---

## 출력 (Output)

- 오름차순으로 정렬된 새 배열을 반환합니다.

Return a new array sorted in ascending order.

---

## 예시 (Example)

### 예시 1

- 입력 / Input: `nums = [5, 2, 3, 1]`
- 출력 / Output: `[1, 2, 3, 5]`

### 예시 2

- 입력 / Input: `nums = [5, 1, 1, 2, 0, 0]`
- 출력 / Output: `[0, 0, 1, 1, 2, 5]`

---

## 접근 방법 (Approach)

### 설명 (Korean)

병합 정렬은 **분할 정복(Divide and Conquer)** 알고리즘입니다.

1. 배열을 절반으로 나눕니다.
2. 왼쪽 부분 배열을 재귀적으로 정렬합니다.
3. 오른쪽 부분 배열을 재귀적으로 정렬합니다.
4. 두 정렬된 배열을 **병합(merge)** 하여 하나의 정렬된 배열을 만듭니다.

병합 단계에서는 두 배열의 앞부분을 가리키는 포인터 두 개를 사용하여,
더 작은 원소를 결과 배열에 차례대로 넣습니다.

### Description (English)

Merge sort is a **divide-and-conquer** algorithm:

1. Divide the array into two halves.
2. Recursively sort the left half.
3. Recursively sort the right half.
4. **Merge** the two sorted halves into a single sorted array.

During the merge step, we use two pointers into the left and right arrays
and repeatedly pick the smaller element.

---

## JavaScript 코드 (JavaScript Code)

```javascript
function mergeSort(nums) {
  if (nums.length <= 1) return nums;

  const mid = Math.floor(nums.length / 2);
  const left = nums.slice(0, mid);
  const right = nums.slice(mid);

  const sortedLeft = mergeSort(left);
  const sortedRight = mergeSort(right);

  return merge(sortedLeft, sortedRight);
}

function merge(left, right) {
  const result = [];
  let i = 0;
  let j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }

  while (i < left.length) {
    result.push(left[i]);
    i++;
  }

  while (j < right.length) {
    result.push(right[j]);
    j++;
  }

  return result;
}
```

## 코드 라인별 설명 (Line-by-Line Explanation)

- `function mergeSort(nums) { ... }`
  - **KO:** 배열 `nums`를 병합 정렬로 정렬하는 함수입니다.
  - **EN:** Sorts the array `nums` using merge sort.

- `if (nums.length <= 1) return nums;`
  - **KO:** 길이가 0 또는 1이면 이미 정렬된 상태이므로 그대로 반환합니다.
  - **EN:** Base case: arrays of size 0 or 1 are already sorted.

- `const mid = Math.floor(nums.length / 2);`
  - **KO:** 배열을 반으로 나누기 위한 중간 인덱스를 계산합니다.
  - **EN:** Finds the midpoint to split the array.

- `const left = nums.slice(0, mid); const right = nums.slice(mid);`
  - **KO:** 배열을 왼쪽과 오른쪽 두 부분으로 나눕니다.
  - **EN:** Splits `nums` into left and right halves.

- `const sortedLeft = mergeSort(left); const sortedRight = mergeSort(right);`
  - **KO:** 왼쪽과 오른쪽 부분 배열을 재귀적으로 정렬합니다.
  - **EN:** Recursively sorts both halves.

- `return merge(sortedLeft, sortedRight);`
  - **KO:** 정렬된 두 배열을 병합하여 하나의 정렬된 배열을 반환합니다.
  - **EN:** Merges the two sorted halves into a single sorted array.

- `function merge(left, right) { ... }`
  - **KO:** 두 정렬된 배열 `left`, `right`를 하나의 정렬된 배열로 합치는 함수입니다.
  - **EN:** Merges two sorted arrays into one sorted array.

- `while (i < left.length && j < right.length) { ... }`
  - **KO:** 두 배열 모두에 아직 남은 원소가 있는 동안, 더 작은 값을 결과 배열에 추가합니다.
  - **EN:** While both arrays have remaining elements, picks the smaller element.

- `while (i < left.length) { ... }` / `while (j < right.length) { ... }`
  - **KO:** 한쪽 배열이 먼저 소진되면, 다른 쪽에 남은 원소들을 모두 결과 배열에 추가합니다.
  - **EN:** Appends any remaining elements from either array.

- `return result;`
  - **KO:** 병합 결과 정렬된 배열을 반환합니다.
  - **EN:** Returns the merged, sorted array.

---

## 시간 및 공간 복잡도 (Time and Space Complexity)

- 시간 복잡도 (Time Complexity): `O(n log n)`
  - 배열을 절반씩 나누는 데 `log n` 단계, 각 단계마다 전체 원소를 병합하는 데 `O(n)`.
- 공간 복잡도 (Space Complexity): `O(n)`
  - 병합 과정에서 추가 배열이 필요합니다.
