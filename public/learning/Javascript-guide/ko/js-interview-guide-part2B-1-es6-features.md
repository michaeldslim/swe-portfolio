# JavaScript 인터뷰 가이드: Part 2B-1 - ES6+ 기능

## ES6+ 기능

ES6 (ECMAScript 2015) 및 이후 버전은 JavaScript를 현대화한 많은 강력한 기능을 도입했습니다. 이러한 기능을 이해하는 것은 JavaScript 인터뷰에 필수적입니다.

### 구조 분해 할당(Destructuring)

구조 분해 할당을 사용하면 배열의 값이나 객체의 속성을 별개의 변수로 추출할 수 있습니다.

#### 배열 구조 분해
```javascript
// 기본 배열 구조 분해
const numbers = [1, 2, 3, 4, 5];
const [first, second, ...rest] = numbers;

console.log(first);  // 1
console.log(second); // 2
console.log(rest);   // [3, 4, 5]

// 요소 건너뛰기
const colors = ['red', 'green', 'blue'];
const [, , tertiary] = colors;
console.log(tertiary);  // 'blue'

// 기본값
const incomplete = [1];
const [a = 0, b = 0] = incomplete;
console.log(a, b);  // 1, 0

// 변수 교환
let x = 5, y = 10;
[x, y] = [y, x];
console.log(x, y);  // 10, 5
```

#### 객체 구조 분해
```javascript
// 기본 객체 구조 분해
const person = {
  name: 'John',
  age: 30,
  city: 'New York',
  country: 'USA'
};

const { name, age } = person;
console.log(name, age);  // 'John', 30

// 새 변수 이름으로 할당
const { name: fullName, age: years } = person;
console.log(fullName, years);  // 'John', 30

// 기본값
const { name, job = 'Developer' } = person;
console.log(job);  // 'Developer'

// 중첩 구조 분해
const user = {
  id: 1,
  profile: {
    name: 'John',
    address: {
      city: 'Seoul'
    }
  }
};

const { profile: { address: { city } } } = user;
console.log(city);  // 'Seoul'
```

**인터뷰 팁:**
- 구조 분해는 함수 매개변수에서 자주 사용됩니다
- 기본값은 `undefined`에만 적용됩니다 (`null`은 아님)
- Rest 연산자(`...`)는 마지막에만 사용할 수 있습니다

### 스프레드 연산자(Spread Operator)

스프레드 연산자(`...`)는 배열이나 객체를 개별 요소로 확장합니다.

#### 배열 스프레드
```javascript
// 배열 결합
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2];
console.log(combined);  // [1, 2, 3, 4, 5, 6]

// 배열 복사
const original = [1, 2, 3];
const copy = [...original];

// 함수 인수
const numbers = [1, 2, 3];
console.log(Math.max(...numbers));  // 3

// 배열에 요소 추가
const fruits = ['apple', 'banana'];
const moreFruits = [...fruits, 'orange', 'grape'];
```

#### 객체 스프레드
```javascript
// 객체 병합
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };
const merged = { ...obj1, ...obj2 };
console.log(merged);  // { a: 1, b: 2, c: 3, d: 4 }

// 객체 복사
const original = { name: 'John', age: 30 };
const copy = { ...original };

// 속성 재정의
const updated = { ...original, age: 31 };
console.log(updated);  // { name: 'John', age: 31 }
```

**인터뷰 팁:**
- 스프레드는 얕은 복사를 수행합니다
- 객체 스프레드에서 나중 속성이 이전 속성을 재정의합니다
- 배열과 객체 모두에 사용할 수 있습니다

### Rest 매개변수

Rest 매개변수는 가변 개수의 인수를 배열로 수집합니다.

```javascript
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3));        // 6
console.log(sum(1, 2, 3, 4, 5));  // 15

// 다른 매개변수와 결합
function greet(greeting, ...names) {
  return `${greeting}, ${names.join(' and ')}!`;
}

console.log(greet('Hello', 'John', 'Jane', 'Bob'));
// "Hello, John and Jane and Bob!"
```

