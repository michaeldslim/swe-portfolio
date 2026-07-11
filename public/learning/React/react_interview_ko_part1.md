# React 개발자 인터뷰 질문 - Part 1

## 기본 개념

1. **React란 무엇이며 어떤 특징이 있나요?**
   - React의 주요 장점은 무엇인가요?
   
   **답변:**
   React는 Facebook에서 개발한 UI 라이브러리로, 컴포넌트 기반 아키텍처를 사용하여 사용자 인터페이스를 구축합니다. 주요 특징은 다음과 같습니다:
   
   - **컴포넌트 기반**: UI를 독립적이고 재사용 가능한 조각으로 분리
   - **가상 DOM(Virtual DOM)**: 실제 DOM 조작을 최소화하여 성능 최적화
   - **단방향 데이터 흐름**: 예측 가능한 데이터 흐름으로 디버깅 용이
   - **JSX**: JavaScript 내에서 HTML과 유사한 구문 사용 가능
   - **선언적 프로그래밍**: UI가 어떻게 보여야 하는지 선언적으로 정의
   
   주요 장점:
   - 높은 성능과 렌더링 효율성
   - 재사용 가능한 컴포넌트로 개발 속도 향상
   - 대규모 커뮤니티와 풍부한 생태계
   - 다른 라이브러리/프레임워크와 쉽게 통합 가능

2. **가상 DOM(Virtual DOM)이란 무엇이며 어떻게 작동하나요?**
   - 실제 DOM과 가상 DOM의 차이점은 무엇인가요?
   
   **답변:**
   가상 DOM은 실제 DOM의 가벼운 복사본으로, 메모리에 존재하는 JavaScript 객체입니다. React는 상태 변경 시 다음과 같은 과정으로 작동합니다:
   
   1. 상태가 변경되면 React는 새로운 가상 DOM 트리를 생성합니다.
   2. 이전 가상 DOM과 새로운 가상 DOM을 비교(Diffing)합니다.
   3. 변경된 부분만 계산하여 실제 DOM에 최소한의 변경사항만 적용(Reconciliation)합니다.
   
   **실제 DOM과 가상 DOM의 차이점:**
   - 실제 DOM은 브라우저에서 렌더링되는 실제 요소이며, 조작 비용이 큽니다.
   - 가상 DOM은 메모리 내 JavaScript 객체로, 조작 비용이 적습니다.
   - 실제 DOM 조작은 리플로우(reflow)와 리페인트(repaint) 과정을 유발하여 성능에 영향을 미치지만, 가상 DOM은 이 과정 없이 빠르게 연산이 가능합니다.
   
   ```javascript
   // 가상 DOM 객체의 예시 (단순화됨)
   const virtualDOMElement = {
     type: 'div',
     props: {
       className: 'container',
       children: [
         { type: 'h1', props: { children: '제목' } },
         { type: 'p', props: { children: '내용' } }
       ]
     }
   };
   ```

3. **JSX란 무엇이며 왜 사용하나요?**
   - JSX 없이 React를 사용할 수 있나요?
   
   **답변:**
   JSX(JavaScript XML)는 JavaScript 내에서 HTML과 유사한 구문을 사용할 수 있게 해주는 JavaScript의 확장 문법입니다. React에서 UI 구조를 직관적으로 표현하기 위해 사용됩니다.
   
   **JSX 사용 이유:**
   - UI 구조와 로직을 함께 표현할 수 있어 가독성이 향상됩니다.
   - HTML과 유사하여 UI 개발자가 쉽게 적응할 수 있습니다.
   - 컴파일 시 문법 오류를 감지할 수 있어 안전합니다.
   - React 엘리먼트를 더 쉽게 생성할 수 있습니다.
   
   **JSX 없이 React 사용하기:**
   JSX 없이도 `React.createElement()` 메서드를 사용하여 React를 사용할 수 있습니다.
   
   ```javascript
   // JSX 사용
   const element = (
     <div className="container">
       <h1>안녕하세요</h1>
       <p>JSX 예제입니다.</p>
     </div>
   );
   
   // JSX 없이 React.createElement 사용
   const element = React.createElement(
     'div',
     { className: 'container' },
     React.createElement('h1', null, '안녕하세요'),
     React.createElement('p', null, 'JSX 예제입니다.')
   );
   ```

