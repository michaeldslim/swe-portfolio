# React 개발자 인터뷰 질문 - Part 2

## 고급 개념

11. **React에서 폼 처리는 어떻게 하나요?**
    - 제어 컴포넌트와 비제어 컴포넌트의 차이점은 무엇인가요?
    
    **답변:**
    React에서 폼 처리는 크게 제어 컴포넌트(Controlled Component)와 비제어 컴포넌트(Uncontrolled Component) 두 가지 방식으로 할 수 있습니다.
    
    **제어 컴포넌트:**
    - 폼 데이터가 React 컴포넌트의 state에 의해 제어됨
    - 입력값이 변경될 때마다 state가 업데이트됨
    - 데이터 검증, 조건부 렌더링 등 더 많은 제어 가능
    
    ```javascript
    function ControlledForm() {
      const [name, setName] = useState('');
      const [email, setEmail] = useState('');
      
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log('제출된 데이터:', { name, email });
      };
      
      return (
        <form onSubmit={handleSubmit}>
          <div>
            <label>이름:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label>이메일:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type="submit">제출</button>
        </form>
      );
    }
    ```
    
    **비제어 컴포넌트:**
    - DOM 자체가 폼 데이터를 관리
    - ref를 사용하여 필요할 때만 DOM에서 값을 가져옴
    - 구현이 간단하고 React 외부 라이브러리와 통합이 쉬움
    
    ```javascript
    function UncontrolledForm() {
      const nameRef = useRef();
      const emailRef = useRef();
      
      const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
          name: nameRef.current.value,
          email: emailRef.current.value
        };
        console.log('제출된 데이터:', formData);
      };
      
      return (
        <form onSubmit={handleSubmit}>
          <div>
            <label>이름:</label>
            <input type="text" ref={nameRef} defaultValue="" />
          </div>
          <div>
            <label>이메일:</label>
            <input type="email" ref={emailRef} defaultValue="" />
          </div>
          <button type="submit">제출</button>
        </form>
      );
    }
    ```
    
    **선택 기준:**
    - 제어 컴포넌트: 즉각적인 유효성 검사, 조건부 렌더링, 동적 입력 제한 등이 필요한 경우
    - 비제어 컴포넌트: 간단한 폼, 파일 입력 처리, React 외부 DOM 라이브러리 통합 시

