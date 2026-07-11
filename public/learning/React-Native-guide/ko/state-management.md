# 상태 관리

로컬 상태의 경우 `useState`를 사용하세요. 전역/공유 상태의 경우 Context 또는 Redux, Zustand, MobX와 같은 라이브러리를 사용하세요. 앱 복잡도에 따라 선택하세요.

```tsx
import React, { createContext, useContext, useState } from 'react';

const CounterContext = createContext<{count: number, inc: () => void}>({count: 0, inc: () => {}});

export function CounterProvider({ children }: { children: React.ReactNode }) {
  const [count, setCount] = useState(0);
  return (
    <CounterContext.Provider value={{ count, inc: () => setCount(c => c + 1) }}>
      {children}
    </CounterContext.Provider>
  );
}

export function CounterDisplay() {
  const { count, inc } = useContext(CounterContext);
  return <Button title={`카운트: ${count}`} onPress={inc} />;
}
```
*이것은 Context를 사용한 전역 상태를 보여줍니다.*
