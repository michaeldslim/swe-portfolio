# React와 React Native: 핵심 개념

React와 React Native는 기본적인 개념을 공유하지만, 대상 플랫폼에 따라 다르게 구현합니다. 이 문서에서는 이러한 핵심 개념과 구현 세부 사항을 살펴봅니다.

## 컴포넌트 아키텍처

### React

React에서 컴포넌트는 사용자 인터페이스의 기본 구성 요소입니다. 클래스 컴포넌트 또는 함수형 컴포넌트로 작성할 수 있습니다.

```jsx
// React의 함수형 컴포넌트
function Greeting({ name }) {
  return <h1>안녕하세요, {name}님!</h1>;
}

// React의 클래스 컴포넌트
class GreetingClass extends React.Component {
  render() {
    return <h1>안녕하세요, {this.props.name}님!</h1>;
  }
}
```

### React Native

React Native 역시 컴포넌트를 기본 구성 요소로 사용하지만, HTML 요소 대신 네이티브 UI 컴포넌트로 렌더링합니다.

```jsx
// React Native의 함수형 컴포넌트
import { Text, View } from 'react-native';

function Greeting({ name }) {
  return (
    <View>
      <Text>안녕하세요, {name}님!</Text>
    </View>
  );
}

// React Native의 클래스 컴포넌트
class GreetingClass extends React.Component {
  render() {
    return (
      <View>
        <Text>안녕하세요, {this.props.name}님!</Text>
      </View>
    );
  }
}
```

## JSX

React와 React Native 모두 JSX(JavaScript XML)를 사용하여 JavaScript와 HTML과 유사한 구문을 혼합할 수 있습니다.

### React

```jsx
const element = (
  <div className="container">
    <h1>내 웹 앱</h1>
    <p>내 앱에 오신 것을 환영합니다!</p>
  </div>
);
```

### React Native

```jsx
import { View, Text, StyleSheet } from 'react-native';

const element = (
  <View style={styles.container}>
    <Text style={styles.heading}>내 모바일 앱</Text>
    <Text>내 앱에 오신 것을 환영합니다!</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
```

## 가상 DOM vs 네이티브 컴포넌트

### React

React는 실제 DOM의 메모리 내 표현인 가상 DOM을 사용합니다. 상태가 변경되면 React는:

1. 새로운 가상 DOM 표현을 생성
2. 이전 가상 DOM과 비교(차이점 찾기)
3. 실제 DOM에서 필요한 부분만 업데이트(재조정)

이 접근 방식은 직접적인 DOM 조작을 최소화하고 성능을 향상시킵니다.

### React Native

React Native는 유사한 개념을 다른 방식으로 구현합니다:

1. JavaScript 코드는 별도의 스레드에서 실행
2. React Native는 네이티브 UI 컴포넌트의 가상 표현을 생성
3. 변경사항이 일괄 처리되어 "브릿지"를 통해 네이티브 측으로 전송
4. 네이티브 모듈이 실제 UI 컴포넌트를 업데이트

이 접근 방식을 통해 JavaScript가 네이티브 UI 컴포넌트를 직접 조작하지 않고도 제어할 수 있습니다 [[1]](https://radixweb.com/blog/react-vs-react-native).

## 상태 관리

React와 React Native 모두 동일한 상태 관리 접근 방식을 사용합니다:

### 로컬 상태

```jsx
// React와 React Native 모두에서 useState 훅 사용
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    // JSX는 React와 React Native 사이에서 다르지만
    // 상태 관리 개념은 동일합니다
  );
}
```

### Context API

두 플랫폼 모두 컴포넌트 트리 전체에서 상태를 공유하기 위한 Context API를 지원합니다.

### 외부 상태 관리

두 플랫폼 모두 Redux, MobX, Zustand 등과 같은 외부 상태 관리 라이브러리를 지원합니다.

## 생명주기와 훅

React와 React Native 모두 동일한 컴포넌트 생명주기를 따르고 훅을 지원합니다:

```jsx
// 훅은 React와 React Native 모두에서 동일하게 작동합니다
import React, { useState, useEffect, useContext, useReducer, useCallback, useMemo, useRef } from 'react';

function MyComponent() {
  // useState
  const [data, setData] = useState(null);

  // useEffect
  useEffect(() => {
    // 첫 번째 렌더링 후와 의존성 변경 시 실행
    fetchData();

    return () => {
      // 정리 함수
    };
  }, [/* 의존성 */]);

  // ... 다른 훅
}
```

## 데이터 흐름

React와 React Native 모두 단방향 데이터 흐름 패턴을 따릅니다:

1. 데이터는 props를 통해 부모에서 자식 컴포넌트로 흐릅니다
2. 이벤트는 콜백을 통해 자식에서 부모 컴포넌트로 흐릅니다

이는 애플리케이션을 더 예측 가능하고 디버깅하기 쉽게 만듭니다.

## 참조

- [[1]](https://radixweb.com/blog/react-vs-react-native) - React vs React Native - Key Difference, Features, Advantages
- [[2]](https://www.lambdatest.com/blog/react-vs-react-native/) - React Native vs ReactJS: Know The Differences
