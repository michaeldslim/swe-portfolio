# JavaScript Interview Guide: Part 2B-1 - ES6+ Features

## ES6+ Features

ES6 (ECMAScript 2015) and later versions introduced many powerful features that modernized JavaScript. Understanding these features is crucial for JavaScript interviews.

### Destructuring

Destructuring allows you to extract values from arrays or properties from objects into distinct variables.

#### Array Destructuring
```javascript
// Basic array destructuring
const numbers = [1, 2, 3, 4, 5];
const [first, second, ...rest] = numbers;

console.log(first);  // 1
console.log(second); // 2
console.log(rest);   // [3, 4, 5]

// Skipping elements
const colors = ['red', 'green', 'blue'];
const [, , tertiary] = colors;
console.log(tertiary);  // 'blue'

// Default values
const incomplete = [1];
const [a = 0, b = 0] = incomplete;
console.log(a, b);  // 1, 0

// Swapping variables
let x = 5, y = 10;
[x, y] = [y, x];
console.log(x, y);  // 10, 5
```

#### Object Destructuring
```javascript
// Basic object destructuring
const person = {
  name: 'John',
  age: 30,
  city: 'New York',
  country: 'USA'
};

const { name, age } = person;
console.log(name, age);  // 'John', 30

// Assigning to new variable names
const { name: fullName, age: years } = person;
console.log(fullName, years);  // 'John', 30

// Default values
const incomplete = { name: 'Jane' };
const { name: userName, age: userAge = 25 } = incomplete;
console.log(userName, userAge);  // 'Jane', 25

// Nested destructuring
const metadata = {
  title: 'JavaScript',
  translations: {
    es: 'JavaScript',
    fr: 'JavaScript',
    ja: 'ジャバスクリプト'
  }
};

const { title, translations: { ja: japaneseTitle } } = metadata;
console.log(title);         // 'JavaScript'
console.log(japaneseTitle); // 'ジャバスクリプト'
```

#### Function Parameter Destructuring
```javascript
// Object parameter destructuring
function printPerson({ name, age, city = 'Unknown' }) {
  console.log(`${name}, ${age}, ${city}`);
}

printPerson({ name: 'John', age: 30 });  // 'John, 30, Unknown'
printPerson({ name: 'Jane', age: 25, city: 'London' });  // 'Jane, 25, London'

// Array parameter destructuring
function printCoordinates([x, y, z = 0]) {
  console.log(`X: ${x}, Y: ${y}, Z: ${z}`);
}

printCoordinates([10, 20]);       // 'X: 10, Y: 20, Z: 0'
printCoordinates([5, 15, 25]);    // 'X: 5, Y: 15, Z: 25'
```

**Interview Tips:**
- Destructuring makes code more readable and concise
- Useful for working with API responses
- Can lead to errors if the structure doesn't match expectations
- Combine with default values for more robust code

### Spread/Rest Operators

The `...` syntax serves two purposes: spreading elements (spread operator) and collecting elements (rest operator).

#### Spread Operator
```javascript
// Array spreading
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2];
console.log(combined);  // [1, 2, 3, 4, 5, 6]

// Copying arrays
const original = [1, 2, 3];
const copy = [...original];
copy.push(4);
console.log(original);  // [1, 2, 3] (unchanged)
console.log(copy);      // [1, 2, 3, 4]

// Object spreading
const defaults = { theme: 'light', fontSize: 12 };
const userPrefs = { fontSize: 14 };
const settings = { ...defaults, ...userPrefs };
console.log(settings);  // { theme: 'light', fontSize: 14 }

// Spreading in function calls
const numbers = [5, 2, 8, 1, 4];
console.log(Math.max(...numbers));  // 8
```

