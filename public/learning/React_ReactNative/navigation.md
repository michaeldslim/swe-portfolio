# React와 React Native: 내비게이션

내비게이션은 웹과 모바일 애플리케이션 모두에서 기본적인 측면이지만, React와 React Native 사이에서 구현 방식이 크게 다릅니다. 이 문서는 두 플랫폼에서 사용 가능한 내비게이션 패턴과 라이브러리를 탐구합니다.

## React(웹)의 내비게이션

React 웹 애플리케이션에서 내비게이션은 일반적으로 브라우저의 URL과 히스토리 API를 조작하여 처리됩니다. 이 과정을 단순화하기 위한 여러 라이브러리가 존재합니다.

### React Router

React 웹 애플리케이션에서 가장 인기 있는 내비게이션 라이브러리는 React Router입니다:

```jsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">홈</Link>
        <Link to="/about">소개</Link>
        <Link to="/contact">연락처</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/users/:userId" element={<UserProfile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
```

### 웹 내비게이션의 주요 특징

1. **URL 기반**: 내비게이션이 브라우저의 URL과 연결됨
2. **브라우저 히스토리**: 브라우저 컨트롤을 사용하여 뒤로/앞으로 이동 가능
3. **북마크 가능한 경로**: 애플리케이션의 각 상태를 북마크할 수 있음
4. **SEO 고려사항**: URL은 검색 엔진 최적화에 중요
5. **쿼리 매개변수**: URL 쿼리 매개변수를 통해 데이터 전달 가능

### 추가 웹 내비게이션 라이브러리

- **TanStack Router**: React용 타입 안전 라우팅
- **Wouter**: React Router의 미니멀한 대안
- **Next.js Router**: Next.js 애플리케이션을 위한 파일 시스템 기반 라우팅

## React Native의 내비게이션

React Native에서 내비게이션은 URL에 연결되지 않습니다(딥 링크는 지원됨). 대신 네이티브 모바일 앱과 유사한 스택 기반 내비게이션 시스템을 사용합니다 [[7]](https://www.browserstack.com/guide/react-vs-react-native).

### React Navigation

React Native에서 가장 널리 사용되는 내비게이션 라이브러리는 React Navigation입니다:

```jsx
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// 내비게이션이 있는 화면 컴포넌트
function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>홈 화면</Text>
      <Button
        title="상세 정보로 이동"
        onPress={() => navigation.navigate('Details', { itemId: 86 })}
      />
    </View>
  );
}

// 경로 파라미터 접근
function DetailsScreen({ route, navigation }) {
  const { itemId } = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>항목 {itemId}의 상세 정보</Text>
      <Button title="뒤로 가기" onPress={() => navigation.goBack()} />
    </View>
  );
}
```

### React Native의 내비게이션 유형

React Navigation은 여러 유형의 내비게이션 패턴을 지원합니다:

#### 스택 내비게이션

```jsx
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
}
```

#### 탭 내비게이션

```jsx
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
```

#### 서랍 내비게이션

```jsx
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Notifications" component={NotificationsScreen} />
    </Drawer.Navigator>
  );
}
```

### React Native 내비게이션의 주요 특징

1. **스택 기반**: 화면이 푸시와 팝이 가능한 스택으로 구성됨
2. **네이티브 전환**: 화면 간 네이티브 전환 사용
3. **기본적으로 URL 없음**: 내비게이션 상태가 URL에 반영되지 않음(딥 링크는 구성 가능)
4. **내비게이션 Props**: 컴포넌트는 프로그래밍 방식 내비게이션을 위한 내비게이션 객체를 받음
5. **화면 옵션**: 헤더, 전환 및 기타 UI 요소를 사용자 정의할 수 있음

### 기타 React Native 내비게이션 라이브러리

- **React Native Navigation**(Wix): 네이티브 내비게이션 솔루션
- **Expo Router**: Expo 프로젝트를 위한 파일 시스템 기반 라우팅

## 주요 차이점

### 1. 패러다임

- **React(웹)**: URL 기반, 브라우저 히스토리 활용
- **React Native**: 스택 기반, 네이티브 모바일 내비게이션 패턴 모방

### 2. 사용자 경험

- **React(웹)**: 페이지 전환은 일반적으로 전체 페이지 리로드 또는 클라이언트 측 렌더링 포함
- **React Native**: 화면 간 부드러운 애니메이션, 플랫폼별 패턴 일치

### 3. 상태 지속성

- **React(웹)**: 상태는 URL, localStorage 또는 세션 스토리지에 유지될 수 있음
- **React Native**: 상태는 Redux Persist와 같은 라이브러리로 명시적으로 관리해야 함

### 4. 딥 링크

- **React(웹)**: 웹 플랫폼의 자연스러운 부분
- **React Native**: 명시적 구성 필요

```jsx
// React Native 딥 링크 구성
import { NavigationContainer } from '@react-navigation/native';
import { linking } from './linking';

function App() {
  return (
    <NavigationContainer linking={linking}>
      {/* ... */}
    </NavigationContainer>
  );
}

// linking.js
export const linking = {
  prefixes: ['myapp://', 'https://myapp.com'],
  config: {
    screens: {
      Home: 'home',
      Details: {
        path: 'details/:id',
        parse: {
          id: Number,
        },
      },
    },
  },
};
```

## 공통 패턴

차이점에도 불구하고 일부 내비게이션 패턴은 두 플랫폼에서 공통적입니다:

### 인증된 vs 인증되지 않은 경로

```jsx
// React(React Router 사용)
function App() {
  const isAuthenticated = useAuth();

  return (
    <Routes>
      {isAuthenticated ? (
        <>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
        </>
      ) : (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </>
      )}
      <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
    </Routes>
  );
}

// React Native(React Navigation 사용)
function App() {
  const isAuthenticated = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuthenticated ? (
          <>
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen name="Profile" component={Profile} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

## 참조

- [[7]](https://www.browserstack.com/guide/react-vs-react-native) - React vs React Native: When to use which?
- [[8]](https://www.reddit.com/r/reactjs/comments/z0ooos/how_different_is_react_native_from_react/) - How different is React Native from React?
