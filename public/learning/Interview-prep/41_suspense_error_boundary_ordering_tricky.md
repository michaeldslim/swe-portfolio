# 41. Suspense vs Error Boundary: 어떤 fallback이 먼저 보일까?

## 질문 (Question)

다음 코드에서 네트워크 에러가 발생하면 어떤 UI 가 보일까요?

```javascript
import React, { Suspense } from 'react';

function fetchUser() {
  throw new Promise(() => {}); // 로딩 중인 Promise 라고 가정
}

function fetchUserWithError() {
  throw new Error('Failed to load user');
}

function UserProfile({ mode }) {
  if (mode === 'loading') {
    const user = fetchUser();
    return <div>{user.name}</div>;
  }

  if (mode === 'error') {
    const user = fetchUserWithError();
    return <div>{user.name}</div>;
  }

  return null;
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div>Error Boundary Fallback</div>;
    }
    return this.props.children;
  }
}

function App({ mode }) {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <UserProfile mode={mode} />
      </Suspense>
    </ErrorBoundary>
  );
}
```

1. `mode="loading"` 일 때 어떤 UI 가 보이나요?
2. `mode="error"` 일 때 어떤 UI 가 보이나요?
3. Suspense 와 Error Boundary 의 **처리 순서**를 기준으로 설명해 보세요.

---

## 정답 & 해설 (Answer & Explanation)

### 1) mode = "loading"

- `UserProfile` 은 `fetchUser()` 를 호출하고, 이 함수는 **Promise 를 throw** 합니다.
- React 는 **Promise 가 throw 된 것을 보고 Suspense fallback 으로 전환**합니다.
- 결과:
  - `Loading...` 이 화면에 보입니다.
  - Error Boundary 는 관여하지 않습니다 (에러가 아니라 "대기" 상태이기 때문).

### 2) mode = "error"

- `UserProfile` 은 `fetchUserWithError()` 를 호출하고, 이 함수는 **Error 를 throw** 합니다.
- React 는 **Error 를 Error Boundary 에게 전달**합니다.
- 결과:
  - `Error Boundary Fallback` 이 보이고,
  - Suspense 의 `fallback` 은 사용되지 않습니다 (에러이기 때문, Promise 가 아님).

### 3) 처리 순서 / Responsibility

#### 한국어 (Korean)

- Suspense 는 **Promise(대기)** 를 처리합니다.
  - 컴포넌트가 렌더링 중에 Promise 를 throw 하면, 해당 부분을 "일시 중단" 하고 Suspense fallback 을 보여줍니다.
- Error Boundary 는 **Error(예외)** 를 처리합니다.
  - 렌더링/라이프사이클 중에 Error 가 throw 되면, 가장 가까운 Error Boundary 가 이를 잡고 fallback UI 를 렌더합니다.
- 위 코드에서 `ErrorBoundary` 가 **Suspense 바깥**에 있기 때문에:
  - Promise → Suspense 가 먼저 처리.
  - Error → ErrorBoundary 가 처리.

#### English

- Suspense deals with **Promises (pending async)**.
  - When a component throws a Promise, React suspends that subtree and shows the Suspense `fallback`.
- Error Boundaries deal with **Errors**.
  - When a component throws an Error during render, the nearest Error Boundary catches it and shows its fallback.
- In this tree, `ErrorBoundary` wraps `Suspense`:
  - If a Promise is thrown → Suspense handles it → `Loading...` appears.
  - If an Error is thrown → ErrorBoundary handles it → `Error Boundary Fallback` appears.

---

## 요약 (Summary)

- **KO**: Suspense 는 Promise 기반 "로딩 대기"를 처리하고, Error Boundary 는 Error 를 처리합니다. 같은 컴포넌트 트리 안에서도 **무엇이 throw 되었는지(Promise vs Error)**, 그리고 **트리 구조 상에서 어느 쪽이 바깥에 있는지**에 따라 어떤 fallback 이 보이는지가 달라집니다.
- **EN**: Suspense handles Promises (loading), Error Boundaries handle Errors; which fallback you see depends on what’s thrown and how you compose them in the tree.
