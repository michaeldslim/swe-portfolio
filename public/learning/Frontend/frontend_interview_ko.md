# 프론트엔드 엔지니어 인터뷰 - 웹 기술 질문과 답변

## HTML

### Q1: HTML5의 주요 특징은 무엇인가요?
**A:** HTML5는 다음과 같은 주요 특징을 가지고 있습니다:
- 시맨틱 태그(`<header>`, `<footer>`, `<article>`, `<section>` 등) 도입
- 오디오 및 비디오 요소 지원 (`<audio>`, `<video>`)
- Canvas 및 SVG 지원
- 로컬 스토리지 및 세션 스토리지
- 웹 워커, 웹소켓, 지오로케이션 API 등 다양한 API 지원
- 모바일 친화적인 기능

### Q2: 시맨틱 HTML이란 무엇이며 왜 중요한가요?
**A:** 시맨틱 HTML은 태그가 내용의 의미를 명확하게 전달하는 방식으로 마크업하는 것입니다. `<div>`나 `<span>` 대신 `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>` 등의 태그를 사용합니다.

중요한 이유:
- 접근성 향상: 스크린 리더와 같은 보조 기술이 콘텐츠를 더 잘 이해할 수 있음
- SEO 최적화: 검색 엔진이 콘텐츠의 중요성과 관련성을 더 잘 파악할 수 있음
- 코드 가독성 및 유지보수성 향상
- 다양한 기기에서의 일관된 표시 지원

### Q3: DOCTYPE의 역할은 무엇인가요?
**A:** DOCTYPE(Document Type Declaration)은 HTML 문서의 맨 앞에 위치하며, 브라우저에게 해당 문서가 어떤 HTML 버전으로 작성되었는지 알려주는 역할을 합니다. 이를 통해 브라우저는 문서를 올바르게 렌더링할 수 있습니다.

HTML5의 DOCTYPE 선언:
```html
<!DOCTYPE html>
```

이전 버전의 HTML은 더 복잡한 DOCTYPE 선언을 사용했습니다.

## CSS

### Q1: CSS 박스 모델에 대해 설명해주세요.
**A:** CSS 박스 모델은 HTML 요소가 차지하는 공간을 정의하는 개념입니다. 다음 네 가지 영역으로 구성됩니다:

1. **Content**: 텍스트나 이미지가 표시되는 실제 내용 영역
2. **Padding**: 내용과 테두리 사이의 공간
3. **Border**: 패딩 주위를 감싸는 테두리
4. **Margin**: 테두리 바깥쪽의 공간, 다른 요소와의 간격을 제공

`box-sizing` 속성을 통해 박스 모델의 계산 방식을 변경할 수 있습니다:
- `content-box` (기본값): width와 height가 content 영역만 포함
- `border-box`: width와 height가 content, padding, border를 모두 포함

### Q2: CSS에서 position 속성의 다양한 값과 그 차이점을 설명해주세요.
**A:** CSS position 속성은 요소가 문서 내에서 배치되는 방식을 결정합니다:

1. **static (기본값)**: 일반적인 문서 흐름에 따라 배치됨. top, right, bottom, left 속성이 적용되지 않음
2. **relative**: 일반 흐름에 따라 배치된 후, 지정된 오프셋만큼 이동. 다른 요소의 레이아웃에 영향을 주지 않음
3. **absolute**: 가장 가까운 positioned 조상 요소(static이 아닌)를 기준으로 배치. 없으면 초기 컨테이닝 블록 기준
4. **fixed**: 뷰포트를 기준으로 배치되어 스크롤해도 위치가 변하지 않음
5. **sticky**: 스크롤 위치에 따라 relative와 fixed 사이를 전환함

### Q3: CSS 선택자의 우선순위(Specificity)는 어떻게 계산되나요?
**A:** CSS 선택자 우선순위는 다음과 같이 계산됩니다:

