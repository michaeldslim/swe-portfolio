# 컴포넌트

## 1. Functional Component와 Class Component의 차이는?

**답변:**

**Functional Component (권장):**
```jsx
import React, { useState } from 'react';
import { View, Text } from 'react-native';

const MyComponent = ({ title }) => {
  const [count, setCount] = useState(0);
  
  return (
    <View>
      <Text>{title}: {count}</Text>
    </View>
  );
};
```

**Class Component:**
```jsx
import React, { Component } from 'react';
import { View, Text } from 'react-native';

class MyComponent extends Component {
  state = { count: 0 };
  
  render() {
    return (
      <View>
        <Text>{this.props.title}: {this.state.count}</Text>
      </View>
    );
  }
}
```

**차이점:**
- Functional: Hooks 사용, 간결, 최신 권장 방식
- Class: Lifecycle 메서드, this 바인딩 필요

---

## 2. Props와 State의 차이는?

**답변:**

| 구분 | Props | State |
|------|-------|-------|
| 정의 | 부모로부터 받는 데이터 | 컴포넌트 내부 데이터 |
| 변경 | 읽기 전용 (불변) | setState로 변경 가능 |
| 소유 | 부모 컴포넌트 | 해당 컴포넌트 |
| 용도 | 데이터 전달 | 동적 데이터 관리 |

**예시:**
```jsx
// Props
const Child = ({ name }) => <Text>{name}</Text>;
<Child name="John" />

// State
const Parent = () => {
  const [name, setName] = useState('John');
  return <Child name={name} />;
};
```

---

## 3. useState Hook을 설명하세요.

**답변:**
`useState`는 함수형 컴포넌트에서 상태를 관리하는 Hook입니다.

```jsx
import { useState } from 'react';

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

**특징:**
- 초기값 설정 가능
- 상태 업데이트 함수 제공
- 여러 번 사용 가능
- 이전 상태 기반 업데이트 가능

```jsx
// 이전 상태 기반 업데이트
setCount(prevCount => prevCount + 1);
```

---

## 4. useEffect Hook의 용도는?

**답변:**
`useEffect`는 사이드 이펙트를 처리하는 Hook입니다.

**기본 사용:**
```jsx
import { useEffect } from 'react';

useEffect(() => {
  // 실행할 코드
  console.log('Component mounted or updated');
  
  // Cleanup 함수
  return () => {
    console.log('Component will unmount');
  };
}, [dependencies]);
```

**의존성 배열:**
```jsx
// 마운트 시 한 번만
useEffect(() => {}, []);

// 특정 값 변경 시
useEffect(() => {}, [count]);

// 매 렌더링마다
useEffect(() => {});
```

**사용 예시:**
- API 호출
- 구독 설정/해제
- 타이머 설정
- DOM 조작

---

## 5. useContext Hook은 언제 사용하나요?

**답변:**
`useContext`는 전역 상태를 공유할 때 사용합니다.

```jsx
import { createContext, useContext } from 'react';

// Context 생성
const ThemeContext = createContext('light');

// Provider
const App = () => (
  <ThemeContext.Provider value="dark">
    <Child />
  </ThemeContext.Provider>
);

// Consumer
const Child = () => {
  const theme = useContext(ThemeContext);
  return <Text>Theme: {theme}</Text>;
};
```

**장점:**
- Props drilling 방지
- 전역 상태 관리
- 간단한 상태 공유

---

## 6. useMemo와 useCallback의 차이는?

**답변:**

**useMemo**: 값을 메모이제이션
```jsx
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(a, b);
}, [a, b]);
```

**useCallback**: 함수를 메모이제이션
```jsx
const handlePress = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

**사용 시기:**
- 비용이 큰 계산
- 자식 컴포넌트에 props로 전달되는 함수
- 의존성 배열의 값이 자주 변하지 않을 때

---

## 7. React.memo는 무엇인가요?

**답변:**
`React.memo`는 컴포넌트를 메모이제이션하여 불필요한 리렌더링을 방지합니다.

```jsx
const MyComponent = React.memo(({ name, age }) => {
  console.log('Rendering...');
  return <Text>{name} - {age}</Text>;
});

// 커스텀 비교 함수
const MyComponent = React.memo(
  ({ name, age }) => <Text>{name} - {age}</Text>,
  (prevProps, nextProps) => {
    return prevProps.name === nextProps.name;
  }
);
```

**사용 시기:**
- Props가 자주 변하지 않는 컴포넌트
- 렌더링 비용이 큰 컴포넌트
- 리스트 아이템

---

## 8. useRef Hook의 용도는?

**답변:**
`useRef`는 변경 가능한 참조 객체를 생성합니다.

**DOM 참조:**
```jsx
const inputRef = useRef(null);

const focusInput = () => {
  inputRef.current?.focus();
};

return <TextInput ref={inputRef} />;
```

**값 저장 (리렌더링 없이):**
```jsx
const countRef = useRef(0);

const increment = () => {
  countRef.current += 1;
  // 리렌더링 발생하지 않음
};
```

**이전 값 저장:**
```jsx
const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};
```

---

## 9. Custom Hook을 만드는 방법은?

**답변:**
Custom Hook은 로직을 재사용하기 위한 함수입니다.

```jsx
// useToggle.js
import { useState } from 'react';

export const useToggle = (initialValue = false) => {
  const [value, setValue] = useState(initialValue);
  
  const toggle = () => setValue(v => !v);
  
  return [value, toggle];
};

// 사용
const MyComponent = () => {
  const [isVisible, toggleVisible] = useToggle(false);
  
  return (
    <View>
      <Button title="Toggle" onPress={toggleVisible} />
      {isVisible && <Text>Visible!</Text>}
    </View>
  );
};
```

**규칙:**
- 이름은 "use"로 시작
- 다른 Hook 호출 가능
- 조건부로 Hook 호출 금지

---

## 10. Higher-Order Component (HOC)란?

**답변:**
HOC는 컴포넌트를 받아 새로운 컴포넌트를 반환하는 함수입니다.

```jsx
// HOC 정의
const withLoading = (Component) => {
  return ({ isLoading, ...props }) => {
    if (isLoading) {
      return <ActivityIndicator />;
    }
    return <Component {...props} />;
  };
};

// 사용
const UserList = ({ users }) => (
  <FlatList data={users} renderItem={...} />
);

const UserListWithLoading = withLoading(UserList);

// 렌더링
<UserListWithLoading isLoading={loading} users={data} />
```

**장점:**
- 로직 재사용
- Props 조작
- 조건부 렌더링

**단점:**
- Props drilling
- Wrapper hell
- Hooks가 더 선호됨
