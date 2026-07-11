# 10. 가장 긴 증가하는 부분 수열 (Longest Increasing Subsequence with DP + Binary Search)

> Related LeetCode: [Longest Increasing Subsequence](https://leetcode.com/problems/longest-increasing-subsequence/)

## 문제 설명 (Problem Description)

정수 배열 `nums`가 주어졌을 때,
**가장 긴 증가하는 부분 수열(Longest Increasing Subsequence, LIS)** 의 길이를 구하는 문제입니다.

여기서 "부분 수열(subsequence)"은 원래 배열에서 일부 원소를 선택하되,
**순서는 유지**하지만 **연속일 필요는 없습니다.**

Given an integer array `nums`, return the length of the **longest strictly increasing subsequence**.
A subsequence is a sequence that can be derived from the array by deleting some or no elements
without changing the order of the remaining elements.

---

## 입력 (Input)

- 정수 배열 `nums`

An integer array `nums`.

---

## 출력 (Output)

- 가장 긴 증가하는 부분 수열의 **길이**를 정수로 반환합니다.

Return the **length** of the longest strictly increasing subsequence.

---

## 예시 (Example)

### 예시 1

- 입력 / Input: `nums = [10, 9, 2, 5, 3, 7, 101, 18]`
- 출력 / Output: `4`
- 설명 / Explanation:
  - 가장 긴 증가하는 부분 수열 중 하나는 `[2, 3, 7, 101]` 이며, 길이는 4입니다.

---

## 접근 방법 (Approach)

### 설명 (Korean)

기본적인 `O(n^2)` DP 방법도 있지만, 여기서는 더 효율적인 **`O(n log n)` 방법**을 사용합니다.
이 방법은 흔히 **patience sorting** 또는 **tails 배열** 기법이라고 불립니다.

아이디어:

- `tails[len]` 를 "길이가 `len+1` 인 증가하는 부분 수열들 중에서, **마지막 값(꼬리 값)이 가장 작은 값**"으로 정의합니다.
- 배열을 왼쪽에서 오른쪽으로 순회하면서, 각 숫자 `num` 이 들어갈 적절한 위치를 이분 탐색으로 찾습니다.

구현 단계:

1. 빈 배열 `tails` 를 준비합니다.
2. 배열 `nums` 를 순회하면서 각 원소 `num` 에 대해 다음을 수행합니다.
   - `tails` 배열에서, `num` 보다 **작거나 같은 값 중 가장 오른쪽**이 아닌,
     `num` 보다 **작은 값 다음 위치(즉, 첫 번째로 `tails[mid] >= num` 인 위치)** 를 이분 탐색으로 찾습니다.
   - 이 위치를 `idx` 라고 할 때:
     - 만약 `idx` 가 `tails.length` 와 같다면, `tails` 끝에 `num` 을 추가합니다.
       - 이는 증가하는 부분 수열의 길이를 1 증가시키는 효과입니다.
     - 그렇지 않다면, `tails[idx] = num` 으로 교체합니다.
       - 이렇게 하면, 같은 길이를 가진 증가 부분 수열들 중, **꼬리 값이 더 작은 수열**을 유지할 수 있어
         추후 더 긴 수열로 확장하기 유리합니다.
3. 모든 숫자를 처리한 후, `tails.length` 가 LIS의 길이가 됩니다.

직관적으로, `tails` 배열은 실제 LIS를 그대로 저장하지는 않지만,
그 길이는 항상 **현재까지 가능한 가장 긴 증가 부분 수열의 길이**를 나타냅니다.

### Description (English)

We use an `O(n log n)` approach based on **patience sorting** and a **tails array**.

Idea:

- `tails[i]` is the **smallest possible tail value** of an increasing subsequence of length `i + 1`.
- We iterate through the array and, for each `num`, we determine where it fits in `tails` using binary search.

Algorithm:

1. Initialize an empty array `tails`.
2. For each `num` in `nums`:
   - Use binary search on `tails` to find the **first index `i` such that `tails[i] >= num`**.
   - If no such index exists (i.e., `num` is greater than all elements in `tails`), push `num` to the end of `tails`.
     - This means we found a longer increasing subsequence.
   - Otherwise, set `tails[i] = num`.
     - This keeps the subsequence of length `i + 1` valid, but with a smaller tail, making it easier to extend later.
3. After processing all numbers, `tails.length` is the length of the LIS.

Note: `tails` itself does not necessarily represent a real subsequence from the array,
but its length is always equal to the length of the LIS.

---

## JavaScript 코드 (JavaScript Code)

```javascript
function lengthOfLIS(nums) {
  const tails = []; // tails[i] = smallest tail of an increasing subsequence of length i+1

  for (const num of nums) {
    let left = 0;
    let right = tails.length;

    // Find the first index where tails[mid] >= num
    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (tails[mid] < num) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }

    // left is now the correct position to update/insert num
    tails[left] = num;
  }

  return tails.length;
}
```

## 코드 라인별 설명 (Line-by-Line Explanation)

- `function lengthOfLIS(nums) {`
  - **KO:** 정수 배열 `nums`를 받아, 가장 긴 증가하는 부분 수열의 길이를 반환하는 함수입니다.
  - **EN:** Declares a function that returns the length of the longest increasing subsequence in `nums`.

- `const tails = [];`
  - **KO:** 길이별로 가능한 가장 작은 꼬리 값을 저장하는 `tails` 배열을 초기화합니다.
  - **EN:** Initializes the `tails` array that holds the smallest tail for subsequences of each length.

- `for (const num of nums) {`
  - **KO:** 배열의 각 원소 `num`을 순회합니다.
  - **EN:** Iterates through each number in `nums`.

- `let left = 0; let right = tails.length;`
  - **KO:** 이분 탐색을 위한 왼쪽, 오른쪽 포인터를 설정합니다.
  - **EN:** Sets the binary search bounds over the `tails` array.

- `while (left < right) { ... }`
  - **KO:** `tails`에서 `num`이 들어갈 첫 번째 위치( `tails[mid] >= num` )를 찾기 위해 이분 탐색을 수행합니다.
  - **EN:** Performs binary search to find the first index where `tails[mid] >= num`.

- `const mid = Math.floor((left + right) / 2);`
  - **KO:** 중간 인덱스를 계산합니다.
  - **EN:** Computes the midpoint of the current search interval.

- `if (tails[mid] < num) { left = mid + 1; }`
  - **KO:** `tails[mid]`가 `num`보다 작으면, `num`은 더 오른쪽에 들어가야 하므로 `left`를 오른쪽으로 이동합니다.
  - **EN:** If the tail at `mid` is smaller than `num`, moves `left` to search in the right half.

- `else { right = mid; }`
  - **KO:** 그렇지 않으면( `tails[mid] >= num` ), `num`은 이 위치나 그 왼쪽에 들어갈 수 있으므로 상한을 줄입니다.
  - **EN:** Otherwise, moves `right` leftwards to include `mid` as a possible insertion point.

- `tails[left] = num;`
  - **KO:** 이분 탐색이 끝나면 `left`는 `num`이 들어갈 위치입니다.
    - `left`가 기존 길이와 같으면(배열 끝), 새로운 더 긴 수열을 만들고,
    - 그렇지 않으면 기존 값을 더 작은 `num`으로 교체해 같은 길이의 수열 꼬리를 줄입니다.
  - **EN:** Inserts `num` at position `left`, either extending `tails` or replacing a larger tail to keep it minimal.

- `return tails.length;`
  - **KO:** `tails` 배열의 길이는 현재까지 만들 수 있는 가장 긴 증가 부분 수열의 길이입니다.
  - **EN:** Returns the length of `tails`, which equals the length of the LIS.

---

## 시간 및 공간 복잡도 (Time and Space Complexity)

- 시간 복잡도 (Time Complexity): `O(n log n)`
  - 각 원소마다 `tails` 배열에 대해 이분 탐색(`log n` 수준)을 수행합니다.
- 공간 복잡도 (Space Complexity): `O(n)`
  - 최악의 경우, 모든 원소가 증가하는 순서로 주어지면 `tails` 길이는 `n`이 됩니다.
