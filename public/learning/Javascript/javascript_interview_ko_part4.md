# JavaScript 개발자 인터뷰 질문 (ES6+ 기능)

## ES6+ 기능

15. **ES6에서 추가된 주요 기능들에 대해 설명해주세요.**
    - 템플릿 리터럴(Template Literals), 구조 분해 할당(Destructuring), 전개 연산자(Spread Operator), 나머지 매개변수(Rest Parameters) 등
    
    **설명:** ES6(ECMAScript 2015)는 JavaScript에 많은 중요한 기능을 추가했습니다. 템플릿 리터럴은 백틱(`)을 사용하여 문자열 내에 표현식을 삽입하고 다중 행 문자열을 쉽게 만들 수 있게 합니다. 구조 분해 할당은 배열이나 객체에서 값을 추출하여 변수에 할당하는 간결한 방법을 제공합니다. 전개 연산자(...)는 배열이나 객체의 요소를 다른 배열이나 객체로 확장하거나 함수 호출의 인수로 확장합니다. 나머지 매개변수는 함수에 전달된 나머지 인수들을 배열로 수집합니다. 이 외에도 화살표 함수, 클래스, let/const 변수 선언, 기본 매개변수, 모듈 시스템, Promise 등이 ES6에서 추가되었습니다. 이러한 기능들은 코드를 더 간결하고 가독성 있게 만들며, 함수형 프로그래밍 패턴을 쉽게 적용할 수 있게 합니다.

    **Description:** ES6 (ECMAScript 2015) introduced many important features to JavaScript. Template literals use backticks (`) to allow embedding expressions within strings and easily create multi-line strings. Destructuring assignment provides a concise way to extract values from arrays or objects and assign them to variables. The spread operator (...) expands elements of arrays or objects into other arrays/objects or as function arguments. Rest parameters collect the remaining arguments passed to a function into an array. Other ES6 features include arrow functions, classes, let/const variable declarations, default parameters, module system, and Promises. These features make code more concise and readable, and facilitate functional programming patterns.
    
    **예시:**
    ```javascript
    // 1. 템플릿 리터럴 (Template Literals)
    const name = 'John';
    const age = 30;
    
    // ES5
    const messageES5 = 'My name is ' + name + ' and I am ' + age + ' years old.';
    
    // ES6 템플릿 리터럴
    const messageES6 = `My name is ${name} and I am ${age} years old.`;
    console.log(messageES6); // "My name is John and I am 30 years old."
    
    // 멀티라인 문자열
    const multiline = `This is line 1.
    This is line 2.
    This is line 3.`;
    console.log(multiline);
    // "This is line 1.
    //  This is line 2.
    //  This is line 3."
    
    // 2. 구조 분해 할당 (Destructuring)
    // 객체 구조 분해
    const person = {
      firstName: 'John',
      lastName: 'Doe',
      country: 'USA',
      job: 'Developer'
    };
    
    // ES5
    const firstNameES5 = person.firstName;
    const lastNameES5 = person.lastName;
    
    // ES6 객체 구조 분해
    const { firstName, lastName, country: nation, job: profession } = person;
    console.log(firstName); // "John"
    console.log(lastName); // "Doe"
    console.log(nation); // "USA" (변수명 변경)
    console.log(profession); // "Developer" (변수명 변경)
    
    // 배열 구조 분해
    const colors = ['red', 'green', 'blue', 'yellow'];
    
    // ES5
    const firstColorES5 = colors[0];
    const secondColorES5 = colors[1];
    
    // ES6 배열 구조 분해
    const [firstColor, secondColor, , fourthColor] = colors;
    console.log(firstColor); // "red"
    console.log(secondColor); // "green"
    console.log(fourthColor); // "yellow" (3번째 요소 건너뜀)
    
    // 함수 매개변수 구조 분해
    function displayPerson({ firstName, lastName, age = 25 }) {
      console.log(`${firstName} ${lastName} is ${age} years old.`);
    }
    
    displayPerson({ firstName: 'Jane', lastName: 'Smith' }); // "Jane Smith is 25 years old."
    
    // 3. 전개 연산자 (Spread Operator)
    // 배열 복사
    const arr1 = [1, 2, 3];
    const arr2 = [...arr1, 4, 5]; // [1, 2, 3, 4, 5]
    
    // 배열 합치기
    const arr3 = [6, 7];
    const combinedArray = [...arr1, ...arr3]; // [1, 2, 3, 6, 7]
    
    // 객체 전개
    const obj1 = { a: 1, b: 2 };
    const obj2 = { ...obj1, c: 3, b: 3 }; // { a: 1, b: 3, c: 3 } (b가 덮어씀)
    
    // 함수 호출에서 사용
    function sum(a, b, c) {
      return a + b + c;
    }
    
    const numbers = [1, 2, 3];
    console.log(sum(...numbers)); // 6
    
    // 4. 나머지 매개변수 (Rest Parameters)
    function collectItems(first, second, ...rest) {
      console.log(first); // 1
      console.log(second); // 2
      console.log(rest); // [3, 4, 5]
    }
    
    collectItems(1, 2, 3, 4, 5);
    
    // 구조 분해와 함께 사용
    const [first, ...others] = [1, 2, 3, 4, 5];
    console.log(first); // 1
    console.log(others); // [2, 3, 4, 5]
    
    // 5. 화살표 함수 (Arrow Functions)
    // ES5
    const addES5 = function(a, b) {
      return a + b;
    };
    
    // ES6 화살표 함수
    const addES6 = (a, b) => a + b;
    console.log(addES6(2, 3)); // 5
    
    // 단일 매개변수
    const square = x => x * x;
    console.log(square(4)); // 16
    
    // 6. 기본 매개변수 (Default Parameters)
    function greet(name = 'Guest', greeting = 'Hello') {
      return `${greeting}, ${name}!`;
    }
    
    console.log(greet()); // "Hello, Guest!"
    console.log(greet('John')); // "Hello, John!"
    console.log(greet('Jane', 'Hi')); // "Hi, Jane!"
    ```

