# 08. 객체지향에서 상속이란? / What is Inheritance in OOP?

## 질문 (Question)

- **KO**: "객체지향 프로그래밍(OOP)에서 상속(inheritance)이 무엇인지, 왜 사용하는지, 간단한 코드 예제와 함께 설명해 보세요."
- **EN**: "In object-oriented programming, what is inheritance, why do we use it, and can you show a simple code example?"

---

## 개념 (Concept)

### 한국어 (Korean)

- **상속(Inheritance)**
  - 이미 존재하는 클래스(부모, 상위, base, super class)의 **속성/메서드**를 새로운 클래스(자식, 하위, derived, sub class)가 **물려받아 재사용**하는 개념
- 주요 목적
  - **코드 재사용 (Code reuse)**: 공통 기능을 상위 클래스에 모아 두고, 하위 클래스에서 그대로 사용하거나 확장
  - **계층 구조 표현 (Hierarchy)**: `동물 → 포유류 → 개` 와 같이 is-a 관계를 모델링
  - **다형성(Polymorphism)** 과도 밀접
- 하지만, **과도한 상속**은 복잡도 증가, 결합도 상승을 가져오므로 필요 이상으로 사용하지 않도록 주의해야 합니다. ("구성(Composition)이 상속보다 낫다"는 원칙도 자주 언급됨)

### English

- **Inheritance**
  - A mechanism where a new class (subclass/child) **inherits** properties and methods from an existing class (superclass/parent).
- Main goals:
  - **Code reuse**: Put common behavior in a base class and reuse/extend it in child classes.
  - **Express hierarchies**: Model `Animal → Mammal → Dog` relationships.
  - Often combined with **polymorphism**.
- Overusing inheritance can lead to tight coupling and complex hierarchies, so prefer it only when an *is-a* relationship is clear.

---

## 예시 코드 (JavaScript Example)

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log('...some generic animal sound...');
  }
}

class Dog extends Animal { // Dog is an Animal
  constructor(name) {
    super(name); // 부모 클래스 생성자 호출
  }

  speak() {
    console.log(`${this.name} says: Woof!`);
  }
}

const generic = new Animal('Unknown');
generic.speak();

const dog = new Dog('Max');
dog.speak(); // 상속 + 오버라이딩 사용
```

### 설명 (Explanation)

- **KO**
  - `class Dog extends Animal` : Dog 클래스가 Animal 클래스를 상속받습니다.
  - Dog는 `name` 필드와 `speak()` 메서드를 그대로 물려받고, `speak()` 를 **오버라이드(override)** 해서 개에 특화된 동작을 구현합니다.
  - `super(name)` 으로 부모 생성자를 호출해 공통 초기화를 재사용합니다.
- **EN**
  - `class Dog extends Animal`: `Dog` inherits from `Animal`.
  - `Dog` reuses the `name` field and `speak()` method but **overrides** `speak()` with dog-specific behavior.
  - `super(name)` calls the parent constructor to reuse initialization logic.

---

## 장점/단점 (Pros & Cons)

### 장점 (Pros)

- **KO**
  - 코드 중복 감소 (공통 기능을 부모 클래스에 정의)
  - 계층 구조를 통해 도메인 모델을 더 자연스럽게 표현 가능
  - 다형성(polymorphism)과 함께 사용할 때, `Animal animal = new Dog();` 형태로 추상화된 코드를 작성 가능
- **EN**
  - Reduces code duplication.
  - Expresses natural hierarchies in the domain model.
  - Enables polymorphism (e.g., `Animal animal = new Dog();`).

### 단점/주의점 (Cons / Caveats)

- **KO**
  - 잘못 설계하면 상위-하위 클래스 간 결합도가 강해짐
  - 상위 클래스 변경이 하위 클래스에 큰 영향을 줄 수 있음
  - 복잡한 다중 상속 구조는 유지보수 어려움 (Java는 클래스 다중 상속을 금지하는 이유 중 하나)
- **EN**
  - Tight coupling between parent and child classes if misused.
  - Changes in the base class can break many subclasses.
  - Complex multiple-inheritance hierarchies are hard to maintain (one reason Java disallows multiple inheritance of classes).

---

## 인터뷰에서 자주 나오는 추가 포인트 (Extra Interview Talking Points)

- **is-a vs has-a**
  - 상속은 보통 "is-a" 관계를 모델링 (`Dog is an Animal`).
  - 구성(composition)은 "has-a" 관계를 모델링 (`Car has an Engine`).
- **구성이 상속보다 낫다 (Composition over Inheritance)**
  - 요즘 설계 원칙에서는 상속보다 구성을 선호하는 경우가 많다고 언급하면 좋습니다.

---

## 요약 (Summary)

- **KO**: 상속은 부모 클래스의 속성과 메서드를 자식 클래스가 물려받아 재사용/확장하는 OOP 개념으로, 코드 재사용과 계층 구조 표현에 유용하지만 과도한 상속은 결합도를 높여 유지보수를 어렵게 만들 수 있습니다.
- **EN**: Inheritance lets a subclass reuse and extend the properties and methods of a superclass, which aids code reuse and modeling hierarchies, but overusing it can cause tight coupling and maintenance issues.
