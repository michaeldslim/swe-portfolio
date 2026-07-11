# React 개발자 인터뷰 질문 - Part 3

## 고급 개념 (계속)

16. **React에서 CSS 스타일링 방법은?**
    - 다양한 스타일링 접근 방식의 장단점을 설명해주세요.
    
    **답변:**
    React에서는 여러 가지 방법으로 컴포넌트 스타일링이 가능합니다. 각 방식은 고유한 장단점이 있으며 프로젝트 요구사항에 따라 선택할 수 있습니다.
    
    **1. 인라인 스타일**
    ```jsx
    function Button() {
      const buttonStyle = {
        backgroundColor: 'blue',
        color: 'white',
        padding: '10px 15px',
        borderRadius: '4px',
        border: 'none',
        cursor: 'pointer'
      };
      
      return <button style={buttonStyle}>클릭</button>;
    }
    ```
    
    **장점:**
    - JavaScript와 스타일 로직 통합 용이
    - 동적 스타일링 간편
    - 추가 설정 필요 없음
    
    **단점:**
    - CSS 의사 클래스(:hover 등) 직접 지원 안 함
    - 미디어 쿼리 사용 불가
    - 캐싱 혜택 없음
    - 스타일 재사용 어려움
    
    **2. CSS 클래스와 외부 스타일시트**
    ```jsx
    // Button.css
    .button {
      background-color: blue;
      color: white;
      padding: 10px 15px;
      border-radius: 4px;
      border: none;
      cursor: pointer;
    }
    
    .button:hover {
      background-color: darkblue;
    }
    
    // Button.jsx
    import './Button.css';
    
    function Button() {
      return <button className="button">클릭</button>;
    }
    ```
    
    **장점:**
    - 기존 CSS 지식 활용 가능
    - 모든 CSS 기능 사용 가능
    - 브라우저 캐싱 혜택
    
    **단점:**
    - 전역 네임스페이스 (클래스명 충돌 가능)
    - 컴포넌트와 스타일 간 느슨한 결합
    - 사용하지 않는 스타일 제거 어려움
    
    **3. CSS 모듈**
    ```jsx
    // Button.module.css
    .button {
      background-color: blue;
      color: white;
      padding: 10px 15px;
      border-radius: 4px;
      border: none;
      cursor: pointer;
    }
    
    .button:hover {
      background-color: darkblue;
    }
    
    // Button.jsx
    import styles from './Button.module.css';
    
    function Button() {
      return <button className={styles.button}>클릭</button>;
    }
    ```
    
    **장점:**
    - 지역 스코프 클래스명 (자동 고유 접두사 생성)
    - 일반 CSS 문법 사용
    - 모든 CSS 기능 지원
    
    **단점:**
    - 동적 스타일링에 추가 작업 필요
    - 클래스명을 문자열로 조합할 때 복잡해질 수 있음
    
    **4. CSS-in-JS (styled-components, emotion 등)**
    ```jsx
    // styled-components 사용
    import styled from 'styled-components';
    
    const StyledButton = styled.button`
      background-color: ${props => props.primary ? 'blue' : 'gray'};
      color: white;
      padding: 10px 15px;
      border-radius: 4px;
      border: none;
      cursor: pointer;
      
      &:hover {
        background-color: ${props => props.primary ? 'darkblue' : 'darkgray'};
      }
    `;
    
    function Button({ primary, children }) {
      return <StyledButton primary={primary}>{children}</StyledButton>;
    }
    ```
    
    **장점:**
    - 컴포넌트와 스타일의 강한 결합
    - props 기반 동적 스타일링 용이
    - JavaScript 변수/함수를 스타일에 직접 사용 가능
    - 자동 벤더 프리픽스
    - 사용하지 않는 스타일 자동 제거
    
    **단점:**
    - 번들 크기 증가
    - 추가 의존성 필요
    - 런타임 오버헤드 가능성
    - 기존 CSS 도구와 통합 어려울 수 있음
    
    **5. Utility-First CSS (Tailwind CSS 등)**
    ```jsx
    // Tailwind CSS 사용
    function Button({ primary }) {
      const baseClasses = "px-4 py-2 rounded border-none cursor-pointer";
      const colorClasses = primary 
        ? "bg-blue-500 hover:bg-blue-700 text-white" 
        : "bg-gray-200 hover:bg-gray-400 text-gray-800";
      
      return (
        <button className={`${baseClasses} ${colorClasses}`}>
          클릭
        </button>
      );
    }
    ```
    
    **장점:**
    - 클래스명 고민 필요 없음
    - 일관된 디자인 시스템
    - 반응형 디자인 쉽게 구현
    - HTML 내에서 직접 스타일링 가능
    
    **단점:**
    - 가파른 학습 곡선
    - HTML이 길고 복잡해질 수 있음
    - 커스터마이징 필요 시 추가 설정 필요
    
    **선택 기준:**
    - 팀의 친숙도와 선호도
    - 프로젝트 규모와 복잡성
    - 성능 요구사항
    - 디자인 시스템 유무
    - 동적 스타일링 필요성

