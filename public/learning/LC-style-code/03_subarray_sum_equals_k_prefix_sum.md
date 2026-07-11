# 3. 부분 배열의 합이 K (Subarray Sum Equals K with Prefix Sum)

> Related LeetCode: [Subarray Sum Equals K](https://leetcode.com/problems/subarray-sum-equals-k/)

## 문제 설명 (Problem Description)

정수 배열 `nums`와 정수 `k`가 주어졌을 때,
**연속된 부분 배열(subarray)** 들 중에서 합이 정확히 `k`가 되는 경우의 수를 구하는 문제입니다.

Given an integer array `nums` and an integer `k`, return the **total number of continuous subarrays**
whose sum equals `k`.

---

## 입력 (Input)

- 정수 배열 `nums`
- 정수 `k`

An integer array `nums` and an integer `k`.

---

## 출력 (Output)

- 합이 `k`가 되는 부분 배열의 **개수** (정수)를 반환합니다.

Return the **number** of subarrays whose sum equals `k`.

---

## 예시 (Example)

### 예시 1

- 입력 / Input: `nums = [1, 1, 1]`, `k = 2`
- 출력 / Output: `2`
- 설명 / Explanation:
  - 합이 2가 되는 부분 배열은 `[1, 1]` (인덱스 `0~1`), `[1, 1]` (인덱스 `1~2`) 두 개입니다.

---

## 접근 방법 (Approach)

### 설명 (Korean)

브루트 포스로 모든 구간을 검사하면 `O(n^2)` 가 걸립니다.
이를 더 효율적으로 풀기 위해 **누적 합(prefix sum)** 과 **해시맵(Map)** 을 사용합니다.

핵심 아이디어:

- 인덱스 `0`부터 `i`까지의 누적 합을 `prefix[i]` 라고 할 때,
  - `i`에서 끝나는 어떤 부분 배열 `j+1..i` 의 합은
    `prefix[i] - prefix[j]` 입니다.
- 이 값이 `k`가 되려면, `prefix[j] = prefix[i] - k` 여야 합니다.

구현 방법:

1. `prefix` 변수를 0으로 두고, 현재까지의 누적 합을 저장합니다.
2. `Map prefixCount` 를 이용해, **각 누적 합이 몇 번 등장했는지** 저장합니다.
   - 시작 전에, `prefixCount.set(0, 1)` 로 초기화합니다.
     - 이유: 인덱스 0부터 시작하는 부분 배열도 고려하기 위해, "빈 누적 합" 0이 한 번 존재한다고 봅니다.
3. 배열을 순회하면서 각 원소 `num`에 대해:
   - `prefix += num` 으로 누적 합을 갱신합니다.
   - 합이 `k`가 되는 부분 배열의 개수를 구하려면,
     - 이전에 `prefix - k` 라는 누적 합이 몇 번 나왔는지 확인하면 됩니다.
     - `needed = prefix - k`
     - 만약 `prefixCount`에 `needed`가 있다면,
       - 그 횟수만큼 현재 인덱스에서 끝나는 부분 배열의 합이 `k`가 됩니다.
   - 마지막으로 `prefixCount`에서 현재 `prefix`의 개수를 1 증가시킵니다.

배열을 한 번만 순회하기 때문에 시간 복잡도는 `O(n)` 입니다.

### Description (English)

The brute-force solution checks all subarrays and runs in `O(n^2)`.
We can do better using **prefix sums** and a **hash map**.

Key idea:

- Let `prefix[i]` be the sum of `nums[0..i]`.
- A subarray `nums[j+1..i]` has sum `k` if and only if:
  - `prefix[i] - prefix[j] = k` → `prefix[j] = prefix[i] - k`.

Implementation steps:

1. Maintain a variable `prefix = 0` for the current prefix sum.
2. Use a map `prefixCount` to store how many times each prefix sum has appeared.
   - Initialize `prefixCount.set(0, 1)` to account for subarrays that start from index 0.
3. For each element `num` in `nums`:
   - Update `prefix += num`.
   - Compute `needed = prefix - k`.
   - If `prefixCount` has `needed`, then we found that many subarrays ending at the current index with sum `k`.
   - Add this count to the answer.
   - Finally, increment the count of `prefix` in `prefixCount`.

We traverse the array once and each map operation is `O(1)` on average,
so the overall time complexity is `O(n)`.

---

## JavaScript 코드 (JavaScript Code)

```javascript
function subarraySum(nums, k) {
  const prefixCount = new Map();
  prefixCount.set(0, 1); // empty prefix sum occurs once

  let prefix = 0;
  let count = 0;

  for (const num of nums) {
    prefix += num;
    const needed = prefix - k;

    if (prefixCount.has(needed)) {
      count += prefixCount.get(needed);
    }

    prefixCount.set(prefix, (prefixCount.get(prefix) || 0) + 1);
  }

  return count;
}
```

## 코드 라인별 설명 (Line-by-Line Explanation)

- `function subarraySum(nums, k) {`
  - **KO:** 정수 배열 `nums`와 목표 합 `k`를 받아, 합이 `k`인 부분 배열의 개수를 반환하는 함수입니다.
  - **EN:** Declares a function that takes `nums` and `k` and returns the number of subarrays whose sum equals `k`.

- `const prefixCount = new Map();`
  - **KO:** 각 누적 합(prefix sum)이 몇 번 등장했는지를 저장할 `Map` 입니다.
  - **EN:** A map that stores how many times each prefix sum has appeared.

- `prefixCount.set(0, 1); // empty prefix sum occurs once`
  - **KO:** 누적 합이 0인 경우(아직 아무 원소도 더하지 않은 상태)가 한 번 있다고 초기화합니다.
  - **EN:** Initializes the map with sum `0` occurring once to handle subarrays starting at index 0.

- `let prefix = 0;`
  - **KO:** 현재까지의 누적 합을 저장하는 변수입니다.
  - **EN:** Holds the running prefix sum while iterating over the array.

- `let count = 0;`
  - **KO:** 합이 `k`인 부분 배열의 개수를 누적해서 저장합니다.
  - **EN:** Accumulates the number of subarrays whose sum equals `k`.

- `for (const num of nums) {`
  - **KO:** 배열의 각 원소를 순회합니다.
  - **EN:** Iterates over each element `num` in `nums`.

- `prefix += num;`
  - **KO:** 현재 원소 `num`을 누적 합에 더합니다.
  - **EN:** Updates the running prefix sum by adding the current number.

- `const needed = prefix - k;`
  - **KO:** 현재 인덱스에서 끝나는 부분 배열이 합 `k`를 가지려면, 이전에 `prefix - k` 라는 누적 합이 있어야 합니다.
  - **EN:** Computes the prefix sum we need to have seen before for the current subarray sum to be `k`.

- `if (prefixCount.has(needed)) {`
  - **KO:** 만약 `needed`라는 누적 합이 과거에 등장한 적이 있다면,
  - **EN:** Checks whether this required prefix sum has been seen before.

- `count += prefixCount.get(needed);`
  - **KO:** 그 등장 횟수만큼, 현재 인덱스에서 끝나는 합이 `k`인 부분 배열이 존재합니다.
  - **EN:** Adds the number of times `needed` has occurred to `count`, since each occurrence forms a valid subarray.

- `prefixCount.set(prefix, (prefixCount.get(prefix) || 0) + 1);`
  - **KO:** 현재 누적 합 `prefix`의 등장 횟수를 1 증가시킵니다.
  - **EN:** Increments the count for the current prefix sum in the map (or initializes it to 1 if not present).

- `return count;`
  - **KO:** 전체 순회를 마친 후, 합이 `k`인 부분 배열의 총 개수를 반환합니다.
  - **EN:** Returns the total number of subarrays whose sum is `k`.

---

## 시간 및 공간 복잡도 (Time and Space Complexity)

- 시간 복잡도 (Time Complexity): `O(n)`
  - 배열을 한 번 순회하며, 각 단계에서 `Map` 연산은 평균 `O(1)` 입니다.
- 공간 복잡도 (Space Complexity): `O(n)`
  - 최악의 경우, 모든 prefix sum 값이 서로 달라 `Map`에 `n`개의 키가 저장될 수 있습니다.
