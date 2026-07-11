# JavaScript 개발자 인터뷰 질문 (비동기 프로그래밍)

## 비동기 프로그래밍

11. **콜백(Callback) 함수란 무엇이며, 콜백 지옥(Callback Hell)이란 무엇인가요?**
    - 콜백 지옥을 해결하는 방법은 무엇인가요?
    
    **설명:** 콜백 함수는 다른 함수에 인자로 전달되어 특정 이벤트나 작업이 완료된 후에 실행되는 함수입니다. JavaScript에서 비동기 작업을 처리하는 전통적인 방법이었습니다. 콜백 지옥(또는 콜백 피라미드)은 여러 비동기 작업을 순차적으로 처리하기 위해 콜백 함수가 중첩되어 코드의 가독성과 유지보수성이 떨어지는 현상을 말합니다. 콜백 지옥을 해결하는 방법으로는 함수를 분리하여 명명된 함수로 만들기, Promise 사용하기, async/await 사용하기, 모듈화 등이 있습니다. 이러한 방법들은 코드의 흐름을 더 명확하게 하고 오류 처리를 개선합니다.

    **Description:** A callback function is a function passed as an argument to another function, to be executed after a specific event or task completes. It was the traditional way to handle asynchronous operations in JavaScript. Callback hell (or pyramid of doom) occurs when multiple nested callbacks are used to handle sequential asynchronous operations, resulting in code that is difficult to read and maintain. Solutions to callback hell include separating functions into named functions, using Promises, implementing async/await, and modularizing code. These approaches make the code flow clearer and improve error handling.
    
    **예시:**
    ```javascript
    // 콜백 함수 예시
    function fetchData(callback) {
      // 비동기 작업 시뮬레이션
      setTimeout(() => {
        const data = { id: 1, name: 'John' };
        callback(null, data); // 성공 시 두 번째 인자로 데이터 전달
      }, 1000);
    }
    
    fetchData((error, data) => {
      if (error) {
        console.error('Error:', error);
      } else {
        console.log('Data:', data); // Data: { id: 1, name: 'John' }
      }
    });
    
    // 콜백 지옥 예시
    function getUserData(userId, callback) {
      // 사용자 정보 가져오기
      fetchUser(userId, (error, user) => {
        if (error) {
          callback(error, null);
          return;
        }
        
        // 사용자의 게시물 가져오기
        fetchPosts(user.id, (error, posts) => {
          if (error) {
            callback(error, null);
            return;
          }
          
          // 게시물의 댓글 가져오기
          fetchComments(posts[0].id, (error, comments) => {
            if (error) {
              callback(error, null);
              return;
            }
            
            // 댓글의 작성자 정보 가져오기
            fetchUser(comments[0].userId, (error, commentAuthor) => {
              if (error) {
                callback(error, null);
                return;
              }
              
              // 최종 결과 가공
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
    
    // 콜백 지옥 해결 방법 1: 함수 분리
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
    
    // 함수 분리를 통한 콜백 지옥 개선
    function getUserDataImproved(userId, callback) {
      fetchUser(userId, (error, user) => {
        if (error) return callback(error);
        
        fetchPosts(user.id, (error, posts) => {
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

12. **Promise란 무엇이며 어떻게 사용하나요?**
    - Promise의 상태(pending, fulfilled, rejected)에 대해 설명해주세요.
    - `Promise.all`, `Promise.race`, `Promise.allSettled`, `Promise.any`의 차이점은 무엇인가요?
    
    **설명:** Promise는 비동기 작업의 최종 완료(또는 실패)와 그 결과값을 나타내는 객체입니다. Promise는 세 가지 상태를 가집니다: 대기(pending) - 초기 상태, 이행(fulfilled) - 작업이 성공적으로 완료됨, 거부(rejected) - 작업이 실패함. Promise는 콜백 지옥을 해결하고 비동기 코드를 더 읽기 쉽게 만들어줍니다. `Promise.all`은 모든 Promise가 이행될 때까지 기다리며 하나라도 거부되면 즉시 거부됩니다. `Promise.race`는 가장 먼저 완료되는 Promise의 결과를 반환합니다. `Promise.allSettled`는 모든 Promise가 완료(이행 또는 거부)될 때까지 기다립니다. `Promise.any`는 가장 먼저 이행되는 Promise의 결과를 반환하며, 모두 거부되면 AggregateError를 발생시킵니다.

    **Description:** A Promise is an object representing the eventual completion (or failure) of an asynchronous operation and its resulting value. Promises have three states: pending (initial state), fulfilled (operation completed successfully), and rejected (operation failed). Promises help solve callback hell and make asynchronous code more readable. `Promise.all` waits for all promises to be fulfilled and rejects immediately if any promise is rejected. `Promise.race` returns the result of the first promise to complete. `Promise.allSettled` waits for all promises to complete (fulfilled or rejected). `Promise.any` returns the result of the first fulfilled promise and throws an AggregateError if all promises are rejected.
    
    **예시:**
    ```javascript
    // Promise 기본 사용법
    function fetchUserPromise(userId) {
      return new Promise((resolve, reject) => {
        // 비동기 작업 시뮬레이션
        setTimeout(() => {
          if (userId > 0) {
            const user = { id: userId, name: 'User ' + userId };
            resolve(user); // 성공 시 resolve 호출
          } else {
            reject(new Error('Invalid user ID')); // 실패 시 reject 호출
          }
        }, 1000);
      });
    }
    
    // Promise 사용
    fetchUserPromise(1)
      .then(user => {
        console.log('User:', user); // User: { id: 1, name: 'User 1' }
        return fetchUserPromise(2); // 다른 Promise 반환
      })
      .then(user => {
        console.log('Another user:', user); // Another user: { id: 2, name: 'User 2' }
      })
      .catch(error => {
        console.error('Error:', error.message);
      })
      .finally(() => {
        console.log('Operation completed'); // 성공/실패 여부와 관계없이 항상 실행
      });
    
    // Promise 상태 예시
    const pendingPromise = new Promise((resolve) => {
      // 해결되지 않은 Promise는 pending 상태
      setTimeout(() => resolve('Done!'), 5000);
    });
    
    console.log(pendingPromise); // Promise { <pending> }
    
    // Promise.all - 모든 Promise가 성공해야 성공, 하나라도 실패하면 실패
    const promise1 = Promise.resolve(1);
    const promise2 = Promise.resolve(2);
    const promise3 = Promise.resolve(3);
    
    Promise.all([promise1, promise2, promise3])
      .then(values => {
        console.log('All promises resolved:', values); // [1, 2, 3]
      })
      .catch(error => {
        console.error('At least one promise rejected:', error);
      });
    
    // Promise.race - 가장 먼저 완료되는 Promise의 결과 반환 (성공 또는 실패)
    const fast = new Promise(resolve => setTimeout(() => resolve('Fast!'), 100));
    const slow = new Promise(resolve => setTimeout(() => resolve('Slow!'), 500));
    
    Promise.race([fast, slow])
      .then(result => {
        console.log('Fastest promise result:', result); // 'Fast!'
      });
    
    // Promise.allSettled - 모든 Promise가 완료(성공 또는 실패)될 때까지 기다림
    const success = Promise.resolve('Success');
    const failure = Promise.reject(new Error('Failure'));
    
    Promise.allSettled([success, failure])
      .then(results => {
        console.log('All promises settled:', results);
        // [
        //   { status: 'fulfilled', value: 'Success' },
        //   { status: 'rejected', reason: Error: 'Failure' }
        // ]
      });
    
    // Promise.any - 성공한 Promise중 가장 먼저 완료된 결과 반환, 모두 실패하면 AggregateError 반환
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

