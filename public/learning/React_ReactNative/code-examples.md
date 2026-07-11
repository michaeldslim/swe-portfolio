# 코드 예제

이 문서는 React와 React Native에서 일반적인 작업을 수행하는 방법을 나란히 비교하는 코드 예제를 제공합니다.

## 기본 컴포넌트

### React (웹)

```jsx
import React from 'react';

function Greeting({ name }) {
  return (
    <div className="greeting-container">
      <h1 className="greeting-title">안녕하세요, {name}님!</h1>
      <p className="greeting-text">저희 애플리케이션에 오신 것을 환영합니다.</p>
    </div>
  );
}

export default Greeting;
```

### React Native (모바일)

```jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function Greeting({ name }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>안녕하세요, {name}님!</Text>
      <Text style={styles.text}>저희 애플리케이션에 오신 것을 환영합니다.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    color: '#666',
  },
});

export default Greeting;
```

## 이벤트 처리

### React (웹)

```jsx
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{count}번 클릭했습니다</p>
      <button onClick={() => setCount(count + 1)}>
        클릭하세요
      </button>
    </div>
  );
}

export default Counter;
```

### React Native (모바일)

```jsx
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{count}번 클릭했습니다</Text>
      <Button 
        title="클릭하세요"
        onPress={() => setCount(count + 1)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
  },
  text: {
    marginBottom: 10,
    fontSize: 16,
  },
});

export default Counter;
```

function WelcomeComponent() {
  return (
    <div className="container">
      <h1>안녕하세요!</h1>
      <p>React 앱에 오신 것을 환영합니다.</p>
      <button onClick={() => alert('버튼이 클릭되었습니다!')}>클릭하세요</button>
    </div>
  );
}

export default WelcomeComponent;
```

### React Native (모바일)

```jsx
import React from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';

function WelcomeComponent() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>안녕하세요!</Text>
      <Text style={styles.paragraph}>React Native 앱에 오신 것을 환영합니다.</Text>
      <Button 
        title="클릭하세요" 
        onPress={() => Alert.alert('알림', '버튼이 클릭되었습니다!')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 20,
  },
});

export default WelcomeComponent;
```

## 스타일링 적용

### React (웹)

```jsx
import React from 'react';
import './CardComponent.css';

function CardComponent({ title, description }) {
  return (
    <div className="card">
      <div className="card-header">
        <h2>{title}</h2>
      </div>
      <div className="card-body">
        <p>{description}</p>
      </div>
    </div>
  );
}

// CardComponent.css
/*
.card {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-header {
  background-color: #f5f5f5;
  padding: 10px 15px;
  border-bottom: 1px solid #ddd;
}

.card-body {
  padding: 15px;
}
*/

export default CardComponent;
```

### React Native (모바일)

```jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function CardComponent({ title, description }) {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.cardBody}>
        <Text>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // Android에만 적용됨
  },
  cardHeader: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  title: {
    fontWeight: 'bold',
  },
  cardBody: {
    padding: 15,
  },
});

export default CardComponent;
```

## 목록 렌더링

### React (웹)

```jsx
import React from 'react';

function ItemList() {
  const items = [
    { id: 1, name: '항목 1', description: '첫 번째 항목에 대한 설명' },
    { id: 2, name: '항목 2', description: '두 번째 항목에 대한 설명' },
    { id: 3, name: '항목 3', description: '세 번째 항목에 대한 설명' },
  ];

  return (
    <div>
      <h2>항목 목록</h2>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ItemList;
```

### React Native (모바일)

```jsx
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

function ItemList() {
  const items = [
    { id: '1', name: '항목 1', description: '첫 번째 항목에 대한 설명' },
    { id: '2', name: '항목 2', description: '두 번째 항목에 대한 설명' },
    { id: '3', name: '항목 3', description: '세 번째 항목에 대한 설명' },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemDescription}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>항목 목록</Text>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  item: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
  },
});

export default ItemList;
```

## 폼 처리

### React (웹)

```jsx
import React, { useState } from 'react';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('제출된 데이터:', formData);
    // 여기서 API 호출 등의 제출 로직을 구현합니다
    alert('폼이 제출되었습니다!');
  };

  return (
    <div className="form-container">
      <h2>문의하기</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">이름</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">메시지</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">제출하기</button>
      </form>
    </div>
  );
}

