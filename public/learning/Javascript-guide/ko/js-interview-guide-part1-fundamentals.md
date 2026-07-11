# JavaScript 인터뷰 가이드: Part 1 - 핵심 기초

## JavaScript의 스레딩 모델

### 싱글 스레드 실행

JavaScript는 **싱글 스레드** 프로그래밍 언어로, 다음과 같은 특징이 있습니다:

- 하나의 콜 스택
- 하나의 메모리 힙
- 주어진 시간에 JavaScript 코드를 실행할 수 있는 하나의 실행 스레드

```javascript
function first() {
  console.log('First function');
}

function second() {
  console.log('Second function');
}

first();   // 먼저 실행됨
second();  // first()가 완료된 후에만 실행됨
```

**인터뷰 팁:**
- JavaScript는 "메인 스레드" 또는 "UI 스레드"(브라우저에서)라고 불리는 단일 스레드에서 실행됩니다
- 오래 실행되는 작업은 전체 스레드를 차단하여 UI가 멈출 수 있습니다
- 싱글 스레드 특성 때문에 JavaScript에서 비동기 프로그래밍이 매우 중요합니다
- Web Workers는 백그라운드 스레드에서 스크립트를 실행할 수 있는 방법을 제공하지만 DOM 접근이 제한됩니다

### 이벤트 루프 아키텍처

싱글 스레드임에도 불구하고 JavaScript는 이벤트 루프 아키텍처를 통해 동시 작업을 처리할 수 있습니다:

1. **콜 스택(Call Stack)**: 함수 호출이 추적되는 곳
2. **Web APIs**: setTimeout, fetch, DOM 이벤트와 같은 브라우저 기능 (JS 엔진의 일부가 아님)
3. **콜백 큐(Callback Queue)**: 콜백이 처리되기를 기다리는 곳
4. **이벤트 루프(Event Loop)**: 콜 스택과 콜백 큐를 모니터링하고, 스택이 비어있을 때 콜백을 스택으로 푸시

```javascript
console.log('Start');

setTimeout(() => {
  console.log('Timeout callback');
}, 0);

console.log('End');

// 출력:
// Start
// End
// Timeout callback
```

**인터뷰 팁:**
- 이벤트 루프는 JavaScript의 논블로킹 동작을 가능하게 합니다
- 0ms 타임아웃이어도 콜백은 동기 코드가 완료된 후에 실행됩니다
- 마이크로태스크(Promises)는 매크로태스크(setTimeout, setInterval)보다 우선순위가 높습니다
- 이벤트 루프를 이해하는 것은 비동기 코드 문제를 디버깅하는 데 중요합니다

## 비동기 vs. 동기

### 동기 실행

동기 프로그래밍에서는 작업이 순차적으로 하나씩 실행됩니다. 각 작업은 다음 작업이 시작되기 전에 완료되어야 합니다.

```javascript
function syncOperation() {
  console.log('Step 1');
  const result = performHeavyCalculation(); // 완료될 때까지 실행을 차단
  console.log('Step 2 with result:', result);
  console.log('Step 3');
}

// 실행 순서: Step 1 → Heavy Calculation → Step 2 → Step 3
```

**특징:**
- 블로킹: 각 작업이 완료될 때까지 실행을 차단합니다
- 예측 가능: 코드가 작성된 순서대로 정확히 실행됩니다
- 문제점: 긴 작업이 전체 애플리케이션을 멈추게 합니다

### 비동기 실행

비동기 프로그래밍에서는 작업을 지금 시작하지만 나중에 완료할 수 있어, 프로그램이 그 사이에 다른 코드를 계속 실행할 수 있습니다.

```javascript
function asyncOperation() {
  console.log('Step 1');
  
  fetch('https://api.example.com/data')
    .then(response => response.json())
    .then(data => {
      console.log('Step 2 with data:', data);
    });
  
  console.log('Step 3'); // API 응답을 받기 전에 실행됨
}

// 실행 순서: Step 1 → Step 3 → Step 2 (API 응답 후)
```

**특징:**
- 논블로킹: 작업이 완료되기를 기다리는 동안 다른 코드가 실행될 수 있습니다
- 효율적: 여러 작업을 동시에 처리할 수 있습니다
- 복잡성: 실행 순서가 덜 예측 가능하고 디버깅이 더 어려울 수 있습니다

## 변수 선언: var, let, const

### var

`var`는 ES6 이전의 변수 선언 방식입니다:

