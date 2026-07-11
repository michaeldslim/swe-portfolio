# React vs React Native: Core Concepts

Both React and React Native share fundamental concepts, but implement them differently based on their target platforms. This document explores these core concepts and their implementation details.

## Component Architecture

### React

In React, components are the building blocks of user interfaces. They can be either class components or functional components.

```jsx
// Functional component in React
function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}

// Class component in React
class GreetingClass extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}!</h1>;
  }
}
```

### React Native

React Native also uses components as its building blocks, but instead of rendering to HTML elements, it renders to native UI components.

```jsx
// Functional component in React Native
import { Text, View } from 'react-native';

function Greeting({ name }) {
  return (
    <View>
      <Text>Hello, {name}!</Text>
    </View>
  );
}

// Class component in React Native
class GreetingClass extends React.Component {
  render() {
    return (
      <View>
        <Text>Hello, {this.props.name}!</Text>
      </View>
    );
  }
}
```

## JSX

Both React and React Native use JSX (JavaScript XML), which allows mixing HTML-like syntax with JavaScript.

### React

```jsx
const element = (
  <div className="container">
    <h1>My Web App</h1>
    <p>Welcome to my app!</p>
  </div>
);
```

### React Native

```jsx
import { View, Text, StyleSheet } from 'react-native';

const element = (
  <View style={styles.container}>
    <Text style={styles.heading}>My Mobile App</Text>
    <Text>Welcome to my app!</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
```

## Virtual DOM vs Native Components

### React

React uses a Virtual DOM, which is an in-memory representation of the real DOM. When state changes occur, React:

1. Creates a new Virtual DOM representation
2. Compares it with the previous one (diffing)
3. Updates only the necessary parts of the actual DOM

This approach minimizes direct DOM manipulation and improves performance.

### React Native

React Native uses a similar concept but with a different implementation:

1. JavaScript code runs in a separate thread
2. React Native creates a virtual representation of native UI components
3. Changes are batched and sent over a "bridge" to the native side
4. Native modules update the actual UI components

This approach allows JavaScript to control native UI components without directly manipulating them [[1]](https://radixweb.com/blog/react-vs-react-native).

## State Management

Both React and React Native use the same state management approaches:

### Local State

```jsx
// Using useState hook in both React and React Native
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    // JSX will differ between React and React Native
    // but the state management concept is identical
  );
}
```

### Context API

Both platforms support the Context API for sharing state across component trees.

### External State Management

Both support external state management libraries like Redux, MobX, Zustand, etc.

## Lifecycle and Hooks

Both React and React Native follow the same component lifecycle and support hooks:

```jsx
// Hooks work the same way in both React and React Native
import React, { useState, useEffect, useContext, useReducer, useCallback, useMemo, useRef } from 'react';

function MyComponent() {
  // useState
  const [data, setData] = useState(null);

  // useEffect
  useEffect(() => {
    // Runs after first render and on dependency changes
    fetchData();

    return () => {
      // Cleanup function
    };
  }, [/* dependencies */]);

  // ... other hooks
}
```

## Data Flow

Both React and React Native follow a unidirectional data flow pattern:

1. Data flows down from parent to child components via props
2. Events flow up from child to parent components via callbacks

This makes applications more predictable and easier to debug.

## References

- [[1]](https://radixweb.com/blog/react-vs-react-native) - React vs React Native - Key Difference, Features, Advantages
- [[2]](https://www.lambdatest.com/blog/react-vs-react-native/) - React Native vs ReactJS: Know The Differences
