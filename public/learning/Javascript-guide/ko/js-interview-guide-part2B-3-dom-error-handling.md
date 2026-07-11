# JavaScript 인터뷰 가이드: Part 2B-3 - DOM 조작과 에러 처리

## DOM 조작

DOM (Document Object Model) 조작은 프론트엔드 JavaScript 인터뷰에서 중요한 기술입니다. HTML 요소와 프로그래밍 방식으로 상호작용하는 것을 포함합니다.

### 요소 선택

#### 기본 선택 메서드
```javascript
// ID로 선택
const mainHeader = document.getElementById('main-header');

// 클래스 이름으로 (HTMLCollection 반환)
const navItems = document.getElementsByClassName('nav-item');

// 태그 이름으로 (HTMLCollection 반환)
const paragraphs = document.getElementsByTagName('p');

// CSS 선택자로 (첫 번째 일치 항목)
const firstButton = document.querySelector('.btn-primary');

// CSS 선택자로 (모든 일치 항목을 NodeList로)
const allButtons = document.querySelectorAll('.btn');
```

#### 선택 메서드의 차이점

**HTMLCollection vs NodeList:**
```javascript
// HTMLCollection은 라이브 (자동 업데이트)
const paragraphs = document.getElementsByTagName('p');

// NodeList는 정적 (자동 업데이트 안 됨)
const paragraphsNodeList = document.querySelectorAll('p');

// 새 단락 추가
const newP = document.createElement('p');
document.body.appendChild(newP);

console.log(paragraphs.length);          // 업데이트된 개수
console.log(paragraphsNodeList.length);  // 원래 개수
```

**컬렉션을 배열로 변환:**
```javascript
const buttons = document.getElementsByClassName('btn');
const buttonsArray = Array.from(buttons);
// 또는
const buttonsArray2 = [...buttons];

// 이제 배열 메서드 사용 가능
buttonsArray.forEach(btn => console.log(btn));
```

**인터뷰 팁:**
- `querySelector`는 더 유연하지만 `getElementById`보다 느립니다
- `querySelectorAll`은 정적 NodeList를 반환합니다
- HTMLCollection은 라이브이지만 배열 메서드가 없습니다
- 복잡한 선택에는 CSS 선택자를 사용하세요

### 요소 생성과 수정

#### 요소 생성
```javascript
// 새 요소 생성
const div = document.createElement('div');
div.className = 'container';
div.id = 'main-container';

// 텍스트 노드 생성
const text = document.createTextNode('Hello World');
div.appendChild(text);

// innerHTML 사용 (더 간단하지만 XSS 위험)
div.innerHTML = '<p>Hello World</p>';

// textContent 사용 (안전함)
div.textContent = 'Hello World';
```

#### 요소 추가
```javascript
const parent = document.getElementById('parent');
const child = document.createElement('div');

// 끝에 추가
parent.appendChild(child);

// 특정 위치에 삽입
parent.insertBefore(child, parent.firstChild);

// 최신 메서드
parent.append(child);           // 끝에 추가
parent.prepend(child);          // 시작에 추가
parent.before(child);           // 이전에 추가
parent.after(child);            // 이후에 추가
```

#### 속성 조작
```javascript
const img = document.querySelector('img');

// 속성 가져오기/설정
img.getAttribute('src');
img.setAttribute('src', 'new-image.jpg');
img.removeAttribute('alt');

// 직접 속성 접근
img.src = 'new-image.jpg';
img.alt = 'Description';

// 데이터 속성
img.dataset.userId = '123';  // data-user-id="123"
console.log(img.dataset.userId);
```

#### 클래스 조작
```javascript
const element = document.querySelector('.box');

// 클래스 추가/제거
element.classList.add('active');
element.classList.remove('inactive');
element.classList.toggle('visible');

// 클래스 확인
if (element.classList.contains('active')) {
  console.log('Element is active');
}

// 여러 클래스
element.classList.add('class1', 'class2', 'class3');
```

#### 스타일 조작
```javascript
const element = document.querySelector('.box');

// 인라인 스타일
element.style.color = 'red';
element.style.backgroundColor = 'blue';
element.style.fontSize = '20px';

// 여러 스타일
Object.assign(element.style, {
  color: 'red',
  backgroundColor: 'blue',
  fontSize: '20px'
});

// 계산된 스타일 가져오기
const styles = window.getComputedStyle(element);
console.log(styles.color);
```

**인터뷰 팁:**
- `innerHTML`은 XSS 공격에 취약할 수 있습니다
- `textContent`는 `innerText`보다 빠릅니다
- `classList`는 클래스 조작에 권장됩니다
- 인라인 스타일은 CSS 클래스보다 우선순위가 높습니다

### 이벤트 처리

#### 이벤트 리스너 추가
```javascript
const button = document.querySelector('button');

// 기본 이벤트 리스너
button.addEventListener('click', function(event) {
  console.log('Button clicked!');
  console.log('Event:', event);
});

// 화살표 함수
button.addEventListener('click', (e) => {
  console.log('Clicked at:', e.clientX, e.clientY);
});

// 이벤트 리스너 제거
function handleClick(e) {
  console.log('Clicked');
}
button.addEventListener('click', handleClick);
button.removeEventListener('click', handleClick);
```

