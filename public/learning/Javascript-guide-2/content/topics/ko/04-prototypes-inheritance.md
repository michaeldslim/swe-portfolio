# 프로토타입과 상속

## 프로토타입
JavaScript는 프로토타입 기반 언어입니다. 모든 객체는 다른 객체에 대한 참조인 프로토타입을 가집니다.

### 프로토타입 체인:
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

### 프로토타입 속성과 메서드:
```javascript
function Person(name) {
  this.name = name; // 인스턴스 속성
}

// 프로토타입 메서드 (모든 인스턴스에서 공유)
Person.prototype.greet = function() {
  console.log(`Hello, I'm ${this.name}`);
};

const john = new Person('John');
const jane = new Person('Jane');

john.greet(); // "Hello, I'm John"
jane.greet(); // "Hello, I'm Jane"

// 같은 함수를 공유
console.log(john.greet === jane.greet); // true
```

### Object.create():
```javascript
const personProto = {
  greet() {
    console.log(`Hello, I'm ${this.name}`);
  }
};

const john = Object.create(personProto);
john.name = 'John';
john.greet(); // "Hello, I'm John"

console.log(john.__proto__ === personProto); // true
```

## 상속

### 프로토타입 상속:
```javascript
// 부모 생성자
function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function() {
  console.log(`${this.name} makes a sound`);
};

// 자식 생성자
function Dog(name, breed) {
  Animal.call(this, name); // 부모 생성자 호출
  this.breed = breed;
}

// 프로토타입 체인 설정
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

// 자식 메서드 추가
Dog.prototype.bark = function() {
  console.log(`${this.name} barks`);
};

const myDog = new Dog('Buddy', 'Golden Retriever');
myDog.speak(); // "Buddy makes a sound"
myDog.bark();  // "Buddy barks"
```

### ES6 클래스 상속:
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

### 프로토타입 메서드:

#### hasOwnProperty():
```javascript
const person = {
  name: 'John'
};

Person.prototype.age = 30;

console.log(person.hasOwnProperty('name')); // true
console.log(person.hasOwnProperty('age'));  // false
console.log('age' in person);               // true
```

#### Object.getPrototypeOf():
```javascript
const proto = Object.getPrototypeOf(dog);
console.log(proto === Dog.prototype); // true
```

#### Object.setPrototypeOf():
```javascript
const animal = {
  speak() {
    console.log('Animal sound');
  }
};

const dog = {
  bark() {
    console.log('Woof!');
  }
};

Object.setPrototypeOf(dog, animal);
dog.speak(); // "Animal sound"
dog.bark();  // "Woof!"
```

### 프로토타입 패턴:

#### 1. 생성자 패턴:
```javascript
function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.greet = function() {
  console.log(`Hello, I'm ${this.name}`);
};
```

#### 2. 프로토타입 패턴:
```javascript
function Person() {}

Person.prototype = {
  constructor: Person,
  name: 'John',
  age: 30,
  greet() {
    console.log(`Hello, I'm ${this.name}`);
  }
};
```

#### 3. 조합 패턴:
```javascript
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.friends = [];
}

Person.prototype.greet = function() {
  console.log(`Hello, I'm ${this.name}`);
};
```

### 프로토타입 체인 조회:
```javascript
const obj = {
  a: 1
};

// 속성 조회 순서:
// 1. obj 자체
// 2. obj.__proto__ (Object.prototype)
// 3. Object.prototype.__proto__ (null)

console.log(obj.a);           // 1 (obj에서 찾음)
console.log(obj.toString);    // function (Object.prototype에서 찾음)
console.log(obj.nonExistent); // undefined (어디에도 없음)
```

### 성능 고려사항:
```javascript
// 나쁨: 프로토타입 체인이 깊음
function A() {}
function B() {}
function C() {}
function D() {}

B.prototype = new A();
C.prototype = new B();
D.prototype = new C();

const d = new D();
// d.someMethod() 호출 시 전체 체인을 탐색

// 좋음: 얕은 프로토타입 체인
class Base {
  method() {}
}

class Derived extends Base {
  derivedMethod() {}
}
```

### 일반적인 함정:

#### 1. 프로토타입 재정의:
```javascript
function Person(name) {
  this.name = name;
}

Person.prototype.greet = function() {
  console.log('Hello');
};

const john = new Person('John');

// 프로토타입 재정의
Person.prototype = {
  greet() {
    console.log('Hi');
  }
};

john.greet(); // "Hello" (여전히 이전 프로토타입 사용)

const jane = new Person('Jane');
jane.greet(); // "Hi" (새 프로토타입 사용)
```

#### 2. 참조 타입 속성:
```javascript
function Person() {}

Person.prototype.friends = [];

const john = new Person();
const jane = new Person();

john.friends.push('Mike');
console.log(jane.friends); // ['Mike'] - 공유됨!

// 해결책: 생성자에서 초기화
function Person() {
  this.friends = [];
}
```

### 인터뷰 질문:
1. **프로토타입이란 무엇인가요?**
   - 객체가 다른 객체로부터 속성을 상속받는 메커니즘
   - 모든 객체는 프로토타입을 가짐
   - 프로토타입 체인을 통해 속성 조회

2. **__proto__와 prototype의 차이점은?**
   - __proto__: 객체의 프로토타입을 가리킴
   - prototype: 생성자 함수의 속성
   - 인스턴스.__proto__ === Constructor.prototype

3. **ES6 클래스는 프로토타입을 사용하나요?**
   - 네, 문법적 설탕입니다
   - 내부적으로 프로토타입 사용
   - 더 깔끔한 문법 제공
