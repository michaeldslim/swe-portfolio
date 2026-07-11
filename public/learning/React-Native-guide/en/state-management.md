# State Management

For local state, use `useState`. For global/shared state, use Context or libraries like Redux, Zustand, or MobX. Choose based on app complexity.

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
  return <Button title={`Count: ${count}`} onPress={inc} />;
}
```
*This shows global state with Context.*
