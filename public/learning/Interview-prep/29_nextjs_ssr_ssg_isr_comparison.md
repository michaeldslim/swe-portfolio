# 29. Next.js에서 SSR vs SSG vs ISR 비교 / Comparing SSR, SSG, and ISR in Next.js

## 1. 개념 요약 (Concept Overview)

### SSR (Server-Side Rendering)

- **KO**
  - **요청마다** 서버에서 React를 실행해 HTML을 생성.
  - `getServerSideProps` 또는 App Router의 서버 컴포넌트 기반 렌더링.
- **EN**
  - Render the page **on every request** on the server.
  - Uses `getServerSideProps` (Pages Router) or server components (App Router).

### SSG (Static Site Generation)

- **KO**
  - **빌드 시점(build time)** 에 HTML을 미리 만들어 두고, 요청이 오면 정적 파일을 그대로 서빙.
  - `getStaticProps`, `getStaticPaths` 등을 사용.
- **EN**
  - Generate static HTML **at build time**.
  - Serve pre-rendered pages as static files.

### ISR (Incremental Static Regeneration)

- **KO**
  - 기본은 SSG 처럼 정적 페이지를 서빙하지만, **백그라운드에서 일정 주기로 재생성**.
  - Next 12 이하: `revalidate` 옵션, App Router: `revalidate`나 `fetch` 옵션 등으로 설정.
- **EN**
  - Start with static HTML like SSG.
  - **Rebuild pages in the background** at a specified interval (`revalidate`).

---

## 2. 요청 흐름 (Request Flow)

### SSR

- **KO Flow**
  1. 클라이언트가 `/product/1` 요청
  2. 서버가 매번 DB/API에서 데이터 fetch
  3. React 렌더링 → HTML 생성 후 응답
  4. 클라이언트에서 hydration

- **EN Flow**
  1. Client requests `/product/1`.
  2. Server fetches data from DB/API on every request.
  3. Server renders React to HTML and sends it back.
  4. Browser hydrates the HTML.

- **KO 특징**
  - 항상 최신 데이터 (요청 시점 기준)
  - 서버 부하가 상대적으로 큼 (요청마다 렌더링)
- **EN Notes**
  - Always fresh data at request time.
  - Higher server load because each request triggers rendering.

### SSG

- **KO Flow**
  1. 빌드 단계에서 `/blog/[slug]` 들을 모두 렌더링 → 정적 HTML 생성
  2. 배포 후 사용자는 CDN/스태틱 서버에서 정적 파일을 바로 다운로드
  3. 클라이언트에서 hydration

- **EN Flow**
  1. During build, render all `/blog/[slug]` pages to static HTML.
  2. After deployment, users download static files directly from CDN/static hosting.
  3. Browser hydrates those static pages.

- **KO 특징**
  - 매우 빠른 응답 속도 (CDN 캐시)
  - 빌드 시점의 데이터 기준으로 고정 → **실시간성이 떨어짐**
- **EN Notes**
  - Extremely fast responses thanks to CDN caching.
  - Content is fixed to whatever existed at build time, so it’s not real-time.

### ISR

- **KO Flow** (간단화)
  1. 초기에는 SSG로 미리 생성된 페이지를 서빙
  2. `revalidate: 60` 등으로 설정한 경우, 60초 이후 첫 요청 시 백그라운드에서 새 HTML 생성
  3. 그 다음 요청부터는 새로 생성된 HTML 제공

- **EN Flow** (simplified)
  1. Initially serve SSG-generated static pages.
  2. After the `revalidate` window (e.g., 60s), the first request triggers a background regeneration.
  3. Subsequent requests get the newly generated HTML.

- **KO 특징**
  - SSG처럼 빠른 응답 + 일정 주기로 데이터 최신화
  - 완전 실시간은 아니지만, 트래픽과 최신성 사이의 균형점 제공
- **EN Notes**
  - SSG-like speed with periodic background updates.
  - Not fully real-time, but a good balance between freshness and performance.

---

## 3. SEO 관점 비교 (SEO Perspective)

