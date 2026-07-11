# React 개발자 인터뷰 질문 - Part 5

## 고급 개념 (계속)

20. **React의 Concurrent Mode란?**
    - Concurrent Mode의 주요 기능과 이점을 설명해주세요.
    
    **답변:**
    Concurrent Mode는 React 18에서 정식으로 도입된 새로운 렌더링 모델로, React가 렌더링 작업을 중단, 재개, 우선순위 지정할 수 있게 해주는 기능입니다. 이를 통해 UI의 응답성을 유지하면서 복잡한 업데이트를 처리할 수 있습니다.
    
    **주요 개념:**
    
    **1. 동시성(Concurrency)**
    - 여러 작업을 동시에 진행하는 것처럼 보이도록 하는 개념
    - 실제로는 작업 간 전환을 빠르게 하여 동시에 실행되는 것처럼 보이게 함
    - 중요한 업데이트(사용자 입력 등)에 우선순위 부여 가능
    
    **2. 중단 가능한 렌더링(Interruptible Rendering)**
    - 렌더링 과정을 작은 단위로 나누어 중간에 중단하고 다시 시작 가능
    - 사용자 상호작용이 발생하면 진행 중인 렌더링을 일시 중지하고 중요한 업데이트 먼저 처리
    - 완료 후 중단된 렌더링 재개
    
    **주요 기능:**
    
    **1. 자동 배치(Automatic Batching)**
    ```jsx
    // React 18 이전
    // 이벤트 핸들러 내부의 상태 업데이트는 배치 처리됨
    function handleClick() {
      setCount(c => c + 1); // 렌더링 발생 안 함
      setFlag(f => !f);     // 렌더링 발생 안 함
      // 여기서 한 번만 렌더링 발생
    }
    
    // 하지만 비동기 콜백에서는 배치 처리되지 않음
    setTimeout(() => {
      setCount(c => c + 1); // 렌더링 발생
      setFlag(f => !f);     // 또 렌더링 발생
    }, 1000);
    
    // React 18 이후
    // 모든 상태 업데이트가 자동으로 배치 처리됨
    setTimeout(() => {
      setCount(c => c + 1); // 렌더링 발생 안 함
      setFlag(f => !f);     // 렌더링 발생 안 함
      // 여기서 한 번만 렌더링 발생
    }, 1000);
    ```
    
    **2. Transitions API**
    ```jsx
    import { useState, useTransition } from 'react';
    
    function SearchResults() {
      const [query, setQuery] = useState('');
      const [results, setResults] = useState([]);
      const [isPending, startTransition] = useTransition();
      
      function handleChange(e) {
        // 긴급 업데이트: 입력 필드는 즉시 업데이트
        setQuery(e.target.value);
        
        // 전환 업데이트: 검색 결과는 낮은 우선순위로 업데이트
        startTransition(() => {
          // 무거운 계산이나 데이터 가져오기
          const searchResults = searchDatabase(e.target.value);
          setResults(searchResults);
        });
      }
      
      return (
        <div>
          <input value={query} onChange={handleChange} />
          
          {isPending ? (
            <div>결과 로딩 중...</div>
          ) : (
            <ResultsList results={results} />
          )}
        </div>
      );
    }
    ```
    
    **3. Suspense for Data Fetching**
    ```jsx
    import { Suspense } from 'react';
    
    // 데이터 가져오기를 위한 래퍼 컴포넌트
    function ProfilePage() {
      return (
        <Suspense fallback={<h1>사용자 정보 로딩 중...</h1>}>
          <ProfileDetails />
          <Suspense fallback={<h2>게시물 로딩 중...</h2>}>
            <ProfilePosts />
          </Suspense>
        </Suspense>
      );
    }
    
    // 데이터를 가져오는 컴포넌트
    function ProfileDetails() {
      // 이 컴포넌트는 데이터가 준비될 때까지 "일시 중단"됨
      const user = fetchUser();
      return <h1>{user.name}</h1>;
    }
    
    function ProfilePosts() {
      // 이 컴포넌트도 데이터가 준비될 때까지 "일시 중단"됨
      const posts = fetchPosts();
      return (
        <ul>
          {posts.map(post => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      );
    }
    ```
    
    **4. useDeferredValue**
    ```jsx
    import { useState, useDeferredValue } from 'react';
    
    function SearchPage() {
      const [query, setQuery] = useState('');
      // 지연된 값: 우선순위가 낮은 업데이트에 사용
      const deferredQuery = useDeferredValue(query);
      
      // 입력은 즉시 업데이트되지만, 결과 목록은 지연된 값 사용
      return (
        <div>
          <input value={query} onChange={e => setQuery(e.target.value)} />
          <SearchResults query={deferredQuery} />
        </div>
      );
    }
    
    function SearchResults({ query }) {
      // query가 변경될 때마다 무거운 계산 수행
      const results = computeExpensiveResults(query);
      
      return (
        <ul>
          {results.map(result => (
            <li key={result.id}>{result.title}</li>
          ))}
        </ul>
      );
    }
    ```
    
    **Concurrent Mode의 이점:**
    
    1. **향상된 사용자 경험**
       - 사용자 입력에 즉시 응답하면서 무거운 렌더링 작업 처리
       - 입력 지연이나 UI 버벅임 감소
    
    2. **더 나은 로딩 상태 처리**
       - Suspense를 통한 선언적 로딩 상태 관리
       - 로딩 상태를 UI 계층 구조에 맞게 배치 가능
    
    3. **불필요한 로딩 상태 방지**
       - 빠르게 완료되는 업데이트는 로딩 상태 표시 없이 처리
       - "로딩 상태 깜빡임" 현상 감소
    
    4. **네트워크 워터폴 방지**
       - 여러 데이터 의존성을 병렬로 로드 가능
       - 컴포넌트 트리 전체를 한 번에 렌더링
    
    **사용 방법:**
    
    React 18에서는 `createRoot`를 사용하여 Concurrent Mode 기능 활성화:
    
    ```jsx
    // React 17 이전
    import ReactDOM from 'react-dom';
    ReactDOM.render(<App />, document.getElementById('root'));
    
    // React 18 이후
    import { createRoot } from 'react-dom/client';
    const root = createRoot(document.getElementById('root'));
    root.render(<App />);
    ```
    
    **주의사항:**
    
    - 기존 코드가 중단 가능한 렌더링을 고려하지 않았다면 예상치 못한 동작 발생 가능
    - 부수 효과(side effects)가 여러 번 실행될 수 있음을 고려해야 함
    - 렌더링 함수는 순수해야 하며 부수 효과가 없어야 함
    - 모든 애플리케이션에 Concurrent Mode가 필요한 것은 아님

