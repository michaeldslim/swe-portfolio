# 57. Quick Sort & Merge Sort in JavaScript

## 1. 질문 (Question)

- Quick Sort 와 Merge Sort 의 아이디어를 각각 설명해 보세요.
- 두 알고리즘의 **시간 복잡도와 공간 복잡도**는 어떻게 되나요?
- JavaScript 로 구현할 때 주의할 점(불변성, in-place 여부 등)을 설명해 보세요.

---

## 2. 개념 정리 (Concept Overview)

### Quick Sort

#### 한국어 (Korean)

- **아이디어**
  - 하나의 원소를 "피벗(pivot)"으로 선택.
  - 피벗보다 **작은 값들**과 **큰 값들**로 배열을 둘로 나눔(partition).
  - 각 부분 배열에 대해 **재귀적으로 같은 작업** 반복.
- 특징
  - 평균 시간 복잡도: **O(n log n)**
  - 최악 시간 복잡도: **O(n²)** (정렬된 배열에서 항상 끝 원소를 피벗으로 고르는 등).
  - 보통 in-place 구현이 가능 (추가 배열 거의 안 쓰고 인덱스만 바꾸는 방식).

#### English

- **Idea**
  - Pick a pivot element.
  - Partition the array into elements **less than pivot** and **greater than pivot**.
  - Recursively quicksort the partitions.
- Characteristics
  - Average time: **O(n log n)**
  - Worst time: **O(n²)** (bad pivot choices).
  - Often implemented **in-place** using index swaps.

---

### Merge Sort

#### 한국어 (Korean)

- **아이디어**
  - 배열을 절반씩 나누어 더 이상 나눌 수 없을 때까지 재귀적으로 분할.
  - 나뉜 두 배열을 **정렬된 상태로 병합(merge)**.
- 특징
  - 항상 시간 복잡도: **O(n log n)** (최선/최악/평균 동일).
  - 추가 배열이 필요해서 공간 복잡도: **O(n)**.
  - 안정 정렬(stable sort)로 구현하기 쉬움.

#### English

- **Idea**
  - Recursively split the array into halves until single-element arrays.
  - **Merge** two sorted halves into one sorted array.
- Characteristics
  - Time: **O(n log n)** in all cases.
  - Space: **O(n)** extra memory for merges.
  - Easy to implement as a **stable** sort.

---

## 3. JavaScript 구현 예시 (JS Implementations)

### 3.1 Quick Sort (불변 버전: 새 배열 반환)

```js
function quickSort(arr) {
  if (arr.length <= 1) return arr;

  const pivotIndex = arr.length - 1; // 마지막 인덱스를 피벗으로 사용
  const pivot = arr[pivotIndex];

  const left = [];
  const right = [];

  for (let i = 0; i < arr.length; i++) {
    if (i === pivotIndex) continue;
    if (arr[i] < pivot) left.push(arr[i]);
    else right.push(arr[i]);
  }

  return [...quickSort(left), pivot, ...quickSort(right)];
}

console.log(quickSort([3, 6, 1, 5, 2, 4]));
```

#### KO 설명

- 길이가 0 또는 1인 배열은 이미 정렬된 상태 → 그대로 반환.
- 마지막 인덱스를 피벗으로 선택.
- 전체 배열을 순회하면서 피벗보다 작은 값은 `left`, 큰 값은 `right` 에 넣음.
- `left`, `right` 에 대해 재귀적으로 `quickSort` 를 적용 후
  - `[...quickSort(left), pivot, ...quickSort(right)]` 로 병합.
- 원본 배열을 변경하지 않는 **불변(immutable)** 버전.

#### EN Explanation

- Base case: arrays of length 0 or 1 are already sorted.
- Choose a pivot (here, the last element).
- Partition into `left` (< pivot) and `right` (>= pivot).
- Recursively sort `left` and `right`, then concatenate results.
- This version is **not in-place**; it returns a new sorted array.

---

### 3.2 Quick Sort (in-place 버전: 인덱스 스왑)

```js
function quickSortInPlace(arr, left = 0, right = arr.length - 1) {
  if (left >= right) return;

  const pivotIndex = partition(arr, left, right);
  quickSortInPlace(arr, left, pivotIndex - 1);
  quickSortInPlace(arr, pivotIndex + 1, right);
}

function partition(arr, left, right) {
  const pivot = arr[right];
  let i = left - 1;

  for (let j = left; j < right; j++) {
    if (arr[j] <= pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]]; // swap
    }
  }

  [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];
  return i + 1;
}

const arr = [3, 6, 1, 5, 2, 4];
quickSortInPlace(arr);
console.log(arr);
```

