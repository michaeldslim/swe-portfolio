# React vs React Native: Styling

Styling approaches differ significantly between React and React Native. While React leverages CSS and its extensions, React Native uses a JavaScript-based styling system that resembles CSS but has important differences.

## Styling in React (Web)

React offers multiple approaches for styling web applications:

### 1. Traditional CSS

```jsx
// CSS file (styles.css)
.container {
  display: flex;
  background-color: #f5f5f5;
  padding: 20px;
}

.heading {
  font-size: 24px;
  color: #333;
  margin-bottom: 10px;
}

// React component
import './styles.css';

function MyComponent() {
  return (
    <div className="container">
      <h1 className="heading">Hello World</h1>
    </div>
  );
}
```

### 2. Inline Styles

```jsx
function MyComponent() {
  return (
    <div style={{ 
      display: 'flex', 
      backgroundColor: '#f5f5f5', 
      padding: '20px' 
    }}>
      <h1 style={{ 
        fontSize: '24px', 
        color: '#333', 
        marginBottom: '10px' 
      }}>
        Hello World
      </h1>
    </div>
  );
}
```

### 3. CSS Modules

```jsx
// CSS Module (MyComponent.module.css)
.container {
  display: flex;
  background-color: #f5f5f5;
  padding: 20px;
}

.heading {
  font-size: 24px;
  color: #333;
  margin-bottom: 10px;
}

// React component
import styles from './MyComponent.module.css';

function MyComponent() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Hello World</h1>
    </div>
  );
}
```

### 4. CSS-in-JS Libraries

Using libraries like styled-components or Emotion:

```jsx
// Using styled-components
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  background-color: #f5f5f5;
  padding: 20px;
`;

const Heading = styled.h1`
  font-size: 24px;
  color: #333;
  margin-bottom: 10px;
`;

function MyComponent() {
  return (
    <Container>
      <Heading>Hello World</Heading>
    </Container>
  );
}
```

## Styling in React Native

React Native uses a JavaScript-based styling system inspired by CSS but with important differences [[1]](https://radixweb.com/blog/react-vs-react-native):

### 1. StyleSheet API

```jsx
import { View, Text, StyleSheet } from 'react-native';

function MyComponent() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Hello World</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    color: '#333',
    marginBottom: 10,
  },
});
```

### 2. Inline Styles

```jsx
import { View, Text } from 'react-native';

function MyComponent() {
  return (
    <View style={{ 
      flex: 1, 
      backgroundColor: '#f5f5f5', 
      padding: 20 
    }}>
      <Text style={{ 
        fontSize: 24, 
        color: '#333', 
        marginBottom: 10 
      }}>
        Hello World
      </Text>
    </View>
  );
}
```

### 3. Multiple Styles

```jsx
import { View, Text, StyleSheet } from 'react-native';

function MyComponent({ isActive }) {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, isActive && styles.activeText]}>
        Hello World
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  text: {
    fontSize: 16,
    color: 'black',
  },
  activeText: {
    fontWeight: 'bold',
    color: 'blue',
  },
});
```

## Key Differences

### 1. Style Properties

- **React (Web)**: Uses standard CSS properties with hyphens (e.g., `background-color`)
- **React Native**: Uses camelCase properties (e.g., `backgroundColor`)

### 2. Units

- **React (Web)**: Uses various units (px, em, rem, vh, vw, %)
- **React Native**: Mostly unitless numbers (interpreted as density-independent pixels)

### 3. Layout System

- **React (Web)**: Uses CSS Box Model, Flexbox, Grid
- **React Native**: Primarily uses Flexbox (with some differences from web Flexbox)

### 4. Default Layout

- **React (Web)**: Default is horizontal flow (left to right)
- **React Native**: Default flex direction is column (top to bottom)

### 5. Styling Capabilities

- **React (Web)**: Full CSS capabilities (animations, transitions, pseudo-classes)
- **React Native**: Limited subset of CSS-like properties, no CSS pseudo-classes

### 6. Media Queries

- **React (Web)**: Supports media queries for responsive design
- **React Native**: No direct media query support (uses Dimensions API or libraries)

### 7. Inheritance

- **React (Web)**: CSS properties can inherit from parent elements
- **React Native**: No style inheritance (except for limited text properties)

## Layout Systems

### Flexbox in React Native

React Native relies heavily on Flexbox for layout:

```jsx
import { View, StyleSheet } from 'react-native';

function FlexboxExample() {
  return (
    <View style={styles.container}>
      <View style={styles.box} />
      <View style={styles.box} />
      <View style={styles.box} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row', // 'column' is default in React Native
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  box: {
    width: 80,
    height: 80,
    backgroundColor: 'steelblue',
  },
});
```

### Responsive Design

**React (Web)**:

```jsx
// Using media queries in CSS
.container {
  padding: 20px;
}

@media (max-width: 768px) {
  .container {
    padding: 10px;
  }
}
```

**React Native**:

```jsx
import { View, StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

function ResponsiveComponent() {
  return (
    <View style={[
      styles.container,
      windowWidth < 768 && styles.containerSmall
    ]}>
      {/* Content */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  containerSmall: {
    padding: 10,
  },
});
```

## Styling Libraries

### React (Web)

- Styled Components
- Emotion
- Tailwind CSS
- Material-UI
- Bootstrap

### React Native

- Styled Components (with adaptations)
- React Native Paper
- UI Kitten
- NativeBase
- Tailwind React Native Classnames

## Platform-Specific Styling in React Native

```jsx
import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
});
```

## References

- [[1]](https://radixweb.com/blog/react-vs-react-native) - React vs React Native - Key Difference, Features, Advantages
- [[4]](https://www.lambdatest.com/blog/react-vs-react-native/) - React Native vs ReactJS: Know The Differences
