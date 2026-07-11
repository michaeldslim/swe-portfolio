# TypeScript Developer Interview Questions - Part 4

## Practical and Advanced Topics

10. **Explain TypeScript compiler configuration (tsconfig.json).**
    - Describe the main compiler options and their purposes.
    
    **Answer:**
    The `tsconfig.json` file is located in the root directory of a TypeScript project and configures how the TypeScript compiler (tsc) compiles the project. This file specifies which files to compile, compiler options, output directory, and more.
    
    **1. Basic Structure**
    
    ```json
    {
      "compilerOptions": {
        // Compiler options
      },
      "include": [
        // File patterns to include
      ],
      "exclude": [
        // File patterns to exclude
      ],
      "files": [
        // Explicit list of files to include
      ],
      "extends": "path/base-tsconfig.json", // Extend another tsconfig file
      "references": [
        // Project references
        { "path": "../otherProject" }
      ]
    }
    ```
    
    **2. Main Compiler Options**
    
    **Type Checking Options:**
    
    ```json
    {
      "compilerOptions": {
        "strict": true, // Enable all strict type checking options
        "noImplicitAny": true, // Raise error on expressions with implicit any type
        "strictNullChecks": true, // Enable strict null checks
        "strictFunctionTypes": true, // Enable strict checking of function types
        "strictBindCallApply": true, // Enable strict checking of bind, call, and apply methods
        "strictPropertyInitialization": true, // Ensure class properties are initialized
        "noImplicitThis": true, // Raise error on 'this' expressions with implicit any type
        "alwaysStrict": true, // Parse in strict mode
        "noUnusedLocals": true, // Report errors on unused local variables
        "noUnusedParameters": true, // Report errors on unused parameters
        "noImplicitReturns": true, // Ensure all code paths in a function return a value
        "noFallthroughCasesInSwitch": true // Report errors for fallthrough cases in switch statements
      }
    }
    ```
    
    **Module Options:**
    
    ```json
    {
      "compilerOptions": {
        "module": "ESNext", // Output module system (CommonJS, AMD, ESNext, etc.)
        "moduleResolution": "node", // Module resolution strategy (node, classic)
        "baseUrl": "./src", // Base directory for resolving non-relative module names
        "paths": { // Module name mapping
          "@app/*": ["app/*"],
          "@utils/*": ["utils/*"]
        },
        "rootDir": "./src", // Root directory of input files
        "typeRoots": ["./node_modules/@types", "./typings"], // Type definition file locations
        "types": ["node", "jest"], // Type packages to include
        "allowSyntheticDefaultImports": true, // Allow default imports from modules without default export
        "esModuleInterop": true, // Allow importing CommonJS modules with ES module syntax
        "resolveJsonModule": true // Allow importing .json files
      }
    }
    ```
    
    **Output Options:**
    
    ```json
    {
      "compilerOptions": {
        "target": "ES2020", // ECMAScript target version
        "outDir": "./dist", // Output directory
        "outFile": "./dist/bundle.js", // Output as single file (only with AMD/System modules)
        "declaration": true, // Generate .d.ts files
        "declarationDir": "./types", // Output directory for .d.ts files
        "sourceMap": true, // Generate source map files
        "removeComments": true, // Remove comments in output
        "noEmit": false, // Don't generate output files
        "noEmitOnError": true, // Don't generate output files if any errors were reported
        "preserveConstEnums": true, // Preserve const enum declarations
        "emitDecoratorMetadata": true, // Emit decorator metadata
        "experimentalDecorators": true, // Enable experimental decorator support
        "jsx": "react", // JSX code generation (react, preserve, react-native)
        "jsxFactory": "React.createElement", // JSX factory function
        "jsxFragmentFactory": "React.Fragment" // JSX fragment factory
      }
    }
    ```
    
    **Advanced Options:**
    
    ```json
    {
      "compilerOptions": {
        "lib": ["DOM", "ES2020"], // Library files to include
        "skipLibCheck": true, // Skip type checking of declaration files
        "forceConsistentCasingInFileNames": true, // Disallow inconsistently-cased references to the same file
        "incremental": true, // Enable incremental compilation
        "tsBuildInfoFile": "./buildcache", // File where incremental compilation info is stored
        "composite": true, // Enable project references
        "diagnostics": true, // Show diagnostic information
        "noErrorTruncation": true, // Do not truncate error messages
        "preserveWatchOutput": true, // Keep outdated console output in watch mode
        "pretty": true, // Stylize errors and messages using color and context
        "downlevelIteration": true, // Provide full support for iterables in for-of, spread, and destructuring
        "importHelpers": true, // Import helper functions from tslib
        "isolatedModules": true // Ensure each file can be safely transpiled without relying on other imports
      }
    }
    ```
    
    **3. File Inclusion/Exclusion**
    
    ```json
    {
      "include": [
        "src/**/*.ts", // Include all TypeScript files in src directory
        "src/**/*.tsx" // Include all TypeScript React files
      ],
      "exclude": [
        "node_modules", // Exclude node_modules directory
        "**/*.test.ts", // Exclude all test files
        "src/temp" // Exclude specific directory
      ],
      "files": [
        "src/main.ts", // Explicitly include specific files
        "src/types.d.ts"
      ]
    }
    ```
    
    **4. Project References**
    
    ```json
    {
      "references": [
        { "path": "../common" }, // Reference to other projects
        { "path": "../api" }
      ],
      "compilerOptions": {
        "composite": true, // Required for project references
        "declaration": true, // Required for project references
        "declarationMap": true // Source maps for declaration files
      }
    }
    ```
    
    **5. Common Configuration Examples**
    
    **React Application:**
    
    ```json
    {
      "compilerOptions": {
        "target": "ES2020",
        "module": "ESNext",
        "moduleResolution": "node",
        "jsx": "react",
        "strict": true,
        "esModuleInterop": true,
        "skipLibCheck": true,
        "forceConsistentCasingInFileNames": true,
        "lib": ["DOM", "DOM.Iterable", "ESNext"],
        "allowJs": true,
        "noEmit": true,
        "isolatedModules": true,
        "resolveJsonModule": true,
        "baseUrl": "src",
        "paths": {
          "@components/*": ["components/*"],
          "@utils/*": ["utils/*"],
          "@styles/*": ["styles/*"]
        }
      },
      "include": ["src/**/*"],
      "exclude": ["node_modules", "build", "dist"]
    }
    ```
    
    **Node.js Application:**
    
    ```json
    {
      "compilerOptions": {
        "target": "ES2020",
        "module": "CommonJS",
        "moduleResolution": "node",
        "strict": true,
        "esModuleInterop": true,
        "skipLibCheck": true,
        "forceConsistentCasingInFileNames": true,
        "outDir": "./dist",
        "rootDir": "./src",
        "sourceMap": true,
        "declaration": true,
        "resolveJsonModule": true,
        "lib": ["ES2020"],
        "types": ["node", "jest"],
        "baseUrl": "./src",
        "paths": {
          "@app/*": ["*"]
        }
      },
      "include": ["src"],
      "exclude": ["node_modules", "dist", "**/*.test.ts"]
    }
    ```
    
    **6. Library Configuration:**
    
    ```json
    {
      "compilerOptions": {
        "target": "ES2018",
        "module": "ESNext",
        "declaration": true,
        "declarationDir": "./types",
        "outDir": "./dist",
        "strict": true,
        "esModuleInterop": true,
        "moduleResolution": "node",
        "sourceMap": true,
        "stripInternal": true,
        "jsx": "react",
        "importHelpers": true,
        "noImplicitReturns": true,
        "noFallthroughCasesInSwitch": true,
        "noUnusedLocals": true,
        "noUnusedParameters": true
      },
      "include": ["src/**/*"],
      "exclude": ["node_modules", "**/*.test.ts"]
    }
    ```
    
    **7. Recommended Compiler Options Guide**
    
    **Recommended settings for new projects:**
    
    ```json
    {
      "compilerOptions": {
        "target": "ES2020", // Support modern browsers
        "module": "ESNext", // Latest module system
        "moduleResolution": "node", // Node.js style module resolution
        "strict": true, // Enable all strict type checking
        "esModuleInterop": true, // Better interop with CommonJS
        "skipLibCheck": true, // Skip checking declaration files
        "forceConsistentCasingInFileNames": true, // Consistent file casing
        "sourceMap": true, // Generate source maps
        "declaration": true, // Generate declaration files
        "declarationMap": true, // Source maps for declarations
        "noImplicitReturns": true, // All code paths must return
        "noFallthroughCasesInSwitch": true, // No switch fallthrough
        "noUnusedLocals": true, // No unused variables
        "noUnusedParameters": true, // No unused parameters
        "resolveJsonModule": true, // Allow JSON imports
        "isolatedModules": true, // Support for transpilers
        "incremental": true, // Faster builds
        "noEmitOnError": false, // Generate output even with errors
        "composite": true, // Support project references
        "tsBuildInfoFile": "./.tsbuildinfo" // Build info file location
      }
    }
    ```

