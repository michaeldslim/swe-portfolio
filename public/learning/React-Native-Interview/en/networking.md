# Networking

## 1. Fetch API?

```jsx
import { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

// Using in component
const UserList = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.example.com/users');
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const json = await response.json();
        setData(json);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []); // Empty array: runs once on mount
  
  if (loading) return <ActivityIndicator />;
  if (error) return <Text>Error: {error}</Text>;
  
  return (
    <View>
      {data?.map(user => <Text key={user.id}>{user.name}</Text>)}
    </View>
  );
};

// POST request
const CreateUser = () => {
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (userData) => {
    setLoading(true);
    try {
      const response = await fetch('https://api.example.com/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      
      const result = await response.json();
      console.log('Success:', result);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return <Button title="Create" onPress={() => handleSubmit({ name: 'John' })} />;
};
```

---

## 2. Axios?

```jsx
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 10000,
});

// Interceptors
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle logout
    }
    return Promise.reject(error);
  }
);
```

---

## 3. React Query?

```jsx
import { useQuery, useMutation } from '@tanstack/react-query';

const { data, isLoading, error } = useQuery({
  queryKey: ['user', userId],
  queryFn: () => fetchUser(userId),
});

const mutation = useMutation({
  mutationFn: updateUser,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['user'] });
  },
});
```

---

## 4. WebSocket?

```jsx
const useWebSocket = (url) => {
  const [messages, setMessages] = useState([]);
  
  useEffect(() => {
    const ws = new WebSocket(url);
    ws.onmessage = (event) => {
      setMessages(prev => [...prev, JSON.parse(event.data)]);
    };
    return () => ws.close();
  }, [url]);
  
  const sendMessage = (message) => {
    if (ws?.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(message));
    }
  };
  
  return { messages, sendMessage };
};
```

---

## 5. File Upload?

```jsx
const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', {
    uri: file.uri,
    type: file.type,
    name: file.name,
  });
  
  const response = await fetch('https://api.example.com/upload', {
    method: 'POST',
    body: formData,
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  
  return await response.json();
};
```

---

## 6. Error Handling?

```jsx
const fetchWithErrorHandling = async () => {
  try {
    const response = await fetch('https://api.example.com/data');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    if (error.message === 'Network request failed') {
      Alert.alert('Network Error', 'Please check your internet connection');
    } else {
      Alert.alert('Error', error.message);
    }
    throw error;
  }
};
```

---

## 7. Token Management?

```jsx
import AsyncStorage from '@react-native-async-storage/async-storage';

const saveToken = async (token) => {
  await AsyncStorage.setItem('authToken', token);
};

const getToken = async () => {
  return await AsyncStorage.getItem('authToken');
};

// Auto-refresh
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 && !error.config._retry) {
      error.config._retry = true;
      const refreshToken = await AsyncStorage.getItem('refreshToken');
      const response = await axios.post('/auth/refresh', { refreshToken });
      await saveToken(response.data.token);
      return axios(error.config);
    }
    return Promise.reject(error);
  }
);
```

---

## 8. Caching Strategy?

```jsx
const fetchWithCache = async (key, fetcher) => {
  const cached = await AsyncStorage.getItem(key);
  if (cached) {
    const { data, timestamp } = JSON.parse(cached);
    const isExpired = Date.now() - timestamp > 5 * 60 * 1000;
    if (!isExpired) return data;
  }
  
  const data = await fetcher();
  await AsyncStorage.setItem(key, JSON.stringify({ data, timestamp: Date.now() }));
  return data;
};
```

---

## 9. Network Status?

```jsx
import NetInfo from '@react-native-community/netinfo';

useEffect(() => {
  const unsubscribe = NetInfo.addEventListener(state => {
    console.log('Is connected?', state.isConnected);
    if (!state.isConnected) {
      Alert.alert('Offline', 'Please check your internet connection');
    }
  });
  return () => unsubscribe();
}, []);
```

---

## 10. GraphQL?

```jsx
import { ApolloClient, InMemoryCache, gql, useQuery } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://api.example.com/graphql',
  cache: new InMemoryCache(),
});

const GET_USERS = gql`
  query GetUsers {
    users { id name email }
  }
`;

const { loading, error, data } = useQuery(GET_USERS);
```
