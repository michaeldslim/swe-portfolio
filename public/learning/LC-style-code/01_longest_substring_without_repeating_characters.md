# 1. 중복 없는 가장 긴 부분 문자열 (Longest Substring Without Repeating Characters)

> Related LeetCode: [Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters/)

## 문제 설명 (Problem Description)

주어진 문자열 `s`에서, **중복되지 않는 문자들로만 이루어진 가장 긴 부분 문자열(substring)** 의 길이를 구하는 문제입니다.
부분 문자열은 **연속된** 문자들의 구간이어야 합니다.

Given a string `s`, find the **length of the longest substring** without repeating characters.
The substring must be **contiguous**.

---

## 입력 (Input)

- 하나의 문자열 `s`가 주어집니다.
- `0 <= s.length <= 10^5`
- 문자열은 ASCII 문자라고 가정합니다.

A single string `s` is given.

---

## 출력 (Output)

- 중복되지 않는 문자들로만 이루어진 가장 긴 부분 문자열의 **길이**(정수)를 반환합니다.

Return the **length** (integer) of the longest substring without repeating characters.

---

## 예시 (Example)

### 예시 1

- 입력 / Input: `s = "abcabcbb"`
- 출력 / Output: `3`
- 설명 / Explanation: 가장 긴 부분 문자열은 `"abc"`, 길이는 3입니다.

### 예시 2

- 입력 / Input: `s = "bbbbb"`
- 출력 / Output: `1`
- 설명 / Explanation: 가장 긴 부분 문자열은 `"b"`, 길이는 1입니다.

---

## 접근 방법 (Approach)

### 설명 (Korean)

이 문제는 **슬라이딩 윈도우(sliding window)** 와 **해시맵(Map)** 을 활용해 효율적으로 해결할 수 있습니다.

1. **두 개의 포인터** `left`, `right`를 사용하여 현재 부분 문자열 구간 `s[left..right]` 를 나타냅니다.
2. 각 문자가 **마지막으로 등장한 인덱스**를 저장하기 위해 `Map` (`seen`) 을 사용합니다.
3. `right` 포인터를 0부터 끝까지 이동시키면서:
   - 현재 문자 `ch = s[right]` 를 확인합니다.
   - 만약 `ch`가 `seen`에 존재하고, 그 인덱스가 현재 윈도우 안 (`>= left`) 에 있다면,
     - 우리는 **중복 문자**를 만난 것이므로, 윈도우의 시작점을 `left = seen.get(ch) + 1` 로 이동시켜
       중복을 제거합니다.
   - 그 후, `seen.set(ch, right)` 로 현재 문자의 마지막 위치를 갱신합니다.
   - 매 단계에서 `maxLen = max(maxLen, right - left + 1)` 로 최대 길이를 갱신합니다.

이 방식은 각 문자가 `left`와 `right`에 의해 **최대 한 번씩만 윈도우에 들어왔다 나가기 때문에**,
전체 시간 복잡도는 `O(n)` 입니다.

### Description (English)

We can solve this problem using a **sliding window** and a **hash map**.

1. Use two pointers, `left` and `right`, to represent the current window `s[left..right]`.
2. Maintain a map `seen` that stores the **last index** where each character appeared.
3. Iterate `right` from `0` to `s.length - 1`:
   - Let `ch = s[right]`.
   - If `ch` is in `seen` and `seen.get(ch) >= left`, it means `ch` is **inside the current window**,
     so we have a duplicate.
     - Move `left` to `seen.get(ch) + 1` to skip the previous occurrence and remove the duplicate.
   - Update `seen.set(ch, right)`.
   - Update `maxLen = Math.max(maxLen, right - left + 1)`.

Each character is processed at most twice (once when `right` moves, and possibly once when `left` jumps),
so the total time complexity is `O(n)`.

---

## JavaScript 코드 (JavaScript Code)

