# Networking and Data Fetching

Use `fetch` or `axios` for HTTP requests. Manage loading and error states. Use React Query or SWR for caching and background updates.

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
*This fetches data and handles loading state.*
