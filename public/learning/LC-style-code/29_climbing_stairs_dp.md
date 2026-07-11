# 29. 계단 오르기 (Climbing Stairs with DP)

> Related LeetCode: [Climbing Stairs](https://leetcode.com/problems/climbing-stairs/)

## 문제 설명 (Problem Description)

당신은 계단을 오르고 있습니다. 정상에 도달하려면 `n` 계단을 올라야 합니다.
한 번에 **1계단 또는 2계단** 씩 오를 수 있을 때,
정상에 도달하는 **서로 다른 방법의 수**를 구하는 문제입니다.

You are climbing a staircase. It takes `n` steps to reach the top.
You can either climb 1 step or 2 steps at a time.
Return how many **distinct ways** you can climb to the top.

---

## 입력 (Input)

- 정수 `n` (총 계단 수)

An integer `n`.

---

## 출력 (Output)

- 정상에 도달하는 서로 다른 방법의 수 (정수).

Return an integer representing the number of distinct ways to reach the top.

---

## 예시 (Example)

### 예시 1

- 입력 / Input: `n = 2`
- 출력 / Output: `2`
- 설명 / Explanation:
  - (1계단 + 1계단), (2계단) 두 가지 방법이 있습니다.

### 예시 2

- 입력 / Input: `n = 3`
- 출력 / Output: `3`
- 설명 / Explanation:
  - (1+1+1), (1+2), (2+1) 세 가지 방법이 있습니다.

---

## 접근 방식 (Approach)

### 아이디어 (Korean)

- 한 번에 1 또는 2 계단만 오를 수 있으므로, `n` 번째 계단에 도달하는 방법 수는 다음과 같습니다.
  - `f(n) = f(n-1) + f(n-2)`
  - (마지막에 1계단을 오른 경우 + 마지막에 2계단을 오른 경우)
- 이는 피보나치 수열과 같은 형태입니다.
- DP 배열을 써도 되고, 공간을 아끼기 위해 직전 두 값만 저장하는 방식으로 구현할 수 있습니다.

### Idea (English)

- Let `f(n)` be the number of ways to reach step `n`.
- You can arrive at step `n` either from step `n-1` (taking 1 step) or from step `n-2` (taking 2 steps).
- Therefore: `f(n) = f(n-1) + f(n-2)`.
- This is essentially the Fibonacci sequence. We can compute it iteratively while keeping only two previous values.

---

## 자바스크립트 코드 (JavaScript Code)

```javascript
function climbStairs(n) {
  if (n <= 2) {
    return n;
  }

  let oneStepBefore = 2; // f(2)
  let twoStepsBefore = 1; // f(1)

  for (let i = 3; i <= n; i++) {
    const current = oneStepBefore + twoStepsBefore;
    twoStepsBefore = oneStepBefore;
    oneStepBefore = current;
  }

  return oneStepBefore;
}
```

---

## 코드 라인별 설명 (Line-by-line Explanation)

### 한국어 (Korean)

- `function climbStairs(n) { ... }`  
  - `n` 계단을 오르는 서로 다른 방법의 수를 계산하는 함수입니다.
- `if (n <= 2) { return n; }`  
  - `n=1` 이면 1가지, `n=2` 이면 2가지이므로 바로 반환합니다.
- `let oneStepBefore = 2; let twoStepsBefore = 1;`  
  - 각각 `f(2)`, `f(1)` 을 의미합니다.
- `for (let i = 3; i <= n; i++) { ... }`  
  - 3계단부터 `n` 계단까지 반복하며 DP를 계산합니다.
- `const current = oneStepBefore + twoStepsBefore;`  
  - 점화식 `f(i) = f(i-1) + f(i-2)` 에 따라 현재 값을 계산합니다.
- `twoStepsBefore = oneStepBefore; oneStepBefore = current;`  
  - 한 칸 전과 두 칸 전 값을 한 단계 앞으로 이동시킵니다.
- `return oneStepBefore;`  
  - 루프가 끝나면 `oneStepBefore` 가 `f(n)` 입니다.

### English

- `function climbStairs(n) { ... }`  
  - Function that returns the number of distinct ways to climb `n` steps.
- `if (n <= 2) { return n; }`  
  - Base cases: 1 step → 1 way, 2 steps → 2 ways.
- `let oneStepBefore = 2; let twoStepsBefore = 1;`  
  - Represent `f(2)` and `f(1)` respectively.
- `for (let i = 3; i <= n; i++) { ... }`  
  - Iteratively compute `f(i)` for `i` from 3 to `n`.
- `const current = oneStepBefore + twoStepsBefore;`  
  - Use the recurrence relation `f(i) = f(i-1) + f(i-2)`.
- `twoStepsBefore = oneStepBefore; oneStepBefore = current;`  
  - Shift the window of the last two values forward.
- `return oneStepBefore;`  
  - After the loop, `oneStepBefore` holds `f(n)`.

---

## 시간 및 공간 복잡도 (Time and Space Complexity)

- 시간 복잡도 (Time Complexity): `O(n)`  
  - `i`를 3부터 `n`까지 한 번씩 증가시키며 계산합니다.
- 공간 복잡도 (Space Complexity): `O(1)`  
  - 상수 개수의 변수만 사용합니다.