**인터뷰 팁:**
- Rest 매개변수는 마지막 매개변수여야 합니다
- `arguments` 객체와 달리 실제 배열입니다
- 화살표 함수에서도 작동합니다

### 템플릿 리터럴(Template Literals)

템플릿 리터럴은 문자열 보간과 여러 줄 문자열을 허용합니다.

```javascript
// 기본 보간
const name = 'John';
const age = 30;
const message = `My name is ${name} and I am ${age} years old.`;

// 표현식
const price = 10;
const quantity = 3;
console.log(`Total: $${price * quantity}`);  // "Total: $30"

// 여러 줄 문자열
const multiline = `
  This is a
  multi-line
  string
`;

// 태그 템플릿
function highlight(strings, ...values) {
  return strings.reduce((result, str, i) => {
    return `${result}${str}<strong>${values[i] || ''}</strong>`;
  }, '');
}

const name = 'John';
const age = 30;
const html = highlight`Name: ${name}, Age: ${age}`;
```

**인터뷰 팁:**
- 백틱(`)을 사용합니다
- 표현식은 `${}`로 감쌉니다
- 태그 템플릿은 고급 문자열 처리에 유용합니다

### 화살표 함수(Arrow Functions)

화살표 함수는 함수 표현식을 작성하는 더 간결한 방법을 제공합니다.

```javascript
// 기본 문법
const add = (a, b) => a + b;

// 단일 매개변수 (괄호 선택사항)
const square = x => x * x;

// 매개변수 없음
const greet = () => console.log('Hello!');

// 여러 줄 본문
const multiply = (a, b) => {
  const result = a * b;
  return result;
};

// 객체 리터럴 반환 (괄호 필요)
const createPerson = (name, age) => ({ name, age });
```

#### 화살표 함수 vs 일반 함수

```javascript
// 1. this 바인딩
const obj = {
  name: 'Object',
  regularFunc: function() {
    console.log(this.name);  // 'Object'
  },
  arrowFunc: () => {
    console.log(this.name);  // undefined (렉시컬 this)
  }
};

// 2. arguments 객체
function regular() {
  console.log(arguments);  // 작동함
}

const arrow = () => {
  console.log(arguments);  // ReferenceError
};

// 3. 생성자로 사용 불가
const Person = (name) => {
  this.name = name;
};
// const john = new Person('John');  // TypeError
```

**인터뷰 팁:**
- 화살표 함수는 자체 `this`를 바인딩하지 않습니다
- 메서드나 생성자로 사용할 수 없습니다
- `arguments` 객체가 없습니다 (rest 매개변수 사용)
- 암시적 반환은 단일 표현식에만 작동합니다

### 기본 매개변수(Default Parameters)

```javascript
function greet(name = 'Guest', greeting = 'Hello') {
  return `${greeting}, ${name}!`;
}

console.log(greet());                    // "Hello, Guest!"
console.log(greet('John'));              // "Hello, John!"
console.log(greet('John', 'Hi'));        // "Hi, John!"

// 표현식을 기본값으로
function createId(prefix = 'ID', suffix = Date.now()) {
  return `${prefix}-${suffix}`;
}

// 이전 매개변수 참조
function calculatePrice(price, tax = price * 0.1) {
  return price + tax;
}
```

**인터뷰 팁:**
- 기본값은 `undefined`에만 적용됩니다
- 기본값은 표현식이 될 수 있습니다
- 이전 매개변수를 참조할 수 있습니다

### 향상된 객체 리터럴

```javascript
const name = 'John';
const age = 30;

// 속성 단축 구문
const person = {
  name,    // name: name과 동일
  age      // age: age와 동일
};

// 메서드 단축 구문
const calculator = {
  add(a, b) {
    return a + b;
  },
  subtract(a, b) {
    return a - b;
  }
};

// 계산된 속성 이름
const propName = 'score';
const game = {
  [propName]: 100,
  [`${propName}Multiplier`]: 2
};
console.log(game);  // { score: 100, scoreMultiplier: 2 }
```

**인터뷰 팁:**
- 속성 단축은 변수 이름과 속성 이름이 같을 때 사용합니다
- 계산된 속성 이름은 동적 키에 유용합니다
- 메서드 단축은 더 깔끔한 문법을 제공합니다

### Promise

Promise는 비동기 작업을 처리하는 객체입니다.

```javascript
// Promise 생성
const fetchData = new Promise((resolve, reject) => {
  setTimeout(() => {
    const success = true;
    if (success) {
      resolve({ data: 'Some data' });
    } else {
      reject(new Error('Failed to fetch'));
    }
  }, 1000);
});

// Promise 사용
fetchData
  .then(result => {
    console.log('Success:', result);
    return result.data;
  })
  .then(data => {
    console.log('Data:', data);
  })
  .catch(error => {
    console.error('Error:', error);
  })
  .finally(() => {
    console.log('Cleanup');
  });
```

#### Promise 메서드

```javascript
// Promise.all - 모든 Promise가 완료될 때까지 대기
const promise1 = Promise.resolve(1);
const promise2 = Promise.resolve(2);
const promise3 = Promise.resolve(3);

Promise.all([promise1, promise2, promise3])
  .then(values => console.log(values));  // [1, 2, 3]

// Promise.race - 첫 번째 완료된 Promise
Promise.race([promise1, promise2, promise3])
  .then(value => console.log(value));  // 1

// Promise.allSettled - 모든 Promise의 결과
Promise.allSettled([promise1, promise2, Promise.reject('error')])
  .then(results => console.log(results));

// Promise.any - 첫 번째 성공한 Promise
Promise.any([Promise.reject('error'), promise2, promise3])
  .then(value => console.log(value));  // 2
```

**인터뷰 팁:**
- Promise는 pending, fulfilled, rejected 세 가지 상태를 가집니다
- `.then()`은 새 Promise를 반환합니다 (체이닝 가능)
- `.catch()`는 체인의 모든 에러를 처리합니다
- `async/await`는 Promise의 문법적 설탕입니다

### Async/Await

```javascript
// 기본 async/await
async function fetchUser() {
  try {
    const response = await fetch('https://api.example.com/user');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

// 병렬 실행
async function fetchMultiple() {
  const [users, posts] = await Promise.all([
    fetch('/api/users').then(r => r.json()),
    fetch('/api/posts').then(r => r.json())
  ]);
  return { users, posts };
}

// 순차 실행
async function processSequentially() {
  const user = await fetchUser();
  const posts = await fetchPosts(user.id);
  const comments = await fetchComments(posts[0].id);
  return { user, posts, comments };
}
```

**인터뷰 팁:**
- `async` 함수는 항상 Promise를 반환합니다
- `await`는 `async` 함수 내에서만 사용할 수 있습니다
- 에러 처리에는 try/catch를 사용합니다
- 병렬 실행에는 `Promise.all()`을 사용합니다

### 모듈(Modules)

```javascript
// 내보내기 (export)
// math.js
export const PI = 3.14159;
export function add(a, b) {
  return a + b;
}
export default class Calculator {
  multiply(a, b) {
    return a * b;
  }
}

// 가져오기 (import)
// app.js
import Calculator, { PI, add } from './math.js';
import * as MathUtils from './math.js';

console.log(PI);           // 3.14159
console.log(add(2, 3));    // 5

const calc = new Calculator();
console.log(calc.multiply(2, 3));  // 6

// 동적 import
async function loadModule() {
  const module = await import('./math.js');
  console.log(module.PI);
}
```

**인터뷰 팁:**
- 각 모듈은 하나의 기본 내보내기를 가질 수 있습니다
- 명명된 내보내기는 여러 개 가능합니다
- 동적 import는 코드 분할에 유용합니다
- 모듈은 자동으로 strict mode입니다
