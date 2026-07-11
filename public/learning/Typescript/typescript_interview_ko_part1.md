# TypeScript 개발자 인터뷰 질문 - Part 1

## 기본 개념

1. **TypeScript란 무엇이며 JavaScript와 어떤 차이점이 있나요?**
   - TypeScript를 사용하는 주요 이점은 무엇인가요?
   
   **답변:**
   TypeScript는 Microsoft에서 개발한 JavaScript의 상위 집합(Superset) 언어로, 정적 타입 시스템을 JavaScript에 추가한 언어입니다. TypeScript 코드는 컴파일 과정을 거쳐 일반 JavaScript로 변환됩니다.
   
   **주요 차이점:**
   - **타입 시스템**: TypeScript는 정적 타입을 지원하지만, JavaScript는 동적 타입 언어입니다.
   - **컴파일 과정**: TypeScript는 컴파일 과정이 필요하지만, JavaScript는 인터프리터 언어입니다.
   - **오류 감지**: TypeScript는 컴파일 시점에 오류를 감지할 수 있지만, JavaScript는 런타임에만 오류를 발견할 수 있습니다.
   - **객체 지향 기능**: TypeScript는 인터페이스, 제네릭, 열거형 등 추가적인 객체 지향 프로그래밍 기능을 제공합니다.
   
   **TypeScript 사용의 주요 이점:**
   - **향상된 개발자 경험**: 코드 자동 완성, 타입 추론, 인터페이스 정의 등으로 개발 생산성 향상
   - **오류 조기 발견**: 컴파일 시점에 타입 관련 오류 감지
   - **안전한 리팩토링**: 타입 시스템이 코드 변경 시 발생할 수 있는 문제 식별 지원
   - **명확한 코드 문서화**: 타입 정의를 통한 코드의 의도와 구조 명확화
   - **대규모 애플리케이션 개발**: 복잡한 코드베이스 관리에 유리
   - **생태계 지원**: 주요 프레임워크 및 라이브러리와의 우수한 통합

2. **TypeScript의 기본 타입에 대해 설명해주세요.**
   - 원시 타입과 객체 타입의 차이점은 무엇인가요?
   
   **답변:**
   TypeScript는 JavaScript의 기본 타입을 모두 포함하며, 추가적인 타입 기능을 제공합니다.
   
   **기본 타입:**
   
   **1. 원시 타입(Primitive Types)**
   ```typescript
   // Boolean
   let isDone: boolean = false;
   
   // Number (정수, 소수, 2진수, 8진수, 16진수 등)
   let decimal: number = 6;
   let hex: number = 0xf00d;
   let binary: number = 0b1010;
   
   // String
   let color: string = "blue";
   let greeting: string = `Hello, my name is ${name}`;
   
   // Null과 Undefined
   let n: null = null;
   let u: undefined = undefined;
   
   // Symbol (ES6)
   let sym: symbol = Symbol("key");
   
   // BigInt (ES2020)
   let bigInt: bigint = 100n;
   ```
   
   **2. 객체 타입(Object Types)**
   ```typescript
   // Array
   let list1: number[] = [1, 2, 3];
   let list2: Array<number> = [1, 2, 3]; // 제네릭 배열 타입
   
   // Tuple (고정된 요소 수와 타입을 가진 배열)
   let tuple: [string, number] = ["hello", 10];
   
   // Enum
   enum Color {Red, Green, Blue}
   let c: Color = Color.Green;
   
   // Any (어떤 타입이든 허용)
   let notSure: any = 4;
   notSure = "maybe a string";
   notSure = false;
   
   // Object
   let obj: object = {key: "value"};
   
   // 인터페이스를 통한 객체 타입 정의
   interface Person {
     name: string;
     age: number;
   }
   let person: Person = {name: "John", age: 30};
   
   // 함수 타입
   let myFunc: (x: number, y: number) => number;
   myFunc = function(x, y) { return x + y; };
   ```
   
   **3. 특수 타입**
   ```typescript
   // Unknown (Any보다 더 안전한 타입)
   let notSure: unknown = 4;
   
   // Void (반환 값이 없는 함수)
   function warnUser(): void {
     console.log("Warning message");
   }
   
   // Never (절대 발생하지 않는 값의 타입)
   function error(message: string): never {
     throw new Error(message);
   }
   
   // Union Types (여러 타입 중 하나)
   let id: string | number;
   id = 101; // OK
   id = "202"; // OK
   
   // Intersection Types (여러 타입을 결합)
   interface Employee {
     employeeId: number;
     age: number;
   }
   interface Manager {
     stockPlan: boolean;
   }
   type ManagerEmployee = Employee & Manager;
   ```
   
   **원시 타입과 객체 타입의 차이점:**
   
   1. **메모리 저장 방식**:
      - 원시 타입: 값 자체가 변수에 직접 저장됨 (값에 의한 전달)
      - 객체 타입: 참조가 변수에 저장됨 (참조에 의한 전달)
   
   2. **변경 가능성**:
      - 원시 타입: 불변(immutable)
      - 객체 타입: 가변(mutable)
   
   3. **비교 방식**:
      - 원시 타입: 값 비교
      - 객체 타입: 참조 비교 (동일한 객체를 참조하는지 확인)
   
   4. **타입 확장성**:
      - 원시 타입: 확장 불가능
      - 객체 타입: 인터페이스, 클래스 등을 통해 확장 가능

