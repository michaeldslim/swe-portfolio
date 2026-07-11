# 15. 순열 생성 (Permutations with Backtracking)

> Related LeetCode: [Permutations](https://leetcode.com/problems/permutations/)

## 문제 설명 (Problem Description)

서로 다른 정수들로 이루어진 배열 `nums`가 주어졌을 때,
모든 가능한 **순열(permutations)** 을 구하는 문제입니다.

Given an array `nums` of distinct integers, return **all possible permutations**.
You can return the answer in **any order**.

---

## 입력 (Input)

- 서로 다른 정수들로 이루어진 배열 `nums`

An array `nums` of distinct integers.

---

## 출력 (Output)

- `nums`의 모든 가능한 순열을 담은 2차원 정수 배열을 반환합니다.

Return a 2D array of all permutations of `nums`.

---

## 예시 (Example)

### 예시 1

- 입력 / Input: `nums = [1, 2, 3]`
- 출력 / Output (one possible order):

```text
[
  [1,2,3],
  [1,3,2],
  [2,1,3],
  [2,3,1],
  [3,1,2],
  [3,2,1]
]
```

---

## 접근 방법 (Approach)

### 설명 (Korean)

이 문제는 전형적인 **백트래킹(Backtracking)** 문제입니다.

아이디어:

- 현재까지 선택한 숫자들의 배열 `path`와, 아직 사용하지 않은 숫자들을 표현하는 방식(예: `used` 배열)을 유지합니다.
- 재귀 함수 `backtrack()`에서:
  - `path`의 길이가 `nums.length` 와 같아지면, 하나의 완성된 순열이므로 결과에 추가합니다.
  - 그렇지 않으면, 아직 사용하지 않은 모든 숫자를 하나씩 선택하여 `path`에 추가하고,
    재귀 호출 후 다시 제거(백트랙)합니다.

### Description (English)

This is a classic **backtracking** problem.

Idea:

- Maintain a `path` (the current permutation being built) and a `used` array indicating whether each element in `nums` is already used.
- In the recursive `backtrack()` function:
  - If `path.length === nums.length`, we have a complete permutation, so push a copy of `path` into the result.
  - Otherwise, iterate over all indices:
    - If `used[i]` is `false`, choose `nums[i]`, mark it as used, append to `path`, recurse, then undo the choice.

---

## JavaScript 코드 (JavaScript Code)

```javascript
function permute(nums) {
  const result = [];
  const path = [];
  const used = Array(nums.length).fill(false);

  function backtrack() {
    if (path.length === nums.length) {
      result.push([...path]);
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;

      used[i] = true;
      path.push(nums[i]);
      backtrack();
      path.pop();
      used[i] = false;
    }
  }

  backtrack();
  return result;
}
```

## 코드 라인별 설명 (Line-by-Line Explanation)

- `function permute(nums) {`
  - **KO:** 정수 배열 `nums`의 모든 순열을 생성하는 함수입니다.
  - **EN:** Declares a function that returns all permutations of `nums`.

- `const result = [];`
  - **KO:** 완성된 순열들을 저장할 배열입니다.
  - **EN:** Stores all generated permutations.

- `const path = [];`
  - **KO:** 현재까지 선택된 숫자들의 순서를 저장하는 배열입니다.
  - **EN:** Holds the current permutation being built.

- `const used = Array(nums.length).fill(false);`
  - **KO:** 각 인덱스의 숫자가 이미 사용되었는지 표시하는 불리언 배열입니다.
  - **EN:** Boolean array indicating whether each element in `nums` has been used.

- `function backtrack() { ... }`
  - **KO:** 백트래킹을 수행하는 내부 재귀 함수입니다.
  - **EN:** Inner recursive function that performs backtracking.

- `if (path.length === nums.length) { ... }`
  - **KO:** 현재 경로의 길이가 전체 길이와 같으면, 하나의 완성된 순열이므로 결과에 추가하고 리턴합니다.
  - **EN:** If `path` is a full-length permutation, pushes a copy into `result` and returns.

- `for (let i = 0; i < nums.length; i++) {`
  - **KO:** 아직 사용하지 않은 숫자를 찾기 위해 모든 인덱스를 순회합니다.
  - **EN:** Iterates over all indices to choose the next element.

- `if (used[i]) continue;`
  - **KO:** 이미 사용한 숫자는 건너뜁니다.
  - **EN:** Skips numbers that are already used in the current permutation.

- `used[i] = true; path.push(nums[i]);`
  - **KO:** 숫자 `nums[i]`를 선택했다고 표시하고, `path`에 추가합니다.
  - **EN:** Marks `nums[i]` as used and appends it to `path`.

- `backtrack();`
  - **KO:** 다음 위치를 채우기 위해 재귀 호출을 합니다.
  - **EN:** Recursively continues building the permutation.

- `path.pop(); used[i] = false;`
  - **KO:** 재귀 호출이 끝난 후, 마지막에 추가한 숫자를 제거하고 사용 여부를 되돌려(백트랙) 다른 선택을 시도합니다.
  - **EN:** Backtracks by removing the last element and marking it unused again.

- `backtrack(); return result;`
  - **KO:** 초기 호출 후 생성된 모든 순열을 반환합니다.
  - **EN:** Starts the backtracking process and returns all generated permutations.

---

## 시간 및 공간 복잡도 (Time and Space Complexity)

- 시간 복잡도 (Time Complexity): `O(n * n!)`
  - 길이 `n`의 순열이 `n!`개 존재하고, 각 순열을 구성/복사하는 데 `O(n)`이 걸립니다.
- 공간 복잡도 (Space Complexity): `O(n)` (재귀 스택과 `path`, `used`)
  - 결과 저장 공간은 출력 크기 `O(n * n!)`를 차지합니다.
