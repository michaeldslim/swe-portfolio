# React Native Basics

## 1. What is React Native?

**Answer:**
React Native is an open-source mobile application framework developed by Facebook (Meta). It allows you to build native mobile apps for iOS and Android using JavaScript and React.

**Key Features:**
- **Cross-platform**: One codebase for iOS and Android
- **Native Performance**: Uses real native components
- **Hot Reloading**: Fast development cycle
- **Large Community**: Rich libraries and tools

---

## 2. Difference between React and React Native?

**Answer:**

| Aspect | React | React Native |
|--------|-------|--------------|
| Platform | Web (Browser) | Mobile (iOS/Android) |
| Rendering | DOM | Native Components |
| Styling | CSS | StyleSheet (CSS-like) |
| Routing | React Router | React Navigation |
| Bundler | Webpack, Vite | Metro |

**Code Example:**
```jsx
// React (Web)
<div style={{ flex: 1 }}>
  <h1>Hello</h1>
</div>

// React Native
<View style={{ flex: 1 }}>
  <Text>Hello</Text>
</View>
```

---

## 3. Pros and Cons of React Native?

**Pros:**
- ✅ Code reusability (iOS/Android shared)
- ✅ Faster development
- ✅ Hot Reloading for instant feedback
- ✅ Large community and ecosystem
- ✅ JavaScript/TypeScript support
- ✅ Native module integration

**Cons:**
- ❌ Slightly lower performance than native
- ❌ Limitations with complex animations/graphics
- ❌ Requires Swift/Kotlin knowledge for native modules
- ❌ Larger app size
- ❌ Version update compatibility issues

---

## 4. How does React Native work?

**Answer:**

React Native uses a **Bridge** architecture (JSI in new architecture):

1. **JavaScript Thread**: Executes business logic
2. **Bridge**: Communication between JS and native
3. **Native Thread**: UI rendering and native features

```
JavaScript Code
      ↓
  Bridge (JSON)
      ↓
Native Components
```

**New Architecture (Fabric & TurboModules):**
- JSI (JavaScript Interface) for direct communication
- Bridge removal for better performance
- Synchronous native calls possible

---

## 5. What is Metro Bundler?

**Answer:**
Metro is the JavaScript bundler for React Native.

**Key Features:**
- Bundles JavaScript code
- Fast Refresh support
- Incremental builds for fast development
- Source maps generation

**Config file:** `metro.config.js`
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

## 6. Difference between Expo and React Native CLI?

**Answer:**

| Aspect | Expo | React Native CLI |
|--------|------|------------------|
| Setup | Simple, instant start | Complex, native setup required |
| Native Code | Limited access | Full access |
| Build | Expo server | Local build |
| Size | Relatively larger | Optimizable |
| Updates | Easy OTA updates | Manual deployment |
| Native Modules | Expo SDK only | All modules available |

**Selection Criteria:**
- **Expo**: Quick prototyping, simple apps
- **React Native CLI**: Complex native features, full control

---

## 7. What is JSX?

**Answer:**
JSX stands for JavaScript XML, a syntax extension that allows writing UI in JavaScript.

```jsx
// JSX
const element = <Text>Hello, World!</Text>;

// After transformation (Babel)
const element = React.createElement(Text, null, 'Hello, World!');
```

**Rules:**
- Only one root element
- All tags must be closed
- Use style instead of className
- camelCase property names

---

## 8. Core Components in React Native?

**Answer:**

**Basic Components:**
- `<View>`: Container (similar to div)
- `<Text>`: Display text
- `<Image>`: Display images
- `<ScrollView>`: Scrollable container
- `<TextInput>`: Input field

**List Components:**
- `<FlatList>`: Efficient list
- `<SectionList>`: List with sections

**Interaction:**
- `<TouchableOpacity>`: Changes opacity on touch
- `<Pressable>`: Handles various touch events
- `<Button>`: Basic button

---

## 9. Entry point of React Native app?

**Answer:**

**index.js** (Project root)
```javascript
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
```

**App.js** (Main component)
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

## 10. Difference between Fast Refresh and Hot Reloading?

**Answer:**

**Hot Reloading (Old):**
- Reflects changes without full app reload
- State may not be preserved
- Sometimes unstable

**Fast Refresh (Current):**
- Preserves component state while reflecting changes
- More stable and faster
- Better error recovery
- Works well with React Hooks

**Activation:**
- Select "Enable Fast Refresh" in dev menu
- Enabled by default
