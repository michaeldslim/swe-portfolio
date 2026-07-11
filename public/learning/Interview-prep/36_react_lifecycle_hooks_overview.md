# 36. React Lifecycle (함수형 컴포넌트 기준) / React Lifecycle with Hooks

## 1. 질문 (Question)

- 클래스 컴포넌트 시절의 `componentDidMount`, `componentDidUpdate`, `componentWillUnmount` 같은 라이프사이클이, **함수형 컴포넌트 + Hooks** 에서는 어떻게 표현되나요?
- 기본적인 렌더링/업데이트/언마운트 흐름을 설명해 보세요.

---

## 2. 기본 흐름 (Basic Flow)

### 한국어 (Korean)

- 함수형 컴포넌트는 **그 자체가 렌더 함수**입니다.
  - props, state 가 바뀔 때마다 컴포넌트 함수가 다시 호출됩니다.
- 라이프사이클 관련 작업은 대부분 `useEffect` 로 표현합니다.

### English

- Function components are **just functions that run on every render**.
- Lifecycle behavior is expressed via hooks, primarily `useEffect`.

---

## 3. 클래스 vs Hooks 매핑 (Class Lifecycle vs Hooks)

### 한국어 (Korean)

- **componentDidMount** (마운트 후 1회)
  - `useEffect(() => { ... }, [])`
- **componentDidUpdate** (업데이트마다)
  - `useEffect(() => { ... });` 또는 deps 배열에 특정 값 넣기.
- **componentWillUnmount** (언마운트 직전)
  - `useEffect` 의 **cleanup 함수**에서 처리:

```javascript
useEffect(() => {
  console.log('mounted or updated');

  return () => {
    console.log('clean up before unmount or next effect');
  };
}, []);
```

### English

- **componentDidMount** → `useEffect(() => { ... }, [])`
- **componentDidUpdate** → `useEffect(() => { ... }, [deps])`
- **componentWillUnmount** → cleanup function returned from `useEffect`.

---

## 4. 예시 코드 (Example)

```javascript
import React, { useEffect, useState } from 'react';

function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('Timer mounted');
    const id = setInterval(() => {
      setCount((c) => c + 1);
    }, 1000);

    return () => {
      console.log('Timer unmounted');
      clearInterval(id);
    };
  }, []);

  useEffect(() => {
    console.log('Count updated:', count);
  }, [count]);

  return <div>Seconds: {count}</div>;
}
```

### KO 설명

- 첫 번째 `useEffect` (deps `[]`)
  - 컴포넌트가 마운트될 때 타이머를 시작하고,
  - 언마운트될 때 `clearInterval` 로 타이머를 정리.
- 두 번째 `useEffect` (deps `[count]`)
  - `count` 가 업데이트될 때마다 로그를 남김.

### EN Explanation

- First `useEffect` (deps `[]`)
  - Starts an interval on mount and clears it on unmount.
- Second `useEffect` (deps `[count]`)
  - Logs every time `count` updates.

---

## 5. 면접 포인트 (Interview Angle)

### 한국어 (Korean)

- 함수형 컴포넌트에서는 "라이프사이클 메서드" 대신 **"렌더 + useEffect 조합"** 으로 생각해야 함.
- React 18 + StrictMode 에서는 개발 모드에서 **마운트/언마운트가 두 번 일어날 수 있음** (effect 문제 조기 발견 목적) → idempotent 한 effect 작성 중요.

### English

- In function components, think in terms of **render + effects**, not discrete lifecycle methods.
- In React 18 with StrictMode, effects can mount/unmount twice in development to surface issues, so effects should be idempotent and safe to re-run.

---

## 6. 한 줄 요약 (Summary)

- **KO**: 함수형 컴포넌트에서는 라이프사이클 메서드 대신 `useEffect` 의 deps/cleanup 을 조합해 마운트, 업데이트, 언마운트 시점을 표현하며, React 18 StrictMode 에서는 effect 가 여러 번 실행될 수 있으므로 항상 재실행에 안전한 코드를 작성해야 합니다.
- **EN**: With hooks, lifecycle behavior is modeled via `useEffect` dependencies and cleanups, and in React 18 StrictMode effects may mount/unmount more than once in development, so they must be safe to run multiple times.
