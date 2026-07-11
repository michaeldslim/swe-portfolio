# JavaScript Developer Interview Questions (Practical Questions)

## Practical Questions

33. **Explain how to structure large-scale JavaScript applications.**
    
    **Description:** Large-scale JavaScript applications require proper structuring for maintainability and scalability. You can encapsulate code using the module pattern, separate UI with component-based architecture, and abstract business logic and API communications through service layers. It's important to centralize application state using state management libraries like Redux or MobX and improve code navigability through consistent folder structures. This structuring reduces code duplication, enhances testability, and facilitates collaboration between developers.
    
    **Example:**
    ```javascript
    // Large-scale application structuring examples
    
    // 1. Module pattern for structuring
    // userModule.js
    const userModule = (function() {
      // Private variables and functions
      let users = [];
      
      function validateUser(user) {
        return user.name && user.email;
      }
      
      // Public API
      return {
        addUser: function(user) {
          if (validateUser(user)) {
            users.push(user);
            return true;
          }
          return false;
        },
        
        getUsers: function() {
          return [...users]; // Return a copy of the original array
        },
        
        findUserByEmail: function(email) {
          return users.find(user => user.email === email);
        }
      };
    })();
    
    // 2. Component-based architecture (React example)
    // components/UserList.js
    import React, { useState, useEffect } from 'react';
    import UserService from '../services/UserService';
    import UserItem from './UserItem';
    
    function UserList() {
      const [users, setUsers] = useState([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);
      
      useEffect(() => {
        async function fetchUsers() {
          try {
            setLoading(true);
            const data = await UserService.getUsers();
            setUsers(data);
            setError(null);
          } catch (err) {
            setError('Failed to fetch users');
            console.error(err);
          } finally {
            setLoading(false);
          }
        }
        
        fetchUsers();
      }, []);
      
      if (loading) return <div>Loading...</div>;
      if (error) return <div>Error: {error}</div>;
      
      return (
        <div className="user-list">
          <h2>Users</h2>
          {users.length === 0 ? (
            <p>No users found</p>
          ) : (
            <ul>
              {users.map(user => (
                <UserItem key={user.id} user={user} />
              ))}
            </ul>
          )}
        </div>
      );
    }
    
    export default UserList;
    
    // 3. Service layer pattern
    // services/UserService.js
    import api from '../utils/api';
    
    class UserService {
      static async getUsers() {
        try {
          const response = await api.get('/users');
          return response.data;
        } catch (error) {
          console.error('Error fetching users:', error);
          throw error;
        }
      }
      
      static async getUserById(id) {
        try {
          const response = await api.get(`/users/${id}`);
          return response.data;
        } catch (error) {
          console.error(`Error fetching user ${id}:`, error);
          throw error;
        }
      }
      
      static async createUser(userData) {
        try {
          const response = await api.post('/users', userData);
          return response.data;
        } catch (error) {
          console.error('Error creating user:', error);
          throw error;
        }
      }
      
      // More methods...
    }
    
    export default UserService;
    
    // 4. State management with Redux
    // store/slices/userSlice.js
    import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
    import UserService from '../../services/UserService';
    
    export const fetchUsers = createAsyncThunk(
      'users/fetchUsers',
      async (_, { rejectWithValue }) => {
        try {
          return await UserService.getUsers();
        } catch (error) {
          return rejectWithValue(error.message);
        }
      }
    );
    
    const userSlice = createSlice({
      name: 'users',
      initialState: {
        items: [],
        status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
        error: null
      },
      reducers: {},
      extraReducers: (builder) => {
        builder
          .addCase(fetchUsers.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(fetchUsers.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.items = action.payload;
          })
          .addCase(fetchUsers.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
          });
      }
    });
    
    export default userSlice.reducer;
    
    // 5. Folder structure example
    /*
    /src
      /assets        - Images, fonts, and other static assets
      /components    - Reusable UI components
        /common      - Common components (buttons, input fields, etc.)
        /layout      - Layout-related components
        /features    - Feature-specific components
      /pages         - Page components
      /services      - Service layer for API communication
      /store         - State management (Redux)
        /slices      - Redux slices
        /selectors   - Redux selectors
      /hooks         - Custom React hooks
      /utils         - Utility functions
      /styles        - Global styles
      /types         - TypeScript type definitions
      /constants     - Constant definitions
      index.js       - Application entry point
    */
    ```

