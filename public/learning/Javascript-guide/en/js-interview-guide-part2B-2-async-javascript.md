# JavaScript Interview Guide: Part 2B-2 - Asynchronous JavaScript

## Asynchronous JavaScript

Understanding asynchronous JavaScript is crucial for modern web development and is a common focus in technical interviews.

### Callbacks

Callbacks are functions passed as arguments to other functions, to be executed after a certain operation completes.

#### Basic Callback Pattern
```javascript
function fetchData(callback) {
  // Simulate API call with setTimeout
  setTimeout(() => {
    const data = { id: 1, name: 'Product' };
    callback(data);
  }, 1000);
}

fetchData((data) => {
  console.log('Data received:', data);
});
console.log('Fetching data...');

// Output:
// Fetching data...
// (after 1 second) Data received: { id: 1, name: 'Product' }
```

#### Error-First Callback Pattern (Node.js style)
```javascript
function readFile(path, callback) {
  // Simulate file reading
  setTimeout(() => {
    if (path.includes('invalid')) {
      callback(new Error('File not found'));
    } else {
      const content = 'File content here';
      callback(null, content);
    }
  }, 1000);
}

readFile('valid.txt', (error, data) => {
  if (error) {
    console.error('Error:', error.message);
    return;
  }
  console.log('File content:', data);
});
```

#### Callback Hell
```javascript
getUserData(userId, (user) => {
  getFriends(user.id, (friends) => {
    getPhotos(user.id, (photos) => {
      getPosts(user.id, (posts) => {
        // Deeply nested callbacks
        displayProfile({
          user,
          friends,
          photos,
          posts
        });
      }, handleError);
    }, handleError);
  }, handleError);
}, handleError);
```

**Solutions to Callback Hell:**
1. **Named Functions**
   ```javascript
   function handleUser(user) {
     getFriends(user.id, handleFriends, handleError);
   }
   
   function handleFriends(friends) {
     getPhotos(user.id, handlePhotos, handleError);
   }
   
   // And so on...
   
   getUserData(userId, handleUser, handleError);
   ```

2. **Promises** (see next section)
3. **Async/await** (see later section)

**Interview Tips:**
- Callbacks are the foundation of asynchronous JavaScript
- Error-first pattern is standard in Node.js
- Callback hell leads to code that's hard to read and maintain
- Modern alternatives (promises, async/await) are preferred
- Still important to understand as many libraries still use them

### Promises

Promises provide a cleaner way to handle asynchronous operations and avoid callback hell.

#### Promise States
1. **Pending**: Initial state, neither fulfilled nor rejected
2. **Fulfilled**: Operation completed successfully
3. **Rejected**: Operation failed
4. **Settled**: Either fulfilled or rejected (not pending anymore)

#### Creating Promises
```javascript
// Creating a promise
const fetchData = new Promise((resolve, reject) => {
  // Asynchronous operation
  setTimeout(() => {
    const success = Math.random() > 0.3;
    if (success) {
      resolve({ id: 1, name: 'Product' });
    } else {
      reject(new Error('Failed to fetch data'));
    }
  }, 1000);
});

// Using the promise
fetchData
  .then(data => {
    console.log('Data received:', data);
  })
  .catch(error => {
    console.error('Error:', error.message);
  })
  .finally(() => {
    console.log('Operation completed');
  });
```

#### Promise Methods

##### Promise.then()
```javascript
fetchData.then(
  // onFulfilled handler
  (data) => {
    console.log('Success:', data);
  },
  // onRejected handler (optional)
  (error) => {
    console.error('Error:', error);
  }
);
```

##### Promise.catch()
```javascript
fetchData
  .then(data => {
    console.log('Success:', data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
```

##### Promise.finally()
```javascript
fetchData
  .then(data => {
    console.log('Success:', data);
  })
  .catch(error => {
    console.error('Error:', error);
  })
  .finally(() => {
    // Runs regardless of success or failure
    console.log('Clean up resources');
  });
```

