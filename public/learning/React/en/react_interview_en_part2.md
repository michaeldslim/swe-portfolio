# React Developer Interview Questions - Part 2

## Advanced Concepts

11. **How do you handle forms in React?**
    - What are the differences between controlled and uncontrolled components?
    
    **Answer:**
    In React, there are two main approaches to handling forms: controlled components and uncontrolled components.
    
    **Controlled Components:**
    - Form data is controlled by React component state
    - State is updated on every input change
    - Provides more control for data validation, conditional rendering, etc.
    
    ```javascript
    function ControlledForm() {
      const [name, setName] = useState('');
      const [email, setEmail] = useState('');
      
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitted data:', { name, email });
      };
      
      return (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      );
    }
    ```
    
    **Uncontrolled Components:**
    - The DOM itself manages form data
    - Uses refs to get values from the DOM when needed
    - Simpler implementation and easier integration with non-React libraries
    
    ```javascript
    function UncontrolledForm() {
      const nameRef = useRef();
      const emailRef = useRef();
      
      const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
          name: nameRef.current.value,
          email: emailRef.current.value
        };
        console.log('Submitted data:', formData);
      };
      
      return (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input type="text" ref={nameRef} defaultValue="" />
          </div>
          <div>
            <label>Email:</label>
            <input type="email" ref={emailRef} defaultValue="" />
          </div>
          <button type="submit">Submit</button>
        </form>
      );
    }
    ```
    
    **Selection Criteria:**
    - Controlled components: When you need immediate validation, conditional rendering, dynamic input constraints
    - Uncontrolled components: For simple forms, file inputs, or integration with external DOM libraries

12. **How do you handle HTTP requests in React?**
    - Explain different methods for data fetching and their pros and cons.
    
    **Answer:**
    There are several ways to handle HTTP requests in React, each with its own characteristics and use cases.
    
    **1. Fetch API (built into browsers)**
    ```javascript
    function FetchExample() {
      const [data, setData] = useState(null);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);
      
      useEffect(() => {
        fetch('https://api.example.com/data')
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            setData(data);
            setLoading(false);
          })
          .catch(error => {
            setError(error.message);
            setLoading(false);
          });
      }, []);
      
      if (loading) return <div>Loading...</div>;
      if (error) return <div>Error: {error}</div>;
      
      return <div>Data: {JSON.stringify(data)}</div>;
    }
    ```
    
    **Pros:** No additional installation needed, provides basic functionality
    **Cons:** Complex error handling, limited request cancellation features
    
    **2. Axios (library)**
    ```javascript
    import axios from 'axios';
    
    function AxiosExample() {
      const [data, setData] = useState(null);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);
      
      useEffect(() => {
        // Create a cancellation token
        const cancelToken = axios.CancelToken.source();
        
        axios.get('https://api.example.com/data', {
          cancelToken: cancelToken.token
        })
          .then(response => {
            setData(response.data);
            setLoading(false);
          })
          .catch(error => {
            if (axios.isCancel(error)) {
              console.log('Request cancelled:', error.message);
            } else {
              setError(error.message);
              setLoading(false);
            }
          });
        
        // Cleanup function
        return () => {
          cancelToken.cancel('Component unmounted');
        };
      }, []);
      
      if (loading) return <div>Loading...</div>;
      if (error) return <div>Error: {error}</div>;
      
      return <div>Data: {JSON.stringify(data)}</div>;
    }
    ```
    
    **Pros:** Automatic JSON parsing, request/response interceptors, better error handling, request cancellation, browser compatibility
    **Cons:** Additional dependency required
    
    **3. React Query / SWR (data fetching libraries)**
    ```javascript
    import { useQuery } from 'react-query';
    
    // API call function
    const fetchData = async () => {
      const response = await fetch('https://api.example.com/data');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    };
    
    function ReactQueryExample() {
      const { data, isLoading, error } = useQuery('data', fetchData, {
        refetchOnWindowFocus: true,
        retry: 3,
        staleTime: 5000
      });
      
      if (isLoading) return <div>Loading...</div>;
      if (error) return <div>Error: {error.message}</div>;
      
      return <div>Data: {JSON.stringify(data)}</div>;
    }
    ```
    
    **Pros:** Caching, automatic retries, background updates, pagination support
    **Cons:** Additional dependency, learning curve
    
    **4. Custom Hooks**
    ```javascript
    // Custom Hook
    function useFetch(url) {
      const [data, setData] = useState(null);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);
      
      useEffect(() => {
        let isMounted = true;
        const abortController = new AbortController();
        
        async function fetchData() {
          try {
            setLoading(true);
            
            const response = await fetch(url, {
              signal: abortController.signal
            });
            
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            
            const result = await response.json();
            
            if (isMounted) {
              setData(result);
              setError(null);
              setLoading(false);
            }
          } catch (error) {
            if (error.name !== 'AbortError' && isMounted) {
              setError(error.message);
              setLoading(false);
            }
          }
        }
        
        fetchData();
        
        return () => {
          isMounted = false;
          abortController.abort();
        };
      }, [url]);
      
      return { data, loading, error };
    }
    
    // Usage example
    function CustomHookExample() {
      const { data, loading, error } = useFetch('https://api.example.com/data');
      
      if (loading) return <div>Loading...</div>;
      if (error) return <div>Error: {error}</div>;
      
      return <div>Data: {JSON.stringify(data)}</div>;
    }
    ```
    
    **Pros:** Reusability, separation of concerns, customized logic
    **Cons:** Requires manual implementation, advanced features need to be added manually

