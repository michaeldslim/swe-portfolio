# 28. React + Next.js 에서 SSR은 무엇을 하나? / What SSR Does in React + Next.js

## 1. SSR이란 무엇인가? (What is SSR?)

### 한국어 (Korean)

- **SSR(Server-Side Rendering)**
  - 브라우저(클라이언트)가 페이지를 요청하면, **서버에서 React 컴포넌트를 먼저 실행해서 HTML을 만들어 보내는 방식**입니다.
  - Next.js 에서는 `getServerSideProps`, `app router` 의 서버 컴포넌트, `fetch`(서버에서 실행) 등을 활용해 **요청 시점에 데이터를 가져오고 HTML을 생성**합니다.

### English

- **SSR (Server-Side Rendering)**
  - When the browser requests a page, the **server runs the React components, fetches data, and returns ready-to-render HTML**.
  - In Next.js, this typically involves server data fetching (`getServerSideProps` or server components in the App Router) and rendering on each request.

---

## 2. 서버에서 하는 일 vs 클라이언트에서 하는 일

### 서버(Server)

- **KO**
  - 클라이언트로부터 `GET /page` 요청을 받음
  - 서버에서 React 트리 렌더링
    - 필요한 데이터 fetch (DB, API 등)
    - React 컴포넌트 실행
  - 완성된 HTML 문자열 + 초기 상태(initial state)를 포함하는 문서를 생성 (예: `<script>window.__INITIAL_DATA__ = ...</script>`)
  - 이 HTML을 클라이언트로 응답
- **EN**
  - Receive `GET /page` from the browser.
  - On the server:
    - Fetch data (DB, APIs).
    - Render the React tree to HTML.
  - Return an HTML document that already contains the rendered UI and often some embedded initial state.

### 클라이언트(Client)

- **KO**
  - 서버가 보낸 HTML을 먼저 **그대로 렌더링** → 사용자는 즉시 완성된 UI를 봄.
  - 그 다음에 React/Next.js 번들을 다운로드하고 실행 → **hydration(수화)** 단계에서 기존 HTML에 이벤트 핸들러 등을 붙여서 SPA처럼 동작하게 만듦.
- **EN**
  - The browser displays the server-generated HTML immediately.
  - Then it downloads and runs the React/Next.js bundle.
  - During **hydration**, React attaches event handlers to the existing DOM so the page becomes interactive like an SPA.

---

## 3. 무엇을 서버에서 보내는가? (What Exactly is Sent to the Client?)

### 한국어 (Korean)

- SSR 응답에는 보통 다음이 포함됩니다.
  - **완전히 렌더링된 HTML**:
    - 초기 UI가 이미 포함된 `<div id="root">...초기 DOM...</div>`
  - **초기 데이터/상태**:
    - 예: `<script id="__NEXT_DATA__" type="application/json">{...}</script>`
    - 클라이언트 측 React 가 이 데이터를 사용해 hydration 시 상태를 맞춥니다.
  - 정적 자원 링크
    - JS 번들, CSS, 이미지 링크 등

### English

- A typical SSR response contains:
  - **Fully rendered HTML** for the requested route.
  - **Initial data/state** embedded in a script tag.
  - Links to JS bundles, CSS, and assets that the client will load afterwards.

---

## 4. CSR과 비교 (SSR vs CSR in React)

### CSR(Client-Side Rendering)만 사용하는 경우

- **KO**
  - 서버는 거의 빈 HTML (예: `<div id="root"></div>`) 과 JS 번들만 보냄.
  - 브라우저가 JS 번들을 다운로드하고 실행한 후에야 실제 UI와 데이터를 렌더링.
- **EN**
  - Server mostly returns an empty container and JS.
  - The browser downloads and runs JS, then fetches data and renders the UI entirely on the client.

### SSR(또는 SSG) + Hydration 인 경우

- **KO**
  - 서버에서 이미 완성된 HTML을 보내기 때문에 **첫 화면이 매우 빠르게 보임 (FCP/TTFB 관점)**.
  - 이후에 JS 번들이 로드되면서 SPA 처럼 동작.
- **EN**
  - Server sends ready HTML → faster perceived load and meaningful content.
  - Then hydration turns it into an interactive SPA.

---

## 5. SEO에 어떤 영향을 미치는가? (SEO Impact)

### 왜 SSR이 SEO에 유리한가?

- **KO**
  - 검색 엔진 크롤러(특히 JS 실행 능력이 제한된 크롤러)는 **HTML에 바로 보이는 텍스트/메타 정보를 기반으로 페이지를 인덱싱**합니다.
  - CSR만 있을 경우, 초기 HTML이 비어 있고 JS 실행 후에야 내용이 생기기 때문에, 일부 크롤러는 완전한 내용을 못 볼 수 있습니다.
  - SSR/SSG 는 서버에서 **이미 렌더링된 HTML** 을 주기 때문에, 크롤러가 JS를 실행하지 않더라도 주요 콘텐츠/메타 태그를 읽을 수 있습니다.
- **EN**
  - Many crawlers primarily index what they see in the **initial HTML**.
  - With pure CSR, the initial HTML can be almost empty, and content appears only after JS runs.
  - SSR/SSG give crawlers fully rendered HTML upfront, so they can index content and meta tags more reliably.

### Next.js에서 SEO 관련 포인트

- **KO**
  - `next/head` 또는 App Router 의 `metadata`/`generateMetadata` 를 사용해 **title, meta description, Open Graph 태그** 등을 SSR 시점에 포함 가능.
  - 각 페이지에서 `getServerSideProps` 또는 server component 를 활용해 **콘텐츠 + 메타데이터를 함께 SSR** 하면 검색엔진에 유리합니다.
- **EN**
  - Use `next/head` or App Router metadata APIs to render titles and meta tags on the server.
  - SSR pages with meaningful content and meta tags improve crawlability and SEO.

---

## 6. 언제 SSR을 쓰고 언제 안 쓸까? (When to Use SSR vs Not)

### SSR / SSG를 선호하는 경우

- **KO**
  - SEO 가 중요한 공개 페이지 (블로그, 마케팅 페이지, 상품 상세 등)
  - 초기 로딩 시 **완성된 콘텐츠를 빨리 보여주고 싶을 때**
- **EN**
  - Public, SEO-heavy pages.
  - When fast first content paint with real data is important.

### CSR 또는 클라이언트 전용을 선호하는 경우

- **KO**
  - 인증/대시보드처럼 **로그인 후**에만 보이는 내부 페이지 (SEO 중요도 낮음)
  - 매우 인터랙티브하고, 개인화가 강하며, 서버 렌더링 이득이 적은 경우
- **EN**
  - Authenticated dashboards or internal tools where SEO is irrelevant.
  - Highly personalized or interactive UIs where server-rendering offers little SEO benefit.

---

## 7. 짧은 요약 (Short Summary)

- **KO 한줄**: Next.js SSR은 서버에서 React 컴포넌트를 실행해 HTML과 초기 데이터를 만들어 클라이언트에 보내고, 브라우저는 이를 바로 렌더링한 뒤 React가 hydration으로 인터랙션을 붙이며, 이 과정 덕분에 검색 엔진이 초기 HTML만으로도 콘텐츠와 메타 정보를 인덱싱할 수 있어 SEO에 유리합니다.
- **EN one-liner**: In Next.js, SSR runs React on the server to send fully rendered HTML plus initial data, then hydrates it on the client, which both improves perceived performance and makes it easier for search engines to index your content and meta tags.
