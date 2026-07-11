# JavaScript Developer Interview Questions Part 8: Testing and Debugging

## Testing and Debugging

27. **Explain methods and tools for testing JavaScript code.**
    - What are the differences between Unit Tests, Integration Tests, and E2E Tests?
    
    **Description:** JavaScript code testing is a crucial process for ensuring code quality and reliability. Unit testing examines the smallest units of code (functions or methods) independently to verify they work as expected. Frameworks like Jest, Mocha, and Jasmine are commonly used, with mocking frequently employed for test isolation. Integration testing verifies that multiple units interact correctly when working together, potentially including real API calls or database interactions. E2E (End-to-End) testing examines the entire application flow from a user's perspective, using tools like Cypress, Puppeteer, or Selenium to perform tests in actual browser environments. TDD (Test-Driven Development) is a methodology where tests are written before implementing code, helping improve code quality. Code coverage tools (Istanbul/nyc) measure how much of the code is executed by tests, while snapshot testing compares UI component rendering results with previous outputs. For effective testing, it's important to write testable code, establish appropriate test coverage, integrate tests into CI/CD pipelines, and maintain tests regularly.
    
    **Example:**
    ```javascript
    // 1. Unit Test Example - Using Jest
    
    // Functions to test
    function sum(a, b) {
      return a + b;
    }
    
    function fetchUserData(userId) {
      return fetch(`https://api.example.com/users/${userId}`)
        .then(response => response.json());
    }
    
    // Unit tests with Jest
    // sum.test.js
    describe('sum function', () => {
      test('adds 1 + 2 to equal 3', () => {
        expect(sum(1, 2)).toBe(3);
      });
      
      test('adds -1 + 1 to equal 0', () => {
        expect(sum(-1, 1)).toBe(0);
      });
      
      test('adds 0.1 + 0.2 to be close to 0.3', () => {
        expect(sum(0.1, 0.2)).toBeCloseTo(0.3);
      });
    });
    
    // Testing async functions - using mocks
    // user.test.js
    describe('fetchUserData function', () => {
      // Mocking the fetch API
      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve({ id: 1, name: 'John Doe' }),
        }),
      );
      
      test('fetches user data successfully', async () => {
        const userData = await fetchUserData(1);
        
        // Check if fetch was called with the right URL
        expect(fetch).toHaveBeenCalledWith('https://api.example.com/users/1');
        
        // Check the returned data
        expect(userData).toEqual({ id: 1, name: 'John Doe' });
      });
      
      // Clean up after tests
      afterEach(() => {
        jest.clearAllMocks();
      });
    });
    
    // 2. Integration Test Example
    
    // Testing integration between user service and posts service
    // userPostsService.test.js
    describe('User Posts Service', () => {
      // Using real APIs or more complex mocks
      
      test('getUserPosts returns posts for a specific user', async () => {
        // Setup: Create a test user and some posts
        const testUser = await userService.createUser({
          name: 'Test User',
          email: 'test@example.com'
        });
        
        const createdPost = await postsService.createPost({
          userId: testUser.id,
          title: 'Test Post',
          content: 'This is a test post'
        });
        
        // Test the integration between services
        const userPosts = await userPostsService.getUserPosts(testUser.id);
        
        // Assertions
        expect(userPosts.length).toBeGreaterThan(0);
        expect(userPosts).toContainEqual(expect.objectContaining(createdPost));
      });
    });
    
    // 3. E2E Test Example - Using Cypress
    
    // cypress/integration/login.spec.js
    describe('Login Flow', () => {
      beforeEach(() => {
        // Visit the login page before each test
        cy.visit('/login');
      });
      
      it('should login successfully with correct credentials', () => {
        // Enter login credentials
        cy.get('input[name="username"]').type('testuser');
        cy.get('input[name="password"]').type('password123');
        
        // Submit the form
        cy.get('button[type="submit"]').click();
        
        // Assert that we're redirected to the dashboard
        cy.url().should('include', '/dashboard');
        
        // Assert that the welcome message is displayed
        cy.get('.welcome-message').should('contain', 'Welcome, Test User');
      });
      
      it('should show error with incorrect credentials', () => {
        // Enter incorrect credentials
        cy.get('input[name="username"]').type('testuser');
        cy.get('input[name="password"]').type('wrongpassword');
        
        // Submit the form
        cy.get('button[type="submit"]').click();
        
        // Assert that error message is shown
        cy.get('.error-message').should('be.visible');
        
        // Assert we're still on the login page
        cy.url().should('include', '/login');
      });
    });
    
    // 4. TDD (Test-Driven Development) Example
    
    // Step 1: Write a failing test
    // calculator.test.js
    describe('Calculator', () => {
      test('multiply should multiply two numbers', () => {
        const calculator = new Calculator();
        expect(calculator.multiply(2, 3)).toBe(6);
      });
    });
    
    // Step 2: Run the test (it will fail because Calculator doesn't exist yet)
    
    // Step 3: Write minimal code to make the test pass
    // calculator.js
    class Calculator {
      multiply(a, b) {
        return a * b;
      }
    }
    
    // Step 4: Run the test again (it should pass now)
    
    // Step 5: Refactor if needed
    // calculator.js
    class Calculator {
      multiply(a, b) {
        return a * b;
      }
      
      // Add more methods...
      add(a, b) {
        return a + b;
      }
    }
    
    // Step 6: Add more tests for new functionality
    // calculator.test.js
    describe('Calculator', () => {
      let calculator;
      
      beforeEach(() => {
        calculator = new Calculator();
      });
      
      test('multiply should multiply two numbers', () => {
        expect(calculator.multiply(2, 3)).toBe(6);
      });
      
      test('add should add two numbers', () => {
        expect(calculator.add(2, 3)).toBe(5);
      });
    });
    
    // 5. Code Coverage Example
    
    // package.json configuration for Jest with coverage
    /*
    {
      "scripts": {
        "test": "jest",
        "test:coverage": "jest --coverage"
      }
    }
    */
    
    // Coverage results example:
    // -----------------------|---------|----------|---------|---------|-------------------
    // File                   | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
    // -----------------------|---------|----------|---------|---------|-------------------
    // All files              |   85.71 |    66.67 |   83.33 |   85.71 |
    //  calculator.js         |     100 |      100 |     100 |     100 |
    //  userService.js        |   77.78 |    66.67 |      75 |   77.78 | 15,28
    // -----------------------|---------|----------|---------|---------|-------------------
    ```

28. **Explain methods for debugging JavaScript code.**
    
    **Description:** Debugging is the process of identifying and fixing errors in code. JavaScript offers several debugging techniques and tools. Console methods like console.log(), console.error(), and console.warn() are the most basic debugging tools, allowing developers to output values at specific points in code execution. The debugger statement creates breakpoints in code where execution pauses when developer tools are open. Browser developer tools provide comprehensive debugging capabilities including breakpoint setting, call stack inspection, variable watching, and step-by-step execution control. For asynchronous code debugging, developers can use async/await to make code more linear and easier to debug, or utilize the browser's async stack traces. Performance issues can be identified using console.time() and console.timeEnd() to measure execution time, or with the browser's performance profiler. For Node.js applications, debugging can be done using the built-in debugger, the --inspect flag, or IDE integrations. Modern frameworks often include specialized debugging tools, such as React DevTools or Vue DevTools, which provide component inspection capabilities. Effective debugging also involves error tracking services like Sentry or LogRocket for production environments, and source maps to debug minified code.
    
    **Example:**
    ```javascript
    // 1. Basic console debugging
    function debugWithConsole() {
      const a = 5;
      const b = 10;
      
      console.log('Variables:', { a, b });
      
      const result = a * b;
      console.log('Result:', result);
      
      if (result > 40) {
        console.warn('Result is quite large');
      }
      
      try {
        // Some code that might throw an error
        const element = document.querySelector('#non-existent');
        element.style.color = 'red';
      } catch (error) {
        console.error('An error occurred:', error);
      }
    }
    
    // 2. Using the debugger statement
    function calculateTotal(items) {
      let total = 0;
      
      for (let i = 0; i < items.length; i++) {
        if (items[i].price < 0) {
          debugger; // Execution will pause here when dev tools are open
          console.error('Invalid price:', items[i]);
        }
        
        total += items[i].price;
      }
      
      return total;
    }
    
    // 3. Debugging complex data structures
    function processComplexData(data) {
      let result = [];
      
      for (let i = 0; i < data.length; i++) {
        if (data[i].isComplicated) {
          debugger; // Execution will pause here when dev tools are open
        }
        
        // Complex processing logic
        result.push(processItem(data[i]));
      }
      
      return result;
    }
    
    // 4. Browser developer tools debugging techniques
    
    // 4.1 Setting breakpoints (can't be represented in code, but set in dev tools)
    function functionToDebug() {
      const a = 1;
      const b = 2;
      
      // You can set a breakpoint on this line in dev tools
      const sum = a + b;
      
      return sum * 2;
    }
    
    // 4.2 Using conditional breakpoints
    function processLargeArray(array) {
      for (let i = 0; i < array.length; i++) {
        // In dev tools, you can set a conditional breakpoint
        // e.g., with condition "array[i] < 0"
        
        const result = complexCalculation(array[i]);
        // Processing logic...
      }
    }
    
    // 4.3 Event listener breakpoints
    document.getElementById('myButton').addEventListener('click', function() {
      // In dev tools, you can set event listener breakpoints
      // that will automatically pause when this function runs
      handleButtonClick();
    });
    
    // 5. Performance debugging
    
    // 5.1 Measuring performance with console.time
    function measurePerformance() {
      console.time('Array initialization');
      
      const arr = [];
      for (let i = 0; i < 1000000; i++) {
        arr.push(i);
      }
      
      console.timeEnd('Array initialization');
      // Output: "Array initialization: 123.45ms"
      
      return arr;
    }
    
    // 5.2 Performance profiling
    function profileFunction() {
      console.profile('Processing function');
      
      // Code to profile
      processLargeDataSet();
      
      console.profileEnd('Processing function');
      // Check results in the Performance tab of dev tools
    }
    
    // 6. Advanced debugging techniques
    
    // 6.1 Inspecting object structure
    function inspectObject(obj) {
      console.log('Object simple view:', obj);
      console.dir(obj); // Shows all properties in hierarchical view
      console.table(obj); // Displays object data in table format (useful for arrays)
    }
    
    // 6.2 Grouped logging
    function groupedLogging() {
      console.group('User Authentication');
      console.log('Checking credentials...');
      
      console.group('Validation');
      console.log('Validating username...');
      console.log('Validating password...');
      console.groupEnd();
      
      console.log('Authentication successful');
      console.groupEnd();
    }
    
    // 6.3 Conditional logging
    function conditionalLogging(data, isDebugMode) {
      // Only log in debug mode
      if (isDebugMode) {
        console.log('Debug data:', data);
      }
      
      // Or use console.assert
      console.assert(data.length > 0, 'Data array is empty!');
    }
    
    // 7. Debugging asynchronous code
    
    async function debugAsync() {
      try {
        console.log('Starting async operation');
        
        const result = await fetchData();
        console.log('Async result:', result);
        
        return processResult(result);
      } catch (error) {
        console.error('Async operation failed:', error);
        throw error;
      }
    }
    
    // 8. Debugging utility function
    
    function createDebugger(prefix) {
      return function(...args) {
        const timestamp = new Date().toISOString();
        console.log(`[${timestamp}] [${prefix}]`, ...args);
      };
    }
    
    // Usage example
    const authDebug = createDebugger('AUTH');
    const apiDebug = createDebugger('API');
    
    function login() {
      authDebug('Login attempt');
      // Login logic...
      authDebug('Login successful');
    }
    ```
