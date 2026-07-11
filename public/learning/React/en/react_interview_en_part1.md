# React Developer Interview Questions - Part 1

## Basic Concepts

1. **What is React and what are its key features?**
   - What are the main advantages of React?
   
   **Answer:**
   React is a UI library developed by Facebook that uses a component-based architecture to build user interfaces. Its key features include:
   
   - **Component-Based**: UI is separated into independent, reusable pieces
   - **Virtual DOM**: Optimizes performance by minimizing actual DOM manipulation
   - **Unidirectional Data Flow**: Predictable data flow makes debugging easier
   - **JSX**: Allows HTML-like syntax within JavaScript
   - **Declarative Programming**: Define how UI should look in different states
   
   Main advantages:
   - High performance and rendering efficiency
   - Faster development with reusable components
   - Large community and rich ecosystem
   - Easy integration with other libraries/frameworks

2. **What is the Virtual DOM and how does it work?**
   - What are the differences between the real DOM and Virtual DOM?
   
   **Answer:**
   The Virtual DOM is a lightweight copy of the real DOM that exists as a JavaScript object in memory. When state changes in React, the following process occurs:
   
   1. React creates a new Virtual DOM tree when state changes.
   2. It compares the previous Virtual DOM with the new one (Diffing).
   3. It calculates only the changed parts and applies minimal changes to the real DOM (Reconciliation).
   
   **Differences between real DOM and Virtual DOM:**
   - The real DOM is the actual elements rendered in the browser and is expensive to manipulate.
   - The Virtual DOM is an in-memory JavaScript object that is cheaper to manipulate.
   - Manipulating the real DOM triggers reflow and repaint processes that affect performance, while Virtual DOM operations can be performed quickly without these processes.
   
   ```javascript
   // Example of a Virtual DOM object (simplified)
   const virtualDOMElement = {
     type: 'div',
     props: {
       className: 'container',
       children: [
         { type: 'h1', props: { children: 'Title' } },
         { type: 'p', props: { children: 'Content' } }
       ]
     }
   };
   ```

3. **What is JSX and why do we use it?**
   - Can you use React without JSX?
   
   **Answer:**
   JSX (JavaScript XML) is an extension to JavaScript syntax that allows you to write HTML-like code within JavaScript. It's used in React to express UI structure intuitively.
   
   **Reasons to use JSX:**
   - Improves readability by allowing UI structure and logic to be expressed together
   - Familiar to UI developers due to its HTML-like syntax
   - Helps catch syntax errors at compile time
   - Makes creating React elements easier
   
   **Using React without JSX:**
   You can use React without JSX by using the `React.createElement()` method.
   
   ```javascript
   // With JSX
   const element = (
     <div className="container">
       <h1>Hello</h1>
       <p>This is a JSX example.</p>
     </div>
   );
   
   // Without JSX using React.createElement
   const element = React.createElement(
     'div',
     { className: 'container' },
     React.createElement('h1', null, 'Hello'),
     React.createElement('p', null, 'This is a JSX example.')
   );
   ```

4. **What are React components and what types are there?**
   - What are the differences between functional and class components?
   
   **Answer:**
   React components are reusable, self-contained pieces of code that return React elements describing what should appear on the screen. There are two main types of components:
   
   **1. Functional Components (Function Components):**
   - Simple JavaScript functions that accept props and return React elements
   - Introduced Hooks in React 16.8 to handle state and side effects
   - Simpler syntax and easier to understand
   
   ```javascript
   function Welcome(props) {
     return <h1>Hello, {props.name}</h1>;
   }
   ```
   
   **2. Class Components:**
   - ES6 classes that extend React.Component
   - Have access to lifecycle methods
   - Can maintain internal state with this.state
   
   ```javascript
   class Welcome extends React.Component {
     render() {
       return <h1>Hello, {this.props.name}</h1>;
     }
   }
   ```
   
   **Differences between functional and class components:**
   - **Syntax**: Functional components have simpler syntax
   - **State Management**: Before Hooks, only class components could use state
   - **Lifecycle Methods**: Class components have access to lifecycle methods, while functional components use useEffect for similar functionality
   - **this Keyword**: Class components use 'this' to access props, state, and methods, while functional components don't need 'this'
   - **Performance**: Functional components are generally more concise and easier to optimize
   
   Currently, React recommends using functional components with Hooks.

