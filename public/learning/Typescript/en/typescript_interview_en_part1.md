# TypeScript Developer Interview Questions - Part 1

## Basic Concepts

1. **What is TypeScript and how does it differ from JavaScript?**
   - What are the main benefits of using TypeScript?
   
   **Answer:**
   TypeScript is a superset of JavaScript developed by Microsoft that adds a static type system to JavaScript. TypeScript code is compiled into regular JavaScript.
   
   **Key differences:**
   - **Type System**: TypeScript supports static typing, while JavaScript is a dynamically typed language.
   - **Compilation Process**: TypeScript requires a compilation step, while JavaScript is an interpreted language.
   - **Error Detection**: TypeScript can detect errors at compile time, while JavaScript only finds errors at runtime.
   - **Object-Oriented Features**: TypeScript provides additional object-oriented programming features like interfaces, generics, and enums.
   
   **Main benefits of using TypeScript:**
   - **Enhanced Developer Experience**: Improved productivity through code autocompletion, type inference, and interface definitions
   - **Early Error Detection**: Catching type-related errors at compile time
   - **Safer Refactoring**: Type system helps identify potential issues when changing code
   - **Clear Code Documentation**: Type definitions clarify code intent and structure
   - **Large-Scale Application Development**: Better management of complex codebases
   - **Ecosystem Support**: Excellent integration with major frameworks and libraries

2. **Explain the basic types in TypeScript.**
   - What are the differences between primitive types and object types?
   
   **Answer:**
   TypeScript includes all JavaScript types and adds additional type functionality.
   
   **Basic Types:**
   
   **1. Primitive Types**
   ```typescript
   // Boolean
   let isDone: boolean = false;
   
   // Number (integers, floats, binary, octal, hexadecimal)
   let decimal: number = 6;
   let hex: number = 0xf00d;
   let binary: number = 0b1010;
   
   // String
   let color: string = "blue";
   let greeting: string = `Hello, my name is ${name}`;
   
   // Null and Undefined
   let n: null = null;
   let u: undefined = undefined;
   
   // Symbol (ES6)
   let sym: symbol = Symbol("key");
   
   // BigInt (ES2020)
   let bigInt: bigint = 100n;
   ```
   
   **2. Object Types**
   ```typescript
   // Array
   let list1: number[] = [1, 2, 3];
   let list2: Array<number> = [1, 2, 3]; // Generic array type
   
   // Tuple (array with fixed number of elements and types)
   let tuple: [string, number] = ["hello", 10];
   
   // Enum
   enum Color {Red, Green, Blue}
   let c: Color = Color.Green;
   
   // Any (allows any type)
   let notSure: any = 4;
   notSure = "maybe a string";
   notSure = false;
   
   // Object
   let obj: object = {key: "value"};
   
   // Object type definition with interface
   interface Person {
     name: string;
     age: number;
   }
   let person: Person = {name: "John", age: 30};
   
   // Function type
   let myFunc: (x: number, y: number) => number;
   myFunc = function(x, y) { return x + y; };
   ```
   
   **3. Special Types**
   ```typescript
   // Unknown (safer than Any)
   let notSure: unknown = 4;
   
   // Void (for functions with no return value)
   function warnUser(): void {
     console.log("Warning message");
   }
   
   // Never (for values that never occur)
   function error(message: string): never {
     throw new Error(message);
   }
   
   // Union Types (one of several types)
   let id: string | number;
   id = 101; // OK
   id = "202"; // OK
   
   // Intersection Types (combination of multiple types)
   interface Employee {
     employeeId: number;
     age: number;
   }
   interface Manager {
     stockPlan: boolean;
   }
   type ManagerEmployee = Employee & Manager;
   ```
   
   **Differences between primitive types and object types:**
   
   1. **Memory Storage**:
      - Primitive types: Stored directly in the variable's memory location
      - Object types: Stored as references to memory locations
   
   2. **Mutability**:
      - Primitive types: Immutable
      - Object types: Mutable
   
   3. **Comparison**:
      - Primitive types: Compared by value
      - Object types: Compared by reference (checks if they refer to the same object)
   
   4. **Type Extensibility**:
      - Primitive types: Cannot be extended
      - Object types: Can be extended through interfaces, classes, etc.

