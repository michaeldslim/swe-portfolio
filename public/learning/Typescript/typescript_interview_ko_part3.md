# TypeScript 개발자 인터뷰 질문 - Part 3

## 고급 개념 (계속)

8. **TypeScript의 모듈 시스템에 대해 설명해주세요.**
   - CommonJS와 ES 모듈의 차이점과 TypeScript에서의 사용법을 설명해주세요.
   
   **답변:**
   TypeScript는 JavaScript의 모듈 시스템을 확장하여 타입 정보를 포함한 모듈화된 코드 작성을 지원합니다. TypeScript는 CommonJS, AMD, UMD, ES 모듈 등 다양한 모듈 시스템을 지원하며, 컴파일 옵션을 통해 원하는 모듈 시스템으로 출력할 수 있습니다.
   
   **1. 모듈 기본 개념**
   
   TypeScript에서 모듈은 자체 스코프를 가지며, `export`와 `import` 문을 사용하여 다른 모듈과 상호작용합니다.
   
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
   
   **2. 모듈 내보내기(Export) 방식**
   
   ```typescript
   // 개별 내보내기
   export function func1() { /* ... */ }
   export const value1 = 42;
   export interface User { name: string; }
   export type ID = string | number;
   export class Service { /* ... */ }
   
   // 선언 후 내보내기
   function func2() { /* ... */ }
   const value2 = 'hello';
   export { func2, value2 };
   
   // 이름 변경하여 내보내기
   export { func2 as renamedFunc, value2 as renamedValue };
   
   // 기본 내보내기 (모듈당 하나만 가능)
   export default class MainClass { /* ... */ }
   
   // 다른 모듈 다시 내보내기
   export * from './other-module';
   export { func3, func4 } from './other-module';
   export { func3 as newName } from './other-module';
   ```
   
   **3. 모듈 가져오기(Import) 방식**
   
   ```typescript
   // 개별 가져오기
   import { func1, value1 } from './module';
   
   // 이름 변경하여 가져오기
   import { func1 as newName, value1 } from './module';
   
   // 전체 모듈 가져오기
   import * as math from './math';
   console.log(math.add(1, 2)); // 네임스페이스로 접근
   
   // 기본 내보내기 가져오기
   import MainClass from './module';
   
   // 기본 내보내기와 개별 내보내기 함께 가져오기
   import MainClass, { func1, value1 } from './module';
   
   // 타입만 가져오기 (런타임 코드 생성 안 함)
   import type { User, ID } from './module';
   
   // 부수 효과만을 위한 가져오기 (모듈 실행만 함)
   import './module';
   ```
   
   **4. CommonJS와 ES 모듈 비교**
   
   **CommonJS (Node.js의 기본 모듈 시스템):**
   
   ```typescript
   // 내보내기 (CommonJS)
   function add(x, y) {
     return x + y;
   }
   
   module.exports = { add };
   // 또는
   exports.add = add;
   
   // 가져오기 (CommonJS)
   const math = require('./math');
   console.log(math.add(1, 2));
   // 또는
   const { add } = require('./math');
   console.log(add(1, 2));
   ```
   
   **ES 모듈 (ECMAScript 표준 모듈 시스템):**
   
   ```typescript
   // 내보내기 (ES 모듈)
   export function add(x, y) {
     return x + y;
   }
   
   // 가져오기 (ES 모듈)
   import { add } from './math';
   console.log(add(1, 2));
   ```
   
   **주요 차이점:**
   
   | 특성 | CommonJS | ES 모듈 |
   |------|----------|---------|
   | 문법 | require(), module.exports | import, export |
   | 로딩 시점 | 동적 (런타임) | 정적 (컴파일 타임) |
   | 비동기 로딩 | 기본 지원 안 함 | 기본 지원 (import()) |
   | 트리 쉐이킹 | 어려움 | 용이함 |
   | 순환 참조 | 부분적 지원 | 더 나은 지원 |
   | 호이스팅 | 없음 | 있음 (모듈 최상단으로) |
   
   **5. TypeScript 모듈 설정**
   
   `tsconfig.json` 파일의 `module` 옵션을 통해 출력 모듈 시스템을 지정할 수 있습니다:
   
   ```json
   {
     "compilerOptions": {
       "module": "CommonJS", // 또는 "ESNext", "AMD", "UMD" 등
       "moduleResolution": "node", // 모듈 해석 방식
       "esModuleInterop": true, // CommonJS 모듈을 ES 모듈처럼 가져올 수 있게 함
       "allowSyntheticDefaultImports": true // 기본 내보내기가 없는 모듈에서도 default import 허용
     }
   }
   ```
   
   **6. 모듈 해석 전략**
   
   TypeScript는 두 가지 주요 모듈 해석 전략을 지원합니다:
   
   - **Classic**: 상대 경로는 상대적으로, 비상대 경로는 루트 디렉토리부터 해석
   - **Node**: Node.js의 모듈 해석 알고리즘 사용 (node_modules 검색 등)
   
   ```json
   {
     "compilerOptions": {
       "moduleResolution": "node", // 또는 "classic"
       "baseUrl": "./src", // 비상대 경로 가져오기의 기본 디렉토리
       "paths": { // 경로 매핑 (별칭)
         "@app/*": ["app/*"],
         "@utils/*": ["utils/*"]
       }
     }
   }
   ```
   
   **7. 타입 선언 파일과 모듈**
   
   타입 선언 파일(`.d.ts`)을 사용하여 JavaScript 모듈에 대한 타입 정보를 제공할 수 있습니다:
   
   ```typescript
   // types.d.ts
   declare module 'some-js-library' {
     export function someFunction(input: string): number;
     export const someValue: string;
   }
   
   // 사용
   import { someFunction } from 'some-js-library';
   ```
   
   **8. 동적 가져오기**
   
   TypeScript는 ES2020의 동적 가져오기(Dynamic Import)를 지원합니다:
   
   ```typescript
   async function loadModule() {
     // 타입 추론이 작동함
     const math = await import('./math');
     return math.add(1, 2);
   }
   ```
   
   **9. 실제 사용 예시와 모범 사례**
   
   **모듈 구조화:**
   
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
       // ...
     }
   }
   
   // index.ts (배럴 파일 - 여러 모듈을 하나로 묶어 내보냄)
   export * from './models/user';
   export * from './services/user-service';
   
   // app.ts
   import { User, UserService } from './index';
   // 또는 직접 가져오기
   import { User } from './models/user';
   import { UserService } from './services/user-service';
   ```
   
   **모범 사례:**
   
   1. **명시적 내보내기 사용**: `export *` 보다는 명시적으로 내보낼 항목 지정
   2. **일관된 모듈 패턴 사용**: 프로젝트 전체에서 동일한 가져오기/내보내기 패턴 유지
   3. **순환 참조 피하기**: 모듈 간 순환 의존성 최소화
   4. **배럴 파일 활용**: 관련 모듈을 하나의 진입점으로 묶어 사용성 향상
   5. **타입 전용 가져오기 사용**: 런타임 코드 최적화를 위해 필요한 경우 `import type` 활용

9. **TypeScript의 타입 선언 파일(.d.ts)에 대해 설명해주세요.**
   - 타입 선언 파일을 작성하는 방법과 사용 사례를 설명해주세요.
   
   **답변:**
   타입 선언 파일(.d.ts)은 JavaScript 코드에 대한 타입 정보를 제공하는 파일입니다. 이 파일들은 JavaScript 라이브러리를 TypeScript에서 사용할 때 타입 안전성을 제공하거나, 프로젝트 내에서 전역 타입 정의를 공유하는 데 사용됩니다.
   
   **1. 타입 선언 파일의 목적**
   
   - JavaScript 코드에 타입 정보 추가
   - 타입 정의만 포함하고 구현은 포함하지 않음
   - 컴파일 시 JavaScript 코드를 생성하지 않음
   - IDE에서 코드 자동 완성 및 타입 검사 지원
   
   **2. 타입 선언 파일 작성 방법**
   
   **기본 구문:**
   
   ```typescript
   // 변수 선언
   declare const VERSION: string;
   
   // 함수 선언
   declare function sum(a: number, b: number): number;
   
   // 클래스 선언
   declare class User {
     constructor(name: string);
     name: string;
     getName(): string;
   }
   
   // 네임스페이스 선언
   declare namespace MyLib {
     function makeGreeting(name: string): string;
     let numberOfGreetings: number;
   }
   
   // 모듈 선언
   declare module 'my-module' {
     export function doSomething(): void;
     export const value: number;
   }
   
   // 전역 인터페이스 선언
   interface Window {
     customProperty: string;
   }
   ```
   
   **3. 타입 선언 파일 종류**
   
   **전역 선언 파일:**
   전역 스코프에 타입을 선언하며, 별도의 import 없이 사용 가능합니다.
   
   ```typescript
   // globals.d.ts
   declare const API_KEY: string;
   declare function globalHelper(): void;
   
   interface Window {
     analytics: {
       track(event: string, properties?: object): void;
     };
   }
   ```
   
   **모듈 선언 파일:**
   특정 모듈에 대한 타입을 선언하며, import 문을 통해 사용합니다.
   
   ```typescript
   // module.d.ts
   declare module 'untyped-module' {
     export function helper(): void;
     export const version: string;
     export default class Main {
       constructor();
       start(): void;
     }
   }
   
   // 사용 방법
   import Main, { helper, version } from 'untyped-module';
   ```
   
   **앰비언트 모듈 선언:**
   비 TypeScript 자산(CSS, 이미지 등)을 모듈로 가져올 수 있게 합니다.
   
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
   
   // 사용 방법
   import styles from './styles.css';
   import logo from './logo.png';
   ```
   
   **4. 타입 선언 파일 찾기 및 사용**
   
   TypeScript는 다음 위치에서 타입 선언 파일을 찾습니다:
   
   1. 프로젝트 내 포함된 `.d.ts` 파일
   2. `@types/` 네임스페이스 패키지 (DefinitelyTyped)
   3. 패키지 자체에 포함된 타입 선언
   
   **package.json에서 타입 선언 파일 지정:**
   
   ```json
   {
     "name": "my-library",
     "version": "1.0.0",
     "main": "dist/index.js",
     "types": "dist/index.d.ts", // 또는 "typings": "dist/index.d.ts"
     "dependencies": {
       // ...
     }
   }
   ```
   
   **5. DefinitelyTyped와 @types 패키지**
   
   DefinitelyTyped는 타입이 없는 JavaScript 라이브러리를 위한 타입 선언 저장소입니다.
   
   ```bash
   # jQuery의 타입 선언 설치
   npm install --save-dev @types/jquery
   
   # lodash의 타입 선언 설치
   npm install --save-dev @types/lodash
   ```
   
   **6. 타입 선언 파일 생성 방법**
   
   **수동으로 작성:**
   
   ```typescript
   // my-library.d.ts
   declare module 'my-library' {
     export function add(a: number, b: number): number;
     export function subtract(a: number, b: number): number;
     export const PI: number;
   }
   ```
   
   **TypeScript 컴파일러로 생성:**
   
   ```json
   // tsconfig.json
   {
     "compilerOptions": {
       "declaration": true, // .d.ts 파일 생성
       "declarationDir": "./types", // .d.ts 파일 출력 디렉토리
       "emitDeclarationOnly": false // true로 설정하면 .js 파일 없이 .d.ts만 생성
     }
   }
   ```
   
   **7. 실제 사용 사례**
   
   **타입이 없는 라이브러리 사용:**
   
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
   
   **브라우저 API 확장:**
   
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
   
   **전역 변수 및 함수:**
   
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
   
   **8. 타입 선언 파일 작성 모범 사례**
   
   1. **명확한 문서화**: JSDoc 주석을 사용하여 타입과 함수 설명
   2. **엄격한 타입 사용**: `any` 타입 사용 최소화
   3. **유니온 타입 활용**: 가능한 모든 입력 값 고려
   4. **제네릭 활용**: 재사용 가능한 타입 정의
   5. **네임스페이스 구조화**: 관련 타입을 논리적으로 그룹화
   6. **테스트**: 타입 선언이 실제 라이브러리 동작과 일치하는지 확인
   
   **9. 타입 선언 파일 디버깅**
   
   ```json
   // tsconfig.json
   {
     "compilerOptions": {
       "traceResolution": true, // 모듈 해석 과정 추적
       "typeRoots": ["./node_modules/@types", "./typings"], // 타입 선언 파일 위치 지정
       "types": ["node", "jest"] // 포함할 @types 패키지 지정
     }
   }
   ```
