# 네트워킹과 데이터 페칭

HTTP 요청에는 `fetch` 또는 `axios`를 사용하세요. 로딩 및 에러 상태를 관리하세요. 캐싱 및 백그라운드 업데이트에는 React Query 또는 SWR을 사용하세요.

```tsx
import React, { useEffect, useState } from 'react';
import { Text, ActivityIndicator } from 'react-native';

export default function User() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users/1')
      .then(res => res.json())
      .then(setUser)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <ActivityIndicator />;
  return <Text>{user.name}</Text>;
}
```
*이것은 데이터를 가져오고 로딩 상태를 처리합니다.*
