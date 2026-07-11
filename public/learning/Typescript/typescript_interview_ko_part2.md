# TypeScript 개발자 인터뷰 질문 - Part 2

## 고급 개념

6. **TypeScript의 타입 가드(Type Guards)에 대해 설명해주세요.**
   - 다양한 타입 가드 패턴과 사용 사례를 예시와 함께 설명해주세요.
   
   **답변:**
   타입 가드(Type Guards)는 특정 스코프 내에서 변수의 타입을 좁히는(narrowing) 표현식입니다. 이를 통해 유니온 타입과 같은 복합 타입을 더 구체적인 타입으로 좁혀 타입 안전성을 높일 수 있습니다.
   
   **주요 타입 가드 패턴:**
   
   **1. typeof 타입 가드**
   ```typescript
   function printValue(value: string | number) {
     if (typeof value === "string") {
       // 이 블록 내에서 value는 string 타입
       console.log(value.toUpperCase());
     } else {
       // 이 블록 내에서 value는 number 타입
       console.log(value.toFixed(2));
     }
   }
   ```
   
   **2. instanceof 타입 가드**
   ```typescript
   class Dog {
     bark() { return "Woof!"; }
   }
   
   class Cat {
     meow() { return "Meow!"; }
   }
   
   function makeSound(animal: Dog | Cat) {
     if (animal instanceof Dog) {
       // 이 블록 내에서 animal은 Dog 타입
       return animal.bark();
     } else {
       // 이 블록 내에서 animal은 Cat 타입
       return animal.meow();
     }
   }
   ```
   
   **3. in 연산자 타입 가드**
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
       // 이 블록 내에서 pet은 Bird 타입
       pet.fly();
     } else {
       // 이 블록 내에서 pet은 Fish 타입
       pet.swim();
     }
   }
   ```
   
   **4. 사용자 정의 타입 가드 (Type Predicates)**
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
   
   // 사용자 정의 타입 가드 함수
   function isMotorcycle(vehicle: Car | Motorcycle): vehicle is Motorcycle {
     return (vehicle as Motorcycle).wheelCount !== undefined;
   }
   
   function repairVehicle(vehicle: Car | Motorcycle) {
     if (isMotorcycle(vehicle)) {
       // 이 블록 내에서 vehicle은 Motorcycle 타입
       console.log(`Repairing ${vehicle.make} ${vehicle.model} motorcycle with ${vehicle.wheelCount} wheels`);
     } else {
       // 이 블록 내에서 vehicle은 Car 타입
       console.log(`Repairing ${vehicle.make} ${vehicle.model} car`);
     }
   }
   ```
   
   **5. 식별 유니온(Discriminated Unions) 타입 가드**
   ```typescript
   type Shape = 
     | { kind: "circle"; radius: number }
     | { kind: "rectangle"; width: number; height: number }
     | { kind: "triangle"; base: number; height: number };
   
   function calculateArea(shape: Shape): number {
     switch (shape.kind) {
       case "circle":
         // 이 블록 내에서 shape는 { kind: "circle"; radius: number } 타입
         return Math.PI * shape.radius ** 2;
       case "rectangle":
         // 이 블록 내에서 shape는 { kind: "rectangle"; width: number; height: number } 타입
         return shape.width * shape.height;
       case "triangle":
         // 이 블록 내에서 shape는 { kind: "triangle"; base: number; height: number } 타입
         return 0.5 * shape.base * shape.height;
       default:
         // 모든 경우를 처리했는지 확인 (타입 안전성)
         const _exhaustiveCheck: never = shape;
         return _exhaustiveCheck;
     }
   }
   ```
   
   **6. null/undefined 체크 타입 가드**
   ```typescript
   function printLength(text: string | null | undefined) {
     // null과 undefined 체크
     if (text === null) {
       console.log("Text is null");
     } else if (text === undefined) {
       console.log("Text is undefined");
     } else {
       // 이 블록 내에서 text는 string 타입
       console.log(`Text length: ${text.length}`);
     }
     
     // 또는 더 간단하게
     if (text) {
       // 이 블록 내에서 text는 string 타입 (falsy 값 제외)
       console.log(`Text length: ${text.length}`);
     } else {
       console.log("Text is null or undefined");
     }
   }
   ```
   
   **7. 타입 단언(Type Assertion) 함수**
   ```typescript
   function assertIsString(val: any): asserts val is string {
     if (typeof val !== "string") {
       throw new Error("Not a string!");
     }
   }
   
   function processValue(value: unknown) {
     assertIsString(value);
     // 이 지점 이후로 value는 string 타입으로 처리됨
     console.log(value.toUpperCase());
   }
   ```
   
   **8. 배열 타입 가드**
   ```typescript
   function processItems(items: (string | number)[]): void {
     // 배열 요소별 타입 가드
     items.forEach(item => {
       if (typeof item === "string") {
         console.log(item.toUpperCase());
       } else {
         console.log(item.toFixed(2));
       }
     });
     
     // 배열 필터링으로 타입 가드
     const strings = items.filter((item): item is string => typeof item === "string");
     strings.forEach(str => console.log(str.toUpperCase()));
     
     const numbers = items.filter((item): item is number => typeof item === "number");
     numbers.forEach(num => console.log(num.toFixed(2)));
   }
   ```
   
   **타입 가드의 이점:**
   
   1. **타입 안전성 향상**: 런타임 오류 방지
   2. **IDE 지원 개선**: 코드 자동 완성 및 타입 힌트
   3. **코드 가독성 향상**: 의도를 명확히 표현
   4. **리팩토링 안전성**: 타입 변경 시 영향 받는 코드 식별 용이
   5. **유니온 타입 활용**: 복잡한 타입 조합을 안전하게 처리