3. **TypeScript의 인터페이스(Interface)와 타입 별칭(Type Alias)의 차이점은 무엇인가요?**
   - 각각 어떤 상황에서 사용하는 것이 적합한가요?
   
   **답변:**
   인터페이스(Interface)와 타입 별칭(Type Alias)은 TypeScript에서 타입을 정의하는 두 가지 주요 방법입니다. 두 방식 모두 객체의 구조를 정의할 수 있지만, 몇 가지 중요한 차이점이 있습니다.
   
   **인터페이스(Interface):**
   ```typescript
   interface Person {
     name: string;
     age: number;
   }
   
   // 확장(extends)
   interface Employee extends Person {
     employeeId: number;
   }
   
   // 선언 병합(Declaration Merging)
   interface Person {
     address: string; // 기존 Person 인터페이스에 속성 추가
   }
   
   const john: Person = {
     name: "John",
     age: 30,
     address: "123 Main St"
   };
   ```
   
   **타입 별칭(Type Alias):**
   ```typescript
   type Person = {
     name: string;
     age: number;
   };
   
   // 교차 타입(Intersection Types)을 사용한 확장
   type Employee = Person & {
     employeeId: number;
   };
   
   // 유니온 타입
   type ID = string | number;
   
   // 기본값 할당
   type User = {
     name: string;
     age: number;
   };
   
   const john: User = {
     name: "John",
     age: 30
   };
   ```
   
   **주요 차이점:**
   
   1. **확장 방식**:
      - 인터페이스: `extends` 키워드 사용
      - 타입 별칭: 교차 타입(`&`) 사용
   
   2. **선언 병합**:
      - 인터페이스: 동일한 이름으로 여러 번 선언 가능, 자동으로 병합됨
      - 타입 별칭: 동일한 이름으로 재선언 불가능
   
   3. **유니온/교차 타입**:
      - 인터페이스: 직접적인 유니온 타입 정의 불가능
      - 타입 별칭: 유니온(`|`)과 교차(`&`) 타입 직접 정의 가능
   
   4. **튜플과 배열**:
      - 타입 별칭: 튜플 타입을 더 간결하게 정의 가능
      ```typescript
      type Point = [number, number];
      ```
   
   5. **계산된 속성**:
      - 타입 별칭: 매핑된 타입 등 고급 타입 기능 사용 가능
      ```typescript
      type Keys = 'option1' | 'option2';
      type Flags = { [K in Keys]: boolean };
      ```
   
   **사용 권장 상황:**
   
   **인터페이스 사용이 적합한 경우:**
   - 객체의 구조(API 계약)를 정의할 때
   - 클래스가 구현(implements)할 수 있는 타입이 필요할 때
   - 코드가 확장될 가능성이 있고 선언 병합이 필요할 때
   - 공개 API를 작성할 때 (라이브러리나 프레임워크)
   
   **타입 별칭 사용이 적합한 경우:**
   - 유니온 타입, 교차 타입, 튜플, 기본 타입 등 복잡한 타입을 정의할 때
   - 매핑된 타입, 조건부 타입 등 고급 타입 기능이 필요할 때
   - 함수 시그니처나 유틸리티 타입을 정의할 때
   - 타입이 재선언되지 않아야 할 때
   
   **실무 권장사항:**
   TypeScript 공식 문서에서는 가능하면 인터페이스를 사용하고, 인터페이스로 표현할 수 없는 형태가 필요한 경우에만 타입 별칭을 사용하도록 권장합니다. 그러나 최근에는 이 구분이 모호해지고 있으며, 팀의 일관성과 프로젝트의 특성에 따라 선택하는 것이 중요합니다.

