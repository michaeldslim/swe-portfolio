# 플랫폼 차이점과 조건부 코드

`Platform.OS` 또는 플랫폼별 파일을 사용하여 플랫폼별 코드를 작성하세요. 노치 및 안전 영역과 같은 디바이스 차이점을 처리하세요.

```tsx
import { Platform, Text } from 'react-native';

<Text>
  {Platform.OS === 'ios' ? 'iOS에서 실행 중' : 'Android에서 실행 중'}
</Text>
```
*이것은 플랫폼에 따라 다른 텍스트를 표시합니다.*
