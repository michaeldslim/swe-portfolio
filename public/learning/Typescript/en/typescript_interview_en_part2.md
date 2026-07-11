# TypeScript Developer Interview Questions - Part 2

## Advanced Concepts

6. **Explain Type Guards in TypeScript.**
   - Describe various type guard patterns and use cases with examples.
   
   **Answer:**
   Type Guards are expressions that narrow down the type of a variable within a specific scope. They help improve type safety by refining complex types like union types into more specific types.
   
   **Main Type Guard Patterns:**
   
   **1. typeof Type Guard**
   ```typescript
   function printValue(value: string | number) {
     if (typeof value === "string") {
       // In this block, value is of type string
       console.log(value.toUpperCase());
     } else {
       // In this block, value is of type number
       console.log(value.toFixed(2));
     }
   }
   ```
   
   **2. instanceof Type Guard**
   ```typescript
   class Dog {
     bark() { return "Woof!"; }
   }
   
   class Cat {
     meow() { return "Meow!"; }
   }
   
   function makeSound(animal: Dog | Cat) {
     if (animal instanceof Dog) {
       // In this block, animal is of type Dog
       return animal.bark();
     } else {
       // In this block, animal is of type Cat
       return animal.meow();
     }
   }
   ```
   
   **3. in Operator Type Guard**
   ```typescript
   interface Bird {
     fly(): void;
     layEggs(): void;
   }
   
   interface Fish {
     swim(): void;
     layEggs(): void;
   }
   
   function move(pet: Bird | Fish) {
     if ("fly" in pet) {
       // In this block, pet is of type Bird
       pet.fly();
     } else {
       // In this block, pet is of type Fish
       pet.swim();
     }
   }
   ```
   
   **4. User-Defined Type Guards (Type Predicates)**
   ```typescript
   interface Car {
     make: string;
     model: string;
     year: number;
   }
   
   interface Motorcycle {
     make: string;
     model: string;
     year: number;
     wheelCount: number;
   }
   
   // User-defined type guard function
   function isMotorcycle(vehicle: Car | Motorcycle): vehicle is Motorcycle {
     return (vehicle as Motorcycle).wheelCount !== undefined;
   }
   
   function repairVehicle(vehicle: Car | Motorcycle) {
     if (isMotorcycle(vehicle)) {
       // In this block, vehicle is of type Motorcycle
       console.log(`Repairing ${vehicle.make} ${vehicle.model} motorcycle with ${vehicle.wheelCount} wheels`);
     } else {
       // In this block, vehicle is of type Car
       console.log(`Repairing ${vehicle.make} ${vehicle.model} car`);
     }
   }
   ```
   
   **5. Discriminated Unions Type Guard**
   ```typescript
   type Shape = 
     | { kind: "circle"; radius: number }
     | { kind: "rectangle"; width: number; height: number }
     | { kind: "triangle"; base: number; height: number };
   
   function calculateArea(shape: Shape): number {
     switch (shape.kind) {
       case "circle":
         // In this block, shape is of type { kind: "circle"; radius: number }
         return Math.PI * shape.radius ** 2;
       case "rectangle":
         // In this block, shape is of type { kind: "rectangle"; width: number; height: number }
         return shape.width * shape.height;
       case "triangle":
         // In this block, shape is of type { kind: "triangle"; base: number; height: number }
         return 0.5 * shape.base * shape.height;
       default:
         // Check if all cases are handled (type safety)
         const _exhaustiveCheck: never = shape;
         return _exhaustiveCheck;
     }
   }
   ```
   
   **6. null/undefined Check Type Guard**
   ```typescript
   function printLength(text: string | null | undefined) {
     // Check for null and undefined
     if (text === null) {
       console.log("Text is null");
     } else if (text === undefined) {
       console.log("Text is undefined");
     } else {
       // In this block, text is of type string
       console.log(`Text length: ${text.length}`);
     }
     
     // Or using a truthy check
     if (text) {
       // In this block, text is of type string (excluding falsy values)
       console.log(`Text length: ${text.length}`);
     } else {
       console.log("Text is null or undefined");
     }
   }
   ```
   
   **7. Type Assertion Functions**
   ```typescript
   function assertIsString(val: any): asserts val is string {
     if (typeof val !== "string") {
       throw new Error("Not a string!");
     }
   }
   
   function processValue(value: any) {
     assertIsString(value);
     // After the assertion, value is treated as string
     console.log(value.toUpperCase());
   }
   ```
   
   **8. Equality Narrowing**
   ```typescript
   function example(x: string | number, y: string | boolean) {
     if (x === y) {
       // In this block, both x and y are of type string
       // because that's the only common type between them
       console.log(x.toUpperCase());
       console.log(y.toUpperCase());
     } else {
       // x is string | number
       // y is string | boolean
     }
   }
   ```
   
   **Benefits of Type Guards:**
   
   1. **Type Safety**: Prevents runtime errors by ensuring operations are valid for the type
   2. **Improved IDE Support**: Better code completion and type hints
   3. **Enhanced Readability**: Clearly expresses intent
   4. **Refactoring Safety**: Easier to identify affected code when types change
   5. **Union Type Handling**: Safely work with complex type combinations

