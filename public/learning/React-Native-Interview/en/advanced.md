# Advanced Topics

## 1. New Architecture?

React Native's new architecture improves performance and developer experience.

**Components:**
- **Fabric**: New rendering system
- **TurboModules**: Improved native modules
- **JSI (JavaScript Interface)**: Removes Bridge

**Benefits:**
- Synchronous native calls
- Better type safety
- Improved performance
- Reduced memory usage

---

## 2. Hermes Engine?

Hermes is a JavaScript engine optimized for React Native.

**Features:**
- Faster app startup
- Lower memory usage
- Smaller APK size
- Bytecode precompilation

**Enable:**
```javascript
// android/app/build.gradle
project.ext.react = [
    enableHermes: true
]
```

---

## 3. Reanimated 2?

```jsx
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

const Box = () => {
  const offset = useSharedValue(0);
  
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
  }));
  
  const handlePress = () => {
    offset.value = withSpring(offset.value + 50);
  };
  
  return <Animated.View style={[styles.box, animatedStyles]} />;
};
```

---

## 4. Gesture Handler?

```jsx
import { GestureDetector, Gesture } from 'react-native-gesture-handler';

const DraggableBox = () => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  
  const pan = Gesture.Pan()
    .onChange((event) => {
      translateX.value += event.changeX;
      translateY.value += event.changeY;
    });
  
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));
  
  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={[styles.box, animatedStyle]} />
    </GestureDetector>
  );
};
```

---

## 5. Monorepo Setup?

**Yarn Workspaces:**
```json
{
  "private": true,
  "workspaces": ["packages/*", "apps/*"]
}
```

**Structure:**
```
monorepo/
├── packages/
│   ├── shared/
│   └── ui-components/
└── apps/
    ├── mobile/
    └── web/
```

---

## 6. TypeScript Advanced Patterns?

```typescript
// Generic Component
interface IListProps<T> {
  data: T[];
  renderItem: (item: T) => React.ReactElement;
}

function List<T>({ data, renderItem }: IListProps<T>) {
  return <>{data.map(renderItem)}</>;
}

// Utility Types
type Partial<T> = { [P in keyof T]?: T[P] };
type Required<T> = { [P in keyof T]-?: T[P] };
```

---

## 7. Code Splitting?

```jsx
const LazyComponent = React.lazy(() => import('./HeavyComponent'));

const App = () => (
  <Suspense fallback={<Loading />}>
    <LazyComponent />
  </Suspense>
);
```

---

## 8. Memory Profiling?

**Tools:**
- Flipper Memory plugin
- Chrome DevTools
- Heap Snapshot

**Prevent Leaks:**
```jsx
useEffect(() => {
  const interval = setInterval(() => {}, 100);
  return () => clearInterval(interval); // Cleanup!
}, []);
```

---

## 9. Accessibility?

```jsx
<TouchableOpacity
  accessible={true}
  accessibilityLabel="Add to cart"
  accessibilityHint="Adds this item to your shopping cart"
  accessibilityRole="button"
  onPress={handlePress}
>
  <Text>Add to Cart</Text>
</TouchableOpacity>
```

---

## 10. Internationalization (i18n)?

```jsx
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';

i18n.init({
  resources: {
    en: { translation: { welcome: 'Welcome' } },
    ko: { translation: { welcome: '환영합니다' } },
  },
  lng: 'en',
});

const App = () => {
  const { t } = useTranslation();
  return <Text>{t('welcome')}</Text>;
};
```