#### Promise Chaining
```javascript
// Converting callback hell to promise chain
getUserData(userId)
  .then(user => {
    return getFriends(user.id);
  })
  .then(friends => {
    return getPhotos(userId);
  })
  .then(photos => {
    return getPosts(userId);
  })
  .then(posts => {
    displayProfile({
      user,
      friends,
      photos,
      posts
    });
  })
  .catch(error => {
    handleError(error);
  });

// More concise with implicit returns
getUserData(userId)
  .then(user => getFriends(user.id))
  .then(friends => getPhotos(userId))
  .then(photos => getPosts(userId))
  .then(posts => {
    displayProfile({ user, friends, photos, posts });
  })
  .catch(handleError);
```

#### Promise Static Methods

##### Promise.all()
Waits for all promises to resolve, or rejects if any promise rejects.

```javascript
const promises = [
  fetch('/api/users'),
  fetch('/api/posts'),
  fetch('/api/comments')
];

Promise.all(promises)
  .then(([users, posts, comments]) => {
    // All promises resolved
    console.log(users, posts, comments);
  })
  .catch(error => {
    // At least one promise rejected
    console.error('Error:', error);
  });
```

##### Promise.race()
Resolves or rejects as soon as one of the promises resolves or rejects.

```javascript
const promise1 = new Promise(resolve => setTimeout(() => resolve('First'), 500));
const promise2 = new Promise(resolve => setTimeout(() => resolve('Second'), 100));

Promise.race([promise1, promise2])
  .then(result => {
    console.log(result);  // 'Second' (it's faster)
  });
```

##### Promise.allSettled()
Waits for all promises to settle (resolve or reject).

```javascript
const promises = [
  fetch('/api/users'),
  Promise.reject('Error in posts'),
  fetch('/api/comments')
];

Promise.allSettled(promises)
  .then(results => {
    // Array of objects with status and value/reason
    results.forEach(result => {
      if (result.status === 'fulfilled') {
        console.log('Fulfilled:', result.value);
      } else {
        console.log('Rejected:', result.reason);
      }
    });
  });
```

##### Promise.any()
Resolves as soon as one of the promises resolves, or rejects if all promises reject.

```javascript
const promises = [
  new Promise((resolve, reject) => setTimeout(() => reject(new Error('Error 1')), 100)),
  new Promise((resolve, reject) => setTimeout(() => resolve('Success'), 200)),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error('Error 3')), 300))
];

Promise.any(promises)
  .then(result => {
    console.log(result);  // 'Success'
  })
  .catch(error => {
    console.log(error);  // AggregateError if all promises reject
  });
```

**Interview Tips:**
- Promises solve the callback hell problem
- A promise represents a future value
- Once settled, a promise cannot change its state
- Error handling with `.catch()` is more elegant than error callbacks
- Know the differences between Promise.all, Promise.race, Promise.allSettled, and Promise.any

### Async/Await

Async/await is syntactic sugar over promises, making asynchronous code look and behave more like synchronous code.

#### Basic Syntax
```javascript
async function fetchUserData() {
  try {
    const response = await fetch('/api/user');
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
}

// Using the async function
fetchUserData()
  .then(userData => {
    console.log('User data:', userData);
  })
  .catch(error => {
    console.error('Failed to get user data:', error);
  });
```

#### Converting Promise Chains to Async/Await
```javascript
// Promise chain
function getProfileData(userId) {
  return getUserData(userId)
    .then(user => {
      return Promise.all([
        Promise.resolve(user),
        getFriends(user.id),
        getPhotos(userId),
        getPosts(userId)
      ]);
    })
    .then(([user, friends, photos, posts]) => {
      return {
        user,
        friends,
        photos,
        posts
      };
    });
}

// Async/await version
async function getProfileData(userId) {
  const user = await getUserData(userId);
  const [friends, photos, posts] = await Promise.all([
    getFriends(user.id),
    getPhotos(userId),
    getPosts(userId)
  ]);
  
  return {
    user,
    friends,
    photos,
    posts
  };
}
```

