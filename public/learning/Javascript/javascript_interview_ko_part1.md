# JavaScript 개발자 인터뷰 질문 (기본 개념)

## 기본 개념

1. **JavaScript의 데이터 타입에 대해 설명해주세요.**
   - 원시 타입(Primitive types)과 참조 타입(Reference types)의 차이점은 무엇인가요?
   - `undefined`와 `null`의 차이점은 무엇인가요?
   
   **설명:** JavaScript에는 원시 타입(primitive types)과 참조 타입(reference types)이 있습니다. 원시 타입은 불변(immutable)하며 값에 의한 전달(pass by value)이 이루어집니다. 여기에는 String, Number, Boolean, Null, Undefined, Symbol, BigInt가 포함됩니다. 참조 타입은 가변(mutable)하며 참조에 의한 전달(pass by reference)이 이루어집니다. 여기에는 Object, Array, Function, Date, RegExp 등이 포함됩니다. `undefined`는 변수가 선언되었지만 값이 할당되지 않은 상태를 나타내며, `null`은 값이 의도적으로 없음을 나타내는 할당 값입니다.

   **Description:** JavaScript has primitive types and reference types. Primitive types are immutable and passed by value. These include String, Number, Boolean, Null, Undefined, Symbol, and BigInt. Reference types are mutable and passed by reference. These include Object, Array, Function, Date, RegExp, etc. `undefined` represents a variable that has been declared but not assigned a value, while `null` is an assigned value that represents the intentional absence of any object value.
   
   **예시:**
   ```javascript
   // 원시 타입 (값에 의한 전달)
   let a = 5;
   let b = a;
   b = 10;
   console.log(a); // 5 (a는 변경되지 않음)
   console.log(b); // 10
   
   // 참조 타입 (참조에 의한 전달)
   let obj1 = { name: 'John' };
   let obj2 = obj1;
   obj2.name = 'Jane';
   console.log(obj1.name); // 'Jane' (obj1도 변경됨)
   
   // undefined vs null
   let undefinedVar; // 선언만 하고 초기화하지 않음
   console.log(undefinedVar); // undefined
   
   let nullVar = null; // 명시적으로 '값이 없음'을 할당
   console.log(nullVar); // null
   
   console.log(typeof undefined); // 'undefined'
   console.log(typeof null); // 'object' (JavaScript의 유명한 버그)
   ```

2. **호이스팅(Hoisting)이란 무엇이며 어떻게 작동하나요?**
   - `var`, `let`, `const`의 호이스팅 차이점을 설명해주세요.
   
   **설명:** 호이스팅은 JavaScript 엔진이 코드를 실행하기 전에 변수, 함수, 클래스 또는 임포트의 선언을 해당 스코프의 맨 위로 끌어올리는 동작입니다. `var`로 선언된 변수는 호이스팅 시 `undefined`로 초기화되지만, `let`과 `const`로 선언된 변수는 호이스팅되지만 초기화되지 않은 상태(TDZ, Temporal Dead Zone)에 있어 참조 오류가 발생합니다. 함수 선언식은 전체가 호이스팅되어 선언 전에도 호출할 수 있지만, 함수 표현식은 변수 호이스팅 규칙을 따릅니다.

   **Description:** Hoisting is JavaScript's behavior of moving declarations of variables, functions, classes, or imports to the top of their scope before code execution. Variables declared with `var` are initialized as `undefined` when hoisted, but variables declared with `let` and `const` are hoisted without initialization, creating a Temporal Dead Zone (TDZ) where referencing them results in a reference error. Function declarations are fully hoisted, allowing them to be called before their declaration, while function expressions follow variable hoisting rules.
   
   **예시:**
   ```javascript
   // var 호이스팅
   console.log(x); // undefined (호이스팅되지만 초기화되지 않음)
   var x = 5;
   console.log(x); // 5
   
   // 위 코드는 내부적으로 다음과 같이 해석됨
   // var x;
   // console.log(x); // undefined
   // x = 5;
   // console.log(x); // 5
   
   // let과 const 호이스팅 (TDZ - Temporal Dead Zone)
   // console.log(y); // ReferenceError: Cannot access 'y' before initialization
   let y = 10;
   
   // console.log(z); // ReferenceError: Cannot access 'z' before initialization
   const z = 15;
   
   // 함수 선언식 호이스팅
   sayHello(); // "Hello!" (전체 함수가 호이스팅됨)
   function sayHello() {
     console.log("Hello!");
   }
   
   // 함수 표현식 호이스팅
   // sayHi(); // TypeError: sayHi is not a function
   var sayHi = function() {
     console.log("Hi!");
   };
   ```

