# JavaScript 인터뷰 가이드: Part 2B-2 - 비동기 JavaScript

## 비동기 JavaScript

비동기 JavaScript를 이해하는 것은 현대 웹 개발에 필수적이며 기술 인터뷰에서 자주 다뤄지는 주제입니다.

### 콜백(Callbacks)

콜백은 특정 작업이 완료된 후 실행되도록 다른 함수에 인수로 전달되는 함수입니다.

#### 기본 콜백 패턴
```javascript
function fetchData(callback) {
  // setTimeout으로 API 호출 시뮬레이션
  setTimeout(() => {
    const data = { id: 1, name: 'Product' };
    callback(data);
  }, 1000);
}

fetchData((data) => {
  console.log('Data received:', data);
});
console.log('Fetching data...');

// 출력:
// Fetching data...
// (1초 후) Data received: { id: 1, name: 'Product' }
```

#### 에러 우선 콜백 패턴 (Node.js 스타일)
```javascript
function readFile(path, callback) {
  // 파일 읽기 시뮬레이션
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

#### 콜백 지옥(Callback Hell)
```javascript
// 피해야 할 패턴
fetchUser(userId, (user) => {
  fetchPosts(user.id, (posts) => {
    fetchComments(posts[0].id, (comments) => {
      fetchLikes(comments[0].id, (likes) => {
        console.log(likes);
        // 더 깊어질 수 있음...
      });
    });
  });
});
```

**인터뷰 팁:**
- 콜백 지옥은 코드를 읽고 유지보수하기 어렵게 만듭니다
- Promise나 async/await로 해결할 수 있습니다
- 에러 처리는 각 레벨에서 필요합니다
- 콜백은 동기적으로도 사용될 수 있습니다 (예: Array.map)

### Promise

Promise는 비동기 작업의 최종 완료 또는 실패를 나타내는 객체입니다.

#### Promise 생성과 사용
```javascript
// Promise 생성
const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    const success = true;
    if (success) {
      resolve('Operation successful!');
    } else {
      reject(new Error('Operation failed!'));
    }
  }, 1000);
});

// Promise 사용
myPromise
  .then(result => {
    console.log(result);  // 'Operation successful!'
    return 'Next step';
  })
  .then(nextResult => {
    console.log(nextResult);  // 'Next step'
  })
  .catch(error => {
    console.error(error);
  })
  .finally(() => {
    console.log('Cleanup');
  });
```

#### Promise 체이닝
```javascript
function fetchUser(userId) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ id: userId, name: 'John' }), 1000);
  });
}

function fetchPosts(userId) {
  return new Promise((resolve) => {
    setTimeout(() => resolve([{ id: 1, title: 'Post 1' }]), 1000);
  });
}

function fetchComments(postId) {
  return new Promise((resolve) => {
    setTimeout(() => resolve([{ id: 1, text: 'Comment 1' }]), 1000);
  });
}

// 체이닝으로 콜백 지옥 해결
fetchUser(1)
  .then(user => {
    console.log('User:', user);
    return fetchPosts(user.id);
  })
  .then(posts => {
    console.log('Posts:', posts);
    return fetchComments(posts[0].id);
  })
  .then(comments => {
    console.log('Comments:', comments);
  })
  .catch(error => {
    console.error('Error:', error);
  });
```

#### Promise 정적 메서드

**Promise.all()**
```javascript
const promise1 = Promise.resolve(1);
const promise2 = Promise.resolve(2);
const promise3 = Promise.resolve(3);

Promise.all([promise1, promise2, promise3])
  .then(values => {
    console.log(values);  // [1, 2, 3]
  })
  .catch(error => {
    // 하나라도 실패하면 전체 실패
    console.error(error);
  });
```

**Promise.race()**
```javascript
const slow = new Promise(resolve => setTimeout(() => resolve('slow'), 2000));
const fast = new Promise(resolve => setTimeout(() => resolve('fast'), 1000));

Promise.race([slow, fast])
  .then(result => {
    console.log(result);  // 'fast' (먼저 완료된 것)
  });
```

**Promise.allSettled()**
```javascript
const promises = [
  Promise.resolve(1),
  Promise.reject('error'),
  Promise.resolve(3)
];

Promise.allSettled(promises)
  .then(results => {
    console.log(results);
    // [
    //   { status: 'fulfilled', value: 1 },
    //   { status: 'rejected', reason: 'error' },
    //   { status: 'fulfilled', value: 3 }
    // ]
  });
```

**Promise.any()**
```javascript
const promises = [
  Promise.reject('error1'),
  Promise.resolve('success'),
  Promise.reject('error2')
];

Promise.any(promises)
  .then(result => {
    console.log(result);  // 'success' (첫 번째 성공)
  })
  .catch(error => {
    // 모두 실패한 경우에만
    console.error(error);
  });
```

**인터뷰 팁:**
- Promise는 pending, fulfilled, rejected 세 가지 상태를 가집니다
- Promise는 한 번만 settle됩니다 (fulfilled 또는 rejected)
- `.then()`은 항상 새 Promise를 반환합니다
- `.catch()`는 체인의 모든 에러를 처리합니다
- `Promise.all()`은 하나라도 실패하면 전체가 실패합니다
- `Promise.allSettled()`는 모든 Promise가 완료될 때까지 기다립니다

### Async/Await

Async/Await는 Promise를 더 동기적인 코드처럼 작성할 수 있게 해주는 문법적 설탕입니다.

#### 기본 사용법
```javascript
// async 함수는 항상 Promise를 반환
async function fetchData() {
  return 'data';
}

