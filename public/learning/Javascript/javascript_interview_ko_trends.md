# JavaScript 개발자 인터뷰 질문 (최신 트렌드)

## 최신 트렌드

29. **TypeScript의 장점과 JavaScript와의 차이점은 무엇인가요?**

    TypeScript는 JavaScript의 상위 집합(Superset)으로, 정적 타입 시스템을 추가하여 코드의 안정성과 가독성을 향상시킵니다. JavaScript는 동적 타입 언어로 런타임에 타입 오류가 발생할 수 있지만, TypeScript는 컴파일 시점에 타입 오류를 감지하여 버그를 사전에 방지합니다.
    
    **장점:**
    - 타입 안전성 및 버그 방지
    - 향상된 IDE 지원 (코드 자동 완성, 리팩토링 등)
    - 인터페이스, 제네릭 등 고급 타입 기능
    - 더 나은 코드 문서화
    
    **단점:**
    - 추가적인 컴파일 단계 필요
    - 학습 곡선
    - 설정 및 구성의 복잡성

    **예시:**
    ```typescript
    // JavaScript
    function add(a, b) {
      return a + b; // 문자열이면 연결, 숫자면 덧셈
    }
    
    console.log(add(5, 3)); // 8
    console.log(add("5", "3")); // "53" (의도하지 않은 결과)
    
    // TypeScript
    function addTS(a: number, b: number): number {
      return a + b; // 타입 안전성 보장
    }
    
    console.log(addTS(5, 3)); // 8
    // console.log(addTS("5", "3")); // 컴파일 오류 발생
    ```

30. **웹 컴포넌트(Web Components)란 무엇이며 어떤 이점이 있나요?**

    웹 컴포넌트는 재사용 가능한 사용자 정의 HTML 요소를 생성하기 위한 웹 표준 기술 세트입니다. 주요 기술로는 Custom Elements, Shadow DOM, HTML Templates, ES Modules가 있습니다.
    
    **장점:**
    - 프레임워크 독립성 (어떤 프레임워크와도 함께 사용 가능)
    - 캡슐화된 스타일과 마크업 (Shadow DOM)
    - 재사용성 및 확장성
    - 브라우저 네이티브 기술
    
    **단점:**
    - 상태 관리 기능 부족
    - 오래된 브라우저에서는 폴리필 필요
    - React, Vue 등에 비해 생태계 및 도구 지원 적음

    **예시:**
    ```javascript
    // 사용자 정의 요소 생성
    class UserCard extends HTMLElement {
      constructor() {
        super();
        
        // Shadow DOM 생성
        this.attachShadow({ mode: 'open' });
        
        this.shadowRoot.innerHTML = `
          <style>
            .card { 
              border: 1px solid #ccc; 
              padding: 10px; 
              margin: 10px;
            }
          </style>
          <div class="card">
            <h3>사용자: <slot name="username"></slot></h3>
            <div><slot name="email"></slot></div>
            <button id="details">상세 정보</button>
          </div>
        `;
        
        this.shadowRoot.querySelector('#details')
          .addEventListener('click', () => this.showDetails());
      }
      
      showDetails() {
        alert('상세 정보 표시');
      }
    }
    
    // 요소 등록
    customElements.define('user-card', UserCard);
    
    // HTML에서 사용
    // <user-card>
    //   <span slot="username">홍길동</span>
    //   <span slot="email">hong@example.com</span>
    // </user-card>
    ```

