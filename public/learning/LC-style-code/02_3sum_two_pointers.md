# 2. 세 수의 합 (3Sum with Two Pointers)

> Related LeetCode: [3Sum](https://leetcode.com/problems/3sum/)

## 문제 설명 (Problem Description)

정수 배열 `nums`가 주어졌을 때, **서로 다른 인덱스** `i`, `j`, `k`에 대해
`nums[i] + nums[j] + nums[k] = 0` 을 만족하는 **모든 고유한(중복 없는) 세 수의 조합**을 찾는 문제입니다.

주어진 배열에서 세 수를 선택하여 합이 0이 되는 모든 조합을 찾아야 합니다.

Given an integer array `nums`, return all **unique triplets** `[nums[i], nums[j], nums[k]]`
such that `i != j`, `i != k`, `j != k`, and `nums[i] + nums[j] + nums[k] == 0`.

The solution set must **not contain duplicate triplets**.

---

## 입력 (Input)

- 정수 배열 `nums` 가 주어집니다.
- 일반적으로 `-10^5 <= nums[i] <= 10^5`, `0 <= nums.length <= 10^3 ~ 10^4` 정도로 가정합니다.

An integer array `nums` is given.

---

## 출력 (Output)

- 모든 고유한 세 수의 조합을 담은 2차원 배열을 반환합니다.
- 각 조합은 길이 3의 배열 `[a, b, c]` 이며, `a + b + c = 0` 을 만족합니다.
- 순서는 상관 없고, 중복 조합은 포함되지 않아야 합니다.

Return a 2D array of all unique triplets `[a, b, c]` such that `a + b + c = 0`.
Order does not matter, and duplicate triplets must not appear.

---

## 예시 (Example)

### 예시 1

- 입력 / Input: `nums = [-1, 0, 1, 2, -1, -4]`
- 가능한 출력 / One possible output:

```text
[[-1, -1, 2],
 [-1,  0, 1]]
```

- 설명 / Explanation:
  - 합이 0이 되는 조합은 `(-1, -1, 2)` 와 `(-1, 0, 1)` 입니다.
  - `[2, -1, -1]` 와 같이 순서만 다른 조합은 중복으로 간주되어 하나만 포함됩니다.

---

## 접근 방법 (Approach)

### 설명 (Korean)

이 문제는 **정렬 후 두 포인터(two pointers)** 기법을 사용하여 효율적으로 풀 수 있습니다.

1. 먼저 배열 `nums`를 **오름차순으로 정렬**합니다.
2. 인덱스 `i`를 0부터 `n - 3`까지 순회하면서, `nums[i]`를 **고정된 첫 번째 수**로 사용합니다.
   - 만약 `i > 0` 이고 `nums[i] === nums[i - 1]` 이라면, 같은 값으로 이미 계산한 적이 있으므로
     **중복을 피하기 위해 건너뜁니다(continue)**.
3. 각 `i`에 대해, 나머지 두 수를 찾기 위해 **두 포인터**를 사용합니다.
   - `left = i + 1`, `right = n - 1` 로 설정합니다.
   - 현재 합 `sum = nums[i] + nums[left] + nums[right]` 를 계산합니다.
   - `sum === 0` 이면, 하나의 조합을 찾았으므로 결과에 추가합니다.
     - 이후, `left++` 및 `right--` 를 수행합니다.
     - 그리고 `nums[left]` 가 이전 값과 같을 동안, `left` 를 증가시켜 **중복 조합을 제거**합니다.
     - 마찬가지로 `nums[right]` 가 다음 값과 같을 동안, `right` 를 감소시켜 **중복 제거**를 합니다.
   - `sum < 0` 이면, 합을 키우기 위해 `left++` (오른쪽으로 이동) 합니다.
   - `sum > 0` 이면, 합을 줄이기 위해 `right--` (왼쪽으로 이동) 합니다.

이 과정에서 각 `i` 에 대해 `left` 와 `right` 포인터는 **서로 한 번씩만 전체 구간을 스캔**하므로,
전체 시간 복잡도는 `O(n^2)` 입니다.

### Description (English)

We can solve this problem efficiently using **sorting + two pointers**.

1. Sort the array `nums` in non-decreasing order.
2. Iterate `i` from `0` to `n - 3` and treat `nums[i]` as the **first fixed element**.
   - If `i > 0` and `nums[i] === nums[i - 1]`, skip this `i` to avoid duplicate triplets.
3. For each `i`, use two pointers to find the remaining two numbers:
   - Initialize `left = i + 1`, `right = n - 1`.
   - Compute `sum = nums[i] + nums[left] + nums[right]`.
   - If `sum === 0`, we've found a valid triplet. Add it to the result.
     - Then move both pointers: `left++`, `right--`.
     - Skip duplicates by moving `left` forward while `nums[left] === nums[left - 1]`,
       and moving `right` backward while `nums[right] === nums[right + 1]`.
   - If `sum < 0`, increase the sum by moving `left++`.
   - If `sum > 0`, decrease the sum by moving `right--`.

For each `i`, the `left` and `right` pointers together scan the remaining part of the array at most once,
so the overall time complexity is `O(n^2)`.

---

## JavaScript 코드 (JavaScript Code)

```javascript
function threeSum(nums) {
  nums.sort((a, b) => a - b);
  const res = [];

  for (let i = 0; i < nums.length - 2; i++) {
    // Skip duplicate values for the first element
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    let left = i + 1;
    let right = nums.length - 1;

    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];

      if (sum === 0) {
        res.push([nums[i], nums[left], nums[right]]);
        left++;
        right--;

        // Skip duplicates for the second element
        while (left < right && nums[left] === nums[left - 1]) left++;
        // Skip duplicates for the third element
        while (left < right && nums[right] === nums[right + 1]) right--;
      } else if (sum < 0) {
        left++;
      } else {
        right--;
      }
    }
  }

  return res;
}
```

## 코드 라인별 설명 (Line-by-Line Explanation)

- `function threeSum(nums) {`
  - **KO:** 정수 배열 `nums`를 받아 합이 0이 되는 세 수의 조합들을 반환하는 함수입니다.
  - **EN:** Declares a function that takes `nums` and returns all triplets whose sum is zero.

- `nums.sort((a, b) => a - b);`
  - **KO:** 배열을 오름차순으로 정렬하여 두 포인터 탐색이 가능하도록 준비합니다.
  - **EN:** Sorts the array in non-decreasing order to enable the two-pointer technique.

- `const res = [];`
  - **KO:** 결과로 반환할 세 수의 조합(triplets)을 저장할 배열입니다.
  - **EN:** Initializes an array to store the resulting triplets.

- `for (let i = 0; i < nums.length - 2; i++) {`
  - **KO:** 첫 번째 수의 인덱스 `i`를 0부터 `n-3`까지 순회합니다.
  - **EN:** Loops over `i`, choosing the first element of the triplet.

- `if (i > 0 && nums[i] === nums[i - 1]) continue;`
  - **KO:** 이전과 같은 값이면 이미 처리한 경우이므로, 중복된 첫 번째 수를 건너뜁니다.
  - **EN:** Skips duplicate values for the first element to avoid duplicate triplets.

- `let left = i + 1;`
  - **KO:** 두 번째 수를 가리키는 왼쪽 포인터를 `i` 바로 다음 위치로 설정합니다.
  - **EN:** Sets the left pointer to the element right after `i`.

- `let right = nums.length - 1;`
  - **KO:** 세 번째 수를 가리키는 오른쪽 포인터를 배열의 마지막 인덱스로 설정합니다.
  - **EN:** Sets the right pointer to the last index of the array.

- `while (left < right) {`
  - **KO:** 두 포인터가 교차할 때까지 현재 `i`에 대해 가능한 조합을 탐색합니다.
  - **EN:** Searches for valid pairs for the fixed `i` while `left` is before `right`.

- `const sum = nums[i] + nums[left] + nums[right];`
  - **KO:** 현재 세 수의 합을 계산합니다.
  - **EN:** Computes the sum of the three chosen numbers.

- `if (sum === 0) {`
  - **KO:** 합이 0이면 조건을 만족하는 한 조합을 찾은 것입니다.
  - **EN:** If the sum is zero, we found a valid triplet.

- `res.push([nums[i], nums[left], nums[right]]);`
  - **KO:** 찾은 세 수를 배열 형태의 조합으로 결과에 추가합니다.
  - **EN:** Pushes the current triplet into the result array.

- `left++; right--;`
  - **KO:** 다음 가능한 조합을 찾기 위해 양쪽 포인터를 안쪽으로 이동합니다.
  - **EN:** Moves both pointers inward to look for the next candidate pair.

- `while (left < right && nums[left] === nums[left - 1]) left++;`
  - **KO:** 두 번째 수에 대해 같은 값이 반복되면, 중복된 조합 생성을 막기 위해 건너뜁니다.
  - **EN:** Skips duplicate values for the second element to avoid duplicate triplets.

- `while (left < right && nums[right] === nums[right + 1]) right--;`
  - **KO:** 세 번째 수에 대해서도 같은 값을 건너뛰어 중복을 제거합니다.
  - **EN:** Skips duplicate values for the third element as well.

- `} else if (sum < 0) { left++; }`
  - **KO:** 합이 0보다 작으면, 더 큰 합을 만들기 위해 왼쪽 포인터를 오른쪽으로 이동합니다.
  - **EN:** If the sum is less than zero, moves `left` to the right to increase the sum.

- `} else { right--; }`
  - **KO:** 합이 0보다 크면, 더 작은 합을 만들기 위해 오른쪽 포인터를 왼쪽으로 이동합니다.
  - **EN:** If the sum is greater than zero, moves `right` to the left to decrease the sum.

- `return res;`
  - **KO:** 모든 `i`와 해당하는 두 포인터 탐색을 마친 후, 찾은 모든 고유한 조합을 반환합니다.
  - **EN:** Returns the list of all unique triplets that sum to zero.

---

## 시간 및 공간 복잡도 (Time and Space Complexity)

- 시간 복잡도 (Time Complexity): `O(n^2)`
  - 정렬이 `O(n log n)`, 두 포인터 탐색이 `O(n^2)` 이므로 전체는 `O(n^2)` 입니다.
- 공간 복잡도 (Space Complexity): `O(1)` (출력 결과를 제외한 추가 공간)
  - 정렬은 제자리 정렬(in-place sort)로 가정합니다.
