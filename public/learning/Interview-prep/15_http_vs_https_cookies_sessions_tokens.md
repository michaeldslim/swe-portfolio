# 15. HTTP vs HTTPS + 쿠키/세션/토큰 차이 정리

## 1. HTTP vs HTTPS

### HTTP

- **KO**
  - HyperText Transfer Protocol
  - 평문(plaintext)으로 데이터를 전송 → **중간에서 내용이 그대로 보일 수 있음 (도청, 변조 위험)**
  - 기본 포트: 80
- **EN**
  - HyperText Transfer Protocol
  - Data is sent in plain text → vulnerable to eavesdropping and tampering.
  - Default port: 80

### HTTPS

- **KO**
  - HTTP + TLS(SSL) = 암호화된 HTTP
  - 데이터가 **대칭키 암호화** 되어 전송 → 중간에서 내용을 보기 어렵고, 변조를 감지 가능
  - 서버 인증서(SSL 인증서)를 통해 **서버 인증 + 통신 기밀성 + 무결성** 보장
  - 기본 포트: 443
- **EN**
  - HTTP over TLS/SSL → encrypted HTTP.
  - Provides **confidentiality, integrity, and server authentication**.
  - Default port: 443.

### 면접 포인트 (Interview Points)

- 로그인/결제 등 **민감한 데이터 전송 시 HTTPS 필수**
- 요즘은 거의 모든 웹 서비스가 전체 트래픽을 HTTPS로 전환 (HSTS, HTTPS only 정책 등)

---

## 2. 쿠키(Cookie), 세션(Session), 토큰(Token) 비교

### 공통 목적 (Common Goal)

- 사용자의 **로그인 상태 유지**, 사용자별 상태(state)를 서버/클라이언트 사이에서 공유하기 위해 사용.

---

## 쿠키 (Cookie)

### 개념

- **KO**
  - 서버가 브라우저에게 저장하도록 지시하는 **작은 데이터 조각** (key-value)
  - 브라우저는 이후 같은 도메인으로의 요청마다 해당 쿠키를 **자동으로 함께 전송**
- **EN**
  - Small key-value data stored by the browser at the server’s request.
  - Automatically sent with every request to the same domain (subject to path, domain, secure, httpOnly flags).

### 특징 (Features)

- 만료 시간, 도메인, 경로 설정 가능
- `Secure`, `HttpOnly`, `SameSite` 등의 속성으로 보안/동작 제어

---

## 세션 (Session)

### 개념

- **KO**
  - 서버 쪽에서 유지하는 **사용자 상태 정보** (예: 로그인 정보, 장바구니 등)
  - 보통 `세션 ID` 를 쿠키에 담아 클라이언트에 전달하고, 서버는 이 ID를 키로 세션 저장소에서 사용자 상태를 찾음
- **EN**
  - Server-side storage for user-specific state (e.g., logged-in user, cart).
  - Typically, a **session ID** is stored in a cookie; the server uses it to look up the session data.

### 특징

- 상태는 서버 메모리/DB/캐시(Redis 등)에 저장
- 서버 입장에서는 세션 개수만큼 메모리/스토리지 사용

---

## 토큰 (Token)

### 개념

- **KO**
  - 보통 **서버가 발급하는 서명된 문자열** (예: JWT), 클라이언트가 이 토큰을 가지고 있다가 인증이 필요한 요청에 포함시킴
  - 토큰 자체에 필요한 정보(사용자 ID, 만료 시간, 권한 등)를 담을 수 있음
- **EN**
  - Usually a **signed token** (e.g., JWT) issued by the server.
  - The client sends it with each request (often in the `Authorization` header).
  - The token can contain claims such as user ID, expiration, roles, etc.

### 특징

- 서버는 토큰을 검증(서명, 만료 시간 등)만 하면 되고, 필수 상태를 토큰 안에 담아서 **서버 측 세션을 줄일 수 있음(stateless)**
- 주로 **SPA + API 서버**, 모바일 앱과의 통신 등에서 많이 사용

---

## 비교 요약 (Summary Table)

| 항목 / Item          | 쿠키 (Cookie)                                            | 세션 (Session)                                             | 토큰 (Token, e.g., JWT)                                  |
|----------------------|----------------------------------------------------------|------------------------------------------------------------|----------------------------------------------------------|
| 저장 위치            | 브라우저(클라이언트)                                    | 서버(메모리/DB/캐시)                                      | 클라이언트 (쿠키/로컬스토리지/메모리 등)                |
| 전송 방식            | 브라우저가 자동으로 헤더에 첨부                         | 세션 ID를 쿠키 등으로 전송                                | 클라이언트가 주로 `Authorization` 헤더 등에 수동 첨부  |
| 상태 저장 주체       | 클라이언트                                              | 서버                                                       | 주로 서버는 상태를 적게, 토큰에 정보 내장              |
| 장점                 | 자동 전송, 표준화                                       | 서버가 상태를 관리하므로 제어 쉬움                        | 서버 확장성 좋음, 다른 도메인/서비스 간 사용 용이      |
| 단점                 | XSS/CSRF 공격시 악용 가능 (보안 설정 필수)             | 서버 메모리/저장소 부담, 수평 확장시 세션 공유 필요       | 토큰 탈취 시 위험, 토큰 폐기가 어려울 수 있음          |

---

## 면접에서 말하기 좋은 흐름 (How to Answer in an Interview)

1. **HTTP vs HTTPS**
   - HTTP는 평문, HTTPS는 TLS를 통한 암호화/무결성/서버 인증 제공
2. **쿠키**
   - 클라이언트 저장, 자동 전송, 로그인 세션 ID 등을 담는 데 사용
3. **세션**
   - 서버가 사용자 상태를 관리, 세션 ID를 쿠키로 전송하는 패턴 설명
4. **토큰**
   - JWT 등 서명된 토큰, 서버는 토큰만 검증하면 되어 **stateless 인증** 가능

---

## 요약 (Summary)

- **KO**: HTTP는 평문 통신, HTTPS는 TLS로 암호화된 HTTP입니다. 로그인 상태 유지를 위해 보통 쿠키에 세션 ID를 저장하고, 서버는 세션으로 상태를 관리하거나, JWT 같은 토큰으로 stateless 인증을 구현하기도 합니다.
- **EN**: HTTP is plain-text, while HTTPS is HTTP over TLS providing encryption and integrity. For authentication and state, we commonly use cookies (often carrying a session ID for server-side sessions) or tokens like JWT for more stateless, API-friendly authentication.
