# 30. useEffect vs useLayoutEffect 차이 / Difference Between useEffect and useLayoutEffect

## 1. 질문 (Question)

- React에서 `useEffect` 와 `useLayoutEffect` 의 차이는 무엇인가요?
- 각각 **언제 실행**되고, **언제 어떤 것을 써야 하는지** 설명해 보세요.

---

## 2. 개념 정리 (Concept)

### 한국어 (Korean)

- **공통점**
  - 둘 다 **함수형 컴포넌트에서 side effect를 처리**하기 위한 Hook 입니다.
  - 예: 데이터 fetch, 이벤트 리스너 등록/해제, DOM 조작 등.

- **useEffect**
  - **브라우저가 화면을 그린(paint)** 이후에 비동기로 실행됩니다.
  - 렌더 → DOM 업데이트 → 화면에 그리기 → **그 다음에** useEffect 콜백.
  - 레이아웃 측정/layout blocking 이 필요 없는 대부분의 side effect 에 적합.

- **useLayoutEffect**
  - **DOM 업데이트 후, 브라우저가 화면을 그리기 전에 동기적으로 실행**됩니다.
  - 렌더 → DOM 업데이트 → **useLayoutEffect 실행** → 화면에 그리기.
  - 레이아웃을 읽거나 (예: `getBoundingClientRect`) 바로 DOM을 수정해야 할 때 사용.
  - 잘못 남용하면 **렌더-페인트를 블로킹**해서 성능/깜빡임 문제를 유발할 수 있습니다.

### English

- **Common**
  - Both are hooks for **side effects** in function components.
  - e.g., data fetching, subscriptions, manually manipulating the DOM, etc.

- **useEffect**
  - Runs **asynchronously after the browser has painted** the UI.
  - Render → commit DOM → paint → **then** run `useEffect`.
  - Good default for most side effects that **don’t need to block layout**.

- **useLayoutEffect**
  - Runs **synchronously after DOM updates but before the browser paints**.
  - Render → commit DOM → **run `useLayoutEffect`** → paint.
  - Use when you must **read layout and synchronously re-measure or re-position** elements before the user sees them.
  - Overuse can **block painting** and hurt performance.

---

## 3. 예시 코드 (Example)

### 깜빡임(flicker) 문제 예시 (KO + EN)

```javascript
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

function BoxWithEffect() {
  const boxRef = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  // try switching between useEffect and useLayoutEffect
  // useEffect(() => {
  useLayoutEffect(() => {
    if (!boxRef.current) return;
    const rect = boxRef.current.getBoundingClientRect();
    setSize({ width: rect.width, height: rect.height });
  }, []);

  return (
    <div>
      <div
        ref={boxRef}
        style={{
          width: '200px',
          height: '100px',
          background: 'lightblue',
        }}
      />
      <p>
        Box size: {size.width} x {size.height}
      </p>
    </div>
  );
}
```

- **KO 설명**
  - `useEffect` 로 레이아웃을 읽고 `setSize` 를 호출하면:
    - 화면이 먼저 렌더 → 그 후에 사이즈를 읽고 상태 업데이트 → **텍스트가 한 프레임 늦게 업데이트**될 수 있습니다.
  - `useLayoutEffect` 를 사용하면:
    - DOM 업데이트 후, 화면이 그려지기 전에 사이즈를 읽고 `setSize` → 사용자 눈에는 이미 계산된 값이 보이므로 **깜빡임이 줄어듭니다**.

- **EN Explanation**
  - With `useEffect`, the effect runs **after paint**, so the text may show `0 x 0` for one frame, then update.
  - With `useLayoutEffect`, the effect runs **before paint**, so the user sees the measured size immediately, avoiding a flicker.

---

## 4. 언제 무엇을 쓸까? (When to Use Which)

### 한국어 (Korean)

- **기본값: useEffect**
  - 데이터 fetch, 로그 전송, 구독 설정/해제, 타이머 등 대부분의 비-레이아웃 효과.
- **정말 필요한 경우만 useLayoutEffect**
  - 레이아웃 측정/동기 DOM 조작이 **화면 깜빡임 없이** 이뤄져야 할 때.
  - 예: 애니메이션 시작 전에 위치 계산, 스크롤 위치 복원 등.
- **주의**
  - `useLayoutEffect` 는 서버 렌더링 환경(Next.js)에서 경고가 나올 수 있어, 클라이언트 전용에서만 써야 함.

### English

- **Default: useEffect**
  - Data fetching, logging, subscriptions, timers, and most side effects.
- **useLayoutEffect only when necessary**
  - When you need to read layout and synchronously adjust styles/position **before the user sees the frame**.
  - e.g., measuring size for animations, restoring scroll position.
- **Caution**
  - In SSR/Next.js, `useLayoutEffect` can cause warnings on the server; prefer using it in client-only components.

---

## 5. 한 줄 요약 (Summary)

- **KO**: `useEffect` 는 화면이 그려진 후 비동기로 실행되는 일반적인 side effect 용 Hook 이고, `useLayoutEffect` 는 DOM 업데이트 직후, 페인트 전에 동기적으로 실행되어 레이아웃 측정/수정이 필요할 때만 신중히 사용해야 합니다.
- **EN**: `useEffect` runs asynchronously after paint and should be your default for side effects, while `useLayoutEffect` runs synchronously before paint and should be reserved for layout-critical work like measuring and synchronously adjusting the DOM.