```javascript
var name = 'John';
var age = 30;

if (true) {
  var city = 'Seoul'; // 함수 스코프
}

console.log(city); // 'Seoul' - 블록 밖에서 접근 가능
```

**특징:**
- 함수 스코프
- 호이스팅됨 (undefined로 초기화)
- 재선언 가능
- 전역 객체의 속성이 됨 (전역 스코프에서)

### let

`let`은 ES6에서 도입된 블록 스코프 변수 선언입니다:

```javascript
let name = 'John';
let age = 30;

if (true) {
  let city = 'Seoul'; // 블록 스코프
}

// console.log(city); // ReferenceError: city is not defined
```

**특징:**
- 블록 스코프
- 호이스팅되지만 초기화되지 않음 (TDZ)
- 재선언 불가능
- 재할당 가능

### const

`const`는 상수를 선언하는 데 사용됩니다:

```javascript
const PI = 3.14159;
const user = { name: 'John', age: 30 };

// PI = 3.14; // TypeError: Assignment to constant variable

user.age = 31; // 객체의 속성은 변경 가능
// user = {}; // TypeError: Assignment to constant variable
```

**특징:**
- 블록 스코프
- 재할당 불가능
- 선언 시 초기화 필수
- 객체/배열의 내용은 변경 가능

**인터뷰 팁:**
- 기본적으로 `const`를 사용하고, 재할당이 필요한 경우에만 `let`을 사용하세요
- `var`는 레거시 코드에서만 사용되며 새 코드에서는 피해야 합니다
- `const`는 불변성을 보장하지 않고 재할당만 방지합니다

## 호이스팅(Hoisting)

호이스팅은 변수와 함수 선언이 스코프의 최상단으로 "끌어올려지는" JavaScript의 동작입니다.

### 함수 호이스팅

```javascript
// 함수 선언 전에 호출 가능
greet(); // "Hello!"

function greet() {
  console.log('Hello!');
}
```

### 변수 호이스팅

```javascript
console.log(x); // undefined (not ReferenceError)
var x = 5;

// 위 코드는 다음과 같이 해석됩니다:
var x;
console.log(x); // undefined
x = 5;
```

### let과 const의 호이스팅

```javascript
// console.log(y); // ReferenceError: Cannot access 'y' before initialization
let y = 10;

// TDZ (Temporal Dead Zone): 선언 전까지 변수에 접근할 수 없는 구간
```

**인터뷰 팁:**
- 함수 선언은 완전히 호이스팅됩니다
- `var` 변수는 호이스팅되지만 `undefined`로 초기화됩니다
- `let`과 `const`는 호이스팅되지만 TDZ에 있어 접근할 수 없습니다
- 함수 표현식은 변수 호이스팅 규칙을 따릅니다

## 스코프(Scope)

스코프는 변수가 접근 가능한 영역을 정의합니다.

### 전역 스코프

```javascript
const globalVar = 'I am global';

function test() {
  console.log(globalVar); // 접근 가능
}
```

### 함수 스코프

```javascript
function outer() {
  const functionVar = 'I am in function';
  
  function inner() {
    console.log(functionVar); // 접근 가능
  }
  
  inner();
}

// console.log(functionVar); // ReferenceError
```

### 블록 스코프

```javascript
if (true) {
  const blockVar = 'I am in block';
  let anotherBlockVar = 'Me too';
  var functionScopedVar = 'I escape blocks';
}

// console.log(blockVar); // ReferenceError
// console.log(anotherBlockVar); // ReferenceError
console.log(functionScopedVar); // 접근 가능 (var는 블록 스코프가 아님)
```

### 렉시컬 스코프

JavaScript는 렉시컬(정적) 스코프를 사용합니다:

```javascript
const name = 'Global';

function outer() {
  const name = 'Outer';
  
  function inner() {
    console.log(name); // 'Outer' - 정의된 위치의 스코프를 사용
  }
  
  return inner;
}

const innerFunc = outer();
innerFunc(); // 'Outer'
```

**인터뷰 팁:**
- 스코프 체인: 내부 스코프는 외부 스코프에 접근할 수 있지만 그 반대는 불가능합니다
- 렉시컬 스코프: 함수가 호출되는 위치가 아닌 정의된 위치에 따라 스코프가 결정됩니다
- 클로저는 렉시컬 스코프의 결과입니다

## 클로저(Closures)

