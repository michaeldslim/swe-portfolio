# 34. Controlled vs Uncontrolled Components & Forms

## 1. 질문 (Question)

- React에서 **Controlled Component** 와 **Uncontrolled Component** 의 차이는 무엇인가요?
- 폼 입력을 다룰 때 각각 어떤 장단점이 있고, 언제 무엇을 선택할지 설명해 보세요.

---

## 2. 개념 정리 (Concept)

### 한국어 (Korean)

- **Controlled Component**
  - 입력 값이 **React state에 의해 완전히 제어**되는 컴포넌트.
  - input 의 `value` 가 state에서 오고, `onChange` 로 state 를 업데이트.

- **Uncontrolled Component**
  - 입력 값을 **DOM 자체에 맡기고**, 필요할 때 `ref` 를 통해 값을 읽어오는 방식.
  - `defaultValue` 를 쓰거나, DOM API (`inputRef.current.value`) 로 읽음.

### English

- **Controlled Component**
  - The input value is **driven by React state**.
  - You read and update via state and `onChange`.

- **Uncontrolled Component**
  - The DOM **owns the input state**, and React just **reads it using refs** when needed.

---

## 3. 예시 코드 (Examples)

### Controlled Input

```javascript
import React, { useState } from 'react';

function ControlledForm() {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Submitted: ${name}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name"
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

### Uncontrolled Input

```javascript
import React, { useRef } from 'react';

function UncontrolledForm() {
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Submitted: ${inputRef.current.value}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input ref={inputRef} defaultValue="" placeholder="Your name" />
      <button type="submit">Submit</button>
    </form>
  );
}
```

---

## 4. 장단점 (Pros & Cons)

### 한국어 (Korean)

- **Controlled**
  - 장점:
    - 모든 값이 state 에 있으므로 **검증, 포맷팅, 조건부 비활성화 등 로직을 쉽게 추가** 가능.
    - UI 상태를 예측/테스트하기 좋음.
  - 단점:
    - 입력이 매우 많거나, 고빈도 업데이트(예: 타이핑)에서 성능 비용이 커질 수 있음.

- **Uncontrolled**
  - 장점:
    - 구현이 단순, DOM이 알아서 값을 관리 → 가벼움.
  - 단점:
    - 값이 React state에 항상 반영되지 않으므로 **검증/동기화 로직이 복잡**해질 수 있음.

### English

- **Controlled**
  - Pros:
    - All values live in React state → easy validation, formatting, and conditional UI logic.
    - More predictable and testable.
  - Cons:
    - For very large or high-frequency forms, re-renders on each keystroke can be costly.

- **Uncontrolled**
  - Pros:
    - Simpler, especially for small forms where you only need the value **on submit**.
  - Cons:
    - Harder to do live validation or conditional behavior because React doesn’t always have the latest value.

---

## 5. 언제 무엇을 쓸까? (When to Use What)

### 한국어 (Korean)

- **Controlled**
  - 대부분의 비즈니스 폼: 실시간 검증, 에러 메시지, 디스에이블 상태 등이 필요할 때.
- **Uncontrolled**
  - 간단한 검색창, 파일 업로드 등 값이 복잡하지 않고, 제출 순간에만 읽으면 되는 경우.

### English

- **Controlled**
  - Complex forms where you need live validation, error messages, and tight control over the UI.
- **Uncontrolled**
  - Simple inputs where you only care about the final value (e.g., a basic search bar).

---

## 6. 한 줄 요약 (Summary)

- **KO**: Controlled 컴포넌트는 입력 값을 React state로 완전히 제어해 강력한 검증/제어가 가능하지만 비용이 크고, Uncontrolled 컴포넌트는 DOM에 상태를 맡겨 단순하지만 React와의 동기화가 어렵습니다.
- **EN**: Controlled components keep input state in React for full control and validation, while uncontrolled components let the DOM manage the state and are simpler but harder to synchronize with React.
