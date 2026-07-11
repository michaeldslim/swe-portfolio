# JavaScript Developer Interview Questions (Asynchronous Programming)

## Asynchronous Programming

11. **What is a callback function and what is callback hell?**
    - How can callback hell be resolved?
    
    **Description:** A callback function is a function passed as an argument to another function, to be executed after a specific event or task completes. It was the traditional way to handle asynchronous operations in JavaScript. Callback hell (or pyramid of doom) occurs when multiple nested callbacks are used to handle sequential asynchronous operations, resulting in code that is difficult to read and maintain. Solutions to callback hell include separating functions into named functions, using Promises, implementing async/await, and modularizing code. These approaches make the code flow clearer and improve error handling.
    
    **Example:**
    ```javascript
    // Callback function example
    function fetchData(callback) {
      // Simulating asynchronous operation
      setTimeout(() => {
        const data = { id: 1, name: 'John' };
        callback(null, data); // Pass data as second argument on success
      }, 1000);
    }
    
    fetchData((error, data) => {
      if (error) {
        console.error('Error:', error);
      } else {
        console.log('Data:', data); // Data: { id: 1, name: 'John' }
      }
    });
    
    // Callback hell example
    function getUserData(userId, callback) {
      // Fetch user information
      fetchUser(userId, (error, user) => {
        if (error) {
          callback(error, null);
          return;
        }
        
        // Fetch user's posts
        fetchPosts(user.id, (error, posts) => {
          if (error) {
            callback(error, null);
            return;
          }
          
          // Fetch comments for the first post
          fetchComments(posts[0].id, (error, comments) => {
            if (error) {
              callback(error, null);
              return;
            }
            
            // Fetch author information for the first comment
            fetchUser(comments[0].userId, (error, commentAuthor) => {
              if (error) {
                callback(error, null);
                return;
              }
              
              // Process final result
              const result = {
                user,
                posts,
                comments,
                commentAuthor
              };
              
              callback(null, result);
            });
          });
        });
      });
    }
    
    // Solution 1: Separate functions
    function fetchUser(userId, callback) {
      setTimeout(() => callback(null, { id: userId, name: 'User ' + userId }), 500);
    }
    
    function fetchPosts(userId, callback) {
      setTimeout(() => callback(null, [{ id: 1, title: 'Post 1', userId }]), 500);
    }
    
    function fetchComments(postId, callback) {
      setTimeout(() => callback(null, [{ id: 1, text: 'Comment 1', userId: 2, postId }]), 500);
    }
    
    function handleResult(error, result) {
      if (error) {
        console.error('Error:', error);
      } else {
        console.log('Result:', result);
      }
    }
    
    // Improved callback structure with named functions
    function getUserDataImproved(userId, callback) {
      fetchUser(userId, (error, user) => {
        if (error) return callback(error);
        
        fetchPosts(userId, (error, posts) => {
          if (error) return callback(error);
          
          fetchComments(posts[0].id, (error, comments) => {
            if (error) return callback(error);
            
            fetchUser(comments[0].userId, (error, commentAuthor) => {
              if (error) return callback(error);
              
              callback(null, { user, posts, comments, commentAuthor });
            });
          });
        });
      });
    }
    ```

