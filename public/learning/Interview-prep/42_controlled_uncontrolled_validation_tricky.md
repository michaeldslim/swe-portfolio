# 42. Controlled vs Uncontrolled: validation이 이상하게 동작하는 이유

## 질문 (Question)

다음 폼에서, 사용자는 최소 3글자를 입력해야 제출할 수 있다고 가정합니다.
그러나 실제로는 validation 이 이상하게 동작합니다.

```javascript
import React, { useState, useRef } from 'react';

function Form() {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  const handleChange = (e) => {
    const next = e.target.value;
    setValue(next);
    if (next.length < 3) {
      setError('Too short');
    } else {
      setError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 때때로 이 값이 state와 맞지 않거나, 경고가 발생한다고 가정
    console.log('submit value (ref) =', inputRef.current.value);
    console.log('submit value (state) =', value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        defaultValue={value}
        onChange={handleChange}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Submit</button>
    </form>
  );
}
```

1. 이 컴포넌트는 Controlled 일까요, Uncontrolled 일까요, 아니면 혼합 상태일까요?
2. 왜 `inputRef.current.value` 와 `value` 가 서로 다른 값을 가질 수 있을까요?
3. 이 코드에서 validation 이 직관과 다르게 동작하는 이유와, 어떻게 고쳐야 하는지 설명해 보세요.

---

## 정답 & 해설 (Answer & Explanation)

### 한국어 (Korean)

- 이 컴포넌트는 **Controlled 와 Uncontrolled 를 섞은 혼합 상태**입니다.
  - `defaultValue` 를 사용하고 있으므로 DOM이 초기 값을 가진 후, 이후 값 관리는 **DOM 쪽이 주도**.
  - 동시에 `onChange` 에서 React state (`value`, `error`) 를 업데이트하고 있으므로 **부분적으로 controlled 처럼 보이기도** 합니다.

- 문제점
  - `defaultValue` 는 **마운트 시점에만 적용**되고, 이후 state 변경과는 연결되지 않습니다.
  - 사용자가 입력을 바꾸면 `inputRef.current.value` 는 실제 DOM 값, `value` 는 React state 값인데, 두 값이 **타이밍/업데이트 문제로 어긋날 수 있습니다.**
  - 또, React 입장에서는 이 input 이 처음에는 uncontrolled (`defaultValue`만 있음) 였다가, 나중에 `value` prop 을 추가하면 **경고(warning)** 를 낼 수 있습니다.

### English

- This component mixes **controlled and uncontrolled patterns**.
  - `defaultValue` makes the input initially uncontrolled (DOM manages its own state).
  - But `onChange` and React state tracking (`value`, `error`) make it behave partially like a controlled input.

- Issues
  - `defaultValue` only sets the initial value; later changes to `value` state do **not** change the DOM value.
  - `inputRef.current.value` (DOM) and `value` (React state) can diverge.
  - React may warn if you ever switch between uncontrolled and controlled usage.

---

## 올바른 패턴 (Proper Patterns)

### 완전 Controlled 로 만들기 (KO + EN)

```javascript
function Form() {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const next = e.target.value;
    setValue(next);
    if (next.length < 3) {
      setError('Too short');
    } else {
      setError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submit value =', value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={value} onChange={handleChange} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Submit</button>
    </form>
  );
}
```

- **KO**: input 을 완전히 Controlled 로 만들어서, 유효성 검사와 제출 시 값이 항상 React state 하나에 의해 결정되게 합니다.
- **EN**: Make the input fully controlled so validation and submission both rely on the same single source of truth (`value` state).

---

## 요약 (Summary)

- **KO**: Controlled/Uncontrolled 패턴을 섞으면 DOM 값과 state 값이 어긋나고, validation 로직도 직관과 다르게 동작할 수 있습니다. 한 input 에 대해서는 **하나의 패턴(완전 controlled 또는 완전 uncontrolled)** 을 선택하는 것이 중요합니다.
- **EN**: Mixing controlled and uncontrolled patterns on the same input can lead to mismatched DOM/state values and confusing validation; stick to one clear pattern per input, usually fully controlled for complex forms.
