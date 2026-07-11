# 40. useMemo / useCallback dependency bug

## 질문 (Question)

다음 코드를 보고 콘솔 출력과 렌더링 동작을 예측해 보세요.

```javascript
import React, { useState, useMemo, useCallback } from 'react';

function Child({ onClick }) {
  console.log('Child rendered');
  return <button onClick={onClick}>Increment</button>;
}

const MemoChild = React.memo(Child);

function App() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  const expensiveValue = useMemo(() => {
    console.log('compute expensiveValue');
    return count * 2;
  }, []); // ⚠ deps 없음

  const handleClick = useCallback(() => {
    setCount(count + 1);
  }, []); // ⚠ deps 없음

  return (
    <div>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="type here"
      />
      <p>count: {count}</p>
      <p>expensiveValue: {expensiveValue}</p>
      <MemoChild onClick={handleClick} />
    </div>
  );
}
```

1. `count` 를 여러 번 증가시키면 `expensiveValue` 는 어떻게 변할까요?
2. `MemoChild` 는 언제 렌더링될까요?
3. 이 코드에서 `useMemo`, `useCallback` 의 deps 설정이 왜 문제인지 설명해 보세요.

---

## 정답 & 해설 (Answer & Explanation)

### 한국어 (Korean)

- `expensiveValue`
  - deps 배열이 `[]` 이기 때문에 **마운트 시 한 번만 계산**되고, 이후 `count` 가 바뀌어도 다시 계산되지 않습니다.
  - 따라서 화면에는 `expensiveValue` 가 항상 `0` 으로 남습니다.

- `handleClick`
  - 마찬가지로 deps 배열이 `[]` 이라서, effect가 **초기 `count` 값(0)** 을 캡처합니다.
  - 버튼을 눌러도 `setCount(count + 1)` 은 항상 `setCount(1)` 과 같은 의미가 되어, `count` 는 `0 → 1` 까지만 증가합니다.

- `MemoChild`
  - `onClick` prop 이 `useCallback` 으로 memoization 되어 있으므로, 매 렌더마다 **동일한 함수 참조**로 유지됩니다.
  - 그러나 `App` 이 re-render 되면 `MemoChild` 도 re-render 체크를 하며, 첫 렌더 이후에는 props 가 안 바뀌는 한 실제 DOM 업데이트는 건너뜁니다.

- 요약하면:
  - deps 를 잘못 설정해서 **stale state + 값 미갱신** 버그가 생김.
  - memoization 을 썼지만, 의도와 다르게 작동하고 있습니다.

### English

- `expensiveValue`
  - With `[]` deps, it’s computed **only once** on mount and never updated when `count` changes.
  - So `expensiveValue` stays `0` even as `count` changes.

- `handleClick`
  - Also uses `[]` deps, capturing `count = 0`.
  - Clicking the button effectively calls `setCount(1)` every time, so `count` only moves from `0` to `1` and then gets stuck.

- `MemoChild`
  - Receives a stable `onClick` reference, so its props don’t change after the first render.
  - It still goes through React’s render check, but thanks to `React.memo` it won’t re-render when props are unchanged.

---

## 올바른 수정 (Fix)

### 한국어 (Korean)

```javascript
const expensiveValue = useMemo(() => {
  console.log('compute expensiveValue');
  return count * 2;
}, [count]);

const handleClick = useCallback(() => {
  setCount((c) => c + 1);
}, []);
```

- 계산 결과는 `count` 에 의존하므로 `[count]` 를 deps 에 넣어야 함.
- `handleClick` 은 함수형 업데이트를 사용해 deps 없이도 최신 state 를 사용할 수 있습니다.

### English

- Add `count` to `useMemo` dependencies.
- Use a functional update in `useCallback` so it doesn’t depend on `count` directly.

---

## 요약 (Summary)

- **KO**: `useMemo`, `useCallback` 를 사용할 때 deps 배열을 잘못 설정하면 값이 다시 계산되지 않거나, stale state 를 캡처해서 의도치 않은 동작이 생길 수 있습니다.
- **EN**: Incorrect dependency arrays for `useMemo`/`useCallback` can lead to values never updating or stale state being captured; always align deps with what your function actually uses.
