# 32. React Context vs Props Drilling / 컨텍스트는 언제 써야 하나?

## 1. 질문 (Question)

- React에서 **props drilling** 이란 무엇인가요?
- 이 문제를 해결하기 위해 **Context API** 를 어떻게 사용하나요?
- Context를 쓸 때 주의할 점은 무엇인가요?

---

## 2. 개념 정리 (Concept)

### 한국어 (Korean)

- **Props Drilling**
  - 어떤 값(예: `theme`, `user`)을 깊은 하위 컴포넌트까지 전달하기 위해, **중간 컴포넌트들이 그 값을 직접 쓰지 않더라도 계속 props로 넘겨야 하는 상황**.
  - 코드가 지저분해지고, 컴포넌트 간 결합도가 높아짐.

- **Context API**
  - 트리 상단에서 값을 제공(`Provider`)하고, 하위 어디에서나 `useContext` 로 꺼내 쓸 수 있는 전역-ish 상태 전달 메커니즘.
  - 예: `ThemeContext`, `AuthContext` 등.

### English

- **Props Drilling**
  - Passing data through many levels of components **just to get it to a deeply nested child**, even when intermediates don’t care about the data.

- **Context API**
  - A way to **provide a value at the top of the tree and consume it anywhere below** without manually passing props at every level.
  - Implemented via `Context.Provider` and `useContext`.

---

## 3. 예시 코드 (Example)

### ThemeContext 예시 (KO + EN)

```javascript
import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext('light');

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme((t) => (t === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function ThemedButton() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <button
      onClick={toggleTheme}
      style={{
        background: theme === 'light' ? '#fff' : '#333',
        color: theme === 'light' ? '#000' : '#fff',
      }}
    >
      Current theme: {theme}
    </button>
  );
}

function App() {
  return (
    <ThemeProvider>
      {/* 매우 깊은 트리 안에서도 ThemeContext 값을 바로 사용할 수 있음 */}
      <ThemedButton />
    </ThemeProvider>
  );
}
```

### KO 설명

- `ThemeContext` 는 현재 테마와 `toggleTheme` 함수를 공유하기 위한 컨텍스트입니다.
- `ThemeProvider` 가 트리 상단에서 값을 제공하고, `ThemedButton` 은 `useContext(ThemeContext)` 로 값을 바로 읽습니다.
- 중간에 있는 여러 레벨의 컴포넌트가 **굳이 `theme`, `toggleTheme` 를 props로 받았다가 다시 넘길 필요가 없습니다.**

### EN Explanation

- `ThemeContext` holds the current theme and a `toggleTheme` function.
- `ThemeProvider` puts this value at the top of the tree, and `ThemedButton` consumes it via `useContext(ThemeContext)`.
- Intermediate components don’t need to pass `theme` or `toggleTheme` down as props, avoiding props drilling.

---

## 4. Context 사용 시 주의점 (Caveats)

### 한국어 (Korean)

- **무조건 전역 상태로 만들지 말 것**
  - 모든 상태를 Context에 넣으면 트리가 복잡해지고, 재사용/테스트가 어려워질 수 있습니다.
  - 정말로 여러 레벨에서 공유해야 하는 값인지 먼저 고민.
- **리렌더링 전파**
  - Context 값이 바뀌면, 해당 Context를 구독하는 모든 하위 컴포넌트가 리렌더링 됩니다.
  - 자주 바뀌는 값은 Context에 바로 넣기보다, Context 안에서 분리/메모이제이션을 고려.

### English

- **Don’t put everything into Context**
  - Overusing Context for all state can make components more tightly coupled and harder to test.
  - Use it for truly shared, cross-cutting concerns (theme, auth, locale, etc.).
- **Re-render propagation**
  - When a Context value changes, all consumers re-render.
  - For highly dynamic values, consider splitting contexts or memoizing to avoid excessive renders.

---

## 5. 한 줄 요약 (Summary)

- **KO**: Props drilling은 깊은 자식에게 값을 전달하기 위해 중간 컴포넌트까지 계속 props를 넘겨야 하는 문제이고, Context는 트리 상단의 Provider에서 값을 제공해 하위 어디서나 `useContext` 로 바로 읽을 수 있게 해 줍니다. 다만 너무 많은 상태를 Context에 넣으면 리렌더링과 결합도가 증가할 수 있으므로, **정말 공유가 필요한 값에만** 사용하는 것이 좋습니다.
- **EN**: Props drilling is passing props through many layers just to reach a deep child, while Context lets you provide a value once and consume it anywhere below without manual prop passing. Use Context for true cross-cutting concerns, but avoid stuffing all state into it to prevent unnecessary coupling and re-renders.
