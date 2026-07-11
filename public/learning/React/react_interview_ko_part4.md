# React 개발자 인터뷰 질문 - Part 4

## 고급 개념 (계속)

18. **React.memo와 useMemo, useCallback의 차이점은?**
    - 각각 언제 사용해야 하는지 설명해주세요.
    
    **답변:**
    React.memo, useMemo, useCallback은 모두 React 애플리케이션의 성능을 최적화하기 위한 도구이지만, 각각 다른 용도로 사용됩니다.
    
    **1. React.memo**
    - 고차 컴포넌트(HOC)로, 컴포넌트 자체를 메모이제이션
    - props가 변경되지 않으면 리렌더링을 방지
    - 컴포넌트 렌더링 결과를 메모리에 저장
    
    ```jsx
    // 기본 사용법
    const MyComponent = React.memo(function MyComponent(props) {
      // 컴포넌트 로직
      return (
        <div>
          <h2>{props.name}</h2>
          <p>{props.description}</p>
        </div>
      );
    });
    
    // 커스텀 비교 함수 사용
    const areEqual = (prevProps, nextProps) => {
      // true를 반환하면 리렌더링하지 않음
      // false를 반환하면 리렌더링함
      return prevProps.id === nextProps.id;
    };
    
    const MemoizedComponent = React.memo(MyComponent, areEqual);
    ```
    
    **사용 시기:**
    - 동일한 props로 자주 리렌더링되는 컴포넌트
    - 렌더링 비용이 큰 컴포넌트
    - 부모 컴포넌트가 자주 리렌더링되지만 자식 컴포넌트의 props는 자주 변경되지 않는 경우
    
    **2. useMemo**
    - 계산 비용이 큰 값을 메모이제이션하는 Hook
    - 지정된 의존성이 변경될 때만 값을 재계산
    - 렌더링 중에 계산되는 값을 최적화
    
    ```jsx
    function ExpensiveCalculation({ a, b, c }) {
      // 의존성 배열 [a, b]의 값이 변경될 때만 계산 실행
      const expensiveValue = useMemo(() => {
        console.log('복잡한 계산 실행...');
        // 계산 비용이 큰 연산
        return computeExpensiveValue(a, b);
      }, [a, b]);
      
      return (
        <div>
          <p>계산 결과: {expensiveValue}</p>
          <p>다른 prop: {c}</p>
        </div>
      );
    }
    ```
    
    **사용 시기:**
    - 계산 비용이 큰 연산 결과 캐싱
    - 객체 참조 동일성 유지가 필요한 경우
    - 하위 컴포넌트의 props로 전달되는 객체 생성 시
    
    **3. useCallback**
    - 함수 인스턴스를 메모이제이션하는 Hook
    - 지정된 의존성이 변경될 때만 함수를 재생성
    - 함수의 참조 동일성 유지
    
    ```jsx
    function ParentComponent() {
      const [count, setCount] = useState(0);
      const [text, setText] = useState('');
      
      // text가 변경될 때만 함수 재생성
      const handleTextChange = useCallback((e) => {
        setText(e.target.value);
        console.log(`텍스트 변경: ${e.target.value}`);
      }, []);
      
      // count가 변경될 때만 함수 재생성
      const handleIncrement = useCallback(() => {
        setCount(c => c + 1);
        console.log('카운트 증가');
      }, []);
      
      return (
        <div>
          <p>카운트: {count}</p>
          <button onClick={handleIncrement}>증가</button>
          
          <ChildComponent 
            text={text} 
            onTextChange={handleTextChange} 
          />
        </div>
      );
    }
    
    // React.memo로 최적화된 자식 컴포넌트
    const ChildComponent = React.memo(function ChildComponent({ text, onTextChange }) {
      console.log('ChildComponent 렌더링');
      
      return (
        <input 
          type="text" 
          value={text} 
          onChange={onTextChange} 
        />
      );
    });
    ```
    
    **사용 시기:**
    - 이벤트 핸들러 함수를 자식 컴포넌트에 props로 전달할 때
    - 의존성 배열에 함수를 포함시켜야 하는 useEffect 내에서 사용할 함수
    - React.memo로 최적화된 컴포넌트에 콜백 함수를 전달할 때
    
    **주요 차이점:**
    
    | 특성 | React.memo | useMemo | useCallback |
    |------|-----------|---------|------------|
    | 타입 | 고차 컴포넌트 | Hook | Hook |
    | 목적 | 컴포넌트 메모이제이션 | 값 메모이제이션 | 함수 메모이제이션 |
    | 사용 대상 | 컴포넌트 | 계산 값 | 함수 |
    | 재계산 조건 | props 변경 시 | 의존성 변경 시 | 의존성 변경 시 |
    | 반환 값 | 메모이제이션된 컴포넌트 | 메모이제이션된 값 | 메모이제이션된 함수 |
    
    **최적화 사용 시 주의사항:**
    - 과도한 최적화는 코드 복잡성만 증가시킬 수 있음
    - 성능 측정 없이 무분별하게 적용하지 말 것
    - 개발 모드에서는 최적화 효과가 크게 나타나지 않을 수 있음
    - React DevTools Profiler로 실제 성능 향상 여부 확인 필요

