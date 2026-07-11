# 33. React Suspense + 데이터 패칭 & Error Boundary

## 1. 질문 (Question)

- React에서 **Suspense** 는 무엇을 하는 기능인가요?
- 데이터 패칭과 함께 Suspense를 어떻게 사용할 수 있나요? (개념 위주)
- **Error Boundary** 는 무엇이며, Suspense 와 어떤 점이 다른가요?

---

## 2. 개념 정리 (Concept)

### 한국어 (Korean)

- **Suspense**
  - React가 **일부 컴포넌트 트리를 일시적으로 "기다리게" 만들고, 그동안 fallback UI 를 보여줄 수 있게 하는 메커니즘.
  - 대표적으로 **lazy-loaded component** 나 **데이터 패칭 결과**를 기다릴 때 사용.

- **Error Boundary**
  - 자식 컴포넌트 트리에서 발생한 **렌더링/라이프사이클 에러를 잡아서 대체 UI를 보여주는 컴포넌트**.
  - 클래스 컴포넌트에서 `componentDidCatch`, `getDerivedStateFromError` 로 구현하거나, React 18+ 에서는 일부 라이브러리/프레임워크에서 래퍼를 제공.

- **차이점 요약**
  - Suspense는 **"로딩 중" 상태를 다루는 것** (Promise 기반 대기).
  - Error Boundary는 **"에러가 터졌을 때" UI 를 보호하는 것**.

### English

- **Suspense**
  - Lets React **pause rendering of a part of the tree** while some async work is in progress, and show a fallback UI meanwhile.
  - Commonly used for **lazy-loaded components** or **data fetching**.

- **Error Boundary**
  - A component that **catches rendering/lifecycle errors** in its child tree and shows a fallback UI instead of breaking the whole app.

- **Difference**
  - Suspense: handles **loading/waiting states** (via thrown Promises).
  - Error Boundary: handles **runtime errors** thrown during rendering/lifecycle.

---

## 3. 간단 예시 (Lazy + Suspense Example)

```javascript
import React, { Suspense, lazy } from 'react';

const Profile = lazy(() => import('./Profile'));

function App() {
  return (
    <Suspense fallback={<div>Loading profile...</div>}>
      <Profile />
    </Suspense>
  );
}
```

- **KO 설명**
  - `Profile` 컴포넌트를 동적으로 로드하는 동안, `Suspense` 가 `fallback` UI (`Loading profile...`) 를 먼저 보여줍니다.
  - 로딩이 끝나면 `Profile` 이 실제로 렌더링됩니다.

- **EN Explanation**
  - While the `Profile` component is being lazily loaded, Suspense shows the `fallback`.
  - Once the import Promise resolves, React renders `Profile`.

---

## 4. Error Boundary 예시 (Error Boundary Example)

```javascript
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught an error', error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

function BuggyComponent() {
  throw new Error('Crash!');
}

function App() {
  return (
    <ErrorBoundary>
      <BuggyComponent />
    </ErrorBoundary>
  );
}
```

- **KO 설명**
  - `BuggyComponent` 에서 에러가 발생하면, `ErrorBoundary` 가 에러를 잡고 `Something went wrong.` UI 로 대체합니다.
- **EN Explanation**
  - When `BuggyComponent` throws, the `ErrorBoundary` catches it and renders a fallback instead of breaking the entire app.

---

## 5. 면접 포인트 (Interview Angle)

### 한국어 (Korean)

- Suspense 는 **로딩 상태 관리 + declarative한 대기 처리**.
- Error Boundary 는 **에러 격리 (fault isolation)**.
- 둘 다 UI를 안전하고 부드럽게 유지하기 위한 도구라는 공통점이 있지만, **로딩 vs 에러** 라는 다른 문제를 다룹니다.

### English

- Suspense focuses on **pending/loading states** and declarative fallbacks.
- Error Boundaries focus on **runtime errors** and isolating failures.
- Both keep the UI resilient, but they solve different problems.

---

## 6. 한 줄 요약 (Summary)

- **KO**: Suspense 는 비동기 로딩이 끝날 때까지 일부 트리를 잠시 "보류"시키고 fallback UI 를 보여주는 메커니즘이고, Error Boundary 는 렌더링/라이프사이클 에러가 발생했을 때 해당 부분을 잡아서 대체 UI 를 보여주는 컴포넌트입니다.
- **EN**: Suspense lets React wait for async work and show a fallback while loading, whereas Error Boundaries catch rendering/lifecycle errors and display a fallback instead of crashing the whole app.