16. **모듈 시스템(Module System)에 대해 설명해주세요.**
    - CommonJS와 ES 모듈의 차이점은 무엇인가요?
    - 동적 임포트(Dynamic Import)는 어떻게 사용하나요?
    
    **설명:** JavaScript 모듈 시스템은 코드를 독립적인 파일로 분리하여 재사용성, 유지보수성, 네임스페이스 관리를 향상시키는 메커니즘입니다. CommonJS는 Node.js에서 주로 사용되며, `require()`와 `module.exports`를 사용하여 동기적으로 모듈을 로드합니다. ES 모듈은 ES6에서 도입된 표준 모듈 시스템으로, `import`와 `export` 구문을 사용하며 정적 분석이 가능하고 비동기적으로 로드됩니다. ES 모듈은 트리 쉐이킹(사용하지 않는 코드 제거)을 지원하고, 순환 참조를 더 잘 처리합니다. 동적 임포트는 `import()` 함수를 사용하여 런타임에 필요한 모듈을 비동기적으로 로드하는 방법으로, 코드 스플리팅과 지연 로딩에 유용합니다. 이를 통해 초기 로드 시간을 줄이고 필요할 때만 모듈을 로드할 수 있습니다.

    **Description:** JavaScript module systems are mechanisms for separating code into independent files, improving reusability, maintainability, and namespace management. CommonJS is primarily used in Node.js and uses `require()` and `module.exports` to load modules synchronously. ES modules, introduced in ES6, are the standard module system using `import` and `export` statements, allowing static analysis and asynchronous loading. ES modules support tree shaking (removing unused code) and handle circular dependencies better. Dynamic imports use the `import()` function to asynchronously load modules at runtime, useful for code splitting and lazy loading. This reduces initial load time and allows loading modules only when needed.
    
    **예시:**
    ```javascript
    // 1. CommonJS 모듈 시스템 (Node.js에서 주로 사용)
    
    // math.js (CommonJS 모듈)
    function add(a, b) {
      return a + b;
    }
    
    function subtract(a, b) {
      return a - b;
    }
    
    module.exports = {
      add,
      subtract
    };
    
    // app.js (CommonJS 모듈 사용)
    const math = require('./math');
    console.log(math.add(5, 3)); // 8
    
    // 구조 분해 할당으로 특정 함수만 가져오기
    const { subtract } = require('./math');
    console.log(subtract(10, 4)); // 6
    
    // 2. ES 모듈 시스템 (브라우저와 최신 Node.js에서 지원)
    
    // math.js (ES 모듈)
    export function add(a, b) {
      return a + b;
    }
    
    export function subtract(a, b) {
      return a - b;
    }
    
    // 기본 내보내기
    export default function multiply(a, b) {
      return a * b;
    }
    
    // app.js (ES 모듈 사용)
    import { add, subtract } from './math.js';
    import multiply from './math.js'; // 기본 내보내기 가져오기
    
    console.log(add(5, 3)); // 8
    console.log(subtract(10, 4)); // 6
    console.log(multiply(2, 3)); // 6
    
    // 모든 내보내기를 객체로 가져오기
    import * as math from './math.js';
    console.log(math.add(5, 3)); // 8
    
    // 3. 동적 임포트 (Dynamic Import)
    
    // 버튼 클릭 시 모듈 동적 로드
    document.getElementById('loadButton').addEventListener('click', async () => {
      try {
        // 동적으로 모듈 로드
        const mathModule = await import('./math.js');
        
        // 로드된 모듈 사용
        console.log(mathModule.add(5, 3)); // 8
        console.log(mathModule.default(2, 3)); // 6 (기본 내보내기)
        
        // UI 업데이트
        document.getElementById('result').textContent = 'Module loaded successfully!';
      } catch (error) {
        console.error('Failed to load module:', error);
      }
    });
    
    // 조건부 모듈 로딩
    async function loadFeature(featureName) {
      let module;
      
      if (featureName === 'calculator') {
        module = await import('./calculator.js');
      } else if (featureName === 'formatter') {
        module = await import('./formatter.js');
      } else {
        throw new Error('Unknown feature');
      }
      
      return module;
    }
    
    // 사용 예시
    loadFeature('calculator')
      .then(module => {
        module.init();
      })
      .catch(error => {
        console.error('Error loading feature:', error);
      });
    ```

