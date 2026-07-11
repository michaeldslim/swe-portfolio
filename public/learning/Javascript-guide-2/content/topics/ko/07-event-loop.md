# 이벤트 루프

## 이벤트 루프란?
이벤트 루프는 JavaScript의 비동기 동작을 가능하게 하는 메커니즘입니다. 싱글 스레드인 JavaScript가 논블로킹 방식으로 작동할 수 있게 합니다.

## 이벤트 루프 구성 요소

### 1. 콜 스택 (Call Stack)
함수 호출을 추적하는 LIFO(Last In, First Out) 구조입니다.

```javascript
function first() {
  console.log('First');
  second();
}

function second() {
  console.log('Second');
}

first();
// 콜 스택:
// 1. first() 푸시
// 2. console.log('First') 푸시 및 팝
// 3. second() 푸시
// 4. console.log('Second') 푸시 및 팝
// 5. second() 팝
// 6. first() 팝
```

### 2. Web APIs
브라우저가 제공하는 API들입니다:
- setTimeout
- setInterval
- fetch
- DOM events
- XMLHttpRequest

### 3. 콜백 큐 (Callback Queue / Task Queue)
매크로태스크가 대기하는 큐입니다.

### 4. 마이크로태스크 큐 (Microtask Queue)
Promise 콜백과 같은 마이크로태스크가 대기하는 큐입니다.

## 실행 순서

### 기본 실행 순서:
```javascript
console.log('1');

setTimeout(() => {
  console.log('2');
}, 0);

Promise.resolve().then(() => {
  console.log('3');
});

console.log('4');

// 출력: 1, 4, 3, 2
```

### 실행 과정:
1. **동기 코드 실행**: console.log('1'), console.log('4')
2. **마이크로태스크 실행**: Promise then (console.log('3'))
3. **매크로태스크 실행**: setTimeout (console.log('2'))

## 마이크로태스크 vs 매크로태스크

### 마이크로태스크 (높은 우선순위):
- Promise callbacks (.then, .catch, .finally)
- queueMicrotask()
- MutationObserver
- process.nextTick() (Node.js)

### 매크로태스크 (낮은 우선순위):
- setTimeout
- setInterval
- setImmediate (Node.js)
- I/O operations
- UI rendering

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

## 이벤트 루프 작동 방식

### 단계별 설명:
1. 콜 스택에서 동기 코드 실행
2. 콜 스택이 비면 마이크로태스크 큐 확인
3. 모든 마이크로태스크 실행
4. 필요시 렌더링
5. 매크로태스크 큐에서 하나의 태스크 실행
6. 1단계로 돌아감

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

// 실행 순서:
// 1. Script start (동기)
// 2. Script end (동기)
// 3. Promise 1 (마이크로태스크)
// 4. Promise 2 (마이크로태스크)
// 5. setTimeout (매크로태스크)
```

## 복잡한 예제

### 중첩된 Promise와 setTimeout:
```javascript
console.log('1');

setTimeout(() => {
  console.log('2');
  Promise.resolve().then(() => {
    console.log('3');
  });
}, 0);

Promise.resolve().then(() => {
  console.log('4');
  setTimeout(() => {
    console.log('5');
  }, 0);
});

console.log('6');

// 출력: 1, 6, 4, 2, 3, 5
// 설명:
// 1, 6: 동기 코드
// 4: 첫 번째 Promise (마이크로태스크)
// 2: 첫 번째 setTimeout (매크로태스크)
// 3: setTimeout 내부의 Promise (마이크로태스크)
// 5: Promise 내부의 setTimeout (매크로태스크)
```

### async/await와 이벤트 루프:
```javascript
async function async1() {
  console.log('async1 start');
  await async2();
  console.log('async1 end');
}

async function async2() {
  console.log('async2');
}

console.log('script start');

setTimeout(() => {
  console.log('setTimeout');
}, 0);

async1();

new Promise((resolve) => {
  console.log('promise1');
  resolve();
}).then(() => {
  console.log('promise2');
});

console.log('script end');

// 출력:
// script start
// async1 start
// async2
// promise1
// script end
// async1 end
// promise2
// setTimeout
```

## 블로킹 코드의 영향

### 블로킹 예제:
```javascript
console.log('Start');

// 블로킹 코드
for (let i = 0; i < 1000000000; i++) {
  // 오래 걸리는 작업
}

console.log('End');

setTimeout(() => {
  console.log('Timeout');
}, 0);

// Timeout은 루프가 끝날 때까지 실행되지 않음
```

### 해결책 - 작업 분할:
```javascript
function processLargeArray(array) {
  const chunkSize = 100;
  let index = 0;
  
  function processChunk() {
    const chunk = array.slice(index, index + chunkSize);
    
    // 청크 처리
    chunk.forEach(item => {
      // 작업 수행
    });
    
    index += chunkSize;
    
    if (index < array.length) {
      setTimeout(processChunk, 0); // 다음 청크를 위해 양보
    }
  }
  
  processChunk();
}
```

## 실전 패턴

### 디바운스:
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

// 사용
const debouncedSearch = debounce(searchAPI, 300);
input.addEventListener('input', debouncedSearch);
```

### 스로틀:
```javascript
function throttle(func, limit) {
  let inThrottle;
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

// 사용
const throttledScroll = throttle(handleScroll, 100);
window.addEventListener('scroll', throttledScroll);
```

## 인터뷰 질문:
1. **이벤트 루프는 어떻게 작동하나요?**
   - 콜 스택이 비면 큐 확인
   - 마이크로태스크 먼저 처리
   - 그 다음 매크로태스크 처리

2. **마이크로태스크와 매크로태스크의 차이점은?**
   - 마이크로태스크가 우선순위 높음
   - 마이크로태스크는 모두 실행 후 매크로태스크
   - Promise는 마이크로태스크, setTimeout은 매크로태스크

3. **JavaScript가 싱글 스레드인데 어떻게 비동기가 가능한가요?**
   - 이벤트 루프 덕분
   - Web APIs가 백그라운드에서 작업 처리
   - 완료되면 콜백을 큐에 추가
