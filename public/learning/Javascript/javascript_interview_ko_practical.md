# JavaScript 개발자 인터뷰 질문 (실무 질문)

## 실무 질문

33. **대규모 JavaScript 애플리케이션을 구조화하는 방법에 대해 설명해주세요.**
    
    **설명:** 대규모 JavaScript 애플리케이션은 유지보수성과 확장성을 위해 적절한 구조화가 필요합니다. 모듈 패턴을 사용하여 코드를 캡슐화하고, 컴포넌트 기반 아키텍처로 UI를 분리하며, 서비스 레이어를 통해 비즈니스 로직과 API 통신을 추상화할 수 있습니다. Redux나 MobX 같은 상태 관리 라이브러리를 활용하여 애플리케이션 상태를 중앙화하고, 일관된 폴더 구조를 통해 코드 탐색성을 높이는 것이 중요합니다. 이러한 구조화는 코드 중복을 줄이고, 테스트 용이성을 높이며, 개발자 간 협업을 원활하게 합니다.
    
    **Description:** Large-scale JavaScript applications require proper structuring for maintainability and scalability. You can encapsulate code using the module pattern, separate UI with component-based architecture, and abstract business logic and API communications through service layers. It's important to centralize application state using state management libraries like Redux or MobX and improve code navigability through consistent folder structures. This structuring reduces code duplication, enhances testability, and facilitates collaboration between developers.
    
    **예시:**
    ```javascript
    // 대규모 애플리케이션 구조화 예시
    
    // 1. 모듈 패턴을 사용한 구조화
    // userModule.js
    const userModule = (function() {
      // 비공개 변수와 함수
      let users = [];
      
      function validateUser(user) {
        return user.name && user.email;
      }
      
      // 공개 API
      return {
        addUser: function(user) {
          if (validateUser(user)) {
            users.push(user);
            return true;
          }
          return false;
        },
        
        getUsers: function() {
          return [...users]; // 원본 배열의 복사본 반환
        },
        
        findUserByEmail: function(email) {
          return users.find(user => user.email === email);
        }
      };
    })();
    
    // 2. 컴포넌트 기반 아키텍처 (React 예시)
    // components/UserList.js
    import React, { useState, useEffect } from 'react';
    import UserService from '../services/UserService';
    import UserItem from './UserItem';
    
    function UserList() {
      const [users, setUsers] = useState([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);
      
      useEffect(() => {
        async function fetchUsers() {
          try {
            setLoading(true);
            const data = await UserService.getUsers();
            setUsers(data);
            setError(null);
          } catch (err) {
            setError('Failed to fetch users');
            console.error(err);
          } finally {
            setLoading(false);
          }
        }
        
        fetchUsers();
      }, []);
      
      if (loading) return <div>Loading...</div>;
      if (error) return <div>Error: {error}</div>;
      
      return (
        <div className="user-list">
          <h2>Users</h2>
          {users.length === 0 ? (
            <p>No users found</p>
          ) : (
            <ul>
              {users.map(user => (
                <UserItem key={user.id} user={user} />
              ))}
            </ul>
          )}
        </div>
      );
    }
    
    export default UserList;
    
    // 3. 서비스 레이어 패턴
    // services/UserService.js
    import api from '../utils/api';
    
    class UserService {
      static async getUsers() {
        try {
          const response = await api.get('/users');
          return response.data;
        } catch (error) {
          console.error('Error fetching users:', error);
          throw error;
        }
      }
      
      static async getUserById(id) {
        try {
          const response = await api.get(`/users/${id}`);
          return response.data;
        } catch (error) {
          console.error(`Error fetching user ${id}:`, error);
          throw error;
        }
      }
      
      static async createUser(userData) {
        try {
          const response = await api.post('/users', userData);
          return response.data;
        } catch (error) {
          console.error('Error creating user:', error);
          throw error;
        }
      }
    }
    
    export default UserService;
    
    // 4. 상태 관리 (Redux 예시)
    // store/userSlice.js
    import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
    import UserService from '../services/UserService';
    
    export const fetchUsers = createAsyncThunk(
      'users/fetchUsers',
      async (_, { rejectWithValue }) => {
        try {
          return await UserService.getUsers();
        } catch (error) {
          return rejectWithValue(error.message);
        }
      }
    );
    
    const userSlice = createSlice({
      name: 'users',
      initialState: {
        items: [],
        status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
        error: null
      },
      reducers: {},
      extraReducers: (builder) => {
        builder
          .addCase(fetchUsers.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(fetchUsers.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.items = action.payload;
          })
          .addCase(fetchUsers.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
          });
      }
    });
    
    export default userSlice.reducer;
    
    // 5. 폴더 구조 예시
    /*
    /src
      /assets        - 이미지, 폰트 등 정적 자산
      /components    - 재사용 가능한 UI 컴포넌트
        /common      - 공통 컴포넌트 (버튼, 입력 필드 등)
        /layout      - 레이아웃 관련 컴포넌트
        /features    - 특정 기능에 관련된 컴포넌트
      /config        - 환경 설정 파일
      /hooks         - 커스텀 훅
      /pages         - 페이지 컴포넌트
      /services      - API 통신 및 비즈니스 로직
      /store         - 상태 관리 (Redux 등)
      /utils         - 유틸리티 함수
      /styles        - 전역 스타일
      /types         - TypeScript 타입 정의
      /constants     - 상수 정의
      index.js       - 애플리케이션 진입점
    */
    ```

