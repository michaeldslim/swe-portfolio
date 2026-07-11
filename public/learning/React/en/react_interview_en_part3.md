# React Developer Interview Questions - Part 3

## Advanced Concepts (Continued)

16. **What are the methods for CSS styling in React?**
    - Explain the advantages and disadvantages of various styling approaches.
    
    **Answer:**
    There are several ways to style components in React. Each approach has its own advantages and disadvantages, and you can choose based on your project requirements.
    
    **1. Inline Styles**
    ```jsx
    function Button() {
      const buttonStyle = {
        backgroundColor: 'blue',
        color: 'white',
        padding: '10px 15px',
        borderRadius: '4px',
        border: 'none',
        cursor: 'pointer'
      };
      
      return <button style={buttonStyle}>Click</button>;
    }
    ```
    
    **Advantages:**
    - Easy integration of JavaScript and style logic
    - Simple dynamic styling
    - No additional setup required
    
    **Disadvantages:**
    - No direct support for CSS pseudo-classes (:hover, etc.)
    - Cannot use media queries
    - No caching benefits
    - Difficult to reuse styles
    
    **2. CSS Classes and External Stylesheets**
    ```jsx
    // Button.css
    .button {
      background-color: blue;
      color: white;
      padding: 10px 15px;
      border-radius: 4px;
      border: none;
      cursor: pointer;
    }
    
    .button:hover {
      background-color: darkblue;
    }
    
    // Button.jsx
    import './Button.css';
    
    function Button() {
      return <button className="button">Click</button>;
    }
    ```
    
    **Advantages:**
    - Can leverage existing CSS knowledge
    - Access to all CSS features
    - Browser caching benefits
    
    **Disadvantages:**
    - Global namespace (potential class name collisions)
    - Loose coupling between components and styles
    - Difficult to remove unused styles
    
    **3. CSS Modules**
    ```jsx
    // Button.module.css
    .button {
      background-color: blue;
      color: white;
      padding: 10px 15px;
      border-radius: 4px;
      border: none;
      cursor: pointer;
    }
    
    .button:hover {
      background-color: darkblue;
    }
    
    // Button.jsx
    import styles from './Button.module.css';
    
    function Button() {
      return <button className={styles.button}>Click</button>;
    }
    ```
    
    **Advantages:**
    - Local scope class names (automatically generates unique prefixes)
    - Uses standard CSS syntax
    - Supports all CSS features
    
    **Disadvantages:**
    - Requires additional work for dynamic styling
    - Can get complex when combining class names as strings
    
    **4. CSS-in-JS (styled-components, emotion, etc.)**
    ```jsx
    // Using styled-components
    import styled from 'styled-components';
    
    const StyledButton = styled.button`
      background-color: ${props => props.primary ? 'blue' : 'gray'};
      color: white;
      padding: 10px 15px;
      border-radius: 4px;
      border: none;
      cursor: pointer;
      
      &:hover {
        background-color: ${props => props.primary ? 'darkblue' : 'darkgray'};
      }
    `;
    
    function Button({ primary, children }) {
      return <StyledButton primary={primary}>{children}</StyledButton>;
    }
    ```
    
    **Advantages:**
    - Strong coupling between components and styles
    - Easy props-based dynamic styling
    - Direct use of JavaScript variables/functions in styles
    - Automatic vendor prefixing
    - Automatic removal of unused styles
    
    **Disadvantages:**
    - Increased bundle size
    - Additional dependencies required
    - Potential runtime overhead
    - May be difficult to integrate with existing CSS tools
    
    **5. Utility-First CSS (Tailwind CSS, etc.)**
    ```jsx
    // Using Tailwind CSS
    function Button({ primary }) {
      const baseClasses = "px-4 py-2 rounded border-none cursor-pointer";
      const colorClasses = primary 
        ? "bg-blue-500 hover:bg-blue-700 text-white" 
        : "bg-gray-200 hover:bg-gray-400 text-gray-800";
      
      return (
        <button className={`${baseClasses} ${colorClasses}`}>
          Click
        </button>
      );
    }
    ```
    
    **Advantages:**
    - No need to think about class names
    - Consistent design system
    - Easy to implement responsive design
    - Direct styling within HTML
    
    **Disadvantages:**
    - Steep learning curve
    - HTML can become long and complex
    - Additional configuration needed for customization
    
    **Selection Criteria:**
    - Team familiarity and preferences
    - Project size and complexity
    - Performance requirements
    - Presence of a design system
    - Need for dynamic styling

