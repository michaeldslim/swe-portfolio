# JavaScript Interview Guide: Part 1 - Core Fundamentals

## JavaScript's Threading Model

### Single-Threaded Execution

JavaScript is a **single-threaded** programming language, which means it has:

- One call stack
- One memory heap
- One thread of execution that can run JavaScript code at any given time

```javascript
function first() {
  console.log('First function');
}

function second() {
  console.log('Second function');
}

first();   // Executes first
second();  // Executes only after first() completes
```

**Interview Tips:**
- JavaScript runs on a single thread called the "main thread" or "UI thread" (in browsers)
- Long-running operations block the entire thread, potentially freezing the UI
- The single-threaded nature is why asynchronous programming is so important in JavaScript
- Web Workers provide a way to run scripts in background threads, but with limited access to DOM

### Event Loop Architecture

Despite being single-threaded, JavaScript can handle concurrent operations through its event loop architecture:

1. **Call Stack**: Where function calls are tracked
2. **Web APIs**: Browser features like setTimeout, fetch, DOM events (not part of JS engine)
3. **Callback Queue**: Where callbacks wait to be processed
4. **Event Loop**: Monitors call stack and callback queue, pushing callbacks to stack when it's empty

```javascript
console.log('Start');

setTimeout(() => {
  console.log('Timeout callback');
}, 0);

console.log('End');

// Output:
// Start
// End
// Timeout callback
```

**Interview Tips:**
- The event loop is what enables JavaScript's non-blocking behavior
- Even with a 0ms timeout, the callback executes after synchronous code completes
- Microtasks (Promises) have higher priority than macrotasks (setTimeout, setInterval)
- Understanding the event loop is crucial for debugging asynchronous code issues

## Asynchronous vs. Synchronous

### Synchronous Execution

In synchronous programming, operations are executed sequentially, one after another. Each operation must complete before the next one begins.

```javascript
function syncOperation() {
  console.log('Step 1');
  const result = performHeavyCalculation(); // Blocks execution until complete
  console.log('Step 2 with result:', result);
  console.log('Step 3');
}

// Execution order: Step 1 → Heavy Calculation → Step 2 → Step 3
```

**Characteristics:**
- Blocking: Each operation blocks execution until complete
- Predictable: Code executes in the exact order it's written
- Problematic: Long operations freeze the entire application

### Asynchronous Execution

In asynchronous programming, operations can be initiated now but completed later, allowing the program to continue executing other code in the meantime.

```javascript
function asyncOperation() {
  console.log('Step 1');
  
  fetch('https://api.example.com/data')
    .then(response => response.json())
    .then(data => {
      console.log('Step 2 with data:', data);
    });
  
  console.log('Step 3'); // Executes before the API response is received
}

// Execution order: Step 1 → Step 3 → Step 2 (when API response arrives)
```

**Mechanisms for Asynchronous Programming:**

1. **Callbacks**
```javascript
function fetchData(callback) {
  setTimeout(() => {
    callback('Data received');
  }, 1000);
}

fetchData(data => console.log(data));
console.log('After fetchData call');
```

2. **Promises**
```javascript
function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => resolve('Data received'), 1000);
  });
}

fetchData().then(data => console.log(data));
console.log('After fetchData call');
```

3. **Async/Await**
```javascript
async function getData() {
  const data = await fetchData(); // Pauses execution within this function only
  console.log(data);
}

getData();
console.log('After getData call'); // Executes immediately
```

**Key Differences:**

| Synchronous | Asynchronous |
|-------------|-------------|
| Blocking operations | Non-blocking operations |
| Sequential execution | Parallel-like execution |
| Simpler to reason about | More complex control flow |
| Inefficient for I/O operations | Efficient for I/O operations |
| Can cause UI freezing | Keeps UI responsive |

**Interview Tips:**
- JavaScript uses asynchronous patterns for I/O operations, timers, and events
- Async code doesn't actually run in parallel (still single-threaded)
- Common async operations: API calls, file operations, timers, user interactions
- Modern JavaScript favors Promises and async/await over callbacks
- Async/await is syntactic sugar over Promises, making async code look synchronous



## Variables and Data Types

### Primitive Types

JavaScript has 7 primitive data types:

#### 1. String
```javascript
const name = "JavaScript";
const template = `Template literal with ${name}`;

// Methods
name.length;           // 10
name.toUpperCase();    // "JAVASCRIPT"
name.substring(0, 4);  // "Java"
```

**Interview Tips:**
- Strings are immutable in JavaScript
- Template literals allow embedded expressions and multi-line strings
- Common methods:
  ```javascript
  // charAt() - returns the character at a specified index
  const str = "JavaScript";
  console.log(str.charAt(0));  // "J"
  console.log(str.charAt(4));  // "S"
  
  // indexOf() - returns the position of the first occurrence of a value
  console.log(str.indexOf("Script"));  // 4
  console.log(str.indexOf("Python"));  // -1 (not found)
  
  // replace() - replaces a specified value with another value
  console.log(str.replace("Java", "Type"));  // "TypeScript"
  
  // split() - splits a string into an array of substrings
  const csv = "apple,orange,banana";
  console.log(csv.split(","));  // ["apple", "orange", "banana"]
  
  // trim() - removes whitespace from both ends of a string
  const paddedText = "   Hello World!   ";
  console.log(paddedText.trim());  // "Hello World!"
  ```

#### 2. Number
```javascript
const integer = 42;
const float = 3.14;
const scientific = 2.5e6;  // 2,500,000
const binary = 0b1010;     // 10
const octal = 0o744;       // 484
const hex = 0xFF;          // 255

// Special values
const infinity = Infinity;
const negInfinity = -Infinity;
const notANumber = NaN;

// Methods
Number.isNaN(NaN);         // true
Number.isFinite(infinity); // false
(123.456).toFixed(2);      // "123.46"
```

**Interview Tips:**
- JavaScript uses 64-bit floating point (IEEE 754)
- `NaN` is the only value not equal to itself: `NaN !== NaN`
- Use `Number.isNaN()` instead of global `isNaN()`
- Beware of floating-point precision issues: `0.1 + 0.2 !== 0.3`

#### 3. Boolean
```javascript
const isActive = true;
const isComplete = false;

// Truthy and falsy values
Boolean(0);          // false
Boolean("");         // false
Boolean(null);       // false
Boolean(undefined);  // false
Boolean(NaN);        // false
Boolean(false);      // false

Boolean(1);          // true
Boolean("hello");    // true
Boolean([]);         // true
Boolean({});         // true
```

