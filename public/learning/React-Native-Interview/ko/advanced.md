# 고급 주제

## 1. 새 아키텍처 (New Architecture)란?

**답변:**
React Native의 새 아키텍처는 성능과 개발자 경험을 개선합니다.

**주요 구성요소:**
- **Fabric**: 새로운 렌더링 시스템
- **TurboModules**: 개선된 네이티브 모듈
- **JSI (JavaScript Interface)**: Bridge 제거

**장점:**
- 동기식 네이티브 호출
- 타입 안정성 향상
- 더 나은 성능
- 메모리 사용량 감소

---

## 2. Hermes 엔진이란?

**답변:**
Hermes는 React Native를 위해 최적화된 JavaScript 엔진입니다.

**특징:**
- 빠른 앱 시작 시간
- 작은 메모리 사용량
- 작은 APK 크기
- 바이트코드 사전 컴파일

**활성화:**
```javascript
// android/app/build.gradle
project.ext.react = [
    enableHermes: true
]

// iOS (Podfile)
use_react_native!(
  :hermes_enabled => true
)
```

---

## 3. Reanimated 2 사용법은?

**답변:**

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
  
  return (
    <>
      <Animated.View style={[styles.box, animatedStyles]} />
      <Button title="Move" onPress={handlePress} />
    </>
  );
};
```

---

## 4. Gesture Handler 사용법은?

**답변:**

```jsx
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle } from 'react-native-reanimated';

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

## 5. Monorepo 구성 방법은?

**답변:**

**Yarn Workspaces:**
```json
{
  "private": true,
  "workspaces": [
    "packages/*",
    "apps/*"
  ]
}
```

**Lerna:**
```bash
npm install -g lerna
lerna init
```

**구조:**
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

## 6. TypeScript 고급 패턴은?

**답변:**

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
type Readonly<T> = { readonly [P in keyof T]: T[P] };

// Conditional Types
type IsString<T> = T extends string ? true : false;
```

---

## 7. 코드 분할 (Code Splitting) 방법은?

**답변:**

```jsx
const LazyComponent = React.lazy(() => import('./HeavyComponent'));

const App = () => (
  <Suspense fallback={<Loading />}>
    <LazyComponent />
  </Suspense>
);
```

---

## 8. 메모리 프로파일링 방법은?

**답변:**

**Flipper 사용:**
- Memory 플러그인
- Heap Snapshot
- Allocation Tracking

**Chrome DevTools:**
```jsx
// 메모리 누수 감지
const [data, setData] = useState([]);

useEffect(() => {
  const interval = setInterval(() => {
    setData(prev => [...prev, new Array(1000)]);
  }, 100);
  
  return () => clearInterval(interval); // 정리 필수!
}, []);
```

---

## 9. 접근성 (Accessibility) 구현은?

**답변:**

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

## 10. 국제화 (i18n) 구현은?

**답변:**

```bash
npm install i18next react-i18next
```

```jsx
import i18n from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: { welcome: 'Welcome' } },
    ko: { translation: { welcome: '환영합니다' } },
  },
  lng: 'en',
});

const App = () => {
  const { t, i18n } = useTranslation();
  return <Text>{t('welcome')}</Text>;
};
```
