# Navigation

## 1. What is React Navigation?

React Navigation is the most popular routing and navigation library for React Native.

**Installation:**
```bash
npm install @react-navigation/native
npm install react-native-screens react-native-safe-area-context
```

---

## 2. Stack Navigator Usage?

```jsx
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);
```

---

## 3. Passing Navigation Parameters?

```jsx
// Passing
navigation.navigate('Details', { itemId: 86, otherParam: 'anything' });

// Receiving
const DetailsScreen = ({ route }) => {
  const { itemId, otherParam } = route.params;
  return <Text>Item ID: {itemId}</Text>;
};
```

---

## 4. Tab Navigator?

```jsx
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const App = () => (
  <NavigationContainer>
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  </NavigationContainer>
);
```

---

## 5. Drawer Navigator?

```jsx
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

const App = () => (
  <NavigationContainer>
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
    </Drawer.Navigator>
  </NavigationContainer>
);
```

---

## 6. Header Customization?

```jsx
<Stack.Screen
  name="Home"
  component={HomeScreen}
  options={{
    title: 'Home Screen',
    headerStyle: { backgroundColor: '#f4511e' },
    headerTintColor: '#fff',
    headerRight: () => <Button title="Info" onPress={() => alert('Info')} />,
  }}
/>
```

---

## 7. Deep Linking?

```jsx
const linking = {
  prefixes: ['myapp://', 'https://myapp.com'],
  config: {
    screens: {
      Home: 'home',
      Profile: 'user/:id',
    },
  },
};

<NavigationContainer linking={linking}>
  {/* ... */}
</NavigationContainer>
```

---

## 8. Navigation Guards?

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
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
```

---

## 9. Nested Navigators?

```jsx
const HomeStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name="Home" component={HomeScreen} />
    <HomeStack.Screen name="Details" component={DetailsScreen} />
  </HomeStack.Navigator>
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

## 10. Navigation State Management?

```jsx
// Go back
navigation.goBack();

// Navigate
navigation.navigate('Home');

// Reset stack
navigation.reset({
  index: 0,
  routes: [{ name: 'Home' }],
});

// Pop
navigation.pop();
navigation.popToTop();
```