17. **React의 Error Boundary란?**
    - 에러 처리 패턴과 모범 사례를 설명해주세요.
    
    **답변:**
    Error Boundary는 React 16에서 도입된 기능으로, 하위 컴포넌트 트리에서 발생하는 JavaScript 오류를 캐치하고, 오류 UI를 표시하며, 애플리케이션 전체가 중단되는 것을 방지합니다.
    
    **Error Boundary 구현:**
    ```jsx
    class ErrorBoundary extends React.Component {
      constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
      }
      
      static getDerivedStateFromError(error) {
        // 다음 렌더링에서 폴백 UI가 보이도록 상태 업데이트
        return { hasError: true };
      }
      
      componentDidCatch(error, errorInfo) {
        // 에러 정보를 기록하거나 에러 로깅 서비스에 보고
        console.error("ErrorBoundary 캐치:", error, errorInfo);
        this.setState({ error, errorInfo });
        
        // 외부 에러 로깅 서비스에 보고
        // logErrorToService(error, errorInfo);
      }
      
      render() {
        if (this.state.hasError) {
          // 사용자 정의 폴백 UI
          return (
            <div className="error-container">
              <h2>문제가 발생했습니다.</h2>
              <p>잠시 후 다시 시도해 주세요.</p>
              <button onClick={() => this.setState({ hasError: false })}>
                다시 시도
              </button>
              {process.env.NODE_ENV !== 'production' && (
                <details style={{ whiteSpace: 'pre-wrap' }}>
                  {this.state.error && this.state.error.toString()}
                  <br />
                  {this.state.errorInfo && this.state.errorInfo.componentStack}
                </details>
              )}
            </div>
          );
        }
        
        // 에러가 없으면 자식 컴포넌트 렌더링
        return this.props.children;
      }
    }
    
    // 사용 예시
    function App() {
      return (
        <div>
          <h1>애플리케이션</h1>
          <ErrorBoundary>
            <MyComponent />
          </ErrorBoundary>
        </div>
      );
    }
    ```
    
    **Error Boundary 특징:**
    - 클래스 컴포넌트로만 구현 가능 (함수형 컴포넌트는 아직 지원 안 함)
    - 하위 컴포넌트 트리의 렌더링, 생명주기 메서드, 생성자에서 발생하는 오류만 캐치
    - 다음은 캐치하지 않음:
      - 이벤트 핸들러
      - 비동기 코드 (setTimeout, fetch 등)
      - 서버 사이드 렌더링
      - Error Boundary 자체의 오류
    
    **효과적인 사용 패턴:**
    
    **1. 전략적 배치**
    ```jsx
    function App() {
      return (
        <div>
          {/* 전체 앱을 감싸는 최상위 Error Boundary */}
          <ErrorBoundary>
            <Header />
            
            {/* 주요 콘텐츠 영역 */}
            <main>
              {/* 각 주요 섹션별 Error Boundary */}
              <ErrorBoundary>
                <UserProfile />
              </ErrorBoundary>
              
              <ErrorBoundary>
                <ProductList />
              </ErrorBoundary>
              
              <ErrorBoundary>
                <Comments />
              </ErrorBoundary>
            </main>
            
            <Footer />
          </ErrorBoundary>
        </div>
      );
    }
    ```
    
    **2. 컴포넌트별 맞춤 오류 처리**
    ```jsx
    // 데이터 로딩 실패 전용 Error Boundary
    function DataErrorFallback({ error, resetErrorBoundary }) {
      return (
        <div role="alert">
          <p>데이터를 불러오는 중 오류가 발생했습니다:</p>
          <pre>{error.message}</pre>
          <button onClick={resetErrorBoundary}>다시 시도</button>
        </div>
      );
    }
    
    // 사용 예시 (react-error-boundary 라이브러리 사용)
    import { ErrorBoundary } from 'react-error-boundary';
    
    function UserProfile({ userId }) {
      return (
        <ErrorBoundary
          FallbackComponent={DataErrorFallback}
          onReset={() => {
            // 에러 상태 초기화 로직
          }}
          resetKeys={[userId]}
        >
          <UserData userId={userId} />
        </ErrorBoundary>
      );
    }
    ```
    
    **3. 이벤트 핸들러에서의 오류 처리**
    ```jsx
    function MyComponent() {
      const [error, setError] = useState(null);
      
      const handleClick = () => {
        try {
          // 오류가 발생할 수 있는 코드
          someRiskyOperation();
        } catch (error) {
          setError(error);
          // 에러 로깅 서비스에 보고
          logError(error);
        }
      };
      
      if (error) {
        return <ErrorDisplay error={error} reset={() => setError(null)} />;
      }
      
      return <button onClick={handleClick}>작업 실행</button>;
    }
    ```
    
    **4. 비동기 코드에서의 오류 처리**
    ```jsx
    function AsyncComponent() {
      const [data, setData] = useState(null);
      const [error, setError] = useState(null);
      const [loading, setLoading] = useState(true);
      
      useEffect(() => {
        let isMounted = true;
        
        async function fetchData() {
          try {
            setLoading(true);
            const response = await fetch('/api/data');
            
            if (!response.ok) {
              throw new Error('API 응답 오류: ' + response.status);
            }
            
            const result = await response.json();
            
            if (isMounted) {
              setData(result);
              setError(null);
            }
          } catch (error) {
            if (isMounted) {
              setError(error);
              // 에러 로깅 서비스에 보고
              logError(error);
            }
          } finally {
            if (isMounted) {
              setLoading(false);
            }
          }
        }
        
        fetchData();
        
        return () => {
          isMounted = false;
        };
      }, []);
      
      if (loading) return <LoadingSpinner />;
      if (error) return <ErrorDisplay error={error} />;
      if (!data) return <EmptyState />;
      
      return <DataDisplay data={data} />;
    }
    ```
    
    **모범 사례:**
    - 적절한 위치에 여러 Error Boundary 배치
    - 개발 환경에서는 상세 오류 정보 표시, 프로덕션에서는 사용자 친화적 메시지 표시
    - 오류 복구 메커니즘 제공 (다시 시도 버튼 등)
    - 외부 에러 모니터링 서비스 연동
    - 중요한 사용자 작업에 대한 오류 처리 우선 구현
