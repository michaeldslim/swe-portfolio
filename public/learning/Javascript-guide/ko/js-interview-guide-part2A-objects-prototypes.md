# JavaScript 인터뷰 가이드: Part 2A - 객체와 프로토타입

## 객체와 프로토타입

### 객체 생성 패턴

JavaScript는 객체를 생성하는 여러 방법을 제공하며, 각각 고유한 사용 사례와 장점이 있습니다.

#### 1. 객체 리터럴
```javascript
const person = {
  firstName: 'John',
  lastName: 'Doe',
  age: 30,
  greet() {
    return `Hello, I'm ${this.firstName} ${this.lastName}`;
  }
};
```

**장점:**
- 간단하고 간결한 문법
- 일회성 객체에 적합
- 객체를 생성하는 가장 일반적인 방법

#### 2. 생성자 함수
```javascript
function Person(firstName, lastName, age) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.age = age;
  this.greet = function() {
    return `Hello, I'm ${this.firstName} ${this.lastName}`;
  };
}

const john = new Person('John', 'Doe', 30);
```

**장점:**
- 여러 유사한 객체 생성
- `instanceof` 연산자가 작동함
- ES6 클래스 이전의 전통적인 방법

**인터뷰 팁:**
- 항상 `new` 키워드와 함께 호출 (또는 안전장치 사용)
- 함수 이름은 대문자로 시작 (관례)
- 각 인스턴스가 메서드의 자체 복사본을 가짐 (메모리 비효율적)

#### 3. 팩토리 함수
```javascript
function createPerson(firstName, lastName, age) {
  return {
    firstName,
    lastName,
    age,
    greet() {
      return `Hello, I'm ${this.firstName} ${this.lastName}`;
    }
  };
}

const jane = createPerson('Jane', 'Smith', 25);
```

**장점:**
- `new` 키워드 불필요
- 더 유연함 (조건부 로직 가능)
- 프라이빗 변수 생성 가능

#### 4. Object.create()
```javascript
const personProto = {
  greet() {
    return `Hello, I'm ${this.firstName} ${this.lastName}`;
  }
};

const john = Object.create(personProto);
john.firstName = 'John';
john.lastName = 'Doe';
john.age = 30;
```

**장점:**
- 프로토타입을 명시적으로 설정
- 상속 체인을 정확히 제어
- `null` 프로토타입 객체 생성 가능

#### 5. ES6 클래스
```javascript
class Person {
  constructor(firstName, lastName, age) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
  }
  
  greet() {
    return `Hello, I'm ${this.firstName} ${this.lastName}`;
  }
}

const john = new Person('John', 'Doe', 30);
```

**장점:**
- 깔끔하고 읽기 쉬운 문법
- 다른 OOP 언어와 유사
- 내장 상속 지원
- 메서드가 프로토타입에 자동으로 추가됨

**인터뷰 팁:**
- ES6 클래스는 프로토타입 상속의 문법적 설탕입니다
- 클래스 선언은 호이스팅되지 않습니다
- 클래스 본문은 strict mode에서 실행됩니다
- 메서드는 열거 불가능합니다

### 프로토타입 체인

모든 JavaScript 객체는 다른 객체에 대한 참조인 프로토타입을 가집니다.

```javascript
function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function() {
  console.log(`${this.name} makes a sound`);
};

const dog = new Animal('Dog');
dog.speak(); // "Dog makes a sound"

// 프로토타입 체인
console.log(dog.__proto__ === Animal.prototype); // true
console.log(Animal.prototype.__proto__ === Object.prototype); // true
console.log(Object.prototype.__proto__); // null
```

**인터뷰 팁:**
- 프로토타입 체인은 속성/메서드 조회에 사용됩니다
- 체인은 `null`에 도달할 때까지 계속됩니다
- 프로토타입의 속성은 모든 인스턴스에서 공유됩니다
- `__proto__`는 비표준이며 `Object.getPrototypeOf()`를 사용하세요

### 상속 패턴

#### 프로토타입 상속
```javascript
function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function() {
  console.log(`${this.name} makes a sound`);
};

