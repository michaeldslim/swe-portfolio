# 01. 배열에서 중복 제거 (새 배열 허용) / Remove Duplicates from Array (New Array Allowed)

## 질문 (Question)

- **KO**: "새 배열을 만들어도 된다는 전제에서, 배열에서 중복 원소를 제거하는 방법을 설명해보세요. 시간/공간 복잡도도 함께 말해 주세요."
- **EN**: "Given that creating a new array is allowed, how would you remove duplicates from an array? Also discuss time and space complexity."

---

## 아이디어 & 접근 (Idea & Approach)

### 한국어 (Korean)

- 가장 흔한 접근은 **해시 자료구조(Set 또는 Map)** 를 사용하는 것입니다.
- 배열을 왼쪽에서 오른쪽으로 순회하면서:
  - 아직 본 적 없는 값이면 `새 배열(result)` 에 추가하고, `Set` 에도 추가합니다.
  - 이미 `Set` 안에 있다면 중복이므로 **건너뜁니다**.
- 이렇게 하면 각 원소는 **한 번만** 처리되고, Set 조회/추가는 평균 `O(1)` 이므로 **전체 시간 복잡도는 `O(n)`**, 추가 공간은 `O(n)` 입니다.

### English

- The most common solution uses a **hash-based data structure (`Set` or `Map`)**.
- Iterate the array from left to right:
  - If the value has **not** been seen, push it to a new `result` array and record it in a `Set`.
  - If it **has** been seen (already in the `Set`), **skip** it.
- Each element is processed once; `Set` operations are average `O(1)`, so the **time complexity is `O(n)`** and **extra space is `O(n)`**.

---

## 자바스크립트 예시 코드 (JavaScript Example)

### 1) Set을 직접 사용하는 방법 (Using `Set` directly)

```javascript
function removeDuplicates(arr) {
  const seen = new Set();
  const result = [];

  for (const value of arr) {
    if (!seen.has(value)) {
      seen.add(value);
      result.push(value);
    }
  }

  return result;
}

// 사용 예시 (Usage)
console.log(removeDuplicates([1, 2, 2, 3, 4, 4, 4]));
// [1, 2, 3, 4]
```

### 2) ES6 문법으로 간단히 (Using pure `Set` + spread)

> 이 방식은 **순서를 유지**하면서 중복 제거가 됩니다.

```javascript
function removeDuplicatesES6(arr) {
  return [...new Set(arr)];
}

console.log(removeDuplicatesES6([1, 2, 2, 3, 4, 4, 4]));
// [1, 2, 3, 4]
```

---

## 라인별 설명 (Line-by-line Explanation)

### 한국어 (Korean)

```javascript
function removeDuplicates(arr) {
  const seen = new Set();
  const result = [];

  for (const value of arr) {
    if (!seen.has(value)) {
      seen.add(value);
      result.push(value);
    }
  }

  return result;
}
```

- `const seen = new Set();`
  - 지금까지 본 값들을 저장하는 집합입니다. **값의 존재 여부를 빠르게 확인**할 수 있습니다.
- `const result = [];`
  - 중복이 제거된 값들을 담을 **새 배열**입니다.
- `for (const value of arr) { ... }`
  - 원래 배열의 각 값을 순회합니다.
- `if (!seen.has(value)) { ... }`
  - `seen` 에 아직 없다면 첫 등장이라는 의미입니다.
- `seen.add(value);`
  - 이제 이 값을 봤다는 것을 기록합니다.
- `result.push(value);`
  - 결과 배열에 추가합니다.
- `return result;`
  - 중복이 제거된 새 배열을 반환합니다.

### English

- `const seen = new Set();`
  - A set that remembers which values we have already seen.
- `const result = [];`
  - A new array to store **unique** values in their original order.
- `for (const value of arr) { ... }`
  - Iterate over each value in the input array.
- `if (!seen.has(value)) { ... }`
  - If `value` is **not** in `seen`, this is its first occurrence.
- `seen.add(value);`
  - Mark the value as seen.
- `result.push(value);`
  - Append the value to the result array.
- `return result;`
  - Return the new array with duplicates removed.

---

## 시간/공간 복잡도 (Time & Space Complexity)

- **시간 복잡도 (Time)**: `O(n)`
  - 각 원소를 한 번만 보고, `Set` 의 `has/add` 는 평균 `O(1)` 입니다.
- **공간 복잡도 (Space)**: `O(n)`
  - 최악의 경우 모든 원소가 유니크하면 `Set` 과 `result` 에 모두 저장됩니다.

### 면접에서 추가로 말할 수 있는 포인트 (Extra Interview Talking Points)

- 입력 배열의 순서를 유지해야 하는지 확인합니다.
  - `Set` + 스프레드 문법은 **순서를 유지**합니다.
- 메모리 제약이 매우 엄격하면, 정렬 후 인접 원소와 비교하는 방식(`O(n log n)` + `O(1)` 추가 공간)을 이야기해도 좋습니다.

---

## 요약 (Summary)

- **KO**: 새 배열을 허용한다면, `Set` 으로 이미 본 값을 체크하면서 새 배열에만 추가하면 `O(n)` 시간에 중복 제거가 가능합니다.
- **EN**: If a new array is allowed, you can remove duplicates in `O(n)` time by tracking seen values in a `Set` and only pushing unseen values into a new result array.