7. **Explain advanced type features in TypeScript.**
   - Describe conditional types, mapped types, template literal types, etc., with examples.
   
   **Answer:**
   TypeScript provides several advanced type features that enable powerful type transformations and relationships.
   
   **1. Conditional Types**
   
   Conditional types select a type based on a condition, similar to a ternary operator for types.
   
   ```typescript
   // Basic conditional type
   type IsString<T> = T extends string ? true : false;
   
   type A = IsString<string>; // true
   type B = IsString<number>; // false
   
   // With generic constraints
   type MessageOf<T extends { message: unknown }> = T["message"];
   type Message = MessageOf<{ message: string }>; // string
   
   // Conditional type for type filtering
   type NonNullable<T> = T extends null | undefined ? never : T;
   type Defined = NonNullable<string | null | undefined>; // string
   ```
   
   **2. Mapped Types**
   
   Mapped types create new types by transforming properties of existing types.
   
   ```typescript
   // Basic mapped type
   type Readonly<T> = {
     readonly [P in keyof T]: T[P];
   };
   
   interface User {
     id: number;
     name: string;
   }
   
   type ReadonlyUser = Readonly<User>;
   // { readonly id: number; readonly name: string; }
   
   // Mapped type with modifiers
   type Optional<T> = {
     [P in keyof T]?: T[P];
   };
   
   type OptionalUser = Optional<User>;
   // { id?: number; name?: string; }
   
   // Property remapping with as
   type Getters<T> = {
     [P in keyof T as `get${Capitalize<string & P>}`]: () => T[P];
   };
   
   type UserGetters = Getters<User>;
   // { getId: () => number; getName: () => string; }
   
   // Property value transformation
   type Nullable<T> = {
     [P in keyof T]: T[P] | null;
   };
   
   type NullableUser = Nullable<User>;
   // { id: number | null; name: string | null; }
   ```
   
   **3. Template Literal Types**
   
   Template literal types create new string types based on string literal types.
   
   ```typescript
   // Basic template literal type
   type Greeting = `Hello, ${string}`;
   let greeting: Greeting = "Hello, World"; // Valid
   // let invalid: Greeting = "Hi there"; // Error
   
   // With union types
   type Direction = "top" | "right" | "bottom" | "left";
   type Position = `${Direction}-${number}`;
   
   let pos1: Position = "top-10"; // Valid
   let pos2: Position = "right-20"; // Valid
   // let pos3: Position = "center-10"; // Error
   
   // Creating event handler types
   type EventName = "click" | "mousedown" | "mouseup";
   type EventHandler = `on${Capitalize<EventName>}`;
   
   type Handlers = {
     [E in EventHandler]: () => void;
   };
   
   // { onClick: () => void; onMousedown: () => void; onMouseup: () => void; }
   ```
   
   **4. Index Types**
   
   Index types allow for dynamic access to object properties.
   
   ```typescript
   // Index type query operator: keyof
   interface Person {
     name: string;
     age: number;
     address: string;
   }
   
   type PersonKeys = keyof Person; // "name" | "age" | "address"
   
   // Indexed access type: T[K]
   type PersonName = Person["name"]; // string
   
   // With generics
   function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
     return obj[key];
   }
   
   const person: Person = {
     name: "John",
     age: 30,
     address: "123 Main St"
   };
   
   const name = getProperty(person, "name"); // string
   const age = getProperty(person, "age"); // number
   // const invalid = getProperty(person, "email"); // Error
   ```
   
   **5. Utility Types**
   
   TypeScript provides built-in utility types for common type transformations.
   
   ```typescript
   interface Todo {
     title: string;
     description: string;
     completed: boolean;
     createdAt: number;
   }
   
   // Partial: Makes all properties optional
   type PartialTodo = Partial<Todo>;
   // { title?: string; description?: string; completed?: boolean; createdAt?: number; }
   
   // Required: Makes all properties required
   type RequiredTodo = Required<Partial<Todo>>;
   // { title: string; description: string; completed: boolean; createdAt: number; }
   
   // Readonly: Makes all properties readonly
   type ReadonlyTodo = Readonly<Todo>;
   
   // Pick: Selects specific properties
   type TodoPreview = Pick<Todo, "title" | "completed">;
   // { title: string; completed: boolean; }
   
   // Omit: Excludes specific properties
   type TodoInfo = Omit<Todo, "createdAt">;
   // { title: string; description: string; completed: boolean; }
   
   // Record: Creates a type with specified keys and value type
   type PageConfig = Record<"home" | "about" | "contact", { title: string; url: string }>;
   // { home: { title: string; url: string }; about: { title: string; url: string }; contact: { title: string; url: string }; }
   
   // Exclude: Excludes types from a union
   type T1 = Exclude<"a" | "b" | "c", "a">; // "b" | "c"
   
   // Extract: Extracts types from a union
   type T2 = Extract<"a" | "b" | "c", "a" | "b">; // "a" | "b"
   
   // NonNullable: Excludes null and undefined
   type T3 = NonNullable<string | number | undefined | null>; // string | number
   
   // Parameters: Extracts parameter types from a function
   type T4 = Parameters<(a: string, b: number) => void>; // [string, number]
   
   // ReturnType: Extracts the return type of a function
   type T5 = ReturnType<() => string>; // string
   
   // InstanceType: Extracts the instance type of a constructor function
   class C {
     x = 0;
     y = 0;
   }
   type T6 = InstanceType<typeof C>; // C
   ```
   
   **6. Recursive Types**
   
   Recursive types refer to themselves, allowing for nested data structures.
   
   ```typescript
   // Recursive type example: nested object structure
   type NestedObject<T> = {
     value: T;
     children?: NestedObject<T>[];
   };
   
   const tree: NestedObject<string> = {
     value: "root",
     children: [
       { value: "child1" },
       {
         value: "child2",
         children: [
           { value: "grandchild1" },
           { value: "grandchild2" }
         ]
       }
     ]
   };
   
   // JSON value type definition
   type JSONValue =
     | string
     | number
     | boolean
     | null
     | JSONValue[]
     | { [key: string]: JSONValue };
   
   const json: JSONValue = {
     name: "John",
     age: 30,
     isActive: true,
     address: null,
     skills: ["TypeScript", "JavaScript"],
     metadata: {
       lastLogin: "2023-01-01",
       preferences: {
         theme: "dark"
       }
     }
   };
   ```
   
   **7. Intersection Types**
   
   Intersection types combine multiple types into a new type.
   
   ```typescript
   interface Person {
     name: string;
     age: number;
   }
   
   interface Employee {
     companyId: string;
     role: string;
   }
   
   type EmployeePerson = Person & Employee;
   
   const worker: EmployeePerson = {
     name: "John",
     age: 30,
     companyId: "E123",
     role: "Developer"
   };
   ```
   
   **Real-world use cases for advanced type features:**
   
   **1. API Response Type Definitions**
   ```typescript
   // Basic API response type
   type ApiResponse<T> = {
     data: T;
     status: number;
     message: string;
     timestamp: number;
   };
   
   // Paginated response type
   type PaginatedResponse<T> = ApiResponse<{
     items: T[];
     total: number;
     page: number;
     pageSize: number;
   }>;
   
   // Usage example
   interface User {
     id: number;
     name: string;
   }
   
   type UserResponse = ApiResponse<User>;
   type UsersResponse = PaginatedResponse<User>;
   ```
   
   **2. Form State Management**
   ```typescript
   interface FormField {
     value: string;
     error?: string;
     touched: boolean;
   }
   
   type FormState<T> = {
     [K in keyof T]: FormField;
   };
   
   interface UserForm {
     name: string;
     email: string;
     password: string;
   }
   
   type UserFormState = FormState<UserForm>;
   
   // Result:
   // {
   //   name: { value: string; error?: string; touched: boolean; };
   //   email: { value: string; error?: string; touched: boolean; };
   //   password: { value: string; error?: string; touched: boolean; };
   // }
   ```
   
   **3. Type-Safe Event System**
   ```typescript
   type EventMap = {
     click: { x: number; y: number };
     change: { oldValue: string; newValue: string };
     submit: { data: Record<string, unknown> };
   };
   
   type EventKey = keyof EventMap;
   
   function addEventListener<K extends EventKey>(
     event: K,
     handler: (data: EventMap[K]) => void
   ) {
     // Implementation...
   }
   
   addEventListener("click", (data) => {
     // data is of type { x: number; y: number }
     console.log(`Clicked at ${data.x}, ${data.y}`);
   });
   
   addEventListener("change", (data) => {
     // data is of type { oldValue: string; newValue: string }
     console.log(`Value changed from ${data.oldValue} to ${data.newValue}`);
   });
   ```