#### Rest Operator
```javascript
// Rest in array destructuring
const [first, ...remaining] = [1, 2, 3, 4, 5];
console.log(first);      // 1
console.log(remaining);  // [2, 3, 4, 5]

// Rest in object destructuring
const { id, ...details } = { id: 123, name: 'Product', price: 29.99, stock: 10 };
console.log(id);       // 123
console.log(details);  // { name: 'Product', price: 29.99, stock: 10 }

// Rest parameters in functions
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3, 4, 5));  // 15
```

**Interview Tips:**
- Spread is for expanding, rest is for collecting
- Spread creates shallow copies (nested objects are still referenced)
- Rest must be the last parameter in function definitions
- Useful for creating flexible function signatures

### Template Literals

Template literals provide an improved way to work with strings, supporting multi-line strings and string interpolation.

```javascript
// Basic template literal
const name = 'John';
const greeting = `Hello, ${name}!`;
console.log(greeting);  // 'Hello, John!'

// Expressions in template literals
const a = 5;
const b = 10;
console.log(`Sum: ${a + b}, Product: ${a * b}`);  // 'Sum: 15, Product: 50'

// Multi-line strings
const multiLine = `
  This is a
  multi-line
  string.
`;
console.log(multiLine);
// '
//   This is a
//   multi-line
//   string.
// '

// Tagged templates
function highlight(strings, ...values) {
  return strings.reduce((result, str, i) => {
    const value = values[i] || '';
    return `${result}${str}<strong>${value}</strong>`;
  }, '');
}

const name = 'John';
const age = 30;
const highlighted = highlight`My name is ${name} and I am ${age} years old.`;
console.log(highlighted);
// 'My name is <strong>John</strong> and I am <strong>30</strong> years old.'
```

**Interview Tips:**
- More readable than string concatenation
- Support for expressions and function calls inside `${}`
- Tagged templates allow custom string processing
- Used extensively in libraries like styled-components

### Default Parameters

Default parameters allow function parameters to have default values if no value or `undefined` is passed.

```javascript
// Basic default parameters
function greet(name = 'Guest', greeting = 'Hello') {
  return `${greeting}, ${name}!`;
}

console.log(greet());                  // 'Hello, Guest!'
console.log(greet('John'));            // 'Hello, John!'
console.log(greet('Jane', 'Welcome')); // 'Welcome, Jane!'

// Expressions as default values
function getDate(timestamp = Date.now()) {
  return new Date(timestamp);
}

// Parameters can use previous parameters
function createUser(id, name, role = 'user', department = getDepartment(role)) {
  return { id, name, role, department };
}

function getDepartment(role) {
  return role === 'admin' ? 'IT' : 'General';
}
```

**Behavior with Different Values:**
```javascript
function test(a = 1, b = 2) {
  console.log(a, b);
}

test();          // 1, 2
test(3);         // 3, 2
test(undefined); // 1, 2
test(null);      // null, 2 (null is a valid value, not triggering default)
```

**Interview Tips:**
- Only triggered when parameter is `undefined` or not provided
- Can reference earlier parameters or external functions
- Useful for making functions more flexible and robust
- Can lead to unexpected behavior with falsy values

### Classes

ES6 introduced class syntax, providing a cleaner way to implement constructor functions and prototypal inheritance.

```javascript
// Basic class
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  greet() {
    return `Hello, I'm ${this.name}`;
  }
  
  static createAnonymous() {
    return new Person('Anonymous', 0);
  }
}

const john = new Person('John', 30);
console.log(john.greet());  // 'Hello, I'm John'

const anonymous = Person.createAnonymous();
console.log(anonymous.name);  // 'Anonymous'
```

#### Class Inheritance
```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    return `${this.name} makes a noise.`;
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);  // Call parent constructor
    this.breed = breed;
  }
  
  speak() {
    return `${this.name} barks.`;
  }
  
  fetch() {
    return `${this.name} fetches the ball.`;
  }
}

const rex = new Dog('Rex', 'German Shepherd');
console.log(rex.speak());  // 'Rex barks.'
console.log(rex.fetch());  // 'Rex fetches the ball.'
```

#### Private Class Features (ES2022)
```javascript
class BankAccount {
  // Private field
  #balance = 0;
  