4. **TypeScript의 제네릭(Generics)에 대해 설명해주세요.**
   - 제네릭을 사용하는 실제 예시를 들어주세요.
   
   **답변:**
   제네릭(Generics)은 타입을 마치 함수의 매개변수처럼 사용할 수 있게 해주는 기능입니다. 이를 통해 여러 타입에서 동작하는 컴포넌트를 만들 수 있으며, 코드 재사용성을 높이고 타입 안전성을 유지할 수 있습니다.
   
   **기본 문법:**
   ```typescript
   function identity<T>(arg: T): T {
     return arg;
   }
   
   // 호출 방법 1: 타입 인수 명시
   let output1 = identity<string>("myString");
   
   // 호출 방법 2: 타입 추론 사용
   let output2 = identity("myString"); // 타입이 string으로 추론됨
   ```
   
   **제네릭의 주요 사용 사례:**
   
   **1. 함수에서의 제네릭**
   ```typescript
   // 배열의 첫 번째 요소를 반환하는 함수
   function getFirstElement<T>(arr: T[]): T | undefined {
     return arr.length > 0 ? arr[0] : undefined;
   }
   
   const numbers = [1, 2, 3];
   const firstNumber = getFirstElement(numbers); // 타입: number
   
   const strings = ["a", "b", "c"];
   const firstString = getFirstElement(strings); // 타입: string
   ```
   
   **2. 인터페이스와 타입에서의 제네릭**
   ```typescript
   // 제네릭 인터페이스
   interface Box<T> {
     contents: T;
   }
   
   let numberBox: Box<number> = { contents: 42 };
   let stringBox: Box<string> = { contents: "hello" };
   
   // 제네릭 타입 별칭
   type Container<T> = { value: T };
   
   // 제네릭 객체 타입
   type Dictionary<T> = {
     [key: string]: T;
   };
   
   const numberDict: Dictionary<number> = {
     one: 1,
     two: 2
   };
   ```
   
   **3. 클래스에서의 제네릭**
   ```typescript
   class Queue<T> {
     private data: T[] = [];
     
     push(item: T): void {
       this.data.push(item);
     }
     
     pop(): T | undefined {
       return this.data.shift();
     }
   }
   
   const numberQueue = new Queue<number>();
   numberQueue.push(10);
   const num = numberQueue.pop(); // 타입: number | undefined
   
   const stringQueue = new Queue<string>();
   stringQueue.push("hello");
   const str = stringQueue.pop(); // 타입: string | undefined
   ```
   
   **4. 제약 조건이 있는 제네릭**
   ```typescript
   // T는 반드시 length 속성을 가져야 함
   interface Lengthwise {
     length: number;
   }
   
   function loggingIdentity<T extends Lengthwise>(arg: T): T {
     console.log(arg.length); // length 속성이 있다고 확신할 수 있음
     return arg;
   }
   
   loggingIdentity("hello"); // 문자열은 length 속성이 있음
   loggingIdentity([1, 2, 3]); // 배열도 length 속성이 있음
   // loggingIdentity(3); // 오류: number 타입에는 length 속성이 없음
   ```
   
   **5. 여러 타입 매개변수 사용**
   ```typescript
   function pair<T, U>(first: T, second: U): [T, U] {
     return [first, second];
   }
   
   const p1 = pair("hello", 42); // 타입: [string, number]
   ```
   
   **6. 제네릭 타입 기본값**
   ```typescript
   function createArray<T = string>(length: number, value: T): T[] {
     return Array(length).fill(value);
   }
   
   const stringArr = createArray(3, "a"); // 타입: string[]
   const numberArr = createArray<number>(3, 0); // 타입 명시적 지정
   ```
   
   **7. 실제 사용 예시: API 응답 처리**
   ```typescript
   interface ApiResponse<T> {
     data: T;
     status: number;
     message: string;
   }
   
   interface User {
     id: number;
     name: string;
     email: string;
   }
   
   async function fetchUser(id: number): Promise<ApiResponse<User>> {
     const response = await fetch(`/api/users/${id}`);
     return response.json();
   }
   
   async function fetchUsers(): Promise<ApiResponse<User[]>> {
     const response = await fetch('/api/users');
     return response.json();
   }
   
   // 사용 예시
   async function displayUser() {
     const response = await fetchUser(1);
     const user = response.data; // 타입: User
     console.log(user.name); // 타입 안전성 보장
   }
   ```
   
   **제네릭의 이점:**
   - **타입 안전성**: 컴파일 시점에 타입 검사
   - **코드 재사용성**: 다양한 타입에 대해 동일한 로직 적용 가능
   - **타입 추론**: 컨텍스트에 따라 적절한 타입 자동 추론
   - **유지보수성**: 타입이 명확히 문서화되어 코드 이해 용이

