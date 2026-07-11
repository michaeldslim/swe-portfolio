# 권한과 보안

런타임에 권한(카메라, 위치 등)을 요청하세요. 민감한 데이터는 안전하게 저장하세요(AsyncStorage 사용 금지). 비밀 정보를 하드코딩하지 마세요.

```tsx
import * as Permissions from 'expo-permissions';

async function requestCamera() {
  const { status } = await Permissions.askAsync(Permissions.CAMERA);
  if (status !== 'granted') {
    Alert.alert('권한이 거부되었습니다');
  }
}
```
*이것은 카메라 권한을 요청합니다.*
