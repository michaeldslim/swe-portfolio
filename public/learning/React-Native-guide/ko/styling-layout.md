# 스타일링과 레이아웃

React Native는 `StyleSheet`를 통해 CSS와 유사한 스타일의 하위 집합을 사용합니다. 레이아웃은 반응형이고 유연한 UI를 가능하게 하는 Flexbox를 기반으로 합니다. 인라인 스타일이나 플랫폼별 스타일도 사용할 수 있습니다.

```tsx
import { StyleSheet, View, Text } from 'react-native';

export default function StyledBox() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Flexbox로 스타일링!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center'
  },
  text: {
    color: 'blue', fontSize: 20
  }
});
```
*이것은 중앙 정렬을 위한 Flexbox와 재사용 가능한 스타일을 위한 StyleSheet를 사용합니다.*
