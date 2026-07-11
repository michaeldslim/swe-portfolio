# 32. 고유 빈도수 판별 (Unique Frequencies of Characters)

> Related LeetCode: [Unique Number of Occurrences](https://leetcode.com/problems/unique-number-of-occurrences/)

## 문제 설명 (Problem Description)

문자열 `s` 가 주어졌을 때, 각 문자별로 등장 횟수를 셉니다.
이때 **모든 문자들의 등장 횟수가 서로 다르면** `true`,
중복되는 등장 횟수가 하나라도 있으면 `false` 를 반환하는 문제입니다.

예를 들어,
- `s = "abbccc"` 의 경우 문자별 등장 횟수는 `a:1, b:2, c:3` 이므로 모두 다르고 → `true`.
- `s = "aabb"` 의 경우 `a:2, b:2` 로 등장 횟수 `2` 가 중복되므로 → `false`.

Given a string `s`, count the frequency of each character.
Return `true` if the number of occurrences of each character is **unique** (no two characters share the same count), otherwise return `false`.

---

## 입력 (Input)

- 문자열 `s`

A string `s`.

---

## 출력 (Output)

- 모든 문자 등장 횟수가 서로 다르면 `true`, 아니면 `false`.

Return `true` if all character frequencies are unique, otherwise `false`.

---

## 예시 (Example)

### 예시 1

- 입력 / Input: `s = "abbccc"`
- 출력 / Output: `true`
- 설명 / Explanation:
  - 문자별 등장 횟수는 `a:1, b:2, c:3` 입니다.
  - 등장 횟수 집합은 `{1, 2, 3}` 로 모두 서로 다르므로 `true` 입니다.

### 예시 2

- 입력 / Input: `s = "aabb"`
- 출력 / Output: `false`
- 설명 / Explanation:
  - 문자별 등장 횟수는 `a:2, b:2` 입니다.
  - 등장 횟수 `2` 가 두 번 나오므로, 고유하지 않아 `false` 입니다.

### 예시 3

- 입력 / Input: `s = "abc"`
- 출력 / Output: `true`
- 설명 / Explanation:
  - `a:1, b:1, c:1` 이라고 생각할 수 있지만, 실제로는 등장 횟수가 모두 1로 **같으므로** 이 경우는 `false` 로 하기도 합니다.
  - 여기서는 **각 문자마다 count를 세고, count들의 집합이 중복이 있는지**를 보는 문제이므로,
    예제 정책에 따라 조정 가능합니다.
  - (LeetCode 원문에서는 정수 배열에 대해 정의되며, 문자열 버전에서는 테스트에 맞게 조정하면 됩니다.)

> 실제 구현에서는 LeetCode 스타일과 동일하게, "값의 등장 횟수"들이 고유한지 검사한다고 이해하면 됩니다.

---

## 접근 방식 (Approach)

### 아이디어 (Korean)

1. 먼저 문자열을 순회하며 **문자 → 등장 횟수**를 해시맵(`Map`)에 저장합니다.
2. 그 다음, 이 등장 횟수들을 모두 모아서 `Set`에 넣습니다.
3. 만약 어떤 등장 횟수가 중복되었다면, `Set`의 크기가 원래 등장 횟수 배열의 길이보다 작아집니다.
4. 따라서 `Set`의 크기와 등장 횟수 배열의 길이를 비교하여 고유성 여부를 판단합니다.

### Idea (English)

1. Traverse the string and build a frequency map from character to its count.
2. Collect all frequency values into an array.
3. Insert these frequencies into a `Set`.
4. If any frequency is duplicated, the size of the `Set` will be smaller than the length of the frequency array.
5. Return `true` if the sizes match (all unique), otherwise `false`.

---

## 자바스크립트 코드 (JavaScript Code)

```javascript
function hasUniqueFrequencies(s) {
  const freqMap = new Map();

  for (const ch of s) {
    freqMap.set(ch, (freqMap.get(ch) || 0) + 1);
  }

  const frequencies = [];
  for (const count of freqMap.values()) {
    frequencies.push(count);
  }

  const freqSet = new Set(frequencies);

  return freqSet.size === frequencies.length;
}
```

---

## 코드 라인별 설명 (Line-by-line Explanation)

### 한국어 (Korean)

- `function hasUniqueFrequencies(s) { ... }`  
  - 문자열에서 문자 등장 횟수가 모두 고유한지 검사하는 함수입니다.
- `const freqMap = new Map();`  
  - 문자 → 등장 횟수를 저장할 해시맵입니다.
- `for (const ch of s) { ... }`  
  - 문자열의 각 문자를 순회하며 빈도를 셉니다.
- `freqMap.set(ch, (freqMap.get(ch) || 0) + 1);`  
  - 해당 문자의 기존 횟수를 가져오고(없으면 0), 1 증가시켜 다시 저장합니다.
- `const frequencies = [];`  
  - 모든 문자 등장 횟수를 담을 배열입니다.
- `for (const count of freqMap.values()) { frequencies.push(count); }`  
  - 해시맵의 값들(등장 횟수)을 배열로 옮깁니다.
- `const freqSet = new Set(frequencies);`  
  - 등장 횟수 배열을 기반으로 집합(Set)을 만듭니다. 중복 값은 자동으로 제거됩니다.
- `return freqSet.size === frequencies.length;`  
  - 집합의 크기와 원래 배열 길이가 같다면, 중복 없이 모두 고유하다는 뜻이므로 `true` 입니다.

### English

- `function hasUniqueFrequencies(s) { ... }`  
  - Function that checks whether all character frequencies in the string are unique.
- `const freqMap = new Map();`  
  - Map to store character → count.
- `for (const ch of s) { ... }`  
  - Iterate over each character in the string.
- `freqMap.set(ch, (freqMap.get(ch) || 0) + 1);`  
  - Increment the count for each character (defaulting to 0 if not present).
- `const frequencies = [];`  
  - Array to collect all frequency values.
- `for (const count of freqMap.values()) { frequencies.push(count); }`  
  - Push each count from the map into the array.
- `const freqSet = new Set(frequencies);`  
  - Create a `Set` from the frequencies; duplicates are removed.
- `return freqSet.size === frequencies.length;`  
  - If the set size equals the array length, all frequencies are unique → return `true`, otherwise `false`.

---

## 시간 및 공간 복잡도 (Time and Space Complexity)

- 시간 복잡도 (Time Complexity): `O(n)`  
  - 문자열을 한 번 순회하고, 등장 횟수의 개수(서로 다른 문자 수)는 최대 `n` 입니다.
- 공간 복잡도 (Space Complexity): `O(k)`  
  - `k` 는 서로 다른 문자 종류 수로, 해시맵과 집합에 `k` 개의 항목을 저장합니다.
