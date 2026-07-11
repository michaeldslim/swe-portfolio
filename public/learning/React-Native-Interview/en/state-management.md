# State Management

## 1. Context API?

```jsx
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
```

---

## 2. Redux Setup?

```bash
npm install @reduxjs/toolkit react-redux
```

```jsx
// store.js
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: { counter: counterReducer },
});

// counterSlice.js
const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => { state.value += 1; },
  },
});

// Component
const count = useSelector((state) => state.counter.value);
const dispatch = useDispatch();
dispatch(increment());
```

---

## 3. Redux Thunk vs Saga?

**Thunk:**
```jsx
export const fetchUser = (userId) => async (dispatch) => {
  const response = await fetch(`/api/users/${userId}`);
  const data = await response.json();
  dispatch({ type: 'FETCH_USER_SUCCESS', payload: data });
};
```

**Saga:**
```jsx
function* fetchUserSaga(action) {
  const user = yield call(api.fetchUser, action.payload);
  yield put({ type: 'FETCH_USER_SUCCESS', user });
}
```

---

## 4. Zustand?

```jsx
import create from 'zustand';

const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));

const { count, increment } = useStore();
```

---

## 5. Recoil?

```jsx
import { atom, useRecoilState } from 'recoil';

const countState = atom({
  key: 'countState',
  default: 0,
});

const [count, setCount] = useRecoilState(countState);
```

---

## 6. MobX?

```jsx
import { makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react-lite';

class CounterStore {
  count = 0;
  constructor() { makeAutoObservable(this); }
  increment() { this.count++; }
}

const Counter = observer(() => (
  <Text>{counterStore.count}</Text>
));
```

---

## 7. AsyncStorage?

```jsx
import AsyncStorage from '@react-native-async-storage/async-storage';

// Save
await AsyncStorage.setItem('@key', 'value');

// Read
const value = await AsyncStorage.getItem('@key');

// Remove
await AsyncStorage.removeItem('@key');
```

---

## 8. Redux Persist?

```jsx
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({ reducer: persistedReducer });
export const persistor = persistStore(store);
```

---

## 9. State Management Selection?

| Library | Best For |
|---------|----------|
| Context API | Small apps, simple state |
| Redux | Large apps, complex state |
| Zustand | Medium apps, simple API |
| Recoil | Atomic state management |
| MobX | OOP, automatic reactivity |

---

## 10. Global vs Local State?

**Global State:**
- Shared across components
- User authentication
- App settings
- Cached data

**Local State:**
- Single component use
- Form inputs
- UI toggle states
- Temporary data