11. **How do you handle asynchronous code in TypeScript?**
    - Explain how to use Promises, async/await, and generics together.
    
    **Answer:**
    TypeScript provides excellent support for asynchronous programming, enhancing JavaScript's async features with static typing.
    
    **1. Promises and Types**
    
    Promises in TypeScript are generic types, allowing you to specify the type of the resolved value.
    
    ```typescript
    // Basic Promise type
    const promise: Promise<string> = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("Hello, world!");
      }, 1000);
    });
    
    // Promise chain with type safety
    function getStringLength(input: string): Promise<number> {
      return new Promise((resolve, reject) => {
        if (input.length === 0) {
          reject(new Error("Empty string"));
        } else {
          resolve(input.length);
        }
      });
    }
    
    getStringLength("TypeScript")
      .then((length) => {
        console.log(length * 2); // length is of type number
      })
      .catch((error: Error) => {
        console.error(error.message);
      });
    ```
    
    **2. async/await with Types**
    
    async/await is syntactic sugar for Promises that allows writing asynchronous code in a more synchronous style. TypeScript infers the return type of an async function as a Promise.
    
    ```typescript
    // Basic async/await
    async function fetchData(): Promise<string> {
      const response = await fetch('https://api.example.com/data');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.text();
    }
    
    // Type inference with async functions
    async function processData() {
      try {
        const data = await fetchData(); // data is inferred as string
        console.log(data.toUpperCase());
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error:", error.message);
        }
      }
    }
    
    // Return type is automatically Promise<number>
    async function calculateValue(): Promise<number> {
      const value = await fetchData();
      return value.length;
    }
    ```
    
    **3. Generics with Async Functions**
    
    Generics allow creating reusable asynchronous functions that work with different types.
    
    ```typescript
    // Generic async function
    async function fetchJson<T>(url: string): Promise<T> {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    }
    
    // Usage with specific types
    interface User {
      id: number;
      name: string;
      email: string;
    }
    
    interface Product {
      id: number;
      title: string;
      price: number;
    }
    
    async function loadUserAndProducts() {
      try {
        // Type safety for different API responses
        const user = await fetchJson<User>('https://api.example.com/user/1');
        console.log(user.name); // TypeScript knows this is a string
        
        const products = await fetchJson<Product[]>('https://api.example.com/products');
        console.log(products.map(p => p.title)); // TypeScript knows each product has a title
      } catch (error) {
        console.error("Failed to load data:", error);
      }
    }
    ```
    
    **4. Handling Promise Arrays**
    
    You can maintain type safety when working with multiple Promises in parallel.
    
    ```typescript
    // Promise.all with types
    async function fetchMultipleUsers(ids: number[]): Promise<User[]> {
      const promises = ids.map(id => fetchJson<User>(`https://api.example.com/users/${id}`));
      return Promise.all(promises);
    }
    
    // Promise.race with types
    async function fetchWithTimeout<T>(url: string, timeoutMs: number): Promise<T> {
      const dataPromise = fetchJson<T>(url);
      
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => {
          reject(new Error(`Request timed out after ${timeoutMs}ms`));
        }, timeoutMs);
      });
      
      return Promise.race([dataPromise, timeoutPromise]);
    }
    
    // Usage
    async function loadData() {
      try {
        const user = await fetchWithTimeout<User>('https://api.example.com/user/1', 5000);
        console.log(user.name);
      } catch (error) {
        console.error("Request failed or timed out:", error);
      }
    }
    ```
    
    **5. Advanced Typing with Async Functions**
    
    ```typescript
    // Async function return type inference
    async function getData(): Promise<string> {
      return "data"; // Automatically wrapped in Promise<string>
    }
    
    // Conditional return types
    async function fetchResource<T>(
      url: string,
      cache: boolean
    ): Promise<T> {
      // Implementation...
      const data = await fetchJson<T>(url);
      return data;
    }
    
    // Overloaded async functions
    async function processItem(id: number): Promise<User>;
    async function processItem(name: string): Promise<User[]>;
    async function processItem(idOrName: number | string): Promise<User | User[]> {
      if (typeof idOrName === 'number') {
        return fetchJson<User>(`https://api.example.com/users/${idOrName}`);
      } else {
        return fetchJson<User[]>(`https://api.example.com/users?name=${idOrName}`);
      }
    }
    ```
    
    **6. Error Handling with Types**
    
    TypeScript helps with type-safe error handling in async code.
    
    ```typescript
    // Custom error class
    class ApiError extends Error {
      constructor(
        message: string,
        public statusCode: number,
        public responseBody: string
      ) {
        super(message);
        this.name = "ApiError";
      }
    }
    
    // Error type guard
    function isApiError(error: unknown): error is ApiError {
      return error instanceof ApiError;
    }
    
    // Error handling
    async function fetchWithErrorHandling<T>(url: string): Promise<T> {
      try {
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new ApiError(
            `API error: ${response.statusText}`,
            response.status,
            await response.text()
          );
        }
        
        return await response.json();
      } catch (error: unknown) {
        // Type narrowing
        if (isApiError(error)) {
          // error is of type ApiError
          console.error(`API Error ${error.statusCode}: ${error.message}`);
          // Handle specific status codes
          if (error.statusCode === 404) {
            // Resource not found
          }
        } else if (error instanceof Error) {
          // error is of type Error
          console.error(`Network Error: ${error.message}`);
        } else {
          // Unknown error
          console.error("Unknown error:", error);
        }
        throw error;
      }
    }
    ```
    
    **7. Async Iterators and Generators**
    
    TypeScript also supports async iterators and generators.
    
    ```typescript
    // Async generator
    async function* generateSequence(start: number, end: number): AsyncGenerator<number> {
      for (let i = start; i <= end; i++) {
        // Simulate async operation
        await new Promise(resolve => setTimeout(resolve, 100));
        yield i;
      }
    }
    
    // Using async iterator
    async function processSequence() {
      const generator = generateSequence(1, 5);
      
      for await (const num of generator) {
        console.log(num); // 1, 2, 3, 4, 5 with ~100ms intervals
      }
    }
    
    // Or manually iterate
    async function manualIteration() {
      const generator = generateSequence(1, 3);
      
      let result = await generator.next();
      while (!result.done) {
        console.log(result.value);
        result = await generator.next();
      }
    }
    ```
    
    **8. Real-world Use Cases**
    
    **Data fetching hook (React):**
    
    ```typescript
    interface FetchState<T> {
      data: T | null;
      loading: boolean;
      error: Error | null;
    }
    
    function useFetch<T>(url: string): FetchState<T> {
      const [state, setState] = useState<FetchState<T>>({
        data: null,
        loading: true,
        error: null
      });
      
      useEffect(() => {
        let isMounted = true;
        
        const fetchData = async () => {
          try {
            const response = await fetch(url);
            
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data: T = await response.json();
            
            if (isMounted) {
              setState({
                data,
                loading: false,
                error: null
              });
            }
          } catch (error) {
            if (isMounted) {
              setState({
                data: null,
                loading: false,
                error: error instanceof Error ? error : new Error(String(error))
              });
            }
          }
        };
        
        fetchData();
        
        return () => {
          isMounted = false;
        };
      }, [url]);
      
      return state;
    }
    
    // Usage example
    function UserProfile({ userId }: { userId: number }) {
      const { data, loading, error } = useFetch<User>(`https://api.example.com/users/${userId}`);
      
      if (loading) return <div>Loading...</div>;
      if (error) return <div>Error: {error.message}</div>;
      if (!data) return <div>No data</div>;
      
      return (
        <div>
          <h1>{data.name}</h1>
          <p>Email: {data.email}</p>
        </div>
      );
    }
    ```
