# 53. TypeScript: Advanced Union Narrowing with `in` and property checks

## 질문 (Question)

아래 코드에서 각 `if` 블록 안에서 `pet` 의 타입이 어떻게 좁혀지는지, 그리고 어떤 줄에서 에러/경고가 날 수 있는지 생각해 보세요.

```typescript
type Dog = {
  kind: 'dog';
  bark(): void;
};

type Cat = {
  kind: 'cat';
  meow(): void;
};

type Fish = {
  kind: 'fish';
  swim(): void;
};

type Pet = Dog | Cat | Fish;

function speak(pet: Pet) {
  if ('bark' in pet) {
    pet.bark();
  } else if ('meow' in pet) {
    pet.meow();
  } else {
    pet.swim();
  }
}

function speak2(pet: Pet) {
  if (pet.kind === 'dog') {
    pet.bark();
  }
  if (pet.kind === 'cat') {
    pet.meow();
  }
  if ('swim' in pet) {
    pet.swim();
  }
}
```

1. `speak` 함수에서 각 분기(`if`, `else if`, `else`) 안의 `pet` 타입은 어떻게 좁혀지나요?
2. `speak2` 에서 TypeScript 가 어떤 체크를 해 주는지, 중복 호출 가능성이나 unreachable case 가 없는지 생각해 보세요.
3. `in` 연산자와 discriminated union (`kind` 필드)을 이용한 narrowing 의 차이를 설명해 보세요.

---

## 정답 & 해설 (Answer & Explanation)

### speak 함수

```typescript
function speak(pet: Pet) {
  if ('bark' in pet) {
    pet.bark(); // pet: Dog
  } else if ('meow' in pet) {
    pet.meow(); // pet: Cat
  } else {
    pet.swim(); // pet: Fish
  }
}
```

- `'bark' in pet` → 타입이 `Dog` 로 좁혀짐.
- `'meow' in pet` → `Cat` 으로 좁혀짐.
- 위 둘이 아니면 남은 것은 `Fish` 뿐이므로, 마지막 `else` 에서 `pet` 은 `Fish`.

### speak2 함수

```typescript
function speak2(pet: Pet) {
  if (pet.kind === 'dog') {
    pet.bark(); // pet: Dog
  }
  if (pet.kind === 'cat') {
    pet.meow(); // pet: Cat
  }
  if ('swim' in pet) {
    pet.swim(); // pet: Fish
  }
}
```

- 각 `if` 는 서로 독립적이라, 컴파일러는 첫 번째 if 이후에도 `pet` 을 `Pet` 전체로 봅니다.
  - 하지만 각 블록 내부에서는
    - `pet.kind === 'dog'` → `Dog`
    - `pet.kind === 'cat'` → `Cat`
    - `'swim' in pet` → `Fish`
  - 으로 잘 좁혀집니다.
- 세 if 가 `if / else if / else` 체인이 아니라 각각 분리되어 있으므로, 이론상 **여러 블록이 실행될 수 있는 구조**지만, 실제로는 union 정의 상 동시에 두 가지 타입일 수 없어 런타임에서 한 번만 실행됩니다. TypeScript 는 이를 런타임 수준까지 추론하지는 않습니다.

### in vs discriminated union (kind)

- **`in` 연산자 기반 narrowing**
  - 특정 프로퍼티(`'bark'`, `'meow'`, `'swim'`) 존재 여부로 타입을 좁힙니다.
  - 공통 필드가 없거나 legacy 타입들에 대해 유용.

- **Discriminated union (`kind` 필드)**
  - 공통된 `kind` 필드를 기준으로 **명확하게 구분**되는 union.
  - `switch (pet.kind)` 또는 `if (pet.kind === 'dog')` 패턴과 잘 어울리며, exhaustive 체크 패턴(49번 문제)과도 연계하기 좋음.

---

## 요약 (Summary)

- **KO**: `in` 연산자와 `kind` 같은 discriminant 필드를 모두 활용하면, 복잡한 union 타입에서도 안전하게 타입을 좁힐 수 있습니다. `if / else if / else` 체인에서는 남은 타입이 자동으로 좁혀지므로 exhaustive 처리에 유리합니다.
- **EN**: Both the `in` operator and discriminant fields (`kind`) are powerful tools for narrowing unions; combined with `if/else if/else` or `switch`, they let you model exhaustive, type-safe handling of different variants.