12. **React에서 HTTP 요청은 어떻게 처리하나요?**
    - 데이터 페칭을 위한 다양한 방법과 각각의 장단점을 설명해주세요.
    
    **답변:**
    React에서 HTTP 요청을 처리하는 방법은 여러 가지가 있으며, 각각 특징과 사용 사례가 다릅니다.
    
    **1. fetch API (브라우저 내장)**
    ```javascript
    function FetchExample() {
      const [data, setData] = useState(null);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);
      
      useEffect(() => {
        fetch('https://api.example.com/data')
          .then(response => {
            if (!response.ok) {
              throw new Error('네트워크 응답이 올바르지 않습니다');
            }
            return response.json();
          })
          .then(data => {
            setData(data);
            setLoading(false);
          })
          .catch(error => {
            setError(error.message);
            setLoading(false);
          });
      }, []);
      
      if (loading) return <div>로딩 중...</div>;
      if (error) return <div>에러: {error}</div>;
      
      return <div>데이터: {JSON.stringify(data)}</div>;
    }
    ```
    
    **장점:** 별도 설치 필요 없음, 기본 기능 제공
    **단점:** 에러 처리가 복잡, 요청 취소 기능 제한적
    
    **2. axios (라이브러리)**
    ```javascript
    import axios from 'axios';
    
    function AxiosExample() {
      const [data, setData] = useState(null);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);
      
      useEffect(() => {
        const source = axios.CancelToken.source();
        
        axios.get('https://api.example.com/data', {
          cancelToken: source.token
        })
          .then(response => {
            setData(response.data);
            setLoading(false);
          })
          .catch(error => {
            if (axios.isCancel(error)) {
              console.log('요청이 취소되었습니다:', error.message);
            } else {
              setError(error.message);
              setLoading(false);
            }
          });
          
        // 클린업 함수
        return () => {
          source.cancel('컴포넌트가 언마운트됨');
        };
      }, []);
      
      if (loading) return <div>로딩 중...</div>;
      if (error) return <div>에러: {error}</div>;
      
      return <div>데이터: {JSON.stringify(data)}</div>;
    }
    ```
    
    **장점:** 간결한 API, 요청 취소, 인터셉터, 자동 JSON 변환
    **단점:** 추가 의존성 필요
    
    **3. React Query / SWR (데이터 페칭 라이브러리)**
    ```javascript
    import { useQuery } from 'react-query';
    
    // API 호출 함수
    const fetchData = async () => {
      const response = await fetch('https://api.example.com/data');
      if (!response.ok) {
        throw new Error('네트워크 응답이 올바르지 않습니다');
      }
      return response.json();
    };
    
    function ReactQueryExample() {
      const { data, isLoading, error } = useQuery('uniqueKey', fetchData, {
        refetchOnWindowFocus: true,
        staleTime: 5000,
        cacheTime: 10 * 60 * 1000
      });
      
      if (isLoading) return <div>로딩 중...</div>;
      if (error) return <div>에러: {error.message}</div>;
      
      return <div>데이터: {JSON.stringify(data)}</div>;
    }
    ```
    
    **장점:** 캐싱, 자동 재시도, 백그라운드 업데이트, 페이지네이션 지원
    **단점:** 추가 의존성, 학습 곡선
    
    **4. 커스텀 Hook**
    ```javascript
    // 커스텀 Hook
    function useFetch(url) {
      const [data, setData] = useState(null);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);
      
      useEffect(() => {
        let isMounted = true;
        const abortController = new AbortController();
        
        async function fetchData() {
          try {
            const response = await fetch(url, {
              signal: abortController.signal
            });
            
            if (!response.ok) {
              throw new Error('네트워크 응답이 올바르지 않습니다');
            }
            
            const result = await response.json();
            
            if (isMounted) {
              setData(result);
              setLoading(false);
            }
          } catch (error) {
            if (error.name !== 'AbortError' && isMounted) {
              setError(error.message);
              setLoading(false);
            }
          }
        }
        
        fetchData();
        
        return () => {
          isMounted = false;
          abortController.abort();
        };
      }, [url]);
      
      return { data, loading, error };
    }
    
    // 사용 예시
    function CustomHookExample() {
      const { data, loading, error } = useFetch('https://api.example.com/data');
      
      if (loading) return <div>로딩 중...</div>;
      if (error) return <div>에러: {error}</div>;
      
      return <div>데이터: {JSON.stringify(data)}</div>;
    }
    ```
    
    **장점:** 재사용성, 관심사 분리, 맞춤형 로직
    **단점:** 직접 구현해야 함, 고급 기능은 직접 추가 필요