17. **ES6+ 이후의 중요한 JavaScript 기능들에 대해 설명해주세요.**
    - ES2016부터 ES2022까지의 주요 기능들
    
    **설명:** ES6 이후에도 JavaScript는 매년 새로운 기능을 추가해왔습니다. ES2016에서는 배열 `includes()` 메서드와 지수 연산자(`**`)가 추가되었습니다. ES2017에서는 async/await, Object.entries/values, 문자열 패딩 메서드가 도입되었습니다. ES2018에서는 객체 전개 연산자, Promise.finally(), 비동기 반복자가 추가되었습니다. ES2019에서는 Array.flat/flatMap, Object.fromEntries, 문자열 trimStart/trimEnd가 도입되었습니다. ES2020에서는 옵셔널 체이닝(`?.`), null 병합 연산자(`??`), BigInt, Promise.allSettled가 추가되었습니다. ES2021에서는 논리 할당 연산자, String.replaceAll, Promise.any가 도입되었습니다. ES2022에서는 클래스 필드, 최상위 await, Object.hasOwn, Error cause 등이 추가되었습니다. 이러한 기능들은 코드를 더 간결하고 안전하게 만들며, 비동기 프로그래밍과 데이터 처리를 더 쉽게 합니다.

    **Description:** JavaScript has continued to add new features annually after ES6. ES2016 added the array `includes()` method and the exponentiation operator (`**`). ES2017 introduced async/await, Object.entries/values, and string padding methods. ES2018 added object spread operator, Promise.finally(), and asynchronous iterators. ES2019 introduced Array.flat/flatMap, Object.fromEntries, and string trimStart/trimEnd. ES2020 added optional chaining (`?.`), nullish coalescing operator (`??`), BigInt, and Promise.allSettled. ES2021 introduced logical assignment operators, String.replaceAll, and Promise.any. ES2022 added class fields, top-level await, Object.hasOwn, and Error cause. These features make code more concise and safer, and simplify asynchronous programming and data manipulation.
    
    **예시:**
    ```javascript
    // ES2016 (ES7)
    
    // 1. Array.prototype.includes()
    const fruits = ['apple', 'banana', 'orange'];
    console.log(fruits.includes('banana')); // true
    console.log(fruits.includes('grape')); // false
    
    // 2. 지수 연산자 (**)
    console.log(2 ** 3); // 8 (2의 3승)
    console.log(Math.pow(2, 3)); // 8 (동일한 결과)
    
    // ES2017 (ES8)
    
    // 1. async/await
    async function fetchUserData() {
      try {
        const response = await fetch('https://api.example.com/users/1');
        const user = await response.json();
        return user;
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    }
    
    // 2. Object.entries(), Object.values()
    const person = { name: 'John', age: 30, job: 'developer' };
    
    console.log(Object.values(person)); // ['John', 30, 'developer']
    console.log(Object.entries(person)); // [['name', 'John'], ['age', 30], ['job', 'developer']]
    
    // 3. 문자열 패딩 (String padding)
    console.log('5'.padStart(3, '0')); // '005'
    console.log('Hello'.padEnd(10, '!')); // 'Hello!!!!!'
    
    // ES2018 (ES9)
    
    // 1. 객체 전개 연산자 (Rest/Spread for objects)
    const { name, ...rest } = person;
    console.log(name); // 'John'
    console.log(rest); // { age: 30, job: 'developer' }
    
    const personWithAddress = { ...person, address: 'New York' };
    console.log(personWithAddress); // { name: 'John', age: 30, job: 'developer', address: 'New York' }
    
    // 2. Promise.finally()
    fetch('https://api.example.com/data')
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error))
      .finally(() => console.log('Request completed')); // 성공/실패 상관없이 실행
    
    // ES2019 (ES10)
    
    // 1. Array.flat() and Array.flatMap()
    const nestedArray = [1, 2, [3, 4, [5, 6]]];
    console.log(nestedArray.flat()); // [1, 2, 3, 4, [5, 6]]
    console.log(nestedArray.flat(2)); // [1, 2, 3, 4, 5, 6]
    
    const sentences = ['Hello world', 'How are you?'];
    console.log(sentences.flatMap(s => s.split(' '))); // ['Hello', 'world', 'How', 'are', 'you?']
    
    // 2. Object.fromEntries()
    const entries = [['name', 'John'], ['age', 30]];
    console.log(Object.fromEntries(entries)); // { name: 'John', age: 30 }
    
    // 3. String.prototype.trimStart() and trimEnd()
    const text = '   Hello world   ';
    console.log(text.trimStart()); // 'Hello world   '
    console.log(text.trimEnd()); // '   Hello world'
    
    // ES2020 (ES11)
    
    // 1. 옵셔널 체이닝 (Optional Chaining)
    const user = {
      profile: {
        address: {
          street: 'Main St'
        }
      }
    };
    
    // 이전 방식
    const street1 = user && user.profile && user.profile.address && user.profile.address.street;
    
    // 옵셔널 체이닝 사용
    const street2 = user?.profile?.address?.street;
    console.log(street2); // 'Main St'
    
    // 2. Null 병합 연산자 (Nullish Coalescing)
    const foo = null ?? 'default'; // 'default'
    const bar = 0 ?? 'default'; // 0 (0은 falsy지만 null이나 undefined가 아님)
    const baz = '' ?? 'default'; // '' (빈 문자열도 falsy지만 null이나 undefined가 아님)
    
    // 3. BigInt
    const bigNumber = 9007199254740991n; // BigInt 리터럴
    const anotherBigNumber = BigInt('9007199254740991');
    console.log(bigNumber + 1n); // 9007199254740992n
    
    // ES2021 (ES12)
    
    // 1. 논리 할당 연산자 (Logical Assignment Operators)
    let a = null;
    a ||= 'default'; // a = a || 'default'
    console.log(a); // 'default'
    
    let b = 5;
    b &&= 10; // b = b && 10
    console.log(b); // 10
    
    let c = null;
    c ??= 'default'; // c = c ?? 'default'
    console.log(c); // 'default'
    
    // 2. String.prototype.replaceAll()
    const string = 'apple apple apple';
    console.log(string.replaceAll('apple', 'banana')); // 'banana banana banana'
    
    // ES2022 (ES13)
    
    // 1. 클래스 필드 (Class Fields)
    class Counter {
      // 인스턴스 필드
      count = 0;
      
      // 비공개 필드
      #privateValue = 42;
      
      increment() {
        this.count++;
        return this.count;
      }
      
      getPrivateValue() {
        return this.#privateValue;
      }
      
      // 정적 필드
      static staticField = 'static value';
    }
    
    const counter = new Counter();
    console.log(counter.count); // 0
    console.log(counter.increment()); // 1
    console.log(counter.getPrivateValue()); // 42
    console.log(Counter.staticField); // 'static value'
    
    // 2. 최상위 await (Top-level await)
    // 모듈에서 async 함수 밖에서도 await 사용 가능
    // import { fetchData } from './api.js';
    // const data = await fetchData(); // 모듈 최상위 레벨에서 await 사용
    
    // 3. Object.hasOwn()
    const obj = { prop: 'value' };
    console.log(Object.hasOwn(obj, 'prop')); // true
    console.log(Object.hasOwn(obj, 'toString')); // false (상속된 속성)
    
    // 4. Error Cause
    try {
      throw new Error('Failed to fetch data', { cause: 'Network error' });
    } catch (error) {
      console.error(error.message); // 'Failed to fetch data'
      console.error(error.cause); // 'Network error'
    }
    ```

