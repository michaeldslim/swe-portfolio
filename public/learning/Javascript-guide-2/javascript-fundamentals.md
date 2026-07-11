# JavaScript Core Fundamentals

## Table of Contents
- [1. Execution Context & Hoisting](#1-execution-context--hoisting)
- [2. Scope & Closures](#2-scope--closures)
- [3. `this` Keyword](#3-this-keyword)
- [4. Prototypes & Inheritance](#4-prototypes--inheritance)
- [5. Asynchronous JavaScript](#5-asynchronous-javascript)
- [6. ES6+ Features](#6-es6-features)
- [7. Event Loop](#7-event-loop)
- [8. Promises & Async/Await](#8-promises--asyncawait)
- [9. Modules](#9-modules)
- [10. Error Handling](#10-error-handling)

---

## 1. Execution Context & Hoisting

### Execution Context
JavaScript code runs inside an execution context, which consists of:
- **Variable Environment**: Where variables and functions are stored
- **Lexical Environment**: Where the code was written
- **`this` binding**: Reference to the current context

### Hoisting
JavaScript moves variable and function declarations to the top of their containing scope during compilation.

```javascript
console.log(x); // undefined (not ReferenceError)
var x = 5;

// Function declarations are fully hoisted
sayHello(); // "Hello!"
function sayHello() {
  console.log("Hello!");
}

// Function expressions are not hoisted
sayHi(); // TypeError: sayHi is not a function
var sayHi = function() {
  console.log("Hi!");
};
```

**Key Points**:
- `var` declarations are hoisted and initialized with `undefined`
- `let` and `const` are hoisted but not initialized (Temporal Dead Zone)
- Function declarations are fully hoisted
- Class declarations are not hoisted

---

## 2. Scope & Closures

### Scope
Scope determines the accessibility of variables.

```javascript
// Global scope
const globalVar = 'I\'m global';

function outer() {
    // Function scope
    const outerVar = 'I\'m in outer';
    
    function inner() {
        // Inner function scope
        const innerVar = 'I\'m in inner';
        console.log(globalVar); // Accessible
        console.log(outerVar);  // Accessible
    }
    
    inner();
    // console.log(innerVar); // ReferenceError
}

outer();
```

### Closures
A closure gives you access to an outer function's scope from an inner function.

```javascript
function createCounter() {
    let count = 0;
    
    return {
        increment: function() {
            count++;
            return count;
        },
        getCount: function() {
            return count;
        }
    };
}

const counter = createCounter();
console.log(counter.getCount()); // 0
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
```

**Common Use Cases**:
- Data privacy
- Function factories
- Currying
- Event handlers and callbacks

---

## 3. `this` Keyword

`this` refers to the object that the function is a property of.

```javascript
// Global context
console.log(this); // Window (browser) or global (Node.js)

// Function context
function whatIsThis() {
    console.log(this);
}

// Method context
const obj = {
    name: 'My Object',
    logThis: function() {
        console.log(this);
    }
};

// Constructor context
function Person(name) {
    this.name = name;
    console.log(this);
}
const person = new Person('John');

// Explicit binding (call, apply, bind)
function greet(greeting, punctuation) {
    console.log(`${greeting}, ${this.name}${punctuation}`);
}

const person1 = { name: 'Alice' };
greet.call(person1, 'Hello', '!');     // "Hello, Alice!"
greet.apply(person1, ['Hi', '!!']);   // "Hi, Alice!!"

const boundGreet = greet.bind(person1, 'Hey');
boundGreet('!!!');                     // "Hey, Alice!!!"
```

**Key Points**:
- In regular functions, `this` is determined by how the function is called
- Arrow functions don't have their own `this` (lexical `this`)
- `call()`, `apply()`, and `bind()` can explicitly set `this`
- In event handlers, `this` refers to the element that received the event

---

## 4. Prototypes & Inheritance

### Prototypes
Every JavaScript object has a prototype. When a property is accessed, JavaScript looks up the prototype chain until it finds the property or reaches `null`.

```javascript
// Constructor function
function Animal(name) {
    this.name = name;
}

// Add method to prototype
Animal.prototype.speak = function() {
    console.log(`${this.name} makes a noise.`);
};

// Create instance
const animal = new Animal('Animal');
animal.speak(); // "Animal makes a noise."

// Inheritance
function Dog(name, breed) {
    Animal.call(this, name);
    this.breed = breed;
}

// Set up prototype chain
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

// Add method to Dog prototype
Dog.prototype.bark = function() {
    console.log(`${this.name} barks!`);
};

const dog = new Dog('Rex', 'Labrador');
dog.speak(); // "Rex makes a noise."
dog.bark();  // "Rex barks!"
```

### ES6 Classes
```javascript
class Animal {
    constructor(name) {
        this.name = name;
    }
    
    speak() {
        console.log(`${this.name} makes a noise.`);
    }
}

class Dog extends Animal {
    constructor(name, breed) {
        super(name);
        this.breed = breed;
    }
    
    bark() {
        console.log(`${this.name} barks!`);
    }
}

const dog = new Dog('Rex', 'Labrador');
dog.speak(); // "Rex makes a noise."
dog.bark();  // "Rex barks!"
```

---

## 5. Asynchronous JavaScript

### Callbacks
```javascript
function fetchData(callback) {
    setTimeout(() => {
        callback('Data received');
    }, 1000);
}

fetchData((data) => {
    console.log(data); // "Data received" after 1 second
});
```

### Promises
```javascript
function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const success = true;
            if (success) {
                resolve('Data fetched successfully');
            } else {
                reject('Error fetching data');
            }
        }, 1000);
    });
}

fetchData()
    .then(data => console.log(data))
    .catch(error => console.error(error));
```

### Async/Await
```javascript
async function getData() {
    try {
        const response = await fetchData();
        console.log(response);
    } catch (error) {
        console.error(error);
    }
}

getData();
```

---

## 6. ES6+ Features

### Arrow Functions
```javascript
const add = (a, b) => a + b;
const square = x => x * x;

// Lexical `this`
const obj = {
    name: 'Test',
    sayHi: function() {
        setTimeout(() => {
            console.log(`Hi, ${this.name}!`); // `this` refers to obj
        }, 100);
    }
};
```

### Destructuring
```javascript
// Array destructuring
const [first, second] = [1, 2, 3];

// Object destructuring
const { name, age } = { name: 'John', age: 30 };

// Function parameters
function greet({ name, age }) {
    return `Hello, ${name}. You are ${age} years old.`;
}
```

### Spread/Rest Operator
```javascript
// Spread (arrays)
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5]; // [1, 2, 3, 4, 5]

// Spread (objects)
const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3 }; // { a: 1, b: 2, c: 3 }

// Rest parameters
function sum(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}
```

---

## 7. Event Loop

JavaScript is single-threaded but non-blocking thanks to the event loop.

```javascript
console.log('Start');

setTimeout(() => {
    console.log('Timeout callback');
}, 0);

Promise.resolve().then(() => {
    console.log('Promise resolved');
});

console.log('End');

// Output order:
// Start
// End
// Promise resolved
// Timeout callback
```

**Event Loop Phases**:
1. Call Stack
2. Microtask Queue (Promises, process.nextTick)
3. Macrotask Queue (setTimeout, setInterval, I/O)

---

## 8. Promises & Async/Await

### Promise Methods
```javascript
// Promise.all
Promise.all([promise1, promise2, promise3])
    .then(values => console.log(values))
    .catch(error => console.error(error));

// Promise.race
Promise.race([promise1, promise2])
    .then(value => console.log('First resolved:', value));

// Promise.allSettled
Promise.allSettled([promise1, promise2])
    .then(results => results.forEach(result => console.log(result.status)));
```

### Async/Await Patterns
```javascript
// Sequential execution
async function sequential() {
    const result1 = await asyncFunc1();
    const result2 = await asyncFunc2(result1);
    return result2;
}

// Parallel execution
async function parallel() {
    const [result1, result2] = await Promise.all([
        asyncFunc1(),
        asyncFunc2()
    ]);
    return { result1, result2 };
}
```

---

## 9. Modules

### ES6 Modules
```javascript
// math.js
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;

export default function multiply(a, b) {
    return a * b;
}

// app.js
import multiply, { add, subtract } from './math.js';
console.log(add(2, 3));       // 5
console.log(multiply(2, 3));  // 6
```

### CommonJS (Node.js)
```javascript
// math.js
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;

module.exports = {
    add,
    subtract,
    multiply: (a, b) => a * b
};

// app.js
const { add, subtract, multiply } = require('./math');
```

---

## 10. Error Handling

### Try/Catch
```javascript
try {
    // Code that might throw an error
    const result = riskyOperation();
    console.log(result);
} catch (error) {
    console.error('An error occurred:', error.message);
} finally {
    console.log('This always runs');
}
```

### Custom Errors
```javascript
class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ValidationError';
    }
}

function validateInput(input) {
    if (!input) {
        throw new ValidationError('Input is required');
    }
}

try {
    validateInput('');
} catch (error) {
    if (error instanceof ValidationError) {
        console.error('Validation error:', error.message);
    } else {
        console.error('Unexpected error:', error);
    }
}
```

### Error Handling in Async/Await
```javascript
async function fetchWithRetry(url, retries = 3) {
    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Network response was not ok');
            return await response.json();
        } catch (error) {
            if (i === retries - 1) throw error;
            console.log(`Retry ${i + 1}/${retries}...`);
            await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
        }
    }
}
```

---

## Conclusion

This guide covers the core JavaScript concepts frequently tested in technical interviews. Understanding these fundamentals deeply will help you tackle interview questions with confidence.

### Additional Topics to Explore
- Memory management and garbage collection
- Event delegation and bubbling
- Web Workers
- Service Workers
- Proxy and Reflect API
- Generators and Iterators
- TypeScript (for type safety)

Remember, mastering JavaScript is an ongoing journey. Keep coding and building projects to reinforce these concepts!
