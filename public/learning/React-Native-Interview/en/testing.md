# Testing

## 1. Jest Basics?

```jsx
// sum.test.js
import { sum } from './sum';

describe('sum function', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
  });
});
```

**Matchers:**
```jsx
expect(value).toBe(expected);
expect(value).toEqual(expected);
expect(value).toBeTruthy();
expect(array).toContain(item);
expect(fn).toThrow();
```

---

## 2. React Native Testing Library?

```jsx
import { render, fireEvent } from '@testing-library/react-native';

test('increments count', () => {
  const { getByTestId } = render(<Counter />);
  
  const countText = getByTestId('count');
  const incrementButton = getByTestId('increment');
  
  expect(countText.props.children).toBe(0);
  fireEvent.press(incrementButton);
  expect(countText.props.children).toBe(1);
});
```

---

## 3. Async Testing?

```jsx
import { render, waitFor } from '@testing-library/react-native';

test('loads and displays user', async () => {
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: async () => ({ name: 'John Doe' }),
  });
  
  const { getByTestId } = render(<UserProfile userId="1" />);
  
  await waitFor(() => {
    expect(getByTestId('username').props.children).toBe('John Doe');
  });
});
```

---

## 4. Mocking?

**Function Mock:**
```jsx
const mockFn = jest.fn();
mockFn.mockReturnValue(42);
expect(mockFn).toHaveBeenCalled();
```

**Module Mock:**
```jsx
jest.mock('@react-native-async-storage/async-storage');
```

---

## 5. Snapshot Testing?

```jsx
import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(<MyComponent />).toJSON();
  expect(tree).toMatchSnapshot();
});
```

---

## 6. E2E Testing (Detox)?

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

## 7. Coverage?

```json
{
  "scripts": {
    "test:coverage": "jest --coverage"
  },
  "jest": {
    "collectCoverageFrom": ["src/**/*.{js,jsx}"],
    "coverageThreshold": {
      "global": {
        "branches": 80,
        "functions": 80,
        "lines": 80
      }
    }
  }
}
```

---

## 8. Testing Hooks?

```jsx
import { renderHook, act } from '@testing-library/react-hooks';

test('should increment counter', () => {
  const { result } = renderHook(() => useCounter());
  
  expect(result.current.count).toBe(0);
  act(() => result.current.increment());
  expect(result.current.count).toBe(1);
});
```

---

## 9. Navigation Testing?

```jsx
test('navigates to details screen', async () => {
  const { getByTestId } = render(<TestNavigator />);
  
  fireEvent.press(getByTestId('details-button'));
  
  await waitFor(() => {
    expect(getByText('Details Screen')).toBeTruthy();
  });
});
```

---

## 10. Best Practices?

**AAA Pattern:**
```jsx
test('example', () => {
  // Arrange
  const { getByTestId } = render(<Component />);
  
  // Act
  fireEvent.press(getByTestId('button'));
  
  // Assert
  expect(getByTestId('result')).toBeTruthy();
});
```

**Use testID:**
```jsx
<Button testID="submit-button" title="Submit" />
```

**Meaningful names:**
```jsx
test('should display error when email is invalid', () => {});
```