13. **How do you use React with TypeScript?**
    - Explain the benefits and key type patterns when using TypeScript.
    
    **Answer:**
    TypeScript enhances React development by adding static type checking, which helps catch errors during development rather than at runtime. It improves code quality, documentation, and developer experience.
    
    **Benefits of using TypeScript with React:**
    - Early error detection
    - Better IDE support (autocomplete, refactoring)
    - Improved code documentation
    - Type safety for props, state, and events
    - Enhanced team collaboration
    - Safer refactoring
    
    **Key Type Patterns:**
    
    **1. Component Props Typing**
    ```tsx
    // Interface for props
    interface UserProps {
      name: string;
      age: number;
      isAdmin?: boolean; // Optional prop
      onLogout: () => void; // Function prop
    }
    
    // Using the interface
    const UserProfile: React.FC<UserProps> = ({ name, age, isAdmin = false, onLogout }) => {
      return (
        <div>
          <h2>{name} ({age})</h2>
          {isAdmin && <p>Admin User</p>}
          <button onClick={onLogout}>Logout</button>
        </div>
      );
    };
    
    // Or more concisely
    function UserProfile({ name, age, isAdmin = false, onLogout }: UserProps) {
      // ...
    }
    ```
    
    **2. State Type Definitions**
    ```tsx
    // Basic types
    const [count, setCount] = useState<number>(0);
    
    // Object types
    interface User {
      id: number;
      name: string;
      email: string;
    }
    
    const [user, setUser] = useState<User | null>(null);
    
    // Array types
    const [items, setItems] = useState<string[]>([]);
    ```
    
    **3. Event Handling**
    ```tsx
    // Input events
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value);
    };
    
    // Form submission
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      // Process form
    };
    
    // Button click
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      console.log('Button clicked');
    };
    ```
    
    **4. Generic Components**
    ```tsx
    // Generic list component
    interface ListProps<T> {
      items: T[];
      renderItem: (item: T) => React.ReactNode;
    }
    
    function List<T>({ items, renderItem }: ListProps<T>) {
      return (
        <ul>
          {items.map((item, index) => (
            <li key={index}>{renderItem(item)}</li>
          ))}
        </ul>
      );
    }
    
    // Usage
    <List
      items={[1, 2, 3, 4]}
      renderItem={(item) => <span>{item * 2}</span>}
    />
    ```
    
    **5. Type Guards**
    ```tsx
    type AdminUser = {
      id: number;
      name: string;
      role: 'admin';
      permissions: string[];
    };
    
    type RegularUser = {
      id: number;
      name: string;
      role: 'user';
    };
    
    type User = AdminUser | RegularUser;
    
    function UserPermissions({ user }: { user: User }) {
      // Type guard
      if (user.role === 'admin') {
        // TypeScript knows this is AdminUser
        return (
          <div>
            <h2>Admin: {user.name}</h2>
            <p>Permissions: {user.permissions.join(', ')}</p>
          </div>
        );
      }
      
      // TypeScript knows this is RegularUser
      return (
        <div>
          <h2>User: {user.name}</h2>
          <p>Regular user account</p>
        </div>
      );
    }
    ```
    
    **Best Practices:**
    - Minimize use of `any` type
    - Leverage type inference when appropriate
    - Use type assertions only when necessary
    - Check for library type definitions (@types/*)

14. **How do you test React components?**
    - Explain the differences between unit testing and integration testing, and the tools used.
    
    **Answer:**
    Testing React components is crucial for ensuring application reliability and maintainability. There are different testing approaches and tools available.
    
    **Types of Tests:**
    
    **Unit Tests:**
    - Test individual components in isolation
    - Mock dependencies and external interactions
    - Focus on component logic and rendering
    - Faster execution and easier to maintain
    
    **Integration Tests:**
    - Test how multiple components work together
    - Less mocking, more realistic interactions
    - Test component communication and state management
    - Closer to real user experience
    
    **Testing Libraries:**
    
    **1. Jest:**
    - JavaScript testing framework
    - Built-in assertion library
    - Mocking capabilities
    - Code coverage reports
    - Snapshot testing support
    
    **2. React Testing Library:**
    - Encourages testing from user perspective (behavior-driven)
    - Access to actual HTML elements instead of DOM nodes
    - Focuses on accessibility and user interactions
    - Discourages testing implementation details
    
    **3. Enzyme:**
    - Provides more direct access to component internals
    - Allows testing of component lifecycle methods
    - Can shallow render components for isolation
    - More implementation-focused testing
    
    **Example Tests:**
    
    **Unit Test with React Testing Library:**
    ```jsx
    import { render, screen, fireEvent } from '@testing-library/react';
    import Counter from './Counter';
    
    test('counter increments when button is clicked', () => {
      // Render the component
      render(<Counter initialCount={0} />);
      
      // Find elements
      const counterValue = screen.getByTestId('counter-value');
      const incrementButton = screen.getByRole('button', { name: /increment/i });
      
      // Assert initial state
      expect(counterValue).toHaveTextContent('0');
      
      // Interact with the component
      fireEvent.click(incrementButton);
      
      // Assert updated state
      expect(counterValue).toHaveTextContent('1');
    });
    ```
    
    **Integration Test:**
    ```jsx
    import { render, screen, fireEvent } from '@testing-library/react';
    import UserProfile from './UserProfile';
    import UserContext from './UserContext';
    
    test('user profile displays and updates user information', () => {
      // Mock user data
      const user = { id: 1, name: 'John Doe', email: 'john@example.com' };
      const updateUser = jest.fn();
      
      // Render with context
      render(
        <UserContext.Provider value={{ user, updateUser }}>
          <UserProfile />
        </UserContext.Provider>
      );
      
      // Check if user info is displayed
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('john@example.com')).toBeInTheDocument();
      
      // Interact with edit functionality
      fireEvent.click(screen.getByRole('button', { name: /edit/i }));
      
      // Find the name input and change it
      const nameInput = screen.getByLabelText(/name/i);
      fireEvent.change(nameInput, { target: { value: 'Jane Doe' } });
      
      // Submit the form
      fireEvent.click(screen.getByRole('button', { name: /save/i }));
      
      // Check if updateUser was called with correct data
      expect(updateUser).toHaveBeenCalledWith({
        ...user,
        name: 'Jane Doe'
      });
    });
    ```
    
    **Snapshot Testing:**
    ```jsx
    import { render } from '@testing-library/react';
    import Button from './Button';
    
    test('Button component matches snapshot', () => {
      const { container } = render(<Button label="Click me" />);
      expect(container).toMatchSnapshot();
    });
    ```
    
    **Testing Best Practices:**
    - Test behavior, not implementation
    - Write maintainable tests (avoid brittle selectors)
    - Use data-testid attributes for test-specific selectors
    - Test accessibility concerns
    - Aim for good coverage but focus on critical paths
    - Keep tests fast and independent

15. **How do you manage state in React applications?**
    - Compare Context API and Redux, and explain when to use each.
    
    **Answer:**
    State management is a critical aspect of React applications. Two popular approaches are the Context API (built into React) and Redux (an external library).
    
    **Context API:**
    - Built-in feature in React
    - Provides a way to pass data through the component tree
    - Suitable for solving props drilling issues
    - Useful for sharing simple state
    
    ```jsx
    // Create Context
    const ThemeContext = React.createContext({
      theme: 'light',
      toggleTheme: () => {}
    });
    
    // Provider Component
    function ThemeProvider({ children }) {
      const [theme, setTheme] = useState('light');
      
      const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
      };
      
      return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
          {children}
        </ThemeContext.Provider>
      );
    }
    
    // Consumer Component
    function ThemedButton() {
      const { theme, toggleTheme } = useContext(ThemeContext);
      
      return (
        <button
          style={{
            background: theme === 'light' ? '#fff' : '#333',
            color: theme === 'light' ? '#333' : '#fff'
          }}
          onClick={toggleTheme}
        >
          Toggle Theme
        </button>
      );
    }
    ```
    
    **Redux:**
    - Predictable state container
    - Stores application state in a single store
    - Composed of actions, reducers, and store concepts
    - Extensibility through middleware
    - Developer tools support
    
    ```jsx
    // Action Types
    const INCREMENT = 'INCREMENT';
    const DECREMENT = 'DECREMENT';
    
    // Action Creators
    const increment = () => ({ type: INCREMENT });
    const decrement = () => ({ type: DECREMENT });
    
    // Reducer
    const counterReducer = (state = { count: 0 }, action) => {
      switch (action.type) {
        case INCREMENT:
          return { ...state, count: state.count + 1 };
        case DECREMENT:
          return { ...state, count: state.count - 1 };
        default:
          return state;
      }
    };
    
    // Store
    const store = createStore(counterReducer);
    
    // Usage in React Component
    function Counter() {
      const count = useSelector(state => state.count);
      const dispatch = useDispatch();
      
      return (
        <div>
          <p>Count: {count}</p>
          <button onClick={() => dispatch(increment())}>Increase</button>
          <button onClick={() => dispatch(decrement())}>Decrease</button>
        </div>
      );
    }
    ```
    
    **Key Differences:**
    
    | Feature | Context API | Redux |
    |---------|-------------|-------|
    | Installation | Built-in | External library |
    | Complexity | Low | Medium to High |
    | Performance | Not optimized for frequently changing state | Optimized state updates |
    | Middleware | No built-in support | Strong middleware support |
    | Dev Tools | Limited | Comprehensive tooling |
    | State Structure | Can be distributed across multiple contexts | Single store recommended |
    | Debugging | Relatively difficult | Powerful features like time-travel debugging |
    
    **When to Use Each:**
    
    **Context API is suitable for:**
    - Small to medium-sized applications
    - Simple state management requirements
    - Avoiding props drilling in deep component trees
    - Infrequently changing data like themes, authentication state
    - When you need quick implementation with minimal setup
    
    **Redux is suitable for:**
    - Medium to large applications
    - Complex state logic
    - Frequently changing state with many updates
    - Need for side effect handling through middleware
    - Advanced debugging tools like time-travel debugging
    - When predictable state management is important
    
    **Recent Trends:**
    - Using Redux Toolkit to reduce Redux boilerplate code
    - Combining Context API with useReducer for Redux-like patterns
    - Mixing both approaches based on state management requirements
