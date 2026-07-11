# React vs React Native: Overview

## What is React?

React (also known as React.js or ReactJS) is a free and open-source JavaScript library for building user interfaces based on components. It was developed by Facebook (now Meta) and is maintained by Meta and a community of individual developers and companies.

**Key characteristics:**

- **Purpose**: Building user interfaces for web applications
- **Released**: May 2013
- **Language**: JavaScript/TypeScript
- **Paradigm**: Component-based architecture
- **Runtime Environment**: Web browsers
- **DOM Interaction**: Uses Virtual DOM

## What is React Native?

React Native is an open-source JavaScript framework for developing mobile applications for iOS, Android, and other platforms. It was also created by Facebook (Meta) to enable mobile app development using React's principles.

**Key characteristics:**

- **Purpose**: Building native mobile applications
- **Released**: March 2015
- **Language**: JavaScript/TypeScript
- **Paradigm**: Component-based architecture
- **Runtime Environment**: Mobile devices (through native bridges)
- **UI Rendering**: Uses native UI components

## Primary Differences

1. **Target Platform**:
   - React: Web browsers
   - React Native: Mobile platforms (iOS, Android)

2. **Rendering Mechanism**:
   - React: Uses Virtual DOM to update the browser DOM
   - React Native: Uses a bridge to communicate with native components [[1]](https://radixweb.com/blog/react-vs-react-native)

3. **Components**:
   - React: Uses HTML elements and web components
   - React Native: Uses specialized components that map to native UI elements

4. **Styling**:
   - React: Uses CSS, CSS-in-JS, or CSS modules
   - React Native: Uses JavaScript objects with CSS-like properties

5. **Environment**:
   - React: Runs in the browser
   - React Native: Runs on mobile devices through native shells

## When to Use Which?

### Choose React when:

- Building web applications or websites
- Need to leverage web-specific features and APIs
- Want to develop for web browsers
- SEO is important for your application
- Want to use the extensive web ecosystem

### Choose React Native when:

- Building mobile applications for iOS and Android
- Need access to native device features
- Want a single codebase for multiple mobile platforms
- Performance and native feel are priorities
- Want to leverage mobile-specific capabilities

## Shared Concepts

Despite their differences, both React and React Native share core principles:

- Component-based architecture
- Declarative programming style
- Virtual DOM concept (though applied differently)
- Unidirectional data flow
- JSX syntax
- React hooks and lifecycle methods
- State and props management

## References

- [[1]](https://radixweb.com/blog/react-vs-react-native) - React vs React Native - Key Difference, Features, Advantages
- [[2]](https://brainhub.eu/library/react-vs-react-native) - React Native vs React - Ultimate Comparison
- [[3]](https://www.contentful.com/blog/react-vs-react-native/) - React vs. React Native: The difference, and which is best for you