1. **인라인 스타일** (1000점)
2. **ID 선택자** (#example) (100점)
3. **클래스 선택자** (.example), 속성 선택자 ([type="text"]), 가상 클래스 (:hover) (10점)
4. **요소 선택자** (div, p), 가상 요소 선택자 (::before) (1점)

!important는 모든 우선순위를 무시하고 가장 높은 우선순위를 가집니다.

## JavaScript

### Q1: var, let, const의 차이점은 무엇인가요?
**A:**
- **var**: 함수 스코프, 호이스팅 시 undefined로 초기화, 재선언 및 재할당 가능
- **let**: 블록 스코프, 호이스팅 시 초기화되지 않음(TDZ), 재선언 불가능, 재할당 가능
- **const**: 블록 스코프, 호이스팅 시 초기화되지 않음(TDZ), 재선언 불가능, 재할당 불가능(객체의 속성은 변경 가능)

### Q2: 이벤트 버블링과 이벤트 캡처링의 차이점은 무엇인가요?
**A:** 이벤트 전파 방식의 두 가지 단계입니다:

- **이벤트 캡처링(Capturing)**: 이벤트가 최상위 요소에서 시작하여 이벤트가 발생한 요소까지 내려가는 단계
- **이벤트 버블링(Bubbling)**: 이벤트가 발생한 요소에서 시작하여 최상위 요소까지 올라가는 단계

기본적으로 이벤트는 버블링 단계에서 처리되지만, addEventListener의 세 번째 매개변수를 true로 설정하면 캡처링 단계에서 이벤트를 처리할 수 있습니다.

```javascript
element.addEventListener('click', handler, true); // 캡처링 단계
element.addEventListener('click', handler, false); // 버블링 단계 (기본값)
```

### Q3: Promise와 async/await의 차이점과 장단점을 설명해주세요.
**A:** 둘 다 비동기 작업을 처리하는 방법입니다:

**Promise**:
- 장점: 체이닝을 통한 연속적인 비동기 작업 처리, 에러 핸들링
- 단점: 복잡한 비동기 로직에서 코드가 복잡해질 수 있음(콜백 지옥은 아니지만 then 체인이 길어질 수 있음)

**async/await**:
- 장점: 동기 코드와 유사한 구문으로 가독성 향상, try/catch를 통한 에러 핸들링
- 단점: 병렬 처리를 위해서는 추가 작업 필요(Promise.all 등)

async/await는 Promise를 기반으로 하는 문법적 설탕(syntactic sugar)으로, 내부적으로는 Promise를 사용합니다.

## 웹 성능 최적화

### Q1: 웹 성능을 최적화하는 방법에는 어떤 것들이 있나요?
**A:** 웹 성능 최적화 방법:

1. **리소스 최적화**:
   - 이미지 압축 및 적절한 포맷 사용(WebP, AVIF)
   - CSS/JS 파일 압축(Minification) 및 번들링
   - 코드 스플리팅과 지연 로딩(Lazy Loading)
   - 트리 쉐이킹을 통한 불필요한 코드 제거

2. **네트워크 최적화**:
   - HTTP/2 또는 HTTP/3 사용
   - CDN 활용
   - 브라우저 캐싱 전략 구현
   - 서버 사이드 렌더링(SSR) 또는 정적 사이트 생성(SSG) 고려

3. **렌더링 최적화**:
   - 크리티컬 렌더링 패스 최적화
   - 불필요한 리렌더링 방지
   - CSS 애니메이션 대신 transform/opacity 사용
   - 가상 스크롤(Virtual Scrolling) 구현

### Q2: 크리티컬 렌더링 패스(Critical Rendering Path)란 무엇인가요?
**A:** 크리티컬 렌더링 패스는 브라우저가 HTML, CSS, JavaScript를 처리하여 화면에 픽셀을 렌더링하는 일련의 단계입니다:

1. **DOM 구성**: HTML 파싱하여 DOM 트리 생성
2. **CSSOM 구성**: CSS 파싱하여 CSSOM 트리 생성
3. **렌더 트리 구성**: DOM과 CSSOM을 결합하여 렌더 트리 생성
4. **레이아웃(Reflow)**: 각 요소의 크기와 위치 계산
5. **페인팅(Paint)**: 픽셀을 화면에 그리는 과정

최적화 방법:
- CSS는 head에, JavaScript는 body 끝에 배치
- 중요한 CSS는 인라인으로 포함
- async/defer 속성 사용
- 미디어 쿼리 활용
- 불필요한 JavaScript 실행 지연

## 프론트엔드 프레임워크/라이브러리

### Q1: React의 가상 DOM(Virtual DOM)이란 무엇이며 어떤 장점이 있나요?
**A:** 가상 DOM은 실제 DOM의 가벼운 복사본으로, 메모리에 존재하는 JavaScript 객체입니다. React는 다음과 같은 과정으로 작동합니다:

1. 상태 변경 시 새로운 가상 DOM 트리 생성
2. 이전 가상 DOM과 새로운 가상 DOM 비교(Diffing)
3. 변경된 부분만 실제 DOM에 적용(Reconciliation)

장점:
- 불필요한 DOM 조작 최소화로 성능 향상
- 선언적 API를 통한 개발 편의성
- 크로스 플랫폼 지원(React Native 등)

### Q2: React의 상태 관리 방법들에 대해 설명해주세요.
**A:** React의 상태 관리 방법:

1. **로컬 상태(Local State)**:
   - useState 훅: 함수형 컴포넌트에서 상태 관리
   - this.state: 클래스 컴포넌트에서 상태 관리

2. **컨텍스트 API(Context API)**:
   - createContext, useContext: 컴포넌트 트리 전체에 데이터 제공
   - Props Drilling 문제 해결에 유용

3. **외부 상태 관리 라이브러리**:
   - Redux: 예측 가능한 상태 컨테이너, 단방향 데이터 흐름
   - MobX: 반응형 프로그래밍 기반, 보일러플레이트 코드 감소
   - Recoil: React를 위해 설계된 상태 관리 라이브러리
   - Zustand: 간단하고 가벼운 상태 관리 솔루션

### Q3: SPA(Single Page Application)와 MPA(Multi Page Application)의 차이점과 각각의 장단점은 무엇인가요?
**A:** SPA와 MPA의 비교:

**SPA (Single Page Application)**:
- 장점: 빠른 사용자 경험(초기 로드 후), 서버 부하 감소, 프론트엔드와 백엔드 분리
- 단점: 초기 로드 시간 길어질 수 있음, SEO 최적화 어려움(SSR로 해결 가능), 메모리 누수 가능성

**MPA (Multi Page Application)**:
- 장점: SEO 최적화 용이, 초기 페이지 로드 빠름, 전통적인 웹 개발 방식
- 단점: 페이지 전환 시 전체 페이지 리로드, 서버 부하 증가, 프론트엔드/백엔드 결합도 높음

## 웹 보안

### Q1: CORS(Cross-Origin Resource Sharing)란 무엇이며 어떻게 작동하나요?
**A:** CORS는 다른 출처(도메인, 프로토콜, 포트)의 리소스에 접근할 수 있도록 하는 보안 메커니즘입니다.

작동 방식:
1. 브라우저는 다른 출처로 요청을 보낼 때 Origin 헤더를 포함
2. 서버는 Access-Control-Allow-Origin 헤더로 응답하여 허용된 출처 명시
3. 브라우저는 이 헤더를 확인하여 요청의 성공/실패 결정

단순 요청이 아닌 경우(예: PUT, DELETE 메서드 사용, 특정 헤더 포함), 브라우저는 먼저 preflight 요청(OPTIONS 메서드)을 보내 서버가 해당 요청을 허용하는지 확인합니다.

### Q2: XSS(Cross-Site Scripting)와 CSRF(Cross-Site Request Forgery) 공격이란 무엇이며 어떻게 방어할 수 있나요?
**A:** 두 가지 주요 웹 보안 취약점:

**XSS (Cross-Site Scripting)**:
- 공격 방식: 악성 스크립트를 웹 페이지에 삽입하여 사용자 브라우저에서 실행되게 함
- 방어 방법:
  - 입력 데이터 검증 및 출력 시 이스케이프 처리
  - Content-Security-Policy(CSP) 헤더 설정
  - HttpOnly 및 Secure 쿠키 플래그 사용
  - React, Vue 등 프레임워크의 자동 이스케이프 기능 활용

**CSRF (Cross-Site Request Forgery)**:
- 공격 방식: 인증된 사용자가 자신의 의지와 무관하게 공격자가 의도한 행동을 수행하도록 함
- 방어 방법:
  - CSRF 토큰 사용
  - Same-Site 쿠키 속성 설정
  - Referer 검사
  - 중요 작업에 추가 인증 요구

## 웹 접근성

### Q1: 웹 접근성이란 무엇이며 왜 중요한가요?
**A:** 웹 접근성은 장애를 가진 사람들을 포함한 모든 사용자가 웹 콘텐츠를 인식하고, 이해하며, 탐색하고 상호작용할 수 있도록 하는 것입니다.

중요한 이유:
- 모든 사용자에게 동등한 접근 기회 제공
- 법적 요구사항 충족(많은 국가에서 공공 웹사이트에 접근성 준수 요구)
- 사용자 경험 전반적 향상
- 검색 엔진 최적화(SEO) 개선
- 더 넓은 사용자층 확보

### Q2: ARIA(Accessible Rich Internet Applications)란 무엇이며 어떻게 사용하나요?
**A:** ARIA는 접근성이 부족한 HTML 요소를 보완하기 위한 속성 집합입니다. 주로 동적 콘텐츠와 JavaScript UI 위젯의 접근성을 향상시키는 데 사용됩니다.

주요 ARIA 속성:
- **역할(role)**: 요소의 목적 정의 (예: `role="button"`, `role="navigation"`)
- **속성(properties)**: 요소의 특성 설명 (예: `aria-required="true"`, `aria-label="검색"`)
- **상태(states)**: 요소의 현재 상태 표시 (예: `aria-expanded="false"`, `aria-checked="true"`)

사용 예시:
```html
<div role="button" aria-pressed="false" tabindex="0" onclick="toggleButton(this)">
  토글 버튼
</div>
```

## 최신 웹 기술 트렌드

### Q1: PWA(Progressive Web App)란 무엇이며 어떤 장점이 있나요?
**A:** PWA는 웹과 네이티브 앱의 장점을 결합한 웹 애플리케이션입니다.

주요 특징 및 장점:
- **오프라인 작동**: Service Worker를 통한 캐싱으로 네트워크 없이도 작동
- **설치 가능**: 홈 화면에 추가 가능, 앱 스토어 없이 배포
- **반응형**: 다양한 화면 크기 및 기기에 적응
- **안전**: HTTPS를 통한 보안 연결 필수
- **푸시 알림**: 사용자 참여 증가
- **네이티브 앱 같은 경험**: 전체 화면 모드, 스플래시 스크린 등

### Q2: WebAssembly(WASM)란 무엇이며 어떤 용도로 사용되나요?
**A:** WebAssembly는 브라우저에서 실행되는 바이너리 명령 형식으로, C, C++, Rust 등의 언어로 작성된 코드를 웹에서 거의 네이티브 속도로 실행할 수 있게 해줍니다.

주요 용도:
- 고성능 게임 및 그래픽 처리
- 비디오/오디오 편집 도구
- CAD 및 3D 모델링 애플리케이션
- 이미지 인식 및 기계 학습
- 암호화 및 압축 알고리즘
- 기존 C/C++ 라이브러리의 웹 포팅

### Q3: JAMstack이란 무엇이며 어떤 이점이 있나요?
**A:** JAMstack은 JavaScript, API, Markup의 약자로, 정적 사이트 생성과 서버리스 아키텍처를 활용한 웹 개발 아키텍처입니다.

주요 이점:
- **보안 강화**: 공격 표면 감소
- **성능 향상**: 정적 파일 제공으로 빠른 로딩
- **확장성**: CDN을 통한 전 세계 배포 용이
- **개발자 경험**: 프론트엔드와 백엔드 분리로 개발 효율성 증가
- **비용 효율성**: 서버리스 함수와 정적 호스팅으로 비용 절감
- **SEO 친화적**: 빠른 로딩 시간과 사전 렌더링된 콘텐츠