5. **What is the difference between Props and State?**
   - When should you use Props and when should you use State?
   
   **Answer:**
   Props and State are both used to manage data in React components, but they serve different purposes:
   
   **Props (Properties):**
   - Passed from parent to child components
   - Read-only and cannot be modified by the receiving component
   - Used to customize components or pass data down the component tree
   - Changes in props trigger re-renders
   
   **State:**
   - Managed within a component
   - Can be modified using setState (class components) or state updater functions (hooks)
   - Used for data that changes over time or user interaction
   - Private to the component unless passed as props to child components
   - Changes in state trigger re-renders
   
   **When to use Props:**
   - When data is passed from parent to child
   - When data doesn't need to be modified by the receiving component
   - For component configuration
   
   **When to use State:**
   - When data changes over time
   - When data is affected by user interactions
   - When data should trigger UI updates when changed
   
   ```javascript
   // Props example
   function Welcome(props) {
     return <h1>Hello, {props.name}!</h1>;
   }
   
   // Usage
   <Welcome name="John" />
   
   // State example (functional component)
   function Counter() {
     const [count, setCount] = useState(0);
     
     return (
       <div>
         <p>Current count: {count}</p>
         <button onClick={() => setCount(count + 1)}>Increment</button>
       </div>
     );
   }
   ```

6. **Explain the lifecycle of a React component.**
   - How are lifecycles handled in functional components?
   
   **Answer:**
   The lifecycle of a React component refers to the different stages a component goes through from creation to removal from the DOM.
   
   **Class Component Lifecycle:**
   
   1. **Mounting Phase:**
      - constructor()
      - static getDerivedStateFromProps()
      - render()
      - componentDidMount()
   
   2. **Updating Phase:**
      - static getDerivedStateFromProps()
      - shouldComponentUpdate()
      - render()
      - getSnapshotBeforeUpdate()
      - componentDidUpdate()
   
   3. **Unmounting Phase:**
      - componentWillUnmount()
   
   4. **Error Handling:**
      - static getDerivedStateFromError()
      - componentDidCatch()
   
   **Handling Lifecycles in Functional Components:**
   Functional components use Hooks to implement lifecycle functionality.
   
   ```javascript
   import React, { useState, useEffect } from 'react';
   
   function ExampleComponent() {
     const [data, setData] = useState(null);
     
     // componentDidMount + componentDidUpdate
     useEffect(() => {
       console.log('Component mounted or updated');
       
       // Fetch data
       fetch('https://api.example.com/data')
         .then(response => response.json())
         .then(data => setData(data));
       
       // componentWillUnmount (cleanup function)
       return () => {
         console.log('Component will unmount');
         // Cleanup code (e.g., cancel subscriptions)
       };
     }, []); // Empty dependency array means this runs only on mount and unmount
     
     // Run effect when specific value changes
     useEffect(() => {
       console.log('data changed:', data);
     }, [data]);
     
     return <div>{data ? data.toString() : 'Loading...'}</div>;
   }
   ```

7. **What are React Hooks and what types are there?**
   - How do you create custom Hooks and what are some use cases?
   
   **Answer:**
   React Hooks are functions that let you "hook into" React state and lifecycle features from functional components. They were introduced in React 16.8.
   
   **Common Built-in Hooks:**
   - **useState**: Manages state in functional components
   - **useEffect**: Handles side effects (similar to lifecycle methods)
   - **useContext**: Accesses context without nesting
   - **useReducer**: Manages complex state logic
   - **useRef**: Creates mutable references that persist across renders
   - **useMemo**: Memoizes computed values for performance
   - **useCallback**: Memoizes callback functions for performance
   - **useLayoutEffect**: Similar to useEffect but fires synchronously after DOM mutations
   - **useImperativeHandle**: Customizes the instance value exposed to parent components
   - **useDebugValue**: Displays a label in React DevTools
   
   **Creating Custom Hooks:**
   Custom Hooks are JavaScript functions that start with "use" and can call other Hooks to reuse stateful logic.
   
   ```javascript
   // Custom Hook for tracking window size
   function useWindowSize() {
     const [windowSize, setWindowSize] = useState({
       width: window.innerWidth,
       height: window.innerHeight
     });
     
     useEffect(() => {
       const handleResize = () => {
         setWindowSize({
           width: window.innerWidth,
           height: window.innerHeight
         });
       };
       
       // Add event listener
       window.addEventListener('resize', handleResize);
       
       // Clean up
       return () => {
         window.removeEventListener('resize', handleResize);
       };
     }, []); // Empty array ensures this only runs on mount and unmount
     
     return windowSize;
   }
   
   // Using the custom Hook
   function ResponsiveComponent() {
     const { width, height } = useWindowSize();
     
     return (
       <div>
         <p>Current window size: {width} x {height}</p>
         {width < 768 ? <MobileView /> : <DesktopView />}
       </div>
     );
   }
   ```