5. **TypeScript의 타입 추론(Type Inference)은 어떻게 작동하나요?**
   - 명시적 타입 지정과 타입 추론의 균형을 어떻게 맞추나요?
   
   **답변:**
   타입 추론(Type Inference)은 TypeScript가 명시적인 타입 어노테이션 없이도 변수나 표현식의 타입을 자동으로 결정하는 메커니즘입니다. 이는 JavaScript 코드를 TypeScript로 마이그레이션할 때 특히 유용하며, 코드의 가독성을 높이고 불필요한 타입 선언을 줄여줍니다.
   
   **타입 추론의 기본 원리:**
   
   **1. 변수 초기화에 의한 추론**
   ```typescript
   // 변수가 초기화될 때 타입 추론
   let name = "Alice"; // string으로 추론
   let age = 30; // number로 추론
   let active = true; // boolean으로 추론
   
   // 이후 다른 타입 할당 시 오류
   // name = 42; // 오류: string 타입에 number를 할당할 수 없음
   ```
   
   **2. 함수 반환 타입 추론**
   ```typescript
   // 함수 반환 타입 추론
   function add(a: number, b: number) {
     return a + b; // 반환 타입이 number로 추론됨
   }
   
   // 화살표 함수에서도 동일
   const multiply = (a: number, b: number) => a * b; // 반환 타입: number
   ```
   
   **3. 컨텍스트 기반 타입 추론**
   ```typescript
   // 컨텍스트에 따른 타입 추론
   const names = ["Alice", "Bob", "Charlie"]; // string[] 타입으로 추론
   
   // 매개변수 name은 컨텍스트에 따라 string으로 추론됨
   names.forEach(name => {
     console.log(name.toUpperCase());
   });
   ```
   
   **4. 객체 리터럴의 타입 추론**
   ```typescript
   // 객체 리터럴의 타입 추론
   const person = {
     name: "Alice",
     age: 30,
     isActive: true
   };
   // person의 타입은 { name: string; age: number; isActive: boolean; }으로 추론
   ```
   
   **5. 구조 분해 할당의 타입 추론**
   ```typescript
   // 구조 분해 할당에서의 타입 추론
   const { name, age } = person;
   // name은 string, age는 number로 추론됨
   ```
   
   **6. 유니온 타입 추론**
   ```typescript
   // 조건에 따른 유니온 타입 추론
   function getLength(value: string | string[]) {
     return value.length; // length 속성은 string과 string[] 모두에 존재
   }
   
   // 타입 가드에 따른 타입 좁히기(Type Narrowing)
   function formatValue(value: string | number) {
     if (typeof value === "string") {
       // 이 블록에서 value는 string으로 추론됨
       return value.toUpperCase();
     }
     // 이 블록에서 value는 number로 추론됨
     return value.toFixed(2);
   }
   ```
   
   **7. 제네릭 타입 추론**
   ```typescript
   // 제네릭 함수에서의 타입 추론
   function identity<T>(arg: T): T {
     return arg;
   }
   
   const str = identity("hello"); // T는 string으로 추론됨
   const num = identity(42); // T는 number로 추론됨
   
   // 제네릭 타입 인수 추론
   function first<T>(arr: T[]): T | undefined {
     return arr[0];
   }
   
   const value = first([1, 2, 3]); // value의 타입은 number | undefined로 추론
   ```
   
   **명시적 타입 지정과 타입 추론의 균형:**
   
   **명시적 타입 지정이 유용한 경우:**
   
   1. **함수 매개변수**: 함수 인터페이스를 명확히 하기 위해
   ```typescript
   function greet(name: string) {
     console.log(`Hello, ${name}!`);
   }
   ```
   
   2. **빈 배열이나 객체**: 초기 값이 없는 경우 타입 추론이 불가능
   ```typescript
   // any[]로 추론됨
   const names = [];
   
   // 명시적 타입 지정
   const names: string[] = [];
   ```
   
   3. **유니온 타입이 필요한 경우**
   ```typescript
   // id는 number로 추론됨
   let id = 1;
   
   // 명시적 타입 지정으로 더 유연하게
   let id: string | number = 1;
   id = "abc"; // 가능
   ```
   
   4. **라이브러리 반환 값이나 API 응답**: 타입 안전성 보장
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
   
   5. **복잡한 타입이나 객체 구조**: 명확한 문서화 목적
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
   
   **타입 추론에 의존하는 것이 좋은 경우:**
   
   1. **간단한 변수 초기화**
   ```typescript
   const name = "Alice"; // 명시적 타입 불필요
   const age = 30;
   const isActive = true;
   ```
   
   2. **객체 리터럴과 배열**
   ```typescript
   const person = {
     name: "Alice",
     age: 30
   }; // 타입 추론이 충분히 정확함
   
   const numbers = [1, 2, 3]; // number[]로 정확히 추론됨
   ```
   
   3. **콜백 함수의 매개변수**
   ```typescript
   [1, 2, 3].map(num => num * 2); // num은 number로 추론됨
   ```
   
   4. **제네릭 함수 호출**
   ```typescript
   function identity<T>(value: T): T {
     return value;
   }
   
   const result = identity("hello"); // 명시적으로 <string>을 지정할 필요 없음
   ```
   
   **균형 잡힌 접근법:**
   
   1. **"타입이 명확하지 않을 때만 명시"** 원칙 적용
   2. **공개 API와 함수 시그니처**에는 명시적 타입 사용
   3. **내부 구현 세부사항**에는 타입 추론 활용
   4. **팀 내 일관된 컨벤션** 수립 및 준수
   5. **정적 분석 도구**(ESLint + TypeScript 플러그인)를 활용하여 일관성 유지
   
   이러한 균형 잡힌 접근법은 코드의 가독성과 유지보수성을 높이면서도 TypeScript의 타입 안전성 이점을 최대한 활용할 수 있게 해줍니다.