31. **서버리스(Serverless) 아키텍처와 JavaScript의 관계에 대해 설명해주세요.**

    서버리스 아키텍처는 개발자가 서버 인프라를 관리하지 않고 기능(함수)에 집중할 수 있게 하는 클라우드 컴퓨팅 모델입니다. JavaScript/Node.js는 서버리스 환경에서 가장 널리 사용되는 언어 중 하나입니다.
    
    **장점:**
    - 인프라 관리 부담 감소
    - 자동 확장성 (요청에 따른 자동 스케일링)
    - 사용량 기반 비용 모델 (실행 시간에 따른 과금)
    - 빠른 배포 및 개발 주기 단축
    
    **단점:**
    - 콜드 스타트 지연 (Cold Start)
    - 벤더 종속성 (Vendor Lock-in)
    - 실행 시간 제한 (일반적으로 5-15분)
    - 디버깅의 복잡성

    **예시:**
    ```javascript
    // AWS Lambda 함수 예시 (Node.js)
    exports.handler = async (event) => {
      try {
        // 이벤트 처리 로직
        const name = event.queryStringParameters?.name || 'Guest';
        
        // 응답 반환
        return {
          statusCode: 200,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: `Hello, ${name}!`,
            timestamp: new Date().toISOString()
          })
        };
      } catch (error) {
        return {
          statusCode: 500,
          body: JSON.stringify({ error: error.message })
        };
      }
    };
    ```

32. **PWA(Progressive Web App)란 무엇이며 어떤 이점이 있나요?**

    PWA(Progressive Web App)는 웹 기술로 구축되지만 네이티브 앱과 유사한 사용자 경험을 제공하는 웹 애플리케이션입니다. 서비스 워커, 웹 앱 매니페스트, HTTPS 등의 기술을 활용합니다.
    
    **장점:**
    - 오프라인 기능 (인터넷 연결 없이도 작동)
    - 홈 화면 설치 가능 (앱처럼 사용)
    - 푸시 알림 지원
    - 빠른 로딩 속도 (캐싱 활용)
    - 크로스 플랫폼 호환성
    
    **단점:**
    - iOS에서의 제한적인 지원
    - 일부 네이티브 기능에 대한 접근 제한
    - 앱 스토어 검색에 나타나지 않음

    **예시:**
    ```javascript
    // 서비스 워커 등록
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then(registration => {
            console.log('ServiceWorker 등록 성공:', registration.scope);
          })
          .catch(error => {
            console.error('ServiceWorker 등록 실패:', error);
          });
      });
    }
    
    // sw.js (서비스 워커 파일)
    const CACHE_NAME = 'my-pwa-cache-v1';
    const urlsToCache = [
      '/',
      '/index.html',
      '/styles/main.css',
      '/scripts/app.js'
    ];
    
    // 설치 이벤트 - 리소스 캐싱
    self.addEventListener('install', event => {
      event.waitUntil(
        caches.open(CACHE_NAME)
          .then(cache => cache.addAll(urlsToCache))
      );
    });
    
    // 페치 이벤트 - 캐싱된 리소스 사용
    self.addEventListener('fetch', event => {
      event.respondWith(
        caches.match(event.request)
          .then(response => response || fetch(event.request))
      );
    });
    ```