export default ContactForm;
```

### React Native (모바일)

```jsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (name, value) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    console.log('제출된 데이터:', formData);
    // 여기서 API 호출 등의 제출 로직을 구현합니다
    Alert.alert('성공', '폼이 제출되었습니다!');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>문의하기</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>이름</Text>
        <TextInput
          style={styles.input}
          value={formData.name}
          onChangeText={(text) => handleChange('name', text)}
          placeholder="이름을 입력하세요"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>이메일</Text>
        <TextInput
          style={styles.input}
          value={formData.email}
          onChangeText={(text) => handleChange('email', text)}
          placeholder="이메일을 입력하세요"
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>메시지</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={formData.message}
          onChangeText={(text) => handleChange('message', text)}
          placeholder="메시지를 입력하세요"
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>제출하기</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  textArea: {
    minHeight: 100,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ContactForm;
```

## 네비게이션

### React (웹 - React Router 사용)

```jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

// 페이지 컴포넌트
function Home() {
  return <h2>홈 페이지</h2>;
}

function About() {
  return <h2>소개 페이지</h2>;
}

function Contact() {
  return <h2>연락처 페이지</h2>;
}

// 앱 컴포넌트
function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">홈</Link>
            </li>
            <li>
              <Link to="/about">소개</Link>
            </li>
            <li>
              <Link to="/contact">연락처</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
```

### React Native (모바일 - React Navigation 사용)

```jsx
import React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// 페이지 컴포넌트
function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>홈 화면</Text>
      <Button
        title="소개 화면으로 이동"
        onPress={() => navigation.navigate('About')}
      />
      <Button
        title="연락처 화면으로 이동"
        onPress={() => navigation.navigate('Contact')}
      />
    </View>
  );
}

function AboutScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>소개 화면</Text>
      <Button title="홈으로 돌아가기" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}

function ContactScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>연락처 화면</Text>
      <Button title="홈으로 돌아가기" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}

// 내비게이션 스택 생성
const Stack = createNativeStackNavigator();

// 앱 컴포넌트
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: '홈' }}
        />
        <Stack.Screen 
          name="About" 
          component={AboutScreen} 
          options={{ title: '소개' }}
        />
        <Stack.Screen 
          name="Contact" 
          component={ContactScreen} 
          options={{ title: '연락처' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
```

## API 호출

### React와 React Native (둘 다 동일한 방식 사용)

```jsx
import React, { useState, useEffect } from 'react';

// React의 경우 다음과 같이 컴포넌트를 정의합니다
// React Native의 경우 import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';를 사용합니다

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 사용자 데이터를 가져오는 함수
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
          throw new Error('네트워크 응답이 정상이 아닙니다');
        }
        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // 로딩 중 상태 표시
  if (loading) {
    // React: return <div>로딩 중...</div>;
    // React Native: return <View style={styles.center}><ActivityIndicator size="large" color="#0000ff" /><Text>로딩 중...</Text></View>;
  }

  // 오류 표시
  if (error) {
    // React: return <div>오류: {error}</div>;
    // React Native: return <View style={styles.center}><Text>오류: {error}</Text></View>;
  }

  // 데이터 표시
  // React
  /*
  return (
    <div>
      <h2>사용자 목록</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <h3>{user.name}</h3>
            <p>이메일: {user.email}</p>
            <p>전화: {user.phone}</p>
          </li>
        ))}
      </ul>
    </div>
  );
  */

  // React Native
  /*
  const renderItem = ({ item }) => (
    <View style={styles.userItem}>
      <Text style={styles.userName}>{item.name}</Text>
      <Text>이메일: {item.email}</Text>
      <Text>전화: {item.phone}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>사용자 목록</Text>
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
  */
}

// React Native의 경우 스타일을 정의합니다
/*
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  userItem: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
*/

export default UserList;
```

## 상태 관리 (Redux 사용)

### React와 React Native (거의 동일한 방식으로 사용)

#### 스토어 설정 (store.js)

```jsx
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// 초기 상태
const initialState = {
  counter: 0,
  loading: false,
  error: null,
};

// 리듀서
function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        counter: state.counter + 1,
      };
    case 'DECREMENT':
      return {
        ...state,
        counter: state.counter - 1,
      };
    case 'RESET':
      return {
        ...state,
        counter: 0,
      };
    case 'FETCH_DATA_START':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'FETCH_DATA_SUCCESS':
      return {
        ...state,
        loading: false,
        counter: action.payload,
      };
    case 'FETCH_DATA_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

// 스토어 생성
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
```

#### 액션 생성자 (actions.js)

```jsx
// 동기 액션
export const increment = () => ({ type: 'INCREMENT' });
export const decrement = () => ({ type: 'DECREMENT' });
export const reset = () => ({ type: 'RESET' });