19. **React에서 서버 사이드 렌더링(SSR)이란?**
    - SSR의 장단점과 구현 방법에 대해 설명해주세요.
    
    **답변:**
    서버 사이드 렌더링(SSR)은 클라이언트가 아닌 서버에서 React 컴포넌트를 HTML로 렌더링하여 클라이언트에 전달하는 기술입니다. 이는 초기 로딩 성능, SEO, 소셜 미디어 공유 등에 이점을 제공합니다.
    
    **SSR 작동 방식:**
    1. 사용자가 페이지를 요청
    2. 서버에서 React 컴포넌트를 HTML로 렌더링
    3. 완성된 HTML을 클라이언트에 전송
    4. 클라이언트에서 JavaScript 로드 및 실행
    5. 하이드레이션(Hydration): 정적 HTML에 이벤트 리스너 연결 및 React 상태 복원
    
    **SSR 구현 방법:**
    
    **1. 기본 React SSR (직접 구현)**
    ```jsx
    // server.js
    import express from 'express';
    import React from 'react';
    import { renderToString } from 'react-dom/server';
    import App from './App';
    
    const app = express();
    
    app.get('*', (req, res) => {
      // React 컴포넌트를 HTML 문자열로 렌더링
      const appHtml = renderToString(<App />);
      
      // 클라이언트에 전송할 HTML
      const html = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>React SSR</title>
          </head>
          <body>
            <div id="root">${appHtml}</div>
            <script src="/bundle.js"></script>
          </body>
        </html>
      `;
      
      res.send(html);
    });
    
    app.listen(3000, () => {
      console.log('서버 실행 중...');
    });
    
    // client.js (클라이언트 측 하이드레이션)
    import React from 'react';
    import { hydrateRoot } from 'react-dom/client';
    import App from './App';
    
    hydrateRoot(
      document.getElementById('root'),
      <App />
    );
    ```
    
    **2. Next.js 사용 (가장 인기 있는 React SSR 프레임워크)**
    ```jsx
    // pages/index.js
    import { useState } from 'react';
    
    // 서버에서 실행되는 함수
    export async function getServerSideProps() {
      // 외부 API에서 데이터 가져오기
      const res = await fetch('https://api.example.com/data');
      const data = await res.json();
      
      // props를 통해 페이지에 데이터 전달
      return {
        props: {
          data
        }
      };
    }
    
    // 컴포넌트는 서버와 클라이언트 모두에서 렌더링됨
    export default function Home({ data }) {
      const [count, setCount] = useState(0);
      
      return (
        <div>
          <h1>서버에서 가져온 데이터</h1>
          <pre>{JSON.stringify(data, null, 2)}</pre>
          
          <h2>클라이언트 상호작용</h2>
          <p>카운트: {count}</p>
          <button onClick={() => setCount(count + 1)}>증가</button>
        </div>
      );
    }
    ```
    
    **3. Remix 사용**
    ```jsx
    // app/routes/index.jsx
    import { json } from '@remix-run/node';
    import { useLoaderData } from '@remix-run/react';
    
    // 서버에서 실행되는 로더 함수
    export async function loader() {
      const res = await fetch('https://api.example.com/data');
      const data = await res.json();
      return json({ data });
    }
    
    // 컴포넌트
    export default function Index() {
      const { data } = useLoaderData();
      
      return (
        <div>
          <h1>Remix SSR 예제</h1>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      );
    }
    ```
    
    **SSR의 장점:**
    - **초기 로딩 성능 향상**: 사용자가 완성된 HTML을 즉시 볼 수 있음
    - **SEO 개선**: 검색 엔진이 완전한 콘텐츠를 크롤링 가능
    - **소셜 미디어 공유 최적화**: 미리 렌더링된 메타 태그로 링크 공유 시 풍부한 미리보기
    - **느린 기기에서도 빠른 초기 렌더링**: JavaScript 실행 전에 콘텐츠 표시
    - **접근성 향상**: JavaScript가 비활성화된 환경에서도 기본 콘텐츠 제공 가능
    
    **SSR의 단점:**
    - **서버 부하 증가**: 각 요청마다 서버에서 렌더링 작업 필요
    - **구현 복잡성**: 서버와 클라이언트 모두에서 작동하는 코드 작성 필요
    - **하이드레이션 지연**: 큰 앱에서는 JavaScript 로드 후 하이드레이션까지 시간 소요
    - **서버 환경 제한**: 브라우저 전용 API 사용 시 추가 처리 필요
    - **개발 환경 설정 복잡**: 빌드 및 배포 프로세스가 더 복잡해짐
    
    **SSR 대안 및 관련 기술:**
    - **정적 사이트 생성(SSG)**: 빌드 시점에 HTML 생성 (Next.js, Gatsby)
    - **점진적 정적 생성(ISR)**: SSG + 주기적 재생성 (Next.js)
    - **클라이언트 사이드 렌더링(CSR)**: 전통적인 SPA 방식
    - **스트리밍 SSR**: HTML을 청크 단위로 점진적 전송 (React 18+)
    
    **사용 시기:**
    - SEO가 중요한 공개 웹사이트
    - 초기 로딩 성능이 중요한 애플리케이션
    - 소셜 미디어 공유가 빈번한 콘텐츠
    - 느린 기기나 네트워크 환경의 사용자가 많은 서비스
