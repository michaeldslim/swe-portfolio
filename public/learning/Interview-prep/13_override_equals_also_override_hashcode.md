# 13. 커스텀 equals를 정의하면 hash 함수도 함께 정의해야 하는 이유 (JavaScript 관점)

## 질문 (Question)

- **KO**: "해시 기반 컬렉션(예: HashMap 같은 구조)을 직접 구현한다고 할 때, `equals` 로 논리적 동등성을 정의하면 왜 `hash` 함수도 함께 일관되게 정의해야 하나요? 자바스크립트 관점에서 개념을 설명해 보세요."
- **EN**: "If you implement a hash-based collection yourself (like a HashMap), why must a custom `equals` definition be paired with a consistent `hash` function? Explain conceptually from a JavaScript point of view."

---

### Java 관점 (Original Interview Question)

- **KO**: Java 면접 질문인 _"If you override `Object.equals()` method, what other method should you consider overriding? Why?"_ 의 기대 답변은:
  - `equals()` 를 오버라이드하면 **반드시 `hashCode()` 도 함께 오버라이드**해야 한다는 것입니다.
  - 이유: `a.equals(b) == true` 이면 `a.hashCode() == b.hashCode()` 여야 HashMap/HashSet 이 올바르게 동작하기 때문입니다.
- **EN**: In Java, when you override `Object.equals()`, you must also override `hashCode()`, because the contract says that if `a.equals(b)` is `true` then `a.hashCode()` must equal `b.hashCode()` for hash-based collections to behave correctly.

이제 아래에서는 **같은 아이디어를 자바스크립트 관점에서**(커스텀 `equals` + `hash`) 다시 설명합니다.

---

## 핵심 개념 (Concept / Contract)

### 한국어 (Korean)

- 해시 기반 컬렉션(HashMap 스타일)을 생각해 봅시다.
  - 먼저 `hash(key)` 로 **버킷(bucket)** 을 선택하고,
  - 같은 버킷 안에서 `equals(a, b)` 로 실제로 같은 키인지 확인합니다.
- 이때 **규약(contract)** 은 다음과 같습니다:
  - `equals(a, b)` 가 `true` 라면, 반드시 `hash(a) === hash(b)` 여야 합니다.
  - 반대로, `hash(a) === hash(b)` 라고 해서 항상 `equals(a, b)` 가 true 일 필요는 없습니다(충돌 허용).

### English

- In a hash-based collection (like a HashMap you might implement in JS), lookup usually works as:
  - Use `hash(key)` to choose a **bucket**.
  - Inside that bucket, use `equals(a, b)` to check if the keys are really equal.
- The **contract** is:
  - If `equals(a, b)` is `true`, then `hash(a)` and `hash(b)` **must** be the same.
  - But equal hash values do not guarantee equality (collisions are allowed).

---

## 예시: JS로 단순 HashMap 구현 시의 문제 (Problem Example in JavaScript)

```javascript
// 커스텀 equals만 사용하고, hash는 객체의 기본 toString()에 의존한다고 가정

function equalsUser(a, b) {
  return a.username === b.username;
}

function hashUser(user) {
  // (나쁜 예) username을 쓰지 않고, 단순히 객체를 문자열로 변환
  // 서로 다른 객체는 toString() 값이 달라질 수 있음
  return Object.prototype.toString.call(user);
}

class SimpleHashSet {
  constructor() {
    this.buckets = new Map(); // key: hash, value: 배열
  }

  add(user) {
    const h = hashUser(user);
    if (!this.buckets.has(h)) {
      this.buckets.set(h, []);
    }
    const bucket = this.buckets.get(h);
    if (!bucket.some((u) => equalsUser(u, user))) {
      bucket.push(user);
    }
  }

  contains(user) {
    const h = hashUser(user);
    const bucket = this.buckets.get(h);
    if (!bucket) return false;
    return bucket.some((u) => equalsUser(u, user));
  }
}

const set = new SimpleHashSet();
const u1 = { username: 'mike' };
const u2 = { username: 'mike' };

set.add(u1);
console.log(set.contains(u2)); // 구현에 따라 false 가 될 수 있음
```

### 설명 (Explanation)

- **KO**
  - `equalsUser(u1, u2)` 는 `true` 이지만, `hashUser(u1)` 과 `hashUser(u2)` 가 다를 수 있습니다.
  - HashSet 스타일 구조는 먼저 `hash` 로 버킷을 찾고, 같은 버킷 안에서만 `equals` 를 사용하므로, 서로 다른 버킷에 들어가면 **논리적으로 같지만 찾지 못하는 객체**가 됩니다.
- **EN**
  - `equalsUser(u1, u2)` returns `true`, but `hashUser(u1)` and `hashUser(u2)` may differ.
  - Since the set uses `hash` to choose a bucket and `equals` only within that bucket, logically equal objects in different buckets cannot be found.

---

## 올바른 구현 (Correct Implementation in JavaScript Pseudocode)

```javascript
function equalsUser(a, b) {
  return a.username === b.username;
}

function hashUser(user) {
  // username 기반으로 해시를 만들면, username 이 같은 두 객체는 항상 같은 hash를 가짐
  return `user:${user.username}`;
}

class BetterHashSet {
  constructor() {
    this.buckets = new Map();
  }

  add(user) {
    const h = hashUser(user);
    if (!this.buckets.has(h)) {
      this.buckets.set(h, []);
    }
    const bucket = this.buckets.get(h);
    if (!bucket.some((u) => equalsUser(u, user))) {
      bucket.push(user);
    }
  }

  contains(user) {
    const h = hashUser(user);
    const bucket = this.buckets.get(h);
    if (!bucket) return false;
    return bucket.some((u) => equalsUser(u, user));
  }
}
```

- 이제 `username` 이 같으면 `equalsUser` 결과와 `hashUser` 값이 모두 일관되게 동일합니다.
- Hash 기반 컬렉션이 기대대로 동작합니다.

---

## 정리 (Summary)

### 한국어 (Korean)

- 해시 기반 컬렉션은 `hash` 로 버킷을 고르고, `equals` 로 최종 비교를 합니다.
- 논리적으로 같은 객체라면(`equals(a, b) === true`), 반드시 같은 버킷에 가야 하므로 `hash(a) === hash(b)` 여야 합니다.
- 따라서 커스텀 `equals` 를 정의할 때는, 그 기준에 맞춰 항상 **일관된 hash 함수**도 함께 정의해야 합니다.

### English

- Hash-based collections choose a bucket using `hash(key)` and then use `equals` within that bucket.
- If two objects are logically equal (`equals(a, b)` is `true`), they must have the same `hash` value so they end up in the same bucket.
- Therefore, whenever you define a custom equality, you must also define a consistent hash function that respects that equality.

---

## 요약 한줄 (One-line Summary)

- **KO+EN**: 논리적으로 같은 객체라면 항상 같은 hash 값을 가져야 hash 기반 컬렉션이 제대로 동작하므로, 커스텀 `equals` 를 정의할 때는 그 기준에 맞는 `hash` 함수도 함께 정의해야 합니다 / In any hash-based collection, logically equal objects must share the same hash value, so a custom equality must be paired with a consistent hash function.
