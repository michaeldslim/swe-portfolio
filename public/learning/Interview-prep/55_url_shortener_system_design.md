# 55. 간단한 URL Shortener 설계 / Simple URL Shortener Design

## 1. 목표 (Goal)

### 한국어 (Korean)

- 긴 URL (예: `https://example.com/some/very/long/path?...`) 을 짧은 URL (예: `https://sho.rt/abc123`) 로 매핑.
- 짧은 URL에 접속하면 **원래 긴 URL로 301/302 리다이렉트**.
- 기본 기능 위주 (대규모 분산 시스템 수준이 아니라, 인터뷰용 단일 서비스 설계).

### English

- Map long URLs to short codes like `https://sho.rt/abc123`.
- When a user hits the short URL, redirect to the original long URL.
- Focus on a simple, single-service design suitable for interview discussion.

---

## 2. 주요 엔드포인트 (Core Endpoints)

### 1) 단축 URL 생성 (Create Short URL)

- **HTTP**: `POST /api/shorten`
- **Request Body (JSON)**:

```json
{
  "longUrl": "https://example.com/some/very/long/path?utm=123"
}
```

- **Response (JSON)**:

```json
{
  "shortUrl": "https://sho.rt/abc123",
  "code": "abc123",
  "longUrl": "https://example.com/some/very/long/path?utm=123"
}
```

- **설명 (KO)**
  - 서버는 `longUrl` 을 받아서 **고유한 `code` (예: 6~8자 base62 문자열)** 를 생성.
  - DB 에 `(code, longUrl)` 매핑을 저장한 뒤, 클라이언트에게 `shortUrl` 을 반환.

- **Explanation (EN)**
  - Server generates a unique short code, stores the mapping, and returns the full short URL.

### 2) 리다이렉트 (Redirect to Long URL)

- **HTTP**: `GET /:code`
  - 예: `GET /abc123`
- **동작 (KO)**
  - `code` 로 DB 조회 → 해당 `longUrl` 찾으면 301 또는 302 리다이렉트.
  - 찾지 못하면 404 페이지 또는 에러 JSON 반환.
- **Behavior (EN)**
  - Look up the long URL by code; if found, respond with an HTTP redirect, otherwise 404.

- **Response (Redirect)**:

```http
HTTP/1.1 302 Found
Location: https://example.com/some/very/long/path?utm=123
```

### (선택) 3) 통계 조회 (Analytics)

- **HTTP**: `GET /api/stats/:code`
- **Response**:

```json
{
  "code": "abc123",
  "longUrl": "https://example.com/...",
  "hitCount": 1234,
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

---

## 3. DB 스키마 (Database Schema)

### 단일 테이블 예시 (Single Table Example)

- **Table: `urls`**

| column       | type                | description                          |
|--------------|---------------------|--------------------------------------|
| id           | BIGINT (PK, auto)   | 내부용 숫자 PK (선택)                |
| code         | VARCHAR(16) (UNIQ)  | 짧은 코드 (예: `abc123`)             |
| long_url     | TEXT / VARCHAR      | 원본 긴 URL                           |
| created_at   | TIMESTAMP           | 생성 시각                             |
| hit_count    | BIGINT              | 리다이렉트된 횟수 (옵션)             |

- **KO 설명**
  - `code` 에 unique 인덱스 → `GET /:code` 조회를 빠르게.
  - `hit_count` 는 리다이렉트 시 `UPDATE` 하거나, 별도 로그 테이블에서 집계.

- **EN Explanation**
  - Unique index on `code` for fast lookups.
  - Optional `hit_count` for simple analytics.

---

## 4. 코드 생성 방식 (How to Generate Short Codes)

### 1) Auto-increment ID + Base62 인코딩

- **아이디어 (KO)**
  - DB 의 auto-increment `id` 를 가져와서 base62 (0-9, a-z, A-Z) 로 인코딩.
  - 예: `id = 12345` → `code = "dnh"` (예시).
  - **장점**: 충돌 없음, 구현 간단, 정렬/분산 쉬움.
- **Idea (EN)**
  - Use the numeric primary key and encode it as base62.
  - Simple, collision-free as long as IDs are unique.

### 2) 랜덤 문자열 (Random Code) + 충돌 체크

- **KO**
  - 길이 6~8자의 랜덤 base62 문자열 생성 → DB에서 존재 여부 확인 → 없으면 사용.
  - 트래픽이 매우 크지 않다면 간단히 구현 가능.
- **EN**
  - Generate random code, check for existence, retry on collision.

---

## 5. 리다이렉트 처리 플로우 (Redirect Flow)

1. 사용자가 `https://sho.rt/abc123` 요청 (브라우저에서 GET).
2. 서버가 `code = "abc123"` 를 파싱.
3. DB `urls` 테이블에서 `code` 로 `SELECT`.
4. **KO**
   - 결과 있으면: `hit_count` 증가 (옵션) 후, `302` 또는 `301` 응답과 함께 `Location: long_url` 헤더 전송.
   - 결과 없으면: 404.
