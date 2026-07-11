# React Native 기초

## 1. React Native란 무엇인가요?

**답변:**
React Native는 Facebook(Meta)에서 개발한 오픈소스 모바일 애플리케이션 프레임워크입니다. JavaScript와 React를 사용하여 iOS와 Android용 네이티브 모바일 앱을 개발할 수 있습니다.

**주요 특징:**
- **크로스 플랫폼**: 하나의 코드베이스로 iOS와 Android 앱 개발
- **네이티브 성능**: 실제 네이티브 컴포넌트 사용
- **Hot Reloading**: 빠른 개발 사이클
- **대규모 커뮤니티**: 풍부한 라이브러리와 도구

---

## 2. React Native와 React의 차이점은?

**답변:**

| 구분 | React | React Native |
|------|-------|--------------|
| 플랫폼 | 웹 (브라우저) | 모바일 (iOS/Android) |
| 렌더링 | DOM | 네이티브 컴포넌트 |
| 스타일링 | CSS | StyleSheet (CSS-like) |
| 라우팅 | React Router | React Navigation |
| 번들러 | Webpack, Vite | Metro |

**코드 예시:**
```jsx
// React (웹)
<div style={{ flex: 1 }}>
  <h1>Hello</h1>
</div>

// React Native
<View style={{ flex: 1 }}>
  <Text>Hello</Text>
</View>
```

---

## 3. React Native의 장단점은?

**장점:**
- ✅ 코드 재사용성 (iOS/Android 공유)
- ✅ 빠른 개발 속도
- ✅ Hot Reloading으로 즉각적인 피드백
- ✅ 큰 커뮤니티와 생태계
- ✅ JavaScript/TypeScript 사용 가능
- ✅ 네이티브 모듈 통합 가능

**단점:**
- ❌ 네이티브 앱보다 성능이 약간 떨어질 수 있음
- ❌ 복잡한 애니메이션이나 그래픽 처리 시 한계
- ❌ 네이티브 모듈 작업 시 Swift/Kotlin 지식 필요
- ❌ 앱 크기가 상대적으로 큼
- ❌ 버전 업데이트 시 호환성 문제 발생 가능

---

## 4. React Native의 작동 원리는?

**답변:**

React Native는 **Bridge** 아키텍처를 사용합니다 (새 아키텍처에서는 JSI 사용):

1. **JavaScript Thread**: 비즈니스 로직 실행
2. **Bridge**: JS와 네이티브 간 통신
3. **Native Thread**: UI 렌더링 및 네이티브 기능 실행

```
JavaScript Code
      ↓
  Bridge (JSON)
      ↓
Native Components
```

**새 아키텍처 (Fabric & TurboModules):**
- JSI (JavaScript Interface)로 직접 통신
- Bridge 제거로 성능 향상
- 동기식 네이티브 호출 가능

---

## 5. Metro Bundler란?

**답변:**
Metro는 React Native를 위한 JavaScript 번들러입니다.

**주요 기능:**
- JavaScript 코드를 번들링
- Fast Refresh 지원
- 증분 빌드로 빠른 개발
- Source maps 생성

**설정 파일:** `metro.config.js`
```javascript
module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
};
```

---

## 6. Expo와 React Native CLI의 차이는?

**답변:**

| 구분 | Expo | React Native CLI |
|------|------|------------------|
| 설정 | 간단, 즉시 시작 | 복잡, 네이티브 설정 필요 |
| 네이티브 코드 | 제한적 접근 | 완전한 접근 |
| 빌드 | Expo 서버 사용 | 로컬 빌드 |
| 크기 | 상대적으로 큼 | 최적화 가능 |
| 업데이트 | OTA 업데이트 쉬움 | 수동 배포 |
| 네이티브 모듈 | Expo SDK만 사용 | 모든 모듈 사용 가능 |

**선택 기준:**
- **Expo**: 빠른 프로토타입, 간단한 앱
- **React Native CLI**: 복잡한 네이티브 기능, 완전한 제어

---

## 7. JSX란 무엇인가요?

**답변:**
JSX는 JavaScript XML의 약자로, JavaScript 안에서 UI를 작성할 수 있게 해주는 문법 확장입니다.

```jsx
// JSX
const element = <Text>Hello, World!</Text>;

// 변환 후 (Babel)
const element = React.createElement(Text, null, 'Hello, World!');
```

**규칙:**
- 하나의 루트 요소만 반환
- 모든 태그는 닫혀야 함
- className 대신 style 사용
- camelCase 속성명

---

## 8. React Native에서 사용하는 핵심 컴포넌트는?

**답변:**

**기본 컴포넌트:**
- `<View>`: 컨테이너 (div와 유사)
- `<Text>`: 텍스트 표시
- `<Image>`: 이미지 표시
- `<ScrollView>`: 스크롤 가능한 컨테이너
- `<TextInput>`: 입력 필드

**리스트 컴포넌트:**
- `<FlatList>`: 효율적인 리스트
- `<SectionList>`: 섹션이 있는 리스트

**인터랙션:**
- `<TouchableOpacity>`: 터치 시 투명도 변경
- `<Pressable>`: 다양한 터치 이벤트 처리
- `<Button>`: 기본 버튼

---

## 9. React Native 앱의 진입점은?

**답변:**

**index.js** (프로젝트 루트)
```javascript
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
```

**App.js** (메인 컴포넌트)
```jsx
import React from 'react';
import { View, Text } from 'react-native';

const App = () => {
  return (
    <View>
      <Text>Hello React Native!</Text>
    </View>
  );
};

export default App;
```

---

## 10. Fast Refresh와 Hot Reloading의 차이는?

**답변:**

**Hot Reloading (구버전):**
- 전체 앱을 다시 로드하지 않고 변경사항 반영
- 상태가 유지되지 않을 수 있음
- 때때로 불안정

**Fast Refresh (현재):**
- 컴포넌트 상태 유지하며 변경사항 반영
- 더 안정적이고 빠름
- 에러 복구 기능 향상
- React Hooks와 잘 작동

**활성화:**
- 개발 메뉴에서 "Enable Fast Refresh" 선택
- 기본적으로 활성화되어 있음
