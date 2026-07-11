# 상태 관리

## 1. Context API 사용법은?

**답변:**
```jsx
import React, { createContext, useContext, useState } from 'react';

// Context 생성
const UserContext = createContext();

// Provider 컴포넌트
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  
  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);
  
  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom Hook
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
};

// 사용
const App = () => (
  <UserProvider>
    <MyComponent />
  </UserProvider>
);

const MyComponent = () => {
  const { user, login, logout } = useUser();
  return <Text>{user?.name}</Text>;
};
```

---

## 2. Redux 설정 및 사용법은?

**답변:**

**설치:**
```bash
npm install @reduxjs/toolkit react-redux
```

**Store 설정:**
```jsx
// store.js
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
```

**Slice 생성:**
```jsx
// counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;
```

**Provider 설정:**
```jsx
import { Provider } from 'react-redux';
import { store } from './store';

const App = () => (
  <Provider store={store}>
    <MyComponent />
  </Provider>
);
```

**컴포넌트에서 사용:**
```jsx
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from './counterSlice';

const Counter = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  
  return (
    <View>
      <Text>{count}</Text>
      <Button title="+" onPress={() => dispatch(increment())} />
      <Button title="-" onPress={() => dispatch(decrement())} />
    </View>
  );
};
```

---

## 3. Redux Thunk vs Redux Saga 차이는?

**답변:**

**Redux Thunk (간단한 비동기):**
```jsx
// Thunk 액션
export const fetchUser = (userId) => async (dispatch) => {
  dispatch({ type: 'FETCH_USER_REQUEST' });
  try {
    const response = await fetch(`/api/users/${userId}`);
    const data = await response.json();
    dispatch({ type: 'FETCH_USER_SUCCESS', payload: data });
  } catch (error) {
    dispatch({ type: 'FETCH_USER_FAILURE', error });
  }
};
```

**Redux Saga (복잡한 비동기):**
```jsx
import { call, put, takeLatest } from 'redux-saga/effects';

function* fetchUserSaga(action) {
  try {
    const user = yield call(api.fetchUser, action.payload);
    yield put({ type: 'FETCH_USER_SUCCESS', user });
  } catch (error) {
    yield put({ type: 'FETCH_USER_FAILURE', error });
  }
}

function* watchFetchUser() {
  yield takeLatest('FETCH_USER_REQUEST', fetchUserSaga);
}
```

**비교:**
| 구분 | Thunk | Saga |
|------|-------|------|
| 복잡도 | 간단 | 복잡 |
| 학습 곡선 | 낮음 | 높음 |
| 테스트 | 어려움 | 쉬움 |
| 기능 | 기본적 | 강력함 |

---

## 4. Zustand 사용법은?

**답변:**

**설치:**
```bash
npm install zustand
```

**Store 생성:**
```jsx
import create from 'zustand';

const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}));
```

**사용:**
```jsx
const Counter = () => {
  const { count, increment, decrement } = useStore();
  
  return (
    <View>
      <Text>{count}</Text>
      <Button title="+" onPress={increment} />
      <Button title="-" onPress={decrement} />
    </View>
  );
};
```

**장점:**
- 간단한 API
- Boilerplate 최소화
- TypeScript 지원 우수
- 작은 번들 크기

---

## 5. Recoil 사용법은?

**답변:**

**설치:**
```bash
npm install recoil
```

**Atom 정의:**
```jsx
import { atom } from 'recoil';

export const countState = atom({
  key: 'countState',
  default: 0,
});
```

**Provider 설정:**
```jsx
import { RecoilRoot } from 'recoil';

const App = () => (
  <RecoilRoot>
    <Counter />
  </RecoilRoot>
);
```

**사용:**
```jsx
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

const Counter = () => {
  const [count, setCount] = useRecoilState(countState);
  
  return (
    <View>
      <Text>{count}</Text>
      <Button title="+" onPress={() => setCount(count + 1)} />
    </View>
  );
};
```

**Selector (파생 상태):**
```jsx
import { selector } from 'recoil';

const doubleCountState = selector({
  key: 'doubleCountState',
  get: ({ get }) => {
    const count = get(countState);
    return count * 2;
  },
});
```

---

## 6. MobX 사용법은?

**답변:**

**설치:**
```bash
npm install mobx mobx-react-lite
```

**Store 생성:**
```jsx
import { makeAutoObservable } from 'mobx';

class CounterStore {
  count = 0;
  
  constructor() {
    makeAutoObservable(this);
  }
  
  increment() {
    this.count++;
  }
  
  decrement() {
    this.count--;
  }
}

export const counterStore = new CounterStore();
```

**사용:**
```jsx
import { observer } from 'mobx-react-lite';

const Counter = observer(() => {
  return (
    <View>
      <Text>{counterStore.count}</Text>
      <Button title="+" onPress={() => counterStore.increment()} />
    </View>
  );
});
```

---

## 7. AsyncStorage 사용법은?

**답변:**

**설치:**
```bash
npm install @react-native-async-storage/async-storage
```

**기본 사용:**
```jsx
import AsyncStorage from '@react-native-async-storage/async-storage';

// 저장
const storeData = async (value) => {
  try {
    await AsyncStorage.setItem('@storage_key', value);
  } catch (e) {
    console.error(e);
  }
};

// 읽기
const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('@storage_key');
    if (value !== null) {
      return value;
    }
  } catch (e) {
    console.error(e);
  }
};

// 객체 저장
const storeObject = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('@storage_key', jsonValue);
  } catch (e) {
    console.error(e);
  }
};

// 삭제
const removeValue = async () => {
  try {
    await AsyncStorage.removeItem('@storage_key');
  } catch (e) {
    console.error(e);
  }
};
```

---

## 8. Redux Persist 사용법은?

**답변:**

**설치:**
```bash
npm install redux-persist
```

**설정:**
```jsx
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user', 'settings'], // 저장할 reducer
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export const persistor = persistStore(store);
```

**Provider:**
```jsx
import { PersistGate } from 'redux-persist/integration/react';

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <MyComponent />
    </PersistGate>
  </Provider>
);
```

---

## 9. 상태 관리 라이브러리 선택 기준은?

**답변:**

| 라이브러리 | 적합한 경우 |
|-----------|------------|
| **Context API** | 작은 앱, 간단한 상태 |
| **Redux** | 대규모 앱, 복잡한 상태, 시간 여행 디버깅 |
| **Zustand** | 중소규모, 간단한 API 선호 |
| **Recoil** | 원자적 상태 관리, React 친화적 |
| **MobX** | 객체 지향, 자동 반응성 선호 |

**고려사항:**
- 팀 경험
- 프로젝트 규모
- 성능 요구사항
- 학습 곡선
- 커뮤니티 지원

---

## 10. 전역 상태 vs 로컬 상태 구분 기준은?

**답변:**

**전역 상태로 관리:**
- 여러 컴포넌트에서 공유
- 사용자 인증 정보
- 앱 설정
- 캐시된 데이터
- UI 테마

**로컬 상태로 관리:**
- 단일 컴포넌트에서만 사용
- 폼 입력 값
- UI 토글 상태
- 임시 데이터

**예시:**
```jsx
// 전역 상태
const useAuthStore = create((set) => ({
  user: null,
  login: (user) => set({ user }),
}));

// 로컬 상태
const FormComponent = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  // ...
};
```
