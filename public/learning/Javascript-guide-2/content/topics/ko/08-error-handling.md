# 에러 처리

## Try-Catch-Finally
JavaScript에서 에러를 처리하는 기본 메커니즘입니다.

### 기본 사용법:
```javascript
try {
  // 에러가 발생할 수 있는 코드
  const data = JSON.parse(invalidJSON);
  console.log(data);
} catch (error) {
  // 에러 처리
  console.error('Error parsing JSON:', error.message);
} finally {
  // 항상 실행됨
  console.log('Cleanup');
}
```

### 에러 객체:
```javascript
try {
  throw new Error('Something went wrong');
} catch (error) {
  console.log(error.name);     // 'Error'
  console.log(error.message);  // 'Something went wrong'
  console.log(error.stack);    // 스택 트레이스
}
```

## 에러 타입

### 내장 에러 타입:
```javascript
// ReferenceError
try {
  console.log(nonExistentVariable);
} catch (error) {
  console.log(error instanceof ReferenceError); // true
}

// TypeError
try {
  null.method();
} catch (error) {
  console.log(error instanceof TypeError); // true
}

// SyntaxError
try {
  eval('invalid syntax {');
} catch (error) {
  console.log(error instanceof SyntaxError); // true
}

// RangeError
try {
  const arr = new Array(-1);
} catch (error) {
  console.log(error instanceof RangeError); // true
}
```

### 특정 에러 처리:
```javascript
try {
  // 코드
} catch (error) {
  if (error instanceof TypeError) {
    console.error('Type error:', error.message);
  } else if (error instanceof ReferenceError) {
    console.error('Reference error:', error.message);
  } else {
    console.error('Unknown error:', error);
  }
}
```

## 커스텀 에러

### 커스텀 에러 클래스:
```javascript
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

class NetworkError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = 'NetworkError';
    this.statusCode = statusCode;
  }
}

// 사용
function validateUser(user) {
  if (!user.name) {
    throw new ValidationError('Name is required');
  }
  if (!user.email) {
    throw new ValidationError('Email is required');
  }
}

try {
  validateUser({ name: 'John' });
} catch (error) {
  if (error instanceof ValidationError) {
    console.error('Validation failed:', error.message);
  }
}
```

## 비동기 에러 처리

### Promise 에러:
```javascript
// .catch()로 처리
fetch('/api/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => {
    console.error('Error:', error);
  });

// 체인에서 에러 처리
fetch('/api/data')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return response.json();
  })
  .then(data => console.log(data))
  .catch(error => console.error(error));
```

### Async/Await 에러:
```javascript
async function fetchData() {
  try {
    const response = await fetch('/api/data');
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;  // 재던지기
  }
}

// 사용
async function main() {
  try {
    const data = await fetchData();
    console.log(data);
  } catch (error) {
    console.error('Failed to load data:', error);
  }
}
```

### 여러 Promise 에러 처리:
```javascript
// Promise.all - 하나라도 실패하면 전체 실패
async function fetchMultiple() {
  try {
    const [users, posts] = await Promise.all([
      fetch('/api/users').then(r => r.json()),
      fetch('/api/posts').then(r => r.json())
    ]);
    return { users, posts };
  } catch (error) {
    console.error('One or more requests failed:', error);
  }
}

// Promise.allSettled - 모든 결과 받기
async function fetchMultipleIndividual() {
  const results = await Promise.allSettled([
    fetch('/api/users').then(r => r.json()),
    fetch('/api/posts').then(r => r.json())
  ]);
  
  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      console.log(`Request ${index} succeeded:`, result.value);
    } else {
      console.error(`Request ${index} failed:`, result.reason);
    }
  });
}
```

## 전역 에러 처리

### 브라우저:
```javascript
// 처리되지 않은 Promise rejection
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  event.preventDefault();  // 기본 에러 로깅 방지
});

// 전역 에러 핸들러
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
  // 에러 로깅 서비스로 전송
});

// 리소스 로딩 에러
window.addEventListener('error', (event) => {
  if (event.target.tagName === 'IMG') {
    console.error('Image failed to load:', event.target.src);
    event.target.src = 'fallback-image.jpg';
  }
}, true);  // 캡처 단계에서 처리
```

### Node.js:
```javascript
// 처리되지 않은 rejection
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// 처리되지 않은 exception
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);  // 프로세스 종료
});
```

## 에러 처리 모범 사례

### 1. 의미 있는 에러 메시지:
```javascript
// 나쁨
throw new Error('Error');

// 좋음
throw new Error(`User not found with ID: ${userId}`);
```

### 2. 에러 컨텍스트 제공:
```javascript
class APIError extends Error {
  constructor(message, statusCode, endpoint) {
    super(message);
    this.statusCode = statusCode;
    this.endpoint = endpoint;
    this.timestamp = new Date();
  }
}

throw new APIError('Request failed', 404, '/api/users');
```

### 3. 에러 로깅:
```javascript
function logError(error) {
  console.error({
    message: error.message,
    stack: error.stack,
    timestamp: new Date().toISOString()
  });
  
  // 에러 추적 서비스로 전송 (예: Sentry)
  // sendToErrorTrackingService(error);
}
```

### 4. 사용자 친화적 에러 메시지:
```javascript
function handleError(error) {
  let userMessage;
  
  if (error instanceof NetworkError) {
    userMessage = '네트워크 연결을 확인해주세요.';
  } else if (error instanceof ValidationError) {
    userMessage = error.message;
  } else {
    userMessage = '문제가 발생했습니다. 나중에 다시 시도해주세요.';
  }
  
  showErrorToUser(userMessage);
  logError(error);  // 개발자를 위한 상세 로깅
}
```

### 5. 에러 복구:
```javascript
async function fetchWithFallback(url, fallbackUrl) {
  try {
    return await fetch(url).then(r => r.json());
  } catch (error) {
    console.warn('Primary endpoint failed, trying fallback');
    return await fetch(fallbackUrl).then(r => r.json());
  }
}
```

### 6. 재시도 로직:
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

## 인터뷰 질문:
1. **try-catch는 어떻게 작동하나요?**
   - try 블록에서 에러 발생 시 catch로 이동
   - finally는 항상 실행됨
   - 동기 코드에만 작동

2. **비동기 에러는 어떻게 처리하나요?**
   - Promise: .catch() 사용
   - Async/Await: try-catch 사용
   - 전역 핸들러로 처리되지 않은 에러 잡기

3. **커스텀 에러를 만드는 이유는?**
   - 더 구체적인 에러 타입
   - 추가 정보 포함 가능
   - 에러 처리 로직 개선