3. **클로저(Closure)란 무엇이며 어떻게 활용할 수 있나요?**
   - 클로저의 실제 사용 사례를 예시와 함께 설명해주세요.
   
   **설명:** 클로저는 함수와 그 함수가 선언된 렉시컬 환경의 조합입니다. 이 환경은 클로저가 생성된 시점의 스코프에 있는 모든 지역 변수로 구성됩니다. 클로저를 통해 함수는 자신이 생성될 때의 환경(변수)을 기억하고 접근할 수 있습니다. 클로저는 데이터 캡슐화와 정보 은닉, 함수 팩토리 생성, 콜백 함수에서 외부 변수 접근 등에 활용됩니다. 이는 프라이빗 변수를 구현하거나, 특정 상태를 유지하는 함수를 만드는 데 유용합니다.

   **Description:** A closure is the combination of a function and the lexical environment within which that function was declared. This environment consists of all local variables that were in-scope at the time the closure was created. Closures allow a function to remember and access variables from the scope in which it was created, even after that scope has finished executing. Closures are used for data encapsulation and information hiding, creating function factories, accessing outer variables from callback functions, etc. They are useful for implementing private variables or creating functions that maintain specific states.
   
   **예시:**
   ```javascript
   // 기본적인 클로저 예시
   function createCounter() {
     let count = 0; // 외부에서 직접 접근할 수 없는 변수
     
     return {
       increment: function() {
         count++;
         return count;
       },
       decrement: function() {
         count--;
         return count;
       },
       getCount: function() {
         return count;
       }
     };
   }
   
   const counter = createCounter();
   console.log(counter.increment()); // 1
   console.log(counter.increment()); // 2
   console.log(counter.decrement()); // 1
   console.log(counter.getCount()); // 1
   
   // 실제 사용 사례: 데이터 프라이버시
   function createUser(name) {
     // 비공개 변수
     let secretKey = "user_" + Math.random().toString(36).substr(2, 9);
     
     return {
       getName: function() {
         return name;
       },
       authenticate: function(key) {
         return key === secretKey;
       },
       getEncryptedKey: function() {
         return secretKey.split("").reverse().join("");
       }
     };
   }
   
   const user = createUser("John");
   console.log(user.getName()); // "John"
   console.log(user.authenticate("wrong_key")); // false
   // secretKey 변수에 직접 접근할 수 없음
   ```

