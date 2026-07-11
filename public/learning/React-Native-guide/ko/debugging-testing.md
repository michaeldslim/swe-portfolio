# 디버깅과 테스팅

Flipper, React Native Debugger, Chrome DevTools와 같은 도구로 디버깅하세요. Jest와 React Native Testing Library로 컴포넌트를 테스트하세요. 엔드투엔드 테스트에는 Detox를 사용하세요.

```tsx
import React from 'react';
import { render } from '@testing-library/react-native';
import Greeting from './Greeting';

test('인사말 렌더링', () => {
  const { getByText } = render(<Greeting name="World" />);
  expect(getByText('Hello, World!')).toBeTruthy();
});
```
*이것은 Greeting 컴포넌트가 올바른 텍스트를 렌더링하는지 테스트합니다.*
