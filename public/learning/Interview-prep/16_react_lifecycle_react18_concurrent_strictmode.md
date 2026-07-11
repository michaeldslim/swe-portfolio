# 16. React Lifecycle + React 18 Concurrent Rendering + StrictMode에서 useEffect 두 번 실행되는 이유

## 1. 기본 React 라이프사이클 (Class 기준 개념 정리)

### KO

- Class 컴포넌트 기준 주요 라이프사이클 메서드
  - **마운트(Mount)**: `constructor` → `render` → `componentDidMount`
  - **업데이트(Update)**: `render` → `componentDidUpdate`
  - **언마운트(Unmount)**: `componentWillUnmount`
- 함수형 컴포넌트에서는 이러한 단계가 `useEffect`, `useLayoutEffect` 등으로 추상화됩니다.

### EN

- For class components, key lifecycle methods are:
  - **Mount**: `constructor` → `render` → `componentDidMount`
  - **Update**: `render` → `componentDidUpdate`
  - **Unmount**: `componentWillUnmount`
- Function components express lifecycle behavior via hooks like `useEffect`, `useLayoutEffect`.

---

## 2. 함수형 컴포넌트에서의 라이프사이클 (useEffect 기준)

### KO

- `useEffect(() => { ... }, [])`
  - 마운트 후 1번 실행 + 언마운트 시 클린업(`return () => { ... }`)
- `useEffect(() => { ... }, [deps])`
  - 마운트 후 1번 + deps 변경 시마다 실행, 이전 이펙트 클린업 후 재실행

### EN

- `useEffect(() => { ... }, [])`
  - Runs after initial mount, with optional cleanup on unmount.
- `useEffect(() => { ... }, [deps])`
  - Runs after mount and whenever dependencies change, cleaning up the previous effect first.

---

## 3. React 18 + Concurrent Rendering 개념

### KO

- React 18의 Concurrent Rendering은 **렌더링 작업을 쪼개고, 우선순위를 기반으로 중단/재개/폐기**할 수 있는 기능을 제공합니다.
- 예: 사용자 입력, 전환 등 우선순위가 높은 업데이트를 위해 낮은 우선순위 렌더링을 중단할 수 있음.
- 개발자 입장에서는 "렌더 함수가 여러 번 호출될 수 있다"는 점을 항상 염두에 두어야 합니다.

### EN

- React 18 introduces concurrent rendering, which can **interrupt, pause, resume, and discard** renders based on priority.
- This means a render you started may never be committed if React decides to throw it away.
- As a result, components (and effects) may be initialized more than once during development.

---

## 4. StrictMode에서 useEffect가 두 번 실행되는 이유

### 현상 (What You See)

```jsx
useEffect(() => {
  console.log('effect');
  return () => console.log('cleanup');
}, []);
```

- React 18 + StrictMode(개발 모드)에서 위 코드는 다음과 같이 동작:
  - 마운트 1: `effect`
  - 언마운트 1: `cleanup`
  - 마운트 2: `effect`
- 즉, **마운트/언마운트 사이클을 한 번 더 시뮬레이션**하여 총 2번 실행되는 것처럼 보입니다.

### 이유 (Why)

#### KO

- React 18 StrictMode는 **side-effect를 탐지**하고, 컴포넌트가 **idempotent(여러 번 실행해도 안전)** 한지 확인하기 위해:
  - 개발 모드에서만, 마운트 → 언마운트 → 다시 마운트 시나리오를 강제로 수행합니다.
- 이 과정에서 `useEffect` 가 두 번 실행되고, 클린업도 중간에 한 번 더 호출됩니다.
- 실제 프로덕션 빌드에서는 StrictMode의 이 "double invoke" 동작이 **적용되지 않습니다.**

#### EN

- In React 18, StrictMode intentionally **double-invokes** certain lifecycles (including effects) in development to:
  - Detect unsafe side effects.
  - Ensure components can handle being mounted/unmounted multiple times.
- This behavior does **not** occur in production builds.

---

## 5. 예제: 비정상적인 사이드 이펙트 (Bad Side-effect Example)

```jsx
function BadComponent() {
  useEffect(() => {
    // 예: WebSocket을 열고, cleanup을 구현하지 않으면 StrictMode에서 두 개가 열릴 수 있음
    const socket = new WebSocket('wss://example.com');
    socket.send('hello');
    // cleanup 없음 ❌
  }, []);

  return <div>Bad</div>;
}
```

- StrictMode에서 두 번 마운트되므로 WebSocket이 2개 열릴 수 있음.
- 올바른 코드는 반드시 **cleanup** 을 구현해야 합니다.

```jsx
useEffect(() => {
  const socket = new WebSocket('wss://example.com');

  return () => {
    socket.close();
  };
}, []);
```

---

## 6. 면접에서 말할 포인트 (Talking Points)

### KO

- React 18 Concurrent Rendering
  - 렌더링이 여러 번, 또는 중간에 버려질 수 있으므로, **렌더 함수는 순수(pure)** 해야 한다고 강조.
- StrictMode
  - 개발 모드에서만 작동하는 **디버깅 도구**
  - useEffect, useState 초기화 등을 일부러 여러 번 돌려서, 부작용이 안전한지 확인
  - 프로덕션에서는 이러한 두 번 실행 현상이 없음을 확실하게 짚어주기

### EN

- With concurrent rendering, your component’s render function may run multiple times and some renders may never commit.
- StrictMode in dev intentionally double-invokes some lifecycles to surface unsafe side effects.
- Emphasize **idempotent effects** and proper cleanup.

---

## 요약 (Summary)

- **KO**: React 18 Concurrent Rendering에서는 렌더가 여러 번 실행되고 버려질 수 있으며, StrictMode는 개발 모드에서 이러한 시나리오를 시뮬레이션하기 위해 `useEffect` 를 두 번 실행합니다. 이는 사이드 이펙트가 안전하게 작성되었는지 검증하기 위한 의도적인 동작입니다.
- **EN**: In React 18, concurrent rendering allows React to interrupt and discard renders; StrictMode doubles `useEffect` runs in development to detect unsafe side effects, ensuring components remain safe when mounted/unmounted multiple times. This double-run does not happen in production.
