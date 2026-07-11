# TypeScript Developer Interview Questions - Part 3

## Advanced Concepts (Continued)

8. **Explain TypeScript's module system.**
   - Describe the differences between CommonJS and ES modules and how to use them in TypeScript.
   
   **Answer:**
   TypeScript extends JavaScript's module system to support modularized code with type information. TypeScript supports various module systems including CommonJS, AMD, UMD, and ES modules, and can output to any of these formats based on compiler options.
   
   **1. Basic Module Concepts**
   
   In TypeScript, modules have their own scope and interact with other modules using `export` and `import` statements.
   
   ```typescript
   // math.ts
   export function add(x: number, y: number): number {
     return x + y;
   }
   
   export function subtract(x: number, y: number): number {
     return x - y;
   }
   
   export const PI = 3.14159;
   
   // app.ts
   import { add, PI } from './math';
   
   console.log(add(5, 3)); // 8
   console.log(PI); // 3.14159
   ```
   
   **2. Export Methods**
   
   ```typescript
   // Individual exports
   export function func1() { /* ... */ }
   export const value1 = 42;
   export interface User { name: string; }
   export type ID = string | number;
   export class Service { /* ... */ }
   
   // Declare then export
   function func2() { /* ... */ }
   const value2 = 'hello';
   export { func2, value2 };
   
   // Export with renamed identifiers
   export { func2 as renamedFunc, value2 as renamedValue };
   
   // Default export (only one per module)
   export default class MainClass { /* ... */ }
   
   // Re-exporting from another module
   export * from './other-module';
   export { func3, func4 } from './other-module';
   export { func3 as newName } from './other-module';
   ```
   
   **3. Import Methods**
   
   ```typescript
   // Named imports
   import { func1, value1 } from './module';
   
   // Import with renamed identifiers
   import { func1 as newName, value1 } from './module';
   
   // Import entire module as namespace
   import * as math from './math';
   console.log(math.add(1, 2)); // Access through namespace
   
   // Import default export
   import MainClass from './module';
   
   // Import default and named exports together
   import MainClass, { func1, value1 } from './module';
   
   // Import types only (no runtime code generated)
   import type { User, ID } from './module';
   
   // Import for side effects only (just executes the module)
   import './module';
   ```
   
   **4. CommonJS vs ES Modules**
   
   **CommonJS (Node.js default module system):**
   
   ```typescript
   // Exporting (CommonJS)
   function add(x, y) {
     return x + y;
   }
   
   module.exports = { add };
   // or
   exports.add = add;
   
   // Importing (CommonJS)
   const math = require('./math');
   console.log(math.add(1, 2));
   // or
   const { add } = require('./math');
   console.log(add(1, 2));
   ```
   
   **ES Modules (ECMAScript standard module system):**
   
   ```typescript
   // Exporting (ES modules)
   export function add(x, y) {
     return x + y;
   }
   
   // Importing (ES modules)
   import { add } from './math';
   console.log(add(1, 2));
   ```
   
   **Key Differences:**
   
   | Feature | CommonJS | ES Modules |
   |---------|----------|------------|
   | Syntax | require(), module.exports | import, export |
   | Loading Time | Dynamic (runtime) | Static (compile time) |
   | Async Loading | Not supported natively | Supported (import()) |
   | Tree Shaking | Difficult | Easy |
   | Circular References | Partial support | Better support |
   | Hoisting | None | Yes (to top of module) |
   
   **5. TypeScript Module Configuration**
   
   You can specify the output module system using the `module` option in `tsconfig.json`:
   
   ```json
   {
     "compilerOptions": {
       "module": "commonjs", // Options: "none", "commonjs", "amd", "umd", "system", "es2015", "es2020", "esnext"
       "moduleResolution": "node", // How modules are resolved
       "esModuleInterop": true, // Allow importing CommonJS modules with ES module syntax
       "allowSyntheticDefaultImports": true // Allow default imports from modules without default export
     }
   }
   ```
   
   **6. Module Resolution Strategies**
   
   TypeScript supports two main module resolution strategies:
   
   - **Classic**: Relative paths are resolved relative to the importing file, non-relative paths are resolved from the root directory
   - **Node**: Follows Node.js module resolution algorithm (default and recommended)
   
   **7. Dynamic Imports**
   
   TypeScript supports dynamic imports for code splitting and lazy loading:
   
   ```typescript
   // Static import (always loaded)
   import { add } from './math';
   
   // Dynamic import (loaded on demand)
   async function loadMath() {
     const math = await import('./math');
     return math.add(1, 2);
   }
   
   // With type annotations
   async function loadAndUse(): Promise<number> {
     // Type inference works
     const math = await import('./math');
     return math.add(1, 2);
   }
   ```
   
   **9. Real-world Examples and Best Practices**
   
   **Module Structure:**
   
   ```typescript
   // models/user.ts
   export interface User {
     id: number;
     name: string;
     email: string;
   }
   
   // services/user-service.ts
   import { User } from '../models/user';
   
   export class UserService {
     async getUser(id: number): Promise<User> {
       // Implementation...
     }
   }
   
   // Barrel file (index.ts)
   export * from './user';
   export * from './product';
   export * from './order';
   
   // Usage
   import { User, Product, Order } from './models';
   ```
   
   **Best Practices:**
   
   1. **Prefer ES Module syntax**: More modern and supports tree-shaking
   2. **Use path aliases**: Configure path mappings in tsconfig.json for cleaner imports
   3. **Consistent import style**: Either named or default exports, but be consistent
   4. **Use barrel files**: Group related modules under a single entry point for better usability
   5. **Use type-only imports**: When appropriate, use `import type` to optimize runtime code

