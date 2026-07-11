# 19. 부서(dep) 기준으로 그룹화하기 / Group by Department in JavaScript

## 질문 (Question)

다음과 같은 배열이 주어졌을 때, `dep`(department) 기준으로 사람들을 그룹화하는 코드를 작성해 보세요.

```javascript
const input = [
  { name: 'tom', dep: 'Engineering' },
  { name: 'Alice', dep: 'Sales' },
  { name: 'nick', dep: 'Engineering' },
  { name: 'David', dep: 'Engineering' },
  { name: 'Eva', dep: 'Accounts' },
  { name: 'Mika', dep: 'Engineering' },
  { name: 'Jack', dep: 'Sales' },
  { name: 'Mary', dep: 'Accounts' },
];
```

### 요구 사항 (Requirements)

- **KO**
  - 결과를 "부서 → 사람 배열" 형태로 만들고 싶습니다.
- **EN**
  - We want an object (or Map) that groups people by `dep`.

예시 출력 형태:

```javascript
{
  Engineering: ['tom', 'nick', 'David', 'Mika'],
  Sales: ['Alice', 'Jack'],
  Accounts: ['Eva', 'Mary'],
}
```

---

## 풀이 1: 객체(object) + reduce 사용 (Using `reduce` into a plain object)

```javascript
function groupByDepartment(list) {
  return list.reduce((acc, person) => {
    const dep = person.dep;

    if (!acc[dep]) {
      acc[dep] = [];
    }

    acc[dep].push(person.name);
    return acc;
  }, {});
}

const result = groupByDepartment(input);
console.log(result);
```

### 라인별 설명 (Line-by-line)

- **KO**
  - `reduce` 의 초기값을 `{}` (빈 객체)로 설정합니다.
  - 각 사람에 대해 `acc[dep]` 배열이 없으면 먼저 생성하고, 그 후 `name` 을 push 합니다.
- **EN**
  - Start `reduce` with `{}` as the accumulator.
  - For each person, ensure `acc[dep]` exists, then push `person.name` into that array.

---

## 풀이 2: 전체 객체를 그대로 그룹화 (Group by dep but keep full objects)

```javascript
function groupByDepartmentFull(list) {
  return list.reduce((acc, person) => {
    const dep = person.dep;
    if (!acc[dep]) {
      acc[dep] = [];
    }
    acc[dep].push(person); // 전체 객체를 넣기
    return acc;
  }, {});
}

const byDep = groupByDepartmentFull(input);
console.log(byDep.Engineering);
// [ { name: 'tom', dep: 'Engineering' }, ... ]
```

---

## 풀이 3: Map 사용 (Using `Map`)

```javascript
function groupByDepartmentMap(list) {
  const map = new Map(); // dep -> array of people

  for (const person of list) {
    const dep = person.dep;
    if (!map.has(dep)) {
      map.set(dep, []);
    }
    map.get(dep).push(person.name);
  }

  return map;
}

const mapResult = groupByDepartmentMap(input);
console.log(mapResult.get('Engineering'));
// ['tom', 'nick', 'David', 'Mika']
```

---

## 난이도 포인트 (Tricky Aspects)

- **KO**
  - `reduce` 초기값을 `[]` 로 잘못 두거나, `acc[dep]` 초기화를 빼먹으면 `TypeError` 가 발생할 수 있습니다.
  - 면접에서는 **불변성(immutability)** 을 강조하는 경우도 있어, 기존 객체를 복사하면서 그룹화하도록 요구할 수도 있습니다.
- **EN**
  - Forgetting to initialize `acc[dep]` before `push` will cause runtime errors.
  - Some interviewers may ask you to keep the accumulator immutable (returning new objects) for functional-style code.

---

## 요약 (Summary)

- **KO**: `reduce` 또는 `for...of` 루프를 이용해, `dep` 값을 key 로 하는 객체/Map 을 만들어 그룹화할 수 있습니다.
- **EN**: You can group by `dep` using `reduce` into an object or a `Map`, initializing an array per department and pushing each person’s name (or the whole object) into it.