13. **async/await란 무엇이며 Promise와 어떤 관계가 있나요?**
    - async/await의 에러 처리 방법에 대해 설명해주세요.
    
    **설명:** async/await는 ES2017에서 도입된 비동기 코드를 동기 코드처럼 작성할 수 있게 해주는 문법입니다. `async` 함수는 항상 Promise를 반환하며, `await` 키워드는 Promise가 이행될 때까지 함수 실행을 일시 중지합니다. async/await는 Promise를 기반으로 하는 문법적 설탕(syntactic sugar)으로, 내부적으로는 여전히 Promise를 사용합니다. async/await의 주요 장점은 비동기 코드의 가독성을 높이고 Promise 체인보다 직관적인 코드 흐름을 제공한다는 것입니다. 에러 처리는 주로 try/catch 블록을 사용하여 수행하며, 이는 동기 코드의 에러 처리 방식과 유사하여 더 자연스럽습니다. 또한 Promise.all과 함께 사용하여 병렬 비동기 작업을 효율적으로 처리할 수 있습니다.

    **Description:** async/await, introduced in ES2017, is a syntax that allows writing asynchronous code that looks like synchronous code. An `async` function always returns a Promise, and the `await` keyword pauses the execution of the function until a Promise is fulfilled. async/await is syntactic sugar built on top of Promises, still using Promises under the hood. The main advantages of async/await are improved readability of asynchronous code and a more intuitive code flow compared to Promise chains. Error handling is primarily done using try/catch blocks, which is more natural as it resembles error handling in synchronous code. It can also be used with Promise.all for efficient parallel asynchronous operations.
    
    **예시:**
    ```javascript
    // Promise를 반환하는 함수
    function fetchUser(userId) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (userId > 0) {
            resolve({ id: userId, name: `User ${userId}` });
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
    
    // Promise 체인을 사용한 방식
    function getUserDataWithPromises(userId) {
      return fetchUser(userId)
        .then(user => {
          return fetchPosts(user.id)
            .then(posts => {
              return { user, posts };
            });
        });
    }
    
    // async/await를 사용한 방식
    async function getUserDataWithAsync(userId) {
      // async 함수는 항상 Promise를 반환
      const user = await fetchUser(userId); // await는 Promise가 해결될 때까지 기다림
      const posts = await fetchPosts(user.id);
      return { user, posts };
    }
    
    // 사용 예시
    getUserDataWithAsync(1)
      .then(result => console.log('User data:', result))
      .catch(error => console.error('Error:', error.message));
    
    // async/await의 에러 처리 - try/catch 사용
    async function getUserDataWithErrorHandling(userId) {
      try {
        const user = await fetchUser(userId);
        const posts = await fetchPosts(user.id);
        return { user, posts };
      } catch (error) {
        console.error('Error in async function:', error.message);
        // 에러 처리 로직
        throw new Error(`Failed to fetch user data: ${error.message}`);
      } finally {
        console.log('Async operation completed');
      }
    }
    
    // 병렬 처리 예시
    async function fetchMultipleUsers(userIds) {
      try {
        // Promise.all과 async/await 함께 사용
        const userPromises = userIds.map(id => fetchUser(id));
        const users = await Promise.all(userPromises);
        return users;
      } catch (error) {
        console.error('Error fetching multiple users:', error.message);
        throw error;
      }
    }
    
    // 실행 결과
    fetchMultipleUsers([1, 2, 3])
      .then(users => console.log('All users:', users))
      .catch(error => console.error('Failed:', error.message));
    ```

