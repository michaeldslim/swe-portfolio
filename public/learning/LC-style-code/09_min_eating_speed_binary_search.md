# 9. 코코의 바나나 먹기 (Koko Eating Bananas with Binary Search on Answer)

> Related LeetCode: [Koko Eating Bananas](https://leetcode.com/problems/koko-eating-bananas/)

## 문제 설명 (Problem Description)

코코는 여러 개의 바나나 더미를 먹으려고 합니다.
각 더미는 `piles[i]` 개의 바나나를 가지고 있고, 코코는 시간당 `k` 개의 바나나를 먹을 수 있습니다.
한 시간에 **한 더미에서만** 바나나를 먹을 수 있으며, 그 시간 동안 해당 더미에서 최대 `k` 개까지 먹습니다.

모든 바나나를 `h` 시간 이내에 다 먹을 수 있도록 하는 **최소의 정수 속도 `k`** 를 구하는 문제입니다.

Koko loves to eat bananas. There are `piles[i]` bananas in the `i`-th pile.
She can decide her eating speed `k` (bananas per hour). She can only eat from one pile per hour
and eats at most `k` bananas from that pile in that hour.

Given the integer array `piles` and an integer `h`, return the **minimum integer `k`** such that
she can eat all the bananas within `h` hours.

---

## 입력 (Input)

- 정수 배열 `piles` (각 더미의 바나나 개수)
- 정수 `h` (총 허용 시간)

An integer array `piles` and an integer `h`.

---

## 출력 (Output)

- 코코가 `h` 시간 이내에 모든 바나나를 먹을 수 있는 **최소 정수 속도 `k`** 를 반환합니다.

Return the **minimum integer `k`** such that Koko can eat all bananas in `h` hours.

---

## 예시 (Example)

### 예시 1

- 입력 / Input: `piles = [3, 6, 7, 11]`, `h = 8`
- 출력 / Output: `4`

설명 / Explanation:

- `k = 4` 일 때 필요한 시간:
  - 더미 3: `ceil(3 / 4) = 1` 시간
  - 더미 6: `ceil(6 / 4) = 2` 시간
  - 더미 7: `ceil(7 / 4) = 2` 시간
  - 더미 11: `ceil(11 / 4) = 3` 시간
  - 총합 = `1 + 2 + 2 + 3 = 8` 시간 (가능)
- `k = 3` 으로 시도해 보면 총 시간이 8보다 커지므로 불가능합니다.
- 따라서 최소 속도는 `4` 입니다.

---

## 접근 방법 (Approach)

### 설명 (Korean)

이 문제는 **답(속도 k)에 대해 이분 탐색(binary search on answer)** 을 하는 전형적인 문제입니다.

관찰:

- 속도 `k`가 클수록 코코는 더 빨리 먹게 되어 **필요 시간은 감소**합니다.
- 속도 `k`가 작을수록 코코는 더 느리게 먹어 **필요 시간은 증가**합니다.
- 즉, 어떤 속도 `k`가 가능하다면 (h 시간 이내에 먹을 수 있다면),
  그보다 큰 속도들은 모두 가능하고, 어떤 속도가 불가능하다면 그보다 작은 속도들도 모두 불가능합니다.
  → **단조(monotonic)한 조건**이므로 이분 탐색을 사용할 수 있습니다.

구현 단계:

1. 속도 `k`의 최소값은 `1`, 최대값은 `max(piles)` 로 설정합니다.
2. 주어진 속도 `speed` 로 `h` 시간 안에 모든 바나나를 먹을 수 있는지 확인하는 함수 `canEat(speed)` 를 정의합니다.
   - 모든 더미에 대해 `hours += ceil(piles[i] / speed)` 를 누적합니다.
   - 누적된 `hours` 가 `h` 를 초과하면 `false` 를 반환합니다.
   - 끝까지 갔을 때 `hours <= h` 이면 `true` 를 반환합니다.
3. `left = 1`, `right = max(piles)` 사이에서 이분 탐색을 수행합니다.
   - `mid = Math.floor((left + right) / 2)` 를 속도로 가정합니다.
   - `canEat(mid)` 가 `true` 이면, 더 작은 속도로도 가능할지 확인하기 위해 `right = mid` 로 줄입니다.
   - `false` 이면, 속도가 너무 느린 것이므로 `left = mid + 1` 로 올립니다.
4. `left` 와 `right` 가 만났을 때, 그 값이 우리가 찾는 최소 속도입니다.

### Description (English)

This is a classic **binary search on the answer** problem.

Observation:

- The faster Koko eats (larger `k`), the **less time** she needs.
- The slower she eats (smaller `k`), the **more time** she needs.
- So, if a certain speed `k` is feasible (she can finish within `h` hours), then
  all speeds greater than `k` are also feasible.
- If a speed `k` is not feasible, then all speeds less than `k` are also not feasible.

This monotonic property allows us to binary search over `k`.

Implementation steps:

1. The minimum possible speed is `1`. The maximum possible speed is `max(piles)`.
2. Define a helper function `canEat(speed)` that checks whether Koko can eat all bananas
   within `h` hours at speed `speed`:
   - For each pile `p`, compute `hours += Math.ceil(p / speed)`.
   - If `hours > h` at any point, return `false`.
   - After all piles, return `hours <= h`.
3. Perform binary search on `k` in the range `[1, max(piles)]`:
   - Let `mid = Math.floor((left + right) / 2)`.
   - If `canEat(mid)` is `true`, we move `right = mid` to try smaller speeds.
   - Otherwise, we move `left = mid + 1` to increase the speed.
4. When `left` meets `right`, we have found the minimal feasible speed.

---

## JavaScript 코드 (JavaScript Code)

```javascript
function minEatingSpeed(piles, h) {
  let left = 1;
  let right = Math.max(...piles);

  function canEat(speed) {
    let hours = 0;
    for (const p of piles) {
      hours += Math.ceil(p / speed);
      if (hours > h) return false;
    }
    return hours <= h;
  }

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (canEat(mid)) {
      right = mid; // try smaller speed
    } else {
      left = mid + 1; // need to be faster
    }
  }

  return left;
}
```

## 코드 라인별 설명 (Line-by-Line Explanation)

- `function minEatingSpeed(piles, h) {`
  - **KO:** 바나나 더미 배열 `piles`와 시간 제한 `h`를 받아, 최소 먹는 속도 `k`를 구하는 함수입니다.
  - **EN:** Declares a function that finds the minimum eating speed to finish all bananas within `h` hours.

- `let left = 1;`
  - **KO:** 이분 탐색의 하한으로, 가능한 최소 속도는 1입니다.
  - **EN:** Sets the lower bound of the search range to 1.

- `let right = Math.max(...piles);`
  - **KO:** 가능한 최대 속도는 가장 큰 더미 크기입니다 (한 번에 한 더미를 다 먹는 경우).
  - **EN:** Sets the upper bound to the largest pile size.

- `function canEat(speed) { ... }`
  - **KO:** 속도 `speed`로 먹을 때 `h` 시간 이내에 모두 먹을 수 있는지 여부를 검사하는 헬퍼 함수입니다.
  - **EN:** Helper function that checks if Koko can finish all piles at a given speed within `h` hours.

- `let hours = 0;`
  - **KO:** 총 소요 시간을 누적할 변수입니다.
  - **EN:** Accumulates the total hours needed at the current speed.

- `for (const p of piles) { hours += Math.ceil(p / speed); ... }`
  - **KO:** 각 더미에 대해 `ceil(p / speed)` 시간을 더해, 그 속도로 해당 더미를 먹는 데 필요한 시간을 더합니다.
  - **EN:** For each pile, adds the number of hours needed at `speed` bananas per hour.

- `if (hours > h) return false;`
  - **KO:** 누적 시간이 제한 시간 `h`를 초과하면 더 이상 확인할 필요 없이 불가능 판정입니다.
  - **EN:** If the needed time exceeds `h`, returns `false` early.

- `return hours <= h;`
  - **KO:** 모든 더미를 계산한 후, 제한 시간 이내라면 `true`를 반환합니다.
  - **EN:** Returns whether the total hours is within the allowed limit.

- `while (left < right) {`
  - **KO:** 이분 탐색으로 최소 가능한 속도를 찾습니다.
  - **EN:** Performs binary search on the eating speed.

- `const mid = Math.floor((left + right) / 2);`
  - **KO:** 현재 확인할 중간 속도 `mid`를 계산합니다.
  - **EN:** Computes the midpoint speed between `left` and `right`.

- `if (canEat(mid)) { right = mid; }`
  - **KO:** `mid` 속도로 먹는 것이 가능하면, 더 작은 속도도 가능한지 확인하기 위해 상한을 낮춥니다.
  - **EN:** If `mid` is feasible, moves the upper bound down to search for a smaller feasible speed.

- `else { left = mid + 1; }`
  - **KO:** `mid` 속도가 불가능하면, 속도가 너무 느린 것이므로 하한을 올립니다.
  - **EN:** If `mid` is not feasible, increases the lower bound to `mid + 1`.

- `return left;`
  - **KO:** 이분 탐색이 종료되면 `left`는 가능한 최소 속도를 가리키므로, 그 값을 반환합니다.
  - **EN:** Returns `left` as the minimum speed that allows Koko to finish in time.

---

## 시간 및 공간 복잡도 (Time and Space Complexity)

- 시간 복잡도 (Time Complexity): `O(n log M)`
  - `n`은 더미 개수, `M`은 `max(piles)` 입니다.
  - 이분 탐색에서 `log M` 단계, 각 단계마다 모든 더미를 한 번씩 확인합니다.
- 공간 복잡도 (Space Complexity): `O(1)`
  - 입력 배열을 제외한 추가적인 메모리는 상수 크기입니다.
