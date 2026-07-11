# 네트워킹

## 1. Fetch API 사용법은?

**답변:**
```jsx
import { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

// 컴포넌트에서 사용
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
  }, []); // 빈 배열: 컴포넌트 마운트 시 한 번만 실행
  
  if (loading) return <ActivityIndicator />;
  if (error) return <Text>Error: {error}</Text>;
  
  return (
    <View>
      {data?.map(user => <Text key={user.id}>{user.name}</Text>)}
    </View>
  );
};

// POST 요청
const CreateUser = () => {
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (userData) => {
    setLoading(true);
    try {
      const response = await fetch('https://api.example.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
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

## 2. Axios 사용법은?

**답변:**

**설치:**
```bash
npm install axios
```

**기본 사용:**
```jsx
import axios from 'axios';

// GET 요청
const fetchData = async () => {
  try {
    const response = await axios.get('https://api.example.com/data');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// POST 요청
const postData = async (data) => {
  try {
    const response = await axios.post('https://api.example.com/data', data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
```

**인스턴스 생성:**
```jsx
const api = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 인터셉터
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // 로그아웃 처리
    }
    return Promise.reject(error);
  }
);
```

---

## 3. React Query 사용법은?

**답변:**

**설치:**
```bash
npm install @tanstack/react-query
```

**설정:**
```jsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <MyComponent />
  </QueryClientProvider>
);
```

**사용:**
```jsx
import { useQuery, useMutation } from '@tanstack/react-query';

// 데이터 조회
const UserProfile = ({ userId }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
  });
  
  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;
  
  return <Text>{data.name}</Text>;
};

// 데이터 변경
const UpdateProfile = () => {
  const mutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
  
  return (
    <Button
      title="Update"
      onPress={() => mutation.mutate({ name: 'John' })}
    />
  );
};
```

---

## 4. WebSocket 사용법은?

**답변:**

```jsx
import { useEffect, useState } from 'react';

const useWebSocket = (url) => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  
  useEffect(() => {
    const ws = new WebSocket(url);
    
    ws.onopen = () => {
      console.log('Connected');
    };
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages(prev => [...prev, data]);
    };
    
    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
    
    ws.onclose = () => {
      console.log('Disconnected');
    };
    
    setSocket(ws);
    
    return () => {
      ws.close();
    };
  }, [url]);
  
  const sendMessage = (message) => {
    if (socket?.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(message));
    }
  };
  
  return { messages, sendMessage };
};

// 사용
const ChatComponent = () => {
  const { messages, sendMessage } = useWebSocket('ws://example.com');
  
  return (
    <View>
      {messages.map((msg, i) => (
        <Text key={i}>{msg.text}</Text>
      ))}
      <Button title="Send" onPress={() => sendMessage({ text: 'Hello' })} />
    </View>
  );
};
```

---

## 5. 파일 업로드 방법은?

**답변:**

```jsx
import DocumentPicker from 'react-native-document-picker';

