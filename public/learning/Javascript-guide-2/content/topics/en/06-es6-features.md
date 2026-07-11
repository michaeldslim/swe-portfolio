# ES6+ Features

## Arrow Functions
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

## Destructuring

### Array Destructuring
```javascript
// Basic assignment
const [first, second, third] = [1, 2, 3];
console.log(first, second, third); // 1 2 3

// Skipping items
const [a, , c] = [1, 2, 3];
console.log(a, c); // 1 3

// Default values
const [x = 1, y = 2] = [10];
console.log(x, y); // 10 2

// Swapping variables
let a = 1, b = 2;
[a, b] = [b, a];
console.log(a, b); // 2 1
```

### Object Destructuring
```javascript
const user = {
    id: 1,
    name: 'Alice',
    age: 30,
    contact: {
        email: 'alice@example.com',
        phone: '123-456-7890'
    }
};

// Basic destructuring
const { name, age } = user;
console.log(name, age); // Alice 30

// Renaming variables
const { name: userName, age: userAge } = user;

// Nested destructuring
const { contact: { email, phone } } = user;

// Default values
const { country = 'USA' } = user;

// Function parameters
getUserInfo({ name, age }) {
    console.log(`${name} is ${age} years old`);
}
```

## Spread/Rest Operator

### Spread Operator
```javascript
// Arrays
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2]; // [1, 2, 3, 4, 5, 6]

// Objects (ES2018+)
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };
const merged = { ...obj1, ...obj2, e: 5 }; // { a: 1, b: 2, c: 3, d: 4, e: 5 }

// Function arguments
const numbers = [1, 2, 3];
console.log(Math.max(...numbers)); // 3
```

### Rest Parameters
```javascript
function sum(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3, 4)); // 10

// With other parameters
function greet(greeting, ...names) {
    return `${greeting} ${names.join(', ')}!`;
}

greet('Hello', 'Alice', 'Bob', 'Charlie'); // "Hello Alice, Bob, Charlie!"
```

## Default and Rest Parameters

### Default Parameters
```javascript
function createUser(name, role = 'user', isActive = true) {
    return { name, role, isActive };
}

console.log(createUser('Alice')); // { name: 'Alice', role: 'user', isActive: true }
console.log(createUser('Bob', 'admin')); // { name: 'Bob', role: 'admin', isActive: true }
```

### Rest Parameters with Destructuring
```javascript
function processUser({ name, age, ...rest }) {
    console.log(`Processing ${name}, age ${age}`);
    console.log('Additional info:', rest);
}

processUser({
    name: 'Alice',
    age: 30,
    city: 'New York',
    country: 'USA'
});
```

## Enhanced Object Literals

### Property Shorthand
```javascript
const name = 'Alice';
const age = 30;

const user = { name, age }; // { name: 'Alice', age: 30 }
```

### Method Shorthand
```javascript
const calculator = {
    // Old way
    add: function(a, b) { return a + b; },
    
    // New method shorthand
    subtract(a, b) {
        return a - b;
    },
    
    // Computed property names
    ['multiply' + 'Numbers'](a, b) {
        return a * b;
    }
};
```

## Modules

### Named Exports
```javascript
// math.js
export const PI = 3.14159;
export function square(x) { return x * x; }
export function cube(x) { return x * x * x; }

// Importing
import { PI, square } from './math.js';
console.log(multiply(2, 3));  // 6
```
