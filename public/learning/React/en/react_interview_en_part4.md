# React Developer Interview Questions - Part 4

## Advanced Concepts (Continued)

18. **What are the differences between React.memo, useMemo, and useCallback?**
    - Explain when to use each one.
    
    **Answer:**
    React.memo, useMemo, and useCallback are all tools for optimizing performance in React applications, but they serve different purposes.
    
    **1. React.memo**
    - A higher-order component (HOC) that memoizes the component itself
    - Prevents re-rendering when props don't change
    - Stores the rendering result in memory
    
    ```jsx
    // Basic usage
    const MyComponent = React.memo(function MyComponent(props) {
      // Component logic
      return (
        <div>
          <h2>{props.name}</h2>
          <p>{props.description}</p>
        </div>
      );
    });
    
    // Using custom comparison function
    const areEqual = (prevProps, nextProps) => {
      // Return true to prevent re-render
      // Return false to allow re-render
      return prevProps.id === nextProps.id;
    };
    
    const MemoizedComponent = React.memo(MyComponent, areEqual);
    ```
    
    **When to use:**
    - For components that re-render frequently with the same props
    - For components with expensive rendering
    - When a parent component re-renders frequently but the child's props don't change often
    
    **2. useMemo**
    - A hook that memoizes expensive calculated values
    - Recalculates the value only when specified dependencies change
    - Optimizes values calculated during rendering
    
    ```jsx
    function ExpensiveCalculation({ a, b, c }) {
      // Calculation runs only when a or b changes
      const expensiveValue = useMemo(() => {
        console.log('Running expensive calculation...');
        // Computationally expensive operation
        return computeExpensiveValue(a, b);
      }, [a, b]);
      
      return (
        <div>
          <p>Calculation result: {expensiveValue}</p>
          <p>Other prop: {c}</p>
        </div>
      );
    }
    ```
    
    **When to use:**
    - For caching results of expensive calculations
    - When you need to maintain object reference equality
    - When creating objects that will be passed as props to child components
    
    **3. useCallback**
    - A hook that memoizes function instances
    - Recreates the function only when specified dependencies change
    - Maintains function reference equality
    
    ```jsx
    function ParentComponent() {
      const [count, setCount] = useState(0);
      const [text, setText] = useState('');
      
      // Function recreated only when text changes
      const handleTextChange = useCallback((e) => {
        setText(e.target.value);
        console.log(`Text changed: ${e.target.value}`);
      }, []);
      
      // Function recreated only when count changes
      const handleIncrement = useCallback(() => {
        setCount(c => c + 1);
        console.log('Count increased');
      }, []);
      
      return (
        <div>
          <p>Count: {count}</p>
          <button onClick={handleIncrement}>Increment</button>
          
          <ChildComponent 
            text={text} 
            onTextChange={handleTextChange} 
          />
        </div>
      );
    }
    
    // Child component optimized with React.memo
    const ChildComponent = React.memo(function ChildComponent({ text, onTextChange }) {
      console.log('ChildComponent rendering');
      
      return (
        <input 
          type="text" 
          value={text} 
          onChange={onTextChange} 
        />
      );
    });
    ```
    
    **When to use:**
    - When passing event handler functions as props to child components
    - For functions used in useEffect dependency arrays
    - When passing callback functions to memoized components (React.memo)
    
    **Key Differences:**
    
    | Feature | React.memo | useMemo | useCallback |
    |---------|------------|---------|------------|
    | Type | Higher-Order Component | Hook | Hook |
    | Memoizes | Component render output | Computed value | Function instance |
    | Purpose | Prevent component re-renders | Cache expensive calculations | Maintain function references |
    | Usage | Wrap components | Compute values | Create stable callbacks |
    | Dependencies | Props | Specified dependencies | Specified dependencies |
    
    **Best Practices:**
    - Don't overuse these optimizations - they come with their own overhead
    - Use profiling to identify actual performance bottlenecks first
    - Don't apply indiscriminately without measuring performance
    - Optimization effects may not be noticeable in development mode
    - Verify actual performance improvements with React DevTools Profiler

