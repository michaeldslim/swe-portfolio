# 네이티브 모듈과 플랫폼 API

React Native는 라이브러리를 통해 또는 Java/Kotlin(Android) 또는 Objective-C/Swift(iOS)로 네이티브 모듈을 작성하여 디바이스 기능(카메라, GPS 등)에 액세스할 수 있습니다. 브리징을 통해 JS에서 네이티브 코드를 호출할 수 있습니다.

```tsx
import { Button, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

async function pickImage() {
  const result = await ImagePicker.launchCameraAsync();
  if (!result.cancelled) {
    Alert.alert('이미지 선택됨!', result.uri);
  }
}
<Button title="사진 찍기" onPress={pickImage} />
```
*이것은 JS 인터페이스를 통해 네이티브 카메라 API를 사용합니다.*