  constructor(initialBalance) {
    if (initialBalance > 0) {
      this.#balance = initialBalance;
    }
  }
  
  // Public methods
  deposit(amount) {
    if (amount > 0) {
      this.#balance += amount;
      return true;
    }
    return false;
  }
  
  withdraw(amount) {
    if (amount > 0 && amount <= this.#balance) {
      this.#balance -= amount;
      return true;
    }
    return false;
  }
  
  getBalance() {
    return this.#balance;
  }
  
  // Private method
  #calculateInterest() {
    return this.#balance * 0.01;
  }
  
  addMonthlyInterest() {
    const interest = this.#calculateInterest();
    this.#balance += interest;
    return interest;
  }
}

const account = new BankAccount(1000);
account.deposit(500);
console.log(account.getBalance());  // 1500
console.log(account.#balance);      // SyntaxError: Private field
```

#### Getters and Setters
```javascript
class Circle {
  #radius = 0;
  
  constructor(radius) {
    this.radius = radius;  // Uses the setter
  }
  
  get radius() {
    return this.#radius;
  }
  
  set radius(value) {
    if (value >= 0) {
      this.#radius = value;
    } else {
      throw new Error('Radius cannot be negative');
    }
  }
  
  get diameter() {
    return this.#radius * 2;
  }
  
  get area() {
    return Math.PI * this.#radius ** 2;
  }
}

const circle = new Circle(5);
console.log(circle.radius);   // 5
console.log(circle.diameter); // 10
console.log(circle.area);     // ~78.54

circle.radius = 10;
console.log(circle.diameter); // 20

circle.radius = -1;  // Error: Radius cannot be negative
```

**Interview Tips:**
- Classes are syntactic sugar over prototypal inheritance
- `super()` must be called before using `this` in derived class constructors
- Static methods belong to the class, not instances
- Private fields provide true encapsulation
- Getters/setters allow computed properties and validation

### Modules (import/export)

ES6 modules provide a standard way to organize and share code between JavaScript files.

#### Named Exports
```javascript
// math.js
export const PI = 3.14159;

export function add(a, b) {
  return a + b;
}

export function multiply(a, b) {
  return a * b;
}

// Alternative syntax
const subtract = (a, b) => a - b;
const divide = (a, b) => a / b;

export { subtract, divide };
```

#### Default Export
```javascript
// person.js
export default class Person {
  constructor(name) {
    this.name = name;
  }
  
  greet() {
    return `Hello, I'm ${this.name}`;
  }
}

// Or for a single function
export default function formatDate(date) {
  // implementation
}
```

#### Importing
```javascript
// Named imports
import { PI, add, multiply } from './math.js';
console.log(PI);           // 3.14159
console.log(add(2, 3));    // 5

// Renaming imports
import { add as sum, multiply as product } from './math.js';
console.log(sum(2, 3));    // 5

// Default import
import Person from './person.js';
const john = new Person('John');

// Importing both default and named exports
import Person, { validateName } from './person.js';

// Importing all exports as a namespace
import * as MathUtils from './math.js';
console.log(MathUtils.PI);        // 3.14159
console.log(MathUtils.add(2, 3)); // 5
```

#### Dynamic Imports
```javascript
// Dynamic import (returns a Promise)
async function loadModule() {
  try {
    const mathModule = await import('./math.js');
    console.log(mathModule.add(2, 3));  // 5
  } catch (error) {
    console.error('Failed to load module:', error);
  }
}

// Alternative with .then()
import('./math.js')
  .then(mathModule => {
    console.log(mathModule.add(2, 3));  // 5
  })
  .catch(error => {
    console.error('Failed to load module:', error);
  });
```

**Interview Tips:**
- Modules use strict mode by default
- Each module has its own scope
- Imports are hoisted
- Dynamic imports allow code splitting and lazy loading
- Circular dependencies can cause issues
- Browser support requires `type="module"` in script tags