3. **What are the differences between interfaces and type aliases in TypeScript?**
   - In what situations is each one more appropriate to use?
   
   **Answer:**
   Interfaces and type aliases are both ways to define custom types in TypeScript, but they have some key differences in behavior and usage.
   
   **Interface:**
   ```typescript
   interface User {
     name: string;
     age: number;
     greet(): void;
   }
   
   // Extending an interface
   interface Employee extends User {
     employeeId: number;
   }
   
   // Implementation
   class Developer implements User {
     name: string;
     age: number;
     
     constructor(name: string, age: number) {
       this.name = name;
       this.age = age;
     }
     
     greet() {
       console.log(`Hello, I'm ${this.name}`);
     }
   }
   ```
   
   **Type Alias:**
   ```typescript
   type User = {
     name: string;
     age: number;
     greet(): void;
   };
   
   // Extending a type alias using intersection
   type Employee = User & {
     employeeId: number;
   };
   
   const john: User = {
     name: "John",
     age: 30,
     greet() {
       console.log(`Hello, I'm ${this.name}`);
     }
   };
   ```
   
   **Key differences:**
   
   1. **Extension Mechanism**:
      - Interface: Uses the `extends` keyword
      - Type Alias: Uses intersection types (`&`)
   
   2. **Declaration Merging**:
      - Interface: Can be declared multiple times and will automatically merge
      - Type Alias: Cannot be redeclared with the same name
   
   3. **Union/Intersection Types**:
      - Interface: Cannot directly represent union types
      - Type Alias: Can represent union types, intersection types, and more complex types
   
   4. **Computed Properties**:
      - Interface: Limited support for computed properties
      - Type Alias: Better support for mapped types and conditional types
   
   **When to use interfaces:**
   - When defining object shapes that might be extended later
   - When you want to take advantage of declaration merging
   - When creating public API contracts or when working with object-oriented design patterns
   - When implementing a class that should adhere to a contract
   
   **When to use type aliases:**
   - When defining union types, intersection types, tuples, or primitive types
   - When you need advanced type features like mapped types or conditional types
   - When defining function signatures or utility types
   - When you want to ensure types aren't redeclared
   
   **Practical recommendation:**
   The TypeScript documentation recommends using interfaces where possible and only using type aliases when you need to use features that interfaces don't support. However, this distinction has become less clear in recent versions, and consistency within your team and project is most important.

4. **Explain generics in TypeScript.**
   - Provide real-world examples of using generics.
   
   **Answer:**
   Generics in TypeScript allow you to create reusable components that can work with a variety of types rather than a single one. They help you build flexible, type-safe functions, classes, and interfaces.
   
   **Basic generic function:**
   ```typescript
   function identity<T>(arg: T): T {
     return arg;
   }
   
   // Usage
   let output1 = identity<string>("hello"); // type: string
   let output2 = identity(42); // type inference determines T is number
   ```
   
   **Real-world examples of generics:**
   
   **1. Generic interfaces and classes**
   ```typescript
   // Generic interface
   interface Box<T> {
     contents: T;
   }
   
   let numberBox: Box<number> = { contents: 42 };
   let stringBox: Box<string> = { contents: "hello" };
   
   // Generic type alias
   type Container<T> = { value: T };
   
   // Generic object type
   type Dictionary<T> = {
     [key: string]: T;
   };
   
   const numberDict: Dictionary<number> = {
     one: 1,
     two: 2
   };
   ```
   
   **2. Generic React components**
   ```typescript
   // Generic React component
   interface ListProps<T> {
     items: T[];
     renderItem: (item: T) => React.ReactNode;
   }
   
   function List<T>(props: ListProps<T>) {
     return (
       <ul>
         {props.items.map((item, index) => (
           <li key={index}>{props.renderItem(item)}</li>
         ))}
       </ul>
     );
   }
   
   // Usage
   <List<number>
     items={[1, 2, 3]}
     renderItem={(item) => <span>{item * 2}</span>}
   />
   ```
   
   **3. Generic API response handling**
   ```typescript
   async function fetchData<T>(url: string): Promise<T> {
     const response = await fetch(url);
     return response.json();
   }
   
   interface User {
     id: number;
     name: string;
   }
   
   // Usage
   const user = await fetchData<User>('/api/users/1');
   console.log(user.name); // Type safety guaranteed
   ```
   
   **4. Generic constraints**
   ```typescript
   // Using constraints to require specific properties
   interface Lengthwise {
     length: number;
   }
   
   function loggingIdentity<T extends Lengthwise>(arg: T): T {
     console.log(arg.length); // Now we know it has a .length property
     return arg;
   }
   
   loggingIdentity("hello"); // string has .length property
   loggingIdentity([1, 2, 3]); // arrays have .length property
   // loggingIdentity(3); // Error: number doesn't have .length property
   ```
   
   **5. Multiple type parameters**
   ```typescript
   function pair<T, U>(first: T, second: U): [T, U] {
     return [first, second];
   }
   
   const p1 = pair("hello", 42); // type: [string, number]
   ```
   
   **6. Generic default types**
   ```typescript
   interface ApiResponse<T = any> {
     data: T;
     status: number;
     message: string;
   }
   
   // Default to any if no type specified
   function getResponse(): ApiResponse {
     return { data: {}, status: 200, message: "Success" };
   }
   
   // Specify the data type
   function getUserResponse(): ApiResponse<User> {
     return {
       data: { id: 1, name: "John" },
       status: 200,
       message: "Success"
     };
   }
   
   // Usage
   const response = getUserResponse();
   console.log(response.data.name); // Type safety guaranteed
   ```
   
   **Benefits of generics:**
   - **Type Safety**: Type checking at compile time
   - **Code Reusability**: Apply the same logic to different types
   - **Type Inference**: Automatic type deduction based on context
   - **Maintainability**: Types are clearly documented for better code understanding

5. **How does type inference work in TypeScript?**
   - How do you balance explicit type annotations and type inference?
   
   **Answer:**
   Type inference in TypeScript is the process by which the compiler automatically determines types without explicit type annotations. It analyzes variable initializations, function return values, and the context in which expressions are used.
   
   **Examples of type inference:**
   
   **1. Variable initialization**
   ```typescript
   // Type inference from initialization
   let name = "Alice"; // Inferred as string
   let age = 30; // Inferred as number
   let isActive = true; // Inferred as boolean
   
   // Array inference
   let numbers = [1, 2, 3]; // Inferred as number[]
   ```
   
   **2. Return type inference**
   ```typescript
   // Return type inference
   function add(a: number, b: number) {
     return a + b; // Return type inferred as number
   }
   
   function getUser() {
     return { name: "John", age: 30 }; // Return type inferred as { name: string; age: number; }
   }
   ```
   
   **3. Context-based type inference**
   ```typescript
   // Context-based type inference
   const names = ["Alice", "Bob", "Charlie"]; // string[] type inferred
   
   // Parameter name is inferred as string from context
   names.forEach(name => {
     console.log(name.toUpperCase());
   });
   ```
   
   **4. Best common type algorithm**
   ```typescript
   // Best common type algorithm
   let mixed = [1, "hello", true]; // Inferred as (string | number | boolean)[]
   
   // Function parameter types inferred from usage
   function firstElement<T>(arr: T[]) {
     return arr[0]; // Return type inferred as T | undefined
   }
   ```
   
   **5. Destructuring inference**
   ```typescript
   // Type inference in destructuring
   const { name, age } = person;
   // name inferred as string, age inferred as number
   ```
   
   **6. Union type inference**
   ```typescript
   // Union type inference in conditionals
   function getLength(value: string | string[]) {
     return value.length; // length property exists on both string and string[]
   }
   
   // Type narrowing through type guards
   function formatValue(value: string | number) {
     if (typeof value === "string") {
       // value is inferred as string in this block
       return value.toUpperCase();
     }
     // value is inferred as number in this block
     return value.toFixed(2);
   }
   ```
   
   **7. Generic type inference**
   ```typescript
   // Type inference in generic functions
   function identity<T>(arg: T): T {
     return arg;
   }
   
   const str = identity("hello"); // T is inferred as string
   const num = identity(42); // T is inferred as number
   
   // Generic type argument inference
   function first<T>(arr: T[]): T | undefined {
     return arr[0];
   }
   
   const value = first([1, 2, 3]); // value's type is inferred as number | undefined
   ```
   
   **Balancing explicit type annotations and type inference:**
   
   **When explicit type annotations are useful:**
   
   1. **Function parameters**: To clearly define function interfaces
   ```typescript
   function greet(name: string) {
     console.log(`Hello, ${name}!`);
   }
   ```
   
   2. **Empty arrays or objects**: When initial values don't provide enough information
   ```typescript
   // Inferred as any[]
   const names = [];
   
   // Explicit type annotation
   const names: string[] = [];
   ```
   
   3. **When union types are needed**
   ```typescript
   // Inferred as number
   let id = 1;
   
   // Explicit type for more flexibility
   let id: string | number = 1;
   id = "abc"; // Now allowed
   ```
   
   4. **Library return values or API responses**: To ensure type safety
   ```typescript
   interface User {
     id: number;
     name: string;
   }
   
   async function fetchUser(): Promise<User> {
     const response = await fetch('/api/user');
     return response.json();
   }
   ```
   
   5. **Complex types or object structures**: For documentation purposes
   ```typescript
   interface ComplexObject {
     id: number;
     data: {
       values: Array<{
         id: string;
         amount: number;
       }>;
     };
   }
   
   const obj: ComplexObject = { /* ... */ };
   ```
   
   **When relying on type inference is better:**
   
   1. **Simple variable initialization**
   ```typescript
   const name = "Alice"; // Explicit type unnecessary
   const age = 30;
   const isActive = true;
   ```
   
   2. **Object literals and arrays**
   ```typescript
   const person = {
     name: "Alice",
     age: 30
   }; // Inference is accurate enough
   
   const numbers = [1, 2, 3]; // Accurately inferred as number[]
   ```
   
   3. **Callback function parameters**
   ```typescript
   [1, 2, 3].map(num => num * 2); // num is inferred as number
   ```
   
   4. **Generic function calls**
   ```typescript
   function identity<T>(value: T): T {
     return value;
   }
   
   const result = identity("hello"); // No need to explicitly specify <string>
   ```
   
   **Balanced approach:**
   
   1. Apply the principle of "only annotate when unclear"
   2. Use explicit types for public APIs and function signatures
   3. Rely on inference for implementation details
   4. Establish consistent conventions within your team
   5. Use static analysis tools (ESLint + TypeScript plugins) to maintain consistency
   
   This balanced approach enhances code readability and maintainability while maximizing the type safety benefits of TypeScript.
