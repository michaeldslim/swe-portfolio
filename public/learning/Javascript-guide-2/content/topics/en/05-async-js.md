# Asynchronous JavaScript: A Comprehensive Guide

## Table of Contents
1. [Understanding the JavaScript Runtime](#understanding-the-javascript-runtime)
2. [Concurrency Model and Event Loop](#concurrency-model-and-event-loop)
3. [Callbacks and the Pyramid of Doom](#callbacks-and-the-pyramid-of-doom)
4. [Promises: The Modern Approach](#promises-the-modern-approach)
5. [Async/Await: Syntactic Sugar](#asyncawait-syntactic-sugar)
6. [Advanced Patterns](#advanced-patterns)
7. [Performance Considerations](#performance-considerations)
8. [Common Pitfalls and Best Practices](#common-pitfalls-and-best-practices)
9. [Real-world Examples](#real-world-examples)

## Understanding the JavaScript Runtime

JavaScript uses a single-threaded, non-blocking, asynchronous, concurrent programming model. Here's what that means:

- **Single-threaded**: Only one operation can be executed at a time
- **Non-blocking**: Long-running operations don't block the main thread
- **Asynchronous**: Code can be scheduled to run later
- **Concurrent**: Multiple operations can be in progress at the same time

### The Call Stack
JavaScript maintains a call stack (LIFO - Last In, First Out) that tracks the execution context of function calls.

### Memory Heap
Objects are allocated in a heap, which is just a name to denote a large (mostly unstructured) region of memory.

### Event Loop
Responsible for executing the code, collecting and processing events, and executing queued sub-tasks.

## Concurrency Model and Event Loop

### How Asynchronous Code Executes

```javascript
console.log('Script start');

setTimeout(() => {
    console.log('setTimeout');
}, 0);

Promise.resolve().then(() => {
    console.log('Promise resolved');
});

console.log('Script end');

// Output:
// Script start
// Script end
// Promise resolved
// setTimeout
```

### Event Loop Phases

1. **Call Stack**: Executes synchronous code
2. **Microtask Queue**: 
   - Processes after the current operation completes
   - Includes Promise callbacks and `process.nextTick`
   - Higher priority than macrotasks
3. **Macrotask Queue**: 
   - Processes after all microtasks are complete
   - Includes `setTimeout`, `setInterval`, I/O operations

### Visualizing the Event Loop

```javascript
console.log('1. Start');

setTimeout(() => console.log('2. Timeout (Macrotask)'), 0);

Promise.resolve()
    .then(() => console.log('3. Promise 1 (Microtask)'));

Promise.resolve()
    .then(() => {
        console.log('4. Promise 2 (Microtask)');
        return 'Nested';
    })
    .then(data => console.log(`5. ${data} Promise (Microtask)`));

console.log('6. End');

// Output Order:
// 1. Start
// 6. End
// 3. Promise 1 (Microtask)
// 4. Promise 2 (Microtask)
// 5. Nested Promise (Microtask)
// 2. Timeout (Macrotask)
```

### The Event Loop in Action

1. **Synchronous Code Execution**:
   - Logs '1. Start' and '6. End' to the console
   - Schedules timeout and promise callbacks

2. **Microtasks Processing**:
   - Processes all microtasks in the queue
   - Executes promise callbacks in order
   - Processes any new microtasks added during this phase

3. **Macrotasks Processing**:
   - Processes the next macrotask in the queue
   - In this case, the setTimeout callback

4. **Rendering**:
   - Browser performs rendering updates if needed
   - Then the cycle repeats

## Callbacks and the Pyramid of Doom

### The Callback Pattern

#### Node.js Error-First Pattern
```javascript
function readFile(path, callback) {
    // Simulate async file read
    setTimeout(() => {
        const success = Math.random() > 0.3;
        if (success) {
            const data = `Contents of ${path}`;
            callback(null, data); // First argument is error (null if no error)
        } else {
            callback(new Error('File read failed'));
        }
    }, 100);
}

// Usage
readFile('/path/to/file.txt', (error, data) => {
    if (error) {
        console.error('Error reading file:', error.message);
        return;
    }
    console.log('File contents:', data);
});
```

### Common Callback Patterns

#### 1. Sequential Execution
```javascript
function series(tasks, finalCallback) {
    let index = 0;
    
    function next(error, ...results) {
        if (error || index >= tasks.length) {
            return finalCallback(error, results);
        }
        
        const task = tasks[index++];
        task((error, result) => {
            results.push(result);
            next(error, ...results);
        });
    }
    
    next(null, []);
}

// Usage
series([
    callback => setTimeout(() => { console.log('Task 1'); callback(null, 1); }, 1000),
    callback => setTimeout(() => { console.log('Task 2'); callback(null, 2); }, 500),
    callback => setTimeout(() => { console.log('Task 3'); callback(null, 3); }, 200)
], (error, results) => {
    if (error) return console.error('Error in series:', error);
    console.log('All tasks completed:', results);
});
```

#### 2. Parallel Execution
```javascript
function parallel(tasks, finalCallback) {
    let completed = 0;
    const results = [];
    let hasError = false;
    
    tasks.forEach((task, index) => {
        task((error, result) => {
            if (hasError) return;
            
            if (error) {
                hasError = true;
                return finalCallback(error);
            }
            
            results[index] = result;
            completed++;
            
            if (completed === tasks.length) {
                finalCallback(null, results);
            }
        });
    });
}
```

### Avoiding Callback Hell

#### 1. Named Functions
```javascript
function handleUserData(error, user) {
    if (error) return handleError(error);
    getPosts(user.id, handlePosts);
}

function handlePosts(error, posts) {
    if (error) return handleError(error);
    getComments(posts[0].id, handleComments);
}

function handleComments(error, comments) {
    if (error) return handleError(error);
    console.log('Comments:', comments);
}

getUser(1, handleUserData);
```

#### 2. Using a Flow Control Library (like async.js)
```javascript
const async = require('async');

async.waterfall([
    callback => getUser(1, callback),
    (user, callback) => getPosts(user.id, (error, posts) => {
        if (error) return callback(error);
        callback(null, user, posts);
    }),
    (user, posts, callback) => {
        getComments(posts[0].id, (error, comments) => {
            if (error) return callback(error);
            callback(null, { user, posts, comments });
        });
    }
], (error, results) => {
    if (error) return console.error('Error in waterfall:', error);
    console.log('All data:', results);
});
```

### Error Handling in Callbacks

#### 1. Centralized Error Handler
```javascript
function handleError(error) {
    console.error('An error occurred:', error.message);
    // Additional error handling logic
}

function getUserData(userId, callback) {
    getUser(userId, (error, user) => {
        if (error) return handleError(error);
        
        getPosts(user.id, (error, posts) => {
            if (error) return handleError(error);
            
            getComments(posts[0].id, (error, comments) => {
                if (error) return handleError(error);
                
                callback(null, { user, posts, comments });
            });
        });
    });
}
```

#### 2. Using a Try/Catch Wrapper
```javascript
function asyncHandler(fn) {
    return function(...args) {
        const callback = args.pop();
        
        try {
            fn(...args, (error, result) => {
                try {
                    callback(error, result);
                } catch (err) {
                    console.error('Error in callback:', err);
                }
            });
        } catch (error) {
            callback(error);
        }
    };
}

// Usage
const safeFetchData = asyncHandler(fetchData);
safeFetchData('some-param', (error, result) => {
    if (error) return console.error('Error:', error);
    console.log('Result:', result);
});
```

### When to Use Callbacks

1. **Simple Asynchronous Operations**: For one-off async operations where Promises might be overkill
2. **Event Emitters**: When working with Node.js streams or event emitters
3. **Performance-Critical Code**: Where the overhead of Promises is not desirable
4. **Browser Compatibility**: When you need to support very old browsers without polyfills

## Promises: The Modern Approach

### Understanding Promises

A Promise represents the eventual completion (or failure) of an asynchronous operation and its resulting value. It can be in one of three states:
- **Pending**: Initial state, neither fulfilled nor rejected
- **Fulfilled**: The operation completed successfully
- **Rejected**: The operation failed

### Creating Promises

#### Basic Promise Creation
```javascript
function fetchUserData(userId) {
    return new Promise((resolve, reject) => {
        // Simulate API call
        setTimeout(() => {
            const users = {
                1: { id: 1, name: 'John Doe', role: 'admin' },
                2: { id: 2, name: 'Jane Smith', role: 'user' }
            };
            
            const user = users[userId];
            
            if (user) {
                resolve(user); // Resolve with user data
            } else {
                reject(new Error('User not found')); // Reject with error
            }
        }, 500);
    });
}

// Using the promise
fetchUserData(1)
    .then(user => {
        console.log('User data:', user);
        return user.role; // Return value is passed to next .then()
    })
    .then(role => {
        console.log('User role:', role);
    })
    .catch(error => {
        console.error('Error fetching user:', error.message);
    })
    .finally(() => {
        console.log('User data fetch operation completed');
    });
```

### Advanced Promise Patterns

#### 1. Promise Chaining
```javascript
function getUserProfile(userId) {
    return fetchUserData(userId)
        .then(user => {
            console.log('Fetched user:', user.name);
            return fetchUserPermissions(user.id);
        })
        .then(permissions => {
            console.log('User permissions:', permissions);
            return fetchUserPreferences(userId);
        })
        .then(preferences => {
            console.log('User preferences:', preferences);
            return { user, permissions, preferences };
        });
}

// Usage
getUserProfile(1)
    .then(profile => console.log('Complete profile:', profile))
    .catch(error => console.error('Error in profile loading:', error));
```

#### 2. Error Handling Strategies

##### a. Centralized Error Handling
```javascript
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}

function fetchWithRetry(url, retries = 3, backoff = 300) {
    return new Promise((resolve, reject) => {
        const attempt = (attemptsLeft) => {
            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new AppError(`HTTP error! status: ${response.status}`, response.status);
                    }
                    return response.json();
                })
                .then(resolve)
                .catch(error => {
                    if (attemptsLeft === 0) {
                        reject(new Error(`Max retries (${retries}) exceeded: ${error.message}`));
                        return;
                    }
                    
                    console.warn(`Attempt ${retries - attemptsLeft + 1} failed. Retrying in ${backoff}ms...`);
                    setTimeout(() => attempt(attemptsLeft - 1), backoff);
                });
        };
        
        attempt(retries);
    });
}
```

### Promise Static Methods

#### 1. Promise.all() - Parallel Execution
```javascript
function fetchMultipleResources() {
    const userPromise = fetch('/api/user/1').then(res => res.json());
    const postsPromise = fetch('/api/posts?userId=1').then(res => res.json());
    const notificationsPromise = fetch('/api/notifications?userId=1').then(res => res.json());
    
    return Promise.all([userPromise, postsPromise, notificationsPromise])
        .then(([user, posts, notifications]) => ({
            user,
            posts,
            notifications
        }));
}

// Usage
fetchMultipleResources()
    .then(data => console.log('All data loaded:', data))
    .catch(error => console.error('Error loading resources:', error));
```

#### 2. Promise.race() - First to Settle
```javascript
function fetchWithTimeout(url, timeout = 5000) {
    const fetchPromise = fetch(url).then(res => res.json());
    const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Request timed out')), timeout);
    });
    
    return Promise.race([fetchPromise, timeoutPromise]);
}
```

#### 3. Promise.allSettled() - Handle All Results
```javascript
async function fetchUserData(userIds) {
    const promises = userIds.map(id => 
        fetch(`/api/users/${id}`)
            .then(res => res.json())
            .catch(error => ({
                id,
                error: error.message,
                status: 'failed'
            }))
    );
    
    const results = await Promise.allSettled(promises);
    
    return results.map((result, index) => ({
        userId: userIds[index],
        status: result.status,
        ...(result.status === 'fulfilled' 
            ? { data: result.value }
            : { error: result.reason })
    }));
}
```

### Advanced Promise Techniques

#### 1. Promise Memoization
```javascript
function memoizeAsync(fn) {
    const cache = new Map();
    
    return function(...args) {
        const key = JSON.stringify(args);
        
        if (cache.has(key)) {
            return cache.get(key);
        }
        
        const promise = fn.apply(this, args)
            .then(result => {
                // Cache successful results
                cache.set(key, Promise.resolve(result));
                return result;
            })
            .catch(error => {
                // Don't cache errors
                cache.delete(key);
                throw error;
            });
            
        cache.set(key, promise);
        return promise;
    };
}

// Usage
const fetchUser = memoizeAsync(userId => 
    fetch(`/api/users/${userId}`).then(res => res.json())
);
```

#### 2. Promise Pool (Rate Limiting)
```javascript
class PromisePool {
    constructor(maxConcurrent) {
        this.maxConcurrent = maxConcurrent;
        this.queue = [];
        this.running = 0;
    }
    
    add(promiseFn) {
        return new Promise((resolve, reject) => {
            this.queue.push({
                promiseFn,
                resolve,
                reject
            });
            this.run();
        });
    }
    
    run() {
        while (this.queue.length > 0 && this.running < this.maxConcurrent) {
            const { promiseFn, resolve, reject } = this.queue.shift();
            this.running++;
            
            Promise.resolve()
                .then(() => promiseFn())
                .then(resolve)
                .catch(reject)
                .finally(() => {
                    this.running--;
                    this.run();
                });
        }
    }
}

// Usage
const pool = new PromisePool(3); // Max 3 concurrent promises

const urls = [/* array of 100 URLs */];
const results = await Promise.all(
    urls.map(url => 
        pool.add(() => 
            fetch(url).then(res => res.json())
        )
    )
);
```

### When to Use Promises

1. **Multiple Asynchronous Operations**: When you need to coordinate multiple async operations
2. **Better Error Handling**: When you want more robust error handling than callbacks
3. **Chaining Operations**: When you need to perform sequential async operations
4. **Modern APIs**: When working with modern web APIs that return Promises (Fetch API, Service Workers, etc.)

## Async/Await: Syntactic Sugar

Async/await is built on top of Promises and provides a more synchronous-looking way to work with asynchronous code. It makes asynchronous code easier to read and write.

### Basic Async/Await

#### Async Functions
An `async` function always returns a Promise. If the function returns a value, the Promise will be resolved with that value. If the function throws an exception, the Promise will be rejected.

```javascript
async function getUser(userId) {
    // The await keyword can only be used inside async functions
    const response = await fetch(`/api/users/${userId}`);
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const user = await response.json();
    return user; // This is equivalent to: return Promise.resolve(user);
}

// Using the async function
(async () => {
    try {
        const user = await getUser(1);
        console.log('User data:', user);
    } catch (error) {
        console.error('Error:', error.message);
    }
})();
```

### Error Handling

#### Try/Catch with Async/Await
```javascript
class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ValidationError';
    }
}

async function createUser(userData) {
    try {
        // Validate input
        if (!userData.name) {
            throw new ValidationError('Name is required');
        }
        
        // Make API call
        const response = await fetch('/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to create user');
        }
        
        return await response.json();
    } catch (error) {
        // Handle specific error types differently
        if (error instanceof ValidationError) {
            console.warn('Validation failed:', error.message);
            throw error; // Re-throw for the caller to handle
        } else if (error.name === 'AbortError') {
            console.warn('Request was aborted');
        } else {
            console.error('Unexpected error creating user:', error);
        }
        throw error; // Re-throw the error
    } finally {
        console.log('Create user operation completed');
    }
}
```

### Advanced Async Patterns

#### 1. Sequential vs Parallel Execution

##### Sequential Execution (One after another)
```javascript
async function processSequentially(items, processItem) {
    const results = [];
    for (const item of items) {
        const result = await processItem(item);
        results.push(result);
    }
    return results;
}

// Usage
const items = [1, 2, 3, 4, 5];
const results = await processSequentially(items, async (item) => {
    console.log(`Processing item ${item}`);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate work
    return item * 2;
});
console.log('Results:', results);
```

##### Parallel Execution (All at once)
```javascript
async function processInParallel(items, processItem, concurrency = 5) {
    // Process items in batches to avoid overwhelming the system
    const batches = [];
    for (let i = 0; i < items.length; i += concurrency) {
        const batch = items.slice(i, i + concurrency);
        batches.push(batch);
    }
    
    const results = [];
    for (const batch of batches) {
        const batchPromises = batch.map(item => 
            processItem(item).catch(error => ({
                item,
                error: error.message
            }))
        );
        
        const batchResults = await Promise.all(batchPromises);
        results.push(...batchResults);
    }
    
    return results;
}
```

#### 2. Async Iteration

##### for-await-of Loop
```javascript
async function* fetchComments(postIds) {
    for (const postId of postIds) {
        try {
            const response = await fetch(`/api/posts/${postId}/comments`);
            const comments = await response.json();
            yield { postId, comments };
        } catch (error) {
            console.error(`Failed to fetch comments for post ${postId}:`, error);
            yield { postId, error: error.message };
        }
    }
}

// Usage
(async () => {
    const postIds = [1, 2, 3, 4, 5];
    
    for await (const result of fetchComments(postIds)) {
        if (result.error) {
            console.warn(`Skipping post ${result.postId} due to error`);
            continue;
        }
        console.log(`Post ${result.postId} has ${result.comments.length} comments`);
    }
})();
```

### Real-world Examples

#### 1. File Upload with Progress
```javascript
async function uploadFile(file, url, onProgress) {
    const xhr = new XMLHttpRequest();
    
    // Create a promise that resolves when upload completes
    const uploadPromise = new Promise((resolve, reject) => {
        xhr.upload.addEventListener('progress', (event) => {
            if (event.lengthComputable) {
                const percentComplete = Math.round((event.loaded / event.total) * 100);
                onProgress(percentComplete);
            }
        });
        
        xhr.addEventListener('load', () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(JSON.parse(xhr.responseText));
            } else {
                reject(new Error(`Upload failed: ${xhr.statusText}`));
            }
        });
        
        xhr.addEventListener('error', () => {
            reject(new Error('Network error during upload'));
        });
        
        xhr.addEventListener('abort', () => {
            reject(new Error('Upload was cancelled'));
        });
    });
    
    // Start the upload
    const formData = new FormData();
    formData.append('file', file);
    
    xhr.open('POST', url, true);
    xhr.send(formData);
    
    try {
        const result = await uploadPromise;
        return { success: true, data: result };
    } catch (error) {
        return { success: false, error: error.message };
    } finally {
        // Clean up
        xhr.upload.removeEventListener('progress');
    }
}
```

#### 2. Rate-Limited API Client
```javascript
class RateLimitedAPIClient {
    constructor(requestsPerSecond = 5) {
        this.queue = [];
        this.requestsPerSecond = requestsPerSecond;
        this.processing = false;
        this.processQueue = this.processQueue.bind(this);
    }
    
    async request(endpoint, options = {}) {
        return new Promise((resolve, reject) => {
            this.queue.push({
                endpoint,
                options,
                resolve,
                reject,
                timestamp: Date.now()
            });
            
            if (!this.processing) {
                this.processQueue();
            }
        });
    }
    
    async processQueue() {
        if (this.queue.length === 0) {
            this.processing = false;
            return;
        }
        
        this.processing = true;
        const now = Date.now();
        const request = this.queue.shift();
        
        // Calculate delay to maintain rate limit
        const timeSinceLastRequest = now - (this.lastRequestTime || 0);
        const minDelay = 1000 / this.requestsPerSecond;
        const delay = Math.max(0, minDelay - timeSinceLastRequest);
        
        setTimeout(async () => {
            try {
                const response = await fetch(request.endpoint, request.options);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                request.resolve(data);
            } catch (error) {
                request.reject(error);
            } finally {
                this.lastRequestTime = Date.now();
                // Process next request
                this.processQueue();
            }
        }, delay);
    }
}

// Usage
const apiClient = new RateLimitedAPIClient(2); // 2 requests per second

// Make multiple requests - they'll be rate-limited automatically
const endpoints = ['/api/users', '/api/posts', '/api/comments'];

(async () => {
    const results = await Promise.all(
        endpoints.map(endpoint => 
            apiClient.request(endpoint)
                .catch(error => ({ error: error.message }))
        )
    );
    
    console.log('All requests completed:', results);
})();
```

### Best Practices with Async/Await

1. **Always Use Try/Catch**: Wrap await calls in try/catch blocks to handle errors
2. **Avoid Mixing Promises and Callbacks**: Stick to one style within a codebase
3. **Be Careful with Loops**: Use `Promise.all()` for parallel operations in loops
4. **Consider Error Boundaries**: Implement global error handling for uncaught promise rejections
5. **Use Async IIFEs**: For top-level await in modules that don't support it natively
6. **Handle Cleanup**: Use try/finally for resource cleanup
7. **Be Explicit**: Use `return await` only when you need to catch errors in the current function
8. **Avoid Blocking the Event Loop**: Be mindful of CPU-intensive operations in async functions

## Advanced Patterns and Techniques

### 1. Async Iteration and Generators

#### Async Iterables
```javascript
// Creating an async iterable
const asyncIterable = {
    [Symbol.asyncIterator]() {
        let i = 0;
        return {
            async next() {
                if (i < 5) {
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    return { value: i++, done: false };
                }
                return { done: true };
            }
        };
    }
};

// Consuming the async iterable
(async () => {
    for await (const value of asyncIterable) {
        console.log('Async value:', value);
    }
})();
```

#### Async Generators
```javascript
// Async generator function
async function* asyncCounter(limit = 5, delay = 1000) {
    try {
        for (let i = 0; i < limit; i++) {
            await new Promise(resolve => setTimeout(resolve, delay));
            yield i;
            
            // Simulate an error on the 3rd iteration
            if (i === 2) {
                throw new Error('Something went wrong!');
            }
        }
    } finally {
        console.log('Generator cleanup');
    }
}

// Using the async generator
(async () => {
    const counter = asyncCounter();
    
    try {
        for await (const value of counter) {
            console.log('Counter:', value);
        }
    } catch (error) {
        console.error('Error in async iteration:', error.message);
    }
})();
```

### 2. Advanced Error Handling Strategies

#### 1. Retry with Exponential Backoff
```javascript
async function fetchWithRetry(url, options = {}, retries = 3, backoff = 300) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout
    
    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        clearTimeout(timeoutId);
        
        if (retries > 0) {
            const delay = backoff * (2 ** (3 - retries)); // Exponential backoff
            console.log(`Retrying in ${delay}ms... (${retries} attempts left)`);
            
            await new Promise(resolve => setTimeout(resolve, delay));
            return fetchWithRetry(url, options, retries - 1, backoff);
        }
        
        throw new Error(`Failed after multiple attempts: ${error.message}`);
    }
}
```

#### 2. Circuit Breaker Pattern
```javascript
class CircuitBreaker {
    constructor(request, options = {}) {
        this.request = request;
        this.state = 'CLOSED';
        this.failureCount = 0;
        this.successCount = 0;
        this.nextAttempt = Date.now();
        
        // Default options
        this.options = {
            failureThreshold: 3,
            successThreshold: 2,
            timeout: 10000, // 10 seconds
            ...options
        };
    }
    
    async fire(...args) {
        if (this.state === 'OPEN') {
            if (this.nextAttempt <= Date.now()) {
                this.state = 'HALF';
            } else {
                throw new Error('Circuit is currently OPEN');
            }
        }
        
        try {
            const response = await this.request(...args);
            return this.success(response);
        } catch (error) {
            return this.fail(error);
        }
    }
    
    success(response) {
        if (this.state === 'HALF') {
            this.successCount++;
            
            if (this.successCount > this.options.successThreshold) {
                this.close();
            }
        }
        
        this.failureCount = 0;
        return response;
    }
    
    fail(error) {
        this.failureCount++;
        
        if (this.failureCount >= this.options.failureThreshold) {
            this.open();
        }
        
        throw error;
    }
    
    open() {
        this.state = 'OPEN';
        this.nextAttempt = Date.now() + this.options.timeout;
    }
    
    close() {
        this.state = 'CLOSED';
        this.failureCount = 0;
        this.successCount = 0;
        this.nextAttempt = 0;
    }
}

// Usage
const breaker = new CircuitBreaker(fetch, {
    failureThreshold: 2,
    successThreshold: 1,
    timeout: 5000
});

// In your application
async function fetchWithCircuitBreaker(url) {
    try {
        const response = await breaker.fire(url);
        return await response.json();
    } catch (error) {
        console.error('Request failed:', error.message);
        throw error;
    }
}
```

### 3. Advanced Promise Patterns

#### 1. Promise Pool with Concurrency Control
```javascript
class PromisePool {
    constructor(maxConcurrent = 5) {
        this.maxConcurrent = maxConcurrent;
        this.queue = [];
        this.running = 0;
    }
    
    add(task) {
        return new Promise((resolve, reject) => {
            this.queue.push({ task, resolve, reject });
            this.run();
        });
    }
    
    run() {
        while (this.running < this.maxConcurrent && this.queue.length > 0) {
            const { task, resolve, reject } = this.queue.shift();
            
            this.running++;
            
            Promise.resolve()
                .then(() => task())
                .then(resolve)
                .catch(reject)
                .finally(() => {
                    this.running--;
                    this.run();
                });
        }
    }
}

// Usage
const pool = new PromisePool(3); // Max 3 concurrent promises

const tasks = Array(10).fill(null).map((_, i) => 
    () => new Promise(resolve => 
        setTimeout(() => {
            console.log(`Task ${i} completed`);
            resolve(i);
        }, 1000 + Math.random() * 2000)
    )
);

// Add all tasks to the pool
const results = await Promise.all(tasks.map(task => pool.add(task)));
console.log('All tasks completed:', results);
```

### 4. Real-world Use Cases

#### 1. File Processing Pipeline
```javascript
async function* readFiles(files) {
    for (const file of files) {
        const content = await readFile(file, 'utf-8');
        yield { file, content };
    }
}

async function* processFiles(fileGenerator) {
    for await (const { file, content } of fileGenerator) {
        try {
            // Process each file (e.g., parse, transform, etc.)
            const result = await processContent(content);
            yield { file, success: true, result };
        } catch (error) {
            console.error(`Error processing ${file}:`, error.message);
            yield { file, success: false, error: error.message };
        }
    }
}

async function main() {
    const files = ['file1.txt', 'file2.txt', 'file3.txt'];
    const fileGenerator = readFiles(files);
    const processor = processFiles(fileGenerator);
    
    // Process files with progress
    let processed = 0;
    const results = [];
    
    for await (const result of processor) {
        processed++;
        const progress = Math.round((processed / files.length) * 100);
        console.log(`Progress: ${progress}%`);
        
        if (result.success) {
            console.log(`Processed ${result.file} successfully`);
        } else {
            console.error(`Failed to process ${result.file}: ${result.error}`);
        }
        
        results.push(result);
    }
    
    return results;
}

main().catch(console.error);
```

## Best Practices for Production-Grade Async Code

### 1. Error Handling and Logging

#### Structured Error Handling
```javascript
class AppError extends Error {
    constructor(message, code = 'INTERNAL_ERROR', statusCode = 500, details = {}) {
        super(message);
        this.name = this.constructor.name;
        this.code = code;
        this.statusCode = statusCode;
        this.details = details;
        this.isOperational = true;
        
        Error.captureStackTrace(this, this.constructor);
    }
}

class ValidationError extends AppError {
    constructor(message = 'Validation Error', details = {}) {
        super(message, 'VALIDATION_ERROR', 400, details);
    }
}

async function validateUserInput(input) {
    if (!input.email) {
        throw new ValidationError('Email is required', { field: 'email' });
    }
    
    if (!input.email.includes('@')) {
        throw new ValidationError('Invalid email format', { 
            field: 'email',
            value: input.email 
        });
    }
    
    // Additional validations...
}
```

### 2. Performance Optimization

#### 1. Request Batching
```javascript
class RequestBatcher {
    constructor(batchSize = 10, batchTime = 50) {
        this.batchSize = batchSize;
        this.batchTime = batchTime;
        this.queue = [];
        this.pending = false;
    }
    
    addRequest(request) {
        return new Promise((resolve, reject) => {
            this.queue.push({ request, resolve, reject });
            
            if (!this.pending) {
                this.pending = true;
                
                if (this.queue.length >= this.batchSize) {
                    process.nextTick(() => this.processBatch());
                } else {
                    setTimeout(() => this.processBatch(), this.batchTime);
                }
            }
        });
    }
    
    async processBatch() {
        const items = this.queue.splice(0, this.batchSize);
        this.pending = false;
        
        if (items.length === 0) return;
        
        try {
            const results = await Promise.all(
                items.map(({ request }) => request())
            );
            
            // Resolve all promises with their corresponding results
            items.forEach(({ resolve }, index) => {
                resolve(results[index]);
            });
        } catch (error) {
            // If any request fails, reject all promises in the batch
            items.forEach(({ reject }) => {
                reject(error);
            });
        }
    }
}

// Usage
const batcher = new RequestBatcher(5, 100);

// Instead of making individual requests:
// const user1 = await fetchUser(1);
// const user2 = await fetchUser(2);

// Batch the requests
const [user1, user2] = await Promise.all([
    batcher.addRequest(() => fetchUser(1)),
    batcher.addRequest(() => fetchUser(2))
]);
```

#### 2. Caching with Stale-While-Revalidate
```javascript
function createCache(ttl = 60000) {
    const cache = new Map();
    
    return {
        async getOrSet(key, asyncFn) {
            const now = Date.now();
            const cached = cache.get(key);
            
            // Return cached value if it exists and isn't expired
            if (cached && now < cached.expiresAt) {
                // If the value is about to expire, refresh it in the background
                if (now > cached.expiresAt - ttl * 0.2) {
                    this.refresh(key, asyncFn);
                }
                return cached.value;
            }
            
            // Otherwise, fetch fresh data
            return this.refresh(key, asyncFn);
        },
        
        async refresh(key, asyncFn) {
            try {
                const value = await asyncFn();
                const expiresAt = Date.now() + ttl;
                
                cache.set(key, { value, expiresAt });
                return value;
            } catch (error) {
                // If there's a cached value, return it even if it's expired
                const cached = cache.get(key);
                if (cached) {
                    console.warn('Using stale data due to refresh failure:', error.message);
                    return cached.value;
                }
                throw error;
            }
        },
        
        clear() {
            cache.clear();
        },
        
        delete(key) {
            cache.delete(key);
        }
    };
}

// Usage
const userCache = createCache(300000); // 5 minutes TTL

async function getUserWithCache(userId) {
    return userCache.getOrSet(`user:${userId}`, () => fetchUser(userId));
}
```

## Common Pitfalls and How to Avoid Them

### 1. Unhandled Promise Rejections

#### Problem:
```javascript
// This will cause an unhandled promise rejection
async function processData() {
    const data = await fetchData();
    // If fetchData() rejects, the error is unhandled
}

processData();
```

#### Solution:
```javascript
// Always handle errors at the top level
processData().catch(error => {
    console.error('Unhandled error in processData:', error);
    // Consider using a global error handler
    // process.emit('unhandledRejection', error);
});

// Or use an async IIFE with try/catch
(async () => {
    try {
        await processData();
    } catch (error) {
        console.error('Error in async IIFE:', error);
    }
})();
```

### 2. Memory Leaks with Event Listeners

#### Problem:
```javascript
// This can cause memory leaks if the component is destroyed
class Component {
    constructor() {
        this.data = null;
        this.initialize();
    }
    
    async initialize() {
        this.data = await fetchData();
        window.addEventListener('resize', this.handleResize);
    }
    
    handleResize = () => {
        // Uses this.data
        console.log('Window resized', this.data);
    };
    
    // No cleanup method!
}
```

#### Solution:
```javascript
class Component {
    constructor() {
        this.data = null;
        this.abortController = new AbortController();
        this.initialize();
    }
    
    async initialize() {
        try {
            const { signal } = this.abortController;
            
            // Pass the signal to fetch for cancellation
            this.data = await fetchData({ signal });
            
            // Use the signal with addEventListener's options
            window.addEventListener('resize', this.handleResize, { signal });
        } catch (error) {
            if (error.name !== 'AbortError') {
                console.error('Error in component initialization:', error);
            }
        }
    }
    
    handleResize = () => {
        // Uses this.data
        console.log('Window resized', this.data);
    };
    
    // Cleanup method to be called when component is destroyed
    destroy() {
        this.abortController.abort();
        // Any other cleanup...
    }
}
```

## Performance Considerations

### 1. Optimizing Async Operations

#### a. Request Deduplication
```javascript
const pendingRequests = new Map();

async function deduplicatedFetch(key, asyncFn) {
    // If there's already a pending request with this key, return its promise
    if (pendingRequests.has(key)) {
        return pendingRequests.get(key);
    }
    
    // Otherwise, create a new request
    const promise = asyncFn()
        .finally(() => {
            // Clean up when the request completes
            pendingRequests.delete(key);
        });
    
    // Store the promise in the cache
    pendingRequests.set(key, promise);
    
    return promise;
}

// Usage
async function getUserData(userId) {
    return deduplicatedFetch(
        `user:${userId}`,
        () => fetch(`/api/users/${userId}`).then(res => res.json())
    );
}
```

#### b. Request Prioritization
```javascript
class PriorityQueue {
    constructor() {
        this.high = [];
        this.normal = [];
        this.low = [];
    }
    
    enqueue(item, priority = 'normal') {
        switch (priority) {
            case 'high': this.high.push(item); break;
            case 'low': this.low.push(item); break;
            default: this.normal.push(item);
        }
    }
    
    dequeue() {
        return this.high.shift() || this.normal.shift() || this.low.shift();
    }
    
    get isEmpty() {
        return this.high.length === 0 && this.normal.length === 0 && this.low.length === 0;
    }
}

class PriorityRequestScheduler {
    constructor(maxConcurrent = 6) {
        this.maxConcurrent = maxConcurrent;
        this.queue = new PriorityQueue();
        this.pending = 0;
    }
    
    add(requestFn, priority = 'normal') {
        return new Promise((resolve, reject) => {
            this.queue.enqueue({ requestFn, resolve, reject }, priority);
            this.processQueue();
        });
    }
    
    async processQueue() {
        if (this.pending >= this.maxConcurrent || this.queue.isEmpty) {
            return;
        }
        
        this.pending++;
        const { requestFn, resolve, reject } = this.queue.dequeue();
        
        try {
            const result = await requestFn();
            resolve(result);
        } catch (error) {
            reject(error);
        } finally {
            this.pending--;
            this.processQueue();
        }
    }
}

// Usage
const scheduler = new PriorityRequestScheduler(3); // 3 concurrent requests

// High priority request (e.g., user-initiated action)
scheduler.add(
    () => fetch('/api/important-data').then(res => res.json()),
    'high'
).then(handleImportantData);

// Normal priority request (e.g., loading secondary data)
scheduler.add(
    () => fetch('/api/other-data').then(res => res.json())
).then(handleOtherData);
```

## Conclusion

Asynchronous programming in JavaScript is powerful but comes with its own set of challenges. By understanding the event loop, mastering Promises and async/await, and applying the patterns and best practices covered in this guide, you can write more maintainable, performant, and reliable asynchronous code.

### Key Takeaways:

1. **Understand the Event Loop**: Know how JavaScript handles asynchronous operations under the hood.
2. **Use Async/Await for Readability**: It makes asynchronous code look and behave more like synchronous code.
3. **Handle Errors Properly**: Always implement error handling for async operations.
4. **Leverage Modern APIs**: Use AbortController, Promise combinators, and other modern features.
5. **Optimize Performance**: Implement batching, caching, and proper cleanup.
6. **Be Mindful of Memory**: Clean up event listeners and references to prevent memory leaks.
7. **Test Thoroughly**: Asynchronous code can have subtle bugs that only appear under specific timing conditions.

With these tools and techniques, you'll be well-equipped to handle any asynchronous programming challenge in JavaScript.
    const [result1, result2] = await Promise.all([
        asyncFunc1(),
        asyncFunc2()
    ]);
    return { result1, result2 };
}
```
