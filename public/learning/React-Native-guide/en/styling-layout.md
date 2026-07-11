# Styling and Layout

React Native uses a subset of CSS-like styles via `StyleSheet`. Layout is based on Flexbox, which allows responsive, flexible UIs. You can also use inline styles or platform-specific styles.

```tsx
import { StyleSheet, View, Text } from 'react-native';

export default function StyledBox() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Styled with Flexbox!</Text>
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
*This uses Flexbox for centering and a StyleSheet for reusable styles.*
