# Understanding the JavaScript Event Loop

## Table of Contents
1. [JavaScript Runtime Model](#javascript-runtime-model)
2. [Call Stack](#call-stack)
3. [Heap](#heap)
4. [Callback Queue (Task Queue)](#callback-queue)
5. [Microtask Queue](#microtask-queue)
6. [Event Loop](#event-loop)
7. [Macrotasks vs Microtasks](#macrotasks-vs-microtasks)
8. [Rendering Pipeline](#rendering-pipeline)
9. [Common Patterns and Pitfalls](#common-patterns-and-pitfalls)
10. [Performance Considerations](#performance-considerations)
11. [Node.js Event Loop](#nodejs-event-loop)
12. [Best Practices](#best-practices)

## JavaScript Runtime Model

JavaScript is single-threaded, meaning it can only execute one piece of code at a time. The event loop is what allows JavaScript to handle asynchronous operations despite being single-threaded.

```javascript
// Simplified model of JavaScript runtime
const runtime = {
    callStack: [],      // Where function calls are pushed and executed
    heap: {},           // Where objects are allocated
    callbackQueue: [],  // Callbacks from Web APIs (setTimeout, DOM events, etc.)
    microtaskQueue: []  // High-priority callbacks (Promises, MutationObserver)
};
```

## Call Stack

The call stack is a LIFO (Last In, First Out) stack that keeps track of function calls.

```javascript
function first() {
    console.log('Entering first()');
    second();
    console.log('Leaving first()');
}

function second() {
    console.log('Entering second()');
    third();
    console.log('Leaving second()');
}

function third() {
    console.log('Entering third()');
    console.log('Hello from third()');
    console.log('Leaving third()');
}

console.log('Start of script');
first();
console.log('End of script');

// Output:
// Start of script
// Entering first()
// Entering second()
// Entering third()
// Hello from third()
// Leaving third()
// Leaving second()
// Leaving first()
// End of script
```

### Stack Overflow
```javascript
// This will cause a stack overflow
function infiniteRecursion() {
    infiniteRecursion();
}

// Uncomment to see the error (be careful, it will crash your page/tab)
// infiniteRecursion();
```

## Heap

The heap is a region of memory where objects are allocated. Variables hold references to these objects.

```javascript
// Objects are allocated in the heap
const user = { name: 'Alice' };  // Object created in heap, 'user' references it
let anotherUser = user;          // Both variables reference the same object
anotherUser.name = 'Bob';
console.log(user.name); // 'Bob' - both references point to the same object
```

## Callback Queue (Task Queue)

When asynchronous operations complete, their callbacks are placed in the callback queue.

```javascript
console.log('Script start');

setTimeout(() => {
    console.log('setTimeout callback');
}, 0);

// Some synchronous code
for (let i = 0; i < 3; i++) {
    console.log('Loop iteration', i);
}

console.log('Script end');

// Output:
// Script start
// Loop iteration 0
// Loop iteration 1
// Loop iteration 2
// Script end
// setTimeout callback
```

## Microtask Queue

Microtasks have higher priority than regular tasks (macrotasks) and are executed after the current operation completes but before the next event loop tick.

```javascript
console.log('Script start');

// Macrotask (goes to callback queue)
setTimeout(() => {
    console.log('setTimeout callback');
}, 0);

// Microtask (goes to microtask queue)
Promise.resolve().then(() => {
    console.log('Promise resolved');
});

console.log('Script end');

// Output:
// Script start
// Script end
// Promise resolved    <- Microtask executed before next event loop tick
// setTimeout callback <- Macrotask executed on next event loop tick
```

## Event Loop

The event loop continuously checks:
1. If the call stack is empty
2. If there are any microtasks to execute
3. If the call stack is still empty, it checks the callback queue
4. Moves callbacks from the queue to the call stack when it's empty

```javascript
console.log('Start');

// Macrotask
setTimeout(() => {
    console.log('setTimeout 1');
    
    // Nested Promise (still a microtask)
    Promise.resolve().then(() => {
        console.log('Promise inside setTimeout');
    });
}, 0);

// Microtask
Promise.resolve().then(() => {
    console.log('Promise 1');
    
    // Nested setTimeout (still a macrotask)
    setTimeout(() => {
        console.log('setTimeout inside Promise');
    }, 0);
});

console.log('End');

// Output:
// Start
// End
// Promise 1                   <- Microtask
// setTimeout 1                <- Macrotask
// Promise inside setTimeout   <- Microtask from first macrotask
// setTimeout inside Promise   <- Macrotask from first microtask
```

## Macrotasks vs Microtasks

### Macrotasks
- Examples: `setTimeout`, `setInterval`, `setImmediate` (Node.js), `requestAnimationFrame` (browser), I/O operations
- Added to the callback queue
- Executed on the next event loop iteration
## Example with Multiple Queues

```javascript
console.log('Script start');

setTimeout(() => {
  console.log('setTimeout');
}, 0);

Promise.resolve()
  .then(() => {
    console.log('Promise 1');
  })
  .then(() => {
    console.log('Promise 2');
  });

console.log('Script end');

// Output:
// Script start
// Script end
// Promise 1
// Promise 2
// setTimeout
```

## Key Points
- JavaScript runs one task at a time (single-threaded)
- The event loop continuously checks the call stack and queues
- Microtasks have higher priority than macrotasks
- Long-running tasks can block the main thread (UI freezes)