fetchData().then(data => console.log(data));  // 'data'

// await는 Promise가 resolve될 때까지 기다림
async function getData() {
  const response = await fetch('https://api.example.com/data');
  const data = await response.json();
  return data;
}
```

#### 에러 처리
```javascript
async function fetchUser(userId) {
  try {
    const response = await fetch(`/api/users/${userId}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const user = await response.json();
    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;  // 또는 기본값 반환
  }
}
```

#### 병렬 vs 순차 실행

**순차 실행 (느림):**
```javascript
async function sequential() {
  const user = await fetchUser(1);      // 1초 대기
  const posts = await fetchPosts(1);    // 1초 대기
  const comments = await fetchComments(1); // 1초 대기
  // 총 3초
  return { user, posts, comments };
}
```

**병렬 실행 (빠름):**
```javascript
async function parallel() {
  const [user, posts, comments] = await Promise.all([
    fetchUser(1),
    fetchPosts(1),
    fetchComments(1)
  ]);
  // 총 1초 (모두 동시에 실행)
  return { user, posts, comments };
}
```

**혼합 접근:**
```javascript
async function mixed() {
  // 먼저 user를 가져와야 함
  const user = await fetchUser(1);
  
  // user.id를 사용하여 병렬로 가져오기
  const [posts, friends] = await Promise.all([
    fetchPosts(user.id),
    fetchFriends(user.id)
  ]);
  
  return { user, posts, friends };
}
```

#### 여러 비동기 작업 처리

**for...of와 await:**
```javascript
async function processUsers(userIds) {
  const results = [];
  
  for (const id of userIds) {
    const user = await fetchUser(id);  // 순차 처리
    results.push(user);
  }
  
  return results;
}

// 병렬 처리
async function processUsersParallel(userIds) {
  const promises = userIds.map(id => fetchUser(id));
  return await Promise.all(promises);
}
```

**map과 Promise.all:**
```javascript
async function getUsersWithPosts(userIds) {
  const users = await Promise.all(
    userIds.map(async (id) => {
      const user = await fetchUser(id);
      const posts = await fetchPosts(id);
      return { ...user, posts };
    })
  );
  return users;
}
```

**인터뷰 팁:**
- `async` 함수는 항상 Promise를 반환합니다
- `await`는 `async` 함수 내에서만 사용할 수 있습니다
- `await`는 Promise가 아닌 값에도 사용할 수 있습니다 (즉시 resolve됨)
- 에러 처리에는 try/catch를 사용합니다
- 독립적인 작업은 병렬로 실행하세요
- 최상위 레벨 await는 모듈에서 지원됩니다 (ES2022)

### 이벤트 루프

이벤트 루프는 JavaScript의 비동기 동작을 가능하게 하는 메커니즘입니다.

#### 이벤트 루프 구성 요소
```javascript
console.log('1. Synchronous');

setTimeout(() => {
  console.log('2. Macrotask (setTimeout)');
}, 0);

Promise.resolve().then(() => {
  console.log('3. Microtask (Promise)');
});

console.log('4. Synchronous');

// 출력 순서:
// 1. Synchronous
// 4. Synchronous
// 3. Microtask (Promise)
// 2. Macrotask (setTimeout)
```

#### 마이크로태스크 vs 매크로태스크

**마이크로태스크 (높은 우선순위):**
- Promise callbacks (.then, .catch, .finally)
- queueMicrotask()
- MutationObserver

**매크로태스크 (낮은 우선순위):**
- setTimeout
- setInterval
- setImmediate (Node.js)
- I/O operations

```javascript
console.log('Start');

setTimeout(() => console.log('Timeout 1'), 0);
setTimeout(() => console.log('Timeout 2'), 0);

Promise.resolve()
  .then(() => console.log('Promise 1'))
  .then(() => console.log('Promise 2'));

console.log('End');

// 출력:
// Start
// End
// Promise 1
// Promise 2
// Timeout 1
// Timeout 2
```

**인터뷰 팁:**
- 마이크로태스크는 매크로태스크보다 먼저 실행됩니다
- 각 매크로태스크 후에 모든 마이크로태스크가 실행됩니다
- 이벤트 루프는 콜 스택이 비어있을 때만 큐를 확인합니다
- 이해하면 비동기 코드의 실행 순서를 예측할 수 있습니다

### 실전 패턴

#### 재시도 로직
```javascript
async function fetchWithRetry(url, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return await response.json();
      }
      throw new Error(`HTTP ${response.status}`);
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      console.log(`Retry ${i + 1}/${maxRetries}`);
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
}
```

#### 타임아웃
```javascript
function timeout(promise, ms) {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Timeout')), ms)
    )
  ]);
}

// 사용
async function fetchWithTimeout() {
  try {
    const data = await timeout(fetch('/api/data'), 5000);
    return data;
  } catch (error) {
    console.error('Request timed out or failed:', error);
  }
}
```

#### 디바운스와 스로틀
```javascript
// 디바운스: 마지막 호출 후 지연
function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

// 스로틀: 일정 시간마다 한 번만 실행
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// 사용
const debouncedSearch = debounce(searchAPI, 300);
const throttledScroll = throttle(handleScroll, 100);
```

**인터뷰 팁:**
- 재시도 로직은 네트워크 요청에 유용합니다
- 타임아웃은 느린 요청을 방지합니다
- 디바운스는 검색 입력에 적합합니다
- 스로틀은 스크롤/리사이즈 이벤트에 적합합니다
