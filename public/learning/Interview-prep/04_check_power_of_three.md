# 04. 3의 거듭제곱 판별 / Check if a Number is a Power of 3

## 질문 (Question)

- **KO**: "정수가 주어졌을 때, 이 수가 3의 거듭제곱인지(…, 3, 9, 27, 81, …) 어떻게 판별하겠습니까? 시간/공간 복잡도도 설명해 주세요."
- **EN**: "Given an integer, how would you check if it is a power of 3 (…, 3, 9, 27, 81, …)? Explain time and space complexity."

---

## 아이디어 (Idea)

### 한국어 (Korean)

- **정의**: 어떤 수 `n` 이 3의 거듭제곱이면 `n = 3^k` 를 만족하는 정수 `k ≥ 0` 가 존재합니다.
- 가장 직관적인 방법: 3으로 계속 나누어 떨어지는지 확인
  - `n <= 0` 이면 바로 `false` (음수, 0은 거듭제곱 아님)
  - while 루프에서 `n % 3 === 0` 인 동안 `n /= 3` 수행
  - 최종적으로 `n === 1` 이면 3의 거듭제곱
- 이 방법은 **정수 오버플로를 신경 쓸 필요가 없고**, 구현이 단순합니다.

### English

- **Definition**: An integer `n` is a power of 3 if there exists an integer `k ≥ 0` such that `n = 3^k`.
- Simple iterative approach:
  - If `n <= 0`, return `false` immediately.
  - While `n % 3 === 0`, divide `n` by 3.
  - At the end, if `n === 1`, then the original number was a power of 3.
- This approach is safe and easy to implement.

---

## 자바스크립트 예시 코드 (JavaScript Example)

```javascript
function isPowerOfThree(n) {
  if (n <= 0) return false;

  while (n % 3 === 0) {
    n = n / 3;
  }

  return n === 1;
}

console.log(isPowerOfThree(1));   // true  (3^0)
console.log(isPowerOfThree(3));   // true  (3^1)
console.log(isPowerOfThree(9));   // true  (3^2)
console.log(isPowerOfThree(10));  // false
console.log(isPowerOfThree(27));  // true  (3^3)
console.log(isPowerOfThree(0));   // false
console.log(isPowerOfThree(-3));  // false
```

---

## 라인별 설명 (Line-by-line Explanation)

### 한국어 (Korean)

- `if (n <= 0) return false;`
  - 3의 거듭제곱은 항상 양수이므로, 0 이하인 경우는 전부 `false` 입니다.
- `while (n % 3 === 0) { n = n / 3; }`
  - `n` 이 3으로 나누어 떨어지는 동안, 계속 3으로 나눕니다.
  - 만약 `n` 이 3의 거듭제곱이면, 결국 1이 됩니다.
- `return n === 1;`
  - 최종값이 1이면 3의 거듭제곱, 아니면 아닙니다.

### English

- `if (n <= 0) return false;`
  - Powers of 3 are strictly positive; any non-positive number is not a power of 3.
- `while (n % 3 === 0) { n = n / 3; }`
  - Repeatedly divide `n` by 3 as long as it is divisible by 3.
  - If `n` is truly a power of 3, this loop will eventually reduce it to 1.
- `return n === 1;`
  - If the final result is 1, then the original number was a power of 3.

---

## 시간 및 공간 복잡도 (Time & Space Complexity)

- **시간(Time)**: `O(log_3 n)`
  - 3로 나눌 때마다 수가 1/3로 줄어드므로, 약 `log_3 n` 번 반복합니다.
- **공간(Space)**: `O(1)`
  - 입력을 제외한 추가 메모리는 상수입니다.

### 추가 아이디어 (Extra Ideas)

- 특정 언어에서는 최대 32비트 정수 범위 내의 가장 큰 3의 거듭제곱 `3^k` 를 미리 구해 두고,
  - `n > 0 && maxPowerOf3 % n === 0` 으로 판별하기도 합니다.
  - 하지만 면접에서는 **반복 나누기 방식**만 말해도 충분합니다.

---

## 요약 (Summary)

- **KO**: 양수인지 먼저 확인하고, 3으로 나누어 떨어지는 동안 계속 나눈 뒤 최종적으로 1이 되면 3의 거듭제곱입니다. 시간 복잡도는 `O(log n)`, 공간 복잡도는 `O(1)` 입니다.
- **EN**: Check that `n` is positive, repeatedly divide by 3 while it is divisible by 3, and return whether the final result equals 1. This runs in `O(log n)` time and `O(1)` space.
