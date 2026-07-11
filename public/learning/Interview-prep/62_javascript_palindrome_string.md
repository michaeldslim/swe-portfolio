# 62. JavaScript Palindrome String

## 1. 질문 (Question)

- Palindrome(팰린드롬) 문자열이 무엇인지 설명해 보세요.
- JavaScript 로 문자열이 팰린드롬인지 확인하는 함수를 구현해 보세요.
- 대소문자 차이, 공백/특수문자 처리 등 **엣지 케이스**는 어떻게 다루면 좋을까요?

---

## 2. 개념 (Concept)

### 한국어 (Korean)

- **Palindrome 문자열**
  - 앞에서 읽으나 뒤에서 읽으나 **같은 문자열**.
  - 예: `"racecar"`, `"level"`, `"토마토"`.
- 실무/인터뷰에서는 보통 다음과 같은 변형을 함께 묻습니다.
  - 대소문자 무시: `"RaceCar"` → 팰린드롬으로 취급.
  - 영숫자만 비교: `"A man, a plan, a canal: Panama"` 같은 문장.

### English

- A **palindrome** is a string that reads the same forward and backward.
- Often we normalize the string:
  - Ignore case.
  - Optionally ignore non-alphanumeric characters (spaces, punctuation).

---

## 3. 기본 구현 1: 문자열 뒤집기 비교

### 코드 (Code)

```js
function isPalindrome(str) {
  const reversed = str.split('').reverse().join('');
  return str === reversed;
}

console.log(isPalindrome('racecar')); // true
console.log(isPalindrome('hello'));   // false
```

### 설명 (KO)

- 문자열을 문자 배열로 만들어 `reverse` 후 다시 문자열로 합침.
- 원본 문자열과 뒤집은 문자열이 같으면 팰린드롬.
- 가장 직관적이지만, **대소문자/공백/특수문자**는 그대로 비교.

### Explanation (EN)

- Reverse the string and compare it to the original.
- Simple and readable, good for a first answer.

---

## 4. 기본 구현 2: 양 끝에서 좁혀오는 투포인터(two-pointer)

### 코드 (Code)

```js
function isPalindromeTwoPointers(str) {
  let left = 0;
  let right = str.length - 1;

  while (left < right) {
    if (str[left] !== str[right]) {
      return false;
    }
    left++;
    right--;
  }

  return true;
}

console.log(isPalindromeTwoPointers('level')); // true
console.log(isPalindromeTwoPointers('world')); // false
```

### 설명 (KO)

- `left` 포인터는 문자열 시작, `right` 포인터는 끝에서 시작.
- 두 문자가 다르면 바로 `false`.
- 끝까지 문제 없으면 `true`.
- 장점: 문자열을 **굳이 새로 생성하지 않고**, 한 번만 순회.

### Explanation (EN)

- Use two indices moving inward from both ends.
- If any pair of characters differ, it’s not a palindrome.
- Time: O(n), Space: O(1) extra.

---

## 5. 대소문자/특수문자 무시하는 버전

인터뷰에서 자주 나오는 변형: **영숫자만 비교, 대소문자 무시**.

### 코드 (Code)

```js
function normalize(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]/g, ''); // 영문자/숫자가 아닌 것은 제거
}

function isPalindromeNormalized(str) {
  const normalized = normalize(str);
  let left = 0;
  let right = normalized.length - 1;

  while (left < right) {
    if (normalized[left] !== normalized[right]) {
      return false;
    }
    left++;
    right--;
  }

  return true;
}

console.log(isPalindromeNormalized('A man, a plan, a canal: Panama')); // true
console.log(isPalindromeNormalized('race a car'));                      // false
```

### 설명 (KO)

- 먼저 `normalize` 함수로
  - 소문자로 변환 (`toLowerCase`).
  - 정규식 `/[^a-z0-9]/g` 로 영문자/숫자가 아닌 문자 제거.
- 그런 다음 투포인터 알고리즘으로 팰린드롬 검사.
- 한국어나 다른 유니코드 문자까지 고려하려면 정규식을 조정해야 하지만, 인터뷰에서는 보통 영문자/숫자만 가정하는 경우가 많습니다.

### Explanation (EN)

- Normalize by lowercasing and stripping out non-alphanumerics.
- Run a two-pointer palindrome check on the cleaned string.
- Common interview variant, especially on LeetCode-style questions.

---

## 6. 엣지 케이스 (Edge Cases)

### 한국어 (Korean)

- 빈 문자열 `""` → 보통은 **팰린드롬으로 간주**.
- 한 글자 문자열 → 항상 팰린드롬.
- 공백/기호만 있는 문자열:
  - 정규식으로 모두 제거하면 빈 문자열이 될 수 있으므로, 이 경우를 어떻게 처리할지 정의.

### English

- Empty string is usually considered a palindrome.
- Single-character strings are trivially palindromes.
- Strings with only punctuation/whitespace may normalize to empty; decide how to treat them.

---

## 7. 면접 포인트 (Interview Angle)

### 한국어 (Korean)

- 기본 아이디어:
  - 문자열을 뒤집어 비교하는 방법.
  - 양 끝에서 비교하는 투포인터 방법.
- 성능:
  - 두 방법 모두 시간 복잡도 O(n), 투포인터는 추가 메모리가 거의 없음.
- 변형 요구 사항:
  - 대소문자 무시, 공백/특수문자 무시 등 **normalize 과정**을 분리해 설명.

### English

- Mention both reverse-and-compare and two-pointer approaches.
- Note time complexity O(n) and constant extra space for the two-pointer solution.
- Talk about normalization for case-insensitive and alphanumeric-only checks.

---

## 8. 한 줄 요약 (Summary)

- **KO**: 팰린드롬 문자열은 앞뒤가 같은 문자열로, JavaScript 에서는 문자열을 뒤집어 비교하거나 양 끝에서 좁혀 오는 투포인터 방식으로 검사할 수 있고, 인터뷰에서는 대소문자/특수문자 무시를 위한 정규식 기반 normalize 과정까지 함께 설명하면 좋습니다.
- **EN**: A palindrome is a string that reads the same forward and backward; in JavaScript you can check it by reversing the string or using a two-pointer scan, and in interviews it’s important to discuss normalization (case-insensitive, alphanumeric-only) as part of your solution.