4. **React 컴포넌트란 무엇이며 어떤 종류가 있나요?**
   - 함수형 컴포넌트와 클래스형 컴포넌트의 차이점은 무엇인가요?
   
   **답변:**
   React 컴포넌트는 UI를 구성하는 독립적이고 재사용 가능한 조각으로, 자체 로직과 UI를 가집니다. 주요 종류는 함수형 컴포넌트와 클래스형 컴포넌트가 있습니다.
   
   **함수형 컴포넌트:**
   ```javascript
   function Welcome(props) {
     return <h1>안녕하세요, {props.name}님!</h1>;
   }
   ```
   
   **클래스형 컴포넌트:**
   ```javascript
   class Welcome extends React.Component {
     render() {
       return <h1>안녕하세요, {this.props.name}님!</h1>;
     }
   }
   ```
   
   **차이점:**
   - **문법**: 함수형은 일반 JavaScript 함수, 클래스형은 ES6 클래스를 확장
   - **상태 관리**: 함수형은 Hooks 사용, 클래스형은 this.state 사용
   - **생명주기**: 함수형은 useEffect 등의 Hook으로 처리, 클래스형은 생명주기 메서드 사용
   - **this 키워드**: 함수형은 this 사용하지 않음, 클래스형은 this 사용
   - **성능**: 함수형이 일반적으로 더 간결하고 최적화하기 쉬움
   
   현재 React에서는 함수형 컴포넌트와 Hooks 사용을 권장합니다.

5. **Props와 State의 차이점은 무엇인가요?**
   - 언제 Props를 사용하고 언제 State를 사용해야 하나요?
   
   **답변:**
   Props와 State는 모두 React 컴포넌트에서 데이터를 관리하는 방법이지만 목적과 사용법이 다릅니다.
   
   **Props (Properties):**
   - 부모 컴포넌트에서 자식 컴포넌트로 데이터를 전달하는 방법
   - 읽기 전용(immutable)이며 컴포넌트 내부에서 변경할 수 없음
   - 컴포넌트의 구성과 동작을 정의하는 데 사용
   
   **State:**
   - 컴포넌트 내부에서 관리되는 데이터
   - 변경 가능(mutable)하며 setState() 또는 useState() Hook을 통해 업데이트
   - 사용자 상호작용, 네트워크 응답 등에 따라 시간이 지남에 따라 변경되는 데이터에 사용
   
   **사용 시기:**
   - **Props**: 컴포넌트 간 데이터 전달, 컴포넌트 구성 및 사용자 정의에 사용
   - **State**: 컴포넌트 내부에서 변경되는 데이터, 사용자 입력 처리, UI 상태 관리에 사용
   
   ```javascript
   // Props 예시
   function Welcome(props) {
     return <h1>안녕하세요, {props.name}님!</h1>;
   }
   
   // 사용
   <Welcome name="홍길동" />
   
   // State 예시 (함수형 컴포넌트)
   function Counter() {
     const [count, setCount] = useState(0);
     
     return (
       <div>
         <p>현재 카운트: {count}</p>
         <button onClick={() => setCount(count + 1)}>증가</button>
       </div>
     );
   }
   ```

