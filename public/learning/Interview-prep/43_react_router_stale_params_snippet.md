# 43. React Router: stale params / location in effects

## 질문 (Question)

다음 코드는 React Router v6 를 사용한다고 가정합니다.

```javascript
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useParams, useLocation, Link } from 'react-router-dom';

function User() {
  const { id } = useParams();
  const location = useLocation();
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    console.log('effect run for id =', id);
    setLogs((prev) => [...prev, `effect for id = ${id}`]);
  }, []); // ❌ deps 없음

  return (
    <div>
      <h2>User {id}</h2>
      <p>Current path: {location.pathname}</p>
      <Link to="/user/1">User 1</Link>
      <Link to="/user/2">User 2</Link>
      <ul>
        {logs.map((log, i) => (
          <li key={i}>{log}</li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/user/:id" element={<User />} />
      </Routes>
    </BrowserRouter>
  );
}
```

1. `/user/1` 에서 시작해서 링크를 눌러 `/user/2` 로 이동하면, 콘솔과 화면에는 무엇이 보일까요?
2. 왜 `useEffect` 가 기대처럼 `id` 변경마다 다시 실행되지 않는지 설명해 보세요.
3. 이 문제를 어떻게 고쳐야 할까요?

---

## 정답 & 해설 (Answer & Explanation)

### 한국어 (Korean)

- `User` 컴포넌트는 **URL 변경 시에도 언마운트/리마운트가 아니라, 같은 컴포넌트가 props/params 만 바뀌며 재렌더** 될 수 있습니다.
- 하지만 `useEffect` 의 deps 배열이 `[]` 이므로, effect 는 **처음 마운트될 때 한 번만 실행**됩니다.
- 따라서:
  - 콘솔: `effect run for id = 1` 한 번만 출력.
  - 화면의 `logs` 리스트: `"effect for id = 1"` 만 추가되고, `/user/2` 로 이동해도 더 이상 항목이 늘어나지 않습니다.

즉, **라우트 파라미터(id)가 바뀌었는데도 effect가 다시 실행되지 않는 stale params 문제**가 발생합니다.

### English

- The `User` component **stays mounted** while the route param `id` changes; React Router just re-renders with a new `id`.
- Since the effect has `[]` deps, it only runs once on mount.
- Result:
  - Console: only `effect run for id = 1` once.
  - `logs` shows only `effect for id = 1`, even after navigating to `/user/2`.

This is a **stale params** issue: the effect doesn’t re-run when the route params change.

---

## 올바른 수정 (Fix)

### 한국어 (Korean)

```javascript
useEffect(() => {
  console.log('effect run for id =', id);
  setLogs((prev) => [...prev, `effect for id = ${id}`]);
}, [id]);
```

- `id` 를 deps 배열에 넣어주면, URL 파라미터가 바뀔 때마다 effect 가 다시 실행됩니다.
- 또는 `location.pathname` 등을 deps 로 넣어서 경로 변경마다 실행되게 할 수도 있습니다.

### English

- Add `id` (or `location.pathname`) to the dependency array so the effect re-runs when the param changes.

---

## 요약 (Summary)

- **KO**: React Router에서 params/location 을 사용하는 effect 에서 deps 배열을 비워 두면, URL 이 바뀌어도 effect 가 다시 실행되지 않아 stale params 문제가 발생합니다. 항상 effect에서 사용하는 params/location 을 deps 에 포함해야 합니다.
- **EN**: In React Router, if an effect uses route params/location but has `[]` deps, it won’t re-run on navigation; always include the used params/location in the dependency array.