8. **How do you manage state in React?**
   - Explain the differences and use cases for various state management approaches like Redux, Context API, etc.
   
   **Answer:**
   React offers several approaches to state management, each with its own strengths and use cases:
   
   **1. Component State (useState/this.state)**
   - Local state management within components
   - Best for simple applications or component-specific state
   - Easy to implement but can lead to prop drilling in complex apps
   
   **2. Context API**
   - Built-in solution for sharing state without prop drilling
   - Good for medium-sized applications or theme/authentication state
   - Simpler than Redux but can cause performance issues with frequent updates
   
   ```javascript
   // Creating context
   const ThemeContext = React.createContext('light');
   
   // Provider component
   function App() {
     const [theme, setTheme] = useState('light');
     
     return (
       <ThemeContext.Provider value={{ theme, setTheme }}>
         <MainContent />
       </ThemeContext.Provider>
     );
   }
   
   // Consumer component
   function ThemedButton() {
     const { theme, setTheme } = useContext(ThemeContext);
     
     return (
       <button
         style={{ background: theme === 'light' ? '#fff' : '#333', color: theme === 'light' ? '#333' : '#fff' }}
         onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
       >
         Toggle Theme
       </button>
     );
   }
   ```
   
   **3. Redux**
   - Centralized state management with predictable state container
   - Best for large applications with complex state logic
   - Provides powerful debugging tools and middleware support
   - Has a steeper learning curve and more boilerplate code
   
   ```javascript
   // Action types
   const INCREMENT = 'INCREMENT';
   
   // Action creators
   const increment = () => ({ type: INCREMENT });
   
   // Reducer
   const counterReducer = (state = { count: 0 }, action) => {
     switch (action.type) {
       case INCREMENT:
         return { count: state.count + 1 };
       default:
         return state;
     }
   };
   
   // Store
   const store = createStore(counterReducer);
   
   // Component
   function Counter() {
     const count = useSelector(state => state.count);
     const dispatch = useDispatch();
     
     return (
       <div>
         <p>Count: {count}</p>
         <button onClick={() => dispatch(increment())}>Increment</button>
       </div>
     );
   }
   ```
   
   **4. MobX**
   - Reactive state management approach
   - Less boilerplate code
   - Object-oriented approach
   
   **5. Recoil**
   - State management library developed by Facebook
   - API optimized for React
   - Strong support for asynchronous state management
   
   **Selection criteria:**
   - Application size and complexity
   - Team familiarity
   - Performance requirements
   - Development productivity
   - Maintainability