**Interview Tips:**
- Know all falsy values: `0`, `""`, `null`, `undefined`, `NaN`, `false`
- Everything else is truthy, including empty arrays and objects
- Common in conditional statements: `if (username) { ... }`

#### 4. Null
```javascript
const emptyValue = null;

// Type checking
typeof null;  // "object" (this is a historical bug in JavaScript)
null === null; // true
```

**Interview Tips:**
- Represents intentional absence of value
- `typeof null` returns `"object"` (a known JavaScript bug)
- Use strict equality (`===`) to check for null

#### 5. Undefined
```javascript
let notDefined;
console.log(notDefined);  // undefined

// Type checking
typeof undefined;  // "undefined"
```

**Interview Tips:**
- Default value for uninitialized variables
- Function parameters without arguments
- Accessing non-existent object properties
- Difference from `null`: `undefined` is unintentionally missing, `null` is intentionally absent

#### 6. Symbol (ES6)
```javascript
const uniqueKey = Symbol('description');
const anotherKey = Symbol('description');

uniqueKey === anotherKey;  // false

// Use case: private object properties
const obj = {};
obj[uniqueKey] = 'Hidden value';
```

**Interview Tips:**
- Always unique, even with same description
- Not enumerable in `for...in` loops
- Use cases: private object properties, avoiding name collisions
- Not automatically converted to string

#### 7. BigInt (ES2020)
```javascript
const bigNumber = 9007199254740991n;  // Note the 'n' suffix
const anotherBig = BigInt("9007199254740991");

// Operations
bigNumber + 1n;  // 9007199254740992n
```

**Interview Tips:**
- For integers larger than Number.MAX_SAFE_INTEGER (9007199254740991)
- Cannot mix with regular numbers in operations
- Cannot use with `Math` object methods

### Reference Types

Reference types store references to values in memory.

#### 1. Objects
```javascript
const person = {
  name: 'John',
  age: 30,
  greet() {
    return `Hello, my name is ${this.name}`;
  }
};

// Accessing properties
person.name;                // "John"
person['age'];              // 30
const { name, age } = person;  // Destructuring

// Methods
Object.keys(person);        // ["name", "age", "greet"]
Object.values(person);      // ["John", 30, ƒ]
Object.entries(person);     // [["name", "John"], ["age", 30], ["greet", ƒ]]
Object.freeze(person);      // Makes object immutable
```

**Interview Tips:**
- Objects are passed by reference, not value
- `Object.assign()` for shallow copying
- `JSON.parse(JSON.stringify())` for deep copying (with limitations)
- Modern alternatives: spread operator `{...obj}`, `structuredClone()`

#### 2. Arrays
```javascript
const fruits = ['apple', 'banana', 'orange'];

// Accessing elements
fruits[0];                  // "apple"
const [first, ...rest] = fruits;  // Destructuring

// Methods
fruits.push('grape');       // Add to end
fruits.pop();               // Remove from end
fruits.unshift('mango');    // Add to beginning
fruits.shift();             // Remove from beginning
fruits.splice(1, 1, 'kiwi');  // Remove and insert
fruits.slice(1, 3);         // Extract portion (non-mutating)

// Iteration methods
fruits.forEach(fruit => console.log(fruit));
fruits.map(fruit => fruit.toUpperCase());
fruits.filter(fruit => fruit.length > 5);
fruits.reduce((acc, fruit) => acc + fruit.length, 0);
```

**Interview Tips:**
- Arrays are objects with numeric keys and `length` property
- Know mutating vs. non-mutating methods
- Common interview questions involve array manipulation
- Performance considerations for large arrays

#### 3. Functions
```javascript
// Function declaration
function add(a, b) {
  return a + b;
}

// Function expression
const subtract = function(a, b) {
  return a - b;
};

// Arrow function
const multiply = (a, b) => a * b;

// Functions are objects
add.toString();  // Shows function code
add.name;        // "add"
```

**Interview Tips:**
- Functions are first-class objects
- Can have properties and methods
- Differences between declarations, expressions, and arrow functions
- Hoisting behavior differs between types

### Type Coercion and Equality

#### Implicit Type Coercion
```javascript
// String conversion
1 + "2";      // "12" (number converted to string)
true + "2";   // "true2" (boolean converted to string)

// Numeric conversion
1 - "2";      // -1 (string converted to number)
"5" * "3";    // 15 (strings converted to numbers)
true + 1;     // 2 (true converted to 1)
false + 1;    // 1 (false converted to 0)

// Boolean conversion
if ("hello") { /* executes: non-empty string is truthy */ }
if (0) { /* doesn't execute: 0 is falsy */ }
```

#### Equality Operators

##### Double Equals (==)
```javascript
"5" == 5;       // true (type coercion happens)
0 == false;     // true
null == undefined;  // true
[] == 0;        // true
```

##### Triple Equals (===)
```javascript
"5" === 5;      // false (no type coercion)
0 === false;    // false
null === undefined;  // false
```

**Interview Tips:**
- Always prefer `===` (strict equality) over `==` (loose equality)
- Know common coercion rules for interview questions
- Understand that `==` can lead to unexpected results
- `Object.is()` for edge cases like `NaN` comparison

## Scope and Closures

### Types of Scope

#### 1. Global Scope
```javascript
// Variables declared outside any function or block
const globalVar = "I'm global";

function accessGlobal() {
  console.log(globalVar);  // Accessible
}
```

**Interview Tips:**
- Avoid polluting global scope
- In browsers, global scope is `window` object
- In Node.js, global scope is `global` object

#### 2. Function Scope
```javascript
function functionScope() {
  const functionVar = "I'm function-scoped";
  console.log(functionVar);  // Accessible
}

console.log(functionVar);  // ReferenceError: functionVar is not defined
```

**Interview Tips:**
- Variables declared with `var` have function scope
- Can lead to unexpected behavior in loops and conditionals

#### 3. Block Scope
```javascript
{
  let blockVar = "I'm block-scoped";
  const alsoBlockScoped = "Me too";
  var notBlockScoped = "I'm function-scoped";
}

console.log(blockVar);  // ReferenceError
console.log(alsoBlockScoped);  // ReferenceError
console.log(notBlockScoped);  // Works (var ignores blocks)
```