#### Error Handling
```javascript
// Using try/catch
async function fetchData() {
  try {
    const response = await fetch('/api/data');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    // Handle error or rethrow
    throw error;
  } finally {
    // Clean up resources
    console.log('Fetch operation completed');
  }
}

// Alternative: Let caller handle errors
async function fetchData() {
  const response = await fetch('/api/data');
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
}

// Caller handles errors
fetchData()
  .then(data => console.log(data))
  .catch(error => console.error(error));
```

#### Parallel vs Sequential Execution
```javascript
// Sequential execution (slower)
async function sequential() {
  console.time('sequential');
  
  const result1 = await slowOperation1();
  const result2 = await slowOperation2();
  const result3 = await slowOperation3();
  
  console.timeEnd('sequential');
  return [result1, result2, result3];
}

// Parallel execution (faster)
async function parallel() {
  console.time('parallel');
  
  const [result1, result2, result3] = await Promise.all([
    slowOperation1(),
    slowOperation2(),
    slowOperation3()
  ]);
  
  console.timeEnd('parallel');
  return [result1, result2, result3];
}
```

#### Async IIFE (Immediately Invoked Function Expression)
```javascript
(async () => {
  try {
    const data = await fetchData();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
})();
```

**Interview Tips:**
- `async` functions always return a promise
- `await` can only be used inside `async` functions
- Error handling with try/catch is more intuitive than promise chains
- Be aware of sequential vs parallel execution
- Top-level await is supported in ES modules (modern browsers and Node.js)
- Async/await doesn't replace promises; it's built on top of them

### Event Loop

The event loop is the mechanism that allows JavaScript to perform non-blocking operations despite being single-threaded.

#### Components of the Event Loop

1. **Call Stack**: Where JavaScript code execution happens
2. **Web APIs**: Browser features like setTimeout, fetch, DOM events
3. **Callback Queue**: Where callbacks wait to be executed
4. **Microtask Queue**: Higher priority queue for promises
5. **Event Loop**: Checks if call stack is empty, then moves callbacks to it

#### Event Loop Flow
```javascript
console.log('Start');

setTimeout(() => {
  console.log('Timeout callback');
}, 0);

Promise.resolve()
  .then(() => {
    console.log('Promise callback 1');
  })
  .then(() => {
    console.log('Promise callback 2');
  });

console.log('End');

// Output:
// Start
// End
// Promise callback 1
// Promise callback 2
// Timeout callback
```

**Explanation:**
1. `console.log('Start')` executes and is removed from the call stack
2. `setTimeout` callback is registered with Web APIs and moved to the callback queue
3. Promise callbacks are registered and moved to the microtask queue
4. `console.log('End')` executes and is removed from the call stack
5. Call stack is empty, event loop checks microtask queue first
6. Promise callbacks execute (microtasks have priority)
7. Event loop checks callback queue and executes setTimeout callback

#### Microtasks vs Macrotasks

**Microtasks:**
- Promise callbacks (.then, .catch, .finally)
- queueMicrotask()
- MutationObserver callbacks
- process.nextTick() (Node.js)

**Macrotasks:**
- setTimeout, setInterval callbacks
- setImmediate() (Node.js)
- requestAnimationFrame()
- I/O operations
- UI rendering

**Order of Execution:**
1. Execute all tasks in the call stack
2. Execute all microtasks
3. Execute one macrotask
4. Execute all microtasks again
5. Repeat steps 3-4

