# React와 React Native: 컴포넌트

React와 React Native 사이의 주요 차이점 중 하나는 컴포넌트 시스템에 있습니다. 두 기술 모두 컴포넌트 기반 아키텍처를 사용하지만, 실제 컴포넌트는 상당히 다릅니다.

## 기본 컴포넌트 비교

| React (웹) | React Native | 목적 |
|-------------|--------------|--------|
| `<div>` | `<View>` | 컨테이너 요소 |
| `<span>`, `<p>`, `<h1>` | `<Text>` | 텍스트 표시 |
| `<img>` | `<Image>` | 이미지 표시 |
| `<input>` | `<TextInput>` | 사용자 입력 |
| `<button>` | `<Button>`, `<Pressable>`, `<TouchableOpacity>` | 사용자 상호작용 |
| `<ul>`, `<ol>`, `<li>` | `<FlatList>`, `<SectionList>` | 목록 |
| `<a>` | `<Pressable>` + 내비게이션 | 링크 |
| `<form>` | 직접적인 대응 없음 | 폼 컨테이너 |
| `<table>` | 직접적인 대응 없음 (커스텀 컴포넌트 사용) | 표 데이터 |

## React (웹) 컴포넌트

React 웹에서는 JSX에서 HTML 요소를 직접 사용합니다:

```jsx
function ProfileCard({ user }) {
  return (
    <div className="card">
      <img src={user.avatar} alt={user.name} className="avatar" />
      <h2>{user.name}</h2>
      <p>{user.bio}</p>
      <button onClick={() => alert('클릭됨!')}>
        연락하기
      </button>
    </div>
  );
}

export default ProfileCard;
```

React 웹 컴포넌트의 주요 특징:

- 표준 HTML 요소 사용
- CSS 클래스나 인라인 스타일로 스타일링
- DOM 이벤트 사용 (`onClick`, `onChange` 등)
- HTML 요소의 전체 범위 사용 가능
- 웹 특화 API 및 기능에 접근 가능

## React Native 컴포넌트

React Native는 네이티브 UI 요소에 매핑되는 특수 컴포넌트 세트를 사용합니다:

```jsx
import { View, Text, Image, StyleSheet, Pressable, Alert } from 'react-native';

function ProfileCard({ user }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: user.avatar }} style={styles.avatar} />
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.bio}>{user.bio}</Text>
      <Pressable style={styles.button} onPress={() => Alert.alert('클릭됨!')}>
        <Text style={styles.buttonText}>연락하기</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  bio: {
    marginTop: 4,
    color: '#666',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 4,
    marginTop: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default ProfileCard;
```

React Native 컴포넌트의 주요 특징 [[4]](https://www.lambdatest.com/blog/react-vs-react-native/):

- 플랫폼별 네이티브 컴포넌트 사용
- JavaScript 객체로 스타일링 (CSS 없음)
- 터치 기반 이벤트 사용 (`onClick` 대신 `onPress`)
- 제한된 핵심 컴포넌트 세트
- 플랫폼별 기능을 위한 특별 처리 필요

## React Native의 핵심 컴포넌트

### View

React Native에서 가장 기본적인 컴포넌트로, 웹 개발의 `<div>`와 유사합니다:

```jsx
<View style={{ flex: 1, padding: 20 }}>
  {/* 다른 컴포넌트들 */}
</View>
```

### Text

텍스트 표시용 컴포넌트. 모든 텍스트는 `<Text>` 컴포넌트로 감싸야 합니다:

```jsx
<Text style={{ fontSize: 18 }}>안녕하세요</Text>
```

### Image

다양한 소스에서 이미지를 표시하는 데 사용됩니다:

```jsx
// 로컬 이미지
<Image source={require('./assets/logo.png')} style={{ width: 100, height: 100 }} />

// 원격 이미지
<Image source={{ uri: 'https://example.com/logo.png' }} style={{ width: 100, height: 100 }} />
```

### TextInput

텍스트 입력 필드:

```jsx
<TextInput
  style={{ height: 40, borderColor: 'gray', borderWidth: 1, padding: 10 }}
  onChangeText={text => setInputText(text)}
  value={inputText}
  placeholder="여기에 텍스트 입력"
/>
```

### Pressable / TouchableOpacity

터치 상호작용 처리:

```jsx
<Pressable
  onPress={() => console.log('눌렸습니다!')}
  style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
>
  <Text>눌러보세요</Text>
</Pressable>

<TouchableOpacity onPress={() => console.log('눌렸습니다!')}>
  <Text>눌러보세요</Text>
</TouchableOpacity>
```

### ScrollView

스크롤 가능한 콘텐츠:

```jsx
<ScrollView>
  {/* 넘칠 수 있는 많은 컴포넌트들 */}
</ScrollView>
```

### FlatList

효율적인 목록 렌더링:

```jsx
<FlatList
  data={arrayOfData}
  renderItem={({ item }) => <Text>{item.title}</Text>}
  keyExtractor={item => item.id}
/>
```

## 플랫폼별 컴포넌트

React Native는 플랫폼별 컴포넌트를 처리하는 방법을 제공합니다:

```jsx
import { Platform } from 'react-native';

// 플랫폼별 코드
const Button = Platform.select({
  ios: () => require('./IOSButton'),
  android: () => require('./AndroidButton'),
})();

// 플랫폼별 스타일
const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
      },
      android: {
        elevation: 4,
      },
    }),
  },
});
```

## 커스텀 컴포넌트

React와 React Native 모두 재사용 가능한 커스텀 컴포넌트를 만들 수 있습니다:

```jsx
// React (웹)
function CustomButton({ title, onPress, color }) {
  return (
    <button 
      onClick={onPress}
      style={{ backgroundColor: color, padding: '10px 20px', border: 'none', borderRadius: '4px' }}
    >
      {title}
    </button>
  );
}

// React Native
function CustomButton({ title, onPress, color }) {
  return (
    <Pressable 
      onPress={onPress}
      style={({ pressed }) => [{
        backgroundColor: color,
        padding: 10,
        borderRadius: 4,
        opacity: pressed ? 0.8 : 1,
      }]}
    >
      <Text style={{ color: '#fff', textAlign: 'center' }}>{title}</Text>
    </Pressable>
  );
}
```

## 참조

- [[4]](https://www.lambdatest.com/blog/react-vs-react-native/) - React Native vs ReactJS: Know The Differences
- [[5]](https://www.freecodecamp.org/news/react-js-vs-react-native-whats-the-difference/) - React.js vs React Native – What's the Difference?