19. **What is Server-Side Rendering (SSR) in React?**
    - Explain the advantages, disadvantages, and implementation methods of SSR.
    
    **Answer:**
    Server-Side Rendering (SSR) is the process of rendering React components on the server and sending the resulting HTML to the client. The client then "hydrates" this HTML with JavaScript to make it interactive.
    
    **Implementation Methods:**
    
    **1. Manual Implementation with React DOM Server**
    ```jsx
    // server.js
    import express from 'express';
    import React from 'react';
    import { renderToString } from 'react-dom/server';
    import App from './App';
    
    const app = express();
    
    app.get('*', (req, res) => {
      // Render React component to HTML string
      const appHtml = renderToString(<App />);
      
      // HTML to send to the client
      const html = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>React SSR</title>
          </head>
          <body>
            <div id="root">${appHtml}</div>
            <script src="/bundle.js"></script>
          </body>
        </html>
      `;
      
      res.send(html);
    });
    
    app.listen(3000, () => {
      console.log('Server running...');
    });
    
    // client.js (client-side hydration)
    import React from 'react';
    import { hydrateRoot } from 'react-dom/client';
    import App from './App';
    
    hydrateRoot(
      document.getElementById('root'),
      <App />
    );
    ```
    
    **2. Using Next.js (most popular React SSR framework)**
    ```jsx
    // pages/index.js
    import { useState } from 'react';
    
    // Function that runs on the server
    export async function getServerSideProps() {
      // Fetch data from external API
      const res = await fetch('https://api.example.com/data');
      const data = await res.json();
      
      // Pass data to the page via props
      return {
        props: {
          data
        }
      };
    }
    
    // Component renders on both server and client
    export default function Home({ data }) {
      const [count, setCount] = useState(0);
      
      return (
        <div>
          <h1>Data from server</h1>
          <pre>{JSON.stringify(data, null, 2)}</pre>
          
          <h2>Client interaction</h2>
          <p>Count: {count}</p>
          <button onClick={() => setCount(count + 1)}>Increment</button>
        </div>
      );
    }
    ```
    
    **3. Using Remix**
    ```jsx
    // app/routes/index.jsx
    import { json } from '@remix-run/node';
    import { useLoaderData } from '@remix-run/react';
    
    // Loader function runs on the server
    export async function loader() {
      const res = await fetch('https://api.example.com/data');
      const data = await res.json();
      return json({ data });
    }
    
    // Component
    export default function Index() {
      const { data } = useLoaderData();
      
      return (
        <div>
          <h1>Remix SSR Example</h1>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      );
    }
    ```
    
    **Advantages of SSR:**
    - **Improved initial loading performance**: Users see complete HTML immediately
    - **Better SEO**: Search engines can crawl fully rendered content
    - **Social media sharing optimization**: Pre-rendered meta tags provide rich previews when links are shared
    - **Faster initial rendering on slow devices**: Content displays before JavaScript execution
    - **Enhanced accessibility**: Basic content available even when JavaScript is disabled
    
    **Disadvantages of SSR:**
    - **Increased server load**: Server must perform rendering work for each request
    - **Implementation complexity**: Code must work on both server and client
    - **Hydration delay**: Large apps may take time to become interactive after JavaScript loads
    - **Server environment limitations**: Browser-only APIs require special handling
    - **More complex development setup**: Build and deployment processes become more complicated
    
    **Alternatives and Related Techniques:**
    - **Static Site Generation (SSG)**: Generate HTML at build time (Next.js, Gatsby)
    - **Incremental Static Regeneration (ISR)**: SSG + periodic regeneration (Next.js)
    - **Client-Side Rendering (CSR)**: Traditional SPA approach
    - **Streaming SSR**: Progressive transmission of HTML in chunks (React 18+)
    
    **When to Use SSR:**
    - Public websites where SEO is important
    - Applications where initial loading performance is critical
    - Content frequently shared on social media
    - Services with many users on slow devices or networks
