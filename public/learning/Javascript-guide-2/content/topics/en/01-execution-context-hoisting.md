# Execution Context & Hoisting

## Execution Context
JavaScript code runs inside an execution context, which is essentially the environment where the code is executed. There are three main components to every execution context:

1. **Variable Environment (VariableObject)**:
   - Stores variables, function declarations, and function parameters
   - Created during the creation phase of the execution context
   - In global scope, it's the global object (window in browsers)
   - In function scope, it contains arguments object and local variables

2. **Lexical Environment**:
   - Determines how and where the code was written
   - Contains the environment record (actual variable storage)
   - Has a reference to the outer environment (scope chain)
   - Used for variable lookup during execution

3. **`this` Binding**:
   - Determined when the function is called
   - In global context: `window` (browser) or `global` (Node.js)
   - In function context: depends on how the function is called
   - Can be explicitly set using `call()`, `apply()`, or `bind()`

### Types of Execution Context:
- **Global Execution Context**: Created when the script first runs
- **Function Execution Context**: Created when a function is called
- **Eval Execution Context**: Created inside an `eval` function

### Execution Context Lifecycle:
1. **Creation Phase**:
   - Create the Variable Object (VO)
   - Set up the scope chain
   - Determine the value of `this`

2. **Execution Phase**:
   - Assign values to variables
   - Execute the code

## Hoisting
Hoisting is JavaScript's default behavior of moving declarations to the top of their containing scope during the compilation phase, before the code is executed. This means that variables and function declarations are processed before any code is executed.

### How Hoisting Works:
1. **Compilation Phase**:
   - JavaScript engine scans the code for variable and function declarations
   - Allocates memory for these declarations
   - Initializes function declarations in memory
   - Initializes `var` variables as `undefined` (temporal dead zone for `let`/`const`)

2. **Execution Phase**:
   - The code is executed line by line
   - Assignments and other executable code are processed
   - Function expressions are only defined when the execution reaches them

```javascript
// Variable Hoisting
console.log(x); // undefined (not ReferenceError)
var x = 5;
// What's happening:
// 1. During compilation: var x is hoisted and initialized with undefined
// 2. During execution: console.log runs, then x is assigned 5

// Function Declaration Hoisting
sayHello(); // "Hello!" - works because the entire function is hoisted
function sayHello() {
  console.log("Hello!");
}

// Function Expression Hoisting
sayHi(); // TypeError: sayHi is not a function
var sayHi = function() {
  console.log("Hi!");
};
// Why it fails:
// 1. var sayHi is hoisted and initialized as undefined
// 2. Trying to invoke undefined as a function causes TypeError

// Let and Const Hoisting (Temporal Dead Zone)
console.log(y); // ReferenceError: Cannot access 'y' before initialization
let y = 10;

// What's happening with let/const:
// 1. They are hoisted but not initialized
// 2. Accessing them before declaration throws a ReferenceError
// 3. This is called the Temporal Dead Zone (TDZ)

// Class Hoisting
const p = new Person(); // ReferenceError: Cannot access 'Person' before initialization
class Person {}
// Classes are not hoisted, they remain in TDZ until declaration

### Key Points and Best Practices

#### Variable Declarations:
- **`var`**:
  - Hoisted to the top of their function or global scope
  - Initialized with `undefined`
  - Can be redeclared and updated
  - Function-scoped

- **`let`/`const`**:
  - Hoisted but not initialized (Temporal Dead Zone)
  - `let` can be updated but not redeclared
  - `const` cannot be updated or redeclared
  - Block-scoped

#### Function Declarations vs Expressions:
- **Function Declarations**:
  ```javascript
  function example() {}
  ```
  - Fully hoisted with their definition
  - Can be called before declaration

- **Function Expressions**:
  ```javascript
  const example = function() {};
  ```
  - Follow variable hoisting rules
  - Cannot be called before assignment

#### Temporal Dead Zone (TDZ):
- The period between entering scope and the declaration is processed
- Applies to `let`, `const`, and `class`
- Accessing variables in TDZ throws a ReferenceError

#### Best Practices:
1. Always declare variables before using them
2. Use `const` by default, `let` when reassignment is needed
3. Avoid using `var` in modern JavaScript
4. Keep function declarations at the top of their scope
5. Be aware of TDZ when using `let`/`const`

#### Common Pitfalls:
1. Assuming `let`/`const` aren't hoisted (they are, but in TDZ)
2. Using variables before declaration (can lead to unexpected `undefined`)
3. Redeclaring variables in the same scope
4. Not initializing `const` variables during declaration

#### Advanced Example:
```javascript
function hoistingExample() {
    // All these variables are hoisted
    console.log(hoistedVar);      // undefined
    console.log(hoistedLet);      // ReferenceError
    console.log(hoistedFunc);     // undefined
    console.log(hoistedFuncExp);  // undefined
    
    var hoistedVar = 'I am var';
    let hoistedLet = 'I am let';
    
    function hoistedFunc() {
        return 'I am a function declaration';
    }
    
    var hoistedFuncExp = function() {
        return 'I am a function expression';
    };
    
    // Class declarations are not hoisted
    const instance = new ExampleClass(); // ReferenceError
    class ExampleClass {}
}
```