7. **TypeScript의 고급 타입 기능에 대해 설명해주세요.**
   - 조건부 타입, 매핑된 타입, 템플릿 리터럴 타입 등을 예시와 함께 설명해주세요.
   
   **답변:**
   TypeScript는 복잡한 타입 관계를 표현하기 위한 다양한 고급 타입 기능을 제공합니다. 이러한 기능들은 타입 시스템의 표현력을 크게 향상시키고, 더 정확하고 유연한 타입 정의를 가능하게 합니다.
   
   **1. 조건부 타입(Conditional Types)**
   
   조건부 타입은 타입 수준에서 조건문을 사용할 수 있게 해주는 기능입니다.
   
   ```typescript
   // 기본 조건부 타입 문법
   type Check<T> = T extends string ? "string" : "non-string";
   
   type A = Check<string>; // "string"
   type B = Check<number>; // "non-string"
   
   // 실용적인 예시: 함수 반환 타입 추출
   type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
   
   function greet() { return "Hello"; }
   type GreetReturn = ReturnType<typeof greet>; // string
   
   // 유니온 타입과 함께 사용 (분배 조건부 타입)
   type ToArray<T> = T extends any ? T[] : never;
   type StringOrNumberArray = ToArray<string | number>; // string[] | number[]
   
   // 제네릭 제약 조건과 함께 사용
   type MessageOf<T extends { message: unknown }> = T["message"];
   type Message = MessageOf<{ message: string }>; // string
   
   // 조건부 타입으로 타입 필터링
   type NonNullable<T> = T extends null | undefined ? never : T;
   type Defined = NonNullable<string | null | undefined>; // string
   ```
   
   **2. 매핑된 타입(Mapped Types)**
   
   매핑된 타입은 기존 타입의 속성을 변환하여 새로운 타입을 생성합니다.
   
   ```typescript
   // 기본 매핑된 타입 문법
   type Readonly<T> = {
     readonly [P in keyof T]: T[P];
   };
   
   interface User {
     id: number;
     name: string;
   }
   
   type ReadonlyUser = Readonly<User>;
   // { readonly id: number; readonly name: string; }
   
   // 선택적 속성 만들기
   type Partial<T> = {
     [P in keyof T]?: T[P];
   };
   
   type PartialUser = Partial<User>;
   // { id?: number; name?: string; }
   
   // 속성 이름 변경
   type Prefixed<T> = {
     [P in keyof T as `prefix_${string & P}`]: T[P];
   };
   
   type PrefixedUser = Prefixed<User>;
   // { prefix_id: number; prefix_name: string; }
   
   // 특정 속성 필터링
   type PickByType<T, U> = {
     [P in keyof T as T[P] extends U ? P : never]: T[P];
   };
   
   interface Mixed {
     id: number;
     name: string;
     isActive: boolean;
   }
   
   type StringProps = PickByType<Mixed, string>; // { name: string; }
   
   // 속성 값 변환
   type Nullable<T> = {
     [P in keyof T]: T[P] | null;
   };
   
   type NullableUser = Nullable<User>;
   // { id: number | null; name: string | null; }
   ```
   
   **3. 템플릿 리터럴 타입(Template Literal Types)**
   
   템플릿 리터럴 타입은 문자열 리터럴 타입을 기반으로 새로운 문자열 타입을 생성합니다.
   
   ```typescript
   // 기본 템플릿 리터럴 타입
   type Greeting = `Hello, ${string}`;
   let g1: Greeting = "Hello, World"; // 유효
   // let g2: Greeting = "Hi, World"; // 오류: "Hello, "로 시작해야 함
   
   // 유니온 타입과 함께 사용
   type Direction = "top" | "right" | "bottom" | "left";
   type Position = "start" | "center" | "end";
   
   type EdgePosition = `${Direction}-${Position}`;
   // "top-start" | "top-center" | "top-end" | "right-start" | ... 등 12개 조합
   
   // 실용적인 예시: CSS 속성 타입
   type CSSValue = number | `${number}px` | `${number}%`;
   
   function setPosition(position: { x: CSSValue, y: CSSValue }) {
     // ...
   }
   
   setPosition({ x: 10, y: "20px" }); // 유효
   setPosition({ x: "50%", y: 0 }); // 유효
   
   // 매핑된 타입과 함께 사용
   type EventHandler<T extends string> = {
     [K in T as `on${Capitalize<K>}`]: () => void;
   };
   
   type MouseEvents = EventHandler<"click" | "mousedown" | "mouseup">;
   // { onClick: () => void; onMousedown: () => void; onMouseup: () => void; }
   ```
   
   **4. 인덱스 타입(Index Types)**
   
   인덱스 타입은 객체의 속성에 동적으로 접근할 수 있게 해줍니다.
   
   ```typescript
   // 인덱스 타입 쿼리 연산자: keyof
   interface Person {
     name: string;
     age: number;
     address: string;
   }
   
   type PersonKeys = keyof Person; // "name" | "age" | "address"
   
   // 인덱스 접근 타입: T[K]
   type AgeType = Person["age"]; // number
   
   // 동적 속성 접근
   function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
     return obj[key];
   }
   
   const person: Person = {
     name: "John",
     age: 30,
     address: "123 Main St"
   };
   
   const name = getProperty(person, "name"); // 타입: string
   const age = getProperty(person, "age"); // 타입: number
   // const invalid = getProperty(person, "invalid"); // 오류: "invalid"는 Person의 키가 아님
   ```
   
   **5. 유틸리티 타입(Utility Types)**
   
   TypeScript는 타입 변환을 위한 내장 유틸리티 타입을 제공합니다.
   
   ```typescript
   interface Todo {
     title: string;
     description: string;
     completed: boolean;
     createdAt: number;
   }
   
   // Partial: 모든 속성을 선택적으로 만듦
   type PartialTodo = Partial<Todo>;
   // { title?: string; description?: string; completed?: boolean; createdAt?: number; }
   
   // Required: 모든 속성을 필수로 만듦
   type RequiredTodo = Required<Partial<Todo>>;
   // { title: string; description: string; completed: boolean; createdAt: number; }
   
   // Readonly: 모든 속성을 읽기 전용으로 만듦
   type ReadonlyTodo = Readonly<Todo>;
   
   // Pick: 특정 속성만 선택
   type TodoPreview = Pick<Todo, "title" | "completed">;
   // { title: string; completed: boolean; }
   
   // Omit: 특정 속성을 제외
   type TodoInfo = Omit<Todo, "createdAt">;
   // { title: string; description: string; completed: boolean; }
   
   // Record: 키-값 쌍 타입 생성
   type PageInfo = Record<"home" | "about" | "contact", { title: string; url: string }>;
   
   // Exclude: 타입에서 특정 타입 제외
   type T0 = Exclude<"a" | "b" | "c", "a">; // "b" | "c"
   
   // Extract: 타입에서 특정 타입만 추출
   type T1 = Extract<"a" | "b" | "c", "a" | "f">; // "a"
   
   // NonNullable: null과 undefined 제외
   type T2 = NonNullable<string | number | undefined | null>; // string | number
   
   // Parameters: 함수 매개변수 타입 추출
   type T3 = Parameters<(a: string, b: number) => void>; // [string, number]
   
   // ReturnType: 함수 반환 타입 추출
   type T4 = ReturnType<() => string>; // string
   
   // InstanceType: 생성자 함수의 인스턴스 타입 추출
   class C {
     x = 0;
     y = 0;
   }
   type T5 = InstanceType<typeof C>; // C
   ```
   
   **6. 재귀적 타입(Recursive Types)**
   
   재귀적 타입은 자기 자신을 참조하는 타입으로, 중첩된 데이터 구조를 표현할 수 있습니다.
   
   ```typescript
   // 재귀적 타입 예시: 중첩된 객체 구조
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
   
   // JSON 값 타입 정의
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
   
   **7. 인터섹션 타입(Intersection Types)**
   
   인터섹션 타입은 여러 타입을 결합하여 새로운 타입을 만듭니다.
   
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
   
   **고급 타입 기능의 실제 사용 사례:**
   
   **1. API 응답 타입 정의**
   ```typescript
   // 기본 API 응답 타입
   type ApiResponse<T> = {
     data: T;
     status: number;
     message: string;
     timestamp: number;
   };
   
   // 페이지네이션 응답 타입
   type PaginatedResponse<T> = ApiResponse<{
     items: T[];
     total: number;
     page: number;
     pageSize: number;
   }>;
   
   // 사용 예시
   interface User {
     id: number;
     name: string;
   }
   
   type UserResponse = ApiResponse<User>;
   type UsersResponse = PaginatedResponse<User>;
   ```
   
   **2. 폼 상태 관리**
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
   
   // 결과:
   // {
   //   name: { value: string; error?: string; touched: boolean; };
   //   email: { value: string; error?: string; touched: boolean; };
   //   password: { value: string; error?: string; touched: boolean; };
   // }
   ```
   
   **3. 타입 안전한 이벤트 시스템**
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
     // 구현...
   }
   
   addEventListener("click", (data) => {
     // data는 { x: number; y: number } 타입
     console.log(`Clicked at ${data.x}, ${data.y}`);
   });
   
   addEventListener("change", (data) => {
     // data는 { oldValue: string; newValue: string } 타입
     console.log(`Value changed from ${data.oldValue} to ${data.newValue}`);
   });
   ```
