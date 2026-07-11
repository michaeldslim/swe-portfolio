# TypeScript 개발자 인터뷰 질문 - Part 4

## 실무 및 고급 주제

10. **TypeScript의 컴파일러 설정(tsconfig.json)에 대해 설명해주세요.**
    - 주요 컴파일러 옵션과 그 용도를 설명해주세요.
    
    **답변:**
    `tsconfig.json` 파일은 TypeScript 프로젝트의 루트 디렉토리에 위치하며, TypeScript 컴파일러(tsc)가 프로젝트를 컴파일하는 방법을 구성하는 설정 파일입니다. 이 파일은 컴파일할 파일, 컴파일 옵션, 출력 디렉토리 등을 지정합니다.
    
    **1. 기본 구조**
    
    ```json
    {
      "compilerOptions": {
        // 컴파일러 옵션
      },
      "include": [
        // 포함할 파일 패턴
      ],
      "exclude": [
        // 제외할 파일 패턴
      ],
      "files": [
        // 명시적으로 포함할 파일 목록
      ],
      "extends": "경로/기본-tsconfig.json", // 다른 tsconfig 파일 확장
      "references": [
        // 프로젝트 참조
        { "path": "../otherProject" }
      ]
    }
    ```
    
    **2. 주요 컴파일러 옵션**
    
    **타입 검사 옵션:**
    
    ```json
    {
      "compilerOptions": {
        "strict": true, // 모든 엄격한 타입 검사 옵션 활성화
        "noImplicitAny": true, // 암시적 any 타입 금지
        "strictNullChecks": true, // null과 undefined 타입 엄격하게 검사
        "strictFunctionTypes": true, // 함수 타입 엄격하게 검사
        "strictBindCallApply": true, // bind, call, apply 메서드 엄격하게 검사
        "strictPropertyInitialization": true, // 클래스 속성 초기화 검사
        "noImplicitThis": true, // 암시적 this 타입 금지
        "alwaysStrict": true, // 항상 strict 모드로 파싱
        "noUnusedLocals": true, // 사용되지 않는 지역 변수 오류 보고
        "noUnusedParameters": true, // 사용되지 않는 매개변수 오류 보고
        "noImplicitReturns": true, // 함수 내 모든 코드 경로가 값을 반환하는지 확인
        "noFallthroughCasesInSwitch": true // switch문에서 fallthrough 케이스 오류 보고
      }
    }
    ```
    
    **모듈 옵션:**
    
    ```json
    {
      "compilerOptions": {
        "module": "ESNext", // 출력 모듈 시스템 (CommonJS, AMD, ESNext 등)
        "moduleResolution": "node", // 모듈 해석 방식 (node, classic)
        "baseUrl": "./src", // 비상대 모듈 이름 해석 기준 디렉토리
        "paths": { // 모듈 이름 매핑
          "@app/*": ["app/*"],
          "@utils/*": ["utils/*"]
        },
        "rootDir": "./src", // 입력 파일의 루트 디렉토리
        "typeRoots": ["./node_modules/@types", "./typings"], // 타입 정의 파일 위치
        "types": ["node", "jest"], // 포함할 타입 패키지
        "allowSyntheticDefaultImports": true, // 기본 내보내기가 없는 모듈에서 default import 허용
        "esModuleInterop": true, // CommonJS 모듈을 ES 모듈처럼 가져올 수 있게 함
        "resolveJsonModule": true // .json 파일 import 허용
      }
    }
    ```
    
    **출력 옵션:**
    
    ```json
    {
      "compilerOptions": {
        "target": "ES2020", // 출력 ECMAScript 버전
        "outDir": "./dist", // 출력 디렉토리
        "outFile": "./dist/bundle.js", // 단일 파일로 출력 (AMD/System 모듈 시스템에서만 사용 가능)
        "declaration": true, // .d.ts 파일 생성
        "declarationDir": "./types", // .d.ts 파일 출력 디렉토리
        "sourceMap": true, // 소스맵 파일 생성
        "removeComments": true, // 주석 제거
        "noEmit": false, // 출력 파일 생성 안 함
        "noEmitOnError": true, // 오류 발생 시 출력 파일 생성 안 함
        "preserveConstEnums": true, // const enum 선언 보존
        "emitDecoratorMetadata": true, // 데코레이터 메타데이터 생성
        "experimentalDecorators": true // 데코레이터 실험적 기능 활성화
      }
    }
    ```
    
    **JavaScript 지원 옵션:**
    
    ```json
    {
      "compilerOptions": {
        "allowJs": true, // JavaScript 파일 컴파일 허용
        "checkJs": true, // JavaScript 파일 타입 검사
        "maxNodeModuleJsDepth": 1, // node_modules의 JavaScript 파일 검사 깊이
        "jsx": "react", // JSX 코드 처리 방식 (react, react-native, preserve)
        "jsxFactory": "React.createElement", // JSX 팩토리 함수 지정
        "jsxFragmentFactory": "React.Fragment" // JSX Fragment 팩토리 지정
      }
    }
    ```
    
    **고급 옵션:**
    
    ```json
    {
      "compilerOptions": {
        "lib": ["DOM", "ES2020"], // 포함할 라이브러리 파일
        "skipLibCheck": true, // 선언 파일 타입 검사 건너뛰기
        "forceConsistentCasingInFileNames": true, // 파일 이름 대소문자 일관성 강제
        "incremental": true, // 증분 컴파일 활성화
        "tsBuildInfoFile": "./buildcache", // 증분 빌드 정보 파일 위치
        "composite": true, // 프로젝트 참조를 위한 복합 프로젝트 활성화
        "preserveSymlinks": false, // 심볼릭 링크 해석 방식
        "downlevelIteration": true, // 이전 버전 환경에서 반복자 지원
        "isolatedModules": true, // 각 파일을 별도 모듈로 변환 (Babel 호환성)
        "plugins": [ // 타입스크립트 언어 서비스 플러그인
          { "name": "typescript-plugin-css-modules" }
        ]
      }
    }
    ```
    
    **3. 파일 포함/제외 설정**
    
    ```json
    {
      "include": [
        "src/**/*.ts", // src 디렉토리의 모든 .ts 파일
        "src/**/*.tsx" // src 디렉토리의 모든 .tsx 파일
      ],
      "exclude": [
        "node_modules", // node_modules 디렉토리 제외
        "**/*.test.ts", // 모든 테스트 파일 제외
        "src/temp" // 특정 디렉토리 제외
      ],
      "files": [
        "src/main.ts", // 명시적으로 포함할 파일
        "src/types.d.ts"
      ]
    }
    ```
    
    **4. 프로젝트 참조**
    
    ```json
    {
      "references": [
        { "path": "../common" }, // 다른 프로젝트 참조
        { "path": "../api" }
      ],
      "compilerOptions": {
        "composite": true // 프로젝트 참조를 위해 필요
      }
    }
    ```
    
    **5. 상속 및 확장**
    
    ```json
    // 기본 tsconfig.json
    {
      "extends": "./tsconfig.base.json", // 다른 tsconfig 파일 확장
      "compilerOptions": {
        // 기본 설정을 덮어쓰거나 추가 설정
        "outDir": "./dist"
      }
    }
    ```
    
    **6. 실제 사용 사례**
    
    **웹 애플리케이션 설정:**
    
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
        "outDir": "./dist",
        "sourceMap": true,
        "lib": ["DOM", "DOM.Iterable", "ESNext"],
        "allowJs": true,
        "resolveJsonModule": true,
        "isolatedModules": true,
        "noEmit": true,
        "baseUrl": "./src",
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
    
    **Node.js 애플리케이션 설정:**
    
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
        "sourceMap": true,
        "declaration": true,
        "rootDir": "./src",
        "lib": ["ES2020"],
        "types": ["node", "jest"]
      },
      "include": ["src/**/*"],
      "exclude": ["node_modules", "dist", "**/*.test.ts"]
    }
    ```
    
    **라이브러리 설정:**
    
    ```json
    {
      "compilerOptions": {
        "target": "ES2018",
        "module": "ESNext",
        "moduleResolution": "node",
        "declaration": true,
        "sourceMap": true,
        "outDir": "./dist",
        "strict": true,
        "esModuleInterop": true,
        "noImplicitReturns": true,
        "noFallthroughCasesInSwitch": true,
        "noUnusedLocals": true,
        "noUnusedParameters": true,
        "baseUrl": "./src",
        "lib": ["ESNext"]
      },
      "include": ["src"],
      "exclude": ["node_modules", "dist", "**/*.test.ts"]
    }
    ```
    
    **7. 주요 컴파일러 옵션 선택 가이드**
    
    **새 프로젝트를 위한 권장 설정:**
    
    ```json
    {
      "compilerOptions": {
        "target": "ES2020", // 최신 브라우저 지원
        "module": "ESNext", // 최신 모듈 시스템
        "moduleResolution": "node", // Node.js 스타일 모듈 해석
        "strict": true, // 모든 엄격한 타입 검사 활성화
        "esModuleInterop": true, // CommonJS 모듈 호환성
        "skipLibCheck": true, // 성능 향상을 위해 선언 파일 검사 건너뛰기
        "forceConsistentCasingInFileNames": true, // 파일 이름 대소문자 일관성
        "sourceMap": true, // 디버깅을 위한 소스맵
        "outDir": "./dist", // 출력 디렉토리
        "baseUrl": "./src", // 모듈 해석 기준 디렉토리
        "resolveJsonModule": true, // JSON 모듈 가져오기 지원
        "declaration": true // 타입 선언 파일 생성
      }
    }
    ```
    
    **성능 최적화를 위한 설정:**
    
    ```json
    {
      "compilerOptions": {
        "incremental": true, // 증분 컴파일로 빌드 시간 단축
        "skipLibCheck": true, // 선언 파일 검사 건너뛰기
        "isolatedModules": true, // 독립적 파일 변환 (Babel과 함께 사용 시)
        "noEmitOnError": false, // 오류가 있어도 출력 생성
        "composite": true, // 프로젝트 참조 지원
        "tsBuildInfoFile": "./.tsbuildinfo" // 빌드 정보 파일 위치
      }
    }
    ```

11. **TypeScript에서 비동기 코드를 어떻게 처리하나요?**
    - Promise, async/await, 제네릭과 함께 사용하는 방법을 설명해주세요.
    
    **답변:**
    TypeScript는 JavaScript의 비동기 프로그래밍 패턴을 모두 지원하면서 타입 안전성을 추가로 제공합니다. 이를 통해 비동기 코드를 더 안전하고 유지보수하기 쉽게 작성할 수 있습니다.
    
    **1. Promise와 타입**
    
    Promise는 비동기 작업의 최종 완료(또는 실패)와 그 결과값을 나타내는 객체입니다. TypeScript에서는 제네릭을 사용하여 Promise가 해결(resolve)될 때의 값 타입을 지정할 수 있습니다.
    
    ```typescript
    // 기본 Promise 타입
    const promise: Promise<string> = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("Hello, World!");
        // 또는
        // reject(new Error("Something went wrong"));
      }, 1000);
    });
    
    // Promise 체이닝과 타입 추론
    promise
      .then((result) => {
        console.log(result.toUpperCase()); // result는 string 타입
        return result.length;
      })
      .then((length) => {
        console.log(length * 2); // length는 number 타입
      })
      .catch((error: Error) => {
        console.error(error.message);
      });
    ```
    
    **2. async/await와 타입**
    
    async/await는 Promise를 더 동기적인 스타일로 작성할 수 있게 해주는 문법적 설탕입니다. TypeScript는 async 함수의 반환 타입을 Promise로 추론합니다.
    
    ```typescript
    // 기본 async/await
    async function fetchData(): Promise<string> {
      try {
        const response = await fetch('https://api.example.com/data');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data.message;
      } catch (error) {
        console.error("Fetching data failed:", error);
        throw error; // 에러 다시 던지기
      }
    }
    
    // async/await 사용
    async function processData() {
      try {
        const message = await fetchData(); // message는 string 타입
        console.log(message.toUpperCase());
      } catch (error) {
        console.error("Processing failed:", error);
      }
    }
    ```
    
    **3. 제네릭과 함께 사용하는 비동기 함수**
    
    제네릭을 사용하면 다양한 타입에 대해 작동하는 재사용 가능한 비동기 함수를 만들 수 있습니다.
    
    ```typescript
    // 제네릭 비동기 함수
    async function fetchJson<T>(url: string): Promise<T> {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return response.json() as Promise<T>;
    }
    
    // 타입 정의
    interface User {
      id: number;
      name: string;
      email: string;
    }
    
    interface Post {
      id: number;
      title: string;
      body: string;
      userId: number;
    }
    
    // 사용 예시
    async function loadData() {
      try {
        // 명시적 타입 인수 제공
        const user = await fetchJson<User>('https://api.example.com/users/1');
        console.log(user.name); // user는 User 타입
        
        // 타입 추론 (컨텍스트에서 타입 유추)
        const posts: Promise<Post[]> = fetchJson('https://api.example.com/posts');
        const loadedPosts = await posts;
        console.log(loadedPosts[0].title); // loadedPosts는 Post[] 타입
      } catch (error) {
        console.error("Loading data failed:", error);
      }
    }
    ```
    
    **4. Promise 배열 처리**
    
    여러 Promise를 병렬로 처리할 때도 타입 안전성을 유지할 수 있습니다.
    
    ```typescript
    // Promise.all과 타입
    async function fetchMultipleUsers(ids: number[]): Promise<User[]> {
      const promises = ids.map(id => fetchJson<User>(`https://api.example.com/users/${id}`));
      return Promise.all(promises);
    }
    
    // Promise.race와 타입
    async function fetchWithTimeout<T>(
      promise: Promise<T>,
      timeoutMs: number
    ): Promise<T> {
      const timeout = new Promise<never>((_, reject) => {
        setTimeout(() => {
          reject(new Error(`Operation timed out after ${timeoutMs}ms`));
        }, timeoutMs);
      });
      
      return Promise.race([promise, timeout]);
    }
    
    // 사용 예시
    async function loadUserWithTimeout(id: number): Promise<User> {
      const userPromise = fetchJson<User>(`https://api.example.com/users/${id}`);
      return fetchWithTimeout(userPromise, 5000); // 5초 타임아웃
    }
    ```
    
    **5. 비동기 함수의 반환 타입 처리**
    
    TypeScript는 async 함수의 반환 타입을 자동으로 Promise로 감싸줍니다.
    
    ```typescript
    // 명시적 반환 타입
    async function getData(): Promise<string> {
      return "data"; // 자동으로 Promise<string>으로 감싸짐
    }
    
    // 조건부 반환 타입
    async function fetchResource<T>(
      url: string,
      cache: boolean
    ): Promise<T> {
      // 캐시에서 가져오기 (동기적)
      if (cache && hasCache(url)) {
        return getFromCache<T>(url); // T 타입 값이 Promise<T>로 자동 변환
      }
      
      // API에서 가져오기 (비동기적)
      const response = await fetch(url);
      const data: T = await response.json();
      return data;
    }
    ```
    
    **6. 오류 처리와 타입 좁히기**
    
    비동기 코드의 오류 처리에서도 타입 좁히기를 활용할 수 있습니다.
    
    ```typescript
    // 사용자 정의 오류 클래스
    class ApiError extends Error {
      constructor(
        message: string,
        public statusCode: number,
        public body: unknown
      ) {
        super(message);
        this.name = "ApiError";
      }
    }
    
    // 오류 타입 가드
    function isApiError(error: unknown): error is ApiError {
      return error instanceof ApiError;
    }
    
    // 오류 처리
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
        // 타입 좁히기
        if (isApiError(error)) {
          // error는 ApiError 타입
          console.error(`API Error ${error.statusCode}: ${error.message}`);
          // 특정 상태 코드에 따른 처리
          if (error.statusCode === 404) {
            // 리소스를 찾을 수 없음
          }
        } else if (error instanceof Error) {
          // error는 Error 타입
          console.error(`Network Error: ${error.message}`);
        } else {
          // 알 수 없는 오류
          console.error("Unknown error:", error);
        }
        throw error;
      }
    }
    ```
    
    **7. 비동기 반복자 및 제너레이터**
    
    TypeScript는 비동기 반복자와 제너레이터도 지원합니다.
    
    ```typescript
    // 비동기 제너레이터
    async function* generateSequence(start: number, end: number): AsyncGenerator<number> {
      for (let i = start; i <= end; i++) {
        // 비동기 작업 시뮬레이션
        await new Promise(resolve => setTimeout(resolve, 100));
        yield i;
      }
    }
    
    // 비동기 반복자 사용
    async function processSequence() {
      const generator = generateSequence(1, 5);
      
      for await (const num of generator) {
        console.log(num); // 1, 2, 3, 4, 5가 약 100ms 간격으로 출력
      }
    }
    
    // 또는 수동으로 반복
    async function manualIteration() {
      const generator = generateSequence(1, 3);
      
      let result = await generator.next();
      while (!result.done) {
        console.log(result.value);
        result = await generator.next();
      }
    }
    ```
    
    **8. 실제 사용 사례**
    
    **데이터 페칭 훅 (React):**
    
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
    
    // 사용 예시
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
