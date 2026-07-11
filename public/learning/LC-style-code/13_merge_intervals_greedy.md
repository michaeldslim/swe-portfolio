# 13. 구간 병합 (Merge Intervals with Greedy)

> Related LeetCode: [Merge Intervals](https://leetcode.com/problems/merge-intervals/)

## 문제 설명 (Problem Description)

구간(interval)들이 담긴 배열 `intervals` 가 주어졌을 때,
서로 겹치는 구간들을 병합하여 **겹치지 않는 구간들로만 이루어진 배열**을 반환하는 문제입니다.

Intervals are given as `intervals[i] = [start_i, end_i]`.
Merge all overlapping intervals and return an array of the non-overlapping intervals that cover all the intervals in the input.

---

## 입력 (Input)

- 2차원 정수 배열 `intervals`
  - 각 원소는 `[start, end]` 형태의 구간입니다.

A 2D integer array `intervals`, where each interval is `[start, end]`.

---

## 출력 (Output)

- 서로 겹치지 않는 구간들로만 이루어진 2차원 배열을 반환합니다.
- 각 구간은 입력과 같은 형식 `[start, end]` 입니다.

Return a 2D array of merged, non-overlapping intervals.

---

## 예시 (Example)

### 예시 1

- 입력 / Input: `intervals = [[1,3],[2,6],[8,10],[15,18]]`
- 출력 / Output: `[[1,6],[8,10],[15,18]]`
- 설명 / Explanation:
  - `[1,3]` 와 `[2,6]` 이 겹치므로 `[1,6]` 으로 병합됩니다.

### 예시 2

- 입력 / Input: `intervals = [[1,4],[4,5]]`
- 출력 / Output: `[[1,5]]`

---

## 접근 방법 (Approach)

### 설명 (Korean)

이 문제는 **정렬 + 그리디(Greedy)** 로 자주 풀립니다.

1. 먼저 구간들을 시작점 기준으로 오름차순 정렬합니다.
2. 결과 배열 `merged` 를 초기화합니다.
3. 정렬된 구간들을 앞에서부터 순회하면서,
   - `merged` 가 비어 있으면 현재 구간을 그대로 추가합니다.
   - `merged` 의 마지막 구간을 `last = merged[merged.length - 1]` 라고 할 때,
     - 만약 `current[0] <= last[1]` (현재 구간의 시작이 `last`의 끝과 겹치거나 붙어 있으면),
       - 겹치는 구간이므로 끝점을 `last[1] = max(last[1], current[1])` 로 갱신합니다.
     - 그렇지 않으면 겹치지 않는 새로운 구간이므로 `merged`에 그대로 추가합니다.

### Description (English)

This problem is commonly solved with **sorting + greedy**.

1. Sort the intervals by their start time.
2. Initialize an array `merged`.
3. Iterate over the sorted intervals:
   - If `merged` is empty, push the first interval.
   - Let `last = merged[merged.length - 1]` be the last merged interval, and `current` be the current interval.
     - If `current[0] <= last[1]`, the intervals overlap or touch:
       - Merge them by setting `last[1] = Math.max(last[1], current[1])`.
     - Otherwise, push `current` as a new non-overlapping interval.

---

## JavaScript 코드 (JavaScript Code)

```javascript
function merge(intervals) {
  if (intervals.length === 0) return [];

  intervals.sort((a, b) => a[0] - b[0]);
  const merged = [];

  for (const interval of intervals) {
    if (merged.length === 0) {
      merged.push(interval);
    } else {
      const last = merged[merged.length - 1];

      if (interval[0] <= last[1]) {
        last[1] = Math.max(last[1], interval[1]);
      } else {
        merged.push(interval);
      }
    }
  }

  return merged;
}
```

## 코드 라인별 설명 (Line-by-Line Explanation)

- `function merge(intervals) {`
  - **KO:** 구간 배열 `intervals`를 받아 겹치는 구간을 병합하는 함수입니다.
  - **EN:** Declares a function that merges overlapping intervals.

- `if (intervals.length === 0) return [];`
  - **KO:** 입력이 비어 있으면 빈 배열을 반환합니다.
  - **EN:** Handles the edge case of an empty input.

- `intervals.sort((a, b) => a[0] - b[0]);`
  - **KO:** 시작 시간을 기준으로 구간들을 오름차순 정렬합니다.
  - **EN:** Sorts intervals by their start value.

- `const merged = [];`
  - **KO:** 병합된 결과 구간들을 저장할 배열입니다.
  - **EN:** Array to store merged intervals.

- `for (const interval of intervals) {`
  - **KO:** 정렬된 각 구간을 순회합니다.
  - **EN:** Iterates through each sorted interval.

- `if (merged.length === 0) { merged.push(interval); }`
  - **KO:** 아직 아무 구간도 없는 경우, 현재 구간을 그대로 추가합니다.
  - **EN:** If `merged` is empty, just add the first interval.

- `const last = merged[merged.length - 1];`
  - **KO:** 현재까지 병합된 마지막 구간을 가져옵니다.
  - **EN:** Retrieves the last merged interval.

- `if (interval[0] <= last[1]) {`
  - **KO:** 현재 구간의 시작이 `last` 구간의 끝보다 작거나 같으면, 두 구간이 겹치거나 연결됩니다.
  - **EN:** If the current start is less than or equal to the last end, they overlap.

- `last[1] = Math.max(last[1], interval[1]);`
  - **KO:** 두 구간의 끝점 중 더 큰 값으로 `last`의 끝을 갱신하여 병합합니다.
  - **EN:** Merges by extending the end of `last` to cover the current interval if needed.

- `} else { merged.push(interval); }`
  - **KO:** 겹치지 않는 경우, 새로운 독립 구간으로 결과에 추가합니다.
  - **EN:** If they don’t overlap, adds `interval` as a new disjoint interval.

- `return merged;`
  - **KO:** 모든 구간 처리 후 병합된 결과를 반환합니다.
  - **EN:** Returns the array of merged intervals.

---

## 시간 및 공간 복잡도 (Time and Space Complexity)

- 시간 복잡도 (Time Complexity): `O(n log n)`
  - 정렬에 `O(n log n)`이 들고, 그리디 병합은 `O(n)`입니다.
- 공간 복잡도 (Space Complexity): `O(n)`
  - 결과 배열에 최대 `n`개의 구간이 저장될 수 있습니다.