6. **React의 생명주기(Lifecycle)에 대해 설명해주세요.**
   - 함수형 컴포넌트에서는 생명주기를 어떻게 처리하나요?
   
   **답변:**
   React 컴포넌트의 생명주기는 컴포넌트가 생성되고, 업데이트되고, 제거되는 과정을 말합니다.
   
   **클래스형 컴포넌트 생명주기:**
   1. **마운팅(Mounting)**: 컴포넌트가 DOM에 삽입될 때
      - constructor()
      - static getDerivedStateFromProps()
      - render()
      - componentDidMount()
   
   2. **업데이트(Updating)**: props나 state가 변경될 때
      - static getDerivedStateFromProps()
      - shouldComponentUpdate()
      - render()
      - getSnapshotBeforeUpdate()
      - componentDidUpdate()
   
   3. **언마운팅(Unmounting)**: 컴포넌트가 DOM에서 제거될 때
      - componentWillUnmount()
   
   **함수형 컴포넌트에서의 생명주기 처리:**
   함수형 컴포넌트는 Hooks를 사용하여 생명주기 기능을 구현합니다.
   
   ```javascript
   import React, { useState, useEffect } from 'react';
   
   function ExampleComponent() {
     const [data, setData] = useState(null);
     
     // componentDidMount + componentDidUpdate
     useEffect(() => {
       console.log('컴포넌트가 마운트되거나 업데이트됨');
       
       // 데이터 가져오기
       fetchData().then(result => setData(result));
       
       // componentWillUnmount (정리 함수)
       return () => {
         console.log('컴포넌트가 언마운트됨');
         // 정리 작업 수행 (이벤트 리스너 제거, 타이머 정리 등)
       };
     }, []); // 빈 배열은 마운트와 언마운트 시에만 실행
     
     // 특정 값이 변경될 때만 실행
     useEffect(() => {
       console.log('data가 변경됨:', data);
     }, [data]);
     
     return <div>{data ? data.toString() : '로딩 중...'}</div>;
   }
   ```

7. **React Hooks란 무엇이며 어떤 종류가 있나요?**
   - 커스텀 Hook을 만드는 방법과 사용 사례를 설명해주세요.
   
   **답변:**
   React Hooks는 함수형 컴포넌트에서 상태 관리와 생명주기 기능을 사용할 수 있게 해주는 기능입니다. React 16.8에서 도입되었습니다.
   
   **주요 내장 Hooks:**
   - **useState**: 상태 관리
   - **useEffect**: 부수 효과 처리 (생명주기 이벤트)
   - **useContext**: Context API 사용
   - **useReducer**: 복잡한 상태 로직 처리
   - **useCallback**: 함수 메모이제이션
   - **useMemo**: 값 메모이제이션
   - **useRef**: DOM 요소 참조 또는 변경 가능한 값 저장
   - **useLayoutEffect**: DOM 변경 후 동기적으로 실행되는 효과
   - **useImperativeHandle**: 부모 컴포넌트에 노출할 인스턴스 값 사용자 정의
   - **useDebugValue**: 개발자 도구에서 디버깅 정보 표시
   
   **커스텀 Hook 만들기:**
   커스텀 Hook은 `use`로 시작하는 함수로, 다른 Hooks를 사용하여 로직을 재사용할 수 있게 합니다.
   
   ```javascript
   // 윈도우 크기를 추적하는 커스텀 Hook
   function useWindowSize() {
     const [windowSize, setWindowSize] = useState({
       width: window.innerWidth,
       height: window.innerHeight
     });
     
     useEffect(() => {
       const handleResize = () => {
         setWindowSize({
           width: window.innerWidth,
           height: window.innerHeight
         });
       };
       
       window.addEventListener('resize', handleResize);
       
       // 정리 함수
       return () => {
         window.removeEventListener('resize', handleResize);
       };
     }, []); // 마운트와 언마운트 시에만 실행
     
     return windowSize;
   }
   
   // 사용 예시
   function ResponsiveComponent() {
     const { width, height } = useWindowSize();
     
     return (
       <div>
         <p>현재 창 크기: {width} x {height}</p>
         {width < 768 ? <MobileView /> : <DesktopView />}
       </div>
     );
   }
   ```