**Interview Tips:**
- Introduced with ES6 (`let` and `const`)
- Helps prevent variable leakage
- More predictable behavior than `var`

### Lexical Scope
```javascript
function outer() {
  const outerVar = "I'm from outer";
  
  function inner() {
    const innerVar = "I'm from inner";
    console.log(outerVar);  // Can access parent's variables
  }
  
  inner();
  console.log(innerVar);  // ReferenceError
}
```

**Interview Tips:**
- Functions can access variables from parent scopes
- Inner functions cannot be accessed from outside
- Forms the basis for closures

### Closures
```javascript
function createCounter() {
  let count = 0;  // Private variable
  
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
counter.increment();  // 1
counter.increment();  // 2
counter.decrement();  // 1
```

**Practical Applications:**
1. **Data Privacy**
   ```javascript
   function createUser(name) {
     // Private data
     const privateData = { name, createdAt: Date.now() };
     
     return {
       getName: () => privateData.name,
       getCreationTime: () => privateData.createdAt
     };
   }
   ```

2. **Function Factories**
   ```javascript
   function multiplyBy(factor) {
     return function(number) {
       return number * factor;
     };
   }
   
   const double = multiplyBy(2);
   const triple = multiplyBy(3);
   
   double(5);  // 10
   triple(5);  // 15
   ```

3. **Module Pattern**
   ```javascript
   const calculator = (function() {
     // Private variables
     let result = 0;
     
     // Public API
     return {
       add: function(x) {
         result += x;
         return this;
       },
       subtract: function(x) {
         result -= x;
         return this;
       },
       getResult: function() {
         return result;
       }
     };
   })();
   
   calculator.add(5).subtract(2).getResult();  // 3
   ```

**Interview Tips:**
- A closure is a function that remembers its lexical scope
- Closures "remember" variables even after parent function has returned
- Common use cases: data privacy, callbacks, currying, memoization
- Watch for memory leaks with large data in closures

## Functions

### Function Declarations vs Expressions

#### Function Declaration
```javascript
function greet(name) {
  return `Hello, ${name}!`;
}
```

#### Function Expression
```javascript
const greet = function(name) {
  return `Hello, ${name}!`;
};
```

**Key Differences:**
1. **Hoisting**
   ```javascript
   // This works
   console.log(declarationGreet("John"));
   function declarationGreet(name) {
     return `Hello, ${name}!`;
   }
   
   // This throws an error
   console.log(expressionGreet("John"));  // ReferenceError
   const expressionGreet = function(name) {
     return `Hello, ${name}!`;
   };
   ```

2. **Named Function Expressions**
   ```javascript
   const factorial = function fact(n) {
     if (n <= 1) return 1;
     return n * fact(n - 1);  // Can reference itself by name
   };
   ```

**Interview Tips:**
- Function declarations are hoisted completely
- Function expressions are not hoisted (or only the variable declaration is)
- Named function expressions are useful for recursion and stack traces

### Arrow Functions
```javascript
// Basic syntax
const add = (a, b) => a + b;

// With body block
const greet = (name) => {
  const greeting = `Hello, ${name}!`;
  return greeting;
};

// Single parameter (parentheses optional)
const square = x => x * x;

// No parameters
const getRandomNumber = () => Math.random();

// Returning object literal (requires parentheses)
const createPerson = (name, age) => ({ name, age });
```

**Key Differences from Regular Functions:**
1. **No `this` binding**
   ```javascript
   function RegularFunction() {
     this.value = 42;
     setTimeout(function() {
       console.log(this.value);  // undefined (or window.value)
     }, 1000);
   }
   
   function ArrowFunction() {
     this.value = 42;
     setTimeout(() => {
       console.log(this.value);  // 42
     }, 1000);
   }
   ```

2. **No `arguments` object**
   ```javascript
   function regular() {
     console.log(arguments);  // Arguments object
   }
   
   const arrow = () => {
     console.log(arguments);  // ReferenceError or parent's arguments
   };
   ```

3. **Cannot be used as constructors**
   ```javascript
   const Person = (name) => {
     this.name = name;  // 'this' doesn't work as expected
   };
   
   const john = new Person("John");  // TypeError: Person is not a constructor
   ```

4. **No `super` or `new.target`**

**Interview Tips:**
- Arrow functions are great for short callbacks
- Use when you want to preserve the lexical `this`
- Avoid when you need `this` to be dynamic (methods, constructors)
- More concise syntax for simple functions

### Higher-Order Functions

Functions that take functions as arguments or return functions.

```javascript
// Function as argument
function applyOperation(a, b, operation) {
  return operation(a, b);
}

const sum = applyOperation(5, 3, (a, b) => a + b);  // 8
const product = applyOperation(5, 3, (a, b) => a * b);  // 15

// Function returning function (currying)
function multiply(a) {
  return function(b) {
    return a * b;
  };
}

const double = multiply(2);
double(5);  // 10
```

**Common Higher-Order Functions:**
1. **Array methods**
   ```javascript
   const numbers = [1, 2, 3, 4, 5];
   
   // map: Transform each element
   const doubled = numbers.map(n => n * 2);  // [2, 4, 6, 8, 10]
   
   // filter: Keep elements that pass test
   const evens = numbers.filter(n => n % 2 === 0);  // [2, 4]
   
   // reduce: Accumulate values
   const sum = numbers.reduce((acc, n) => acc + n, 0);  // 15
   
   // forEach: Execute function for each element
   numbers.forEach(n => console.log(n));
   ```

2. **Function composition**
   ```javascript
   const compose = (f, g) => x => f(g(x));
   
   const addOne = x => x + 1;
   const double = x => x * 2;
   
   const addOneThenDouble = compose(double, addOne);
   addOneThenDouble(3);  // 8 (double(addOne(3)))
   ```

**Interview Tips:**
- Higher-order functions enable functional programming patterns
- Improve code reusability and modularity
- Common in JavaScript libraries and frameworks
- Know the common array higher-order methods

### Callbacks

Functions passed as arguments to be executed later.

```javascript
// Simple callback
function fetchData(callback) {
  // Simulate API call
  setTimeout(() => {
    const data = { name: "John", age: 30 };
    callback(data);
  }, 1000);
}

fetchData(function(data) {
  console.log(data);  // { name: "John", age: 30 }
});

// Error-first callbacks (Node.js pattern)
function readFile(path, callback) {
  // Simulate file reading
  setTimeout(() => {
    if (path === "invalid") {
      callback(new Error("File not found"));
    } else {
      callback(null, "File content");
    }
  }, 1000);
}

readFile("valid.txt", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);  // "File content"
});
```

