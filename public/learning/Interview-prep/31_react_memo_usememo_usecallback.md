# 31. React.memo, useMemo, useCallback 은 언제 쓰나? / When to Use React.memo, useMemo, useCallback

## 1. 질문 (Question)

- `React.memo`, `useMemo`, `useCallback` 의 차이점은 무엇인가요?
- 각각을 **언제 사용하는 것이 적절한지** 설명해 보세요.

---

## 2. 개념 정리 (Concept)

### 한국어 (Korean)

- **React.memo**
  - 함수형 컴포넌트를 감싸서, **props가 바뀌지 않으면 리렌더링을 건너뛰는** HOC.
  - `React.memo(MyComponent)`.

- **useMemo**
  - 비용이 큰 계산 결과를 **memoization** 해서, 의존성이 바뀔 때만 다시 계산.
  - `const value = useMemo(() => compute(expensive), [deps]);`

- **useCallback**
  - 콜백 함수의 **참조(reference)** 를 memoization.
  - `const onClick = useCallback(() => {...}, [deps]);`
  - 주로 `React.memo` 된 자식 컴포넌트에 **stable callback** 을 넘기기 위해 사용.

### English

- **React.memo**
  - Wraps a function component so that it **skips re-rendering when props haven’t changed** (shallow compare).

- **useMemo**
  - Memoizes the **result of an expensive computation** and recomputes only when dependencies change.

- **useCallback**
  - Memoizes a **function reference** so that its identity stays stable across renders unless dependencies change.
  - Useful when passing callbacks to `React.memo`-ized children.

---

## 3. 예시 코드 (Example)

### 부모-자식 렌더링 최적화 예시 (Parent-Child Optimization)

```javascript
import React, { useMemo, useCallback, useState } from 'react';

const Child = React.memo(function Child({ onClick, count }) {
  console.log('Child rendered');
  return (
    <button onClick={onClick}>Child count: {count}</button>
  );
});

function Parent() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  const doubled = useMemo(() => {
    console.log('expensive calculation');
    return count * 2;
  }, [count]);

  const handleClick = useCallback(() => {
    setCount((c) => c + 1);
  }, []);

  return (
    <div>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="type here"
      />
      <p>Count: {count}</p>
      <p>Doubled (memoized): {doubled}</p>
      <Child onClick={handleClick} count={count} />
    </div>
  );
}
```

### KO 설명

- `React.memo(Child)`
  - `Child` 는 **props가 바뀔 때만** 리렌더링 됩니다.
- `useMemo` 로 `doubled` 계산
  - `count` 가 바뀔 때만 `expensive calculation` 이 실행.
  - `text` 만 바뀔 때는 재계산 X.
- `useCallback` 으로 `handleClick` 고정
  - 빈 deps 배열 `[]` 이므로, 컴포넌트 라이프사이클 동안 **같은 함수 참조** 유지.
  - `Child` 입장에서는 `onClick` props가 매 렌더마다 새 함수가 아니라, 동일 참조로 유지 → 불필요한 리렌더링 감소.

### EN Explanation

- `React.memo(Child)`
  - `Child` only re-renders when its **props change**.
- `useMemo` for `doubled`
  - Recomputes only when `count` changes.
  - Typing in the input (`text` changes) does not trigger the expensive calculation.
- `useCallback` for `handleClick`
  - With `[]` dependencies, the same function instance is reused across renders.
  - Helps `Child` avoid re-rendering due solely to a new callback reference.

---

## 4. 언제 쓰면 안 되는가? (When Not to Use)

### 한국어 (Korean)

- **과도한 최적화는 오히려 복잡도만 증가**
  - 계산이 가볍거나, 컴포넌트가 작으면 `useMemo`, `useCallback` 없이도 충분히 빠른 경우가 많음.
  - "무조건 붙이는" 것보다는 **실제 성능 문제가 있을 때** 사용하는 것이 좋습니다.

### English

- **Avoid premature optimization**
  - If computations are cheap and components are small, the overhead of `useMemo`/`useCallback` can outweigh benefits.
  - Use them when you have **real re-render/performance concerns**, not by default everywhere.

---

## 5. 한 줄 요약 (Summary)

- **KO**: `React.memo` 는 props가 안 바뀌면 리렌더링을 건너뛰게 하고, `useMemo` 는 계산 결과를, `useCallback` 은 함수 참조를 메모이제이션 합니다. 세 가지 모두 **불필요한 리렌더링을 줄이기 위한 도구**이지만, 실제 성능 이슈가 있을 때 선택적으로 사용하는 것이 좋습니다.
- **EN**: `React.memo` skips re-renders when props don’t change, `useMemo` memoizes expensive values, and `useCallback` memoizes function references. They are tools to reduce unnecessary renders and should be applied selectively where performance truly matters.