12. **What is a Promise and how do you use it?**
    - Explain the states of a Promise (pending, fulfilled, rejected).
    - What are the differences between `Promise.all`, `Promise.race`, `Promise.allSettled`, and `Promise.any`?
    
    **Description:** A Promise is an object representing the eventual completion or failure of an asynchronous operation. It provides a cleaner alternative to callback-based asynchronous code. A Promise can be in one of three states: pending (initial state, neither fulfilled nor rejected), fulfilled (operation completed successfully), or rejected (operation failed). Promises have `.then()` for handling successful results, `.catch()` for handling errors, and `.finally()` for executing code regardless of outcome. Promise combinators allow working with multiple promises: `Promise.all` waits for all promises to fulfill or any to reject, `Promise.race` settles as soon as any promise settles, `Promise.allSettled` waits for all promises to settle regardless of outcome, and `Promise.any` fulfills when any promise fulfills or rejects if all reject.
    
    **Example:**
    ```javascript
    // Creating a Promise
    function fetchUserPromise(userId) {
      return new Promise((resolve, reject) => {
        // Simulating async operation
        setTimeout(() => {
          if (userId > 0) {
            const user = { id: userId, name: 'User ' + userId };
            resolve(user); // Call resolve on success
          } else {
            reject(new Error('Invalid user ID')); // Call reject on failure
          }
        }, 1000);
      });
    }
    
    // Using a Promise
    fetchUserPromise(1)
      .then(user => {
        console.log('User:', user); // User: { id: 1, name: 'User 1' }
        return fetchUserPromise(2); // Return another Promise
      })
      .then(user => {
        console.log('User 2:', user); // User 2: { id: 2, name: 'User 2' }
      })
      .catch(error => {
        console.error('Error:', error.message);
      })
      .finally(() => {
        console.log('Promise chain completed');
      });
    
    // Promise.all - waits for all promises to fulfill or any to reject
    const promise1 = fetchUserPromise(1);
    const promise2 = fetchUserPromise(2);
    const promise3 = fetchUserPromise(3);
    
    Promise.all([promise1, promise2, promise3])
      .then(results => {
        console.log('All users:', results); // Array of all user objects
      })
      .catch(error => {
        console.error('At least one promise rejected:', error.message);
      });
    
    // Promise.race - returns the result of the first promise to settle (fulfill or reject)
    const fast = new Promise(resolve => setTimeout(() => resolve('Fast!'), 100));
    const slow = new Promise(resolve => setTimeout(() => resolve('Slow!'), 500));
    
    Promise.race([fast, slow])
      .then(result => {
        console.log('Fastest promise result:', result); // 'Fast!'
      });
    
    // Promise.allSettled - waits for all promises to settle (fulfill or reject)
    const success = Promise.resolve('Success');
    const failure = Promise.reject(new Error('Failure'));
    
    Promise.allSettled([success, failure])
      .then(results => {
        console.log('All settled results:', results);
        // [
        //   { status: 'fulfilled', value: 'Success' },
        //   { status: 'rejected', reason: Error('Failure') }
        // ]
      });
    
    // Promise.any - fulfills when any promise fulfills, rejects if all reject
    const slow1 = new Promise(resolve => setTimeout(() => resolve('Slow 1'), 500));
    const slow2 = new Promise(resolve => setTimeout(() => resolve('Slow 2'), 400));
    
    Promise.any([slow1, slow2])
      .then(result => {
        console.log('First fulfilled promise:', result); // 'Slow 2'
      })
      .catch(error => {
        console.error('All promises rejected:', error);
      });
    ```

13. **What is async/await and how does it relate to Promises?**
    - How do you handle errors with async/await?
    
    **Description:** async/await is a syntactic feature introduced in ES2017 that makes asynchronous code look and behave more like synchronous code. It's built on top of Promises, making them easier to work with. An `async` function always returns a Promise, and the `await` keyword can only be used inside `async` functions to pause execution until a Promise is settled. Error handling in async/await is typically done using try/catch blocks, which is more intuitive than Promise chains with `.catch()`. async/await also makes it easier to handle sequential asynchronous operations and provides better debugging experiences, as the stack trace preserves the context of asynchronous calls.
    
    **Example:**
    ```javascript
    // Promise-based functions
    function fetchUser(userId) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (userId > 0) {
            resolve({ id: userId, name: 'User ' + userId });
          } else {
            reject(new Error('Invalid user ID'));
          }
        }, 1000);
      });
    }
    
    function fetchPosts(userId) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([{ id: 1, title: 'Post 1', userId }, { id: 2, title: 'Post 2', userId }]);
        }, 1000);
      });
    }
    
    // Using Promise chains
    function getUserDataWithPromises(userId) {
      return fetchUser(userId)
        .then(user => {
          return fetchPosts(user.id)
            .then(posts => {
              return { user, posts };
            });
        });
    }
    
    // Using async/await
    async function getUserDataWithAsync(userId) {
      try {
        // Looks like synchronous code but is asynchronous
        const user = await fetchUser(userId);
        const posts = await fetchPosts(user.id);
        
        return { user, posts };
      } catch (error) {
        // Error handling logic
        throw new Error(`Failed to fetch user data: ${error.message}`);
      } finally {
        console.log('Async operation completed');
      }
    }
    
    // Parallel execution example
    async function fetchMultipleUsers(userIds) {
      try {
        // Use Promise.all with async/await
        const userPromises = userIds.map(id => fetchUser(id));
        const users = await Promise.all(userPromises);
        return users;
      } catch (error) {
        console.error('Error fetching multiple users:', error.message);
        throw error;
      }
    }
    
    // Execution results
    fetchMultipleUsers([1, 2, 3])
      .then(users => console.log('All users:', users))
      .catch(error => console.error('Failed:', error.message));
    ```

