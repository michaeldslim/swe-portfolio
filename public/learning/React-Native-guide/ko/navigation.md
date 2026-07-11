# 내비게이션

React Native의 내비게이션은 React Navigation과 같은 라이브러리로 처리됩니다. 스택, 탭 또는 드로어 네비게이터를 사용하여 화면 간 이동, 파라미터 전달, 내비게이션 이벤트 처리를 할 수 있습니다.

```tsx
// App.tsx
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import DetailsScreen from './DetailsScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// 파라미터 전달:
navigation.navigate('Details', { itemId: 42 });
```
*이것은 스택 내비게이션을 설정하고 화면 간 파라미터를 전달하는 방법을 보여줍니다.*
