# JavaScript Developer Interview Questions (Functions and Objects)

## Functions and Objects

6. **What are the differences between function declarations and function expressions?**
   - Explain the differences between arrow functions and regular functions.
   
   **Description:** Function declarations start with the `function` keyword, require a name, and are hoisted to the top of their scope, making them available throughout the code. Function expressions are functions assigned to variables and follow variable hoisting rules. Arrow functions, introduced in ES6, are concise function expressions that don't bind their own `this`, `arguments`, `super`, or `new.target`, instead using those from the lexical scope. Arrow functions cannot be used as constructors and require caution when used as methods or event handlers. They can return single expressions without curly braces, allowing for more concise code.
   
   **Example:**
   ```javascript
   // Function Declaration
   function add(a, b) {
     return a + b;
   }
   
   // Can be called before declaration due to hoisting
   console.log(add(2, 3)); // 5
   
   // Function Expression
   const subtract = function(a, b) {
     return a - b;
   };
   
   // Hoisted but not initialized
   // console.log(multiply(2, 3)); // TypeError: multiply is not a function
   var multiply = function(a, b) {
     return a * b;
   };
   
   // Arrow Function
   const divide = (a, b) => a / b;
   
   // Difference in 'this' binding between arrow and regular functions
   const user = {
     name: 'John',
     sayHiRegular: function() {
       console.log(`Hi, I'm ${this.name}`);
     },
     sayHiArrow: () => {
       console.log(`Hi, I'm ${this.name}`);
     }
   };
   
   user.sayHiRegular(); // "Hi, I'm John" (this refers to the user object)
   user.sayHiArrow(); // "Hi, I'm undefined" (this refers to the outer scope)
   ```

7. **How does the `this` keyword work in JavaScript?**
   - Explain how the value of `this` is determined in different contexts.
   - What are the differences and use cases of `call`, `apply`, and `bind` methods?
   
   **Description:** In JavaScript, `this` is dynamically determined based on how a function is called. In the global scope, it refers to the global object (`window` in browsers, `global` in Node.js). In method calls, it refers to the object owning the method. In regular function calls, it refers to the global object (or `undefined` in strict mode). In constructor functions, it refers to the newly created instance. The methods `call`, `apply`, and `bind` are used to explicitly set the value of `this` in a function. Both `call` and `apply` immediately invoke the function, with `call` taking individual arguments and `apply` taking an array of arguments. `bind` doesn't immediately invoke the function but returns a new function with `this` bound to the specified value.
   
   **Example:**
   ```javascript
   // Global context - 'this' refers to the global object
   console.log(this); // Window in browsers, global in Node.js
   
   // Method call - 'this' refers to the object owning the method
   const person = {
     name: 'John',
     greet: function() {
       return `Hello, I'm ${this.name}`;
     }
   };
   
   console.log(person.greet()); // "Hello, I'm John"
   
   // Regular function call - 'this' refers to global object or undefined (strict mode)
   const greetFunc = person.greet;
   console.log(greetFunc()); // "Hello, I'm undefined"
   
   // Constructor function - 'this' refers to the newly created object
   function Person(name) {
     this.name = name;
     this.greet = function() {
       return `Hello, I'm ${this.name}`;
     };
   }
   
   const john = new Person('John');
   console.log(john.greet()); // "Hello, I'm John"
   
   // call: sets 'this' and calls function with individual arguments
   const jane = { name: 'Jane' };
   console.log(person.greet.call(jane)); // "Hello, I'm Jane"
   
   // apply: sets 'this' and calls function with arguments as an array
   console.log(person.greet.apply(jane, [])); // "Hello, I'm Jane"
   
   // bind: returns a new function with 'this' bound, doesn't call immediately
   const greetJane = person.greet.bind(jane);
   console.log(greetJane()); // "Hello, I'm Jane"
   ```

8. **Explain prototypes and the prototype chain in JavaScript.**
   - How is inheritance implemented in JavaScript?
   
   **Description:** In JavaScript, every object has a hidden property called `[[Prototype]]` (accessible via `__proto__`), which references another object called its prototype. When a property is accessed on an object and not found, JavaScript looks for it in the prototype, then in the prototype's prototype, and so on, forming a prototype chain that ends with `Object.prototype`. This mechanism enables inheritance in JavaScript. Constructor functions use the `prototype` property to set the `[[Prototype]]` of instances created with `new`. ES6 classes provide a more familiar syntax for the same prototype-based inheritance mechanism.
   
   **Example:**
   ```javascript
   // Prototype-based inheritance with constructor functions
   function Animal(name) {
     this.name = name;
   }
   
   Animal.prototype.speak = function() {
     return `${this.name} makes a noise.`;
   };
   
   // Inheritance
   function Dog(name, breed) {
     // Call parent constructor
     Animal.call(this, name);
     this.breed = breed;
   }
   
   // Set up inheritance
   Dog.prototype = Object.create(Animal.prototype);
   
   // Restore constructor reference
   Dog.prototype.constructor = Dog;
   
   // Add new method to Dog.prototype
   Dog.prototype.speak = function() {
     return `${this.name} barks. It's a ${this.breed}.`;
   };
   
   const animal = new Animal('Animal');
   const dog = new Dog('Rex', 'German Shepherd');
   
   console.log(animal.speak()); // "Animal makes a noise."
   console.log(dog.speak()); // "Rex barks. It's a German Shepherd."
   
   // Checking the prototype chain
   console.log(dog instanceof Dog); // true
   console.log(dog instanceof Animal); // true
   console.log(dog instanceof Object); // true
   
   // ES6 class syntax (still uses prototypes under the hood)
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

