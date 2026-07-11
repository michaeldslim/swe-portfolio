# Styling

## 1. StyleSheet API?

```jsx
import { StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    color: '#333',
  },
});
```

---

## 2. Flexbox Layout?

```jsx
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row', // or 'column' (default)
    justifyContent: 'center', // main axis
    alignItems: 'center', // cross axis
    flexWrap: 'wrap',
  },
});
```

---

## 3. Responsive Design?

```jsx
import { useWindowDimensions } from 'react-native';

const MyComponent = () => {
  const { width, height } = useWindowDimensions();
  return <View style={{ width: width * 0.9 }} />;
};
```

---

## 4. Style Composition?

```jsx
<View style={[styles.base, styles.background]} />
<View style={[styles.base, isActive && styles.active, { marginTop: 10 }]} />
```

---

## 5. Styled Components?

```jsx
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

const Title = styled.Text`
  font-size: 24px;
  color: ${props => props.primary ? 'blue' : 'black'};
`;
```

---

## 6. Shadow Effects?

```jsx
const styles = StyleSheet.create({
  box: {
    // iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Android
    elevation: 5,
  },
});
```

---

## 7. Custom Fonts?

**1. Add font files to `assets/fonts/`**

**2. react-native.config.js:**
```javascript
module.exports = {
  assets: ['./assets/fonts/'],
};
```

**3. Link:**
```bash
npx react-native-asset
```

**4. Use:**
```jsx
const styles = StyleSheet.create({
  text: { fontFamily: 'Roboto-Bold' },
});
```

---

## 8. Theme System?

```jsx
const themes = {
  light: { background: '#fff', text: '#000' },
  dark: { background: '#000', text: '#fff' },
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  return (
    <ThemeContext.Provider value={{ theme: themes[theme], setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
```

---

## 9. Animated Styles?

```jsx
import { Animated } from 'react-native';

const fadeAnim = useRef(new Animated.Value(0)).current;

useEffect(() => {
  Animated.timing(fadeAnim, {
    toValue: 1,
    duration: 1000,
    useNativeDriver: true,
  }).start();
}, []);

return <Animated.View style={{ opacity: fadeAnim }} />;
```

---

## 10. Performance Tips?

```jsx
// ❌ Bad
<View style={{ flex: 1, backgroundColor: '#fff' }} />

// ✅ Good
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
});
<View style={styles.container} />
```
