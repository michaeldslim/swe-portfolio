# Performance Optimization

## 1. FlatList Optimization?

```jsx
<FlatList
  data={data}
  renderItem={({ item }) => <Item data={item} />}
  keyExtractor={(item) => item.id}
  removeClippedSubviews={true}
  maxToRenderPerBatch={10}
  windowSize={5}
  getItemLayout={(data, index) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  })}
/>
```

---

## 2. Memoization?

**React.memo:**
```jsx
const Item = React.memo(({ title }) => <Text>{title}</Text>);
```

**useMemo:**
```jsx
const value = useMemo(() => expensiveCalculation(a, b), [a, b]);
```

**useCallback:**
```jsx
const handlePress = useCallback((id) => console.log(id), []);
```

---

## 3. Image Optimization?

```jsx
import FastImage from 'react-native-fast-image';

<FastImage
  source={{
    uri: 'https://example.com/image.jpg',
    priority: FastImage.priority.normal,
    cache: FastImage.cacheControl.immutable,
  }}
  style={{ width: 200, height: 200 }}
/>
```

---

## 4. useNativeDriver?

```jsx
Animated.timing(animatedValue, {
  toValue: 1,
  duration: 300,
  useNativeDriver: true, // Runs on native thread
}).start();
```

**Supported:**
- `opacity`
- `transform` (translate, scale, rotate)

**Not Supported:**
- `width`, `height`
- `backgroundColor`

---

## 5. Bundle Size Optimization?

**Hermes Engine:**
```javascript
// android/app/build.gradle
project.ext.react = [
    enableHermes: true
]
```

**ProGuard:**
```gradle
def enableProguardInReleaseBuilds = true
```

---

## 6. Performance Measurement?

**React DevTools Profiler:**
```jsx
<Profiler id="MyComponent" onRender={onRenderCallback}>
  <MyComponent />
</Profiler>
```

**Tools:**
- Flipper
- React DevTools
- Performance Monitor

---

## 7. Memory Leak Prevention?

```jsx
useEffect(() => {
  const subscription = eventEmitter.addListener('event', handler);
  return () => subscription.remove();
}, []);

useEffect(() => {
  const timer = setTimeout(() => {}, 1000);
  return () => clearTimeout(timer);
}, []);
```

---

## 8. Native Module Optimization?

**Turbo Modules:**
```typescript
import { TurboModuleRegistry } from 'react-native';

interface Spec extends TurboModule {
  getString(id: string): Promise<string>;
}

export default TurboModuleRegistry.get<Spec>('MyModule');
```

---

## 9. App Startup Optimization?

**Lazy Loading:**
```jsx
const HomeScreen = React.lazy(() => import('./screens/Home'));
```

**Inline Requires:**
```javascript
// metro.config.js
module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: { inlineRequires: true },
    }),
  },
};
```

---

## 10. Monitoring Tools?

- **Flipper**: Debugging and performance
- **React DevTools**: Component profiling
- **Reactotron**: State and API monitoring
- **Firebase Performance**: Production monitoring
- **Sentry**: Error tracking
