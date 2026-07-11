# 10. 배열 vs ArrayList 차이 / Difference Between Array and ArrayList

## 질문 (Question)

- **KO**: "고정 크기 배열과 동적으로 크기가 늘어나는 리스트(예: ArrayList 스타일)의 차이를 설명해 보세요. 자바스크립트 기준으로 배열을 어떻게 사용하면 되는지도 같이 설명해 주세요."
- **EN**: "Explain the difference between a fixed-size array and a dynamically resizable list (ArrayList-style). How does this map to JavaScript arrays in practice?"

---

## 핵심 차이 요약 (Key Differences)

자바 같은 언어에서는 "배열 vs ArrayList" 로 구분하지만, 자바스크립트에서는 **하나의 `Array` 타입이 동적 배열(ArrayList 스타일) 역할을 대부분 대신합니다.**

여기서는 개념적으로만 비교합니다.

| 항목 / Item                | 고정 크기 배열 (Fixed-size Array 개념)           | 동적 배열 / 리스트 (ArrayList-style, JS Array) |
|---------------------------|--------------------------------------------------|-----------------------------------------------|
| 크기 (Size)              | **고정 크기** (생성 시 결정, 변경 어려움)          | **가변 크기** (push/pop 등으로 자동으로 늘어남/줄어듦) |
| 문법 (Syntax 예시)       | C/Java: `int arr[10];`                           | JS: `const arr = []; arr.push(1);`           |
| 성능 (Performance)       | 인덱스 접근 매우 빠름, 리사이즈 없음             | 인덱스 접근 빠름, 가끔 리사이즈 오버헤드     |
| 편의 메서드 (Convenience)| 거의 없음 (수동 구현 필요)                        | `push`, `pop`, `shift`, `splice`, `map` 등 풍부한 메서드 |

---

## 상세 설명 (Detailed Explanation)

### 1) 크기 (Size)

- **KO (개념)**
  - 고정 크기 배열: 처음 크기를 정하면 바꾸기 어렵습니다.
  - 동적 리스트(ArrayList 스타일): 내부에서 필요할 때 더 큰 배열로 복사하여 크기를 늘립니다.
- **JS 관점**
  - 자바스크립트 `Array` 는 기본적으로 **동적 배열**입니다. `new Array(10)` 으로 크기를 힌트 줄 수 있지만, `push`, `pop` 으로 자유롭게 크기를 바꿀 수 있습니다.
- **EN**
  - Conceptually, fixed arrays have an unchangeable size, while dynamic lists resize as needed.
  - In JavaScript, the built-in `Array` already behaves like a dynamic list (ArrayList-like).

### 2) 타입 (Type)

- **KO (JS)**
  - 자바스크립트 `Array` 는 숫자, 문자열, 객체 등 **어떤 타입이든 섞어서** 담을 수 있습니다.
- **EN (JS)**
  - A JavaScript `Array` can store values of any type (numbers, strings, objects, etc.) in the same array.

### 3) 사용 편의성 (Convenience)

- **Fixed-size array 개념**
  - 길이가 고정되어 있고, 중간 삽입/삭제를 직접 구현해야 합니다.
- **JS Array (동적 리스트)**
  - 길이: `arr.length`
  - 메서드: `push`, `pop`, `shift`, `unshift`, `splice`, `map`, `filter`, `reduce` 등 풍부한 API 제공

---

## 예시 코드 (JavaScript Examples)

### 동적 배열로서의 자바스크립트 Array

```javascript
const numbers = []; // 빈 배열 (동적)
numbers.push(10);
numbers.push(20);
numbers.push(30);

for (let i = 0; i < numbers.length; i++) {
  console.log(numbers[i]);
}

numbers.splice(1, 1); // 인덱스 1의 원소 하나 제거 (20 제거)
console.log(numbers.length); // 2
```

### ArrayList 스타일 래퍼 구현 예시

```javascript
class ArrayList {
  constructor() {
    this.items = [];
  }

  add(value) {
    this.items.push(value);
  }

  get(index) {
    return this.items[index];
  }

  removeAt(index) {
    this.items.splice(index, 1);
  }

  size() {
    return this.items.length;
  }
}

const list = new ArrayList();
list.add(10);
list.add(20);
list.add(30);

console.log(list.get(1)); // 20
list.removeAt(1);
console.log(list.size()); // 2
```

---

## 언제 무엇을 사용할까? (When to Use Which?)

### 고정 배열 개념을 선호하는 경우 (Prefer Fixed-size Concept)

- **KO**
  - 크기가 확실히 고정되어 있고, 재할당/리사이즈를 피하고 싶을 때 (저수준 엔진, TypedArray 사용 등)
- **EN**
  - Size is strictly fixed and you want to avoid reallocation overhead.

### 동적 리스트(JS Array)를 선호하는 경우 (Prefer Dynamic List / JS Array)

- **KO**
  - 일반적인 웹 애플리케이션에서 대부분의 경우: 원소 추가/삭제가 많고, 편의 메서드를 적극적으로 활용하고 싶을 때.
- **EN**
  - In typical JavaScript apps, you almost always use `Array` as a dynamic list because it’s convenient and flexible.

---

## 시간 복잡도 관점 (Time Complexity View)

- **고정 또는 동적 배열 공통 (JS Array 포함)**
  - 인덱스 접근: `O(1)`
  - 끝에 추가/삭제 (`push`/`pop`): 평균 `O(1)`
  - 중간 삽입/삭제 (`splice`): `O(n)` (요소 이동 필요)

---

## 요약 (Summary)

- **KO**: 개념적으로는 고정 크기 배열과 동적 리스트(ArrayList)가 다르지만, 자바스크립트에서는 `Array` 하나가 사실상 동적 리스트 역할을 하며, 대부분의 애플리케이션 코드에서 이를 사용하면 됩니다.
- **EN**: Conceptually, fixed-size arrays differ from dynamic lists, but in JavaScript the built-in `Array` already behaves like a dynamic ArrayList-style structure and is what you typically use in practice.