18. **Symbol 타입은 무엇이며 어떤 용도로 사용되나요?**
    
    **설명:** Symbol은 ES6에서 도입된 새로운 원시 타입으로, 항상 고유한 값을 가집니다. 같은 설명을 가진 Symbol을 생성해도 각각은 서로 다른 고유한 값입니다. Symbol의 주요 용도는 객체의 속성 키로 사용하여 이름 충돌을 방지하고, 비공개(private) 속성을 구현하는 것입니다. Symbol 키는 일반적인 방법(Object.keys(), for...in)으로는 열거되지 않아 속성을 숨기는 데 유용합니다. 또한 내장 Symbol(Symbol.iterator, Symbol.hasInstance 등)을 통해 객체의 기본 동작을 커스터마이징할 수 있습니다. Symbol.for()를 사용하면 전역 Symbol 레지스트리에 등록된 Symbol을 생성하거나 참조할 수 있어, 코드 전체에서 동일한 Symbol을 공유할 수 있습니다. Symbol은 열거형 상수, 메타프로그래밍, 내부 속성 정의 등 다양한 고급 JavaScript 패턴에 활용됩니다.

    **Description:** Symbol is a primitive type introduced in ES6 that always creates a unique value. Even Symbols with the same description are distinct from each other. The primary use of Symbols is as object property keys to prevent name collisions and implement private-like properties. Symbol keys are not enumerated by standard methods (Object.keys(), for...in), making them useful for hiding properties. Built-in Symbols (Symbol.iterator, Symbol.hasInstance, etc.) allow customization of object behaviors. Symbol.for() creates or references Symbols in a global Symbol registry, enabling sharing of the same Symbol across your codebase. Symbols are used in various advanced JavaScript patterns including enumeration constants, metaprogramming, and defining internal properties.
    
    **예시:**
    ```javascript
    // Symbol 기본 사용법
    const mySymbol = Symbol();
    const namedSymbol = Symbol('description');
    
    console.log(typeof mySymbol); // "symbol"
    console.log(mySymbol); // Symbol()
    console.log(namedSymbol); // Symbol(description)
    
    // Symbol은 항상 고유함
    console.log(Symbol('key') === Symbol('key')); // false
    
    // 1. 객체 속성 키로 사용
    const MY_KEY = Symbol('key');
    const ANOTHER_KEY = Symbol('key');
    
    const obj = {
      [MY_KEY]: 'Value 1',
      [ANOTHER_KEY]: 'Value 2',
      regularKey: 'Regular value'
    };
    
    console.log(obj[MY_KEY]); // "Value 1"
    console.log(obj[ANOTHER_KEY]); // "Value 2"
    
    // Symbol 키는 일반 방법으로 순회되지 않음
    console.log(Object.keys(obj)); // ["regularKey"]
    console.log(Object.getOwnPropertyNames(obj)); // ["regularKey"]
    
    // Symbol 키만 가져오기
    console.log(Object.getOwnPropertySymbols(obj)); // [Symbol(key), Symbol(key)]
    
    // 2. 내장 Symbol 사용
    // Symbol.iterator를 사용한 이터러블 객체 구현
    const iterableObj = {
      data: [1, 2, 3, 4, 5],
      [Symbol.iterator]: function* () {
        for (let i = 0; i < this.data.length; i++) {
          yield this.data[i];
        }
      }
    };
    
    for (const item of iterableObj) {
      console.log(item); // 1, 2, 3, 4, 5
    }
    
    // 3. Symbol.for - 글로벌 심볼 레지스트리
    const globalSymbol = Symbol.for('globalKey');
    const sameGlobalSymbol = Symbol.for('globalKey');
    
    console.log(globalSymbol === sameGlobalSymbol); // true
    
    // Symbol.keyFor - 글로벌 심볼의 키 가져오기
    console.log(Symbol.keyFor(globalSymbol)); // "globalKey"
    console.log(Symbol.keyFor(mySymbol)); // undefined (글로벌 심볼이 아님)
    
    // 4. 사용 사례: 상수 정의
    const COLOR = {
      RED: Symbol('red'),
      GREEN: Symbol('green'),
      BLUE: Symbol('blue')
    };
    
    function handleColor(color) {
      switch (color) {
        case COLOR.RED:
          return 'Handling red';
        case COLOR.GREEN:
          return 'Handling green';
        case COLOR.BLUE:
          return 'Handling blue';
        default:
          return 'Unknown color';
      }
    }
    
    console.log(handleColor(COLOR.RED)); // "Handling red"
    ```

