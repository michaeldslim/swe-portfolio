# Debugging and Testing

Debug with tools like Flipper, React Native Debugger, and Chrome DevTools. Test components with Jest and React Native Testing Library. Use Detox for end-to-end tests.

```tsx
import React from 'react';
import { render } from '@testing-library/react-native';
import Greeting from './Greeting';

test('renders greeting', () => {
  const { getByText } = render(<Greeting name="World" />);
  expect(getByText('Hello, World!')).toBeTruthy();
});
```
*This tests that the Greeting component renders the correct text.*
