# JavaScript Developer Interview Questions (Basic Concepts)

## Basic Concepts

1. **Can you explain the data types in JavaScript?**
   - What are the differences between primitive types and reference types?
   - What's the difference between `undefined` and `null`?
   
   **Description:** JavaScript has primitive types and reference types. Primitive types are immutable and passed by value. These include String, Number, Boolean, Null, Undefined, Symbol, and BigInt. Reference types are mutable and passed by reference. These include Object, Array, Function, Date, RegExp, etc. `undefined` represents a variable that has been declared but not assigned a value, while `null` is an assigned value that represents the intentional absence of any object value.
   
   **Example:**
   ```javascript
   // Primitive types (passed by value)
   let a = 5;
   let b = a;
   b = 10;
   console.log(a); // 5 (a remains unchanged)
   console.log(b); // 10
   
   // Reference types (passed by reference)
   let obj1 = { name: 'John' };
   let obj2 = obj1;
   obj2.name = 'Jane';
   console.log(obj1.name); // 'Jane' (obj1 is also changed)
   
   // undefined vs null
   let undefinedVar; // declared but not initialized
   console.log(undefinedVar); // undefined
   
   let nullVar = null; // explicitly assigned 'no value'
   console.log(nullVar); // null
   
   console.log(typeof undefined); // 'undefined'
   console.log(typeof null); // 'object' (a famous bug in JavaScript)
   ```

2. **What is hoisting in JavaScript and how does it work?**
   - Explain the differences in hoisting between `var`, `let`, and `const`.
   
   **Description:** Hoisting is JavaScript's behavior of moving declarations of variables, functions, classes, or imports to the top of their scope before code execution. Variables declared with `var` are initialized as `undefined` when hoisted, but variables declared with `let` and `const` are hoisted without initialization, creating a Temporal Dead Zone (TDZ) where referencing them results in a reference error. Function declarations are fully hoisted, allowing them to be called before their declaration, while function expressions follow variable hoisting rules.
   
   **Example:**
   ```javascript
   // var hoisting
   console.log(x); // undefined (hoisted but not initialized)
   var x = 5;
   console.log(x); // 5
   
   // The above code is internally interpreted as:
   // var x;
   // console.log(x); // undefined
   // x = 5;
   // console.log(x); // 5
   
   // let and const hoisting (TDZ - Temporal Dead Zone)
   // console.log(y); // ReferenceError: Cannot access 'y' before initialization
   let y = 10;
   
   // console.log(z); // ReferenceError: Cannot access 'z' before initialization
   const z = 15;
   
   // Function declaration hoisting
   sayHello(); // "Hello!" (the entire function is hoisted)
   function sayHello() {
     console.log("Hello!");
   }
   
   // Function expression hoisting
   // sayHi(); // TypeError: sayHi is not a function
   var sayHi = function() {
     console.log("Hi!");
   };
   ```

3. **What is a closure in JavaScript and how can it be utilized?**
   - Explain real-world use cases of closures with examples.
   
   **Description:** A closure is a function that has access to its own scope, the variables in the outer function's scope, and the global variables. Closures are created every time a function is created, at function creation time. They allow functions to maintain access to variables from their parent scope even after the parent function has finished executing. Closures are commonly used for data privacy, function factories, and maintaining state in asynchronous operations.
   
   **Example:**
   ```javascript
   // Basic closure example
   function createCounter() {
     let count = 0; // Private variable not accessible from outside
     
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
   
   // Real-world use case: Data privacy
   function createUser(name) {
     // Private variable
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
   // secretKey variable cannot be accessed directly
   ```

4. **Explain execution context and call stack in JavaScript.**
   
   **Description:** An execution context is an environment where JavaScript code is evaluated and executed. Each time a function is called, a new execution context is created and pushed onto the call stack. The execution context consists of the variable environment (variables, functions, and arguments), the scope chain, and the value of `this`. The call stack is a data structure that tracks the execution of functions in a program. When a function is called, it's pushed onto the stack; when it returns, it's popped off the stack. This LIFO (Last In, First Out) structure enables JavaScript to keep track of where it is in the execution of nested function calls.
   
   **Example:**
   ```javascript
   // Execution context and call stack example
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
   
   // Call stack execution order:
   // 1. Global Execution Context created
   // 2. first() called -> first Execution Context created and pushed to stack
   // 3. second() called -> second Execution Context created and pushed to stack
   // 4. third() called -> third Execution Context created and pushed to stack
   // 5. third() completes -> third Execution Context popped from stack
   // 6. second() completes -> second Execution Context popped from stack
   // 7. first() completes -> first Execution Context popped from stack
   first();
   
   // Output:
   // "Inside first function"
   // "Inside second function"
   // "Inside third function"
   // "Back to second function"
   // "Back to first function"
   ```

5. **What is the event loop in JavaScript and how does it relate to asynchronous processing?**
   - What are the differences between microtasks and macrotasks?
   
   **Description:** The event loop is the core mechanism of JavaScript's asynchronous programming model, allowing the single-threaded language to handle asynchronous operations. The event loop checks if the call stack is empty, then takes callback functions from the task queue and executes them. Microtasks are executed immediately after the current task completes, including Promise callbacks and MutationObserver. Macrotasks are processed in the next event loop tick, including setTimeout, setInterval, setImmediate, requestAnimationFrame, and I/O operations. The microtask queue has higher priority than the macrotask queue, meaning all microtasks are processed before the next macrotask.
   
   **Example:**
   ```javascript
   console.log('Script start'); // 1
   
   // Macrotask (Task queue)
   setTimeout(() => {
     console.log('setTimeout'); // 5
   }, 0);
   
   // Microtask (Microtask queue)
   Promise.resolve()
     .then(() => {
       console.log('Promise 1'); // 3
     })
     .then(() => {
       console.log('Promise 2'); // 4
     });
   
   console.log('Script end'); // 2
   
   // Execution order:
   // 1. 'Script start' - synchronous code
   // 2. 'Script end' - synchronous code
   // 3. 'Promise 1' - microtask
   // 4. 'Promise 2' - microtask
   // 5. 'setTimeout' - macrotask
   
   // Output:
   // "Script start"
   // "Script end"
   // "Promise 1"
   // "Promise 2"
   // "setTimeout"
   ```
