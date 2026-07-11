# Components

## 1. Functional vs Class Components?

**Functional Component (Recommended):**
```jsx
const MyComponent = ({ title }) => {
  const [count, setCount] = useState(0);
  return <View><Text>{title}: {count}</Text></View>;
};
```

**Class Component:**
```jsx
class MyComponent extends Component {
  state = { count: 0 };
  render() {
    return <View><Text>{this.props.title}: {this.state.count}</Text></View>;
  }
}
```

---

## 2. Props vs State?

| Aspect | Props | State |
|--------|-------|-------|
| Definition | Data from parent | Internal data |
| Mutability | Read-only | Mutable via setState |
| Ownership | Parent component | Current component |
| Purpose | Data passing | Dynamic data management |

---

## 3. useState Hook?

```jsx
const Counter = () => {
  const [count, setCount] = useState(0);
  return (
    <View>
      <Text>{count}</Text>
      <Button title="+" onPress={() => setCount(count + 1)} />
    </View>
  );
};
```

---

## 4. useEffect Hook?

```jsx
useEffect(() => {
  console.log('Component mounted or updated');
  return () => console.log('Cleanup');
}, [dependencies]);
```

---

## 5. useContext Hook?

```jsx
const ThemeContext = createContext('light');

const App = () => (
  <ThemeContext.Provider value="dark">
    <Child />
  </ThemeContext.Provider>
);

const Child = () => {
  const theme = useContext(ThemeContext);
  return <Text>Theme: {theme}</Text>;
};
```

---

## 6. useMemo vs useCallback?

**useMemo**: Memoizes values
```jsx
const expensiveValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

**useCallback**: Memoizes functions
```jsx
const handlePress = useCallback(() => doSomething(a, b), [a, b]);
```

---

## 7. React.memo?

```jsx
const MyComponent = React.memo(({ name, age }) => (
  <Text>{name} - {age}</Text>
));
```

---

## 8. useRef Hook?

```jsx
const inputRef = useRef(null);
const focusInput = () => inputRef.current?.focus();
return <TextInput ref={inputRef} />;
```

---

## 9. Custom Hooks?

```jsx
export const useToggle = (initialValue = false) => {
  const [value, setValue] = useState(initialValue);
  const toggle = () => setValue(v => !v);
  return [value, toggle];
};
```

---

## 10. Higher-Order Components (HOC)?

```jsx
const withLoading = (Component) => {
  return ({ isLoading, ...props }) => {
    if (isLoading) return <ActivityIndicator />;
    return <Component {...props} />;
  };
};
```