// 비동기 액션 (thunk 사용)
export const fetchRandomCounter = () => {
  return async (dispatch) => {
    dispatch({ type: 'FETCH_DATA_START' });

    try {
      // 가상의 API 호출 (실제로는 여기서 fetch 등을 사용)
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({ data: Math.floor(Math.random() * 100) });
        }, 1000);
      });

      dispatch({ 
        type: 'FETCH_DATA_SUCCESS', 
        payload: response.data
      });
    } catch (error) {
      dispatch({ 
        type: 'FETCH_DATA_FAILURE', 
        payload: error.message 
      });
    }
  };
};
```

#### React 컴포넌트에서 사용

```jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, reset, fetchRandomCounter } from './actions';

function Counter() {
  const { counter, loading, error } = useSelector(state => state);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>카운터: {counter}</h2>
      {loading && <p>로딩 중...</p>}
      {error && <p>오류: {error}</p>}

      <button onClick={() => dispatch(increment())}>증가</button>
      <button onClick={() => dispatch(decrement())}>감소</button>
      <button onClick={() => dispatch(reset())}>리셋</button>
      <button onClick={() => dispatch(fetchRandomCounter())}>랜덤 값 가져오기</button>
    </div>
  );
}

export default Counter;
```

#### React Native 컴포넌트에서 사용

```jsx
import React from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, reset, fetchRandomCounter } from './actions';

function Counter() {
  const { counter, loading, error } = useSelector(state => state);
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>카운터: {counter}</Text>

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="#0000ff" />
          <Text>로딩 중...</Text>
        </View>
      )}

      {error && <Text style={styles.error}>오류: {error}</Text>}

      <View style={styles.buttonContainer}>
        <Button title="증가" onPress={() => dispatch(increment())} />
        <View style={styles.buttonSpacer} />
        <Button title="감소" onPress={() => dispatch(decrement())} />
        <View style={styles.buttonSpacer} />
        <Button title="리셋" onPress={() => dispatch(reset())} />
        <View style={styles.buttonSpacer} />
        <Button title="랜덤 값 가져오기" onPress={() => dispatch(fetchRandomCounter())} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  error: {
    color: 'red',
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
  },
  buttonSpacer: {
    height: 10,
  },
});

export default Counter;
```

## 폼 처리

### React (웹)

```jsx
import React, { useState } from 'react';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('제출 데이터:', { username, password });
    // 여기에 API 호출 코드가 들어갑니다
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <div className="form-group">
        <label htmlFor="username">아이디:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">비밀번호:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button type="submit">로그인</button>
    </form>
  );
}

export default LoginForm;
```

### React Native (모바일)

```jsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    console.log('제출 데이터:', { username, password });
    // 여기에 API 호출 코드가 들어갑니다
  };

  return (
    <View style={styles.form}>
      <View style={styles.formGroup}>
        <Text style={styles.label}>아이디:</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          placeholder="아이디를 입력하세요"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>비밀번호:</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="비밀번호를 입력하세요"
          secureTextEntry
        />
      </View>

      <Button title="로그인" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    padding: 20,
  },
  formGroup: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 5,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 4,
  },
});

export default LoginForm;
```

## 데이터 가져오기 및 표시

### React (웹)

```jsx
import React, { useState, useEffect } from 'react';

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        if (!response.ok) {
          throw new Error('네트워크 응답이 정상이 아닙니다');
        }
        return response.json();
      })
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>오류: {error}</div>;

  return (
    <div className="user-list">
      <h2>사용자 목록</h2>
      <ul>
        {users.map(user => (
          <li key={user.id} className="user-item">
            <h3>{user.name}</h3>
            <p>이메일: {user.email}</p>
            <p>전화번호: {user.phone}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
```

### React Native (모바일)

```jsx
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        if (!response.ok) {
          throw new Error('네트워크 응답이 정상이 아닙니다');
        }
        return response.json();
      })
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text style={styles.error}>오류: {error}</Text>;

  const renderUser = ({ item }) => (
    <View style={styles.userItem}>
      <Text style={styles.userName}>{item.name}</Text>
      <Text>이메일: {item.email}</Text>
      <Text>전화번호: {item.phone}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>사용자 목록</Text>
      <FlatList
        data={users}
        renderItem={renderUser}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  userItem: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#f8f8f8',
    borderRadius: 4,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default UserList;
```

## 네비게이션

### React (웹) - React Router 사용

```jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// 페이지 컴포넌트
function Home() {
  return <h2>홈 페이지</h2>;
}

function About() {
  return <h2>소개 페이지</h2>;
}

function Contact() {
  return <h2>연락처 페이지</h2>;
}

// 네비게이션이 있는 앱
function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/">홈</Link></li>
            <li><Link to="/about">소개</Link></li>
            <li><Link to="/contact">연락처</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
```

### React Native - React Navigation 사용

```jsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, Button, StyleSheet } from 'react-native';

// 화면 컴포넌트
function HomeScreen({ navigation }) {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>홈 화면</Text>
      <Button 
        title="소개 화면으로 이동"
        onPress={() => navigation.navigate('About')}
      />
      <Button 
        title="연락처 화면으로 이동"
        onPress={() => navigation.navigate('Contact')}
      />
    </View>
  );
}

function AboutScreen({ navigation }) {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>소개 화면</Text>
      <Button 
        title="뒤로 가기"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}

function ContactScreen({ navigation }) {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>연락처 화면</Text>
      <Button 
        title="뒤로 가기"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}

// 스택 네비게이터
const Stack = createNativeStackNavigator();

// 네비게이션이 있는 앱
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: '홈' }} />
        <Stack.Screen name="About" component={AboutScreen} options={{ title: '소개' }} />
        <Stack.Screen name="Contact" component={ContactScreen} options={{ title: '연락처' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default App;
```

## 상태 관리 (Redux 사용)

### 스토어 설정 (store.js)

```jsx
import { configureStore, createSlice } from '@reduxjs/toolkit';

// 카운터 슬라이스 생성
const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
    status: 'idle'
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

// 액션 생성자 내보내기
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// 스토어 생성
const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
});

