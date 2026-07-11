# React와 React Native: 스타일링

React와 React Native 사이의 스타일링 접근 방식은 크게 다릅니다. React는 CSS와 그 확장을 활용하는 반면, React Native는 CSS와 유사하지만 중요한 차이점이 있는 JavaScript 기반 스타일링 시스템을 사용합니다.

## React(웹)의 스타일링

React는 웹 애플리케이션 스타일링을 위한 여러 접근 방식을 제공합니다:

### 1. 전통적인 CSS

```jsx
// CSS 파일 (styles.css)
.container {
  display: flex;
  background-color: #f5f5f5;
  padding: 20px;
}

.heading {
  font-size: 24px;
  color: #333;
  margin-bottom: 10px;
}

// React 컴포넌트
import './styles.css';

function MyComponent() {
  return (
    <div className="container">
      <h1 className="heading">안녕하세요</h1>
    </div>
  );
}
```

### 2. 인라인 스타일

```jsx
function MyComponent() {
  return (
    <div style={{ 
      display: 'flex', 
      backgroundColor: '#f5f5f5', 
      padding: '20px' 
    }}>
      <h1 style={{ 
        fontSize: '24px', 
        color: '#333', 
        marginBottom: '10px' 
      }}>
        안녕하세요
      </h1>
    </div>
  );
}
```

### 3. CSS 모듈

```jsx
// CSS 모듈 (MyComponent.module.css)
.container {
  display: flex;
  background-color: #f5f5f5;
  padding: 20px;
}

.heading {
  font-size: 24px;
  color: #333;
  margin-bottom: 10px;
}

// React 컴포넌트
import styles from './MyComponent.module.css';

function MyComponent() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>안녕하세요</h1>
    </div>
  );
}
```

### 4. CSS-in-JS 라이브러리

Styled Components나 Emotion과 같은 라이브러리 사용:

```jsx
// Styled Components 사용
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  background-color: #f5f5f5;
  padding: 20px;
`;

const Heading = styled.h1`
  font-size: 24px;
  color: #333;
  margin-bottom: 10px;
`;

function MyComponent() {
  return (
    <Container>
      <Heading>안녕하세요</Heading>
    </Container>
  );
}
```

## React Native의 스타일링

React Native는 CSS에서 영감을 받았지만 중요한 차이점이 있는 JavaScript 기반 스타일링 시스템을 사용합니다 [[1]](https://radixweb.com/blog/react-vs-react-native):

### 1. StyleSheet API

```jsx
import { View, Text, StyleSheet } from 'react-native';

function MyComponent() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>안녕하세요</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    color: '#333',
    marginBottom: 10,
  },
});
```

### 2. 인라인 스타일

```jsx
import { View, Text } from 'react-native';

function MyComponent() {
  return (
    <View style={{ 
      flex: 1, 
      backgroundColor: '#f5f5f5', 
      padding: 20 
    }}>
      <Text style={{ 
        fontSize: 24, 
        color: '#333', 
        marginBottom: 10 
      }}>
        안녕하세요
      </Text>
    </View>
  );
}
```

### 3. 여러 스타일 적용

```jsx
import { View, Text, StyleSheet } from 'react-native';

function MyComponent({ isActive }) {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, isActive && styles.activeText]}>
        안녕하세요
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  text: {
    fontSize: 16,
    color: 'black',
  },
  activeText: {
    fontWeight: 'bold',
    color: 'blue',
  },
});
```

## 주요 차이점

### 1. 스타일 속성

- **React(웹)**: 하이픈이 있는 표준 CSS 속성 사용 (예: `background-color`)
- **React Native**: 카멜케이스 속성 사용 (예: `backgroundColor`)

### 2. 단위

- **React(웹)**: 다양한 단위 사용 (px, em, rem, vh, vw, %)
- **React Native**: 대부분 단위 없는 숫자 사용 (밀도 독립적인 픽셀로 해석)

### 3. 레이아웃 시스템

- **React(웹)**: CSS 박스 모델, Flexbox, Grid 사용
- **React Native**: 주로 Flexbox 사용 (웹 Flexbox와 일부 차이점 있음)

### 4. 기본 레이아웃

- **React(웹)**: 기본 방향은 수평 흐름 (왼쪽에서 오른쪽)
- **React Native**: 기본 flex 방향은 열(column) (위에서 아래로)

### 5. 스타일링 기능

- **React(웹)**: 완전한 CSS 기능 (애니메이션, 전환, 가상 클래스)
- **React Native**: CSS와 유사한 속성의 제한된 하위 집합, CSS 가상 클래스 없음

### 6. 미디어 쿼리

- **React(웹)**: 반응형 디자인을 위한 미디어 쿼리 지원
- **React Native**: 직접적인 미디어 쿼리 지원 없음 (Dimensions API 또는 라이브러리 사용)

### 7. 상속

- **React(웹)**: CSS 속성은 부모 요소로부터 상속 가능
- **React Native**: 스타일 상속 없음 (일부 텍스트 속성 제외)

## 레이아웃 시스템

### React Native의 Flexbox

React Native는 레이아웃을 위해 Flexbox를 많이 사용합니다:

```jsx
import { View, StyleSheet } from 'react-native';

function FlexboxExample() {
  return (
    <View style={styles.container}>
      <View style={styles.box} />
      <View style={styles.box} />
      <View style={styles.box} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row', // React Native의 기본값은 'column'
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  box: {
    width: 80,
    height: 80,
    backgroundColor: 'steelblue',
  },
});
```

### 반응형 디자인

**React(웹)**:

```jsx
// CSS에서 미디어 쿼리 사용
.container {
  padding: 20px;
}

@media (max-width: 768px) {
  .container {
    padding: 10px;
  }
}
```

**React Native**:

```jsx
import { View, StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

function ResponsiveComponent() {
  return (
    <View style={[
      styles.container,
      windowWidth < 768 && styles.containerSmall
    ]}>
      {/* 콘텐츠 */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  containerSmall: {
    padding: 10,
  },
});
```

## 스타일링 라이브러리

### React(웹)

- Styled Components
- Emotion
- Tailwind CSS
- Material-UI
- Bootstrap

### React Native

- Styled Components (적응형)
- React Native Paper
- UI Kitten
- NativeBase
- Tailwind React Native Classnames

## React Native의 플랫폼별 스타일링

```jsx
import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
});
```

## 참조

- [[1]](https://radixweb.com/blog/react-vs-react-native) - React vs React Native - Key Difference, Features, Advantages
- [[4]](https://www.lambdatest.com/blog/react-vs-react-native/) - React Native vs ReactJS: Know The Differences