- **공통점 (SSR / SSG / ISR)**
  - **KO**: 모두 **초기 HTML에 콘텐츠가 렌더링**되어 있기 때문에 CSR-only 보다 SEO에 유리.
  - **EN**: All three pre-render content into the initial HTML, which is more SEO-friendly than pure CSR.

- **차이점**
  - **KO**
    - SSR: 항상 최신 데이터를 포함한 HTML이 검색엔진에 노출될 수 있음.
    - SSG: 빌드 시점의 스냅샷을 기반으로 인덱싱.
    - ISR: 일정 주기로 업데이트된 버전이 인덱싱됨.
  - **EN**
    - SSR: Search engines can index HTML that reflects up-to-date data at request time.
    - SSG: Indexes a snapshot of the content from build time.
    - ISR: Indexes periodically refreshed versions based on the revalidation window.

실무에서는 **"SEO를 위해 SSR이냐 SSG냐"** 보다는:

- **KO**
  - 자주 안 바뀌는 컨텐츠 → SSG/ISR
  - 자주 바뀌고 요청별로 다를 수 있는 컨텐츠 → SSR
- **EN**
  - Rarely changing content → SSG/ISR.
  - Frequently changing, per-request-different content → SSR.

으로 나누어 생각하는 편이 좋습니다.

---

## 4. 언제 무엇을 쓸까? (When to Use What)

### SSR을 선호할 때

- **KO**
  - 요청마다 다른 데이터가 필요한 페이지
    - 예: 주문 상세, 실시간 주가/재고, 사용자별 맞춤 정보 등
  - SEO 가 중요하고, **최신성이 매우 중요한 페이지**
- **EN**
  - Per-request dynamic data (orders, live data, user-specific content).
  - SEO-critical pages where freshness matters a lot.

### SSG를 선호할 때

- **KO**
  - 블로그, 문서, 마케팅 페이지처럼 **자주 안 바뀌는 공개 컨텐츠**
  - 전 세계 CDN에 캐시해서 **최대한 빠른 응답**이 필요한 경우
- **EN**
  - Blogs, docs, marketing pages with relatively static content.
  - Need ultra-fast, globally cached responses.

### ISR을 선호할 때

- **KO**
  - 상품 리스트/상세처럼 **가끔 업데이트** 되지만, 요청마다 아주 다를 필요는 없는 페이지
  - 빌드 시간을 너무 길게 가져가고 싶지 않을 때 (수천/수만 개의 SSG 페이지)
- **EN**
  - Product catalogs, content that changes occasionally.
  - Large numbers of pages where full SSG builds would be too slow.

---

## 5. 간단 비교표 (Quick Comparison Table)

| 방식 / Mode | 렌더 타이밍 (When Rendered) | 데이터 최신성 Freshness | 응답 속도 Speed | 서버 부하 Server Load | 대표 사용 예 Example |
|------------|-----------------------------|-------------------------|------------------|------------------------|----------------------|
| SSR        | 매 요청 시 (on every request) | 매우 높음 (요청 시점)    | 중간~느림         | 높음                   | 주문 상세, 실시간 데이터 |
| SSG        | 빌드 시 (build time)         | 낮음 (빌드 시점 스냅샷)  | 매우 빠름 (CDN)   | 매우 낮음              | 블로그, 문서, 랜딩 페이지 |
| ISR        | 최초 빌드 + 재생성 시        | 중간 (revalidate 주기)  | 빠름 (CDN)        | 중간                   | 상품 목록/상세, 자주 변하는 컨텐츠 |

---

## 6. 요약 (Summary)

- **KO**: Next.js 에서 SSR/SSG/ISR 모두 SEO에 유리한 **프리렌더링(pre-rendering)** 기법이지만, 렌더 타이밍과 데이터 최신성, 서버 부하가 다릅니다. 자주 바뀌는 페이지는 SSR, 거의 안 바뀌는 페이지는 SSG, 중간 정도라면 ISR 이 좋은 선택입니다.
- **EN**: In Next.js, SSR, SSG, and ISR are all pre-rendering strategies that help SEO, but they trade off render timing, freshness, and server load. Use SSR for highly dynamic pages, SSG for mostly static content, and ISR as a middle ground when you need occasional updates with static-like speed.
