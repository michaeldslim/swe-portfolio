# React vs React Native: Navigation

Navigation is a fundamental aspect of both web and mobile applications, but the implementation differs significantly between React and React Native. This document explores the navigation patterns and libraries available for both platforms.

## Navigation in React (Web)

In React web applications, navigation is typically handled through manipulation of the browser's URL and history API. Several libraries exist to simplify this process.

### React Router

The most popular navigation library for React web applications is React Router:

```jsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
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

### Key Features of Web Navigation

1. **URL-Based**: Navigation is tied to URLs in the browser
2. **Browser History**: Can go back/forward using browser controls
3. **Bookmarkable Routes**: Each state of the application can be bookmarked
4. **SEO Considerations**: URLs are important for search engine optimization
5. **Query Parameters**: Can pass data through URL query parameters

### Additional Web Navigation Libraries

- **TanStack Router**: Type-safe routing for React
- **Wouter**: A minimalist alternative to React Router
- **Next.js Router**: File-system based routing for Next.js applications

## Navigation in React Native

In React Native, navigation is not tied to URLs (though deep linking is supported). Instead, it uses a stack-based navigation system similar to native mobile apps [[7]](https://www.browserstack.com/guide/react-vs-react-native).

### React Navigation

The most widely used navigation library for React Native is React Navigation:

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

// Screen component with navigation
function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details', { itemId: 86 })}
      />
    </View>
  );
}

// Accessing route params
function DetailsScreen({ route, navigation }) {
  const { itemId } = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details for Item {itemId}</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}
```

### Navigation Types in React Native

React Navigation supports several types of navigation patterns:

#### Stack Navigation

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

#### Tab Navigation

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

#### Drawer Navigation

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

### Key Features of React Native Navigation

1. **Stack-Based**: Screens are organized in stacks that can be pushed and popped
2. **Native Transitions**: Uses native transitions between screens
3. **No URLs by Default**: Navigation state is not reflected in URLs (though deep linking can be configured)
4. **Navigation Props**: Components receive navigation objects for programmatic navigation
5. **Screen Options**: Can customize headers, transitions, and other UI elements

### Other React Native Navigation Libraries

- **React Native Navigation** (by Wix): A native navigation solution
- **Expo Router**: File-system based routing for Expo projects

## Key Differences

### 1. Paradigm

- **React (Web)**: URL-based, leverages browser history
- **React Native**: Stack-based, mimics native mobile navigation patterns

### 2. User Experience

- **React (Web)**: Page transitions typically involve full page reloads or client-side rendering
- **React Native**: Smooth animations between screens, matching platform-specific patterns

### 3. State Persistence

- **React (Web)**: State can be persisted in URLs, localStorage, or session storage
- **React Native**: State must be explicitly managed with libraries like Redux Persist

### 4. Deep Linking

- **React (Web)**: Natural part of the web platform
- **React Native**: Requires explicit configuration

```jsx
// React Native deep linking configuration
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

## Shared Patterns

Despite the differences, some navigation patterns are common across both platforms:

### Authenticated vs. Unauthenticated Routes

```jsx
// React (using React Router)
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

// React Native (using React Navigation)
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

## References

- [[7]](https://www.browserstack.com/guide/react-vs-react-native) - React vs React Native: When to use which?
- [[8]](https://www.reddit.com/r/reactjs/comments/z0ooos/how_different_is_react_native_from_react/) - How different is React Native from React?
