# 09. 사람 정보(이름/생일)를 ID로 관리하는 자료구조 / Data Structure for Person by Unique ID

## 질문 (Question)

- **KO**: "사람의 이름(name)과 생년월일(date of birth)을 저장하고, **유일한 ID로 빠르게 조회**해야 한다면 어떤 자료구조를 사용하겠습니까? 이유도 설명해 보세요."
- **EN**: "You need to store a person’s name and date of birth and retrieve it quickly by a unique ID. What data structure would you use and why?"

---

## 아이디어 (Idea)

### 한국어 (Korean)

- 요구사항
  - 각 사람마다 **고유한 ID** 가 있다 (예: `userId`, `UUID`, `employeeId` 등).
  - ID로 빠르게(`O(1)` 평균) 사람 정보를 조회하고 싶다.
- 자연스러운 선택: **HashMap / HashTable / Dictionary / Object / Map**
  - key: `id` (고유 ID)
  - value: 사람 정보 객체 `{ name, dateOfBirth }`
- 이유
  - 해시 기반 맵은 **삽입/조회/삭제가 평균 `O(1)`**
  - ID가 유일하므로 key 충돌 걱정이 적고, key로 직접 접근 가능

### English

- Requirements:
  - Each person has a **unique ID**.
  - We want fast lookup by ID (preferably `O(1)` on average).
- Natural choice: **HashMap / HashTable / Dictionary / Map**
  - Key: unique `id`
  - Value: person object `{ name, dateOfBirth }`
- Reason:
  - Hash-based maps offer average `O(1)` insert/lookup/delete operations.

---

## 자바스크립트 예시 (JavaScript Example with Map)

```javascript
class Person {
  constructor(name, dateOfBirth) {
    this.name = name;
    this.dateOfBirth = dateOfBirth; // 문자열 또는 Date 객체
  }
}

class PersonStore {
  constructor() {
    this.peopleById = new Map(); // 또는 {} 사용 가능
  }

  addPerson(id, person) {
    this.peopleById.set(id, person);
  }

  getPerson(id) {
    return this.peopleById.get(id) || null;
  }

  removePerson(id) {
    this.peopleById.delete(id);
  }
}

const store = new PersonStore();
store.addPerson('u1', new Person('Mike', '1995-10-01'));
store.addPerson('u2', new Person('Jane', '1993-03-15'));

console.log(store.getPerson('u1')); // Person { name: 'Mike', dateOfBirth: '1995-10-01' }
```

---

## 시간 및 공간 복잡도 (Time & Space Complexity)

- `n` = 사람 수
- **시간(Time)**
  - 삽입/조회/삭제: 평균 `O(1)` (`Map`/plain object 기반 해시 맵 가정)
- **공간(Space)**
  - `O(n)` — 사람 수에 비례하는 저장 공간 필요

---

## 대안 및 추가 포인트 (Alternatives & Talking Points)

- ID가 아닌 **이름이나 생년월일로 검색해야 한다면**
  - 이름/생일별 인덱스를 별도로 두는 `Map<string, Person[]>` 또는 `{ [key: string]: Person[] }` 구조도 고려할 수 있습니다.
- ID가 정수이고, 범위가 작고 연속적이라면
  - 단순 배열 인덱싱(`people[id] = person`)으로도 가능하지만, 실제 서비스에서는 ID가 sparse하고 문자열인 경우가 많아서 `Map`/객체 기반 맵이 더 일반적입니다.

---

## 요약 (Summary)

- **KO**: 자바스크립트에서는 `Map` 이나 plain object를 사용해 `id → { name, dateOfBirth }` 형태로 저장하면, 유일한 ID로 사람 정보를 평균 `O(1)` 시간에 빠르게 조회할 수 있습니다.
- **EN**: In JavaScript, using a `Map` (or plain object) keyed by `id` lets you retrieve a person’s `{ name, dateOfBirth }` in average `O(1)` time.
