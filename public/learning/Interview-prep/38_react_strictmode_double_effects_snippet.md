# 38. StrictMode에서 useEffect 로그 순서 (double mount)

## 질문 (Question)

다음 코드는 개발 모드에서 React 18 + StrictMode 로 실행된다고 가정합니다.

```javascript
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';

function Demo() {
  useEffect(() => {
    console.log('effect run');
    return () => {
      console.log('cleanup');
    };
  }, []);

  console.log('render');
  return <div>Demo</div>;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Demo />
  </React.StrictMode>
);
```

1. 개발 모드(StrictMode)에서 콘솔 출력 순서는 어떻게 될까요?
2. 프로덕션 모드에서는 어떻게 달라질까요?
3. 왜 이런 차이가 있는지 설명해 보세요.

---

## 정답 (Answer)

### 개발 모드 + StrictMode (React 18)

**실제 출력 (Representative Output)**

```text
render
effect run
cleanup
render
effect run
```

- **설명 (KO)**
  - StrictMode 는 개발 모드에서 **side effect 를 한 번 더 실행해 보는 기능**이 있습니다.
  - 마운트 시나리오를 시뮬레이션 하기 위해:
    1. 컴포넌트를 마운트 → `render`
    2. effect 실행 → `effect run`
    3. 곧바로 언마운트 → `cleanup`
    4. 다시 마운트 → `render`
    5. effect 재실행 → `effect run`
  - 따라서 effect/cleanup 이 두 번씩 실행되는 것처럼 보입니다.

- **Explanation (EN)**
  - In development with StrictMode, React **intentionally double-invokes effects** to surface side-effect bugs.
  - It simulates mount → unmount → mount:
    - First render → `render`
    - First effect → `effect run`
    - Cleanup → `cleanup`
    - Second render → `render`
    - Second effect → `effect run`

### 프로덕션 모드 (Production)

- StrictMode 의 double-invoke 동작이 **없습니다**.
- 일반적인 순서는:

```text
render
effect run
```

---

## 면접 포인트 (Interview Angle)

### 한국어 (Korean)

- React 18 + StrictMode 에서 effect 가 두 번 실행되는 것은 **버그가 아니라 의도된 동작**이라는 점.
- effect 안에서 **idempotent(여러 번 실행돼도 안전)** 한 코드를 작성해야 한다는 메시지.

### English

- In React 18 with StrictMode, double-invoked effects are **by design**, not a bug.
- You should write effects that are **idempotent and safe to run multiple times**.

---

## 요약 (Summary)

- **KO**: 개발 모드 StrictMode 에서는 마운트-언마운트-마운트를 시뮬레이션하기 위해 `render`/`effect`/`cleanup` 이 두 번씩 실행되지만, 프로덕션 모드에서는 한 번만 실행됩니다.
- **EN**: In dev with StrictMode, React simulates mount/unmount/mount so you see `render`/`effect`/`cleanup` twice; in production, they run only once.
