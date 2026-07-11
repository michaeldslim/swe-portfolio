# 테스팅

## 1. Jest 기본 사용법은?

**답변:**
```jsx
// sum.js
export const sum = (a, b) => a + b;

// sum.test.js
import { sum } from './sum';

describe('sum function', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
  });
  
  test('adds negative numbers', () => {
    expect(sum(-1, -2)).toBe(-3);
  });
});
```

**주요 Matchers:**
```jsx
expect(value).toBe(expected);
expect(value).toEqual(expected);
expect(value).toBeTruthy();
expect(value).toBeFalsy();
expect(array).toContain(item);
expect(fn).toThrow();
```

---

## 2. React Native Testing Library 사용법은?

**답변:**

**설치:**
```bash
npm install --save-dev @testing-library/react-native
```

**컴포넌트 테스트:**
```jsx
import { render, fireEvent } from '@testing-library/react-native';

const Counter = () => {
  const [count, setCount] = useState(0);
  
  return (
    <View>
      <Text testID="count">{count}</Text>
      <Button testID="increment" title="+" onPress={() => setCount(c => c + 1)} />
    </View>
  );
};

describe('Counter', () => {
  test('increments count', () => {
    const { getByTestId } = render(<Counter />);
    
    const countText = getByTestId('count');
    const incrementButton = getByTestId('increment');
    
    expect(countText.props.children).toBe(0);
    
    fireEvent.press(incrementButton);
    
    expect(countText.props.children).toBe(1);
  });
});
```

---

## 3. 비동기 테스트 방법은?

**답변:**

```jsx
import { render, waitFor } from '@testing-library/react-native';

const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]);
  
  if (!user) return <Text>Loading...</Text>;
  
  return <Text testID="username">{user.name}</Text>;
};

describe('UserProfile', () => {
  test('loads and displays user', async () => {
    const mockUser = { name: 'John Doe' };
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => mockUser,
    });
    
    const { getByText, getByTestId } = render(<UserProfile userId="1" />);
    
    expect(getByText('Loading...')).toBeTruthy();
    
    await waitFor(() => {
      expect(getByTestId('username').props.children).toBe('John Doe');
    });
  });
});
```

---

## 4. Mock 사용법은?

**답변:**

**함수 Mock:**
```jsx
const mockFn = jest.fn();
mockFn.mockReturnValue(42);
mockFn.mockResolvedValue('async result');

expect(mockFn).toHaveBeenCalled();
expect(mockFn).toHaveBeenCalledWith(arg1, arg2);
expect(mockFn).toHaveBeenCalledTimes(2);
```

**모듈 Mock:**
```jsx
// __mocks__/AsyncStorage.js
export default {
  setItem: jest.fn(() => Promise.resolve()),
  getItem: jest.fn(() => Promise.resolve(null)),
  removeItem: jest.fn(() => Promise.resolve()),
};

// test.js
jest.mock('@react-native-async-storage/async-storage');
```

**네이티브 모듈 Mock:**
```jsx
jest.mock('react-native', () => ({
  Platform: {
    OS: 'ios',
    select: jest.fn((obj) => obj.ios),
  },
  NativeModules: {
    MyModule: {
      doSomething: jest.fn(),
    },
  },
}));
```

---

## 5. Snapshot 테스트는?

**답변:**

```jsx
import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(<MyComponent />).toJSON();
  expect(tree).toMatchSnapshot();
});
```

**스냅샷 업데이트:**
```bash
jest --updateSnapshot
```

**인라인 스냅샷:**
```jsx
test('renders correctly', () => {
  const tree = renderer.create(<MyComponent />).toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <View>
      <Text>Hello</Text>
    </View>
  `);
});
```

---

## 6. E2E 테스트 (Detox) 사용법은?

**답변:**

**설치:**
```bash
npm install --save-dev detox
detox init
```

**설정 (.detoxrc.json):**
```json
{
  "testRunner": "jest",
  "runnerConfig": "e2e/config.json",
  "apps": {
    "ios": {
      "type": "ios.app",
      "binaryPath": "ios/build/Build/Products/Debug-iphonesimulator/MyApp.app"
    }
  },
  "devices": {
    "simulator": {
      "type": "ios.simulator",
      "device": {
        "type": "iPhone 14"
      }
    }
  }
}
```

**테스트 작성:**
```jsx
describe('Login Flow', () => {
  beforeAll(async () => {
    await device.launchApp();
  });
  
  it('should login successfully', async () => {
    await element(by.id('email-input')).typeText('user@example.com');
    await element(by.id('password-input')).typeText('password123');
    await element(by.id('login-button')).tap();
    
    await expect(element(by.text('Welcome'))).toBeVisible();
  });
});
```

---

## 7. 커버리지 측정 방법은?

**답변:**

**package.json:**
```json
{
  "scripts": {
    "test": "jest",
    "test:coverage": "jest --coverage"
  },
  "jest": {
    "collectCoverageFrom": [
      "src/**/*.{js,jsx}",
      "!src/**/*.test.{js,jsx}",
      "!src/index.js"
    ],
    "coverageThreshold": {
      "global": {
        "branches": 80,
        "functions": 80,
        "lines": 80,
        "statements": 80
      }
    }
  }
}
```

**실행:**
```bash
npm run test:coverage
```

---

## 8. React Hook 테스트 방법은?

**답변:**

**설치:**
```bash
npm install --save-dev @testing-library/react-hooks
```

**테스트:**
```jsx
import { renderHook, act } from '@testing-library/react-hooks';

const useCounter = () => {
  const [count, setCount] = useState(0);
  const increment = () => setCount(c => c + 1);
  return { count, increment };
};

test('should increment counter', () => {
  const { result } = renderHook(() => useCounter());
  
  expect(result.current.count).toBe(0);
  
  act(() => {
    result.current.increment();
  });
  
  expect(result.current.count).toBe(1);
});
```

---

## 9. Navigation 테스트 방법은?

**답변:**

```jsx
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const TestNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

test('navigates to details screen', async () => {
  const { getByText, getByTestId } = render(<TestNavigator />);
  
  const button = getByTestId('details-button');
  fireEvent.press(button);
  
  await waitFor(() => {
    expect(getByText('Details Screen')).toBeTruthy();
  });
});
```

---

## 10. 테스트 모범 사례는?

**답변:**

**1. AAA 패턴:**
```jsx
test('example', () => {
  // Arrange (준비)
  const { getByTestId } = render(<Component />);
  
  // Act (실행)
  fireEvent.press(getByTestId('button'));
  
  // Assert (검증)
  expect(getByTestId('result')).toBeTruthy();
});
```

**2. testID 사용:**
```jsx
<Button testID="submit-button" title="Submit" />
```

**3. 의미 있는 테스트 이름:**
```jsx
test('should display error message when email is invalid', () => {
  // ...
});
```

**4. 독립적인 테스트:**
```jsx
beforeEach(() => {
  // 각 테스트 전 초기화
});

afterEach(() => {
  // 각 테스트 후 정리
  jest.clearAllMocks();
});
```

**5. 실제 사용자 행동 테스트:**
```jsx
// ❌ 구현 세부사항 테스트
expect(component.state.count).toBe(1);

// ✅ 사용자 관점 테스트
expect(getByText('Count: 1')).toBeTruthy();
```