9. **How do you optimize performance in React?**
   - Explain techniques like memoization, virtualization, and code splitting.
   
   **Answer:**
   Performance optimization in React involves several techniques:
   
   **1. Memoization with React.memo, useMemo, and useCallback**
   - Prevent unnecessary re-renders of components
   - Memoize expensive calculations and callback functions
   
   ```javascript
   // React.memo for component memoization
   const MemoizedComponent = React.memo(function MyComponent(props) {
     // Only re-renders if props change
     return <div>{props.name}</div>;
   });
   
   // useMemo for expensive calculations
   function Component({ items, filter }) {
     // Only recalculates when items or filter changes
     const filteredItems = useMemo(() => {
       console.log('Filtering items...');
       return items.filter(item => item.includes(filter));
     }, [items, filter]);
     
     return <div>{filteredItems.length} items found</div>;
   }
   
   // useCallback for stable callback references
   function Parent() {
     const [count, setCount] = useState(0);
     
     // Only creates new function when dependencies change
     const handleClick = useCallback(() => {
       console.log('Button clicked');
     }, []); // Empty dependency array means function never changes
     
     return <Child onClick={handleClick} />;
   }
   ```
   
   **2. Virtualization for Long Lists**
   - Render only visible items in long lists
   - Use libraries like react-window or react-virtualized
   
   ```javascript
   import { FixedSizeList } from 'react-window';
   
   function VirtualizedList({ items }) {
     const Row = ({ index, style }) => (
       <div style={style}>Item {items[index]}</div>
     );
     
     return (
       <FixedSizeList
         height={500}
         width={300}
         itemCount={items.length}
         itemSize={35}
       >
         {Row}
       </FixedSizeList>
     );
   }
   ```
   
   **3. Code Splitting**
   - Dynamic imports with React.lazy and Suspense
   - Load code at the moment it's needed to reduce initial loading time
   
   ```javascript
   import React, { Suspense, lazy } from 'react';
   
   // Dynamic import
   const HeavyComponent = lazy(() => import('./HeavyComponent'));
   
   function App() {
     return (
       <div>
         <Suspense fallback={<div>Loading...</div>}>
           <HeavyComponent />
         </Suspense>
       </div>
     );
   }
   ```
   
   **4. Maintaining Immutability**
   - Maintain immutability when updating state to optimize change detection
   - Use libraries like Immer
   
   ```javascript
   // Incorrect way (violates immutability)
   const handleClick = () => {
     const newItems = items;
     newItems.push('New item');
     setItems(newItems); // Reference is the same, React won't detect change
   };
   
   // Correct way (maintains immutability)
   const handleClick = () => {
     setItems([...items, 'New item']); // Creates new array
   };
   ```
   
   **5. State Normalization**
   - Use normalized state structures instead of nested ones
   - Prevents unnecessary re-renders and optimizes state updates
   
   **6. Using Rendering Optimization Tools**
   - Analyze performance with React DevTools Profiler
   - Detect unnecessary renders with libraries like why-did-you-render

10. **Explain React Router.**
    - What is client-side routing and what are its advantages?
    
    **Answer:**
    React Router is a library for implementing client-side routing in React applications. It manages navigation between pages and maps URLs to components.
    
    **Key features:**
    - Declarative routing definition
    - Support for nested routing
    - Dynamic routing parameters
    - Route protection and redirection
    - History management
    
    ```javascript
    import { BrowserRouter, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
    
    function App() {
      return (
        <BrowserRouter>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/users">User List</Link>
          </nav>
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/users/:id" element={<UserDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      );
    }
    
    // Using dynamic routing parameters
    function UserDetail() {
      const { id } = useParams();
      const navigate = useNavigate();
      
      return (
        <div>
          <h2>User {id} Details</h2>
          <button onClick={() => navigate('/users')}>Back to List</button>
        </div>
      );
    }
    ```
    
    **Client-Side Routing:**
    Client-side routing is the process of handling page transitions in the browser using JavaScript, without requesting new pages from the server.
    
    **Advantages:**
    - Faster page transitions (no server requests)
    - Smoother user experience (no page refreshes)
    - State preservation (application state is maintained between page transitions)
    - Reduced server load
    - Enables Single Page Application (SPA) architecture
    
    **Disadvantages:**
    - Initial load time may be longer (needs to load all JavaScript)
    - SEO can be more complex (can be addressed with server-side rendering)
    - Requires browser history management

11. **In React, is state mutable?**
    - Why shouldn't you mutate state directly?
    
    **Answer:**
    In React, you should treat state as **immutable**, even though JavaScript objects and arrays are technically mutable.
    
    **Why you shouldn't mutate state directly**
    React often detects changes by checking whether the **reference** has changed.
    If you mutate an object or array in place, the reference stays the same, which can cause:
    - No re-render (or inconsistent re-renders)
    - Bugs with comparisons and memoization (`React.memo`, `useMemo`, `useCallback`)
    - Hard-to-debug side effects
    
    **Bad example (mutating)**
    ```tsx
    // Mutating existing state object/array
    state.count += 1;
    state.items.push(newItem);
    setState(state); // Same reference as before
    ```
    
    In this case, React may not detect that anything has changed because the `state` reference is identical.
    
    **Good example (create a new value)**
    ```tsx
    // Update primitive state
    setCount(c => c + 1);
    
    // Update object state by creating a new object
    setState(prev => ({
      ...prev,
      count: prev.count + 1,
    }));
    
    // Update array state by creating a new array
    setItems(prev => [...prev, newItem]);
    ```
    
    The key idea is to **always create a new object or array** instead of mutating the existing one.
    This ensures React sees that the reference has changed and triggers the appropriate re-renders.