19. **이터레이터(Iterator)와 제너레이터(Generator)란 무엇인가요?**
    - 이터러블(Iterable) 객체란 무엇이며 어떻게 만들 수 있나요?
    
    **설명:** 이터레이터는 컬렉션의 요소를 순회하기 위한 인터페이스로, `next()` 메서드를 통해 컬렉션의 다음 요소를 반환합니다. 이터러블은 `Symbol.iterator` 메서드를 구현한 객체로, `for...of` 루프나 전개 연산자 등에서 사용할 수 있습니다. 배열, 문자열, Map, Set 등이 내장 이터러블입니다. 제너레이터는 이터레이터를 생성하는 특별한 함수로, 함수 실행을 일시 중지하고 나중에 재개할 수 있습니다. `function*` 구문으로 정의하고 `yield` 키워드로 값을 생성합니다. 제너레이터는 메모리 효율적인 데이터 처리, 비동기 프로그래밍, 무한 시퀀스 생성 등에 유용합니다. 또한 복잡한 상태 관리 없이도 이터러블 객체를 쉽게 만들 수 있게 해줍니다.

    **Description:** Iterators are interfaces for traversing collections, returning the next element through the `next()` method. Iterables are objects implementing the `Symbol.iterator` method, usable in `for...of` loops and with spread operators. Arrays, strings, Maps, and Sets are built-in iterables. Generators are special functions that create iterators, allowing function execution to be paused and resumed later. They are defined with the `function*` syntax and use the `yield` keyword to produce values. Generators are useful for memory-efficient data processing, asynchronous programming, creating infinite sequences, and easily implementing iterable objects without complex state management.
    
    **예시:**
    ```javascript
    // 1. 이터레이터 (Iterator) 구현
    function createIterator(array) {
      let index = 0;
      
      return {
        next: function() {
          if (index < array.length) {
            return { value: array[index++], done: false };
          } else {
            return { done: true };
          }
        }
      };
    }
    
    const iterator = createIterator([1, 2, 3]);
    
    console.log(iterator.next()); // { value: 1, done: false }
    console.log(iterator.next()); // { value: 2, done: false }
    console.log(iterator.next()); // { value: 3, done: false }
    console.log(iterator.next()); // { done: true }
    
    // 2. 이터러블 (Iterable) 객체 구현
    const customIterable = {
      data: [1, 2, 3],
      
      // Symbol.iterator 메서드 구현
      [Symbol.iterator]: function() {
        let index = 0;
        return {
          next: () => {
            if (index < this.data.length) {
              return { value: this.data[index++], done: false };
            } else {
              return { done: true };
            }
          }
        };
      }
    };
    
    // for...of 루프로 이터러블 객체 순회
    for (const item of customIterable) {
      console.log(item); // 1, 2, 3
    }
    
    // 전개 연산자 사용
    const array = [...customIterable]; // [1, 2, 3]
    
    // 3. 제너레이터 (Generator) 함수
    function* simpleGenerator() {
      yield 1;
      yield 2;
      yield 3;
    }
    
    const generator = simpleGenerator();
    
    console.log(generator.next()); // { value: 1, done: false }
    console.log(generator.next()); // { value: 2, done: false }
    console.log(generator.next()); // { value: 3, done: false }
    console.log(generator.next()); // { value: undefined, done: true }
    
    // 제너레이터를 사용한 이터러블 객체 구현
    const iterableWithGenerator = {
      data: [1, 2, 3],
      
      // 제너레이터 함수를 사용하여 Symbol.iterator 구현
      *[Symbol.iterator]() {
        for (const item of this.data) {
          yield item;
        }
      }
    };
    
    for (const item of iterableWithGenerator) {
      console.log(item); // 1, 2, 3
    }
    
    // 4. 무한 시퀀스 생성
    function* fibonacci() {
      let [prev, curr] = [0, 1];
      while (true) {
        yield curr;
        [prev, curr] = [curr, prev + curr];
      }
    }
    
    const fib = fibonacci();
    console.log(fib.next().value); // 1
    console.log(fib.next().value); // 1
    console.log(fib.next().value); // 2
    console.log(fib.next().value); // 3
    console.log(fib.next().value); // 5
    
    // 5. 비동기 제너레이터 (Async Generator)
    async function* fetchUsers(userIds) {
      for (const id of userIds) {
        const response = await fetch(`https://api.example.com/users/${id}`);
        const user = await response.json();
        yield user;
      }
    }
    
    // 비동기 제너레이터 사용
    async function processUsers() {
      const userGenerator = fetchUsers([1, 2, 3]);
      
      for await (const user of userGenerator) {
        console.log(user);
      }
    }
    ```
