# 23. 유효한 팰린드롬 (Valid Palindrome)

> Related LeetCode: [Valid Palindrome](https://leetcode.com/problems/valid-palindrome/)

## 문제 설명 (Problem Description)

문자열 `s`가 주어졌을 때, **영문자와 숫자만 고려**하여 대소문자를 무시하고 읽었을 때
앞에서부터 읽은 것과 뒤에서부터 읽은 것이 같은지(팰린드롬인지)를 판단하는 문제입니다.

Given a string `s`, determine if it is a **palindrome**, considering only alphanumeric characters and ignoring cases.

---

## 입력 (Input)

- 문자열 `s`

A string `s`.

---

## 출력 (Output)

- 팰린드롬이면 `true`, 아니면 `false`.

Return `true` if `s` is a palindrome, or `false` otherwise.

---

## 예시 (Example)

### 예시 1

- 입력 / Input: `s = "A man, a plan, a canal: Panama"`
- 출력 / Output: `true`
- 설명 / Explanation:
  - 영문자와 숫자만 남기고 소문자로 바꾸면 `"amanaplanacanalpanama"` 이고, 앞뒤가 같습니다.

### 예시 2

- 입력 / Input: `s = "race a car"`
- 출력 / Output: `false`
- 설명 / Explanation:
  - 영문자만 남기면 `"raceacar"` 이고, 앞뒤가 다릅니다.

---

## 접근 방식 (Approach)

### 아이디어 (Korean)

- 먼저 문자열 전체를 소문자로 변환합니다.
- 정규식을 사용해 **영문자와 숫자만 남긴 새 문자열** `str` 을 만듭니다.
- 그 다음, 인덱스 `i`를 0부터 시작해 문자열 길이의 절반(`len / 2`)까지만 순회합니다.
  - `str[i]`와 `str[len - 1 - i]`를 비교합니다.
  - 두 문자가 다르면 팰린드롬이 아니므로 `false` 를 반환합니다.
- 끝까지 모든 쌍이 같다면 팰린드롬이므로 `true` 를 반환합니다.

### Idea (English)

- First, convert the entire string to lowercase.
- Use a regular expression to build a new string `str` that contains **only alphanumeric characters**.
- Then iterate with an index `i` from 0 up to half of the string length (`len / 2`).
  - Compare `str[i]` with `str[len - 1 - i]`.
  - If any pair differs, return `false` immediately.
- If all pairs match, return `true` because the string is a palindrome.

---

## 자바스크립트 코드 (JavaScript Code)

```javascript
var isPalindrome = function (s) {
  const str = s.toLowerCase().replace(/[^a-z0-9]/g, "");
  const len = str.length;

  if (len === 0) {
    return true;
  }

  for (let i = 0; i < len / 2; i++) {
    if (str[i] !== str[len - 1 - i]) {
      return false;
    }
  }

  return true;
};
```

---

## 코드 라인별 설명 (Line-by-line Explanation)

### 한국어 (Korean)

- `var isPalindrome = function (s) { ... }`  
  - 문자열이 팰린드롬인지 검사하는 메인 함수입니다.
- `const str = s.toLowerCase().replace(/[^a-z0-9]/g, "");`  
  - 먼저 문자열을 소문자로 바꾼 뒤, 정규식을 사용해 영문자와 숫자만 남긴 새 문자열을 만듭니다.
- `const len = str.length;`  
  - 정제된 문자열의 길이를 구해 변수에 저장합니다.
- `if (len === 0) { return true; }`  
  - 알파뉴메릭 문자가 하나도 없으면 빈 문자열이므로 팰린드롬으로 간주하고 `true` 를 반환합니다.
- `for (let i = 0; i < len / 2; i++) { ... }`  
  - 문자열의 앞쪽 절반만 순회하면서 양끝 문자를 비교합니다.
- `if (str[i] !== str[len - 1 - i]) { return false; }`  
  - 앞과 뒤의 문자가 다르면 즉시 팰린드롬이 아니므로 `false` 를 반환합니다.
- `return true;`  
  - 끝까지 모든 쌍이 같다면 팰린드롬이므로 `true` 를 반환합니다.

### English

- `var isPalindrome = function (s) { ... }`  
  - Main function that checks if the string is a palindrome.
- `const str = s.toLowerCase().replace(/[^a-z0-9]/g, "");`  
  - Convert the string to lowercase and use a regular expression to keep only alphanumeric characters.
- `const len = str.length;`  
  - Store the length of the cleaned string.
- `if (len === 0) { return true; }`  
  - If there are no alphanumeric characters, treat it as an empty string and return `true`.
- `for (let i = 0; i < len / 2; i++) { ... }`  
  - Loop only through the first half of the string.
- `if (str[i] !== str[len - 1 - i]) { return false; }`  
  - If any pair of characters from the front and back differs, return `false`.
- `return true;`  
  - If the loop finishes without mismatches, the string is a palindrome.

---

## 시간 및 공간 복잡도 (Time and Space Complexity)

- 시간 복잡도 (Time Complexity): `O(n)`  
  - 문자열을 한 번 정제하고, 최대 절반 길이만 비교하므로 전체적으로 선형 시간입니다.
- 공간 복잡도 (Space Complexity): `O(n)`  
  - 알파뉴메릭 문자만 담긴 새 문자열을 추가로 생성하기 때문에 입력 길이에 비례하는 추가 공간을 사용합니다.