17. **What are Error Boundaries in React?**
    - Explain error handling patterns and best practices.
    
    **Answer:**
    Error Boundaries are a feature introduced in React 16 that catch JavaScript errors in the component tree, display a fallback UI, and prevent the entire application from crashing.
    
    **Implementing Error Boundaries:**
    ```jsx
    class ErrorBoundary extends React.Component {
      constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
      }
      
      static getDerivedStateFromError(error) {
        // Update state to show fallback UI
        return { hasError: true, error };
      }
      
      componentDidCatch(error, errorInfo) {
        // Log error information
        console.error("ErrorBoundary caught:", error, errorInfo);
        this.setState({ error, errorInfo });
        
        // Report to external error logging service
        // logErrorToService(error, errorInfo);
      }
      
      render() {
        if (this.state.hasError) {
          // Custom fallback UI
          return (
            <div className="error-container">
              <h2>Something went wrong.</h2>
              <p>{this.state.error && this.state.error.toString()}</p>
              
              {this.state.errorInfo && (
                <details style={{ whiteSpace: 'pre-wrap' }}>
                  <summary>Component Stack</summary>
                  {this.state.errorInfo.componentStack}
                </details>
              )}
            </div>
          );
        }
        
        // If no error, render children normally
        return this.props.children;
      }
    }
    
    // Usage example
    function App() {
      return (
        <div>
          <h1>Application</h1>
          <ErrorBoundary>
            <MyComponent />
          </ErrorBoundary>
        </div>
      );
    }
    ```
    
    **Limitations of Error Boundaries:**
    Error Boundaries do not catch errors in:
    - Event handlers
    - Asynchronous code (setTimeout, fetch, etc.)
    - Server-side rendering
    - Errors in the Error Boundary itself
    
    **Effective Usage Patterns:**
    
    **1. Strategic Placement**
    ```jsx
    function App() {
      return (
        <div>
          {/* Top-level Error Boundary wrapping the entire app */}
          <ErrorBoundary>
            <Header />
            
            {/* Main content area */}
            <main>
              {/* Error Boundaries for each major section */}
              <ErrorBoundary>
                <UserProfile />
              </ErrorBoundary>
              
              <ErrorBoundary>
                <ProductList />
              </ErrorBoundary>
              
              <ErrorBoundary>
                <Comments />
              </ErrorBoundary>
            </main>
            
            <Footer />
          </ErrorBoundary>
        </div>
      );
    }
    ```
    
    **2. Custom Error Handling Per Component**
    ```jsx
    // Data loading failure specific Error Boundary
    function DataErrorFallback({ error, resetErrorBoundary }) {
      return (
        <div role="alert">
          <p>An error occurred while loading data:</p>
          <pre>{error.message}</pre>
          <button onClick={resetErrorBoundary}>Try Again</button>
        </div>
      );
    }
    
    // Usage example (using react-error-boundary library)
    import { ErrorBoundary } from 'react-error-boundary';
    
    function UserProfile({ userId }) {
      return (
        <ErrorBoundary
          FallbackComponent={DataErrorFallback}
          onReset={() => {
            // Logic to reset error state
          }}
          resetKeys={[userId]}
        >
          <UserData userId={userId} />
        </ErrorBoundary>
      );
    }
    ```
    
    **3. Error Handling in Event Handlers**
    ```jsx
    function MyComponent() {
      const [error, setError] = useState(null);
      
      const handleClick = () => {
        try {
          // Code that might throw an error
          someRiskyOperation();
        } catch (error) {
          setError(error);
          // Report to error logging service
          logError(error);
        }
      };
      
      if (error) {
        return <ErrorDisplay error={error} reset={() => setError(null)} />;
      }
      
      return <button onClick={handleClick}>Execute Operation</button>;
    }
    ```
    
    **4. Error Handling in Asynchronous Code**
    ```jsx
    function AsyncComponent() {
      const [data, setData] = useState(null);
      const [error, setError] = useState(null);
      const [loading, setLoading] = useState(true);
      
      useEffect(() => {
        let isMounted = true;
        
        async function fetchData() {
          try {
            setLoading(true);
            const response = await fetch('/api/data');
            
            if (!response.ok) {
              throw new Error('API response error: ' + response.status);
            }
            
            const result = await response.json();
            
            if (isMounted) {
              setData(result);
              setError(null);
            }
          } catch (error) {
            if (isMounted) {
              setError(error);
              // Report to error logging service
              logError(error);
            }
          } finally {
            if (isMounted) {
              setLoading(false);
            }
          }
        }
        
        fetchData();
        
        return () => {
          isMounted = false;
        };
      }, []);
      
      if (loading) return <LoadingSpinner />;
      if (error) return <ErrorDisplay error={error} />;
      if (!data) return <EmptyState />;
      
      return <DataDisplay data={data} />;
    }
    ```
    
    **Best Practices:**
    - Place multiple Error Boundaries at strategic locations
    - Show detailed error information in development, user-friendly messages in production
    - Provide recovery mechanisms (retry buttons, etc.)
    - Integrate with external error monitoring services
    - Prioritize error handling for critical user actions
