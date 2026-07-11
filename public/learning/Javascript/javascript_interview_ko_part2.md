# JavaScript 개발자 인터뷰 질문 (함수와 객체)

## 함수와 객체

6. **함수 선언식과 함수 표현식의 차이점은 무엇인가요?**
   - 화살표 함수(Arrow Function)와 일반 함수의 차이점을 설명해주세요.
   
   **설명:** 함수 선언식은 `function` 키워드로 시작하여 이름이 필수이며, 호이스팅되어 코드 실행 전에 메모리에 로드됩니다. 함수 표현식은 변수에 할당된 함수로, 변수 호이스팅 규칙을 따릅니다. 화살표 함수는 ES6에서 도입된 간결한 함수 표현식으로, 자신만의 `this`, `arguments`, `super`, `new.target`을 바인딩하지 않고 렉시컬 스코프의 것을 사용합니다. 화살표 함수는 생성자로 사용할 수 없으며, 메서드나 이벤트 핸들러로 사용할 때 주의가 필요합니다. 또한 화살표 함수는 중괄호 없이 단일 표현식을 반환할 수 있어 간결한 코드 작성이 가능합니다.

   **Description:** Function declarations start with the `function` keyword, require a name, and are hoisted to the top of their scope, making them available throughout the code. Function expressions are functions assigned to variables and follow variable hoisting rules. Arrow functions, introduced in ES6, are concise function expressions that don't bind their own `this`, `arguments`, `super`, or `new.target`, instead using those from the lexical scope. Arrow functions cannot be used as constructors and require caution when used as methods or event handlers. They can return single expressions without curly braces, allowing for more concise code.
   
   **예시:**
   ```javascript
   // 함수 선언식 (Function Declaration)
   function add(a, b) {
     return a + b;
   }
   
   // 호이스팅되기 때문에 선언 전에도 호출 가능
   console.log(add(2, 3)); // 5
   
   // 함수 표현식 (Function Expression)
   const subtract = function(a, b) {
     return a - b;
   };
   
   // 호이스팅되지만 초기화는 되지 않음
   // console.log(multiply(2, 3)); // TypeError: multiply is not a function
   var multiply = function(a, b) {
     return a * b;
   };
   
   // 화살표 함수 (Arrow Function)
   const divide = (a, b) => a / b;
   
   // 화살표 함수와 일반 함수의 this 바인딩 차이
   const user = {
     name: 'John',
     sayHiRegular: function() {
       console.log(`Hi, I'm ${this.name}`);
     },
     sayHiArrow: () => {
       console.log(`Hi, I'm ${this.name}`);
     }
   };
   
   user.sayHiRegular(); // "Hi, I'm John" (this가 user 객체를 가리킴)
   user.sayHiArrow(); // "Hi, I'm undefined" (this가 외부 스코프를 가리킴)
   ```

7. **`this` 키워드는 어떻게 작동하나요?**
   - 다양한 컨텍스트에서 `this`의 값이 어떻게 결정되는지 설명해주세요.
   - `call`, `apply`, `bind` 메서드의 차이점과 사용법을 설명해주세요.
   
   **설명:** JavaScript에서 `this`는 함수가 호출되는 방식에 따라 동적으로 결정됩니다. 전역 스코프에서는 전역 객체(브라우저에서는 `window`, Node.js에서는 `global`)를 가리킵니다. 메서드 호출에서는 메서드를 소유한 객체를 가리키고, 일반 함수 호출에서는 전역 객체(strict mode에서는 `undefined`)를 가리킵니다. 생성자 함수에서는 새로 생성된 인스턴스를 가리킵니다. `call`, `apply`, `bind`는 함수의 `this` 값을 명시적으로 설정하는 메서드입니다. `call`과 `apply`는 함수를 즉시 호출하며, `call`은 인수를 개별적으로, `apply`는 배열로 전달합니다. `bind`는 함수를 즉시 호출하지 않고 `this`가 바인딩된 새 함수를 반환합니다.

   **Description:** In JavaScript, `this` is dynamically determined based on how a function is called. In the global scope, it refers to the global object (`window` in browsers, `global` in Node.js). In method calls, it refers to the object owning the method. In regular function calls, it refers to the global object (or `undefined` in strict mode). In constructor functions, it refers to the newly created instance. `call`, `apply`, and `bind` are methods that explicitly set the `this` value of a function. `call` and `apply` immediately invoke the function, with `call` accepting arguments individually and `apply` accepting them as an array. `bind` returns a new function with `this` bound to a specified value without immediately invoking it.
   
   **예시:**
   ```javascript
   // 기본 바인딩: 전역 객체 (strict mode에서는 undefined)
   console.log(this); // Window 객체 (브라우저에서)
   
   // 메서드 호출에서 this는 해당 메서드를 소유한 객체를 가리킴
   const person = {
     name: 'John',
     greet: function() {
       return `Hello, I'm ${this.name}`;
     }
   };
   
   console.log(person.greet()); // "Hello, I'm John"
   
   // 일반 함수 호출에서 this는 전역 객체 또는 undefined(strict mode)
   const greetFunc = person.greet;
   console.log(greetFunc()); // "Hello, I'm undefined"
   
   // 생성자 함수에서 this는 새로 생성된 객체를 가리킴
   function Person(name) {
     this.name = name;
     this.greet = function() {
       return `Hello, I'm ${this.name}`;
     };
   }
   
   const john = new Person('John');
   console.log(john.greet()); // "Hello, I'm John"
   
   // call, apply, bind 메서드를 사용한 this 바인딩
   const jane = { name: 'Jane' };
   
   // call: 함수를 즉시 호출하며, 인수를 개별적으로 전달
   console.log(person.greet.call(jane)); // "Hello, I'm Jane"
   
   // apply: 함수를 즉시 호출하며, 인수를 배열로 전달
   console.log(person.greet.apply(jane, [])); // "Hello, I'm Jane"
   
   // bind: 함수를 즉시 호출하지 않고, 새로운 함수를 반환
   const greetJane = person.greet.bind(jane);
   console.log(greetJane()); // "Hello, I'm Jane"
   ```

8. **프로토타입(Prototype)과 프로토타입 체인(Prototype Chain)에 대해 설명해주세요.**
   - JavaScript에서 상속은 어떻게 구현되나요?
   
   **설명:** JavaScript에서 프로토타입은 객체 간 상속을 구현하는 메커니즘입니다. 모든 JavaScript 객체는 프로토타입 객체에 대한 참조를 가지며, 이 프로토타입 객체의 속성과 메서드를 상속받습니다. 프로토타입 체인은 객체가 속성이나 메서드를 찾을 때 자신의 프로토타입을 따라 연쇄적으로 검색하는 과정입니다. JavaScript에서 상속은 주로 프로토타입 체인을 통해 구현됩니다. ES5에서는 `Object.create()`나 생성자 함수와 프로토타입을 조작하여 상속을 구현하고, ES6에서는 `class`와 `extends` 키워드를 사용하여 더 직관적인 상속 구문을 제공합니다. 그러나 내부적으로는 여전히 프로토타입 기반 상속이 작동합니다.

   **Description:** In JavaScript, prototypes are the mechanism used to implement object inheritance. Every JavaScript object has a reference to a prototype object from which it inherits properties and methods. The prototype chain is the process of searching for properties or methods by following an object's prototype chain sequentially. Inheritance in JavaScript is primarily implemented through the prototype chain. In ES5, inheritance is achieved by manipulating constructor functions and prototypes or using `Object.create()`. ES6 introduced the `class` and `extends` keywords for more intuitive inheritance syntax, though prototype-based inheritance still operates under the hood.
   
   **예시:**
   ```javascript
   // 프로토타입 기반 상속
   function Animal(name) {
     this.name = name;
   }
   
   // 프로토타입에 메서드 추가
   Animal.prototype.speak = function() {
     return `${this.name} makes a noise.`;
   };
   
   // 프로토타입 상속
   function Dog(name, breed) {
     // Animal 생성자 호출
     Animal.call(this, name);
     this.breed = breed;
   }
   
   // Dog.prototype이 Animal.prototype을 상속하도록 설정
   Dog.prototype = Object.create(Animal.prototype);
   // 생성자 참조 복구
   Dog.prototype.constructor = Dog;
   
   // Dog.prototype에 새 메서드 추가
   Dog.prototype.speak = function() {
     return `${this.name} barks. It's a ${this.breed}.`;
   };
   
   const animal = new Animal('Animal');
   const dog = new Dog('Rex', 'German Shepherd');
   
   console.log(animal.speak()); // "Animal makes a noise."
   console.log(dog.speak()); // "Rex barks. It's a German Shepherd."
   
   // 프로토타입 체인 확인
   console.log(dog instanceof Dog); // true
   console.log(dog instanceof Animal); // true
   console.log(dog instanceof Object); // true
   
   // ES6 클래스 구문으로 동일한 내용 구현
   class AnimalClass {
     constructor(name) {
       this.name = name;
     }
     
     speak() {
       return `${this.name} makes a noise.`;
     }
   }
   
   class DogClass extends AnimalClass {
     constructor(name, breed) {
       super(name);
       this.breed = breed;
     }
     
     speak() {
       return `${this.name} barks. It's a ${this.breed}.`;
     }
   }
   ```

9. **객체 생성 패턴에 대해 설명해주세요.**
   - 팩토리 패턴, 생성자 패턴, 프로토타입 패턴의 차이점은 무엇인가요?
   
   **설명:** JavaScript에서는 여러 객체 생성 패턴이 있습니다. 팩토리 패턴은 객체를 생성하는 함수를 사용하여 객체 생성 로직을 캡슐화하지만, 각 객체가 메서드의 별도 복사본을 가져 메모리 효율성이 떨어집니다. 생성자 패턴은 `new` 키워드와 함께 사용되는 함수로, 인스턴스를 생성하고 초기화하지만 여전히 메서드 중복 문제가 있습니다. 프로토타입 패턴은 생성자의 프로토타입에 메서드를 추가하여 모든 인스턴스가 동일한 메서드를 공유하게 함으로써 메모리 효율성을 높입니다. 실제로는 이러한 패턴을 조합하여 사용하는 경우가 많으며, ES6의 클래스 구문은 생성자 패턴과 프로토타입 패턴을 더 직관적으로 결합한 형태입니다.

   **Description:** JavaScript offers several object creation patterns. The factory pattern uses a function to encapsulate object creation logic, but each object has separate copies of methods, reducing memory efficiency. The constructor pattern uses functions with the `new` keyword to create and initialize instances, but still has method duplication issues. The prototype pattern adds methods to the constructor's prototype, allowing all instances to share the same methods, improving memory efficiency. In practice, these patterns are often combined, and ES6 class syntax provides a more intuitive way to combine constructor and prototype patterns.
   
   **예시:**
   ```javascript
   // 1. 팩토리 패턴 (Factory Pattern)
   function createPerson(name, age) {
     return {
       name: name,
       age: age,
       greet: function() {
         return `Hello, I'm ${this.name} and I'm ${this.age} years old.`;
       }
     };
   }
   
   const person1 = createPerson('John', 30);
   const person2 = createPerson('Jane', 25);
   
   console.log(person1.greet()); // "Hello, I'm John and I'm 30 years old."
   console.log(person2.greet()); // "Hello, I'm Jane and I'm 25 years old."
   
   // 팩토리 패턴의 문제점: 각 객체가 동일한 메서드의 별도 복사본을 가짐
   console.log(person1.greet === person2.greet); // false
   
   // 2. 생성자 패턴 (Constructor Pattern)
   function Person(name, age) {
     this.name = name;
     this.age = age;
     this.greet = function() {
       return `Hello, I'm ${this.name} and I'm ${this.age} years old.`;
     };
   }
   
   const person3 = new Person('John', 30);
   const person4 = new Person('Jane', 25);
   
   console.log(person3.greet()); // "Hello, I'm John and I'm 30 years old."
   console.log(person4.greet()); // "Hello, I'm Jane and I'm 25 years old."
   
   // 생성자 패턴의 문제점: 여전히 각 객체가 동일한 메서드의 별도 복사본을 가짐
   console.log(person3.greet === person4.greet); // false
   
   // 3. 프로토타입 패턴 (Prototype Pattern)
   function PersonProto(name, age) {
     this.name = name;
     this.age = age;
   }
   
   // 메서드를 프로토타입에 추가
   PersonProto.prototype.greet = function() {
     return `Hello, I'm ${this.name} and I'm ${this.age} years old.`;
   };
   
   const person5 = new PersonProto('John', 30);
   const person6 = new PersonProto('Jane', 25);
   
   console.log(person5.greet()); // "Hello, I'm John and I'm 30 years old."
   console.log(person6.greet()); // "Hello, I'm Jane and I'm 25 years old."
   
   // 프로토타입 패턴의 장점: 메서드가 프로토타입에 저장되어 메모리 효율적
   console.log(person5.greet === person6.greet); // true
   ```

10. **클래스(Class)와 생성자 함수(Constructor Function)의 차이점은 무엇인가요?**
    
    **설명:** ES6에서 도입된 클래스는 JavaScript의 기존 프로토타입 기반 상속을 더 명확하고 직관적인 구문으로 제공합니다. 클래스는 호이스팅되지만 TDZ(Temporal Dead Zone)에 있어 선언 전에 접근할 수 없고, 항상 strict mode로 실행되며, 반드시 `new` 키워드로 호출해야 합니다. 또한 클래스는 `constructor`, `static` 메서드, `extends`를 통한 상속 등의 기능을 제공합니다. 반면, 생성자 함수는 호이스팅되어 선언 전에도 사용 가능하고, strict mode가 아니면 `new` 없이도 호출할 수 있으며, 정적 메서드나 상속을 구현하려면 프로토타입을 직접 조작해야 합니다. 내부적으로 클래스도 프로토타입 기반으로 작동하지만, 더 엄격하고 개발자 친화적인 문법을 제공합니다.

    **Description:** Classes introduced in ES6 provide a clearer and more intuitive syntax for JavaScript's existing prototype-based inheritance. Classes are hoisted but remain in the Temporal Dead Zone until declaration, always run in strict mode, and must be called with the `new` keyword. They offer features like constructors, static methods, and inheritance through `extends`. Constructor functions, on the other hand, are hoisted and can be used before declaration, can be called without `new` in non-strict mode, and require direct prototype manipulation for static methods or inheritance. Internally, classes still operate on prototype-based mechanics but provide a stricter and more developer-friendly syntax.
    
    **예시:**
    ```javascript
    // 생성자 함수
    function PersonConstructor(name) {
      this.name = name;
    }
    
    PersonConstructor.prototype.greet = function() {
      return `Hello, I'm ${this.name}`;
    };
    
    const person1 = new PersonConstructor('John');
    console.log(person1.greet()); // "Hello, I'm John"
    
    // 호이스팅 가능
    const person2 = new PersonConstructor2('Jane');
    console.log(person2.greet()); // "Hello, I'm Jane"
    
    function PersonConstructor2(name) {
      this.name = name;
    }
    
    PersonConstructor2.prototype.greet = function() {
      return `Hello, I'm ${this.name}`;
    };
    
    // ES6 클래스
    class PersonClass {
      constructor(name) {
        this.name = name;
      }
      
      greet() {
        return `Hello, I'm ${this.name}`;
      }
      
      // 정적 메서드
      static create(name) {
        return new PersonClass(name);
      }
    }
    
    // 클래스는 호이스팅되지 않음
    // const person4 = new PersonClass2('Bob'); // ReferenceError
    
    const person3 = new PersonClass('Alice');
    console.log(person3.greet()); // "Hello, I'm Alice"
    
    // 정적 메서드 호출
    const person4 = PersonClass.create('Bob');
    console.log(person4.greet()); // "Hello, I'm Bob"
    
    class PersonClass2 {
      constructor(name) {
        this.name = name;
      }
      
      greet() {
        return `Hello, I'm ${this.name}`;
      }
    }
    
    // 클래스는 반드시 new로 호출해야 함
    // PersonClass('Test'); // TypeError: Class constructor PersonClass cannot be invoked without 'new'
    ```
