# 4. 애너그램 묶기 (Group Anagrams with Hash Map)

> Related LeetCode: [Group Anagrams](https://leetcode.com/problems/group-anagrams/)

## 문제 설명 (Problem Description)

문자열 배열 `strs`가 주어졌을 때, **애너그램(anagram)** 들을 서로 같은 그룹으로 묶는 문제입니다.

애너그램이란, 문자의 순서만 다르고 사용된 문자와 개수는 같은 문자열을 말합니다.
예를 들어, `"eat"`, `"tea"`, `"ate"` 는 서로 애너그램입니다.

Given an array of strings `strs`, group the anagrams together.
You can return the answer in **any order**.

---

## 입력 (Input)

- 문자열 배열 `strs`
- 각 문자열은 소문자 알파벳으로 구성되어 있다고 가정할 수 있습니다.

An array of strings `strs`.

---

## 출력 (Output)

- 애너그램끼리 묶인 **2차원 문자열 배열**을 반환합니다.
- 각 내부 배열은 하나의 애너그램 그룹을 나타냅니다.

Return a 2D array where each inner array is a group of anagrams.

---

## 예시 (Example)

### 예시 1

- 입력 / Input: `strs = ["eat", "tea", "tan", "ate", "nat", "bat"]`
- 가능한 출력 / One possible output:

```text
[
  ["eat", "tea", "ate"],
  ["tan", "nat"],
  ["bat"]
]
```

---

## 접근 방법 (Approach)

### 설명 (Korean)

애너그램의 핵심은 **정렬했을 때 동일한 문자열이 된다**는 점입니다.

1. 각 문자열 `s`에 대해, 문자들을 정렬한 문자열 `key`를 만듭니다.
   - 예: `"eat" -> "aet"`, `"tea" -> "aet"`
2. `Map`을 이용해, `key`를 기준으로 문자열을 그룹화합니다.
   - `map[key]`에 해당하는 배열에 원래 문자열 `s`를 push 합니다.
3. 모든 문자열을 처리한 후, `Map`에 저장된 모든 value 배열들을 모아 반환합니다.

이 방법은 각 문자열을 정렬하는 비용이 `O(m log m)` (m은 문자열 길이)이므로,
전체 시간 복잡도는 `O(n * m log m)` 정도가 됩니다.

### Description (English)

The key property of anagrams is that they become the **same string when sorted**.

1. For each string `s` in `strs`, sort its characters to get a key `key`.
   - e.g. `"eat" -> "aet"`, `"tea" -> "aet"`.
2. Use a map from `key` to an array of strings.
   - Append `s` to `map[key]`.
3. After processing all strings, collect all the arrays from the map and return them.

Sorting each string takes `O(m log m)`, and we do this for all `n` strings,
so the total time complexity is `O(n * m log m)`.

---

## JavaScript 코드 (JavaScript Code)

```javascript
function groupAnagrams(strs) {
  const map = new Map(); // key: sorted string, value: list of anagrams

  for (const s of strs) {
    const key = s.split("").sort().join("");

    if (!map.has(key)) {
      map.set(key, []);
    }

    map.get(key).push(s);
  }

  return Array.from(map.values());
}
```

## 코드 라인별 설명 (Line-by-Line Explanation)

- `function groupAnagrams(strs) {`
  - **KO:** 문자열 배열 `strs`를 받아, 애너그램끼리 묶어서 반환하는 함수입니다.
  - **EN:** Declares a function that takes an array of strings and groups anagrams together.

- `const map = new Map(); // key: sorted string, value: list of anagrams`
  - **KO:** 정렬된 문자열을 key로, 해당 애너그램들을 모은 배열을 value로 저장하기 위한 `Map`입니다.
  - **EN:** A map whose key is the sorted string and whose value is the list of original strings (anagrams).

- `for (const s of strs) {`
  - **KO:** 입력 배열의 각 문자열 `s`를 순회합니다.
  - **EN:** Iterates over every string `s` in `strs`.

- `const key = s.split("").sort().join("");`
  - **KO:** 문자열 `s`를 문자 배열로 나누고, 정렬한 뒤 다시 합쳐 애너그램을 구분하는 기준 문자열 `key`를 만듭니다.
  - **EN:** Splits `s` into characters, sorts them, and joins back to form the canonical key for anagrams.

- `if (!map.has(key)) { map.set(key, []); }`
  - **KO:** 해당 `key`가 처음 등장하면, 빈 배열을 value로 갖는 엔트리를 생성합니다.
  - **EN:** If this key hasn’t been seen before, initializes it with an empty array in the map.

- `map.get(key).push(s);`
  - **KO:** 현재 문자열 `s`를 `key`에 해당하는 배열에 추가합니다.
  - **EN:** Appends the original string `s` to the array associated with its key.

- `return Array.from(map.values());`
  - **KO:** `Map`에 저장된 모든 value 배열(애너그램 그룹들)만 꺼내 배열 형태로 반환합니다.
  - **EN:** Returns an array of all the grouped anagram lists from the map.

---

## 시간 및 공간 복잡도 (Time and Space Complexity)

- 시간 복잡도 (Time Complexity): `O(n * m log m)`
  - `n`은 문자열의 개수, `m`은 각 문자열의 평균 길이입니다.
  - 각 문자열을 정렬하는 비용이 `O(m log m)` 입니다.
- 공간 복잡도 (Space Complexity): `O(n * m)`
  - 모든 문자열을 `Map`에 저장하고, 결과 배열도 추가로 필요합니다.
