# JavaScript Developer Interview Questions (ES6+ Features)

## ES6+ Features

15. **Explain the major features introduced in ES6.**
    - Template Literals, Destructuring, Spread Operator, Rest Parameters, etc.
    
    **Description:** ES6 (ECMAScript 2015) introduced many important features to JavaScript. Template literals use backticks (`) to allow embedding expressions within strings and easily create multi-line strings. Destructuring assignment provides a concise way to extract values from arrays or objects and assign them to variables. The spread operator (...) expands elements of arrays or objects into other arrays/objects or as function arguments. Rest parameters collect the remaining arguments passed to a function into an array. Other ES6 features include arrow functions, classes, let/const variable declarations, default parameters, module system, and Promises. These features make code more concise and readable, and facilitate functional programming patterns.
    
    **Example:**
    ```javascript
    // 1. Template Literals
    const name = 'John';
    const age = 30;
    
    // ES5
    const messageES5 = 'My name is ' + name + ' and I am ' + age + ' years old.';
    
    // ES6 Template Literals
    const messageES6 = `My name is ${name} and I am ${age} years old.`;
    console.log(messageES6); // "My name is John and I am 30 years old."
    
    // Multi-line strings
    const multiline = `This is line 1.
    This is line 2.
    This is line 3.`;
    console.log(multiline);
    // "This is line 1.
    //  This is line 2.
    //  This is line 3."
    
    // 2. Destructuring
    // Object destructuring
    const person = {
      firstName: 'John',
      lastName: 'Doe',
      country: 'USA',
      job: 'Developer'
    };
    
    // ES5
    const firstNameES5 = person.firstName;
    const lastNameES5 = person.lastName;
    
    // ES6 object destructuring
    const { firstName, lastName, country: nation, job: profession } = person;
    console.log(firstName); // "John"
    console.log(lastName); // "Doe"
    console.log(nation); // "USA" (renamed variable)
    console.log(profession); // "Developer" (renamed variable)
    
    // Array destructuring
    const colors = ['red', 'green', 'blue', 'yellow'];
    
    // ES5
    const firstColorES5 = colors[0];
    const secondColorES5 = colors[1];
    
    // ES6 array destructuring
    const [firstColor, secondColor, , fourthColor] = colors;
    console.log(firstColor); // "red"
    console.log(secondColor); // "green"
    console.log(fourthColor); // "yellow" (skipped third element)
    
    // Function parameter destructuring
    function displayPerson({ firstName, lastName, age = 25 }) {
      console.log(`${firstName} ${lastName} is ${age} years old.`);
    }
    
    displayPerson({ firstName: 'Jane', lastName: 'Smith' }); // "Jane Smith is 25 years old."
    
    // 3. Spread Operator
    // Array copying
    const arr1 = [1, 2, 3];
    const arr2 = [...arr1, 4, 5]; // [1, 2, 3, 4, 5]
    
    // Merging arrays
    const arr3 = [6, 7];
    const combinedArray = [...arr1, ...arr3]; // [1, 2, 3, 6, 7]
    
    // Object spreading
    const obj1 = { a: 1, b: 2 };
    const obj2 = { ...obj1, c: 3, b: 3 }; // { a: 1, b: 3, c: 3 } (b is overwritten)
    
    // Using in function calls
    function sum(a, b, c) {
      return a + b + c;
    }
    
    const numbers = [1, 2, 3];
    console.log(sum(...numbers)); // 6
    
    // 4. Rest Parameters
    // ES5 arguments object
    function sumES5() {
      let total = 0;
      for (let i = 0; i < arguments.length; i++) {
        total += arguments[i];
      }
      return total;
    }
    
    // ES6 rest parameters
    function sumES6(...numbers) {
      return numbers.reduce((total, num) => total + num, 0);
    }
    
    console.log(sumES6(1, 2, 3, 4, 5)); // 15
    
    // Rest parameters with other parameters
    function greet(name = 'Guest', greeting = 'Hello') {
      return `${greeting}, ${name}!`;
    }
    
    console.log(greet()); // "Hello, Guest!"
    console.log(greet('John')); // "Hello, John!"
    console.log(greet('Jane', 'Hi')); // "Hi, Jane!"
    ```

16. **Explain the module system in JavaScript.**
    - What are the differences between CommonJS and ES modules?
    - How do you use dynamic imports?
    
    **Description:** JavaScript modules are a way to organize code into reusable, independent units. There are two main module systems: CommonJS (used in Node.js) and ES modules (ECMAScript standard). CommonJS uses `require()` for imports and `module.exports` or `exports` for exports, loads modules synchronously, and resolves modules at runtime. ES modules use `import` and `export` statements, support static analysis, load modules asynchronously, and resolve imports at parse time. ES modules also support named exports, default exports, and re-exporting. Dynamic imports (`import()`) allow loading modules on demand, returning a Promise that resolves to the module namespace object. This enables code splitting, conditional loading, and better performance through lazy loading.
    
    **Example:**
    ```javascript
    // 1. CommonJS module system (Node.js)
    
    // math.js (CommonJS)
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
    
    // app.js (CommonJS)
    const math = require('./math');
    console.log(math.add(5, 3)); // 8
    
    // Destructuring import
    const { subtract } = require('./math');
    console.log(subtract(10, 4)); // 6
    
    // 2. ES module system (browsers and modern Node.js)
    
    // math.js (ES module)
    export function add(a, b) {
      return a + b;
    }
    
    export function subtract(a, b) {
      return a - b;
    }
    
    // Default export
    export default function multiply(a, b) {
      return a * b;
    }
    
    // app.js (ES module)
    import multiply, { add, subtract } from './math.js';
    
    console.log(add(5, 3)); // 8
    console.log(subtract(10, 4)); // 6
    console.log(multiply(2, 3)); // 6
    
    // Importing all exports as a namespace
    import * as math from './math.js';
    console.log(math.add(5, 3)); // 8
    console.log(math.default(2, 3)); // 6 (default export)
    
    // Re-exporting
    export { add, subtract } from './math.js';
    
    // 3. Dynamic imports
    // Loading a module on demand
    document.getElementById('loadButton').addEventListener('click', async () => {
      try {
        // Dynamic import returns a Promise
        const module = await import('./feature.js');
        
        // Use the module
        module.initFeature();
        
        // UI update
        document.getElementById('result').textContent = 'Module loaded successfully!';
      } catch (error) {
        console.error('Failed to load module:', error);
      }
    });
    
    // Conditional module loading
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
    
    // Usage example
    loadFeature('calculator')
      .then(module => {
        module.init();
      })
      .catch(error => {
        console.error('Error loading feature:', error);
      });
    ```

17. **Describe important JavaScript features introduced after ES6.**
    - Key features from ES2016 to ES2022
    
    **Description:** JavaScript has continued to evolve with new features after ES6. ES2016 introduced the exponentiation operator (**) and Array.includes(). ES2017 added async/await for cleaner asynchronous code, Object.entries/values, string padding methods, and trailing commas in function parameters. ES2018 brought rest/spread properties for objects, asynchronous iteration, Promise.finally(), and RegExp improvements. ES2019 added Array.flat/flatMap, Object.fromEntries, string trimStart/trimEnd, and optional catch binding. ES2020 introduced the nullish coalescing operator (??), optional chaining (?.), BigInt for large integers, dynamic imports, and the globalThis object. ES2021 added String.replaceAll, Promise.any, logical assignment operators, and numeric separators. ES2022 introduced class fields (public, private, static), top-level await, Error.cause, and the at() method for indexable objects.
    
    **Example:**
    ```javascript
    // ES2016 (ES7)
    
    // 1. Array.includes()
    const fruits = ['apple', 'banana', 'orange'];
    console.log(fruits.includes('banana')); // true
    console.log(fruits.includes('grape')); // false
    
    // 2. Exponentiation operator (**)
    console.log(2 ** 3); // 8 (2 to the power of 3)
    console.log(Math.pow(2, 3)); // 8 (same result)
    
    // ES2017 (ES8)
    
    // 1. async/await
    async function fetchUserData() {
      try {
        const response = await fetch('https://api.example.com/users/1');
        const user = await response.json();
        return user;
      } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
      }
    }
    
    // 2. Object.entries() and Object.values()
    const person = { name: 'John', age: 30, job: 'developer' };
    
    console.log(Object.values(person)); // ['John', 30, 'developer']
    
    for (const [key, value] of Object.entries(person)) {
      console.log(`${key}: ${value}`);
    }
    // "name: John"
    // "age: 30"
    // "job: developer"
    
    // 3. String padding
    const accountNumber = '42';
    console.log(accountNumber.padStart(10, '0')); // "0000000042"
    console.log(accountNumber.padEnd(10, '*')); // "42********"
    
    // 4. Promise.finally()
    fetch('https://api.example.com/data')
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error))
      .finally(() => console.log('Request completed')); // Runs regardless of success/failure
    
    // ES2019 (ES10)
    
    // 1. Array.flat() and Array.flatMap()
    const nestedArray = [1, 2, [3, 4, [5, 6]]];
    console.log(nestedArray.flat()); // [1, 2, 3, 4, [5, 6]]
    console.log(nestedArray.flat(2)); // [1, 2, 3, 4, 5, 6]
    
    const sentences = ['Hello world', 'How are you'];
    const words = sentences.flatMap(sentence => sentence.split(' '));
    console.log(words); // ['Hello', 'world', 'How', 'are', 'you']
    
    // 2. Object.fromEntries()
    const entries = [['name', 'John'], ['age', 30]];
    const obj = Object.fromEntries(entries);
    console.log(obj); // { name: 'John', age: 30 }
    
    // 3. String.trimStart() and String.trimEnd()
    const text = '   Hello world   ';
    console.log(text.trimStart()); // "Hello world   "
    console.log(text.trimEnd()); // "   Hello world"
    
    // ES2020 (ES11)
    
    // 1. Optional Chaining (?.)
    const user = {
      profile: {
        address: {
          street: 'Main St'
        }
      }
    };
    
    // Without optional chaining
    const street1 = user && user.profile && user.profile.address && user.profile.address.street;
    
    // With optional chaining
    const street2 = user?.profile?.address?.street;
    console.log(street2); // 'Main St'
    
    // 2. Nullish Coalescing Operator (??)
    const foo = null ?? 'default'; // 'default'
    const bar = 0 ?? 'default'; // 0 (0 is falsy but not null or undefined)
    const baz = '' ?? 'default'; // '' (empty string is falsy but not null or undefined)
    
    // 3. BigInt
    const bigNumber = 9007199254740991n; // BigInt literal
    const anotherBigNumber = BigInt('9007199254740991');
    console.log(bigNumber + 1n); // 9007199254740992n
    
    // 4. globalThis
    console.log(globalThis); // Points to global object (window in browsers, global in Node.js)
    
    // ES2021 (ES12)
    
    // 1. String.replaceAll()
    const message = 'hello world, hello universe';
    console.log(message.replaceAll('hello', 'hi')); // "hi world, hi universe"
    
    // 2. Promise.any()
    Promise.any([
      fetch('https://api.example.com/endpoint-1'),
      fetch('https://api.example.com/endpoint-2'),
      fetch('https://api.example.com/endpoint-3')
    ])
      .then(response => response.json())
      .then(data => console.log('First successful response:', data))
      .catch(error => console.error('All promises failed:', error));
    
    // 3. Logical Assignment Operators
    let x = 0;
    x ||= 5; // x = x || 5 (x becomes 5 because 0 is falsy)
    
    let y = 1;
    y &&= 5; // y = y && 5 (y becomes 5 because 1 is truthy)
    
    let z = null;
    z ??= 5; // z = z ?? 5 (z becomes 5 because z is null)
    
    // 4. Numeric Separators
    const billion = 1_000_000_000; // More readable
    const bytes = 0b1010_0001_1000_0101; // Binary with separators
    
    // ES2022 (ES13)
    
    // 1. Class Fields
    class Counter {
      // Public instance field
      count = 0;
      
      // Private instance field
      #privateValue = 42;
      
      increment() {
        this.count++;
        return this.count;
      }
      
      getPrivateValue() {
        return this.#privateValue;
      }
      
      // Static field
      static staticField = 'static value';
    }
    
    const counter = new Counter();
    console.log(counter.count); // 0
    console.log(counter.increment()); // 1
    console.log(counter.getPrivateValue()); // 42
    console.log(Counter.staticField); // 'static value'
    
    // 2. Top-level await
    // In modules, await can be used outside of async functions
    // import { fetchData } from './api.js';
    // const data = await fetchData(); // No need for async function wrapper
    
    // 3. Error cause
    try {
      throw new Error('Failed to fetch data', { cause: 'Network error' });
    } catch (error) {
      console.error(error.message); // 'Failed to fetch data'
      console.error(error.cause); // 'Network error'
    }
    ```

18. **What is the Symbol type and how is it used?**
    
    **Description:** Symbol is a primitive data type introduced in ES6 that represents a unique and immutable value, primarily used as object property keys to avoid name collisions. Each Symbol value is unique, even if created with the same description. Symbols are not automatically converted to strings when used with most operators and are not enumerated in for...in loops or Object.keys(). They can be used to define "hidden" properties that won't be accidentally overwritten. JavaScript has built-in Symbols called well-known Symbols (like Symbol.iterator, Symbol.hasInstance) that allow you to customize object behavior in various language constructs. Symbols are useful for metaprogramming, creating private or semi-private object members, and defining special object behaviors.
    
    **Example:**
    ```javascript
    // Creating Symbols
    const sym1 = Symbol();
    const sym2 = Symbol('description'); // Optional description for debugging
    const sym3 = Symbol('description'); // Another Symbol with the same description
    
    console.log(sym2 === sym3); // false - Symbols are always unique
    
    // Using Symbols as property keys
    const user = {
      name: 'John',
      [sym1]: 'This is a symbol property'
    };
    
    console.log(user.name); // "John"
    console.log(user[sym1]); // "This is a symbol property"
    
    // Symbols are not enumerable in normal ways
    console.log(Object.keys(user)); // ["name"] - Symbol property not included
    console.log(Object.getOwnPropertyNames(user)); // ["name"] - Symbol property not included
    
    // To get Symbol properties
    console.log(Object.getOwnPropertySymbols(user)); // [Symbol()]
    
    // Symbol.for - global Symbol registry
    const globalSym1 = Symbol.for('globalSymbol');
    const globalSym2 = Symbol.for('globalSymbol');
    
    console.log(globalSym1 === globalSym2); // true - same Symbol from registry
    
    // Get key from global Symbol
    console.log(Symbol.keyFor(globalSym1)); // "globalSymbol"
    console.log(Symbol.keyFor(sym1)); // undefined - not in global registry
    
    // Well-known Symbols
    // Symbol.iterator - make an object iterable
    const iterableObject = {
      items: ['a', 'b', 'c'],
      
      [Symbol.iterator]: function* () {
        for (let item of this.items) {
          yield item;
        }
      }
    };
    
    for (const item of iterableObject) {
      console.log(item); // "a", "b", "c"
    }
    
    // Symbol.toStringTag - customize object's toString behavior
    class CustomClass {
      get [Symbol.toStringTag]() {
        return 'CustomClass';
      }
    }
    
    const obj = new CustomClass();
    console.log(obj.toString()); // "[object CustomClass]"
    
    // Using Symbols for semi-private properties
    const _hidden = Symbol('hidden');
    
    class PrivateData {
      constructor() {
        this[_hidden] = 'This is private data';
      }
      
      getPrivateData() {
        return this[_hidden];
      }
    }
    
    const instance = new PrivateData();
    console.log(instance.getPrivateData()); // "This is private data"
    console.log(instance[_hidden]); // "This is private data" (still accessible if you have the Symbol)
    ```

19. **Explain iterators and generators in JavaScript.**
    
    **Description:** Iterators are interfaces for traversing collections, returning the next element through the `next()` method. Iterables are objects implementing the `Symbol.iterator` method, usable in `for...of` loops and with spread operators. Arrays, strings, Maps, and Sets are built-in iterables. Generators are special functions that create iterators, allowing function execution to be paused and resumed later. They are defined with the `function*` syntax and use the `yield` keyword to produce values. Generators are useful for memory-efficient data processing, asynchronous programming, creating infinite sequences, and easily implementing iterable objects without complex state management.
    
    **Example:**
    ```javascript
    // 1. Implementing an Iterator
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
    
    // 2. Implementing an Iterable object
    const customIterable = {
      data: [1, 2, 3],
      
      // Implement Symbol.iterator method
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
    
    // Use for...of loop with iterable object
    for (const item of customIterable) {
      console.log(item); // 1, 2, 3
    }
    
    // Use spread operator
    const array = [...customIterable]; // [1, 2, 3]
    
    // 3. Generator functions
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
    
    // Implementing an iterable object using a generator
    const iterableWithGenerator = {
      data: [1, 2, 3],
      
      // Use generator function for Symbol.iterator
      *[Symbol.iterator]() {
        for (const item of this.data) {
          yield item;
        }
      }
    };
    
    for (const item of iterableWithGenerator) {
      console.log(item); // 1, 2, 3
    }
    
    // 4. Creating infinite sequences
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
    
    // 5. Async generators
    async function* fetchUsers(userIds) {
      for (const id of userIds) {
        const response = await fetch(`https://api.example.com/users/${id}`);
        const user = await response.json();
        yield user;
      }
    }
    
    // Using async generators
    async function processUsers() {
      const userGenerator = fetchUsers([1, 2, 3]);
      
      for await (const user of userGenerator) {
        console.log(user);
      }
    }
    ```
