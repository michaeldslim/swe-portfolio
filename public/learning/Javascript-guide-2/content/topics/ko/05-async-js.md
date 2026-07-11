# 비동기 JavaScript

## 비동기 프로그래밍 개요
JavaScript는 싱글 스레드이지만 비동기 작업을 통해 논블로킹 방식으로 작동할 수 있습니다.

### 동기 vs 비동기:
```javascript
// 동기 (블로킹)
console.log('1');
console.log('2');
console.log('3');
// 출력: 1, 2, 3

// 비동기 (논블로킹)
console.log('1');
setTimeout(() => console.log('2'), 0);
console.log('3');
// 출력: 1, 3, 2
```

## 콜백
콜백은 비동기 작업을 처리하는 가장 기본적인 방법입니다.

### 기본 콜백:
```javascript
function fetchData(callback) {
  setTimeout(() => {
    const data = { id: 1, name: 'Product' };
    callback(data);
  }, 1000);
}

fetchData((data) => {
  console.log('Data received:', data);
});
```

### 콜백 지옥:
```javascript
// 피해야 할 패턴
fetchUser(userId, (user) => {
  fetchPosts(user.id, (posts) => {
    fetchComments(posts[0].id, (comments) => {
      fetchLikes(comments[0].id, (likes) => {
        console.log(likes);
      });
    });
  });
});
```

## Promise
Promise는 비동기 작업의 최종 완료 또는 실패를 나타내는 객체입니다.

### Promise 생성:
```javascript
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
```

### Promise 사용:
```javascript
myPromise
  .then(result => {
    console.log(result);
    return 'Next step';
  })
  .then(nextResult => {
    console.log(nextResult);
  })
  .catch(error => {
    console.error(error);
  })
  .finally(() => {
    console.log('Cleanup');
  });
```

### Promise 체이닝:
```javascript
fetch('/api/user')
  .then(response => response.json())
  .then(user => {
    console.log('User:', user);
    return fetch(`/api/posts/${user.id}`);
  })
  .then(response => response.json())
  .then(posts => {
    console.log('Posts:', posts);
  })
  .catch(error => {
    console.error('Error:', error);
  });
```

### Promise 정적 메서드:

#### Promise.all():
```javascript
const promise1 = Promise.resolve(1);
const promise2 = Promise.resolve(2);
const promise3 = Promise.resolve(3);

Promise.all([promise1, promise2, promise3])
  .then(values => {
    console.log(values); // [1, 2, 3]
  })
  .catch(error => {
    // 하나라도 실패하면 전체 실패
    console.error(error);
  });
```

#### Promise.race():
```javascript
const slow = new Promise(resolve => setTimeout(() => resolve('slow'), 2000));
const fast = new Promise(resolve => setTimeout(() => resolve('fast'), 1000));

Promise.race([slow, fast])
  .then(result => {
    console.log(result); // 'fast'
  });
```

#### Promise.allSettled():
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

#### Promise.any():
```javascript
const promises = [
  Promise.reject('error1'),
  Promise.resolve('success'),
  Promise.reject('error2')
];

Promise.any(promises)
  .then(result => {
    console.log(result); // 'success'
  });
```

## Async/Await
Async/Await는 Promise를 더 동기적인 코드처럼 작성할 수 있게 해주는 문법입니다.

### 기본 사용법:
```javascript
async function fetchData() {
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
```

### 병렬 vs 순차 실행:

#### 순차 실행 (느림):
```javascript
async function sequential() {
  const user = await fetchUser(1);      // 1초
  const posts = await fetchPosts(1);    // 1초
  const comments = await fetchComments(1); // 1초
  // 총 3초
  return { user, posts, comments };
}
```

#### 병렬 실행 (빠름):
```javascript
async function parallel() {
  const [user, posts, comments] = await Promise.all([
    fetchUser(1),
    fetchPosts(1),
    fetchComments(1)
  ]);
  // 총 1초
  return { user, posts, comments };
}
```

### 에러 처리:
```javascript
async function fetchWithErrorHandling() {
  try {
    const response = await fetch('/api/data');
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    // 에러 처리 또는 재던지기
    throw error;
  }
}
```

### 루프에서의 async/await:
```javascript
// 순차 처리
async function processSequentially(ids) {
  const results = [];
  for (const id of ids) {
    const result = await fetchData(id);
    results.push(result);
  }
  return results;
}

// 병렬 처리
async function processParallel(ids) {
  const promises = ids.map(id => fetchData(id));
  return await Promise.all(promises);
}
```

## 이벤트 루프
이벤트 루프는 JavaScript의 비동기 동작을 가능하게 하는 메커니즘입니다.

### 이벤트 루프 구성 요소:
1. **콜 스택**: 함수 호출 추적
2. **Web APIs**: 브라우저 제공 기능
3. **콜백 큐**: 콜백 대기
4. **마이크로태스크 큐**: Promise 콜백
5. **이벤트 루프**: 큐와 스택 관리

### 실행 순서:
```javascript
console.log('1');

setTimeout(() => console.log('2'), 0);

Promise.resolve().then(() => console.log('3'));

console.log('4');

// 출력: 1, 4, 3, 2
// 설명:
// 1. 동기 코드 먼저 (1, 4)
// 2. 마이크로태스크 (Promise) (3)
// 3. 매크로태스크 (setTimeout) (2)
```

### 마이크로태스크 vs 매크로태스크:

**마이크로태스크 (높은 우선순위):**
- Promise callbacks
- queueMicrotask()
- MutationObserver

**매크로태스크 (낮은 우선순위):**
- setTimeout
- setInterval
- setImmediate
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

## 실전 패턴

### 재시도 로직:
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

### 타임아웃:
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
    console.error('Request timed out:', error);
  }
}
```

### 디바운스:
```javascript
function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

const debouncedSearch = debounce(searchAPI, 300);
```

### 스로틀:
```javascript
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

const throttledScroll = throttle(handleScroll, 100);
```

### 인터뷰 질문:
1. **Promise와 콜백의 차이점은?**
   - Promise는 체이닝 가능
   - 더 나은 에러 처리
   - 콜백 지옥 방지

2. **async/await의 장점은?**
   - 동기 코드처럼 읽기 쉬움
   - try/catch로 에러 처리
   - Promise의 문법적 설탕

3. **이벤트 루프는 어떻게 작동하나요?**
   - 콜 스택이 비면 큐 확인
   - 마이크로태스크 먼저 처리
   - 그 다음 매크로태스크 처리