**Callback Hell**
```javascript
fetchUser(userId, function(user) {
  fetchPosts(user.id, function(posts) {
    fetchComments(posts[0].id, function(comments) {
      // Deeply nested callbacks
      console.log(comments);
    }, function(error) {
      console.error("Error fetching comments:", error);
    });
  }, function(error) {
    console.error("Error fetching posts:", error);
  });
}, function(error) {
  console.error("Error fetching user:", error);
});
```

**Solutions to Callback Hell:**
1. Named functions
2. Promises
3. Async/await

**Interview Tips:**
- Callbacks are fundamental to asynchronous JavaScript
- Understand error-first callback pattern (Node.js style)
- Be able to explain callback hell and its solutions
- Know when to use callbacks vs. promises vs. async/await

## JavaScript Loop Methods

JavaScript provides several ways to iterate over data. Each has specific use cases and performance characteristics.

### 1. `for` Loop

The traditional `for` loop gives complete control over the iteration process.

```javascript
// Basic for loop
for (let i = 0; i < 5; i++) {
  console.log(i); // 0, 1, 2, 3, 4
}

// Iterating over an array
const fruits = ['apple', 'banana', 'orange'];
for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]); // apple, banana, orange
}

// Performance optimization (caching length)
// This optimization stores the array length in a variable (len)
// to avoid recalculating numbers.length on each iteration
const numbers = [1, 2, 3, 4, 5];
for (let i = 0, len = numbers.length; i < len; i++) {
  console.log(numbers[i]); // 1, 2, 3, 4, 5
}

// Iteration with multiple variables
for (let i = 0, j = 10; i < 5; i++, j--) {
  console.log(i, j); // 0 10, 1 9, 2 8, 3 7, 4 6
}
```

**Interview Tips:**
- Most flexible loop with initialization, condition, and final expression
- Best performance for simple iterations (no function calls)
- Allows breaking, continuing, and manipulating the counter
- Can lead to off-by-one errors if not careful

### 2. `for...in` Loop

Iterates over all enumerable properties of an object (including inherited ones).

```javascript
// Iterating over object properties
const person = {
  name: 'John',
  age: 30,
  job: 'Developer'
};

for (const key in person) {
  if (Object.hasOwn(person, key)) { // ES2022 (formerly Object.prototype.hasOwnProperty.call)
    console.log(`${key}: ${person[key]}`);
  }
}
// name: John
// age: 30
// job: Developer

// Warning: Unexpected behavior with arrays
const arr = ['a', 'b', 'c'];
arr.customProp = 'danger';

for (const index in arr) {
  console.log(index, arr[index]);
}
// 0 a
// 1 b
// 2 c
// customProp danger
```

**Interview Tips:**
- Designed for objects, not arrays (use `for...of` for arrays)
- Always check with `Object.hasOwn()` to avoid inherited properties
- Keys are returned as strings, even for arrays ("0", "1", "2")
- Order is not guaranteed (though most engines follow insertion order)
- Performance is slower than `for` loop

### 3. `for...of` Loop (ES6)

Iterates over iterable objects (arrays, strings, maps, sets, etc.).

```javascript
// Iterating over arrays
const colors = ['red', 'green', 'blue'];
for (const color of colors) {
  console.log(color); // red, green, blue
}

// Iterating over strings
for (const char of 'hello') {
  console.log(char); // h, e, l, l, o
}

// Iterating over Map
const map = new Map([
  ['name', 'John'],
  ['age', 30]
]);
for (const [key, value] of map) {
  console.log(`${key}: ${value}`);
}
// name: John
// age: 30

// Iterating with index using entries()
const fruits = ['apple', 'banana', 'orange'];
for (const [index, fruit] of fruits.entries()) {
  console.log(`${index}: ${fruit}`);
}
// 0: apple
// 1: banana
// 2: orange
```

**Interview Tips:**
- Modern, clean syntax for iterating values (not keys/indices)
- Works with any iterable object
- Cannot access index directly (use `entries()` method)
- Can use `break` and `continue` statements
- More concise than `forEach` for simple iterations

### 4. `Array.prototype.forEach()`

Executes a provided function once for each array element.

```javascript
const numbers = [1, 2, 3, 4, 5];

// Basic usage
numbers.forEach(number => {
  console.log(number * 2); // 2, 4, 6, 8, 10
});

// With all parameters
numbers.forEach((number, index, array) => {
  console.log(`${index}: ${number} (array length: ${array.length})`);
});

// Early termination is not possible
numbers.forEach(number => {
  console.log(number);
  if (number === 3) {
    // This doesn't stop the loop
    return;
  }
});
```

**Interview Tips:**
- Cleaner syntax than traditional `for` loop
- Cannot break out of the loop (use `for...of` or `some()` if needed)
- Cannot use `await` inside the callback (use `for...of` instead)
- Slightly slower than `for` loops
- Callback receives (value, index, array) parameters

### 5. `Array.prototype.map()`

Creates a new array by applying a function to each element.

```javascript
const numbers = [1, 2, 3, 4, 5];

// Transform each element
const doubled = numbers.map(number => number * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

// With index parameter
const withIndices = numbers.map((number, index) => `${index}: ${number}`);
console.log(withIndices); // ['0: 1', '1: 2', '2: 3', '3: 4', '4: 5']

// Transforming objects
const users = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' }
];
const usernames = users.map(user => user.name);
console.log(usernames); // ['John', 'Jane']
```

**Interview Tips:**
- Always returns a new array of the same length
- Original array is not modified
- Use when you need to transform data
- More declarative than using a `for` loop with push
- Chainable with other array methods

### 6. `Array.prototype.filter()`

Creates a new array with elements that pass a test.

```javascript
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Filter even numbers
const evens = numbers.filter(number => number % 2 === 0);
console.log(evens); // [2, 4, 6, 8, 10]

// Filter with complex condition
const users = [
  { name: 'John', age: 25, active: true },
  { name: 'Jane', age: 30, active: false },
  { name: 'Bob', age: 17, active: true },
  { name: 'Mary', age: 42, active: true }
];

const activeAdults = users.filter(user => user.active && user.age >= 18);
console.log(activeAdults); // [{name: 'John', age: 25, active: true}, {name: 'Mary', age: 42, active: true}]

// Removing falsy values
const mixed = [0, 1, false, 2, '', 3, null, undefined, NaN];
const truthyOnly = mixed.filter(Boolean);
console.log(truthyOnly); // [1, 2, 3]
```

