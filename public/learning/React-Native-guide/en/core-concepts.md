# Core Concepts of React Native

React Native lets you build mobile apps using JavaScript and React, but renders to native platform UI components. Your code runs in a JS engine and communicates with native modules via a bridge.

```tsx
import React from 'react';
import { View, Text } from 'react-native';

export default function App() {
  return (
    <View>
      <Text>Hello, React Native!</Text>
    </View>
  );
}
```
*This shows a basic React Native app. The `<View>` and `<Text>` components render as native views and labels on iOS/Android.*
