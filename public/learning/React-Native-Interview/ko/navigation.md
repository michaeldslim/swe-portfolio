# 내비게이션

## 1. React Navigation이란?

**답변:**
React Navigation은 React Native에서 가장 많이 사용되는 라우팅 및 내비게이션 라이브러리입니다.

**설치:**
```bash
npm install @react-navigation/native
npm install react-native-screens react-native-safe-area-context
```

**주요 네비게이터:**
- Stack Navigator: 화면 스택 관리
- Tab Navigator: 하단 탭
- Drawer Navigator: 사이드 메뉴
- Native Stack Navigator: 네이티브 성능

---

## 2. Stack Navigator 사용법은?

**답변:**

```jsx
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ title: '홈' }}
        />
        <Stack.Screen 
          name="Details" 
          component={DetailsScreen} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
```

**화면 이동:**
```jsx
const HomeScreen = ({ navigation }) => {
  return (
    <Button
      title="상세로 이동"
      onPress={() => navigation.navigate('Details', { id: 1 })}
    />
  );
};
```

---

## 3. 네비게이션 파라미터 전달 방법은?

**답변:**

**파라미터 전달:**
```jsx
navigation.navigate('Details', {
  itemId: 86,
  otherParam: 'anything',
});
```

**파라미터 받기:**
```jsx
const DetailsScreen = ({ route, navigation }) => {
  const { itemId, otherParam } = route.params;
  
  return (
    <View>
      <Text>Item ID: {itemId}</Text>
      <Text>Other: {otherParam}</Text>
    </View>
  );
};
```

**TypeScript 타입 정의:**
```typescript
type RootStackParamList = {
  Home: undefined;
  Details: { itemId: number; otherParam: string };
};

type DetailsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Details'
>;
```

---

## 4. Tab Navigator 구현 방법은?

**답변:**

```jsx
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'settings' : 'settings-outline';
            }
            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
```

---

## 5. Drawer Navigator는 어떻게 사용하나요?

**답변:**

```jsx
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          drawerStyle: {
            backgroundColor: '#c6cbef',
            width: 240,
          },
        }}
      >
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Profile" component={ProfileScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
```

**Drawer 열기:**
```jsx
const HomeScreen = ({ navigation }) => {
  return (
    <Button
      title="메뉴 열기"
      onPress={() => navigation.openDrawer()}
    />
  );
};
```

---

## 6. 네비게이션 헤더 커스터마이징 방법은?

**답변:**

**옵션으로 설정:**
```jsx
<Stack.Screen
  name="Home"
  component={HomeScreen}
  options={{
    title: '홈 화면',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    headerRight: () => (
      <Button title="Info" onPress={() => alert('Info')} />
    ),
  }}
/>
```

**동적 헤더:**
```jsx
useEffect(() => {
  navigation.setOptions({
    title: `Item ${itemId}`,
  });
}, [navigation, itemId]);
```

---

## 7. Deep Linking 구현 방법은?

**답변:**

**설정:**
```jsx
const linking = {
  prefixes: ['myapp://', 'https://myapp.com'],
  config: {
    screens: {
      Home: 'home',
      Profile: 'user/:id',
      Settings: 'settings',
    },
  },
};

<NavigationContainer linking={linking}>
  {/* ... */}
</NavigationContainer>
```

**iOS 설정 (Info.plist):**
```xml
<key>CFBundleURLTypes</key>
<array>
  <dict>
    <key>CFBundleURLSchemes</key>
    <array>
      <string>myapp</string>
    </array>
  </dict>
</array>
```

**Android 설정 (AndroidManifest.xml):**
```xml
<intent-filter>
  <action android:name="android.intent.action.VIEW" />
  <category android:name="android.intent.category.DEFAULT" />
  <category android:name="android.intent.category.BROWSABLE" />
  <data android:scheme="myapp" />
</intent-filter>
```

---

## 8. 네비게이션 가드 구현 방법은?

**답변:**

```jsx
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
```

**네비게이션 리스너:**
```jsx
useEffect(() => {
  const unsubscribe = navigation.addListener('beforeRemove', (e) => {
    if (!hasUnsavedChanges) {
      return;
    }
    
    e.preventDefault();
    Alert.alert(
      '변경사항을 저장하지 않았습니다',
      '정말 나가시겠습니까?',
      [
        { text: '취소', style: 'cancel' },
        { text: '나가기', onPress: () => navigation.dispatch(e.data.action) },
      ]
    );
  });
  
  return unsubscribe;
}, [navigation, hasUnsavedChanges]);
```

---

## 9. 중첩 네비게이터 사용법은?

**답변:**

```jsx
const HomeStack = createNativeStackNavigator();
const SettingsStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name="Home" component={HomeScreen} />
    <HomeStack.Screen name="Details" component={DetailsScreen} />
  </HomeStack.Navigator>
);

const SettingsStackScreen = () => (
  <SettingsStack.Navigator>
    <SettingsStack.Screen name="Settings" component={SettingsScreen} />
    <SettingsStack.Screen name="Profile" component={ProfileScreen} />
  </SettingsStack.Navigator>
);

const App = () => (
  <NavigationContainer>
    <Tab.Navigator>
      <Tab.Screen name="HomeTab" component={HomeStackScreen} />
      <Tab.Screen name="SettingsTab" component={SettingsStackScreen} />
    </Tab.Navigator>
  </NavigationContainer>
);
```

---

## 10. 네비게이션 상태 관리는?

**답변:**

**현재 라우트 가져오기:**
```jsx
import { useRoute } from '@react-navigation/native';

const MyComponent = () => {
  const route = useRoute();
  console.log(route.name); // 현재 화면 이름
};
```

**네비게이션 상태 접근:**
```jsx
import { useNavigationState } from '@react-navigation/native';

const index = useNavigationState(state => state.index);
const routes = useNavigationState(state => state.routes);
```

**프로그래매틱 네비게이션:**
```jsx
// 뒤로 가기
navigation.goBack();

// 특정 화면으로 이동
navigation.navigate('Home');

// 스택 리셋
navigation.reset({
  index: 0,
  routes: [{ name: 'Home' }],
});

// 팝
navigation.pop();
navigation.popToTop();
```
