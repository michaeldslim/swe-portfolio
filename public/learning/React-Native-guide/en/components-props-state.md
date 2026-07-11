# Components, Props, and State

Components are the building blocks of UI. Props are read-only data passed from parent to child. State is local, mutable data that triggers re-renders. Functional components with hooks (`useState`, `useEffect`) are the modern standard.

```tsx
import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';

type GreetingProps = { name: string };

const Greeting: React.FC<GreetingProps> = ({ name }) => {
  const [count, setCount] = useState(0);

  return (
    <View>
      <Text>Hello, {name}!</Text>
      <Text>Clicked: {count} times</Text>
      <Button title="Click me" onPress={() => setCount(count + 1)} />
    </View>
  );
};
```
*This demonstrates props (`name`), state (`count`), and a functional component.*