5. **EN**
   - Found: increment metrics, return redirect.
   - Not found: 404 / error page.

---

## 6. 캐싱 & 성능 (Caching & Performance) – 간단 버전

### 한국어 (Korean)

- 자주 호출되는 `GET /:code` 에 대해:
  - **애플리케이션 레벨 캐시** (in-memory Map) 나 Redis 를 사용해 `code → longUrl` 매핑 캐시 가능.
  - 캐시 미스 시 DB 조회 → 캐시에 저장.
- 짧은 설계 문제에서는 "나중에 트래픽이 늘면 Redis 캐시를 추가" 정도만 언급해도 충분.

### English

- For hot codes, cache mappings in memory or Redis.
- On cache miss, hit the DB, then populate the cache.

---

## 7. 에러/유효성 처리 (Validation & Errors)

### 한국어 (Korean)

- `POST /api/shorten` 시:
  - `longUrl` 이 유효한 URL 인지 검증 (스킴 `http`/`https` 등).
  - 너무 긴 URL, 금지된 도메인(자기 자신 무한 루프) 등 필터.
- `GET /:code` 시:
  - 존재하지 않는 code → 404 페이지.

### English

- Validate `longUrl` format and possibly block certain domains.
- Return 404 for unknown codes.

---

## 8. 면접 포인트 (Interview Angle)

### 한국어 (Korean)

- 핵심적으로 설명할 요소:
  - **엔드포인트**: `POST /api/shorten`, `GET /:code`, (선택) `GET /api/stats/:code`.
  - **DB 스키마**: `urls(code, long_url, created_at, hit_count)` 와 `code` unique index.
  - **코드 생성 전략**: auto-increment + base62 vs 랜덤 문자열.
  - **리다이렉트 흐름**: 요청 → code 조회 → 301/302 + Location 헤더.
  - 확장 아이디어: 캐싱, rate limiting, 만료 정책, 커스텀 도메인.

### English

- Mention:
  - Minimal set of endpoints (shorten, redirect, stats).
  - Simple schema with a unique `code` column.
  - How you generate codes and avoid collisions.
  - Redirect response type (301 vs 302) and Location header.
  - Optional scalability: caching, sharding IDs, expiration.

---

## 9. 한 줄 요약 (Summary)

- **KO**: URL Shortener 는 `POST /api/shorten` 으로 longUrl→code 매핑을 만들고, `GET /:code` 요청 시 DB에서 code로 longUrl을 찾아 301/302 리다이렉트하는 간단한 서비스이며, 핵심은 **고유 코드 생성, (code, longUrl) 매핑을 담는 DB 스키마, 그리고 빠른 조회/리다이렉트 흐름**을 설계하는 것입니다.
- **EN**: A URL shortener maps long URLs to unique short codes via `POST /api/shorten` and handles `GET /:code` by looking up the code and issuing an HTTP redirect; the core design centers on code generation, a `(code, longUrl)` schema, and efficient lookups with optional caching and analytics.