9. **Explain TypeScript declaration files (.d.ts).**
   - Describe how to write declaration files and their use cases.
   
   **Answer:**
   TypeScript declaration files (with the `.d.ts` extension) provide type information for JavaScript code without changing the runtime behavior. They allow TypeScript to understand the types of external libraries or code that doesn't have built-in type information.
   
   **1. Purpose of Declaration Files**
   
   - Define types for JavaScript libraries
   - Provide type information for runtime code
   - Extend existing types (like DOM interfaces)
   - Define ambient types for global variables and functions
   
   **2. Basic Syntax**
   
   ```typescript
   // Basic type declarations
   declare const VERSION: string;
   declare function getData(id: number): Promise<any>;
   declare class User {
     constructor(name: string);
     getName(): string;
   }
   
   // Module declarations
   declare module 'my-module' {
     export function doSomething(): void;
     export const value: number;
   }
   
   // Global interface declarations
   interface Window {
     customProperty: string;
   }
   ```
   
   **3. Types of Declaration Files**
   
   **Global Declaration Files:**
   Declare types in the global scope, available without imports.
   
   ```typescript
   // globals.d.ts
   declare const API_KEY: string;
   declare function formatCurrency(amount: number): string;
   
   // Usage (no import needed)
   const formattedPrice = formatCurrency(100);
   console.log(`Using API key: ${API_KEY}`);
   ```
   
   **Module Declaration Files:**
   Declare types for specific modules that need to be imported.
   
   ```typescript
   // my-module.d.ts
   declare module 'my-module' {
     export function add(a: number, b: number): number;
     export class Calculator {
       add(a: number, b: number): number;
       subtract(a: number, b: number): number;
     }
   }
   
   // Usage
   import { add, Calculator } from 'my-module';
   ```
   
   **Augmentation Declaration Files:**
   Extend existing types with new properties or methods.
   
   ```typescript
   // dom-extensions.d.ts
   interface HTMLElement {
     addClass(className: string): void;
     removeClass(className: string): void;
   }
   
   // Usage
   document.body.addClass('dark-mode');
   ```
   
   **Asset Declaration Files:**
   Provide type definitions for non-code assets.
   
   ```typescript
   // assets.d.ts
   declare module '*.css' {
     const content: { [className: string]: string };
     export default content;
   }
   
   declare module '*.png' {
     const content: string;
     export default content;
   }
   
   // Usage
   import styles from './styles.css';
   import logo from './logo.png';
   ```
   
   **4. Finding and Using Declaration Files**
   
   TypeScript looks for declaration files in the following locations:
   
   1. `.d.ts` files included in your project
   2. `@types/` namespace packages (DefinitelyTyped)
   3. Type declarations included in the package itself
   
   **Specifying declaration files in package.json:**
   
   ```json
   {
     "name": "my-library",
     "version": "1.0.0",
     "main": "dist/index.js",
     "types": "dist/index.d.ts", // or "typings": "dist/index.d.ts"
     "dependencies": {
       // ...
     }
   }
   ```
   
   **5. DefinitelyTyped and @types Packages**
   
   DefinitelyTyped is a repository of type declarations for JavaScript libraries without built-in types.
   
   ```bash
   # Install type declarations for jQuery
   npm install --save-dev @types/jquery
   
   # Install type declarations for lodash
   npm install --save-dev @types/lodash
   ```
   
   **6. Creating Declaration Files**
   
   **Manual creation:**
   
   ```typescript
   // my-library.d.ts
   declare module 'my-library' {
     export function add(a: number, b: number): number;
     export function subtract(a: number, b: number): number;
     export const PI: number;
   }
   ```
   
   **Generating with TypeScript compiler:**
   
   ```json
   // tsconfig.json
   {
     "compilerOptions": {
       "declaration": true, // Generate .d.ts files
       "declarationDir": "./types", // Output directory for .d.ts files
       "emitDeclarationOnly": false // If true, only generates .d.ts files without .js files
     }
   }
   ```
   
   **7. Real-world Use Cases**
   
   **Using untyped libraries:**
   
   ```typescript
   // untyped-lib.d.ts
   declare module 'untyped-lib' {
     export function process(data: string): string;
     export class Processor {
       constructor(options?: { encoding?: string });
       process(data: string): string;
     }
   }
   
   // app.ts
   import { process, Processor } from 'untyped-lib';
   
   const result = process('data');
   const processor = new Processor({ encoding: 'utf-8' });
   ```
   
   **Extending browser APIs:**
   
   ```typescript
   // browser-ext.d.ts
   interface Navigator {
     getBattery(): Promise<{
       charging: boolean;
       chargingTime: number;
       dischargingTime: number;
       level: number;
     }>;
   }
   
   // app.ts
   async function checkBattery() {
     const battery = await navigator.getBattery();
     console.log(`Battery level: ${battery.level * 100}%`);
   }
   ```
   
   **Global variables and functions:**
   
   ```typescript
   // globals.d.ts
   declare const __DEV__: boolean;
   declare const __VERSION__: string;
   declare function __trackEvent__(name: string, data?: object): void;
   
   // app.ts
   if (__DEV__) {
     console.log(`Running in development mode, version: ${__VERSION__}`);
   }
   
   __trackEvent__('app_start');
   ```
   
   **8. Best Practices for Writing Declaration Files**
   
   1. **Clear documentation**: Use JSDoc comments to describe types and functions
   2. **Strict typing**: Minimize the use of `any` type
   3. **Use union types**: Consider all possible input values
   4. **Leverage generics**: Define reusable types
   5. **Structure with namespaces**: Logically group related types
   6. **Testing**: Verify that type declarations match actual library behavior
   
   **9. Debugging Declaration Files**
   
   ```json
   // tsconfig.json
   {
     "compilerOptions": {
       "traceResolution": true, // Trace module resolution process
       "typeRoots": ["./node_modules/@types", "./typings"], // Specify type declaration locations
       "types": ["node", "jest"] // Specify which @types packages to include
     }
   }
   ```
