# Scope & Closures

## Scope in JavaScript
Scope determines the visibility and accessibility of variables and functions in different parts of your code. JavaScript has several types of scope:

### 1. Global Scope
Variables declared outside any function or block have global scope.

```javascript
// Global scope
const globalVar = 'I\'m global';
let globalLet = 'I\'m also global';
var globalVarOld = 'I\'m hoisted global';

function checkGlobal() {
    console.log(globalVar);      // Accessible
    console.log(globalLet);      // Accessible
    console.log(globalVarOld);   // Accessible
}
```

### 2. Function Scope
Variables declared with `var` inside a function are scoped to that function.

```javascript
function functionScope() {
    var functionScoped = 'I\'m function scoped';
    if (true) {
        var stillFunctionScoped = 'I\'m also function scoped';
    }
    console.log(functionScoped);      // Accessible
    console.log(stillFunctionScoped); // Also accessible
}
// console.log(functionScoped); // ReferenceError
```

### 3. Block Scope
Variables declared with `let` and `const` are block-scoped.

```javascript
function blockScope() {
    if (true) {
        let blockLet = 'I\'m block scoped';
        const blockConst = 'Me too';
        console.log(blockLet);   // Accessible
        console.log(blockConst); // Accessible
    }
    // console.log(blockLet);    // ReferenceError
    // console.log(blockConst);  // ReferenceError
}
```

### 4. Lexical Scope (Static Scope)
JavaScript uses lexical scoping, meaning the scope is determined by the position within the source code.

```javascript
const outerVar = 'I\'m outside';

function outer() {
    const outerVar = 'I\'m in outer';
    
    function inner() {
        console.log(outerVar); // 'I\'m in outer' (looks up the scope chain)
    }
    
    inner();
}

outer();
```

### 5. Scope Chain
When a variable is used, JavaScript looks for it in the current scope and then up the chain of outer scopes.

```javascript
const globalVar = 'global';

function outer() {
    const outerVar = 'outer';
    
    function inner() {
        const innerVar = 'inner';
        
        console.log(innerVar);  // 'inner' (from current scope)
        console.log(outerVar);  // 'outer' (from outer scope)
        console.log(globalVar); // 'global' (from global scope)
        // console.log(notDefined); // ReferenceError
    }
    
    inner();
}

outer();
```

## Closures in Depth

A closure is a function that has access to its own scope, the outer function's variables, and the global variables, even after the outer function has finished executing.

### How Closures Work

```javascript
function outerFunction() {
    const outerVar = 'I\'m from outer';
    
    // This inner function is a closure
    return function innerFunction() {
        console.log(outerVar); // Remembers outerVar
    };
}

const myClosure = outerFunction();
myClosure(); // 'I\'m from outer'
```

### Practical Examples

#### 1. Data Encapsulation
```javascript
function createBankAccount(initialBalance) {
    let balance = initialBalance;
    
    return {
        deposit: function(amount) {
            if (amount > 0) {
                balance += amount;
                return `Deposited $${amount}. New balance: $${balance}`;
            }
            return 'Invalid deposit amount';
        },
        withdraw: function(amount) {
            if (amount > 0 && amount <= balance) {
                balance -= amount;
                return `Withdrew $${amount}. Remaining balance: $${balance}`;
            }
            return 'Insufficient funds';
        },
        getBalance: function() {
            return `Current balance: $${balance}`;
        }
    };
}

const account = createBankAccount(1000);
console.log(account.getBalance());  // 'Current balance: $1000'
console.log(account.deposit(500));  // 'Deposited $500. New balance: $1500'
console.log(account.withdraw(200)); // 'Withdrew $200. Remaining balance: $1300'
// balance is not directly accessible from outside
```

#### 2. Function Factories
```javascript
function createMultiplier(factor) {
    return function(number) {
        return number * factor;
    };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5));  // 10
console.log(triple(5));  // 15
```

#### 3. Implementing Private Methods
```javascript
function createPerson(name) {
    let _name = name; // Private variable
    
    return {
        getName: function() {
            return _name;
        },
        setName: function(newName) {
            if (typeof newName === 'string' && newName.length > 0) {
                _name = newName;
            }
        }
    };
}

const person = createPerson('Alice');
console.log(person.getName()); // 'Alice'
person.setName('Bob');
console.log(person.getName()); // 'Bob'
// _name is not directly accessible
```

### Common Use Cases

1. **Data Privacy**
   - Create private variables and methods
   - Prevent namespace pollution
   - Implement the module pattern

2. **Function Factories**
   - Create specialized functions with preset parameters
   - Implement partial application

3. **Currying**
   - Transform a function with multiple arguments into a sequence of functions
   ```javascript
   function add(a) {
       return function(b) {
           return a + b;
       };
   }
   const add5 = add(5);
   console.log(add5(3)); // 8
   ```

4. **Event Handlers and Callbacks**
   ```javascript
   function setupButton(buttonId) {
       const button = document.getElementById(buttonId);
       let clickCount = 0;
       
       button.addEventListener('click', function() {
           clickCount++;
           console.log(`Button ${buttonId} clicked ${clickCount} times`);
       });
   }
   ```

5. **Memoization**
   ```javascript
   function memoize(fn) {
       const cache = {};
       return function(...args) {
           const key = JSON.stringify(args);
           if (!(key in cache)) {
               cache[key] = fn.apply(this, args);
           }
           return cache[key];
       };
   }
   
   const memoizedAdd = memoize((a, b) => a + b);
   console.log(memoizedAdd(2, 3)); // Calculates and caches
   console.log(memoizedAdd(2, 3)); // Returns cached result
   ```

### Potential Issues with Closures

1. **Memory Leaks**
   - Closures keep references to outer variables, which can prevent garbage collection
   - Solution: Nullify references when done
   ```javascript
   function processLargeData() {
       const largeData = /* ... */;
       
       // Process data
       
       // Clear reference when done
       largeData = null;
   }
   ```

2. **Unexpected Behavior in Loops**
   - Common issue with `var` in loops
   - Solution: Use `let` or IIFE
   ```javascript
   // Problem
   for (var i = 0; i < 3; i++) {
       setTimeout(function() {
           console.log(i); // Always logs 3
       }, 100);
   }
   
   // Solution 1: Use let
   for (let i = 0; i < 3; i++) {
       setTimeout(function() {
           console.log(i); // Logs 0, 1, 2
       }, 100);
   }
   
   // Solution 2: IIFE
   for (var i = 0; i < 3; i++) {
       (function(j) {
           setTimeout(function() {
               console.log(j); // Logs 0, 1, 2
           }, 100);
       })(i);
   }
   ```

### Best Practices

1. Use `let` and `const` instead of `var` to avoid unexpected scoping issues
2. Be mindful of memory usage with closures
3. Use closures for data encapsulation and privacy
4. Consider using modules for better code organization
5. Use meaningful variable names to make closures more maintainable