function Dog(name, breed) {
  Animal.call(this, name); // 부모 생성자 호출
  this.breed = breed;
}

// 프로토타입 체인 설정
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.bark = function() {
  console.log(`${this.name} barks`);
};

const myDog = new Dog('Buddy', 'Golden Retriever');
myDog.speak(); // "Buddy makes a sound"
myDog.bark();  // "Buddy barks"
```

#### ES6 클래스 상속
```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    console.log(`${this.name} makes a sound`);
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name); // 부모 생성자 호출 필수
    this.breed = breed;
  }
  
  bark() {
    console.log(`${this.name} barks`);
  }
  
  speak() {
    super.speak(); // 부모 메서드 호출
    this.bark();
  }
}

const myDog = new Dog('Buddy', 'Golden Retriever');
myDog.speak();
// "Buddy makes a sound"
// "Buddy barks"
```

**인터뷰 팁:**
- `super()`는 자식 클래스 생성자에서 `this`를 사용하기 전에 호출해야 합니다
- `extends`는 프로토타입 체인을 자동으로 설정합니다
- 정적 메서드도 상속됩니다
- `super`를 사용하여 부모 메서드를 호출할 수 있습니다

### 객체 속성

#### 속성 설명자
```javascript
const obj = {};

Object.defineProperty(obj, 'name', {
  value: 'John',
  writable: false,      // 수정 불가
  enumerable: true,     // for...in에 나타남
  configurable: false   // 삭제 불가
});

obj.name = 'Jane'; // strict mode에서 에러
console.log(obj.name); // 'John'

// 속성 설명자 가져오기
const descriptor = Object.getOwnPropertyDescriptor(obj, 'name');
console.log(descriptor);
```

#### Getter와 Setter
```javascript
const person = {
  firstName: 'John',
  lastName: 'Doe',
  
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  },
  
  set fullName(name) {
    const parts = name.split(' ');
    this.firstName = parts[0];
    this.lastName = parts[1];
  }
};

console.log(person.fullName); // "John Doe"
person.fullName = 'Jane Smith';
console.log(person.firstName); // "Jane"
```

**인터뷰 팁:**
- Getter/Setter는 계산된 속성에 유용합니다
- 속성 접근을 제어하고 유효성 검사를 추가할 수 있습니다
- `Object.defineProperty()`는 세밀한 제어를 제공합니다
- `Object.freeze()`와 `Object.seal()`은 객체 수정을 방지합니다

### 객체 메서드

#### Object.keys(), values(), entries()
```javascript
const person = {
  name: 'John',
  age: 30,
  city: 'Seoul'
};

console.log(Object.keys(person));    // ['name', 'age', 'city']
console.log(Object.values(person));  // ['John', 30, 'Seoul']
console.log(Object.entries(person)); // [['name', 'John'], ['age', 30], ['city', 'Seoul']]
```

#### Object.assign()
```javascript
const target = { a: 1, b: 2 };
const source = { b: 3, c: 4 };

const result = Object.assign(target, source);
console.log(result); // { a: 1, b: 3, c: 4 }
console.log(target); // { a: 1, b: 3, c: 4 } - 변경됨!

// 얕은 복사
const copy = Object.assign({}, target);
```

#### Object.freeze() vs Object.seal()
```javascript
// freeze: 추가, 삭제, 수정 불가
const frozen = Object.freeze({ name: 'John' });
frozen.name = 'Jane'; // 무시됨
frozen.age = 30;      // 무시됨
delete frozen.name;   // 무시됨

// seal: 추가, 삭제 불가, 수정 가능
const sealed = Object.seal({ name: 'John' });
sealed.name = 'Jane'; // 작동함
sealed.age = 30;      // 무시됨
delete sealed.name;   // 무시됨
```

**인터뷰 팁:**
- `Object.assign()`은 얕은 복사를 수행합니다
- `Object.freeze()`는 얕은 동결입니다 (중첩 객체는 동결되지 않음)
- `Object.seal()`은 속성 추가/삭제를 방지하지만 수정은 허용합니다
- 스프레드 연산자(`...`)는 `Object.assign()`의 더 깔끔한 대안입니다