34. **What tools and methods do you use to maintain code quality?**
    - ESLint, Prettier, code reviews, etc.
    
    **Description:** Maintaining code quality is essential for building robust and maintainable JavaScript applications. ESLint helps enforce coding standards and catch potential errors through static code analysis, while Prettier ensures consistent code formatting. Code reviews facilitate knowledge sharing and identify issues before they reach production. Unit, integration, and end-to-end testing verify code functionality and prevent regressions. Continuous Integration (CI) automates testing and ensures that new changes don't break existing functionality. TypeScript adds static typing to catch type-related errors early. Documentation, including JSDoc comments, helps other developers understand code intent. Performance monitoring tools identify bottlenecks, and code complexity metrics highlight areas that need refactoring. Regular dependency updates address security vulnerabilities and keep the codebase modern. Code quality checklists provide a systematic way to evaluate code during reviews.
    
    **Example:**
    ```javascript
    // 1. ESLint configuration example (.eslintrc.js)
    module.exports = {
      env: {
        browser: true,
        es2021: true,
        node: true,
        jest: true,
      },
      extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'prettier',
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
      },
      plugins: [
        'react',
        'react-hooks',
        '@typescript-eslint',
        'jsx-a11y',
        'import',
        'prettier',
      ],
      rules: {
        // React rules
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'react/prop-types': 'off',
        'react/react-in-jsx-scope': 'off',
        
        // TypeScript rules
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
        
        // Import rules
        'import/order': ['error', { 'newlines-between': 'always', alphabetize: { order: 'asc' } }],
        
        // Prettier rules
        'prettier/prettier': ['error', {
          singleQuote: true,
          trailingComma: 'es5',
          printWidth: 100,
          tabWidth: 2,
          semi: true,
        }],
      },
      settings: {
        react: {
          version: 'detect',
        },
      },
    };
    
    // 2. Prettier configuration example (.prettierrc)
    /*
    {
      "singleQuote": true,
      "trailingComma": "es5",
      "printWidth": 100,
      "tabWidth": 2,
      "semi": true,
      "bracketSpacing": true,
      "arrowParens": "avoid"
    }
    */
    
    // 3. Jest unit test example
    // utils/math.js
    export function add(a, b) {
      return a + b;
    }
    
    // utils/math.test.js
    import { add } from './math';
    
    describe('Math utilities', () => {
      describe('add function', () => {
        test('adds two positive numbers correctly', () => {
          expect(add(1, 2)).toBe(3);
        });
        
        test('handles negative numbers', () => {
          expect(add(-1, -2)).toBe(-3);
          expect(add(-1, 2)).toBe(1);
        });
        
        test('handles zero', () => {
          expect(add(0, 0)).toBe(0);
          expect(add(0, 5)).toBe(5);
        });
      });
    });
    
    // 4. GitHub Actions CI/CD configuration example (.github/workflows/ci.yml)
    /*
    name: CI
    
    on:
      push:
        branches: [ main, develop ]
      pull_request:
        branches: [ main, develop ]
    
    jobs:
      build:
        runs-on: ubuntu-latest
        
        strategy:
          matrix:
            node-version: [14.x, 16.x]
        
        steps:
        - uses: actions/checkout@v2
        
        - name: Use Node.js ${{ matrix.node-version }}
          uses: actions/setup-node@v2
          with:
            node-version: ${{ matrix.node-version }}
            
        - name: Install dependencies
          run: npm ci
          
        - name: Lint
          run: npm run lint
          
        - name: Type check
          run: npm run type-check
          
        - name: Test
          run: npm test -- --coverage
          
        - name: Build
          run: npm run build
    */
    
    // 5. Code review checklist example
    /*
    ### Code Review Checklist
    
    ### Functionality
    - [ ] Does the code work as expected?
    - [ ] Are edge cases handled?
    - [ ] Is error handling appropriate?
    
    ### Code Quality
    - [ ] Is the code readable and maintainable?
    - [ ] Are there any code smells or anti-patterns?
    - [ ] Is there duplicate code that could be refactored?
    
    ### Performance
    - [ ] Are there any unnecessary calculations or renders?
    - [ ] Are there potential memory leaks?
    - [ ] Are there performance issues with large data sets?
    
    ### Testing
    - [ ] Are unit tests sufficient?
    - [ ] Is test coverage adequate?
    - [ ] Are important edge cases tested?
    
    ### Security
    - [ ] Is user input properly validated?
    - [ ] Is sensitive information protected?
    - [ ] Are authentication and authorization checks appropriate?
    */
    ```