8. **React에서 상태 관리는 어떻게 하나요?**
   - Redux, Context API 등 다양한 상태 관리 방법의 차이점과 사용 사례를 설명해주세요.
   
   **답변:**
   React에서 상태 관리는 컴포넌트의 복잡성과 애플리케이션 규모에 따라 다양한 방법을 사용할 수 있습니다.
   
   **1. 컴포넌트 내부 상태 (useState, useReducer)**
   - 간단한 상태 관리에 적합
   - 컴포넌트 내부에서만 사용되는 상태에 적합
   
   ```javascript
   function Counter() {
     const [count, setCount] = useState(0);
     return (
       <div>
         <p>카운트: {count}</p>
         <button onClick={() => setCount(count + 1)}>증가</button>
       </div>
     );
   }
   ```
   
   **2. Context API**
   - 중간 규모의 상태 관리에 적합
   - Props drilling 문제 해결
   - 전역 상태를 여러 컴포넌트에서 공유할 때 유용
   
   ```javascript
   // 컨텍스트 생성
   const ThemeContext = React.createContext('light');
   
   // 제공자 컴포넌트
   function App() {
     const [theme, setTheme] = useState('light');
     
     return (
       <ThemeContext.Provider value={{ theme, setTheme }}>
         <MainContent />
       </ThemeContext.Provider>
     );
   }
   
   // 소비자 컴포넌트
   function ThemedButton() {
     const { theme, setTheme } = useContext(ThemeContext);
     
     return (
       <button
         style={{ background: theme === 'light' ? '#fff' : '#333', color: theme === 'light' ? '#333' : '#fff' }}
         onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
       >
         테마 전환
       </button>
     );
   }
   ```
   
   **3. Redux**
   - 대규모 애플리케이션의 상태 관리에 적합
   - 예측 가능한 상태 관리
   - 개발자 도구 및 미들웨어 지원
   - 복잡한 상태 로직 처리에 유용
   
   ```javascript
   // 액션 타입
   const INCREMENT = 'INCREMENT';
   
   // 액션 생성자
   const increment = () => ({ type: INCREMENT });
   
   // 리듀서
   const counterReducer = (state = { count: 0 }, action) => {
     switch (action.type) {
       case INCREMENT:
         return { ...state, count: state.count + 1 };
       default:
         return state;
     }
   };
   
   // 스토어
   const store = createStore(counterReducer);
   
   // 컴포넌트에서 사용
   function Counter() {
     const count = useSelector(state => state.count);
     const dispatch = useDispatch();
     
     return (
       <div>
         <p>카운트: {count}</p>
         <button onClick={() => dispatch(increment())}>증가</button>
       </div>
     );
   }
   ```
   
   **4. MobX**
   - 반응형 프로그래밍 방식의 상태 관리
   - 적은 보일러플레이트 코드
   - 객체 지향적 접근 방식
   
   **5. Recoil**
   - Facebook에서 개발한 상태 관리 라이브러리
   - React에 최적화된 API
   - 비동기 상태 관리에 강점
   
   **선택 기준:**
   - 애플리케이션 규모와 복잡성
   - 팀의 친숙도
   - 성능 요구사항
   - 개발 생산성
   - 유지보수성