```javascript
console.log('Script start');

setTimeout(() => {
  console.log('setTimeout 1');
  
  new Promise(resolve => resolve())
    .then(() => console.log('Promise inside setTimeout'));
    
  setTimeout(() => {
    console.log('setTimeout inside setTimeout');
  }, 0);
}, 0);

new Promise(resolve => {
  console.log('Promise executor');
  resolve();
})
  .then(() => console.log('Promise then 1'))
  .then(() => console.log('Promise then 2'));

console.log('Script end');

// Output:
// Script start
// Promise executor
// Script end
// Promise then 1
// Promise then 2
// setTimeout 1
// Promise inside setTimeout
// setTimeout inside setTimeout
```

**Interview Tips:**
- JavaScript is single-threaded but can handle asynchronous operations via the event loop
- Understanding the event loop is crucial for debugging timing issues
- Microtasks have priority over macrotasks
- Each "tick" of the event loop processes all microtasks but only one macrotask
- Common interview question: predict the output of code with mixed async operations

### setTimeout/setInterval

`setTimeout` and `setInterval` are Web APIs that allow scheduling code execution after a delay or at regular intervals.

#### setTimeout
```javascript
// Basic usage
setTimeout(() => {
  console.log('Executed after delay');
}, 1000);  // 1000ms = 1 second

// With parameters
setTimeout((name, greeting) => {
  console.log(`${greeting}, ${name}!`);
}, 1000, 'John', 'Hello');

// Clearing a timeout
const timeoutId = setTimeout(() => {
  console.log('This will not run');
}, 1000);

clearTimeout(timeoutId);
```

#### setInterval
```javascript
// Basic usage
const intervalId = setInterval(() => {
  console.log('Executed every second');
}, 1000);

// Stopping after 5 seconds
setTimeout(() => {
  clearInterval(intervalId);
  console.log('Interval stopped');
}, 5000);
```

#### Zero Delay setTimeout
```javascript
console.log('Before setTimeout');

setTimeout(() => {
  console.log('Inside setTimeout');
}, 0);

console.log('After setTimeout');

// Output:
// Before setTimeout
// After setTimeout
// Inside setTimeout
```

**Explanation:** Even with a delay of 0ms, the callback is still placed in the callback queue and executed after the current call stack is empty.

#### Implementing setInterval with setTimeout
```javascript
function customSetInterval(callback, delay) {
  let id;
  
  function repeat() {
    id = setTimeout(() => {
      callback();
      repeat();
    }, delay);
  }
  
  repeat();
  
  return {
    clear: () => clearTimeout(id)
  };
}

const interval = customSetInterval(() => {
  console.log('Custom interval');
}, 1000);

// Later
interval.clear();
```

#### Debounce and Throttle

**Debounce:** Execute function only after a certain amount of time has passed without it being called.

```javascript
function debounce(func, delay) {
  let timeoutId;
  
  return function(...args) {
    clearTimeout(timeoutId);
    
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// Usage
const debouncedSearch = debounce((query) => {
  console.log(`Searching for: ${query}`);
}, 300);

// Call multiple times rapidly
debouncedSearch('a');
debouncedSearch('ap');
debouncedSearch('app');
debouncedSearch('appl');
debouncedSearch('apple');
// Only the last one executes after 300ms: "Searching for: apple"
```

**Throttle:** Limit the number of times a function can be called in a given time period.

```javascript
function throttle(func, limit) {
  let inThrottle = false;
  
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

// Usage
const throttledScroll = throttle(() => {
  console.log('Scroll event handled');
}, 1000);

// Attach to scroll event
window.addEventListener('scroll', throttledScroll);
// Will log at most once per second regardless of scroll frequency
```

**Interview Tips:**
- `setTimeout` and `setInterval` are not part of JavaScript itself but Web APIs
- Minimum delay is not guaranteed (depends on call stack and browser throttling)
- Nested `setTimeout` vs `setInterval`: nested setTimeout guarantees the delay between executions
- Debounce and throttle are common interview questions and practical techniques
- Know the difference: debounce resets the timer, throttle ignores calls during cooldown
