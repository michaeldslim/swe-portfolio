# 06. 두 HashSet의 공통 원소 찾기 / Find Common Values in Two HashSets

## 질문 (Question)

- **KO**: "두 개의 HashSet이 있을 때, 두 집합에 공통으로 존재하는 값을 효율적으로 찾는 방법을 설명해 보세요."
- **EN**: "Given two HashSets, how would you efficiently find the common values between them?"

---

## 아이디어 (Idea)

### 한국어 (Korean)

- HashSet(또는 Set)은 **원소 존재 여부를 평균 `O(1)`** 에 확인할 수 있습니다.
- 공통 원소(intersection)를 찾는 가장 단순한 방법
  1. **더 작은 집합을 순회**한다.
  2. 각 원소 `x` 에 대해, 다른 집합에 `x` 가 있는지 확인 (`contains` 또는 `has`).
  3. 둘 다에 있으면 결과 집합에 추가.
- 이렇게 하면 시간 복잡도는 `O(min(n, m))` 에 가깝고, HashSet의 장점을 잘 활용합니다.

### English

- A HashSet provides average `O(1)` time for membership checks.
- To compute the intersection:
  1. **Iterate over the smaller set**.
  2. For each element `x`, check if it is present in the other set.
  3. If yes, add it to the result set.
- This yields roughly `O(min(n, m))` time complexity.

---

## 자바스크립트 예시 코드 (JavaScript Example)

```javascript
// 두 Set의 교집합을 구하는 함수
function intersection(setA, setB) {
  // 항상 더 작은 Set을 순회하도록 스왑
  if (setA.size > setB.size) {
    return intersection(setB, setA);
  }

  const result = new Set();

  for (const value of setA) {
    if (setB.has(value)) {
      result.add(value);
    }
  }

  return result;
}

// 사용 예시 (Usage)
const set1 = new Set([1, 2, 3]);
const set2 = new Set([2, 3, 4]);

const common = intersection(set1, set2);
console.log(common); // Set(2) { 2, 3 }
```

---

## 라인별 설명 (Line-by-line Explanation)

### 한국어 (Korean)

- `if (setA.size > setB.size) { return intersection(setB, setA); }`
  - 항상 더 작은 Set을 바깥 루프에 사용하도록 스왑합니다.
- `for (const value of setA) { ... }`
  - 작은 Set `setA` 의 모든 원소를 순회합니다.
- `if (setB.has(value)) { result.add(value); }`
  - 큰 Set `setB` 에도 같은 값이 있으면 결과 Set에 추가합니다.
- 자바스크립트 `Set` 의 `has` 연산은 구현에 따라 평균적으로 `O(1)` 를 기대할 수 있으므로, 전체 시간은 **작은 쪽 크기만큼만** 비례합니다.

### English

- `if (setA.size > setB.size) { return intersection(setB, setA); }`
  - Ensures we always iterate over the smaller set to minimize work.
- `for (const value of setA) { ... }`
  - Loop over all elements of the smaller set.
- `if (setB.has(value)) { result.add(value); }`
  - If the larger set also contains the same value, add it to the result.
- In JavaScript, `Set.prototype.has` is typically `O(1)` on average, so total time is proportional to the size of the smaller set.

---

## 시간 및 공간 복잡도 (Time & Space Complexity)

- `n = |A|`, `m = |B|` 라고 할 때,
  - **시간(Time)**: `O(min(n, m))`
    - 작은 집합만 순회하기 때문입니다.
  - **공간(Space)**: `O(k)`
    - `k` 는 공통 원소의 개수 (교집합 크기). 결과를 새로운 Set에 저장합니다.

---

## 면접에서 추가로 이야기할 수 있는 포인트 (Extra Interview Points)

- 언어에 따라 내장 `set.intersection(otherSet)` 같은 API가 제공될 수 있지만, **직접 구현 로직을 설명하는 것이 중요**합니다.
- 입력 크기가 매우 크고 한 쪽만 메모리에 올릴 수 있다면, 스트리밍/배치 처리 또는 정렬 후 투포인터 방식 등도 논의할 수 있습니다.

---

## 요약 (Summary)

- **KO**: 자바스크립트 `Set` 두 개의 교집합을 구할 때는, 항상 더 작은 Set을 순회하면서 다른 Set에 포함되는지 `has` 로 체크하면 `O(min(n, m))` 시간에 공통 원소를 찾을 수 있습니다.
- **EN**: For two JavaScript `Set` objects, iterate over the smaller set and use `has` on the other set to build the intersection in `O(min(n, m))` time.
