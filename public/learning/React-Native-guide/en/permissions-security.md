# Permissions and Security

Request permissions at runtime (camera, location, etc.). Store sensitive data securely (not AsyncStorage). Never hardcode secrets.

```tsx
import * as Permissions from 'expo-permissions';

async function requestCamera() {
  const { status } = await Permissions.askAsync(Permissions.CAMERA);
  if (status !== 'granted') {
    Alert.alert('Permission denied');
  }
}
```
*This requests camera permission.*
