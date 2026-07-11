# Performance Optimization

Optimize rendering with `React.memo`, `useMemo`, and `useCallback`. Use `FlatList` for large lists to avoid rendering everything at once. Use the native driver for animations.

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
*This uses memoization and FlatList for performance.*