**Interview Tips:**
- Returns a new array that may be shorter than the original
- Original array is not modified
- Callback must return a boolean (or truthy/falsy value)
- Often combined with `map()` for data transformation
- `filter(Boolean)` is a shorthand to remove falsy values

### 7. `Array.prototype.reduce()`

Reduces an array to a single value by applying a function to each element.

```javascript
const numbers = [1, 2, 3, 4, 5];

// Sum all numbers
const sum = numbers.reduce((accumulator, current) => accumulator + current, 0);
console.log(sum); // 15

// With initial value
const product = numbers.reduce((accumulator, current) => accumulator * current, 1);
console.log(product); // 120

// Building an object from an array
const fruits = ['apple', 'banana', 'apple', 'orange', 'banana', 'apple'];
const fruitCount = fruits.reduce((count, fruit) => {
  count[fruit] = (count[fruit] || 0) + 1;
  return count;
}, {});
console.log(fruitCount); // {apple: 3, banana: 2, orange: 1}

// Flattening arrays
const nestedArrays = [[1, 2], [3, 4], [5, 6]];
const flattened = nestedArrays.reduce((acc, arr) => acc.concat(arr), []);
console.log(flattened); // [1, 2, 3, 4, 5, 6]
```

**Interview Tips:**
- Most versatile array method, can implement map/filter functionality
- Initial value is crucial (omitting it uses first element as initial value)
- Accumulator is the result of previous iterations
- Great for aggregating data (sum, average, grouping)
- Can be harder to read than specialized methods

### 8. `Array.prototype.some()` and `Array.prototype.every()`

Tests whether some or all elements pass a condition.

```javascript
const numbers = [1, 2, 3, 4, 5];

// some() - checks if at least one element passes the test
const hasEven = numbers.some(number => number % 2 === 0);
console.log(hasEven); // true

const hasNegative = numbers.some(number => number < 0);
console.log(hasNegative); // false

// every() - checks if all elements pass the test
const allPositive = numbers.every(number => number > 0);
console.log(allPositive); // true

const allEven = numbers.every(number => number % 2 === 0);
console.log(allEven); // false

// Early termination
const bigArray = Array(1000000).fill(1);
bigArray[500000] = 0;

console.time('some');
const containsZero = bigArray.some(num => {
  return num === 0;
});
console.timeEnd('some'); // Stops after finding the first match
```

**Interview Tips:**
- Both methods short-circuit (stop early when result is determined)
- `some()` returns true as soon as any element passes the test
- `every()` returns false as soon as any element fails the test
- Both return a boolean, not a new array
- Useful for validation and checking conditions

### 9. `Array.prototype.find()` and `Array.prototype.findIndex()`

Finds the first element or its index that satisfies a condition.

```javascript
const users = [
  { id: 1, name: 'John', age: 28 },
  { id: 2, name: 'Jane', age: 32 },
  { id: 3, name: 'Bob', age: 24 }
];

// find() - returns the first matching element
const user = users.find(user => user.age > 30);
console.log(user); // {id: 2, name: 'Jane', age: 32}

const nonExistent = users.find(user => user.age > 50);
console.log(nonExistent); // undefined

// findIndex() - returns the index of first matching element
const userIndex = users.findIndex(user => user.name === 'Bob');
console.log(userIndex); // 2

const notFoundIndex = users.findIndex(user => user.name === 'Alice');
console.log(notFoundIndex); // -1
```

**Interview Tips:**
- Both methods stop after finding the first match
- `find()` returns the element or `undefined`
- `findIndex()` returns the index or `-1`
- Useful when you need only one matching element
- More efficient than `filter()[0]` for finding a single item

### 10. `Array.prototype.flatMap()`

Combines `map()` and `flat()` operations in one method.

```javascript
const sentences = ['Hello world', 'JavaScript is fun'];

// Using map and flat separately
const words1 = sentences
  .map(sentence => sentence.split(' '))
  .flat();
console.log(words1); // ['Hello', 'world', 'JavaScript', 'is', 'fun']

// Using flatMap
const words2 = sentences.flatMap(sentence => sentence.split(' '));
console.log(words2); // ['Hello', 'world', 'JavaScript', 'is', 'fun']

// More complex example
const cartItems = [
  { product: 'Laptop', quantity: 1 },
  { product: 'Phone', quantity: 2 },
  { product: 'Charger', quantity: 3 }
];

const itemsExpanded = cartItems.flatMap(item => {
  return Array(item.quantity).fill(item.product);
});
console.log(itemsExpanded); // ['Laptop', 'Phone', 'Phone', 'Charger', 'Charger', 'Charger']
```

**Interview Tips:**
- More efficient than separate `map()` and `flat()` calls
- Only flattens one level deep (unlike `flat()` which can go deeper)
- Great for transformations that result in variable-length arrays
- Added in ES2019 (relatively new)

### Performance Considerations

```javascript
const largeArray = Array(10000000).fill(0).map((_, i) => i);

// Benchmark different loops
console.time('for');
let sum1 = 0;
for (let i = 0; i < largeArray.length; i++) {
  sum1 += largeArray[i];
}
console.timeEnd('for');

console.time('for...of');
let sum2 = 0;
for (const num of largeArray) {
  sum2 += num;
}
console.timeEnd('for...of');

console.time('forEach');
let sum3 = 0;
largeArray.forEach(num => {
  sum3 += num;
});
console.timeEnd('forEach');

console.time('reduce');
const sum4 = largeArray.reduce((acc, num) => acc + num, 0);
console.timeEnd('reduce');
```

**Interview Tips:**
- Traditional `for` loop is generally fastest for simple operations
- Method-based iterations (`forEach`, `map`, etc.) have slight overhead
- Modern JS engines optimize most common patterns
- Choose readability over micro-optimizations unless performance is critical
- For complex operations, the difference in loop style is negligible

## JavaScript Object Methods

JavaScript provides powerful built-in methods for working with objects. Understanding these methods is essential for effective object manipulation.

### 1. Object Creation and Initialization

#### `Object.create()`

Creates a new object with the specified prototype object and properties.