9. **Describe object creation patterns in JavaScript.**
   - What are the differences between factory pattern, constructor pattern, and prototype pattern?
   
   **Description:** JavaScript offers several patterns for creating objects. The factory pattern uses a function that returns object literals, providing encapsulation but creating separate method copies for each object. The constructor pattern uses constructor functions with `new` to create instances, but still creates separate method copies unless methods are added to the prototype. The prototype pattern adds methods to the constructor's prototype, creating a single shared copy of each method for all instances, which is memory efficient. Each pattern has trade-offs between simplicity, memory usage, and inheritance capabilities.
   
   **Example:**
   ```javascript
   // 1. Factory Pattern
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
   
   // Factory pattern issue: each object has its own copy of methods
   console.log(person1.greet === person2.greet); // false
   
   // 2. Constructor Pattern
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
   
   // Constructor pattern has the same issue as factory pattern
   console.log(person3.greet === person4.greet); // false
   
   // 3. Prototype Pattern
   function PersonProto(name, age) {
     this.name = name;
     this.age = age;
   }
   
   // Add methods to the prototype
   PersonProto.prototype.greet = function() {
     return `Hello, I'm ${this.name} and I'm ${this.age} years old.`;
   };
   
   const person5 = new PersonProto('John', 30);
   const person6 = new PersonProto('Jane', 25);
   
   console.log(person5.greet()); // "Hello, I'm John and I'm 30 years old."
   console.log(person6.greet()); // "Hello, I'm Jane and I'm 25 years old."
   
   // Prototype pattern advantage: methods stored in prototype are memory efficient
   console.log(person5.greet === person6.greet); // true
   ```

10. **What are the differences between classes and constructor functions in JavaScript?**
    
    **Description:** Classes introduced in ES6 provide a clearer and more intuitive syntax for JavaScript's existing prototype-based inheritance. Classes are hoisted but remain in the Temporal Dead Zone until declaration, always run in strict mode, and must be called with the `new` keyword. They offer features like constructors, static methods, and inheritance through `extends`. Constructor functions, on the other hand, are hoisted and can be used before declaration, can be called without `new` in non-strict mode, and require direct prototype manipulation for static methods or inheritance. Internally, classes still operate on prototype-based mechanics but provide a stricter and more developer-friendly syntax.
    
    **Example:**
    ```javascript
    // Constructor function
    function PersonConstructor(name) {
      this.name = name;
    }
    
    PersonConstructor.prototype.greet = function() {
      return `Hello, I'm ${this.name}`;
    };
    
    const person1 = new PersonConstructor('John');
    console.log(person1.greet()); // "Hello, I'm John"
    
    // Hoisting works
    const person2 = new PersonConstructor2('Jane');
    console.log(person2.greet()); // "Hello, I'm Jane"
    
    function PersonConstructor2(name) {
      this.name = name;
    }
    
    PersonConstructor2.prototype.greet = function() {
      return `Hello, I'm ${this.name}`;
    };
    
    // ES6 class
    class PersonClass {
      constructor(name) {
        this.name = name;
      }
      
      greet() {
        return `Hello, I'm ${this.name}`;
      }
      
      // Static method
      static create(name) {
        return new PersonClass(name);
      }
    }
    
    // Classes are hoisted but in TDZ
    // const person4 = new PersonClass2('Bob'); // ReferenceError
    
    const person3 = new PersonClass('Alice');
    console.log(person3.greet()); // "Hello, I'm Alice"
    
    // Static method call
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
    
    // Classes must be called with new
    // PersonClass('Test'); // TypeError: Class constructor PersonClass cannot be invoked without 'new'
    ```
