# 성능 최적화

## 1. FlatList 최적화 방법은?

**답변:**
```jsx
<FlatList
  data={data}
  renderItem={({ item }) => <Item data={item} />}
  keyExtractor={(item) => item.id}
  // 성능 최적화 props
  removeClippedSubviews={true}
  maxToRenderPerBatch={10}
  updateCellsBatchingPeriod={50}
  initialNumToRender={10}
  windowSize={5}
  getItemLayout={(data, index) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  })}
/>
```

**주요 최적화:**
- `keyExtractor`: 고유 키 제공
- `getItemLayout`: 아이템 크기 미리 계산
- `removeClippedSubviews`: 화면 밖 뷰 제거
- `windowSize`: 렌더링 윈도우 크기 조절

---

## 2. 메모이제이션 기법은?

**답변:**

**React.memo:**
```jsx
const Item = React.memo(({ title, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Text>{title}</Text>
  </TouchableOpacity>
));
```

**useMemo:**
```jsx
const expensiveValue = useMemo(() => {
  return items.filter(item => item.active).length;
}, [items]);
```

**useCallback:**
```jsx
const handlePress = useCallback((id) => {
  console.log('Pressed:', id);
}, []);
```

---

## 3. 이미지 최적화 방법은?

**답변:**

**적절한 크기 사용:**
```jsx
<Image
  source={{ uri: 'https://example.com/image.jpg' }}
  style={{ width: 200, height: 200 }}
  resizeMode="cover"
/>
```

**FastImage 라이브러리:**
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

**로컬 이미지 최적화:**
- WebP 포맷 사용
- 적절한 해상도 (@2x, @3x)
- 이미지 압축

---

## 4. useNativeDriver 사용법은?

**답변:**
```jsx
Animated.timing(animatedValue, {
  toValue: 1,
  duration: 300,
  useNativeDriver: true, // 네이티브 스레드에서 실행
}).start();
```

**지원하는 속성:**
- `opacity`
- `transform` (translate, scale, rotate)

**지원하지 않는 속성:**
- `width`, `height`
- `backgroundColor`
- `flex`

---

## 5. 번들 크기 최적화 방법은?

**답변:**

**Hermes 엔진 사용:**
```javascript
// android/app/build.gradle
project.ext.react = [
    enableHermes: true
]
```

**ProGuard 활성화:**
```gradle
def enableProguardInReleaseBuilds = true
```

**불필요한 라이브러리 제거:**
```bash
npm uninstall unused-package
```

**동적 import:**
```jsx
const HeavyComponent = React.lazy(() => import('./HeavyComponent'));

<Suspense fallback={<Loading />}>
  <HeavyComponent />
</Suspense>
```

---

## 6. 렌더링 성능 측정 방법은?

**답변:**

**React DevTools Profiler:**
```jsx
import { Profiler } from 'react';

<Profiler id="MyComponent" onRender={onRenderCallback}>
  <MyComponent />
</Profiler>

function onRenderCallback(
  id, phase, actualDuration, baseDuration, startTime, commitTime
) {
  console.log(`${id} took ${actualDuration}ms`);
}
```

**Flipper:**
- React DevTools 플러그인
- Performance 모니터
- Network 인스펙터

**Performance Monitor:**
```jsx
import { PerformanceObserver } from 'react-native';
```

---

## 7. 메모리 누수 방지 방법은?

**답변:**

**이벤트 리스너 정리:**
```jsx
useEffect(() => {
  const subscription = eventEmitter.addListener('event', handler);
  
  return () => {
    subscription.remove();
  };
}, []);
```

**타이머 정리:**
```jsx
useEffect(() => {
  const timer = setTimeout(() => {
    // ...
  }, 1000);
  
  return () => clearTimeout(timer);
}, []);
```

**비동기 작업 취소:**
```jsx
useEffect(() => {
  let isMounted = true;
  
  fetchData().then(data => {
    if (isMounted) {
      setData(data);
    }
  });
  
  return () => {
    isMounted = false;
  };
}, []);
```

---

## 8. 네이티브 모듈 최적화는?

**답변:**

**Turbo Modules 사용:**
```typescript
import { TurboModuleRegistry } from 'react-native';

interface Spec extends TurboModule {
  getString(id: string): Promise<string>;
}

export default TurboModuleRegistry.get<Spec>('MyModule');
```

**배치 처리:**
```jsx
// 여러 호출을 하나로 묶기
NativeModules.MyModule.batchUpdate([
  { type: 'update', data: data1 },
  { type: 'update', data: data2 },
]);
```

---

## 9. 앱 시작 시간 최적화는?

**답변:**

**Lazy Loading:**
```jsx
const HomeScreen = React.lazy(() => import('./screens/Home'));
const ProfileScreen = React.lazy(() => import('./screens/Profile'));
```

**Inline Requires:**
```javascript
// metro.config.js
module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        inlineRequires: true,
      },
    }),
  },
};
```

**스플래시 스크린 최적화:**
```bash
npm install react-native-splash-screen
```

---

## 10. 성능 모니터링 도구는?

**답변:**

**도구 목록:**
- **Flipper**: 디버깅 및 성능 분석
- **React DevTools**: 컴포넌트 프로파일링
- **Reactotron**: 상태 및 API 모니터링
- **Firebase Performance**: 프로덕션 모니터링
- **Sentry**: 에러 추적 및 성능

**Firebase Performance 설정:**
```jsx
import perf from '@react-native-firebase/perf';

const trace = await perf().startTrace('custom_trace');
// 작업 수행
await trace.stop();
```
