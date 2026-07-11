# 33. 모든 가능한 균형 괄호 생성 (Generate All Balanced Parentheses)

> Related LeetCode: [Generate Parentheses](https://leetcode.com/problems/generate-parentheses/)

## 문제 설명 (Problem Description)

정수 `n` 이 주어졌을 때, **n 쌍의 괄호**로 만들 수 있는
모든 **올바른(균형 잡힌) 괄호 문자열**을 구하는 문제입니다.

괄호 문자열이 올바르려면, 왼쪽 괄호 `"("` 와 오른쪽 괄호 `")"` 가 짝을 이루고,
어느 시점에서도 오른쪽 괄호가 왼쪽 괄호보다 많이 나오면 안 됩니다.

Given `n` pairs of parentheses, write a function to generate all combinations of
**well-formed parentheses**.

---

## 입력 (Input)

- 정수 `n` (괄호 쌍의 개수)

An integer `n` representing the number of pairs of parentheses.

---

## 출력 (Output)

- 가능한 모든 올바른 괄호 조합을 담은 문자열 배열.

Return an array of strings containing all valid combinations of `n` pairs of parentheses.

---

## 예시 (Example)

### 예시 1

- 입력 / Input: `n = 3`
- 출력 / Output (순서는 다를 수 있음):

```text
[
  "((()))",
  "(()())",
  "(())()",
  "()(())",
  "()()()"
]
```

### 예시 2

- 입력 / Input: `n = 1`
- 출력 / Output:

```text
["()"]
```

---

## 접근 방식 (Approach)

### 아이디어 (Korean)

- 이 문제는 **백트래킹(Backtracking)** 으로 해결하는 전형적인 예제입니다.
- 문자열을 왼쪽 괄호 `"("` 와 오른쪽 괄호 `")"` 를 하나씩 붙여 가며 재귀적으로 탐색합니다.
- 상태로는 다음을 관리합니다.
  - `openCount`: 지금까지 사용한 왼쪽 괄호 개수
  - `closeCount`: 지금까지 사용한 오른쪽 괄호 개수
  - `current`: 현재까지 만든 괄호 문자열
- 규칙:
  1. 왼쪽 괄호는 최대 `n` 개까지 사용할 수 있으므로, `openCount < n` 이면 `"("` 를 추가할 수 있습니다.
  2. 오른쪽 괄호는 항상 `closeCount < openCount` 일 때만 추가할 수 있습니다. (짝이 맞는 범위 내에서만 가능)
  3. `openCount === n` 이고 `closeCount === n` 이 되면, 길이가 `2n` 인 올바른 괄호 문자열 하나가 완성되므로 결과에 추가합니다.

### Idea (English)

- Use **backtracking** to build all valid strings.
- Track:
  - `openCount`: number of `"("` used so far
  - `closeCount`: number of `")"` used so far
  - `current`: current partial string
- Rules:
  1. If `openCount < n`, we can add another `"("`.
  2. If `closeCount < openCount`, we can add `")"` (we cannot close more than we have opened).
  3. When `openCount === n` and `closeCount === n`, we have a complete valid combination.

---

## 자바스크립트 코드 (JavaScript Code)

```javascript
function generateParenthesis(n) {
  const result = [];

  function backtrack(current, openCount, closeCount) {
    if (openCount === n && closeCount === n) {
      result.push(current);
      return;
    }

    if (openCount < n) {
      backtrack(current + '(', openCount + 1, closeCount);
    }

    if (closeCount < openCount) {
      backtrack(current + ')', openCount, closeCount + 1);
    }
  }

  backtrack('', 0, 0);
  return result;
}
```

---

## 코드 라인별 설명 (Line-by-line Explanation)

### 한국어 (Korean)

- `function generateParenthesis(n) { ... }`  
  - `n` 쌍의 괄호로 만들 수 있는 모든 올바른 괄호 문자열을 생성하는 함수입니다.
- `const result = [];`  
  - 생성된 모든 괄호 조합을 담을 배열입니다.
- `function backtrack(current, openCount, closeCount) { ... }`  
  - 부분 문자열 `current` 를 확장해 가며 재귀적으로 탐색하는 백트래킹 함수입니다.
- `if (openCount === n && closeCount === n) { ... }`  
  - 왼쪽/오른쪽 괄호를 각각 `n`개씩 사용했다면, 하나의 완성된 올바른 문자열이므로 결과 배열에 추가합니다.
- `if (openCount < n) { backtrack(current + '(', openCount + 1, closeCount); }`  
  - 아직 왼쪽 괄호를 `n`개 다 쓰지 않았다면, 왼쪽 괄호를 하나 더 붙여 볼 수 있습니다.
- `if (closeCount < openCount) { backtrack(current + ')', openCount, closeCount + 1); }`  
  - 현재까지 사용한 오른쪽 괄호 수가 왼쪽 괄호보다 적을 때만, 오른쪽 괄호를 붙일 수 있습니다.
- `backtrack('', 0, 0);`  
  - 빈 문자열과 0,0 카운트에서 재귀 탐색을 시작합니다.
- `return result;`  
  - 완성된 모든 조합을 반환합니다.

### English

- `function generateParenthesis(n) { ... }`  
  - Function that generates all valid parentheses combinations for `n` pairs.
- `const result = [];`  
  - Array that will store all valid combinations.
- `function backtrack(current, openCount, closeCount) { ... }`  
  - Backtracking helper that builds up the string `current`.
- `if (openCount === n && closeCount === n) { ... }`  
  - When both counts reach `n`, we've built a complete valid combination, so push it to `result`.
- `if (openCount < n) { backtrack(current + '(', openCount + 1, closeCount); }`  
  - If we still have remaining left parentheses, we can add another `"("`.
- `if (closeCount < openCount) { backtrack(current + ')', openCount, closeCount + 1); }`  
  - We can only add `")"` if it won't make the string invalid (i.e., we can't close more than we've opened).
- `backtrack('', 0, 0);`  
  - Start the recursion with an empty string and zero counts.
- `return result;`  
  - Return all generated combinations.

---

## 시간 및 공간 복잡도 (Time and Space Complexity)

- 시간 복잡도 (Time Complexity): 대략 `O(C_n)` 수준  
  - 여기서 `C_n`은 n번째 **카탈란 수(Catalan number)** 로, 생성되는 올바른 괄호 문자열의 개수입니다.
- 공간 복잡도 (Space Complexity): `O(C_n * n)`  
  - 결과로 `C_n`개의 문자열(각 길이 `2n`)을 저장해야 하고, 재귀 호출 스택도 깊이 `O(n)` 입니다.
