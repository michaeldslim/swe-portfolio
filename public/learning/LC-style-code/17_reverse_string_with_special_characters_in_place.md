# 17. 특수 문자를 제외하고 문자열 뒤집기 (Reverse String In Place Ignoring Special Characters)

> Related LeetCode: [Reverse Only Letters](https://leetcode.com/problems/reverse-only-letters/)

## 문제 설명 (Problem Description)

문자열 `s`가 주어졌을 때, **알파벳 문자만** 제자리에서 뒤집고,
숫자나 특수 문자(`!`, `@`, `#`, 공백 등)는 **원래 위치를 유지**하도록 문자열을 변환하는 문제입니다.

Given a string `s`, reverse **only the alphabetic characters** in place
so that non-alphabetic characters (digits, punctuation, spaces, etc.)
remain at their original indices.

---

## 입력 (Input)

- 문자열 `s`

A string `s`.

---

## 출력 (Output)

- 알파벳 문자만 뒤집고, 특수 문자/숫자는 제자리에 둔 새 문자열을 반환합니다.

Return a new string where only letters are reversed, others remain in place.

---

## 예시 (Example)

### 예시 1

- 입력 / Input: `s = "a,b$c"`
- 출력 / Output: `"c,b$a"`
- 설명 / Explanation:
  - 알파벳은 `a`, `b`, `c` 이고, 특수 문자 `,`, `$` 는 제자리에 남습니다.
  - 알파벳만 뒤집으면 `c`, `b`, `a` 가 되고, 특수 문자를 원래 자리 그대로 두면 결과는 `"c,b$a"` 입니다.

### 예시 2

- 입력 / Input: `s = "Ab,c,de!$"`
- 출력 / Output: `"ed,c,bA!$"`

---

## 접근 방법 (Approach)

### 설명 (Korean)

이 문제는 **양 끝에서 시작하는 두 포인터(two pointers)** 로 효율적으로 해결할 수 있습니다.

1. 왼쪽 포인터 `left = 0`, 오른쪽 포인터 `right = s.length - 1` 로 시작합니다.
2. `left < right` 인 동안 반복합니다.
   - `s[left]` 가 알파벳이 아니면 `left++` 하고 계속 진행합니다.
   - `s[right]` 가 알파벳이 아니면 `right--` 하고 계속 진행합니다.
   - 둘 다 알파벳이면, 두 문자를 서로 교환(swap) 하고 `left++`, `right--` 합니다.
3. 중간에서 포인터들이 만날 때까지 반복하면, 알파벳들만 서로 뒤집힌 상태가 됩니다.

문자열을 배열로 변환하여 문자를 제자리에서 교환한 뒤, 다시 문자열로 합치면 됩니다.

### Description (English)

We can solve this with a **two-pointer** technique.

1. Initialize `left = 0` and `right = s.length - 1`.
2. While `left < right`:
   - If `s[left]` is not a letter, increment `left`.
   - Else if `s[right]` is not a letter, decrement `right`.
   - Otherwise, both are letters: swap them and move both pointers inward.
3. Repeat until the pointers meet.

We convert the string to a character array for in-place swaps, then join back to a string.

---

## JavaScript 코드 (JavaScript Code)

```javascript
function isLetter(ch) {
  return /[a-zA-Z]/.test(ch);
}

function reverseOnlyLetters(s) {
  const chars = s.split("");
  let left = 0;
  let right = chars.length - 1;

  while (left < right) {
    if (!isLetter(chars[left])) {
      left++;
    } else if (!isLetter(chars[right])) {
      right--;
    } else {
      const temp = chars[left];
      chars[left] = chars[right];
      chars[right] = temp;
      left++;
      right--;
    }
  }

  return chars.join("");
}
```

## 코드 라인별 설명 (Line-by-Line Explanation)

- `function isLetter(ch) { return /[a-zA-Z]/.test(ch); }`
  - **KO:** 주어진 문자 `ch`가 영문 알파벳인지 정규식을 사용해 검사합니다.
  - **EN:** Helper that checks whether `ch` is an English alphabet letter.

- `function reverseOnlyLetters(s) { ... }`
  - **KO:** 문자열 `s`에서 알파벳만 뒤집고, 나머지는 제자리에 두는 함수입니다.
  - **EN:** Reverses only letters in `s`, keeping other characters fixed.

- `const chars = s.split("");`
  - **KO:** 문자열을 문자 배열로 변환하여 제자리에서 swap 할 수 있게 합니다.
  - **EN:** Converts the string into an array of characters for in-place swaps.

- `let left = 0; let right = chars.length - 1;`
  - **KO:** 왼쪽과 오른쪽 끝에서 시작하는 두 포인터를 초기화합니다.
  - **EN:** Initializes two pointers at the start and end of the array.

- `while (left < right) { ... }`
  - **KO:** 포인터가 교차할 때까지 반복합니다.
  - **EN:** Continues until the two pointers meet or cross.

- `if (!isLetter(chars[left])) { left++; }`
  - **KO:** 왼쪽 문자가 알파벳이 아니면, swap 대상이 아니므로 왼쪽 포인터를 오른쪽으로 이동합니다.
  - **EN:** Skips non-letter characters on the left side.

- `else if (!isLetter(chars[right])) { right--; }`
  - **KO:** 오른쪽 문자가 알파벳이 아니면, 오른쪽 포인터를 왼쪽으로 이동합니다.
  - **EN:** Skips non-letter characters on the right side.

- `else { ... swap ... }`
  - **KO:** 양쪽 모두 알파벳이면 두 문자를 서로 교환한 뒤, 두 포인터를 안쪽으로 이동합니다.
  - **EN:** When both sides are letters, swaps them and moves both pointers inward.

- `return chars.join("");`
  - **KO:** 수정된 문자 배열을 다시 문자열로 합쳐 반환합니다.
  - **EN:** Joins the modified character array back into a string.

---

## 시간 및 공간 복잡도 (Time and Space Complexity)

- 시간 복잡도 (Time Complexity): `O(n)`
  - 각 문자는 최대 한 번씩만 `left` 또는 `right` 포인터에 의해 검사됩니다.
- 공간 복잡도 (Space Complexity): `O(n)`
  - 문자열을 문자 배열로 변환하는 데 `O(n)` 추가 공간이 필요합니다.