#### KO 설명

- `partition` 함수는 `pivot` 기준으로 배열을 재배치:
  - `pivot` 보다 작거나 같은 값들은 앞쪽으로, 큰 값들은 뒤쪽으로 이동.
  - 최종적으로 `pivot` 이 있어야 할 인덱스를 반환.
- `quickSortInPlace` 는 반환된 `pivotIndex` 기준으로 왼쪽/오른쪽 부분 배열에 재귀 호출.
- 추가 배열을 거의 쓰지 않고 **배열 내부에서 인덱스만 교환**하는 in-place 구현.

#### EN Explanation

- `partition` rearranges elements so that
  - values <= pivot are on the left, others on the right.
  - returns the index where the pivot ends up.
- `quickSortInPlace` recursively sorts the subarrays around the pivot.
- This is an **in-place** quicksort using swaps.

---

### 3.3 Merge Sort (불변 버전)

```js
function mergeSort(arr) {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);

  return merge(mergeSort(left), mergeSort(right));
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

  return result.concat(left.slice(i), right.slice(j));
}

console.log(mergeSort([3, 6, 1, 5, 2, 4]));
```

#### KO 설명

- `mergeSort`:
  - 배열을 절반으로 나눔 (`left`, `right`).
  - 각 절반에 대해 재귀적으로 `mergeSort` 호출.
  - 두 정렬된 배열을 `merge` 함수로 병합.
- `merge`:
  - 두 포인터 `i`, `j` 를 사용해 두 배열을 순회.
  - 더 작은 값을 `result` 에 push 하며 진행 → 항상 `result` 는 정렬된 상태 유지.
  - 한쪽이 끝나면 나머지 배열을 통째로 이어 붙임.

#### EN Explanation

- `mergeSort` splits the array into halves, recursively sorts each half, then merges them.
- `merge` walks both sorted arrays with pointers and builds a new sorted result.
- This implementation creates new arrays (not in-place) and has **O(n)** extra space.

---

## 4. 시간/공간 복잡도 (Time & Space Complexity)

### Quick Sort

- **평균 시간 (Average)**: O(n log n)
- **최악 시간 (Worst)**: O(n²) – pivot 선택이 항상 나쁠 때 (예: 이미 정렬된 배열 + 첫/마지막 원소를 pivot으로 사용).
- **공간 (Space)**:
  - 불변 버전: 재귀 + 새 배열 생성 때문에 O(n) 이상.
  - in-place 버전: 재귀 호출 스택 때문에 평균 O(log n), 최악 O(n).

### Merge Sort

- **시간 (Time)**: 항상 O(n log n)
- **공간 (Space)**: O(n) – 병합을 위한 추가 배열 필요.

---

## 5. 면접 포인트 (Interview Angle)

### 한국어 (Korean)

- Quick Sort 와 Merge Sort 둘 다 **분할 정복(divide and conquer)** 알고리즘.
- Quick Sort:
  - 평균적으로 빠르고, in-place 구현 가능.
  - 하지만 최악의 경우 O(n²) 이므로, pivot 선택 전략(랜덤 피벗, median-of-three 등)을 언급하면 좋음.
- Merge Sort:
  - 항상 O(n log n) 이라는 안정적인 시간 복잡도.
  - 추가 메모리가 필요하지만, **링크드 리스트 정렬**이나 외부 정렬(external sort) 등에서 장점.

### English

- Both are **divide-and-conquer** sorting algorithms.
- Quick Sort:
  - Usually very fast and can be done in-place.
  - But has O(n²) worst case; mentioning better pivot strategies is a plus.
- Merge Sort:
  - Predictable O(n log n) time in all cases.
  - Requires extra space but is stable and good for linked lists / external sorting.

---

## 6. 한 줄 요약 (Summary)

- **KO**: Quick Sort 는 피벗을 기준으로 배열을 분할해 재귀적으로 정렬하는 알고리즘으로 평균 O(n log n), 최악 O(n²) 이고 in-place 구현이 가능하며, Merge Sort 는 배열을 반으로 나눠서 정렬된 두 배열을 병합하는 알고리즘으로 항상 O(n log n) 이지만 추가 메모리가 필요한 정렬입니다.
- **EN**: Quick sort partitions around a pivot and recursively sorts subarrays (average O(n log n), worst O(n²), often in-place), while merge sort splits the array into halves and merges sorted halves (always O(n log n) with O(n) extra space).