4. **실행 컨텍스트(Execution Context)와 콜 스택(Call Stack)에 대해 설명해주세요.**
   
   **설명:** 실행 컨텍스트는 JavaScript 코드가 실행되는 환경으로, 변수, 함수 선언, this 바인딩 등의 정보를 포함합니다. 주요 유형으로는 전역 실행 컨텍스트, 함수 실행 컨텍스트, eval 실행 컨텍스트가 있습니다. 콜 스택은 코드 실행 중 생성되는 실행 컨텍스트를 추적하는 LIFO(Last In, First Out) 데이터 구조입니다. 함수가 호출되면 해당 함수의 실행 컨텍스트가 스택에 푸시되고, 함수 실행이 완료되면 스택에서 팝되어 이전 컨텍스트로 제어권이 돌아갑니다. 이 메커니즘을 통해 JavaScript는 함수 호출의 중첩과 반환을 관리합니다.

   **Description:** An execution context is the environment in which JavaScript code is executed, containing information about variables, function declarations, and this binding. Main types include global execution context, function execution context, and eval execution context. The call stack is a LIFO (Last In, First Out) data structure that tracks execution contexts created during code execution. When a function is called, its execution context is pushed onto the stack, and when the function completes, it's popped off the stack, returning control to the previous context. This mechanism allows JavaScript to manage nested function calls and returns.
   
   **예시:**
   ```javascript
   // 실행 컨텍스트와 콜 스택 예시
   function first() {
     console.log("Inside first function");
     second();
     console.log("Back to first function");
   }
   
   function second() {
     console.log("Inside second function");
     third();
     console.log("Back to second function");
   }
   
   function third() {
     console.log("Inside third function");
   }
   
   // 콜 스택 실행 순서:
   // 1. Global Execution Context 생성
   // 2. first() 호출 -> first Execution Context 생성 및 스택에 푸시
   // 3. second() 호출 -> second Execution Context 생성 및 스택에 푸시
   // 4. third() 호출 -> third Execution Context 생성 및 스택에 푸시
   // 5. third() 완료 -> third Execution Context 스택에서 팝
   // 6. second() 완료 -> second Execution Context 스택에서 팝
   // 7. first() 완료 -> first Execution Context 스택에서 팝
   first();
   
   // 출력 결과:
   // "Inside first function"
   // "Inside second function"
   // "Inside third function"
   // "Back to second function"
   // "Back to first function"
   ```

5. **이벤트 루프(Event Loop)란 무엇이며 JavaScript의 비동기 처리와 어떤 관계가 있나요?**
   - 마이크로태스크(Microtask)와 매크로태스크(Macrotask)의 차이점은 무엇인가요?
   
   **설명:** 이벤트 루프는 JavaScript의 비동기 프로그래밍 모델의 핵심 메커니즘으로, 단일 스레드 언어인 JavaScript가 비동기 작업을 처리할 수 있게 합니다. 이벤트 루프는 콜 스택이 비어있을 때 태스크 큐에서 콜백 함수를 가져와 실행합니다. 마이크로태스크는 현재 태스크가 끝난 후 즉시 실행되며, Promise 콜백과 MutationObserver가 여기에 해당합니다. 매크로태스크는 다음 이벤트 루프 틱에서 처리되며, setTimeout, setInterval, setImmediate, requestAnimationFrame, I/O 작업 등이 여기에 해당합니다. 마이크로태스크 큐는 매크로태스크 큐보다 우선순위가 높아, 모든 마이크로태스크가 처리된 후에야 다음 매크로태스크가 처리됩니다.

   **Description:** The event loop is the core mechanism of JavaScript's asynchronous programming model, allowing the single-threaded language to handle asynchronous operations. The event loop checks if the call stack is empty, then takes callback functions from the task queue and executes them. Microtasks are executed immediately after the current task completes, including Promise callbacks and MutationObserver. Macrotasks are processed in the next event loop tick, including setTimeout, setInterval, setImmediate, requestAnimationFrame, and I/O operations. The microtask queue has higher priority than the macrotask queue, meaning all microtasks are processed before the next macrotask.
   
   **예시:**
   ```javascript
   console.log('Script start'); // 1
   
   // 매크로태스크 (Task queue)
   setTimeout(() => {
     console.log('setTimeout'); // 4
   }, 0);
   
   // 마이크로태스크 (Microtask queue)
   Promise.resolve()
     .then(() => {
       console.log('Promise 1'); // 3
     })
     .then(() => {
       console.log('Promise 2'); // 5
     });
   
   console.log('Script end'); // 2
   
   // 실행 순서:
   // 1. 'Script start' - 동기 코드
   // 2. 'Script end' - 동기 코드
   // 3. 'Promise 1' - 마이크로태스크
   // 4. 'Promise 2' - 마이크로태스크
   // 5. 'setTimeout' - 매크로태스크
   
   // 출력 결과:
   // "Script start"
   // "Script end"
   // "Promise 1"
   // "Promise 2"
   // "setTimeout"
   ```
