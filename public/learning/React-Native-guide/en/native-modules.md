# Native Modules and Platform APIs

React Native can access device features (camera, GPS, etc.) via libraries or by writing native modules in Java/Kotlin (Android) or Objective-C/Swift (iOS). Bridging lets you call native code from JS.

```tsx
import { Button, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

async function pickImage() {
  const result = await ImagePicker.launchCameraAsync();
  if (!result.cancelled) {
    Alert.alert('Image picked!', result.uri);
  }
}
<Button title="Take Photo" onPress={pickImage} />
```
*This uses a native camera API through a JS interface.*
