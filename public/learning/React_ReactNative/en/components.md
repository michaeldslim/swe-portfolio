# React vs React Native: Components

One of the key differences between React and React Native lies in their component systems. While both use a component-based architecture, the actual components differ significantly.

## Basic Components Comparison

| React (Web) | React Native | Purpose |
|-------------|--------------|--------|
| `<div>` | `<View>` | Container element |
| `<span>`, `<p>`, `<h1>` | `<Text>` | Text display |
| `<img>` | `<Image>` | Image display |
| `<input>` | `<TextInput>` | User input |
| `<button>` | `<Button>`, `<Pressable>`, `<TouchableOpacity>` | User interaction |
| `<ul>`, `<ol>`, `<li>` | `<FlatList>`, `<SectionList>` | Lists |
| `<a>` | `<Pressable>` + navigation | Links |
| `<form>` | No direct equivalent | Form container |
| `<table>` | No direct equivalent (use custom components) | Tabular data |

## React (Web) Components

React for the web uses HTML elements directly in JSX:

```jsx
function ProfileCard({ user }) {
  return (
    <div className="card">
      <img src={user.avatar} alt={user.name} className="avatar" />
      <h2>{user.name}</h2>
      <p>{user.bio}</p>
      <button onClick={() => alert('Clicked!')}>Contact</button>
    </div>
  );
}
```

Key points about React web components:

- Use standard HTML elements
- Style with CSS classes or inline styles
- Use DOM events (`onClick`, `onChange`, etc.)
- Can use the full range of HTML elements
- Access to web-specific APIs and features

## React Native Components

React Native uses a set of specialized components that map to native UI elements:

```jsx
import { View, Text, Image, StyleSheet, Pressable, Alert } from 'react-native';

function ProfileCard({ user }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: user.avatar }} style={styles.avatar} />
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.bio}>{user.bio}</Text>
      <Pressable style={styles.button} onPress={() => Alert.alert('Clicked!')}>
        <Text style={styles.buttonText}>Contact</Text>
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
```

Key points about React Native components [[4]](https://www.lambdatest.com/blog/react-vs-react-native/):

- Use platform-specific native components
- Style with JavaScript objects (no CSS)
- Use touch-based events (`onPress` instead of `onClick`)
- Limited set of core components
- Need special handling for platform-specific features

## Core Components in React Native

### View

The most fundamental component in React Native, similar to a `<div>` in web development:

```jsx
<View style={{ flex: 1, padding: 20 }}>
  {/* Other components */}
</View>
```

### Text

Used for displaying text. All text must be wrapped in a `<Text>` component:

```jsx
<Text style={{ fontSize: 18 }}>Hello World</Text>
```

### Image

Used for displaying images from various sources:

```jsx
// Local image
<Image source={require('./assets/logo.png')} style={{ width: 100, height: 100 }} />

// Remote image
<Image source={{ uri: 'https://example.com/logo.png' }} style={{ width: 100, height: 100 }} />
```

### TextInput

For text input fields:

```jsx
<TextInput
  style={{ height: 40, borderColor: 'gray', borderWidth: 1, padding: 10 }}
  onChangeText={text => setInputText(text)}
  value={inputText}
  placeholder="Enter text here"
/>
```

### Pressable / TouchableOpacity

For handling touch interactions:

```jsx
<Pressable
  onPress={() => console.log('Pressed!')}
  style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
>
  <Text>Press Me</Text>
</Pressable>

<TouchableOpacity onPress={() => console.log('Pressed!')}>
  <Text>Press Me</Text>
</TouchableOpacity>
```

### ScrollView

For scrollable content:

```jsx
<ScrollView>
  {/* Many components that might overflow */}
</ScrollView>
```

### FlatList

For rendering efficient lists:

```jsx
<FlatList
  data={arrayOfData}
  renderItem={({ item }) => <Text>{item.title}</Text>}
  keyExtractor={item => item.id}
/>
```

## Platform-Specific Components

React Native provides ways to handle platform-specific components:

```jsx
import { Platform } from 'react-native';

// Platform-specific code
const Button = Platform.select({
  ios: () => require('./IOSButton'),
  android: () => require('./AndroidButton'),
})();

// Platform-specific styles
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

## Custom Components

Both React and React Native allow creating custom reusable components:

```jsx
// React (Web)
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

## References

- [[4]](https://www.lambdatest.com/blog/react-vs-react-native/) - React Native vs ReactJS: Know The Differences
- [[5]](https://www.freecodecamp.org/news/react-js-vs-react-native-whats-the-difference/) - React.js vs React Native – What's the Difference?
