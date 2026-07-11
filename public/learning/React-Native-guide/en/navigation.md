# Navigation

Navigation in React Native is handled by libraries like React Navigation. You can use stack, tab, or drawer navigators to move between screens, pass parameters, and handle navigation events.

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

// Passing params:
navigation.navigate('Details', { itemId: 42 });
```
*This sets up stack navigation and shows how to pass parameters between screens.*