9. **React에서 성능 최적화는 어떻게 하나요?**
   - 렌더링 최적화 방법에 대해 설명해주세요.
   
   **답변:**
   React 애플리케이션의 성능 최적화는 불필요한 렌더링을 줄이고, 렌더링 성능을 향상시키는 것이 핵심입니다.
   
   **주요 최적화 방법:**
   
   **1. 메모이제이션 사용**
   - **React.memo**: 컴포넌트 메모이제이션
   - **useMemo**: 값 메모이제이션
   - **useCallback**: 함수 메모이제이션
   
   ```javascript
   // React.memo 사용
   const MemoizedComponent = React.memo(function MyComponent(props) {
     // 렌더링 로직
     return <div>{props.name}</div>;
   });
   
   // useMemo 사용
   function ExpensiveCalculation({ a, b }) {
     const result = useMemo(() => {
       console.log('계산 중...');
       return a * b * 1000; // 비용이 많이 드는 계산
     }, [a, b]); // a나 b가 변경될 때만 재계산
     
     return <div>결과: {result}</div>;
   }
   
   // useCallback 사용
   function Parent() {
     const [count, setCount] = useState(0);
     
     const handleClick = useCallback(() => {
       console.log('클릭됨');
     }, []); // 의존성 배열이 비어있으므로 함수는 한 번만 생성됨
     
     return (
       <div>
         <p>카운트: {count}</p>
         <button onClick={() => setCount(count + 1)}>증가</button>
         <ChildComponent onClick={handleClick} />
       </div>
     );
   }
   ```
   
   **2. 가상화(Virtualization) 사용**
   - 대량의 데이터를 표시할 때 react-window나 react-virtualized 같은 라이브러리 사용
   - 화면에 보이는 항목만 렌더링하여 성능 향상
   
   ```javascript
   import { FixedSizeList } from 'react-window';
   
   function VirtualizedList({ items }) {
     const Row = ({ index, style }) => (
       <div style={style}>
         항목 {index}: {items[index]}
       </div>
     );
     
     return (
       <FixedSizeList
         height={500}
         width={300}
         itemCount={items.length}
         itemSize={35}
       >
         {Row}
       </FixedSizeList>
     );
   }
   ```
   
   **3. 코드 분할(Code Splitting)**
   - React.lazy와 Suspense를 사용한 동적 임포트
   - 필요한 시점에 코드를 로드하여 초기 로딩 시간 단축
   
   ```javascript
   import React, { Suspense, lazy } from 'react';
   
   // 동적 임포트
   const HeavyComponent = lazy(() => import('./HeavyComponent'));
   
   function App() {
     return (
       <div>
         <Suspense fallback={<div>로딩 중...</div>}>
           <HeavyComponent />
         </Suspense>
       </div>
     );
   }
   ```
   
   **4. 불변성(Immutability) 유지**
   - 상태 업데이트 시 불변성을 유지하여 변경 감지 최적화
   - Immer 같은 라이브러리 활용
   
   ```javascript
   // 잘못된 방법 (불변성 위반)
   const handleClick = () => {
     const newItems = items;
     newItems.push('새 항목');
     setItems(newItems); // 참조가 같아 React가 변경을 감지하지 못함
   };
   
   // 올바른 방법 (불변성 유지)
   const handleClick = () => {
     setItems([...items, '새 항목']); // 새 배열 생성
   };
   ```
   
   **5. 상태 정규화**
   - 중첩된 상태 구조 대신 정규화된 상태 구조 사용
   - 불필요한 렌더링 방지 및 상태 업데이트 최적화
   
   **6. 렌더링 최적화 도구 사용**
   - React DevTools Profiler를 사용한 성능 분석
   - why-did-you-render 같은 라이브러리로 불필요한 렌더링 감지