34. **코드 품질을 유지하기 위해 어떤 도구와 방법을 사용하나요?**
    - ESLint, Prettier, 코드 리뷰 등
    
    **설명:** 코드 품질 유지는 안정적이고 유지보수 가능한 소프트웨어 개발에 필수적입니다. ESLint는 코드 품질과 스타일 문제를 정적으로 분석하고 수정하는 도구로, 잠재적 버그와 안티 패턴을 찾아냅니다. Prettier는 코드 포맷팅을 자동화하여 일관된 스타일을 유지합니다. Jest나 Mocha 같은 테스트 프레임워크로 단위 테스트와 통합 테스트를 작성하여 코드의 정확성을 검증합니다. GitHub Actions 같은 CI/CD 도구로 자동화된 테스트와 배포를 구현하고, 코드 리뷰 프로세스를 통해 팀 내 지식 공유와 코드 품질 향상을 도모합니다.
    
    **Description:** Maintaining code quality is essential for stable and maintainable software development. ESLint is a tool that statically analyzes and fixes code quality and style issues, identifying potential bugs and anti-patterns. Prettier automates code formatting to maintain consistent style. Testing frameworks like Jest or Mocha are used to write unit and integration tests to verify code accuracy. CI/CD tools like GitHub Actions implement automated testing and deployment, while code review processes promote knowledge sharing within the team and improve code quality.
    
    **예시:**
    ```javascript
    // 1. ESLint 설정 예시 (.eslintrc.js)
    module.exports = {
      env: {
        browser: true,
        es2021: true,
        node: true,
        jest: true,
      },
      extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier', // Prettier와 충돌 방지
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
      },
      plugins: [
        'react',
        'react-hooks',
        '@typescript-eslint',
        'prettier',
      ],
      rules: {
        // 일반 규칙
        'no-console': ['warn', { allow: ['warn', 'error'] }],
        'no-unused-vars': 'off', // TypeScript 규칙으로 대체
        'prefer-const': 'error',
        
        // React 규칙
        'react/prop-types': 'off', // TypeScript 사용 시 불필요
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        
        // TypeScript 규칙
        '@typescript-eslint/no-unused-vars': ['error'],
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'warn',
        
        // Prettier 규칙
        'prettier/prettier': ['error', {
          singleQuote: true,
          trailingComma: 'es5',
          printWidth: 100,
          tabWidth: 2,
          semi: true,
        }],
      },
      settings: {
        react: {
          version: 'detect',
        },
      },
    };
    
    // 2. Prettier 설정 예시 (.prettierrc)
    /*
    {
      "singleQuote": true,
      "trailingComma": "es5",
      "printWidth": 100,
      "tabWidth": 2,
      "semi": true,
      "bracketSpacing": true,
      "arrowParens": "avoid"
    }
    */
    
    // 3. Jest를 사용한 테스트 예시
    // utils/math.js
    export function add(a, b) {
      return a + b;
    }
    
    export function subtract(a, b) {
      return a - b;
    }
    
    // utils/math.test.js
    import { add, subtract } from './math';
    
    describe('Math utilities', () => {
      describe('add function', () => {
        test('adds two positive numbers correctly', () => {
          expect(add(2, 3)).toBe(5);
        });
        
        test('adds a positive and a negative number correctly', () => {
          expect(add(2, -3)).toBe(-1);
        });
      });
      
      describe('subtract function', () => {
        test('subtracts two numbers correctly', () => {
          expect(subtract(5, 3)).toBe(2);
        });
        
        test('subtracts with negative result', () => {
          expect(subtract(3, 5)).toBe(-2);
        });
      });
    });
    
    // 4. GitHub Actions를 사용한 CI/CD 설정 예시 (.github/workflows/ci.yml)
    /*
    name: CI
    
    on:
      push:
        branches: [ main, develop ]
      pull_request:
        branches: [ main, develop ]
    
    jobs:
      build:
        runs-on: ubuntu-latest
        
        strategy:
          matrix:
            node-version: [14.x, 16.x]
        
        steps:
        - uses: actions/checkout@v2
        
        - name: Use Node.js ${{ matrix.node-version }}
          uses: actions/setup-node@v2
          with:
            node-version: ${{ matrix.node-version }}
            cache: 'npm'
            
        - name: Install dependencies
          run: npm ci
          
        - name: Lint
          run: npm run lint
          
        - name: Test
          run: npm test -- --coverage
          
        - name: Build
          run: npm run build
    */
    
    // 5. 코드 리뷰 체크리스트 예시
    /*
    ## 코드 리뷰 체크리스트
    
    ### 기능
    - [ ] 요구사항을 모두 충족하는가?
    - [ ] 엣지 케이스를 처리하는가?
    - [ ] 오류 처리가 적절한가?
    
    ### 코드 품질
    - [ ] 코드가 읽기 쉽고 이해하기 쉬운가?
    - [ ] 변수와 함수 이름이 명확한가?
    - [ ] 중복 코드가 없는가?
    - [ ] 함수가 단일 책임 원칙을 따르는가?
    
    ### 성능
    - [ ] 불필요한 계산이나 렌더링이 없는가?
    - [ ] 메모리 누수 가능성은 없는가?
    - [ ] 대용량 데이터 처리 시 성능 문제는 없는가?
    
    ### 테스트
    - [ ] 단위 테스트가 충분한가?
    - [ ] 테스트 커버리지는 적절한가?
    - [ ] 중요한 엣지 케이스에 대한 테스트가 있는가?
    
    ### 보안
    - [ ] 사용자 입력이 적절히 검증되는가?
    - [ ] 민감한 정보가 노출되지 않는가?
    - [ ] 인증 및 권한 검사가 적절한가?
    */
    ```