클로저는 외부 함수의 변수에 접근할 수 있는 내부 함수입니다.

```javascript
function createCounter() {
  let count = 0;
  
  return {
    increment() {
      count++;
      return count;
    },
    decrement() {
      count--;
      return count;
    },
    getCount() {
      return count;
    }
  };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.getCount());  // 2
console.log(counter.decrement()); // 1
```

### 클로저의 실용적 사용

**1. 데이터 프라이버시:**

```javascript
function createBankAccount(initialBalance) {
  let balance = initialBalance; // private 변수
  
  return {
    deposit(amount) {
      balance += amount;
      return balance;
    },
    withdraw(amount) {
      if (amount <= balance) {
        balance -= amount;
        return balance;
      }
      return 'Insufficient funds';
    },
    getBalance() {
      return balance;
    }
  };
}

const account = createBankAccount(1000);
console.log(account.getBalance()); // 1000
console.log(account.deposit(500)); // 1500
// console.log(account.balance); // undefined - private
```

**2. 함수 팩토리:**

```javascript
function createMultiplier(multiplier) {
  return function(number) {
    return number * multiplier;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5));  // 10
console.log(triple(5));  // 15
```

**인터뷰 팁:**
- 클로저는 함수가 생성될 때 형성됩니다
- 외부 함수가 반환된 후에도 내부 함수는 외부 변수에 접근할 수 있습니다
- 클로저는 데이터 캡슐화와 프라이버시에 유용합니다
- 메모리 누수를 방지하기 위해 클로저를 적절히 관리해야 합니다

## this 키워드

`this`는 함수가 호출되는 방식에 따라 다른 값을 참조합니다.

### 전역 컨텍스트

```javascript
console.log(this); // Window (브라우저) 또는 global (Node.js)
```

### 객체 메서드

```javascript
const person = {
  name: 'John',
  greet() {
    console.log(`Hello, I'm ${this.name}`);
  }
};

person.greet(); // "Hello, I'm John"
```

### 생성자 함수

```javascript
function Person(name) {
  this.name = name;
}

const john = new Person('John');
console.log(john.name); // 'John'
```

### 화살표 함수

화살표 함수는 자체 `this`를 가지지 않고 렉시컬 `this`를 사용합니다:

```javascript
const person = {
  name: 'John',
  hobbies: ['reading', 'coding'],
  printHobbies() {
    this.hobbies.forEach(hobby => {
      console.log(`${this.name} likes ${hobby}`);
    });
  }
};

person.printHobbies();
// John likes reading
// John likes coding
```

### call, apply, bind

```javascript
function greet(greeting, punctuation) {
  console.log(`${greeting}, I'm ${this.name}${punctuation}`);
}

const person = { name: 'John' };

greet.call(person, 'Hello', '!');     // "Hello, I'm John!"
greet.apply(person, ['Hi', '.']);     // "Hi, I'm John."

const boundGreet = greet.bind(person);
boundGreet('Hey', '!!!');             // "Hey, I'm John!!!"
```

**인터뷰 팁:**
- `this`는 함수가 정의된 위치가 아닌 호출되는 방식에 따라 결정됩니다
- 화살표 함수는 자체 `this`를 바인딩하지 않습니다
- `bind`는 새 함수를 생성하고, `call`과 `apply`는 즉시 함수를 호출합니다
- strict mode에서 전역 컨텍스트의 `this`는 `undefined`입니다

## 프로토타입과 상속

JavaScript는 프로토타입 기반 상속을 사용합니다.

### 프로토타입 체인

```javascript
function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function() {
  console.log(`${this.name} makes a sound`);
};

const dog = new Animal('Dog');
dog.speak(); // "Dog makes a sound"

console.log(dog.__proto__ === Animal.prototype); // true
console.log(Animal.prototype.__proto__ === Object.prototype); // true
```

### ES6 클래스

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
    super(name);
    this.breed = breed;
  }
  
  speak() {
    console.log(`${this.name} barks`);
  }
}

const myDog = new Dog('Buddy', 'Golden Retriever');
myDog.speak(); // "Buddy barks"
```

**인터뷰 팁:**
- 모든 JavaScript 객체는 프로토타입을 가집니다
- 프로토타입 체인은 속성과 메서드 조회에 사용됩니다
- ES6 클래스는 프로토타입 상속의 문법적 설탕입니다
- `Object.create()`를 사용하여 프로토타입을 명시적으로 설정할 수 있습니다