14. **이벤트 기반 프로그래밍(Event-driven Programming)이란 무엇인가요?**
    - 이벤트 버블링(Bubbling)과 캡처링(Capturing)의 차이점은 무엇인가요?
    
    **설명:** 이벤트 기반 프로그래밍은 프로그램의 흐름이 이벤트(사용자 동작, 시스템 이벤트, 메시지 등)에 의해 결정되는 프로그래밍 패러다임입니다. JavaScript에서는 DOM 이벤트(클릭, 키보드 입력 등), 타이머 이벤트, AJAX 응답 등이 이벤트 기반 프로그래밍의 예입니다. 이벤트 버블링은 이벤트가 발생한 요소에서 시작하여 DOM 트리를 따라 위로 전파되는 과정입니다(자식에서 부모로). 이벤트 캡처링은 반대로 최상위 요소에서 시작하여 이벤트가 발생한 요소까지 아래로 전파되는 과정입니다(부모에서 자식으로). 기본적으로 이벤트는 캡처링 단계를 거친 후 버블링 단계로 진행되며, `addEventListener`의 세 번째 매개변수를 통해 어느 단계에서 이벤트를 처리할지 지정할 수 있습니다(기본값은 버블링 단계). 이벤트 위임(Event Delegation)은 이벤트 버블링을 활용하여 여러 요소의 이벤트를 공통 조상 요소에서 효율적으로 처리하는 기법입니다.

    **Description:** Event-driven programming is a programming paradigm where the flow of the program is determined by events (user actions, system events, messages, etc.). In JavaScript, examples include DOM events (clicks, keyboard inputs), timer events, and AJAX responses. Event bubbling is the process where an event propagates upward through the DOM tree, starting from the element where it occurred (child to parent). Event capturing is the opposite, where the event propagates downward from the topmost element to the target element (parent to child). By default, events go through the capturing phase first, then the bubbling phase. The third parameter of `addEventListener` specifies which phase to handle the event in (default is bubbling). Event delegation is a technique that uses event bubbling to efficiently handle events for multiple elements at a common ancestor.
    
    **예시:**
    ```javascript
    // 이벤트 기반 프로그래밍 예시
    
    // 1. 이벤트 리스너 추가
    document.getElementById('myButton').addEventListener('click', function(event) {
      console.log('Button clicked!');
    });
    
    // 2. 사용자 정의 이벤트 생성 및 발생
    const customEvent = new CustomEvent('userLogin', { 
      detail: { username: 'john_doe', timestamp: new Date() }
    });
    
    document.addEventListener('userLogin', function(event) {
      console.log(`User ${event.detail.username} logged in at ${event.detail.timestamp}`);
    });
    
    // 이벤트 발생
    document.dispatchEvent(customEvent);
    
    // 3. 이벤트 버블링과 캡처링 예시
    // HTML 구조:
    // <div id="outer">
    //   <div id="middle">
    //     <div id="inner">Click me</div>
    //   </div>
    // </div>
    
    // 버블링 단계 (3번째 인자가 false 또는 생략 - 기본값)
    document.getElementById('inner').addEventListener('click', function(event) {
      console.log('Inner div clicked - bubbling phase');
    });
    
    document.getElementById('middle').addEventListener('click', function(event) {
      console.log('Middle div clicked - bubbling phase');
      
      // 이벤트 전파 중지
      // event.stopPropagation();
    });
    
    document.getElementById('outer').addEventListener('click', function(event) {
      console.log('Outer div clicked - bubbling phase');
    });
    
    // 캡처링 단계 (3번째 인자가 true)
    document.getElementById('inner').addEventListener('click', function(event) {
      console.log('Inner div clicked - capturing phase');
    }, true);
    
    document.getElementById('middle').addEventListener('click', function(event) {
      console.log('Middle div clicked - capturing phase');
    }, true);
    
    document.getElementById('outer').addEventListener('click', function(event) {
      console.log('Outer div clicked - capturing phase');
    }, true);
    
    // inner div를 클릭하면 다음 순서로 실행됨:
    // 1. 'Outer div clicked - capturing phase'
    // 2. 'Middle div clicked - capturing phase'
    // 3. 'Inner div clicked - capturing phase'
    // 4. 'Inner div clicked - bubbling phase'
    // 5. 'Middle div clicked - bubbling phase'
    // 6. 'Outer div clicked - bubbling phase'
    
    // 이벤트 위임(Event Delegation) 예시
    document.getElementById('parent-list').addEventListener('click', function(event) {
      // 클릭된 요소가 리스트 아이템인지 확인
      if (event.target.tagName === 'LI') {
        console.log('List item clicked:', event.target.textContent);
      }
    });
    ```