```javascript
// Creating an object with a custom prototype
const person = {
  isHuman: true,
  printIntroduction: function() {
    console.log(`My name is ${this.name}. Am I human? ${this.isHuman}`);
  }
};

const me = Object.create(person);
me.name = 'John';
me.printIntroduction(); // My name is John. Am I human? true

// Creating a null prototype object (no inherited properties)
const noProto = Object.create(null);
console.log(noProto.toString); // undefined (no inherited methods)

// Creating with property descriptors
const car = Object.create(Object.prototype, {
  make: {
    value: 'Toyota',
    writable: true,
    enumerable: true,
    configurable: true
  },
  model: { value: 'Corolla', enumerable: true },
  year: { value: 2020, enumerable: true }
});

console.log(car); // {make: 'Toyota', model: 'Corolla', year: 2020}
```

**Interview Tips:**
- Allows creating objects with specific prototypes
- More flexible than object literals or constructors
- Can create objects with no prototype (`Object.create(null)`)
- Second parameter allows defining property descriptors
- Useful for implementing inheritance patterns

#### `Object.assign()`

Copies all enumerable own properties from source objects to a target object.

```javascript
// Merging objects
const target = { a: 1, b: 2 };
const source1 = { b: 3, c: 4 };
const source2 = { c: 5, d: 6 };

const result = Object.assign(target, source1, source2);
console.log(target); // {a: 1, b: 3, c: 5, d: 6}
console.log(result === target); // true

// Creating a new object (shallow copy)
const original = { a: 1, b: { c: 2 } };
const copy = Object.assign({}, original);

console.log(copy); // {a: 1, b: {c: 2}}
console.log(copy.b === original.b); // true (nested objects are shared)

// Using with ES6 spread operator
const obj1 = { foo: 'bar', x: 42 };
const obj2 = { foo: 'baz', y: 13 };

const clonedObj = { ...obj1 }; // {foo: 'bar', x: 42}
const mergedObj = { ...obj1, ...obj2 }; // {foo: 'baz', x: 42, y: 13}
```

**Interview Tips:**
- Performs shallow copying (nested objects are referenced, not duplicated)
- Properties with the same key are overwritten
- Target object is modified and returned
- ES6 spread operator (`...`) often preferred for creating new objects
- Cannot copy property descriptors, getters/setters, or non-enumerable properties

### 2. Property Inspection and Iteration

#### `Object.keys()`, `Object.values()`, and `Object.entries()`

Returns arrays of an object's own enumerable property names, values, or key-value pairs.

```javascript
const person = {
  firstName: 'John',
  lastName: 'Doe',
  age: 30,
  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }
};

// Object.keys() - returns array of property names
const keys = Object.keys(person);
console.log(keys); // ['firstName', 'lastName', 'age', 'getFullName']

// Object.values() - returns array of property values
const values = Object.values(person);
console.log(values); // ['John', 'Doe', 30, ƒ getFullName()]

// Object.entries() - returns array of [key, value] pairs
const entries = Object.entries(person);
console.log(entries);
// [
//   ['firstName', 'John'],
//   ['lastName', 'Doe'],
//   ['age', 30],
//   ['getFullName', ƒ getFullName()]
// ]

// Practical example: converting object to Map
const personMap = new Map(Object.entries(person));
console.log(personMap.get('firstName')); // 'John'

// Converting Map back to object
const mapObj = Object.fromEntries(personMap);
console.log(mapObj); // Same structure as original person object
```

**Interview Tips:**
- All three methods return only enumerable own properties
- Order is the same as provided by a `for...in` loop
- `Object.keys()` is available since ES5, `values()` and `entries()` since ES2017
- `Object.fromEntries()` (ES2019) is the reverse of `entries()`
- Useful for transforming objects into arrays for further processing

#### `Object.getOwnPropertyNames()` and `Object.getOwnPropertySymbols()`

Returns arrays of all own property names or symbols, including non-enumerable ones.

```javascript
const obj = {};
Object.defineProperties(obj, {
  visible: { value: 'enumerable', enumerable: true },
  hidden: { value: 'non-enumerable', enumerable: false }
});

// Symbol property
const symbolKey = Symbol('description');
obj[symbolKey] = 'symbol value';

// Regular enumeration misses non-enumerable properties
console.log(Object.keys(obj)); // ['visible']

// getOwnPropertyNames includes non-enumerable properties, but not symbols
console.log(Object.getOwnPropertyNames(obj)); // ['visible', 'hidden']

// getOwnPropertySymbols gets only symbol properties
console.log(Object.getOwnPropertySymbols(obj)); // [Symbol(description)]

// To get ALL properties (enumerable, non-enumerable, and symbols)
const allProps = [
  ...Object.getOwnPropertyNames(obj),
  ...Object.getOwnPropertySymbols(obj)
];
console.log(allProps); // ['visible', 'hidden', Symbol(description)]
```

**Interview Tips:**
- `getOwnPropertyNames()` returns all string property keys (enumerable and non-enumerable)
- `getOwnPropertySymbols()` returns all symbol keys
- Neither includes inherited properties
- Useful for reflection and deep inspection of objects
- Important for library authors and meta-programming

### 3. Property Descriptors and Attributes

#### `Object.defineProperty()` and `Object.defineProperties()`

Defines new properties or modifies existing ones with precise control over behavior.

```javascript
const product = {};

// Define a single property
Object.defineProperty(product, 'name', {
  value: 'Laptop',
  writable: true,      // Can be changed
  enumerable: true,    // Shows up in loops
  configurable: true   // Can be deleted or modified
});

// Define multiple properties at once
Object.defineProperties(product, {
  price: {
    value: 1000,
    writable: true,
    enumerable: true,
    configurable: true
  },
  _discount: {
    value: 0,
    writable: true,
    enumerable: false  // Hidden from enumeration
  },
  // Getter/setter for calculated property
  finalPrice: {
    get() {
      return this.price * (1 - this._discount);
    },
    set(value) {
      this._discount = 1 - (value / this.price);
    },
    enumerable: true,
    configurable: true
  }
});

console.log(product.finalPrice); // 1000
product.finalPrice = 800;
console.log(product._discount); // 0.2
```

**Interview Tips:**
- Default values for descriptors are all `false`
- `writable`: controls if property value can be changed
- `enumerable`: controls if property appears in `for...in` loops and `Object.keys()`
- `configurable`: controls if property can be deleted or have its descriptors changed
- Getters/setters create computed properties
- Used for data validation, encapsulation, and computed properties

