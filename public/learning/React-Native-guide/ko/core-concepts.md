# React Native의 핵심 개념

React Native를 사용하면 JavaScript와 React로 모바일 앱을 빌드할 수 있지만, 네이티브 플랫폼 UI 컴포넌트로 렌더링됩니다. 코드는 JS 엔진에서 실행되며 브리지를 통해 네이티브 모듈과 통신합니다.

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
*이것은 기본적인 React Native 앱을 보여줍니다. `<View>`와 `<Text>` 컴포넌트는 iOS/Android에서 네이티브 뷰와 레이블로 렌더링됩니다.*