10. **React Router에 대해 설명해주세요.**
    - 클라이언트 사이드 라우팅이란 무엇이며 어떤 장점이 있나요?
    
    **답변:**
    React Router는 React 애플리케이션에서 클라이언트 사이드 라우팅을 구현하기 위한 라이브러리입니다. 페이지 간 이동을 관리하고 URL을 컴포넌트에 매핑합니다.
    
    **주요 기능:**
    - 선언적 라우팅 정의
    - 중첩 라우팅 지원
    - 동적 라우팅 매개변수
    - 라우팅 보호 및 리디렉션
    - 히스토리 관리
    
    ```javascript
    import { BrowserRouter, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
    
    function App() {
      return (
        <BrowserRouter>
          <nav>
            <Link to="/">홈</Link>
            <Link to="/about">소개</Link>
            <Link to="/users">사용자 목록</Link>
          </nav>
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/users/:id" element={<UserDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      );
    }
    
    // 동적 라우팅 매개변수 사용
    function UserDetail() {
      const { id } = useParams();
      const navigate = useNavigate();
      
      return (
        <div>
          <h2>사용자 {id} 상세 정보</h2>
          <button onClick={() => navigate('/users')}>목록으로 돌아가기</button>
        </div>
      );
    }
    ```
    
    **클라이언트 사이드 라우팅:**
    클라이언트 사이드 라우팅은 서버에 새 페이지를 요청하지 않고 JavaScript를 사용하여 브라우저에서 페이지 전환을 처리하는 방식입니다.
    
    **장점:**
    - 더 빠른 페이지 전환 (서버 요청 없음)
    - 부드러운 사용자 경험 (페이지 새로고침 없음)
    - 상태 유지 (페이지 간 이동 시 애플리케이션 상태 보존)
    - 서버 부하 감소
    - SPA(Single Page Application) 구현 가능
    
    **단점:**
    - 초기 로딩 시간이 길어질 수 있음 (전체 JavaScript 로드 필요)
    - SEO 최적화가 더 복잡할 수 있음 (서버 사이드 렌더링으로 해결 가능)
    - 브라우저 히스토리 관리가 필요함

11. **React에서 state는 mutable(직접 수정 가능)한가요?**
    - 왜 state를 직접 수정하면 안 되나요?
    
    **답변:**
    결론부터 말하면, React에서 state는 문법적으로는 "직접 수정이 가능해 보이지만", **실제로는 직접 바꾸면 안 되는 값(불변하게 다뤄야 하는 값)** 으로 이해하는 것이 안전합니다.
    
    **왜 직접 수정하면 안 되나요?**
    React는 성능 최적화를 위해 **"참조(주소)가 바뀌었는지"를 기준으로 변경 여부를 감지**하는 경우가 많습니다. 그래서 state 객체나 배열을 그 자리에서 수정(mutating)하면 참조는 그대로이기 때문에 다음과 같은 문제가 생길 수 있습니다.
    - 리렌더링이 일어나지 않거나
    - 이전 state와의 비교 로직이 깨지거나
    - 예기치 못한 버그가 발생하기 쉽습니다.
    
    **잘못된 예 (mutating)**
    ```tsx
    // 잘못된 패턴: 기존 state를 직접 변경
    state.count += 1;      // 직접 수정
    state.items.push(x);   // 직접 수정
    setState(state);       // 같은 객체 참조를 다시 넣음 (참조 불변)
    ```
    
    위처럼 같은 객체를 직접 바꾸고 다시 `setState(state)`를 호출하면, 참조가 바뀌지 않았다고 판단하여 React가 변경을 감지하지 못할 수 있습니다.
    
    **올바른 예 (새 객체/배열 생성)**
    ```tsx
    // 원시 값 숫자 카운트 업데이트
    setCount((c) => c + 1);
    
    // 객체 state 업데이트: 스프레드로 새 객체 생성
    setState((prev) => ({
      ...prev,
      count: prev.count + 1,
    }));
    
    // 배열 state 업데이트: push 대신 새 배열 생성
    setItems((prev) => [...prev, x]);
    ```
    
    위처럼 **항상 새 객체/배열을 만들어서 참조를 바꾸는 것**이 핵심입니다.
    
    **한 줄 요약**
    - **원시값 (number / string / boolean)**: `setState` 혹은 `setXxx`로 **새 값**을 넣어주면 됨
    - **객체 / 배열**: 기존 값을 **직접 수정하지 말고**,
      - 스프레드 연산자(`...`),
      - `map` / `filter` 같은 불변 연산,
      - 또는 **Immer** 같은 라이브러리를 사용해 **새 참조를 생성**해서 업데이트해야 함
    
    이렇게 state를 불변하게 다루면 React의 변경 감지 로직과 성능 최적화가 잘 동작하고, 예측 가능한 상태 관리가 가능해집니다.