13. **React와 TypeScript를 함께 사용하는 방법은?**
    - TypeScript를 사용할 때의 장점과 주요 타입 패턴을 설명해주세요.
    
    **답변:**
    React와 TypeScript를 함께 사용하면 타입 안정성, 개발자 경험 향상, 버그 감소 등 여러 이점을 얻을 수 있습니다.
    
    **기본 설정:**
    ```bash
    # Create React App으로 TypeScript 프로젝트 생성
    npx create-react-app my-app --template typescript
    
    # 또는 기존 프로젝트에 TypeScript 추가
    npm install --save typescript @types/node @types/react @types/react-dom @types/jest
    ```
    
    **주요 타입 패턴:**
    
    **1. 컴포넌트 Props 타입 정의**
    ```tsx
    // 인터페이스 사용
    interface UserProps {
      name: string;
      age: number;
      isAdmin?: boolean; // 선택적 prop
      onLogout: () => void; // 함수 prop
    }
    
    // 함수형 컴포넌트
    const UserProfile: React.FC<UserProps> = ({ name, age, isAdmin = false, onLogout }) => {
      return (
        <div>
          <h2>{name}</h2>
          <p>나이: {age}</p>
          {isAdmin && <p>관리자 계정</p>}
          <button onClick={onLogout}>로그아웃</button>
        </div>
      );
    };
    
    // 또는 더 간결하게
    function UserProfile({ name, age, isAdmin = false, onLogout }: UserProps) {
      // ...
    }
    ```
    
    **2. 상태(State) 타입 정의**
    ```tsx
    // 기본 타입
    const [count, setCount] = useState<number>(0);
    
    // 객체 타입
    interface User {
      id: number;
      name: string;
      email: string;
    }
    
    const [user, setUser] = useState<User | null>(null);
    
    // 배열 타입
    const [items, setItems] = useState<string[]>([]);
    ```
    
    **3. 이벤트 핸들러 타입 정의**
    ```tsx
    // 이벤트 핸들러
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      console.log(e.target.value);
    };
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      // 폼 제출 로직
    };
    
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      // 클릭 이벤트 처리
    };
    ```
    
    **4. 제네릭 컴포넌트**
    ```tsx
    interface ListProps<T> {
      items: T[];
      renderItem: (item: T) => React.ReactNode;
    }
    
    function List<T>({ items, renderItem }: ListProps<T>) {
      return (
        <ul>
          {items.map((item, index) => (
            <li key={index}>{renderItem(item)}</li>
          ))}
        </ul>
      );
    }
    
    // 사용 예시
    <List
      items={[1, 2, 3, 4]}
      renderItem={(item) => <span>{item * 2}</span>}
    />
    ```
    
    **5. 타입 가드 사용**
    ```tsx
    type AdminUser = {
      id: number;
      name: string;
      role: 'admin';
      permissions: string[];
    };
    
    type RegularUser = {
      id: number;
      name: string;
      role: 'user';
    };
    
    type User = AdminUser | RegularUser;
    
    function UserPermissions({ user }: { user: User }) {
      // 타입 가드
      if (user.role === 'admin') {
        // TypeScript는 여기서 user가 AdminUser임을 알고 있음
        return <div>권한: {user.permissions.join(', ')}</div>;
      }
      
      // TypeScript는 여기서 user가 RegularUser임을 알고 있음
      return <div>일반 사용자입니다</div>;
    }
    ```
    
    **TypeScript 사용의 장점:**
    - 컴파일 시점에 오류 감지
    - 자동 완성 및 코드 내비게이션 향상
    - 리팩토링 시 안정성 제공
    - 자체 문서화 효과
    - 팀 협업 시 명확한 인터페이스 제공
    
    **주의사항:**
    - `any` 타입 사용 최소화
    - 적절한 타입 추론 활용
    - 필요한 경우에만 타입 단언(Type Assertion) 사용
    - 라이브러리 타입 정의(@types/*)가 있는지 확인

14. **React 컴포넌트 테스트는 어떻게 하나요?**
    - 단위 테스트와 통합 테스트의 차이점과 도구를 설명해주세요.
    
    **답변:**
    React 컴포넌트 테스트는 애플리케이션의 안정성과 품질을 보장하는 중요한 과정입니다. 주로 Jest와 React Testing Library 또는 Enzyme을 사용합니다.
    
    **테스트 유형:**
    
    **1. 단위 테스트(Unit Testing)**
    - 개별 컴포넌트나 함수를 독립적으로 테스트
    - 외부 의존성은 모킹(mocking)하여 격리된 환경에서 테스트
    - 빠르게 실행되고 특정 기능의 문제를 정확히 파악 가능
    
    **2. 통합 테스트(Integration Testing)**
    - 여러 컴포넌트 간의 상호작용 테스트
    - 실제 환경과 유사한 조건에서 테스트
    - 컴포넌트 간 데이터 흐름과 이벤트 처리 검증
    
    **3. E2E 테스트(End-to-End Testing)**
    - 실제 사용자 시나리오를 시뮬레이션
    - 브라우저 환경에서 전체 애플리케이션 테스트
    - Cypress, Playwright 등의 도구 사용
    
    **주요 테스트 도구:**
    
    **1. Jest**
    - Facebook에서 개발한 JavaScript 테스트 프레임워크
    - 테스트 러너, 단언(assertion) 라이브러리, 모킹 도구 제공
    - 스냅샷 테스트 지원
    
    **2. React Testing Library**
    - 사용자 관점에서 테스트 작성 권장 (행동 중심)
    - DOM 노드 대신 실제 HTML 요소에 접근
    - 접근성(a11y) 고려한 테스트 작성 용이
    
    **3. Enzyme**
    - Airbnb에서 개발
    - 컴포넌트 내부 상태와 props에 직접 접근 가능
    - 얕은 렌더링(shallow rendering) 지원
    
    **테스트 예시:**
    
    **React Testing Library를 사용한 단위 테스트:**
    ```jsx
    // Button.tsx
    function Button({ onClick, children }) {
      return (
        <button onClick={onClick} data-testid="custom-button">
          {children}
        </button>
      );
    }
    
    // Button.test.tsx
    import { render, screen, fireEvent } from '@testing-library/react';
    import Button from './Button';
    
    test('버튼이 올바르게 렌더링되는지 테스트', () => {
      render(<Button>클릭</Button>);
      const buttonElement = screen.getByTestId('custom-button');
      expect(buttonElement).toBeInTheDocument();
      expect(buttonElement.textContent).toBe('클릭');
    });
    
    test('클릭 이벤트가 발생하는지 테스트', () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>클릭</Button>);
      const buttonElement = screen.getByTestId('custom-button');
      
      fireEvent.click(buttonElement);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
    ```
    
    **통합 테스트 예시:**
    ```jsx
    // UserProfile.tsx
    function UserProfile({ userId }) {
      const [user, setUser] = useState(null);
      const [loading, setLoading] = useState(true);
      
      useEffect(() => {
        fetchUser(userId).then(data => {
          setUser(data);
          setLoading(false);
        });
      }, [userId]);
      
      if (loading) return <div>로딩 중...</div>;
      
      return (
        <div>
          <h2>{user.name}</h2>
          <p>이메일: {user.email}</p>
          <UserPosts userId={userId} />
        </div>
      );
    }
    
    // UserProfile.test.tsx
    import { render, screen, waitFor } from '@testing-library/react';
    import UserProfile from './UserProfile';
    import { fetchUser } from './api';
    
    // API 모킹
    jest.mock('./api', () => ({
      fetchUser: jest.fn()
    }));
    
    test('사용자 프로필이 올바르게 로드되고 표시되는지 테스트', async () => {
      // 모의 데이터 설정
      fetchUser.mockResolvedValue({
        id: 1,
        name: '홍길동',
        email: 'hong@example.com'
      });
      
      render(<UserProfile userId={1} />);
      
      // 로딩 상태 확인
      expect(screen.getByText('로딩 중...')).toBeInTheDocument();
      
      // 데이터 로드 후 상태 확인
      await waitFor(() => {
        expect(screen.getByText('홍길동')).toBeInTheDocument();
        expect(screen.getByText('이메일: hong@example.com')).toBeInTheDocument();
      });
      
      // API 호출 확인
      expect(fetchUser).toHaveBeenCalledWith(1);
    });
    ```
    
    **모범 사례:**
    - 구현 세부사항이 아닌 사용자 행동에 초점
    - 접근성 고려한 쿼리 사용 (getByRole, getByLabelText 등)
    - 테스트 가능한 코드 설계 (관심사 분리)
    - 모킹은 필요한 경우에만 사용
    - 스냅샷 테스트는 신중하게 사용

15. **Context API와 Redux의 차이점은?**
    - 언제 Context API를 사용하고 언제 Redux를 사용해야 하나요?
    
    **답변:**
    Context API와 Redux는 모두 React 애플리케이션에서 상태 관리를 위한 도구이지만, 설계 철학과 사용 사례가 다릅니다.
    
    **Context API:**
    - React에 내장된 기능으로 별도 설치 필요 없음
    - 컴포넌트 트리를 통해 데이터를 전달하는 방법 제공
    - props drilling 문제 해결에 적합
    - 간단한 상태 공유에 유용
    
    ```jsx
    // Context 생성
    const ThemeContext = React.createContext({
      theme: 'light',
      toggleTheme: () => {}
    });
    
    // Provider 컴포넌트
    function ThemeProvider({ children }) {
      const [theme, setTheme] = useState('light');
      
      const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
      };
      
      return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
          {children}
        </ThemeContext.Provider>
      );
    }
    
    // Consumer 컴포넌트
    function ThemedButton() {
      const { theme, toggleTheme } = useContext(ThemeContext);
      
      return (
        <button
          style={{
            background: theme === 'light' ? '#fff' : '#333',
            color: theme === 'light' ? '#333' : '#fff'
          }}
          onClick={toggleTheme}
        >
          테마 전환
        </button>
      );
    }
    ```
    
    **Redux:**
    - 예측 가능한 상태 컨테이너
    - 단일 스토어에 애플리케이션 상태 저장
    - 액션, 리듀서, 스토어 개념으로 구성
    - 미들웨어를 통한 확장성
    - 개발자 도구 지원
    
    ```jsx
    // 액션 타입
    const INCREMENT = 'INCREMENT';
    const DECREMENT = 'DECREMENT';
    
    // 액션 생성자
    const increment = () => ({ type: INCREMENT });
    const decrement = () => ({ type: DECREMENT });
    
    // 리듀서
    const counterReducer = (state = { count: 0 }, action) => {
      switch (action.type) {
        case INCREMENT:
          return { ...state, count: state.count + 1 };
        case DECREMENT:
          return { ...state, count: state.count - 1 };
        default:
          return state;
      }
    };
    
    // 스토어
    const store = createStore(counterReducer);
    
    // React 컴포넌트에서 사용
    function Counter() {
      const count = useSelector(state => state.count);
      const dispatch = useDispatch();
      
      return (
        <div>
          <p>카운트: {count}</p>
          <button onClick={() => dispatch(increment())}>증가</button>
          <button onClick={() => dispatch(decrement())}>감소</button>
        </div>
      );
    }
    ```
    
    **주요 차이점:**
    
    | 특성 | Context API | Redux |
    |------|------------|-------|
    | 설치 | 내장 기능 | 외부 라이브러리 |
    | 복잡성 | 낮음 | 중간~높음 |
    | 성능 | 자주 변경되는 상태에 최적화되지 않음 | 최적화된 상태 업데이트 |
    | 미들웨어 | 기본 지원 없음 | 강력한 미들웨어 지원 |
    | 개발자 도구 | 제한적 | 포괄적인 도구 지원 |
    | 상태 구조 | 여러 컨텍스트로 분산 가능 | 단일 스토어 권장 |
    | 디버깅 | 상대적으로 어려움 | 시간 여행 디버깅 등 강력한 기능 |
    
    **사용 시기:**
    
    **Context API 사용이 적합한 경우:**
    - 작은~중간 규모의 애플리케이션
    - 간단한 상태 관리 요구사항
    - 깊은 컴포넌트 트리에서 props 전달 방지
    - 테마, 인증 상태 등 자주 변경되지 않는 데이터
    - 최소한의 설정으로 빠르게 구현해야 할 때
    
    **Redux 사용이 적합한 경우:**
    - 중간~대규모 애플리케이션
    - 복잡한 상태 로직
    - 자주 변경되는 상태와 많은 상태 업데이트
    - 미들웨어를 통한 부수 효과 처리 필요
    - 시간 여행 디버깅 등 고급 개발 도구 필요
    - 예측 가능한 상태 관리 중요
    
    **최근 추세:**
    - Redux Toolkit을 사용하여 Redux 보일러플레이트 코드 감소
    - Context API + useReducer 조합으로 Redux와 유사한 패턴 구현
    - 상태 관리 요구사항에 따라 두 가지 접근 방식 혼합 사용