14. **What is event-driven programming?**
    - What's the difference between event bubbling and capturing?
    
    **Description:** Event-driven programming is a programming paradigm where the flow of the program is determined by events (user actions, system events, messages, etc.). In JavaScript, examples include DOM events (clicks, keyboard inputs), timer events, and AJAX responses. Event bubbling is the process where an event propagates upward through the DOM tree, starting from the element where it occurred (child to parent). Event capturing is the opposite, where the event propagates downward from the topmost element to the target element (parent to child). By default, events go through the capturing phase first, then the bubbling phase. The third parameter of `addEventListener` specifies which phase to handle the event in (default is bubbling). Event delegation is a technique that uses event bubbling to efficiently handle events for multiple elements at a common ancestor.
    
    **Example:**
    ```javascript
    // Event-driven programming examples
    
    // 1. Adding event listeners
    document.getElementById('myButton').addEventListener('click', function(event) {
      console.log('Button clicked!');
    });
    
    // 2. Creating and dispatching custom events
    const customEvent = new CustomEvent('userLogin', { 
      detail: { username: 'john_doe', timestamp: new Date() }
    });
    
    document.addEventListener('userLogin', function(event) {
      console.log(`User ${event.detail.username} logged in at ${event.detail.timestamp}`);
    });
    
    // Dispatch the event
    document.dispatchEvent(customEvent);
    
    // 3. Event bubbling and capturing example
    // HTML structure:
    // <div id="outer">
    //   <div id="middle">
    //     <div id="inner">Click me</div>
    //   </div>
    // </div>
    
    // Bubbling phase (third parameter is false or omitted - default)
    document.getElementById('inner').addEventListener('click', function(event) {
      console.log('Inner div clicked - bubbling phase');
    });
    
    document.getElementById('middle').addEventListener('click', function(event) {
      console.log('Middle div clicked - bubbling phase');
      
      // Stop event propagation
      // event.stopPropagation();
    });
    
    document.getElementById('outer').addEventListener('click', function(event) {
      console.log('Outer div clicked - bubbling phase');
    });
    
    // Capturing phase (third parameter is true)
    document.getElementById('inner').addEventListener('click', function(event) {
      console.log('Inner div clicked - capturing phase');
    }, true);
    
    document.getElementById('middle').addEventListener('click', function(event) {
      console.log('Middle div clicked - capturing phase');
    }, true);
    
    document.getElementById('outer').addEventListener('click', function(event) {
      console.log('Outer div clicked - capturing phase');
    }, true);
    
    // When inner div is clicked, the execution order is:
    // 1. 'Outer div clicked - capturing phase'
    // 2. 'Middle div clicked - capturing phase'
    // 3. 'Inner div clicked - capturing phase'
    // 4. 'Inner div clicked - bubbling phase'
    // 5. 'Middle div clicked - bubbling phase'
    // 6. 'Outer div clicked - bubbling phase'
    
    // Event delegation example
    document.getElementById('parent-list').addEventListener('click', function(event) {
      // Check if the clicked element is a list item
      if (event.target.tagName === 'LI') {
        console.log('List item clicked:', event.target.textContent);
      }
    });
    ```
