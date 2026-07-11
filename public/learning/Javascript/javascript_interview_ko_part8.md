# JavaScript 개발자 인터뷰 질문 Part 8: 테스팅과 디버깅

## 테스팅과 디버깅

27. **JavaScript 코드를 테스트하는 방법과 도구에 대해 설명해주세요.**
    - 단위 테스트(Unit Test), 통합 테스트(Integration Test), E2E 테스트의 차이점은 무엇인가요?
    
    **설명:** JavaScript 코드 테스팅은 코드의 품질과 신뢰성을 보장하는 중요한 과정입니다. 단위 테스트는 코드의 가장 작은 단위(함수나 메서드)를 독립적으로 테스트하여 예상대로 동작하는지 확인합니다. Jest, Mocha, Jasmine 등의 프레임워크가 주로 사용되며, 테스트 격리를 위해 모킹(mocking)이 자주 활용됩니다. 통합 테스트는 여러 단위가 함께 작동할 때 올바르게 상호작용하는지 확인하는 테스트로, 실제 API 호출이나 데이터베이스 상호작용을 포함할 수 있습니다. E2E(End-to-End) 테스트는 사용자 관점에서 애플리케이션의 전체 흐름을 테스트하며, Cypress, Puppeteer, Selenium 등의 도구를 사용해 실제 브라우저 환경에서 수행됩니다. TDD(Test-Driven Development)는 테스트를 먼저 작성한 후 코드를 구현하는 방법론으로, 코드 품질 향상에 도움이 됩니다. 코드 커버리지 도구(Istanbul/nyc)는 테스트가 코드의 얼마나 많은 부분을 실행하는지 측정하고, 스냅샷 테스팅은 UI 컴포넌트의 렌더링 결과를 이전 결과와 비교합니다. 효과적인 테스트를 위해서는 테스트 가능한 코드 작성, 적절한 테스트 범위 설정, CI/CD 파이프라인에 테스트 통합, 그리고 정기적인 테스트 유지보수가 중요합니다.

    **Description:** JavaScript code testing is a crucial process for ensuring code quality and reliability. Unit testing examines the smallest units of code (functions or methods) independently to verify they work as expected. Frameworks like Jest, Mocha, and Jasmine are commonly used, with mocking frequently employed for test isolation. Integration testing verifies that multiple units interact correctly when working together, potentially including real API calls or database interactions. E2E (End-to-End) testing examines the entire application flow from a user's perspective, using tools like Cypress, Puppeteer, or Selenium to perform tests in actual browser environments. TDD (Test-Driven Development) is a methodology where tests are written before implementing code, helping improve code quality. Code coverage tools (Istanbul/nyc) measure how much of the code is executed by tests, while snapshot testing compares UI component rendering results with previous outputs. For effective testing, it's important to write testable code, establish appropriate test coverage, integrate tests into CI/CD pipelines, and maintain tests regularly.
    
    **예시:**
    ```javascript
    // 1. 단위 테스트 (Unit Test) 예시 - Jest 사용
    
    // 테스트할 함수
    function sum(a, b) {
      return a + b;
    }
    
    function fetchUserData(userId) {
      return fetch(`https://api.example.com/users/${userId}`)
        .then(response => response.json());
    }
    
    // Jest를 사용한 단위 테스트
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
    
    // 비동기 함수 테스트 - 목(Mock) 사용
    // user.test.js
    describe('fetchUserData function', () => {
      // fetch API 목킹
      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve({ id: 1, name: 'John Doe' }),
        }),
      );
      
      test('fetches user data successfully', async () => {
        const userData = await fetchUserData(1);
        expect(fetch).toHaveBeenCalledWith('https://api.example.com/users/1');
        expect(userData).toEqual({ id: 1, name: 'John Doe' });
      });
      
      // 테스트 후 목 초기화
      afterEach(() => {
        jest.clearAllMocks();
      });
    });
    
    // 2. 통합 테스트 (Integration Test) 예시
    
    // 사용자 서비스와 게시물 서비스 통합 테스트
    // userPostsService.test.js
    describe('User Posts Service', () => {
      // 실제 API를 사용하거나 더 복잡한 목을 설정
      
      test('getUserPosts returns posts for a specific user', async () => {
        // 사용자 서비스와 게시물 서비스의 통합 테스트
        const userPosts = await userPostsService.getUserPosts(1);
        
        expect(userPosts.length).toBeGreaterThan(0);
        expect(userPosts[0].userId).toBe(1);
      });
      
      test('createPost adds a post to user posts', async () => {
        const newPost = { title: 'New Post', content: 'Content' };
        const createdPost = await userPostsService.createPost(1, newPost);
        
        const userPosts = await userPostsService.getUserPosts(1);
        expect(userPosts).toContainEqual(expect.objectContaining(createdPost));
      });
    });
    
    // 3. E2E 테스트 (End-to-End Test) 예시 - Cypress 사용
    
    // cypress/integration/login.spec.js
    describe('Login Flow', () => {
      beforeEach(() => {
        // 각 테스트 전에 로그인 페이지 방문
        cy.visit('/login');
      });
      
      it('should login successfully with correct credentials', () => {
        // 사용자 입력 시뮬레이션
        cy.get('input[name="username"]').type('testuser');
        cy.get('input[name="password"]').type('password123');
        cy.get('button[type="submit"]').click();
        
        // 로그인 성공 후 대시보드로 리디렉션 확인
        cy.url().should('include', '/dashboard');
        cy.get('.welcome-message').should('contain', 'Welcome, testuser');
      });
      
      it('should show error with incorrect credentials', () => {
        cy.get('input[name="username"]').type('testuser');
        cy.get('input[name="password"]').type('wrongpassword');
        cy.get('button[type="submit"]').click();
        
        // 오류 메시지 확인
        cy.get('.error-message').should('be.visible');
        cy.get('.error-message').should('contain', 'Invalid credentials');
        
        // URL이 여전히 로그인 페이지인지 확인
        cy.url().should('include', '/login');
      });
    });
    
    // 4. TDD (Test-Driven Development) 예시
    
    // 1단계: 실패하는 테스트 작성
    // calculator.test.js
    describe('Calculator', () => {
      test('multiply should multiply two numbers', () => {
        const calculator = new Calculator();
        expect(calculator.multiply(2, 3)).toBe(6);
      });
    });
    
    // 2단계: 테스트를 통과하는 최소한의 코드 작성
    // calculator.js
    class Calculator {
      multiply(a, b) {
        return a * b;
      }
    }
    
    // 3단계: 리팩토링 (필요한 경우)
    
    // 5. 스냅샷 테스팅 (React 컴포넌트 예시)
    
    // Button.test.js
    import React from 'react';
    import renderer from 'react-test-renderer';
    import Button from './Button';
    
    describe('Button component', () => {
      test('renders correctly', () => {
        const tree = renderer
          .create(<Button label="Click me" onClick={() => {}} />)
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
      
      test('renders with primary style', () => {
        const tree = renderer
          .create(<Button label="Primary" primary onClick={() => {}} />)
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
    });
    
    // 6. 코드 커버리지 확인
    
    // package.json
    /*
    {
      "scripts": {
        "test": "jest",
        "test:coverage": "jest --coverage"
      }
    }
    */
    
    // 커버리지 결과 예시:
    // -----------------------|---------|----------|---------|---------|-------------------
    // File                   | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
    // -----------------------|---------|----------|---------|---------|-------------------
    // All files              |   85.71 |    66.67 |   83.33 |   85.71 |
    //  calculator.js         |     100 |      100 |     100 |     100 |
    //  userService.js        |   77.78 |    66.67 |      75 |   77.78 | 15,28
    // -----------------------|---------|----------|---------|---------|-------------------
    ```

28. **JavaScript 코드를 디버깅하는 방법에 대해 설명해주세요.**
    
    **설명:** JavaScript 코드 디버깅은 오류를 찾고 해결하는 과정으로, 다양한 도구와 기법을 활용합니다. 가장 기본적인 방법은 console.log(), console.error(), console.warn() 등의 콘솔 메서드를 사용하여 변수 값이나 실행 흐름을 확인하는 것입니다. 브라우저 개발자 도구는 더 강력한 디버깅 기능을 제공하며, 중단점(breakpoint)을 설정하여 코드 실행을 특정 지점에서 일시 중지하고 변수 값을 검사할 수 있습니다. 조건부 중단점은 특정 조건이 충족될 때만 실행을 중지하여 특정 상황을 디버깅하는 데 유용합니다. try-catch 블록은 예외를 포착하고 처리하는 데 사용되며, 오류 발생 시 스택 트레이스를 제공합니다. 디버거 문(debugger)을 코드에 삽입하면 개발자 도구가 열려 있을 때 자동으로 실행을 중지합니다. 소스맵은 압축된 코드를 원본 코드에 매핑하여 프로덕션 환경에서의 디버깅을 용이하게 합니다. 성능 문제를 디버깅할 때는 Performance 탭과 프로파일링 도구를 사용하여 병목 현상을 식별할 수 있습니다. 네트워크 요청 디버깅에는 Network 탭이 유용하며, 메모리 누수는 Memory 탭으로 분석할 수 있습니다. 효과적인 디버깅을 위해서는 문제를 재현할 수 있는 최소한의 예제를 만들고, 체계적으로 접근하며, 코드를 점진적으로 테스트하는 것이 중요합니다.

    **Description:** JavaScript code debugging is the process of finding and resolving errors, utilizing various tools and techniques. The most basic method is using console methods like console.log(), console.error(), and console.warn() to check variable values or execution flow. Browser developer tools provide more powerful debugging features, allowing you to set breakpoints to pause code execution at specific points and inspect variable values. Conditional breakpoints are useful for debugging specific situations by pausing execution only when certain conditions are met. Try-catch blocks are used to capture and handle exceptions, providing stack traces when errors occur. Inserting the debugger statement in code automatically pauses execution when developer tools are open. Source maps map compressed code to original code, facilitating debugging in production environments. For performance issues, the Performance tab and profiling tools help identify bottlenecks. The Network tab is useful for debugging network requests, while memory leaks can be analyzed with the Memory tab. For effective debugging, it's important to create minimal examples that reproduce the issue, approach systematically, and test code incrementally.
    
    **예시:**
    ```javascript
    // 1. 콘솔 로깅을 사용한 디버깅
    
    function calculateTotal(items) {
      console.log('Items received:', items);
      
      let total = 0;
      for (let i = 0; i < items.length; i++) {
        console.log(`Processing item ${i}:`, items[i]);
        
        if (!items[i].price) {
          console.warn(`Item ${i} has no price:`, items[i]);
          continue;
        }
        
        const itemTotal = items[i].price * (items[i].quantity || 1);
        console.log(`Item ${i} total:`, itemTotal);
        
        total += itemTotal;
      }
      
      console.log('Final total:', total);
      return total;
    }
    
    // 2. try-catch를 사용한 오류 처리
    
    function fetchUserData(userId) {
      try {
        // 오류가 발생할 수 있는 코드
        if (!userId) {
          throw new Error('User ID is required');
        }
        
        return fetch(`https://api.example.com/users/${userId}`)
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
          });
      } catch (error) {
        // 오류 처리
        console.error('Error fetching user data:', error);
        console.error('Stack trace:', error.stack);
        
        // 오류 보고 시스템에 전송
        reportError(error);
        
        // 대체 동작 수행 또는 기본값 반환
        return Promise.resolve({ id: userId, name: 'Unknown', isDefaultData: true });
      }
    }
    
    // 3. 디버거 문 사용
    
    function debugWithDebuggerStatement(data) {
      let result = [];
      
      for (let i = 0; i < data.length; i++) {
        if (data[i].isComplicated) {
          debugger; // 개발자 도구가 열려 있으면 여기서 실행이 중지됨
        }
        
        // 복잡한 처리 로직
        result.push(processItem(data[i]));
      }
      
      return result;
    }
    
    // 4. 브라우저 개발자 도구를 사용한 디버깅 기법
    
    // 4.1 중단점 설정 (코드에서는 표현할 수 없지만, 개발자 도구에서 설정)
    function functionToDebug() {
      const a = 1;
      const b = 2;
      
      // 개발자 도구에서 이 줄에 중단점을 설정할 수 있음
      const sum = a + b;
      
      return sum * 2;
    }
    
    // 4.2 조건부 중단점 사용 예시
    function processLargeArray(array) {
      for (let i = 0; i < array.length; i++) {
        // 개발자 도구에서 조건부 중단점을 설정할 수 있음
        // 예: "array[i] < 0" 조건으로 중단점 설정
        
        const result = complexCalculation(array[i]);
        // 처리 로직...
      }
    }
    
    // 4.3 이벤트 리스너 중단점
    document.getElementById('myButton').addEventListener('click', function() {
      // 개발자 도구에서 이벤트 리스너 중단점을 설정하면
      // 이 함수가 실행될 때 자동으로 중단됨
      handleButtonClick();
    });
    
    // 5. 성능 디버깅
    
    // 5.1 console.time을 사용한 성능 측정
    function measurePerformance() {
      console.time('Array initialization');
      
      const arr = [];
      for (let i = 0; i < 1000000; i++) {
        arr.push(i);
      }
      
      console.timeEnd('Array initialization');
      // 출력: "Array initialization: 123.45ms"
      
      return arr;
    }
    
    // 5.2 성능 프로파일링
    function profileFunction() {
      console.profile('Processing function');
      
      // 성능을 측정할 코드
      processLargeDataSet();
      
      console.profileEnd('Processing function');
      // 개발자 도구의 Performance 탭에서 결과 확인 가능
    }
    
    // 6. 고급 디버깅 기법
    
    // 6.1 객체 구조 출력
    function inspectObject(obj) {
      console.log('Object simple view:', obj);
      console.dir(obj); // 객체의 모든 속성을 계층 구조로 표시
      console.table(obj); // 테이블 형식으로 객체 데이터 표시 (배열 객체에 유용)
    }
    
    // 6.2 그룹화된 로그 출력
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
    
    // 6.3 조건부 로깅
    function conditionalLogging(data, isDebugMode) {
      // 디버그 모드에서만 로깅
      if (isDebugMode) {
        console.log('Debug data:', data);
      }
      
      // 또는 console.assert 사용
      console.assert(data.length > 0, 'Data array is empty!');
    }
    
    // 7. 비동기 코드 디버깅
    
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
    
    // 8. 디버깅 유틸리티 함수
    
    function createDebugger(prefix) {
      return function(...args) {
        const timestamp = new Date().toISOString();
        console.log(`[${timestamp}] [${prefix}]`, ...args);
      };
    }
    
    // 사용 예시
    const authDebug = createDebugger('AUTH');
    const apiDebug = createDebugger('API');
    
    function login() {
      authDebug('Login attempt');
      // 로그인 로직...
      authDebug('Login successful');
    }
    ```
