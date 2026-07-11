# 성능 최적화

`React.memo`, `useMemo`, `useCallback`로 렌더링을 최적화하세요. 큰 리스트의 경우 `FlatList`를 사용하여 모든 것을 한 번에 렌더링하지 않도록 하세요. 애니메이션에는 네이티브 드라이버를 사용하세요.

```tsx
import React, { useCallback } from 'react';
import { FlatList, Text, TouchableOpacity } from 'react-native';

const Item = React.memo(({ value, onPress }: { value: string, onPress: () => void }) => (
  <TouchableOpacity onPress={onPress}>
    <Text>{value}</Text>
  </TouchableOpacity>
));

export default function MyList({ data }: { data: string[] }) {
  const renderItem = useCallback(
    ({ item }) => <Item value={item} onPress={() => {}} />, []
  );
  return <FlatList data={data} renderItem={renderItem} keyExtractor={item => item} />;
}
```
*이것은 성능을 위해 메모이제이션과 FlatList를 사용합니다.*