const uploadFile = async () => {
  try {
    // 파일 선택
    const result = await DocumentPicker.pick({
      type: [DocumentPicker.types.images],
    });
    
    // FormData 생성
    const formData = new FormData();
    formData.append('file', {
      uri: result[0].uri,
      type: result[0].type,
      name: result[0].name,
    });
    
    // 업로드
    const response = await fetch('https://api.example.com/upload', {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    const data = await response.json();
    console.log('Upload success:', data);
  } catch (error) {
    console.error('Upload error:', error);
  }
};
```

**진행률 표시:**
```jsx
import axios from 'axios';

const uploadWithProgress = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  try {
    const response = await axios.post(
      'https://api.example.com/upload',
      formData,
      {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          console.log(`Upload progress: ${percentCompleted}%`);
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
```

---

## 6. 에러 처리 방법은?

**답변:**

```jsx
const fetchWithErrorHandling = async () => {
  try {
    const response = await fetch('https://api.example.com/data');
    
    // HTTP 에러 체크
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    // 네트워크 에러
    if (error.message === 'Network request failed') {
      Alert.alert('네트워크 오류', '인터넷 연결을 확인해주세요');
    }
    // 타임아웃
    else if (error.message.includes('timeout')) {
      Alert.alert('타임아웃', '요청 시간이 초과되었습니다');
    }
    // 기타 에러
    else {
      Alert.alert('오류', error.message);
    }
    throw error;
  }
};
```

**재시도 로직:**
```jsx
const fetchWithRetry = async (url, options = {}, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options);
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
};
```

---

## 7. 인증 토큰 관리 방법은?

**답변:**

```jsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// 토큰 저장
const saveToken = async (token) => {
  await AsyncStorage.setItem('authToken', token);
};

// 토큰 가져오기
const getToken = async () => {
  return await AsyncStorage.getItem('authToken');
};

// Axios 인터셉터
axios.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 토큰 갱신
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = await AsyncStorage.getItem('refreshToken');
        const response = await axios.post('/auth/refresh', { refreshToken });
        const { token } = response.data;
        
        await saveToken(token);
        originalRequest.headers.Authorization = `Bearer ${token}`;
        
        return axios(originalRequest);
      } catch (refreshError) {
        // 로그아웃 처리
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);
```

---

## 8. 캐싱 전략은?

**답변:**

**React Query 캐싱:**
```jsx
const { data } = useQuery({
  queryKey: ['todos'],
  queryFn: fetchTodos,
  staleTime: 5 * 60 * 1000, // 5분
  cacheTime: 10 * 60 * 1000, // 10분
});
```

**AsyncStorage 캐싱:**
```jsx
const fetchWithCache = async (key, fetcher) => {
  try {
    // 캐시 확인
    const cached = await AsyncStorage.getItem(key);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      const isExpired = Date.now() - timestamp > 5 * 60 * 1000;
      
      if (!isExpired) {
        return data;
      }
    }
    
    // 새 데이터 가져오기
    const data = await fetcher();
    
    // 캐시 저장
    await AsyncStorage.setItem(
      key,
      JSON.stringify({ data, timestamp: Date.now() })
    );
    
    return data;
  } catch (error) {
    console.error(error);
  }
};
```

---

## 9. 네트워크 상태 확인 방법은?

**답변:**

```jsx
import NetInfo from '@react-native-community/netinfo';

// 현재 상태 확인
const checkConnection = async () => {
  const state = await NetInfo.fetch();
  console.log('Connection type:', state.type);
  console.log('Is connected?', state.isConnected);
};

// 상태 변화 감지
useEffect(() => {
  const unsubscribe = NetInfo.addEventListener(state => {
    console.log('Connection type:', state.type);
    console.log('Is connected?', state.isConnected);
    
    if (!state.isConnected) {
      Alert.alert('오프라인', '인터넷 연결을 확인해주세요');
    }
  });
  
  return () => unsubscribe();
}, []);
```

**오프라인 처리:**
```jsx
const useOfflineQueue = () => {
  const [queue, setQueue] = useState([]);
  const [isOnline, setIsOnline] = useState(true);
  
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOnline(state.isConnected);
      
      if (state.isConnected && queue.length > 0) {
        // 큐에 있는 요청 처리
        queue.forEach(request => request());
        setQueue([]);
      }
    });
    
    return () => unsubscribe();
  }, [queue]);
  
  const addToQueue = (request) => {
    if (!isOnline) {
      setQueue(prev => [...prev, request]);
    } else {
      request();
    }
  };
  
  return { addToQueue, isOnline };
};
```

---

## 10. GraphQL 사용법은?

**답변:**

**설치:**
```bash
npm install @apollo/client graphql
```

**설정:**
```jsx
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://api.example.com/graphql',
  cache: new InMemoryCache(),
});

const App = () => (
  <ApolloProvider client={client}>
    <MyComponent />
  </ApolloProvider>
);
```

**쿼리:**
```jsx
import { gql, useQuery } from '@apollo/client';

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
    }
  }
`;

const UserList = () => {
  const { loading, error, data } = useQuery(GET_USERS);
  
  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;
  
  return (
    <FlatList
      data={data.users}
      renderItem={({ item }) => <Text>{item.name}</Text>}
      keyExtractor={item => item.id}
    />
  );
};
```

**뮤테이션:**
```jsx
import { gql, useMutation } from '@apollo/client';

const ADD_USER = gql`
  mutation AddUser($name: String!, $email: String!) {
    addUser(name: $name, email: $email) {
      id
      name
      email
    }
  }
`;

const AddUserForm = () => {
  const [addUser, { loading }] = useMutation(ADD_USER);
  
  const handleSubmit = () => {
    addUser({
      variables: { name: 'John', email: 'john@example.com' },
      refetchQueries: [{ query: GET_USERS }],
    });
  };
  
  return <Button title="Add User" onPress={handleSubmit} disabled={loading} />;
};
```