35. **JavaScript 프로젝트에서 사용해본 디자인 패턴에 대해 설명해주세요.**
    - 싱글톤(Singleton), 옵저버(Observer), 팩토리(Factory), 모듈(Module) 패턴 등
    
    **설명:** 디자인 패턴은 소프트웨어 설계에서 발생하는 공통적인 문제들을 해결하기 위한 검증된 솔루션입니다. 싱글톤 패턴은 클래스의 인스턴스가 하나만 생성되도록 보장하며, 데이터베이스 연결이나 설정 관리에 유용합니다. 팩토리 패턴은 객체 생성 로직을 캡슐화하여 유연한 객체 생성을 가능하게 합니다. 옵저버 패턴은 객체 간 일대다 의존성을 정의하여 상태 변경을 알림에 활용됩니다. 모듈 패턴은 코드를 캡슐화하고 비공개/공개 메서드를 구분하는 데 사용됩니다. 데코레이터 패턴은 객체에 동적으로 책임을 추가할 수 있게 해줍니다.
    
    **Description:** Design patterns are proven solutions for common problems in software design. The Singleton pattern ensures that a class has only one instance, useful for database connections or configuration management. The Factory pattern encapsulates object creation logic, enabling flexible object creation. The Observer pattern defines one-to-many dependencies between objects, used for state change notifications. The Module pattern is used to encapsulate code and distinguish between private and public methods. The Decorator pattern allows adding responsibilities to objects dynamically.
    
    **예시:**
    ```javascript
    // 1. 싱글톤 패턴 (Singleton Pattern)
    class DatabaseConnection {
      constructor() {
        if (DatabaseConnection.instance) {
          return DatabaseConnection.instance;
        }
        
        // 인스턴스 초기화
        this.connected = false;
        this.connectionString = '';
        DatabaseConnection.instance = this;
      }
      
      connect(connectionString) {
        this.connectionString = connectionString;
        this.connected = true;
        console.log(`Connected to database with: ${connectionString}`);
      }
      
      query(sql) {
        if (!this.connected) {
          throw new Error('Database not connected');
        }
        console.log(`Executing query: ${sql}`);
        return [`Query results for: ${sql}`];
      }
      
      disconnect() {
        this.connected = false;
        console.log('Disconnected from database');
      }
    }
    
    // 사용 예시
    const db1 = new DatabaseConnection();
    db1.connect('mongodb://localhost:27017/myapp');
    
    const db2 = new DatabaseConnection(); // 새 인스턴스가 아닌 기존 인스턴스 반환
    console.log(db1 === db2); // true
    
    // 2. 팩토리 패턴 (Factory Pattern)
    // 사용자 타입에 따라 다른 사용자 객체를 생성하는 팩토리
    class User {
      constructor(name, email, role) {
        this.name = name;
        this.email = email;
        this.role = role;
      }
    }
    
    class AdminUser extends User {
      constructor(name, email) {
        super(name, email, 'admin');
        this.permissions = ['read', 'write', 'delete', 'manage_users'];
      }
      
      manageUsers() {
        console.log('Managing users...');
      }
    }
    
    class EditorUser extends User {
      constructor(name, email) {
        super(name, email, 'editor');
        this.permissions = ['read', 'write', 'delete'];
      }
      
      publishContent() {
        console.log('Publishing content...');
      }
    }
    
    class ViewerUser extends User {
      constructor(name, email) {
        super(name, email, 'viewer');
        this.permissions = ['read'];
      }
    }
    
    // 사용자 팩토리
    class UserFactory {
      static createUser(name, email, role) {
        switch (role) {
          case 'admin':
            return new AdminUser(name, email);
          case 'editor':
            return new EditorUser(name, email);
          case 'viewer':
            return new ViewerUser(name, email);
          default:
            throw new Error(`Invalid user role: ${role}`);
        }
      }
    }
    
    // 사용 예시
    const admin = UserFactory.createUser('Admin', 'admin@example.com', 'admin');
    const editor = UserFactory.createUser('Editor', 'editor@example.com', 'editor');
    const viewer = UserFactory.createUser('Viewer', 'viewer@example.com', 'viewer');
    
    // 3. 옵저버 패턴 (Observer Pattern)
    class Subject {
      constructor() {
        this.observers = [];
      }
      
      subscribe(observer) {
        this.observers.push(observer);
      }
      
      unsubscribe(observer) {
        this.observers = this.observers.filter(obs => obs !== observer);
      }
      
      notify(data) {
        this.observers.forEach(observer => observer.update(data));
      }
    }
    
    class Observer {
      constructor(name) {
        this.name = name;
      }
      
      update(data) {
        console.log(`${this.name} received update: ${JSON.stringify(data)}`);
      }
    }
    
    // 사용 예시
    const subject = new Subject();
    
    const observer1 = new Observer('Observer 1');
    const observer2 = new Observer('Observer 2');
    
    subject.subscribe(observer1);
    subject.subscribe(observer2);
    
    subject.notify({ message: 'Hello World!' });
    // Observer 1 received update: {"message":"Hello World!"}
    // Observer 2 received update: {"message":"Hello World!"}
    
    subject.unsubscribe(observer1);
    subject.notify({ message: 'Another update' });
    // Observer 2 received update: {"message":"Another update"}
    
    // 4. 모듈 패턴 (Module Pattern)
    const ShoppingCart = (function() {
      // 비공개 변수
      let items = [];
      let total = 0;
      
      // 비공개 함수
      function calculateTotal() {
        total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      }
      
      function findItemIndex(id) {
        return items.findIndex(item => item.id === id);
      }
      
      // 공개 API
      return {
        addItem(item) {
          const existingIndex = findItemIndex(item.id);
          
          if (existingIndex !== -1) {
            items[existingIndex].quantity += item.quantity || 1;
          } else {
            items.push({ ...item, quantity: item.quantity || 1 });
          }
          
          calculateTotal();
          return this;
        },
        
        removeItem(id) {
          const index = findItemIndex(id);
          
          if (index !== -1) {
            items.splice(index, 1);
            calculateTotal();
          }
          
          return this;
        },
        
        updateQuantity(id, quantity) {
          const index = findItemIndex(id);
          
          if (index !== -1 && quantity > 0) {
            items[index].quantity = quantity;
            calculateTotal();
          }
          
          return this;
        },
        
        getItems() {
          return [...items]; // 원본 배열의 복사본 반환
        },
        
        getTotal() {
          return total;
        },
        
        clearCart() {
          items = [];
          total = 0;
          return this;
        }
      };
    })();
    
    // 사용 예시
    ShoppingCart.addItem({ id: 1, name: 'Product 1', price: 10 });
    ShoppingCart.addItem({ id: 2, name: 'Product 2', price: 15, quantity: 2 });
    
    console.log(ShoppingCart.getItems());
    console.log('Total:', ShoppingCart.getTotal()); // Total: 40
    
    ShoppingCart.updateQuantity(1, 3);
    console.log('Updated total:', ShoppingCart.getTotal()); // Updated total: 60
    
    // 5. 데코레이터 패턴 (Decorator Pattern)
    // 기본 컴포넌트
    class Coffee {
      getCost() {
        return 5;
      }
      
      getDescription() {
        return 'Regular coffee';
      }
    }
    
    // 데코레이터 베이스 클래스
    class CoffeeDecorator {
      constructor(coffee) {
        this.coffee = coffee;
      }
      
      getCost() {
        return this.coffee.getCost();
      }
      
      getDescription() {
        return this.coffee.getDescription();
      }
    }
    
    // 구체적인 데코레이터들
    class MilkDecorator extends CoffeeDecorator {
      getCost() {
        return this.coffee.getCost() + 1;
      }
      
      getDescription() {
        return `${this.coffee.getDescription()}, with milk`;
      }
    }
    
    class SugarDecorator extends CoffeeDecorator {
      getCost() {
        return this.coffee.getCost() + 0.5;
      }
      
      getDescription() {
        return `${this.coffee.getDescription()}, with sugar`;
      }
    }
    
    class WhippedCreamDecorator extends CoffeeDecorator {
      getCost() {
        return this.coffee.getCost() + 2;
      }
      
      getDescription() {
        return `${this.coffee.getDescription()}, with whipped cream`;
      }
    }
    
    // 사용 예시
    let coffee = new Coffee();
    console.log(coffee.getDescription()); // Regular coffee
    console.log(coffee.getCost()); // 5
    
    coffee = new MilkDecorator(coffee);
    console.log(coffee.getDescription()); // Regular coffee, with milk
    console.log(coffee.getCost()); // 6
    
    coffee = new SugarDecorator(coffee);
    console.log(coffee.getDescription()); // Regular coffee, with milk, with sugar
    console.log(coffee.getCost()); // 6.5
    
    coffee = new WhippedCreamDecorator(coffee);
    console.log(coffee.getDescription()); // Regular coffee, with milk, with sugar, with whipped cream
    console.log(coffee.getCost()); // 8.5
    ```
