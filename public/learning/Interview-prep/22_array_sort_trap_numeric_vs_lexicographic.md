# 22. `Array.prototype.sort` 숫자 정렬 함정 / Numeric vs Lexicographic Sort Trap

## 질문 (Question)

아래 코드의 출력 결과를 예측해 보세요.

```javascript
const nums = [10, 1, 5, 20, 3];

const sortedDefault = nums.slice().sort();
const sortedNumeric = nums.slice().sort((a, b) => a - b);

console.log('default sort :', sortedDefault);
console.log('numeric sort :', sortedNumeric);
```

1. `sortedDefault` 와 `sortedNumeric` 의 실제 값은 무엇인가요?
2. 왜 이런 차이가 나는지 설명해 보세요.

---

## 정답 (Answer)

### 예상 출력 (Typical Output)

```text
default sort : [1, 10, 20, 3, 5]
numeric sort : [1, 3, 5, 10, 20]
```

---

## 이유 (Why This Happens)

### 한국어 (Korean)

- `Array.prototype.sort()` 의 **기본 동작**
  - 비교 함수를 주지 않으면, 요소들을 **문자열로 변환한 뒤 사전순(lexicographic)** 으로 정렬합니다.
  - 즉, `'10'`, `'1'`, `'5'`, `'20'`, `'3'` 를 문자열로 비교합니다.
- 문자열 비교 예
  - `'1' < '10'` 은 `false` 입니다. 문자열 비교에서는 첫 글자부터 순서대로 비교하기 때문입니다.
  - 결과적으로 `[1, 10, 20, 3, 5]` 처럼 사람이 기대하는 숫자 정렬과는 다른 순서가 나옵니다.
- 숫자 정렬을 하려면
  - `sort((a, b) => a - b)` 처럼 **비교 함수를 명시적으로 제공**해야 합니다.

### English

- Default behavior of `Array.prototype.sort()`
  - Without a compare function, elements are converted to **strings** and sorted lexicographically.
  - So `'10'`, `'1'`, `'5'`, `'20'`, `'3'` are compared as strings.
- String comparison:
  - `'1' < '10'` is `false` in lexicographic order.
  - This leads to a surprising order: `[1, 10, 20, 3, 5]`.
- Numeric sort
  - Providing a compare function like `(a, b) => a - b` forces **numeric comparison** and yields `[1, 3, 5, 10, 20]`.

---

## 추가 예시 (More Examples)

```javascript
['2', '10', '1'].sort();
// ['1', '10', '2']  (문자열 기준)

[2, 10, 1].sort((a, b) => a - b);
// [1, 2, 10]       (숫자 기준)
```

---

## 요약 (Summary)

- **KO**: `sort()` 에 비교 함수를 주지 않으면 숫자도 문자열처럼 사전순으로 정렬됩니다. 숫자 정렬이 필요하면 반드시 비교 함수를 넘겨야 합니다.
- **EN**: Without a compare function, `sort()` uses string-based lexicographic ordering, so you must pass a comparator to get true numeric sorting.