21. **React 18의 주요 변경 사항은 무엇인가요?**
    - 새로운 기능과 이전 버전과의 차이점을 설명해주세요.
    
    **답변:**
    React 18은 2022년 3월에 출시된 메이저 버전으로, Concurrent Rendering을 기반으로 한 여러 새로운 기능과 개선 사항을 도입했습니다.
    
    **주요 변경 사항:**
    
    **1. 새로운 루트 API**
    ```jsx
    // React 17 이전
    import ReactDOM from 'react-dom';
    ReactDOM.render(<App />, document.getElementById('root'));
    
    // React 18
    import { createRoot } from 'react-dom/client';
    const root = createRoot(document.getElementById('root'));
    root.render(<App />);
    ```
    
    **2. 자동 배치(Automatic Batching)**
    ```jsx
    // React 18 이전: 이벤트 핸들러 내에서만 배치 처리
    function handleClick() {
      setCount(c => c + 1);
      setFlag(f => !f);
      // 한 번만 렌더링
    }
    
    // React 18 이전: Promise, setTimeout, 네이티브 이벤트 핸들러 등에서는 배치 처리 안 됨
    setTimeout(() => {
      setCount(c => c + 1); // 렌더링 발생
      setFlag(f => !f);     // 또 렌더링 발생
    }, 1000);
    
    // React 18: 모든 상태 업데이트가 자동으로 배치 처리됨
    setTimeout(() => {
      setCount(c => c + 1);
      setFlag(f => !f);
      // 한 번만 렌더링
    }, 1000);
    
    // 배치 처리를 원하지 않는 경우
    import { flushSync } from 'react-dom';
    
    function handleClick() {
      flushSync(() => {
        setCounter(c => c + 1); // 즉시 렌더링
      });
      
      flushSync(() => {
        setFlag(f => !f); // 즉시 렌더링
      });
    }
    ```
    
    **3. Transitions API**
    ```jsx
    import { startTransition, useTransition } from 'react';
    
    // 독립 함수 버전
    function handleClick() {
      // 긴급 업데이트
      setInputValue(input);
      
      // 전환 업데이트 (낮은 우선순위)
      startTransition(() => {
        setSearchQuery(input);
      });
    }
    
    // Hook 버전
    function SearchBar() {
      const [inputValue, setInputValue] = useState('');
      const [searchQuery, setSearchQuery] = useState('');
      const [isPending, startTransition] = useTransition();
      
      function handleChange(e) {
        const input = e.target.value;
        setInputValue(input);
        
        startTransition(() => {
          setSearchQuery(input);
        });
      }
      
      return (
        <>
          <input value={inputValue} onChange={handleChange} />
          {isPending && <Spinner />}
          <SearchResults query={searchQuery} />
        </>
      );
    }
    ```
    
    **4. Suspense 개선**
    ```jsx
    import { Suspense } from 'react';
    
    function App() {
      return (
        <Suspense fallback={<Loading />}>
          <Comments />
        </Suspense>
      );
    }
    
    // React 18에서는 Suspense 경계에서의 상태 업데이트가 개선됨
    // 1. 트리 내부의 컴포넌트가 일시 중단되면 이미 표시된 콘텐츠가 숨겨지지 않음
    // 2. 트리가 다시 표시되면 이전에 입력한 텍스트와 선택 상태 등이 유지됨
    ```
    
    **5. 새로운 Hooks**
    
    **useId**: 클라이언트와 서버 간에 안정적인 고유 ID 생성
    ```jsx
    function NameFields() {
      const id = useId();
      return (
        <div>
          <label htmlFor={`${id}-firstName`}>이름:</label>
          <input id={`${id}-firstName`} />
          <label htmlFor={`${id}-lastName`}>성:</label>
          <input id={`${id}-lastName`} />
        </div>
      );
    }
    ```
    
    **useDeferredValue**: 값의 "지연된" 버전 생성
    ```jsx
    const deferredQuery = useDeferredValue(query);
    ```
    
    **useSyncExternalStore**: 외부 스토어와의 동기화를 위한 Hook
    ```jsx
    import { useSyncExternalStore } from 'react';
    
    function subscribe(callback) {
      window.addEventListener('online', callback);
      window.addEventListener('offline', callback);
      return () => {
        window.removeEventListener('online', callback);
        window.removeEventListener('offline', callback);
      };
    }
    
    function useOnlineStatus() {
      return useSyncExternalStore(
        subscribe,
        () => navigator.onLine, // 클라이언트 상태 가져오기
        () => true             // 서버 상태 가져오기
      );
    }
    
    function App() {
      const isOnline = useOnlineStatus();
      return <div>{isOnline ? '온라인' : '오프라인'}</div>;
    }
    ```
    
    **useInsertionEffect**: CSS-in-JS 라이브러리를 위한 특수 Hook
    ```jsx
    import { useInsertionEffect } from 'react';
    
    // CSS-in-JS 라이브러리 내부에서 사용
    function useCSS(rule) {
      useInsertionEffect(() => {
        // DOM 변경 전에 실행됨
        // 스타일 삽입에 적합
        document.head.appendChild(styleSheet);
        return () => document.head.removeChild(styleSheet);
      });
      
      return className;
    }
    ```
    
    **6. 서버 컴포넌트 (아직 실험적 기능)**
    - 서버에서만 실행되는 컴포넌트 작성 가능
    - 클라이언트 번들 크기 감소
    - 서버 리소스 직접 접근 가능
    - 자동 코드 분할
    
    **7. 스트리밍 SSR**
    ```jsx
    // 서버 코드
    import { renderToPipeableStream } from 'react-dom/server';
    
    app.get('/', (req, res) => {
      const { pipe } = renderToPipeableStream(<App />, {
        bootstrapScripts: ['/client.js'],
        onShellReady() {
          // HTML의 초기 부분이 준비되면 스트리밍 시작
          res.setHeader('content-type', 'text/html');
          pipe(res);
        }
      });
    });
    
    // 클라이언트 코드
    import { hydrateRoot } from 'react-dom/client';
    
    hydrateRoot(document.getElementById('root'), <App />);
    ```
    
    **8. 엄격 모드 개선**
    - 개발 모드에서 컴포넌트 효과를 두 번 실행하여 정리(cleanup) 문제 감지
    - 미래의 React 기능과의 호환성 검사
    
    **9. 새로운 엄격 모드 전용 개발 기능**
    ```jsx
    import { StrictMode } from 'react';
    
    function App() {
      return (
        <StrictMode>
          <Main />
        </StrictMode>
      );
    }
    ```
    
    **10. 새로운 JSX 변환**
    - React 17에서 도입되었지만 React 18에서 더 많은 개선
    - JSX를 사용할 때 React를 명시적으로 가져올 필요 없음
    
    ```jsx
    // 이전
    import React from 'react';
    
    function App() {
      return <h1>Hello World</h1>;
    }
    
    // 새로운 변환
    // React 가져오기가 필요 없음
    function App() {
      return <h1>Hello World</h1>;
    }
    ```
    
    **이전 버전과의 주요 차이점:**
    
    1. **렌더링 모델**: 동기식 렌더링에서 동시성 렌더링으로 전환
    2. **배치 처리**: 제한적 배치에서 자동 배치로 확장
    3. **우선순위**: 모든 업데이트가 동일한 우선순위에서 우선순위 기반 업데이트로 변경
    4. **SSR**: 단일 패스 렌더링에서 스트리밍 및 선택적 하이드레이션으로 개선
    5. **상태 관리**: 외부 스토어와의 통합을 위한 공식 API 제공
    
    **마이그레이션 고려사항:**
    
    - 대부분의 애플리케이션은 최소한의 변경으로 업그레이드 가능
    - 자동 배치로 인한 렌더링 동작 변경 확인 필요
    - 중단 가능한 렌더링으로 인한 부수 효과 처리 방식 검토
    - 타사 라이브러리 호환성 확인
    - 점진적으로 Concurrent 기능 도입 가능
