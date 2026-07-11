# Platform Differences and Conditional Code

Write platform-specific code using `Platform.OS` or platform-specific files. Handle device differences like notches and safe areas.

```tsx
import { Platform, Text } from 'react-native';

<Text>
  {Platform.OS === 'ios' ? 'Running on iOS' : 'Running on Android'}
</Text>
```
*This displays different text based on the platform.*
