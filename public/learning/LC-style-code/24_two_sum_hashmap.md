# 24. 두 수의 합 (Two Sum with Hash Map)

> Related LeetCode: [Two Sum](https://leetcode.com/problems/two-sum/)

## 문제 설명 (Problem Description)

정수 배열 `nums`와 정수 `target` 이 주어졌을 때,
합이 `target` 이 되는 **두 원소의 인덱스**를 찾는 문제입니다.

각 입력에 대해 **정확히 한 쌍의 해가 존재**한다고 가정하고,
같은 원소를 두 번 사용할 수는 없습니다.

Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.
You may assume that each input would have **exactly one solution**, and you may not use the same element twice.

---

## 입력 (Input)

- 정수 배열 `nums`
- 정수 `target`

An integer array `nums` and an integer `target`.

---

## 출력 (Output)

- 길이 2의 정수 배열 `[i, j]` (0-indexed)
- `nums[i] + nums[j] === target` 를 만족해야 합니다.

Return an array of two indices `[i, j]` such that `nums[i] + nums[j] === target`.

---

## 예시 (Example)

### 예시 1

- 입력 / Input: `nums = [2, 7, 11, 15]`, `target = 9`
- 출력 / Output: `[0, 1]`
- 설명 / Explanation:
  - `nums[0] + nums[1] = 2 + 7 = 9` 이므로 답은 `[0, 1]` 입니다.

### 예시 2

- 입력 / Input: `nums = [3, 2, 4]`, `target = 6`
- 출력 / Output: `[1, 2]`

---

## 접근 방식 (Approach)

### 아이디어 (Korean)

- 브루트 포스는 모든 쌍을 비교하므로 `O(n^2)` 입니다.
- 더 효율적으로 풀기 위해 **해시맵(Map)** 을 사용합니다.
- 배열을 한 번 순회하면서:
  - 현재 값이 `nums[i]` 라면, 찾고 싶은 값(보수)은 `complement = target - nums[i]` 입니다.
  - 해시맵에 `complement`가 이미 있으면, 그 인덱스와 현재 인덱스를 바로 반환합니다.
  - 없다면, 현재 값 `nums[i]` 와 인덱스 `i` 를 해시맵에 저장합니다.
- 이렇게 하면 한 번의 순회로 답을 찾을 수 있어 시간 복잡도는 `O(n)` 입니다.

### Idea (English)

- A brute-force solution checks all pairs in `O(n^2)` time.
- Instead, use a **hash map** to store previously seen values and their indices.
- For each index `i`:
  - Let `num = nums[i]` and `complement = target - num`.
  - If `complement` is already in the map, return the stored index and `i`.
  - Otherwise, store `num -> i` in the map and continue.
- Since we visit each element once and each map operation is `O(1)` on average, the total time is `O(n)`.

---

## 자바스크립트 코드 (JavaScript Code)

```javascript
function twoSum(nums, target) {
  const map = new Map(); // value -> index

  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    const complement = target - num;

    if (map.has(complement)) {
      return [map.get(complement), i];
    }

    map.set(num, i);
  }

  // 문제 조건상 항상 한 개의 해가 있다고 가정되지만,
  // 안전하게 빈 배열을 반환합니다.
  return [];
}
```

---

## 코드 라인별 설명 (Line-by-line Explanation)

### 한국어 (Korean)

- `function twoSum(nums, target) { ... }`  
  - 두 수의 합이 `target` 이 되는 인덱스를 찾는 함수입니다.
- `const map = new Map();`  
  - 값에서 인덱스로 가는 매핑을 저장할 해시맵입니다.
- `for (let i = 0; i < nums.length; i++) { ... }`  
  - 배열의 각 인덱스를 순회합니다.
- `const num = nums[i];`  
  - 현재 값입니다.
- `const complement = target - num;`  
  - 현재 값과 더해서 `target` 이 되게 하는 보수 값입니다.
- `if (map.has(complement)) { return [map.get(complement), i]; }`  
  - 이미 보수가 해시맵에 있다면, 그 인덱스와 현재 인덱스를 반환합니다.
- `map.set(num, i);`  
  - 아직 보수를 못 찾았다면, 현재 값과 인덱스를 맵에 저장하고 다음으로 넘어갑니다.
- `return [];`  
  - 이론상 도달하지 않지만, 방어적으로 빈 배열을 반환합니다.

### English

- `function twoSum(nums, target) { ... }`  
  - Function to find indices of two numbers that add up to `target`.
- `const map = new Map();`  
  - Hash map storing `value -> index` for numbers we have seen so far.
- `for (let i = 0; i < nums.length; i++) { ... }`  
  - Iterate through each index of the array.
- `const num = nums[i];`  
  - Current number.
- `const complement = target - num;`  
  - Value we need in order to reach `target` when added to `num`.
- `if (map.has(complement)) { return [map.get(complement), i]; }`  
  - If we've already seen `complement`, return its stored index and the current index.
- `map.set(num, i);`  
  - Otherwise, store the current number and its index in the map and continue.
- `return [];`  
  - Defensive fallback; according to the problem statement, we should always find a solution earlier.

---

## 시간 및 공간 복잡도 (Time and Space Complexity)

- 시간 복잡도 (Time Complexity): `O(n)`  
  - 배열을 한 번만 순회합니다.
- 공간 복잡도 (Space Complexity): `O(n)`  
  - 해시맵에 최대 `n`개의 원소를 저장할 수 있습니다.
