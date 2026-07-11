# 컴포넌트, Props, State

컴포넌트는 UI의 구성 요소입니다. Props는 부모에서 자식으로 전달되는 읽기 전용 데이터입니다. State는 재렌더링을 트리거하는 로컬의 변경 가능한 데이터입니다. 훅(`useState`, `useEffect`)을 사용하는 함수형 컴포넌트가 현대적인 표준입니다.

```tsx
import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';

type GreetingProps = { name: string };

const Greeting: React.FC<GreetingProps> = ({ name }) => {
  const [count, setCount] = useState(0);

  return (
    <View>
      <Text>Hello, {name}!</Text>
      <Text>클릭 횟수: {count}번</Text>
      <Button title="클릭하세요" onPress={() => setCount(count + 1)} />
    </View>
  );
};
```
*이것은 props(`name`), state(`count`), 그리고 함수형 컴포넌트를 보여줍니다.*