#### `Object.getOwnPropertyDescriptor()` and `Object.getOwnPropertyDescriptors()`

Returns detailed information about property attributes.

```javascript
const person = {
  name: 'John',
  get age() { return this._age; },
  set age(value) {
    if (value < 0) throw new Error('Age cannot be negative');
    this._age = value;
  }
};

person.age = 30;

// Get descriptor for a single property
const nameDescriptor = Object.getOwnPropertyDescriptor(person, 'name');
console.log(nameDescriptor);
// {
//   value: 'John',
//   writable: true,
//   enumerable: true,
//   configurable: true
// }

const ageDescriptor = Object.getOwnPropertyDescriptor(person, 'age');
console.log(ageDescriptor);
// {
//   get: [Function: get age],
//   set: [Function: set age],
//   enumerable: true,
//   configurable: true
// }

// Get descriptors for all properties
const allDescriptors = Object.getOwnPropertyDescriptors(person);
console.log(allDescriptors);
// Shows descriptors for name, age, and _age

// Creating true deep clone with getters/setters preserved
const clone = Object.create(
  Object.getPrototypeOf(person),
  Object.getOwnPropertyDescriptors(person)
);
```

**Interview Tips:**
- Returns complete information about property configuration
- Different structure for data properties vs. accessor properties (getters/setters)
- `getOwnPropertyDescriptors()` is useful for creating proper clones
- Essential for understanding how properties behave
- Used in library development and meta-programming

### 4. Object Protection and Immutability

#### `Object.preventExtensions()`, `Object.seal()`, and `Object.freeze()`

Restricts modifications to objects with varying levels of immutability.

```javascript
// Object.preventExtensions() - prevents adding new properties
const user = { name: 'John' };
Object.preventExtensions(user);

user.name = 'Jane';     // ✓ Can modify existing properties
user.age = 30;          // ✗ Cannot add new properties
delete user.name;       // ✓ Can delete properties

console.log(user);      // {}
console.log(Object.isExtensible(user)); // false

// Object.seal() - prevents adding or deleting properties
const config = { api: 'v1', timeout: 1000 };
Object.seal(config);

config.timeout = 2000;  // ✓ Can modify existing properties
config.retry = 3;       // ✗ Cannot add new properties
delete config.api;      // ✗ Cannot delete properties

console.log(config);    // {api: 'v1', timeout: 2000}
console.log(Object.isSealed(config)); // true

// Object.freeze() - makes object completely immutable
const settings = { theme: 'dark', fontSize: 14 };
Object.freeze(settings);

settings.fontSize = 16; // ✗ Cannot modify properties
settings.language = 'en'; // ✗ Cannot add properties
delete settings.theme;  // ✗ Cannot delete properties

console.log(settings);  // {theme: 'dark', fontSize: 14}
console.log(Object.isFrozen(settings)); // true

// Note: Freezing is shallow
const data = {
  user: { name: 'John' },
  scores: [10, 20, 30]
};
Object.freeze(data);

data.user.name = 'Jane'; // ✓ Can modify nested objects
data.scores.push(40);    // ✓ Can modify nested arrays

console.log(data); // {user: {name: 'Jane'}, scores: [10, 20, 30, 40]}
```

**Interview Tips:**
- Three levels of immutability with increasing restrictions
- `preventExtensions()`: no new properties
- `seal()`: no new properties, no property deletion
- `freeze()`: no new properties, no property deletion, no property modification
- All are shallow (nested objects remain mutable)
- Use recursive approaches for deep freezing
- Attempting forbidden operations fails silently in non-strict mode, throws TypeError in strict mode

### 5. Prototype Manipulation

#### `Object.getPrototypeOf()` and `Object.setPrototypeOf()`

Gets or sets the prototype of an object.

```javascript
// Creating objects with different prototypes
const animal = {
  makeSound() {
    return 'Some sound';
  }
};

const dog = {
  bark() {
    return 'Woof!';
  }
};

// Setting prototype
Object.setPrototypeOf(dog, animal);

console.log(dog.makeSound()); // 'Some sound'
console.log(dog.bark());      // 'Woof!'

// Getting prototype
const proto = Object.getPrototypeOf(dog);
console.log(proto === animal); // true

// Check prototype chain
function isInPrototypeChain(obj, prototype) {
  let current = Object.getPrototypeOf(obj);
  
  while (current !== null) {
    if (current === prototype) return true;
    current = Object.getPrototypeOf(current);
  }
  
  return false;
}

console.log(isInPrototypeChain(dog, animal)); // true
console.log(isInPrototypeChain(dog, Object.prototype)); // true
```

**Interview Tips:**
- `Object.create()` is preferred over `setPrototypeOf()` for performance reasons
- Changing an object's prototype is slow and should be avoided when possible
- Used for reflection and understanding inheritance relationships
- Part of JavaScript's prototype-based inheritance system
- `__proto__` is a deprecated accessor property that should be avoided

### 6. Object Inspection and Comparison

#### `Object.is()`

Determines if two values are the same value, with special handling for edge cases.

```javascript
// Basic comparisons
console.log(Object.is(42, 42));           // true
console.log(Object.is('foo', 'foo'));     // true
console.log(Object.is({}, {}));           // false (different objects)

// Special cases where Object.is differs from ===
console.log(Object.is(0, -0));            // false
console.log(0 === -0);                    // true

console.log(Object.is(NaN, NaN));         // true
console.log(NaN === NaN);                 // false

// Comparing object references
const obj = { a: 1 };
const sameObj = obj;
console.log(Object.is(obj, sameObj));     // true

// Custom equality function that handles nested objects
function deepEqual(obj1, obj2) {
  // Check if primitives or same reference
  if (obj1 === obj2) return true;
  
  // Check if either is null/undefined or not objects
  if (obj1 == null || obj2 == null || 
      typeof obj1 !== 'object' || typeof obj2 !== 'object') {
    return Object.is(obj1, obj2);
  }
  
  // Check if same constructor (Array, Object, etc)
  if (obj1.constructor !== obj2.constructor) return false;
  
  // Compare keys
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  
  if (keys1.length !== keys2.length) return false;
  
  // Check each key recursively
  return keys1.every(key => 
    keys2.includes(key) && deepEqual(obj1[key], obj2[key])
  );
}

console.log(deepEqual({a: 1, b: {c: 2}}, {a: 1, b: {c: 2}})); // true
```

