# 27. off-by-one + 인자 사용 여부 / Off-by-one and Using the Argument

## 질문 (Question)

다음 두 함수의 출력 차이를 설명해 보세요.

```javascript
function a(n) {
  for (let i = 0; i < n; i++) {
    console.log('a i =', i);
  }
}

function b(n) {
  for (let i = 1; i <= n; i++) {
    console.log('b i =', i);
  }
}

a(3);
console.log('---');
b(3);
```

1. 실제 출력은 무엇인가요?
2. 두 함수의 **범위 차이(0-based vs 1-based)** 를 설명해 보세요.
3. 이런 off-by-one 오류가 실무에서 어떻게 버그로 이어질 수 있는지도 생각해 보세요.

---

## 정답 (Answer)

### 실제 출력 (Actual Output)

```text
a i = 0
a i = 1
a i = 2
---
b i = 1
b i = 2
b i = 3
```

- `a(3)` 은 `0, 1, 2` (길이 3, 0-based)
- `b(3)` 은 `1, 2, 3` (1-based)

---

## 이유 (Why This Happens)

### 한국어 (Korean)

- `a(n)`
  - 루프 조건: `i < n`
  - `i = 0, 1, 2` 까지만 실행 → 총 `n`번 반복 (0-based 인덱스에 잘 맞음)
- `b(n)`
  - 루프 조건: `i <= n`
  - `i = 1, 2, 3` 까지 실행 → 총 `n`번 반복이지만, 값의 범위는 `1..n` (1-based)

### English

- `a(n)`
  - Loop condition: `i < n`.
  - Runs for `i = 0, 1, 2` → exactly `n` iterations, natural for 0-based indexing.
- `b(n)`
  - Loop condition: `i <= n`.
  - Runs for `i = 1, 2, 3` → still `n` iterations, but range is `1..n` (1-based).

---

## 인터뷰 포인트 (Interview Angle)

### 한국어 (Korean)

- 배열/문자열을 순회할 때는 보통 **0-based 인덱스** 를 사용하므로, `for (let i = 0; i < arr.length; i++)` 패턴이 자연스럽습니다.
- 잘못해서 `i <= arr.length` 를 사용하면, 마지막에 `arr[arr.length]` 에 접근하는 off-by-one 버그가 생깁니다.

### English

- When iterating arrays/strings (0-based), the idiomatic loop is `for (let i = 0; i < arr.length; i++)`.
- Using `i <= arr.length` instead can easily cause off-by-one bugs by accessing `arr[arr.length]`.

---

## 요약 (Summary)

- **KO**: `i < n` 은 0-based 범위(`0..n-1`), `i <= n` 은 1-based 범위(`1..n`)를 만들어 냅니다. 인덱스를 다룰 때는 off-by-one 오류를 항상 조심해야 합니다.
- **EN**: `i < n` yields the range `0..n-1` (good for 0-based indices), while `i <= n` yields `1..n`; be careful with off-by-one errors when working with indices.