#### 이벤트 객체
```javascript
element.addEventListener('click', (event) => {
  // 이벤트 타입
  console.log(event.type);  // 'click'
  
  // 타겟 요소
  console.log(event.target);
  console.log(event.currentTarget);
  
  // 마우스 위치
  console.log(event.clientX, event.clientY);
  
  // 키보드 이벤트
  console.log(event.key, event.keyCode);
  
  // 기본 동작 방지
  event.preventDefault();
  
  // 전파 중지
  event.stopPropagation();
});
```

#### 이벤트 위임
```javascript
// 비효율적: 각 항목에 리스너 추가
const items = document.querySelectorAll('.item');
items.forEach(item => {
  item.addEventListener('click', handleClick);
});

// 효율적: 부모에 리스너 하나만 추가
const list = document.querySelector('.list');
list.addEventListener('click', (e) => {
  if (e.target.classList.contains('item')) {
    handleClick(e);
  }
});
```

#### 일반적인 이벤트
```javascript
// 마우스 이벤트
element.addEventListener('click', handler);
element.addEventListener('dblclick', handler);
element.addEventListener('mouseenter', handler);
element.addEventListener('mouseleave', handler);
element.addEventListener('mousemove', handler);

// 키보드 이벤트
element.addEventListener('keydown', handler);
element.addEventListener('keyup', handler);
element.addEventListener('keypress', handler);

// 폼 이벤트
form.addEventListener('submit', handler);
input.addEventListener('change', handler);
input.addEventListener('input', handler);
input.addEventListener('focus', handler);
input.addEventListener('blur', handler);

// 문서 이벤트
document.addEventListener('DOMContentLoaded', handler);
window.addEventListener('load', handler);
window.addEventListener('resize', handler);
window.addEventListener('scroll', handler);
```

**인터뷰 팁:**
- 이벤트 위임은 동적 요소에 효율적입니다
- `preventDefault()`는 기본 동작을 방지합니다
- `stopPropagation()`은 이벤트 버블링을 중지합니다
- `target`은 이벤트를 트리거한 요소, `currentTarget`은 리스너가 연결된 요소입니다

### DOM 탐색

```javascript
const element = document.querySelector('.item');

// 부모
console.log(element.parentElement);
console.log(element.parentNode);

// 자식
console.log(element.children);           // HTMLCollection
console.log(element.childNodes);         // NodeList (텍스트 노드 포함)
console.log(element.firstElementChild);
console.log(element.lastElementChild);

// 형제
console.log(element.nextElementSibling);
console.log(element.previousElementSibling);

// 가장 가까운 조상
console.log(element.closest('.container'));
```

**인터뷰 팁:**
- `children`은 요소만, `childNodes`는 모든 노드를 포함합니다
- `closest()`는 요소 자신부터 위로 검색합니다
- `parentElement`와 `parentNode`는 대부분 동일하지만 document의 경우 다릅니다

## 에러 처리

에러를 적절히 처리하는 것은 견고한 애플리케이션을 만드는 데 필수적입니다.

### Try-Catch-Finally

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

#### 에러 객체
```javascript
try {
  throw new Error('Something went wrong');
} catch (error) {
  console.log(error.name);     // 'Error'
  console.log(error.message);  // 'Something went wrong'
  console.log(error.stack);    // 스택 트레이스
}
```

#### 특정 에러 처리
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

**인터뷰 팁:**
- `finally` 블록은 항상 실행됩니다 (return이 있어도)
- try-catch는 동기 코드에만 작동합니다
- 비동기 에러는 Promise catch나 try-catch with async/await로 처리합니다
- 에러를 던지면 실행이 중단됩니다

### 커스텀 에러

```javascript
// 커스텀 에러 클래스
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

### 비동기 에러 처리

#### Promise 에러
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

#### Async/Await 에러
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

#### 여러 Promise 에러 처리
```javascript
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

// 개별 에러 처리
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

**인터뷰 팁:**
- Promise 체인에서는 `.catch()`를 사용합니다
- async/await에서는 try-catch를 사용합니다
- `Promise.allSettled()`는 모든 결과를 받고 싶을 때 유용합니다
- 에러를 재던지면 호출자가 처리할 수 있습니다

### 전역 에러 처리

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

### 에러 처리 모범 사례

```javascript
// 1. 의미 있는 에러 메시지
throw new Error('User not found with ID: ' + userId);

// 2. 에러 컨텍스트 제공
class APIError extends Error {
  constructor(message, statusCode, endpoint) {
    super(message);
    this.statusCode = statusCode;
    this.endpoint = endpoint;
    this.timestamp = new Date();
  }
}

// 3. 에러 로깅
function logError(error) {
  console.error({
    message: error.message,
    stack: error.stack,
    timestamp: new Date().toISOString()
  });
  // 에러 추적 서비스로 전송 (예: Sentry)
}

// 4. 사용자 친화적 에러 메시지
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

// 5. 에러 복구
async function fetchWithFallback(url, fallbackUrl) {
  try {
    return await fetch(url).then(r => r.json());
  } catch (error) {
    console.warn('Primary endpoint failed, trying fallback');
    return await fetch(fallbackUrl).then(r => r.json());
  }
}
```

**인터뷰 팁:**
- 항상 의미 있는 에러 메시지를 제공하세요
- 에러를 적절한 레벨에서 처리하세요
- 사용자와 개발자를 위한 에러 메시지를 구분하세요
- 전역 에러 핸들러를 사용하여 처리되지 않은 에러를 잡으세요
- 프로덕션에서는 에러를 로깅 서비스로 전송하세요
- 가능한 경우 에러에서 복구하세요 (폴백 제공)