```javascript
function lengthOfLongestSubstring(s) {
  const seen = new Map(); // char -> last index
  let left = 0;
  let maxLen = 0;

  for (let right = 0; right < s.length; right++) {
    const ch = s[right];

    // If the character was seen and is inside the current window, move left
    if (seen.has(ch) && seen.get(ch) >= left) {
      left = seen.get(ch) + 1;
    }

    seen.set(ch, right);
    maxLen = Math.max(maxLen, right - left + 1);
  }

  return maxLen;
}
```

## 코드 라인별 설명 (Line-by-Line Explanation)

- `function lengthOfLongestSubstring(s) {`
  - **KO:** 문자열 `s`를 입력으로 받아, 중복 없는 가장 긴 부분 문자열의 길이를 반환하는 함수 선언입니다.
  - **EN:** Declares a function that takes the string `s` and returns the length of the longest substring without repeating characters.

- `const seen = new Map(); // char -> last index`
  - **KO:** 문자를 key, 그 문자가 마지막으로 등장한 인덱스를 value로 저장하는 `Map` 객체를 생성합니다.
  - **EN:** Creates a `Map` that stores each character as a key and its last seen index as the value.

- `let left = 0;`
  - **KO:** 현재 슬라이딩 윈도우의 왼쪽 경계를 나타내는 포인터입니다.
  - **EN:** `left` is the left boundary of the current sliding window.

- `let maxLen = 0;`
  - **KO:** 지금까지 찾은 중복 없는 부분 문자열의 최대 길이를 저장합니다.
  - **EN:** `maxLen` keeps track of the maximum window length found so far without repeating characters.

- `for (let right = 0; right < s.length; right++) {`
  - **KO:** `right` 포인터를 0부터 문자열 끝까지 이동시키며, 윈도우의 오른쪽 경계를 확장합니다.
  - **EN:** Loops `right` from `0` to `s.length - 1`, expanding the right boundary of the window.

- `const ch = s[right];`
  - **KO:** 현재 윈도우의 오른쪽 끝 문자 `ch`를 가져옵니다.
  - **EN:** Retrieves the current character at the right boundary of the window.

- `if (seen.has(ch) && seen.get(ch) >= left) {`
  - **KO:** `ch`가 이미 등장했고, 그 인덱스가 현재 윈도우 안(`left` 이상)에 있는지 확인합니다. 이런 경우 중복입니다.
  - **EN:** Checks if `ch` was seen before and its last index is within the current window (`>= left`), meaning it is a duplicate.

- `left = seen.get(ch) + 1;`
  - **KO:** 중복된 문자를 제거하기 위해, 윈도우의 왼쪽 경계를 해당 문자 다음 인덱스로 이동합니다.
  - **EN:** Moves the left boundary to one position after the last occurrence of `ch` to remove the duplicate from the window.

- `seen.set(ch, right);`
  - **KO:** 현재 문자 `ch`의 마지막 등장 인덱스를 현재 위치 `right`로 갱신합니다.
  - **EN:** Updates the map so that `ch` now maps to the current index `right`.

- `maxLen = Math.max(maxLen, right - left + 1);`
  - **KO:** 현재 윈도우의 길이 `(right - left + 1)` 와 기존 `maxLen`을 비교해 더 큰 값을 저장합니다.
  - **EN:** Updates `maxLen` to be the larger of the current window length and the previous maximum.

- `return maxLen;`
  - **KO:** 전체 순회를 마친 뒤, 찾은 가장 긴 중복 없는 부분 문자열의 길이를 반환합니다.
  - **EN:** Returns the maximum length of a substring without repeating characters after scanning the whole string.

---

## 시간 및 공간 복잡도 (Time and Space Complexity)

- 시간 복잡도 (Time Complexity): `O(n)`
  - 각 문자는 슬라이딩 윈도우에 의해 최대 한 번씩만 처리됩니다.
- 공간 복잡도 (Space Complexity): `O(min(n, k))`
  - `k`는 문자 집합(alphabet)의 크기입니다. `Map`에 저장되는 문자의 수에 비례합니다.