**Interview Tips:**
- Similar to `===` but with special handling for `NaN` and signed zeros
- `Object.is(NaN, NaN)` is `true` while `NaN === NaN` is `false`
- `Object.is(0, -0)` is `false` while `0 === -0` is `true`
- Does not perform type coercion
- Not suitable for deep object comparison (requires custom implementation)
- Added in ES6

### 7. Utility Methods

#### `Object.fromEntries()`

Transforms a list of key-value pairs into an object (reverse of `Object.entries()`).

```javascript
// Convert array of entries to object
const entries = [
  ['name', 'John'],
  ['age', 30],
  ['city', 'New York']
];

const person = Object.fromEntries(entries);
console.log(person); // {name: 'John', age: 30, city: 'New York'}

// Convert Map to object
const map = new Map([
  ['name', 'Alice'],
  ['age', 25]
]);

const mapAsObj = Object.fromEntries(map);
console.log(mapAsObj); // {name: 'Alice', age: 25}

// Transform object properties
const prices = { apple: 2.5, banana: 1.5, orange: 3 };
const discountedPrices = Object.fromEntries(
  Object.entries(prices).map(([key, value]) => [key, value * 0.9])
);

console.log(discountedPrices); // {apple: 2.25, banana: 1.35, orange: 2.7}
```

**Interview Tips:**
- Added in ES2019 as the counterpart to `Object.entries()`
- Works with any iterable that produces key-value pairs
- Useful for transforming objects via entries → map → fromEntries pattern
- Common use cases: converting Maps to objects, transforming object properties
- Keys are always converted to strings (except for Symbols)

#### `Object.hasOwn()` (ES2022)

Checks if an object has a specific own property (not inherited).

```javascript
const person = {
  name: 'John',
  age: 30
};

// Using Object.hasOwn (ES2022)
console.log(Object.hasOwn(person, 'name'));      // true
console.log(Object.hasOwn(person, 'toString'));  // false (inherited)

// Older alternatives
console.log(person.hasOwnProperty('name'));      // true
console.log(Object.prototype.hasOwnProperty.call(person, 'name')); // true

// Edge cases
const noProto = Object.create(null);
noProto.prop = 'exists';

// These fail because noProto has no prototype
// console.log(noProto.hasOwnProperty('prop')); // Error!

// These work correctly
console.log(Object.hasOwn(noProto, 'prop'));     // true
console.log(Object.prototype.hasOwnProperty.call(noProto, 'prop')); // true
```

**Interview Tips:**
- Safer than `obj.hasOwnProperty()` (works with objects that have no prototype)
- Preferred over `Object.prototype.hasOwnProperty.call(obj, prop)`
- Only checks own properties, not inherited ones
- Added in ES2022 as a more ergonomic replacement for the older pattern
- Important for safely checking object properties

### Performance Considerations and Best Practices

```javascript
// 1. Property access performance
const obj = { a: 1, b: 2, c: 3 };

// Direct property access is fastest
const a = obj.a;

// Dynamic property access is slightly slower
const prop = 'b';
const b = obj[prop];

// 2. Avoid extending Object.prototype
// BAD: Extending native prototypes
Object.prototype.customMethod = function() { /* ... */ };
// This pollutes all objects and can cause unexpected behavior

// GOOD: Use utility functions or wrapper classes
function customMethod(obj) { /* ... */ }

// 3. Use Object.create(null) for pure dictionaries
const dict = Object.create(null);
dict.key = 'value';
// No inherited properties, no prototype methods

// 4. Prefer object literals for simple objects
const config = { debug: true, timeout: 1000 };

// 5. Use computed property names for dynamic keys
const propName = 'dynamicKey';
const obj2 = {
  [propName]: 'value',
  [`computed_${propName}`]: 'another value'
};
```

**Interview Tips:**
- Property access via dot notation is slightly faster than bracket notation
- Avoid extending built-in prototypes ("prototype pollution")
- Use `Object.create(null)` for pure dictionaries with no inherited properties
- Object literals are more readable and optimized by engines
- Modern JavaScript features like computed properties and shorthand syntax improve code quality
- Understand property descriptors for fine-grained control
- Use appropriate methods based on whether you need own or inherited properties

### `this` Keyword Behavior

The value of `this` depends on how a function is called.

#### 1. Global Context
```javascript
console.log(this);  // Window object (browser) or global object (Node.js)
```

#### 2. Function Context
```javascript
function showThis() {
  console.log(this);
}

showThis();  // Window object (browser) or global object (Node.js)

// In strict mode
"use strict";
function strictShowThis() {
  console.log(this);
}

strictShowThis();  // undefined
```

#### 3. Method Context
```javascript
const person = {
  name: "John",
  greet() {
    console.log(`Hello, I'm ${this.name}`);
  }
};

person.greet();  // "Hello, I'm John" (this refers to person object)

// Method reference problem
const greetFunction = person.greet;
greetFunction();  // "Hello, I'm undefined" (this is now global)
```

#### 4. Constructor Context
```javascript
function Person(name) {
  this.name = name;
  this.greet = function() {
    console.log(`Hello, I'm ${this.name}`);
  };
}

const john = new Person("John");
john.greet();  // "Hello, I'm John" (this refers to john instance)
```

#### 5. Event Handlers
```javascript
button.addEventListener("click", function() {
  console.log(this);  // button element
});

button.addEventListener("click", () => {
  console.log(this);  // Window object (lexical this)
});
```

#### Controlling `this`

##### call()
```javascript
function greet() {
  console.log(`Hello, I'm ${this.name}`);
}

const person = { name: "John" };
greet.call(person);  // "Hello, I'm John"
```

##### apply()
```javascript
function introduce(greeting, punctuation) {
  console.log(`${greeting}, I'm ${this.name}${punctuation}`);
}

const person = { name: "John" };
introduce.apply(person, ["Hello", "!"]);  // "Hello, I'm John!"
```

##### bind()
```javascript
function greet() {
  console.log(`Hello, I'm ${this.name}`);
}

const person = { name: "John" };
const boundGreet = greet.bind(person);
boundGreet();  // "Hello, I'm John"

// Partial application
function multiply(a, b) {
  return a * b;
}

const double = multiply.bind(null, 2);
double(5);  // 10
```

**Interview Tips:**
- `this` is determined at runtime, not lexically (except arrow functions)
- Common source of bugs and interview questions
- Arrow functions capture lexical `this`
- `bind()` permanently sets `this`, while `call()`/`apply()` are temporary