export default store;
```

### React (웹) - Redux 사용

```jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from './counterSlice';

function Counter() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        <button
          aria-label="값 감소"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
        <span>{count}</span>
        <button
          aria-label="값 증가"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
      </div>
    </div>
  );
}

export default Counter;
```

### React Native (모바일) - Redux 사용

```jsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from './counterSlice';

function Counter() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <View style={styles.countContainer}>
        <Button title="-" onPress={() => dispatch(decrement())} />
        <Text style={styles.countText}>{count}</Text>
        <Button title="+" onPress={() => dispatch(increment())} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 20,
  },
});

export default Counter;
```

### 앱에 Redux 스토어 제공하기

```jsx
import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Counter from './Counter';

// React와 React Native 모두 동일한 방식으로 Provider 사용
function App() {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
}

export default App;
```

## Context API 사용하기

### React (웹)

```jsx
import React, { createContext, useContext, useState } from 'react';

// Context 생성
const ThemeContext = createContext();

// 테마 제공자 컴포넌트
function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  // 테마 변경 함수
  const toggleTheme = () => {
    setDarkMode(prevMode => !prevMode);
  };

  // Context에 제공할 값
  const value = {
    darkMode,
    toggleTheme
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// 테마 사용 컴포넌트
function ThemedButton() {
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  const buttonStyle = {
    backgroundColor: darkMode ? '#333' : '#f0f0f0',
    color: darkMode ? '#fff' : '#000',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  return (
    <button style={buttonStyle} onClick={toggleTheme}>
      테마 변경하기
    </button>
  );
}

// 앱 컴포넌트
function App() {
  return (
    <ThemeProvider>
      <div style={{ padding: '20px' }}>
        <h1>Context API 예제</h1>
        <ThemedButton />
      </div>
    </ThemeProvider>
  );
}

export default App;
```

### React Native (모바일)

```jsx
import React, { createContext, useContext, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// Context 생성
const ThemeContext = createContext();

// 테마 제공자 컴포넌트
function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  // 테마 변경 함수
  const toggleTheme = () => {
    setDarkMode(prevMode => !prevMode);
  };

  // Context에 제공할 값
  const value = {
    darkMode,
    toggleTheme
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// 테마 사용 컴포넌트
function ThemedButton() {
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: darkMode ? '#333' : '#f0f0f0' }
      ]}
      onPress={toggleTheme}
    >
      <Text style={{ color: darkMode ? '#fff' : '#000' }}>
        테마 변경하기
      </Text>
    </TouchableOpacity>
  );
}

// 앱 컴포넌트
function App() {
  const { darkMode } = useContext(ThemeContext);

  return (
    <ThemeProvider>
      <View style={[
        styles.container,
        { backgroundColor: darkMode ? '#222' : '#fff' }
      ]}>
        <Text style={[
          styles.title,
          { color: darkMode ? '#fff' : '#000' }
        ]}>
          Context API 예제
        </Text>
        <ThemedButton />
      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    padding: 10,
    borderRadius: 4,
    minWidth: 120,
    alignItems: 'center',
  },
});

export default App;
```
