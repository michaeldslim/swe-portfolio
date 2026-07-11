# 12. 동전 교환 (Coin Change with DP)

> Related LeetCode: [Coin Change](https://leetcode.com/problems/coin-change/)

## 문제 설명 (Problem Description)

동전의 종류가 담긴 배열 `coins` 와 목표 금액 `amount` 가 주어졌을 때,
해당 금액을 만들기 위해 필요한 **최소 동전 개수**를 구하는 문제입니다.

만약 어떤 조합으로도 해당 금액을 만들 수 없다면 `-1`을 반환합니다.

You are given an integer array `coins` representing coin denominations and an integer `amount` representing a total amount of money.
Return the **fewest number of coins** that you need to make up that amount.
If that amount of money cannot be made up by any combination of the coins, return `-1`.

---

## 입력 (Input)

- 정수 배열 `coins` (각 동전의 단위)
- 정수 `amount` (목표 금액)

An integer array `coins` and an integer `amount`.

---

## 출력 (Output)

- 목표 금액을 만들기 위한 **최소 동전 개수**를 정수로 반환합니다.
- 만들 수 없는 경우 `-1`을 반환합니다.

Return an integer representing the fewest number of coins, or `-1` if it is impossible.

---

## 예시 (Example)

### 예시 1

- 입력 / Input: `coins = [1, 2, 5]`, `amount = 11`
- 출력 / Output: `3`
- 설명 / Explanation:
  - 11 = 5 + 5 + 1 (동전 3개)

### 예시 2

- 입력 / Input: `coins = [2]`, `amount = 3`
- 출력 / Output: `-1`

---

## 접근 방법 (Approach)

### 설명 (Korean)

이 문제는 전형적인 **1차원 동적 계획법(DP)** 문제입니다.

아이디어:

- `dp[x]` 를 금액 `x`를 만드는 데 필요한 **최소 동전 개수**라고 정의합니다.
- 초기값으로 `dp[0] = 0` (0원을 만드는 데 필요한 동전 개수는 0개) 입니다.
- 나머지 값들은 매우 큰 값(예: `amount + 1`)으로 초기화하여 아직 계산되지 않았음을 나타냅니다.
- 각 금액 `x`에 대해, 모든 동전 `coin`을 순회하면서,
  - 만약 `x - coin >= 0` 이면, `dp[x - coin] + 1` 로 현재 동전을 추가하는 경우를 고려할 수 있습니다.
  - `dp[x] = min(dp[x], dp[x - coin] + 1)` 로 갱신합니다.

마지막에 `dp[amount]` 가 여전히 초기값(예: `amount + 1`) 이라면, 해당 금액을 만들 수 없다는 뜻이므로 `-1`을 반환합니다.
그렇지 않다면 `dp[amount]` 가 최소 동전 개수입니다.

### Description (English)

We can solve this problem using **1D dynamic programming**.

Idea:

- Let `dp[x]` be the **fewest number of coins** needed to make up amount `x`.
- Initialize `dp[0] = 0` and all other entries to a large sentinel value (e.g. `amount + 1`).
- For each amount `x` from `1` to `amount`, and for each coin `coin` in `coins`:
  - If `x - coin >= 0`, we can use this coin and consider `dp[x - coin] + 1`.
  - Update `dp[x] = min(dp[x], dp[x - coin] + 1)`.
- After filling `dp`, if `dp[amount]` is still `> amount`, return `-1` (not possible). Otherwise, return `dp[amount]`.

---

## JavaScript 코드 (JavaScript Code)

```javascript
function coinChange(coins, amount) {
  const dp = Array(amount + 1).fill(amount + 1);
  dp[0] = 0;

  for (let x = 1; x <= amount; x++) {
    for (const coin of coins) {
      if (x - coin >= 0) {
        dp[x] = Math.min(dp[x], dp[x - coin] + 1);
      }
    }
  }

  return dp[amount] > amount ? -1 : dp[amount];
}
```

## 코드 라인별 설명 (Line-by-Line Explanation)

- `function coinChange(coins, amount) {`
  - **KO:** 동전 종류 `coins`와 목표 금액 `amount`를 받아 최소 동전 개수를 구하는 함수입니다.
  - **EN:** Declares a function that computes the fewest number of coins needed to make up `amount`.

- `const dp = Array(amount + 1).fill(amount + 1);`
  - **KO:** 인덱스 0부터 `amount`까지 사용할 DP 배열을 만들고, 초기값으로 `amount + 1` (충분히 큰 값)을 채워 넣습니다.
  - **EN:** Creates a DP array indexed from 0 to `amount`, initialized to a large sentinel value `amount + 1`.

- `dp[0] = 0;`
  - **KO:** 0원을 만드는 데 필요한 최소 동전 개수는 0개입니다.
  - **EN:** Base case: zero coins are needed to make amount 0.

- `for (let x = 1; x <= amount; x++) {`
  - **KO:** 1부터 `amount`까지 각 금액 `x`에 대해 최소 동전 개수를 계산합니다.
  - **EN:** Iterates over all target amounts from 1 to `amount`.

- `for (const coin of coins) {`
  - **KO:** 사용 가능한 모든 동전 단위를 순회합니다.
  - **EN:** Iterates over each coin denomination.

- `if (x - coin >= 0) {`
  - **KO:** 현재 금액 `x`에서 이 동전을 사용할 수 있는지 (음수로 떨어지지 않는지) 확인합니다.
  - **EN:** Checks if we can subtract this coin from the current amount `x`.

- `dp[x] = Math.min(dp[x], dp[x - coin] + 1);`
  - **KO:** 이 동전을 사용한 경우(`dp[x - coin] + 1`)와 기존 값 `dp[x]` 중 더 작은 값을 선택해 최소 동전 개수를 갱신합니다.
  - **EN:** Updates `dp[x]` with the minimum between the current value and using this coin.

- `return dp[amount] > amount ? -1 : dp[amount];`
  - **KO:** 최종적으로 `dp[amount]`가 여전히 큰 값이면 만들 수 없는 경우이므로 `-1`,
    그렇지 않으면 최소 동전 개수 `dp[amount]`를 반환합니다.
  - **EN:** If `dp[amount]` is still larger than `amount`, return `-1`; otherwise return `dp[amount]`.

---

## 시간 및 공간 복잡도 (Time and Space Complexity)

- 시간 복잡도 (Time Complexity): `O(amount * n)`
  - `n`은 동전 종류 수, `amount`는 목표 금액입니다.
- 공간 복잡도 (Space Complexity): `O(amount)`
  - 크기 `amount + 1` 인 DP 배열 하나만 사용합니다.
