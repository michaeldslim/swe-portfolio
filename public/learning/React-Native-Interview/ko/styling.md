# 스타일링

## 1. StyleSheet API 사용법은?

**답변:**
```jsx
import { StyleSheet, View, Text } from 'react-native';

const MyComponent = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Hello</Text>
  </View>
);

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

**장점:**
- 성능 최적화 (스타일 객체 재사용)
- 유효성 검사
- 코드 가독성

---

## 2. Flexbox 레이아웃 설명하세요.

**답변:**

**주요 속성:**
```jsx
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row', // 'column' (기본값)
    justifyContent: 'center', // 주축 정렬
    alignItems: 'center', // 교차축 정렬
    flexWrap: 'wrap',
  },
  item: {
    flex: 1,
    alignSelf: 'flex-start',
  },
});
```

**justifyContent 옵션:**
- `flex-start`, `flex-end`, `center`
- `space-between`, `space-around`, `space-evenly`

**alignItems 옵션:**
- `flex-start`, `flex-end`, `center`, `stretch`, `baseline`

---

## 3. 반응형 디자인 구현 방법은?

**답변:**

**Dimensions API:**
```jsx
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: width * 0.9,
    height: height * 0.5,
  },
});
```

**useWindowDimensions Hook:**
```jsx
import { useWindowDimensions } from 'react-native';

const MyComponent = () => {
  const { width, height } = useWindowDimensions();
  
  return (
    <View style={{ width: width * 0.9 }}>
      <Text>Width: {width}</Text>
    </View>
  );
};
```

**Platform 별 스타일:**
```jsx
import { Platform } from 'react-native';

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: { paddingTop: 20 },
      android: { paddingTop: 0 },
    }),
  },
});
```

---

## 4. 스타일 합성 방법은?

**답변:**

**배열 사용:**
```jsx
<View style={[styles.base, styles.background]} />

// 조건부 스타일
<View style={[
  styles.base,
  isActive && styles.active,
  { marginTop: 10 }
]} />
```

**StyleSheet.compose:**
```jsx
const combinedStyle = StyleSheet.compose(
  styles.base,
  styles.override
);
```

---

## 5. Styled Components 사용법은?

**답변:**

**설치:**
```bash
npm install styled-components
```

**사용:**
```jsx
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;

const Title = styled.Text`
  font-size: 24px;
  color: ${props => props.primary ? 'blue' : 'black'};
  font-weight: bold;
`;

const MyComponent = () => (
  <Container>
    <Title primary>Hello</Title>
  </Container>
);
```

---

## 6. 그림자 효과 구현 방법은?

**답변:**

**iOS (shadowXXX):**
```jsx
const styles = StyleSheet.create({
  box: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
```

**Android (elevation):**
```jsx
const styles = StyleSheet.create({
  box: {
    elevation: 5,
  },
});
```

**크로스 플랫폼:**
```jsx
const styles = StyleSheet.create({
  box: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
});
```

---

## 7. 폰트 커스터마이징 방법은?

**답변:**

**1. 폰트 파일 추가:**
- `assets/fonts/` 폴더에 .ttf 파일 추가

**2. react-native.config.js:**
```javascript
module.exports = {
  project: {
    ios: {},
    android: {},
  },
  assets: ['./assets/fonts/'],
};
```

**3. 링크:**
```bash
npx react-native-asset
```

**4. 사용:**
```jsx
const styles = StyleSheet.create({
  text: {
    fontFamily: 'Roboto-Bold',
  },
});
```

---

## 8. 테마 시스템 구현 방법은?

**답변:**

```jsx
import React, { createContext, useContext, useState } from 'react';

const themes = {
  light: {
    background: '#fff',
    text: '#000',
    primary: '#007AFF',
  },
  dark: {
    background: '#000',
    text: '#fff',
    primary: '#0A84FF',
  },
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };
  
  return (
    <ThemeContext.Provider value={{ theme: themes[theme], toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

// 사용
const MyComponent = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <View style={{ backgroundColor: theme.background }}>
      <Text style={{ color: theme.text }}>Hello</Text>
      <Button title="Toggle Theme" onPress={toggleTheme} />
    </View>
  );
};
```

---

## 9. 애니메이션 스타일 적용 방법은?

**답변:**

**Animated API:**
```jsx
import { Animated } from 'react-native';

const MyComponent = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);
  
  return (
    <Animated.View style={{ opacity: fadeAnim }}>
      <Text>Fading in</Text>
    </Animated.View>
  );
};
```

---

## 10. 스타일 성능 최적화 팁은?

**답변:**

**1. StyleSheet.create 사용:**
```jsx
// ❌ 나쁨
<View style={{ flex: 1, backgroundColor: '#fff' }} />

// ✅ 좋음
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
});
<View style={styles.container} />
```

**2. 인라인 스타일 피하기:**
```jsx
// ❌ 매 렌더링마다 새 객체 생성
<View style={{ marginTop: 10 }} />

// ✅ 재사용 가능한 스타일
const styles = StyleSheet.create({
  margin: { marginTop: 10 },
});
```

**3. StyleSheet.flatten 사용:**
```jsx
const flattenedStyle = StyleSheet.flatten([
  styles.base,
  styles.override,
]);
```

**4. 조건부 스타일 최적화:**
```jsx
// ❌
<View style={isActive ? styles.active : styles.inactive} />

// ✅
<View style={[styles.base, isActive && styles.active]} />
```