35. **Describe design patterns you've used in JavaScript projects.**
    - Singleton, Observer, Factory, Module patterns, etc.
    
    **Description:** Design patterns are reusable solutions to common programming problems. In JavaScript projects, several patterns are commonly used. The Singleton pattern ensures a class has only one instance and provides global access to it, useful for configuration managers or connection pools. The Observer pattern establishes a one-to-many dependency between objects, allowing multiple observers to watch and react to changes in a subject, commonly used in event handling systems. The Factory pattern provides an interface for creating objects without specifying their concrete classes, enabling flexible object creation. The Module pattern encapsulates private data and exposes a public API, creating clean, maintainable code. Other useful patterns include the Decorator pattern for adding behaviors to objects dynamically, the Strategy pattern for selecting algorithms at runtime, and the Command pattern for encapsulating requests as objects. Proper use of these patterns improves code organization, reusability, and maintainability.
    
    **Example:**
    ```javascript
    // 1. Singleton Pattern
    class DatabaseConnection {
      constructor(connectionString) {
        if (DatabaseConnection.instance) {
          return DatabaseConnection.instance;
        }
        
        this.connectionString = connectionString;
        this.connected = false;
        DatabaseConnection.instance = this;
      }
      
      connect() {
        if (this.connected) {
          console.log('Already connected');
          return;
        }
        
        console.log(`Connecting to ${this.connectionString}`);
        // Connection logic here
        this.connected = true;
      }
      
      disconnect() {
        if (!this.connected) {
          console.log('Not connected');
          return;
        }
        
        console.log('Disconnecting');
        // Disconnection logic here
        this.connected = false;
      }
      
      query(sql) {
        if (!this.connected) {
          throw new Error('Must connect before querying');
        }
        
        console.log(`Executing query: ${sql}`);
        // Query execution logic here
        return { results: [] };
      }
    }
    
    // Usage example
    const db1 = new DatabaseConnection('mongodb://localhost:27017/mydb');
    const db2 = new DatabaseConnection('another-connection-string');
    
    console.log(db1 === db2); // true - same instance
    
    db1.connect();
    db2.query('SELECT * FROM users'); // Works because db1 and db2 are the same instance
    
    // 2. Observer Pattern
    class Subject {
      constructor() {
        this.observers = [];
      }
      
      subscribe(observer) {
        this.observers.push(observer);
      }
      
      unsubscribe(observer) {
        this.observers = this.observers.filter(obs => obs !== observer);
      }
      
      notify(data) {
        this.observers.forEach(observer => observer.update(data));
      }
    }
    
    class Observer {
      constructor(name) {
        this.name = name;
      }
      
      update(data) {
        console.log(`${this.name} received update:`, data);
      }
    }
    
    // Usage example
    const subject = new Subject();
    
    const observer1 = new Observer('Observer 1');
    const observer2 = new Observer('Observer 2');
    
    subject.subscribe(observer1);
    subject.subscribe(observer2);
    
    subject.notify({ message: 'Hello observers!' });
    // Observer 1 received update: {"message":"Hello observers!"}
    // Observer 2 received update: {"message":"Hello observers!"}
    
    subject.unsubscribe(observer1);
    subject.notify({ message: 'Another update' });
    // Observer 2 received update: {"message":"Another update"}
    
    // 3. Factory Pattern
    class UserFactory {
      createUser(type, userData) {
        switch (type) {
          case 'admin':
            return new AdminUser(userData);
          case 'customer':
            return new CustomerUser(userData);
          case 'guest':
            return new GuestUser(userData);
          default:
            throw new Error(`User type ${type} is not supported`);
        }
      }
    }
    
    class AdminUser {
      constructor(data) {
        this.name = data.name;
        this.email = data.email;
        this.permissions = data.permissions || ['read', 'write', 'delete', 'admin'];
      }
      
      hasPermission(permission) {
        return this.permissions.includes(permission);
      }
    }
    
    class CustomerUser {
      constructor(data) {
        this.name = data.name;
        this.email = data.email;
        this.accountId = data.accountId;
        this.permissions = ['read', 'write'];
      }
      
      hasPermission(permission) {
        return this.permissions.includes(permission);
      }
    }
    
    class GuestUser {
      constructor(data) {
        this.name = data.name || 'Guest';
        this.permissions = ['read'];
      }
      
      hasPermission(permission) {
        return this.permissions.includes(permission);
      }
    }
    
    // Usage example
    const userFactory = new UserFactory();
    
    const admin = userFactory.createUser('admin', { 
      name: 'Admin User', 
      email: 'admin@example.com' 
    });
    
    const customer = userFactory.createUser('customer', { 
      name: 'John Doe', 
      email: 'john@example.com',
      accountId: 'ACC123'
    });
    
    const guest = userFactory.createUser('guest', {});
    
    console.log(admin.hasPermission('admin')); // true
    console.log(customer.hasPermission('admin')); // false
    console.log(guest.hasPermission('read')); // true
    
    // 4. Module Pattern
    const ShoppingCart = (function() {
      // Private variables
      let items = [];
      let total = 0;
      
      // Private functions
      function calculateTotal() {
        total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      }
      
      function findItemIndex(id) {
        return items.findIndex(item => item.id === id);
      }
      
      // Public API
      return {
        addItem(item) {
          const existingIndex = findItemIndex(item.id);
          
          if (existingIndex !== -1) {
            items[existingIndex].quantity += item.quantity || 1;
          } else {
            items.push({ ...item, quantity: item.quantity || 1 });
          }
          
          calculateTotal();
          return this;
        },
        
        removeItem(id) {
          const index = findItemIndex(id);
          
          if (index !== -1) {
            items.splice(index, 1);
            calculateTotal();
          }
          
          return this;
        },
        
        updateQuantity(id, quantity) {
          const index = findItemIndex(id);
          
          if (index !== -1 && quantity > 0) {
            items[index].quantity = quantity;
            calculateTotal();
          }
          
          return this;
        },
        
        getItems() {
          return [...items]; // Return a copy of the original array
        },
        
        getTotal() {
          return total;
        },
        
        clearCart() {
          items = [];
          total = 0;
          return this;
        }
      };
    })();
    
    // Usage example
    ShoppingCart.addItem({ id: 1, name: 'Product 1', price: 10 });
    ShoppingCart.addItem({ id: 2, name: 'Product 2', price: 15, quantity: 2 });
    
    console.log(ShoppingCart.getItems());
    console.log('Total:', ShoppingCart.getTotal()); // Total: 40
    
    ShoppingCart.updateQuantity(1, 3);
    console.log('Updated total:', ShoppingCart.getTotal()); // Updated total: 60
    
    // 5. Decorator Pattern
    // Base component
    class Coffee {
      getCost() {
        return 5;
      }
      
      getDescription() {
        return 'Regular coffee';
      }
    }
    
    // Decorator base class
    class CoffeeDecorator {
      constructor(coffee) {
        this.coffee = coffee;
      }
      
      getCost() {
        return this.coffee.getCost();
      }
      
      getDescription() {
        return this.coffee.getDescription();
      }
    }
    
    // Concrete decorators
    class MilkDecorator extends CoffeeDecorator {
      getCost() {
        return this.coffee.getCost() + 1;
      }
      
      getDescription() {
        return `${this.coffee.getDescription()}, with milk`;
      }
    }
    
    class SugarDecorator extends CoffeeDecorator {
      getCost() {
        return this.coffee.getCost() + 0.5;
      }
      
      getDescription() {
        return `${this.coffee.getDescription()}, with sugar`;
      }
    }
    
    class WhippedCreamDecorator extends CoffeeDecorator {
      getCost() {
        return this.coffee.getCost() + 2;
      }
      
      getDescription() {
        return `${this.coffee.getDescription()}, with whipped cream`;
      }
    }
    
    // Usage example
    let coffee = new Coffee();
    console.log(coffee.getDescription()); // Regular coffee
    console.log(coffee.getCost()); // 5
    
    coffee = new MilkDecorator(coffee);
    console.log(coffee.getDescription()); // Regular coffee, with milk
    console.log(coffee.getCost()); // 6
    
    coffee = new SugarDecorator(coffee);
    console.log(coffee.getDescription()); // Regular coffee, with milk, with sugar
    console.log(coffee.getCost()); // 6.5
    
    coffee = new WhippedCreamDecorator(coffee);
    console.log(coffee.getDescription()); // Regular coffee, with milk, with sugar, with whipped cream
    console.log(coffee.getCost()); // 8.5
    ```
