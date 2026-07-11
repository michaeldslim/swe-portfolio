# this 키워드

## this란 무엇인가?
`this`는 함수가 호출되는 방식에 따라 다른 값을 참조하는 특수 키워드입니다.

### this의 바인딩 규칙:

#### 1. 전역 컨텍스트
```javascript
console.log(this); // Window (브라우저) 또는 global (Node.js)

function globalFunction() {
  console.log(this); // Window (non-strict) 또는 undefined (strict)
}
```

#### 2. 객체 메서드
```javascript
const person = {
  name: 'John',
  greet() {
    console.log(`Hello, I'm ${this.name}`);
  }
};

person.greet(); // "Hello, I'm John"

// 메서드를 변수에 할당하면 this가 손실됨
const greetFunc = person.greet;
greetFunc(); // "Hello, I'm undefined" (this는 window/undefined)
```

#### 3. 생성자 함수
```javascript
function Person(name, age) {
  this.name = name;
  this.age = age;
}

const john = new Person('John', 30);
console.log(john.name); // 'John'
console.log(john.age);  // 30
```

#### 4. 명시적 바인딩 (call, apply, bind)
```javascript
function greet(greeting, punctuation) {
  console.log(`${greeting}, I'm ${this.name}${punctuation}`);
}

const person = { name: 'John' };

// call: 인수를 개별적으로 전달
greet.call(person, 'Hello', '!');     // "Hello, I'm John!"

// apply: 인수를 배열로 전달
greet.apply(person, ['Hi', '.']);     // "Hi, I'm John."

// bind: 새 함수를 생성하고 this를 영구적으로 바인딩
const boundGreet = greet.bind(person);
boundGreet('Hey', '!!!');             // "Hey, I'm John!!!"
```

#### 5. 화살표 함수
화살표 함수는 자체 `this`를 가지지 않고 렉시컬 `this`를 사용합니다:

```javascript
const person = {
  name: 'John',
  hobbies: ['reading', 'coding'],
  
  // 일반 함수
  printHobbiesRegular: function() {
    this.hobbies.forEach(function(hobby) {
      console.log(`${this.name} likes ${hobby}`);
      // this.name은 undefined (this가 window/undefined)
    });
  },
  
  // 화살표 함수
  printHobbiesArrow: function() {
    this.hobbies.forEach(hobby => {
      console.log(`${this.name} likes ${hobby}`);
      // 작동함! 화살표 함수는 외부 this를 사용
    });
  }
};

person.printHobbiesArrow();
// John likes reading
// John likes coding
```

### this 바인딩 우선순위:
1. **new 바인딩**: `new` 키워드로 호출
2. **명시적 바인딩**: `call`, `apply`, `bind`
3. **암시적 바인딩**: 객체 메서드로 호출
4. **기본 바인딩**: 전역 객체 또는 undefined

```javascript
function test() {
  console.log(this.name);
}

const obj1 = { name: 'obj1', test };
const obj2 = { name: 'obj2' };

// 암시적 바인딩
obj1.test(); // 'obj1'

// 명시적 바인딩이 암시적 바인딩을 재정의
obj1.test.call(obj2); // 'obj2'

// new 바인딩이 명시적 바인딩을 재정의
const boundTest = test.bind(obj1);
const instance = new boundTest(); // this는 새 객체
```

### 일반적인 this 함정:

#### 1. 메서드 추출
```javascript
const person = {
  name: 'John',
  greet() {
    console.log(`Hello, ${this.name}`);
  }
};

const greet = person.greet;
greet(); // "Hello, undefined"

// 해결책 1: bind 사용
const boundGreet = person.greet.bind(person);
boundGreet(); // "Hello, John"

// 해결책 2: 화살표 함수
const person2 = {
  name: 'Jane',
  greet: () => {
    console.log(`Hello, ${this.name}`);
  }
};
// 주의: 이것도 작동하지 않음! 화살표 함수는 외부 this를 사용
```

#### 2. 콜백에서의 this
```javascript
const person = {
  name: 'John',
  hobbies: ['reading', 'coding'],
  
  printHobbies() {
    this.hobbies.forEach(function(hobby) {
      console.log(`${this.name} likes ${hobby}`);
      // this.name은 undefined
    });
  }
};

// 해결책 1: 화살표 함수
printHobbies() {
  this.hobbies.forEach(hobby => {
    console.log(`${this.name} likes ${hobby}`);
  });
}

// 해결책 2: bind
printHobbies() {
  this.hobbies.forEach(function(hobby) {
    console.log(`${this.name} likes ${hobby}`);
  }.bind(this));
}

// 해결책 3: that/self 패턴
printHobbies() {
  const self = this;
  this.hobbies.forEach(function(hobby) {
    console.log(`${self.name} likes ${hobby}`);
  });
}
```

#### 3. 이벤트 핸들러
```javascript
class Button {
  constructor(label) {
    this.label = label;
  }
  
  // 문제: this가 손실됨
  handleClick() {
    console.log(`Button ${this.label} clicked`);
  }
  
  // 해결책 1: 화살표 함수
  handleClickArrow = () => {
    console.log(`Button ${this.label} clicked`);
  }
  
  // 해결책 2: 생성자에서 bind
  constructor(label) {
    this.label = label;
    this.handleClick = this.handleClick.bind(this);
  }
}

const button = new Button('Submit');
document.querySelector('button').addEventListener('click', button.handleClick);
```

### 클래스에서의 this:
```javascript
class Person {
  constructor(name) {
    this.name = name;
  }
  
  // 일반 메서드
  greet() {
    console.log(`Hello, I'm ${this.name}`);
  }
  
  // 화살표 함수 (클래스 필드)
  greetArrow = () => {
    console.log(`Hello, I'm ${this.name}`);
  }
  
  // 정적 메서드
  static staticMethod() {
    console.log(this); // Person 클래스 자체
  }
}

const john = new Person('John');
john.greet(); // "Hello, I'm John"

const greet = john.greet;
greet(); // "Hello, I'm undefined"

const greetArrow = john.greetArrow;
greetArrow(); // "Hello, I'm John" - 화살표 함수는 this를 유지
```

### 인터뷰 질문:
1. **this는 어떻게 결정되나요?**
   - 함수가 호출되는 방식에 따라 결정됨
   - 정의된 위치가 아닌 호출 위치에 따름
   - 4가지 바인딩 규칙이 있음

2. **화살표 함수의 this는 어떻게 다른가요?**
   - 자체 this를 바인딩하지 않음
   - 렉시컬 this를 사용 (외부 스코프의 this)
   - call/apply/bind로 변경할 수 없음

3. **this를 영구적으로 바인딩하는 방법은?**
   - bind() 메서드 사용
   - 화살표 함수 사용
   - 생성자에서 바인딩