33. **모노레포(Monorepo)란 무엇이며 JavaScript/TypeScript 프로젝트에서 어떤 이점이 있나요?**

    모노레포(Monorepo)는 여러 프로젝트나 패키지를 단일 저장소에서 관리하는 개발 방식입니다. 전통적인 멀티레포(다중 저장소) 접근 방식과 달리, 모노레포는 관련된 모든 코드를 하나의 저장소에 통합하여 관리합니다.
    
    **장점:**
    - 코드 공유 및 재사용 용이성
    - 의존성 관리 단순화
    - 통합 테스트 및 배포 프로세스 간소화
    - 일관된 개발 환경 제공
    
    **단점:**
    - 저장소 크기 증가
    - 초기 설정의 복잡성
    - 빌드 및 CI/CD 구성의 복잡성

    **예시:**
    ```javascript
    // 모노레포 구조 예시 (pnpm workspaces 사용)
    
    // package.json (루트 디렉토리)
    {
      "name": "my-monorepo",
      "private": true,
      "workspaces": [
        "packages/*",
        "apps/*"
      ],
      "scripts": {
        "build": "turbo run build",
        "test": "turbo run test",
        "lint": "turbo run lint",
        "dev": "turbo run dev"
      },
      "devDependencies": {
        "turbo": "^1.10.0",
        "typescript": "^5.0.0",
        "eslint": "^8.40.0"
      }
    }
    
    // turbo.json (Turborepo 설정)
    {
      "$schema": "https://turbo.build/schema.json",
      "pipeline": {
        "build": {
          "dependsOn": ["^build"],
          "outputs": ["dist/**"]
        },
        "test": {
          "dependsOn": ["build"],
          "outputs": []
        },
        "lint": {
          "outputs": []
        },
        "dev": {
          "cache": false
        }
      }
    }
    
    // packages/ui/package.json (공유 UI 라이브러리)
    {
      "name": "@my-org/ui",
      "version": "0.1.0",
      "main": "./dist/index.js",
      "types": "./dist/index.d.ts",
      "scripts": {
        "build": "tsc",
        "test": "jest",
        "lint": "eslint src/**/*.ts"
      },
      "dependencies": {
        "react": "^18.2.0",
        "react-dom": "^18.2.0"
      }
    }
    
    // packages/utils/package.json (공유 유틸리티 라이브러리)
    {
      "name": "@my-org/utils",
      "version": "0.1.0",
      "main": "./dist/index.js",
      "types": "./dist/index.d.ts",
      "scripts": {
        "build": "tsc",
        "test": "jest",
        "lint": "eslint src/**/*.ts"
      }
    }
    
    // apps/web/package.json (웹 애플리케이션)
    {
      "name": "web",
      "version": "0.1.0",
      "private": true,
      "scripts": {
        "dev": "next dev",
        "build": "next build",
        "start": "next start",
        "lint": "eslint src/**/*.ts"
      },
      "dependencies": {
        "@my-org/ui": "workspace:*",
        "@my-org/utils": "workspace:*",
        "next": "^13.4.0",
        "react": "^18.2.0",
        "react-dom": "^18.2.0"
      }
    }
    
    // apps/mobile/package.json (모바일 애플리케이션)
    {
      "name": "mobile",
      "version": "0.1.0",
      "private": true,
      "scripts": {
        "dev": "expo start",
        "build": "expo build",
        "lint": "eslint src/**/*.ts"
      },
      "dependencies": {
        "@my-org/ui": "workspace:*",
        "@my-org/utils": "workspace:*",
        "expo": "^48.0.0",
        "react": "^18.2.0",
        "react-native": "^0.71.0"
      }
    }
    
    // 공유 컴포넌트 사용 예시
    // packages/ui/src/Button.tsx
    import React from 'react';
    
    export interface ButtonProps {
      text: string;
      onClick?: () => void;
      variant?: 'primary' | 'secondary';
    }
    
    export const Button: React.FC<ButtonProps> = ({ 
      text, 
      onClick, 
      variant = 'primary' 
    }) => {
      return (
        <button 
          className={`btn btn-${variant}`}
          onClick={onClick}
        >
          {text}
        </button>
      );
    };
    
    // 웹 애플리케이션에서 사용
    // apps/web/src/pages/index.tsx
    import { Button } from '@my-org/ui';
    import { formatDate } from '@my-org/utils';
    
    export default function HomePage() {
      return (
        <div>
          <h1>Web App</h1>
          <p>Current date: {formatDate(new Date())}</p>
          <Button 
            text="Click me" 
            onClick={() => alert('Button clicked!')} 
          />
        </div>
      );
    }
    
    // 모바일 애플리케이션에서 사용
    // apps/mobile/src/screens/HomeScreen.tsx
    import React from 'react';
    import { View, Text } from 'react-native';
    import { Button } from '@my-org/ui';
    import { formatDate } from '@my-org/utils';
    
    export default function HomeScreen() {
      return (
        <View>
          <Text>Mobile App</Text>
          <Text>Current date: {formatDate(new Date())}</Text>
          <Button 
            text="Click me" 
            onClick={() => alert('Button clicked!')} 
          />
        </View>
      );
    }
    ```