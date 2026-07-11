# ES6+ 기능

## 구조 분해 할당

### 배열 구조 분해:
```javascript
const numbers = [1, 2, 3, 4, 5];
const [first, second, ...rest] = numbers;

console.log(first);  // 1
console.log(second); // 2
console.log(rest);   // [3, 4, 5]

// 요소 건너뛰기
const [, , third] = numbers;
console.log(third); // 3

// 기본값
const [a = 0, b = 0] = [1];
console.log(a, b); // 1, 0

// 변수 교환
let x = 5, y = 10;
[x, y] = [y, x];
```

### 객체 구조 분해:
```javascript
const person = {
  name: 'John',
  age: 30,
  city: 'Seoul'
};

const { name, age } = person;
console.log(name, age); // 'John', 30

// 새 변수 이름
const { name: fullName } = person;
console.log(fullName); // 'John'

// 기본값
const { job = 'Developer' } = person;
console.log(job); // 'Developer'

// 중첩 구조 분해
const user = {
  profile: {
    address: { city: 'Seoul' }
  }
};
const { profile: { address: { city } } } = user;
```

## 스프레드와 Rest 연산자

### 스프레드 연산자:
```javascript
// 배열
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2];

// 객체
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };
const merged = { ...obj1, ...obj2 };

// 함수 인수
const numbers = [1, 2, 3];
console.log(Math.max(...numbers));
```

### Rest 매개변수:
```javascript
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3, 4, 5)); // 15
```

## 템플릿 리터럴
```javascript
const name = 'John';
const age = 30;

// 기본 보간
const message = `My name is ${name} and I am ${age} years old.`;

// 표현식
const price = 10;
const quantity = 3;
console.log(`Total: $${price * quantity}`);

// 여러 줄
const multiline = `
  Line 1
  Line 2
  Line 3
`;
```

## 화살표 함수
```javascript
// 기본
const add = (a, b) => a + b;

// 단일 매개변수
const square = x => x * x;

// 여러 줄
const multiply = (a, b) => {
  const result = a * b;
  return result;
};

// 객체 반환
const createPerson = (name, age) => ({ name, age });
```

## 기본 매개변수
```javascript
function greet(name = 'Guest', greeting = 'Hello') {
  return `${greeting}, ${name}!`;
}

console.log(greet()); // "Hello, Guest!"
console.log(greet('John')); // "Hello, John!"
```

## 향상된 객체 리터럴
```javascript
const name = 'John';
const age = 30;

// 속성 단축
const person = { name, age };

// 메서드 단축
const calculator = {
  add(a, b) {
    return a + b;
  }
};

// 계산된 속성 이름
const propName = 'score';
const game = {
  [propName]: 100,
  [`${propName}Multiplier`]: 2
};
```

## 클래스
```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  greet() {
    console.log(`Hello, I'm ${this.name}`);
  }
  
  static staticMethod() {
    console.log('Static method');
  }
}

class Student extends Person {
  constructor(name, age, grade) {
    super(name, age);
    this.grade = grade;
  }
  
  study() {
    console.log(`${this.name} is studying`);
  }
}
```

## 모듈
```javascript
// export
export const PI = 3.14159;
export function add(a, b) {
  return a + b;
}
export default class Calculator {}

// import
import Calculator, { PI, add } from './math.js';
import * as MathUtils from './math.js';
```

## Promise와 Async/Await
```javascript
// Promise
const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve('data'), 1000);
  });
};

// Async/Await
async function getData() {
  try {
    const data = await fetchData();
    return data;
  } catch (error) {
    console.error(error);
  }
}
```

## Map과 Set
```javascript
// Map
const map = new Map();
map.set('key1', 'value1');
map.set('key2', 'value2');
console.log(map.get('key1')); // 'value1'

// Set
const set = new Set([1, 2, 3, 3, 4]);
console.log(set); // Set {1, 2, 3, 4}
set.add(5);
set.delete(1);
```

## Symbol
```javascript
const sym1 = Symbol('description');
const sym2 = Symbol('description');
console.log(sym1 === sym2); // false

// 고유한 속성 키로 사용
const obj = {
  [sym1]: 'value'
};
```

## 인터뷰 질문:
1. **화살표 함수와 일반 함수의 차이점은?**
   - this 바인딩이 다름
   - arguments 객체 없음
   - 생성자로 사용 불가

2. **구조 분해 할당의 장점은?**
   - 코드가 더 간결함
   - 필요한 값만 추출
   - 기본값 설정 가능

3. **Map과 객체의 차이점은?**
   - Map은 모든 타입을 키로 사용 가능
   - Map은 순서 보장
   - Map은 크기를 쉽게 확인 가능
