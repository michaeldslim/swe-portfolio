# 05. 문자열/숫자 팰린드롬 판별 / Check if a String or Number is a Palindrome

## 질문 (Question)

- **KO**: "문자열 또는 정수가 주어졌을 때, 이것이 팰린드롬인지(앞에서 읽으나 뒤에서 읽으나 같은지) 확인하는 방법을 설명해 보세요."
- **EN**: "Given a string or an integer, how would you check if it is a palindrome (reads the same forward and backward)?"

---

## 아이디어 (Idea)

### 한국어 (Korean)

- **팰린드롬 정의**: `"racecar"`, `"1221"` 처럼 앞에서부터 읽은 것과 뒤에서부터 읽은 것이 동일한 문자열/숫자
- 일반적인 두 가지 접근
  1. **양 끝에서 가운데로 오는 투 포인터(two pointers)**
     - 왼쪽 포인터 `left = 0`, 오른쪽 포인터 `right = length - 1` 로 시작
     - `s[left] === s[right]` 를 계속 확인하면서 안쪽으로 이동
     - 하나라도 다르면 팰린드롬 아님
  2. 문자열을 **뒤집어서 비교**
     - `reversed = s.split('').reverse().join('')`
     - `s === reversed` 이면 팰린드롬
- 숫자의 경우, 문자열로 변환해서 동일한 로직을 적용해도 됩니다.

### English

- **Definition**: A palindrome reads the same forwards and backwards, e.g., `"racecar"`, `"1221"`.
- Two common approaches:
  1. **Two-pointer technique** from both ends toward the center.
  2. **Reverse and compare** the string.
- For integers, we can convert the number to a string and reuse the same logic.

---

## 자바스크립트 예시 코드 (JavaScript Example)

### 1) 문자열 + 투 포인터 (String + Two Pointers)

```javascript
function isPalindromeString(s) {
  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    if (s[left] !== s[right]) {
      return false;
    }
    left++;
    right--;
  }

  return true;
}

console.log(isPalindromeString('racecar')); // true
console.log(isPalindromeString('abba'));    // true
console.log(isPalindromeString('abc'));     // false
```

### 2) 숫자 → 문자열로 변환 (Number to String)

```javascript
function isPalindromeNumber(n) {
  const s = String(n); // 또는 n.toString()
  return isPalindromeString(s);
}

console.log(isPalindromeNumber(1221)); // true
console.log(isPalindromeNumber(10));   // false
```

### 3) 문자열 뒤집어서 비교 (Reverse and Compare)

```javascript
function isPalindromeByReverse(s) {
  const reversed = s.split('').reverse().join('');
  return s === reversed;
}

console.log(isPalindromeByReverse('level')); // true
console.log(isPalindromeByReverse('hello')); // false
```

---

## 라인별 설명 (Line-by-line Explanation)

### 한국어 (Korean, 투 포인터 버전)

- `let left = 0; let right = s.length - 1;`
  - 문자열의 양 끝 인덱스를 가리킵니다.
- `while (left < right) { ... }`
  - 왼쪽 인덱스가 오른쪽보다 작을 동안 반복합니다.
- `if (s[left] !== s[right]) { return false; }`
  - 두 문자가 다르면 팰린드롬이 아니므로 바로 `false` 반환합니다.
- `left++; right--;`
  - 왼쪽은 오른쪽으로, 오른쪽은 왼쪽으로 한 칸씩 이동하여 가운데로 좁혀 갑니다.
- 루프가 끝날 때까지 불일치가 없으면 팰린드롬입니다.

### English (Two-pointer version)

- `let left = 0; let right = s.length - 1;`
  - Initialize two pointers at both ends of the string.
- `while (left < right) { ... }`
  - Continue as long as the pointers have not met or crossed.
- `if (s[left] !== s[right]) { return false; }`
  - If any pair of characters differ, the string is not a palindrome.
- `left++; right--;`
  - Move the pointers inward.
- If the loop finishes without finding a mismatch, the string is a palindrome.

---

## 시간 및 공간 복잡도 (Time & Space Complexity)

- **Two-pointer approach**
  - 시간(Time): `O(n)` — 문자열 길이 `n` 만큼 한 번 스캔
  - 공간(Space): `O(1)` — 포인터 두 개만 사용
- **Reverse-and-compare approach**
  - 시간(Time): `O(n)` — 문자열을 뒤집는 데 `O(n)`
  - 공간(Space): `O(n)` — 뒤집힌 문자열을 위한 추가 공간 필요

---

## 면접에서 추가로 언급할 포인트 (Extra Interview Points)

- 실제 코딩 테스트에서는 **공백/대소문자/알파벳/숫자만 비교** 등의 조건이 붙기도 합니다.
  - 예: `"A man, a plan, a canal: Panama"` → 영문자와 숫자만, 소문자로 통일 후 비교.
- 숫자를 문자열로 바꾸지 않고 **수학적으로 뒤집어서 비교**하는 방법도 있습니다 (정수 연산만 사용).

---

## 요약 (Summary)

- **KO**: 양 끝에서 두 포인터로 문자를 비교하며 중앙으로 이동하면 `O(n)` 시간, `O(1)` 공간에 팰린드롬을 판별할 수 있습니다.
- **EN**: Use two pointers from both ends toward the center, comparing characters; if all pairs match, it’s a palindrome in `O(n)` time and `O(1)` space.
