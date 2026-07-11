# 37. useEffect dependency trap (stale closure)

## 질문 (Question)

다음 코드의 콘솔 출력 결과를 예측해 보세요.

```javascript
import React, { useEffect, useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      console.log('interval count =', count);
      setCount(count + 1);
    }, 1000);

    return () => clearInterval(id);
  }, []);

  return <div>Count: {count}</div>;
}
```

1. 이 컴포넌트를 마운트하면 콘솔에는 어떤 값들이 찍일까요?
2. 화면에 보이는 `Count:` 값은 어떻게 변할까요?
3. 이 코드가 왜 **stale closure 문제**를 일으키는지 설명해 보세요.

---

## 정답 & 해설 (Answer & Explanation)

### 한국어 (Korean)

- `useEffect` 의 deps 배열이 `[]` 이므로, effect 콜백은 **마운트 시의 `count` (0) 를 캡처**합니다.
- `setInterval` 안에서 사용하는 `count` 도 항상 0인 버전을 참조합니다.
- 매 1초마다:
  - `console.log('interval count =', count);` → 항상 `interval count = 0` 출력.
  - `setCount(count + 1);` → 항상 `setCount(1)` 과 같은 효과.

결과적으로:

- 콘솔 출력: 계속해서 `interval count = 0` 만 반복됩니다.
- 화면의 `Count:` 는 0 → 1 로 바뀐 뒤, **그 이상 증가하지 않습니다.**

이것이 바로 **stale closure** 문제입니다. effect 콜백이 오래된 `count` 값을 캡처하고 있어서, 최신 state를 반영하지 못합니다.

### English

- Because the dependency array is `[]`, the effect runs only once and **captures `count` as 0**.
- Inside `setInterval`, the `count` reference is always the initial value (0).
- Every second:
  - Logs `interval count = 0`.
  - Calls `setCount(1)` repeatedly.

So:

- Console: repeatedly logs `interval count = 0`.
- UI: `Count` goes from 0 to 1, then stays at 1.

This is a classic **stale closure** bug: the effect callback closes over an outdated value of `count`.

---

## 올바른 수정 (Fixing the Bug)

### 한국어 (Korean)

1. **함수형 업데이트 사용** (권장)

```javascript
useEffect(() => {
  const id = setInterval(() => {
    setCount((c) => {
      console.log('interval count =', c);
      return c + 1;
    });
  }, 1000);

  return () => clearInterval(id);
}, []);
```

- 항상 최신 `c` 값을 받기 때문에 stale closure 문제가 사라집니다.

2. 또는 `count` 를 deps에 넣기 (이 경우 interval 재설정에 주의)

```javascript
useEffect(() => {
  const id = setInterval(() => {
    console.log('interval count =', count);
    setCount(count + 1);
  }, 1000);

  return () => clearInterval(id);
}, [count]);
```

- 하지만 이 방식은 `count` 가 바뀔 때마다 interval이 다시 설정됩니다.

### English

- Preferred fix: **functional updates** with `setCount(c => c + 1)`.
- Alternatively, include `count` in the dependency array, but be aware that it recreates the interval on each change.

---

## 요약 (Summary)

- **KO**: deps `[]` 인 `useEffect` 안에서 state를 직접 캡처한 뒤 interval에서 사용하면, 초기 값만 보는 stale closure 문제가 생길 수 있습니다. 함수형 업데이트(`setCount(c => c + 1)`) 를 사용하거나 deps 를 적절히 관리해야 합니다.
- **EN**: An effect with `[]` deps that closes over state can cause stale closures; use functional updates or proper dependencies to ensure you always work with the latest state.
