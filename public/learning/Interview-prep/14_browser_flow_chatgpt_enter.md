# 14. 브라우저 주소창에 `chatgpt.com` 입력 → 엔터 흐름 / What Happens When You Type `chatgpt.com` and Press Enter

## 질문 (Question)

- **KO**: "브라우저 주소창에 `chatgpt.com` 을 입력하고 엔터를 눌렀을 때, 내부에서 어떤 일이 일어나는지 최대한 자세히 설명해 주세요."
- **EN**: "Describe in detail what happens inside the system when you type `chatgpt.com` in the browser’s address bar and press Enter."

---

## 큰 흐름 개요 (High-level Overview)

1. **입력 분석 (URL Parsing)**
2. **브라우저 캐시/OS/DNS 를 통한 도메인 → IP 주소 조회 (DNS Resolution)**
3. **TCP 연결 수립 (3-way handshake)**
4. **TLS/HTTPS 핸드셰이크 (암호화 설정)**
5. **HTTP(S) 요청 전송 (Request)**
6. **서버 처리 후 HTTP(S) 응답(Response)**
7. **브라우저 렌더링 파이프라인 (HTML, CSS, JS, Paint)**

---

## 1. URL 해석 (URL Parsing)

### KO

- 사용자가 주소창에 `chatgpt.com` 을 입력하고 엔터를 누르면, 브라우저는 이를 URL로 해석합니다.
  - 스킴(schema)이 없으므로 기본적으로 `https://chatgpt.com/` 으로 간주
- 브라우저는 방문 기록, 자동완성, 검색 엔진 설정 등을 보고 **검색어인지, URL인지**를 판단합니다.

### EN

- When you type `chatgpt.com` and press Enter, the browser interprets it as a URL.
  - Without an explicit scheme, it usually assumes `https://chatgpt.com/`.
- The browser may consult history and search engine configuration to decide whether to treat it as a direct URL or a search query.

---

## 2. DNS 조회 (DNS Resolution)

### KO

브라우저는 `chatgpt.com` 의 IP 주소를 알아야 합니다.

1. **캐시 확인**
   - 브라우저 DNS 캐시 → OS 캐시 → 라우터/ISP 캐시 순으로 확인
2. **없으면 DNS 서버에 질의**
   - OS가 설정된 DNS 서버(예: 8.8.8.8, ISP DNS)에 `chatgpt.com` 의 A/AAAA 레코드 요청
   - DNS 서버가 루트 → TLD(`.com`) → 권한 있는 네임서버(authoritative NS)를 따라가며 IP 주소 획득

### EN

1. **Check caches** (browser, OS, router, ISP).
2. If not cached, the OS queries the configured DNS server, which may recursively resolve `chatgpt.com` by contacting root, TLD, and authoritative name servers to get the IP.

---

## 3. TCP 연결 수립 (TCP 3-way Handshake)

### KO

- 브라우저/OS는 얻은 IP와 포트 443(HTTPS 기본 포트)에 대해 TCP 연결을 시도합니다.
- 3-way handshake
  1. 클라이언트 → 서버: `SYN`
  2. 서버 → 클라이언트: `SYN-ACK`
  3. 클라이언트 → 서버: `ACK`
- 이 과정을 통해 양쪽이 연결 매개변수(시퀀스 번호 등)에 합의하고, 안정적인 스트림 기반 연결이 열립니다.

### EN

- The client performs a TCP 3-way handshake with the server’s IP on port 443:
  1. Client → Server: `SYN`
  2. Server → Client: `SYN-ACK`
  3. Client → Server: `ACK`
- After this, a reliable byte-stream connection is established.

---

## 4. TLS 핸드셰이크 (HTTPS Handshake)

### KO

- HTTPS이므로, TCP 위에서 **TLS(SSL)** 핸드셰이크를 진행합니다.
- 주요 단계 요약
  - 클라이언트가 지원 가능한 암호 스위트, TLS 버전 등을 제안
  - 서버가 사용할 암호 스위트 선택, **서버 인증서(SSL 인증서)** 전송
  - 클라이언트는 OS/브라우저에 내장된 CA 목록을 이용해 인증서가 **유효한 CA에 의해 서명**되었는지 검증
  - 키 교환(ECDHE 등)을 통해 대칭 키를 안전하게 합의
- 이후 요청/응답은 **대칭 키로 암호화**되어 전송됩니다.

### EN

- Over the TCP connection, the client and server perform a TLS handshake:
  - Client sends supported cipher suites, TLS versions, etc.
  - Server responds with chosen cipher suite and its certificate.
  - Client validates the certificate using trusted CAs.
  - They perform a key exchange (e.g., ECDHE) and agree on a symmetric key.
- All HTTP traffic is then encrypted using the negotiated symmetric key.

---

## 5. HTTP 요청 전송 (HTTP Request)

### KO

브라우저는 이제 암호화된 채널 위에서 HTTP 요청을 보냅니다. 예)

```http
GET / HTTP/1.1
Host: chatgpt.com
User-Agent: <browser-info>
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7
Connection: keep-alive
...
```

- 이 요청은 TLS로 암호화된 상태로 전송되며, 중간자는 내용을 볼 수 없습니다(도메인 등 일부 메타데이터 제외).

### EN

- The browser sends an encrypted HTTP request (e.g., `GET / HTTP/1.1` with headers like `Host`, `User-Agent`, etc.).
- Because of TLS, intermediaries cannot see the request body or most headers.

---

## 6. 서버 처리 및 HTTP 응답 (Server Processing & HTTP Response)

### KO

- 서버(또는 로드밸런서, 리버스 프록시)는 요청을 받아 백엔드 애플리케이션으로 전달합니다.
- 애플리케이션은 라우팅, 인증, 비즈니스 로직 처리 후 HTML/JSON 등을 응답으로 생성합니다.

```http
HTTP/1.1 200 OK
Content-Type: text/html; charset=utf-8
Content-Length: ...
Set-Cookie: ...
...

<html>...
```

- 이 응답도 TLS로 암호화되어 클라이언트로 전송됩니다.

### EN

- The server (or reverse proxy/load balancer) forwards the request to the appropriate backend service.
- The backend runs business logic and returns a response, typically HTML, JSON, etc., which is then encrypted and sent back.

---

## 7. 브라우저 렌더링 파이프라인 (Browser Rendering Pipeline)

### KO

1. **HTML 파싱 → DOM 트리 생성**
2. **CSS 파싱 → CSSOM 트리 생성**
3. DOM + CSSOM → **렌더 트리(Render Tree)** 생성
4. **레이아웃(Layout)**: 각 요소의 위치/크기 계산
5. **페인트(Paint) & 컴포지팅(Compositing)**: 픽셀로 그리기
6. **JS 실행**
   - `<script>` 태그, 번들 JS 파일 실행
   - DOM 조작, 이벤트 리스너 등록, API 호출 등 수행

### EN

1. Parse HTML → build DOM tree.
2. Parse CSS → build CSSOM.
3. Combine DOM + CSSOM → render tree.
4. Layout: compute positions and sizes.
5. Paint & composite to draw pixels.
6. Execute JavaScript, manipulate DOM, attach event listeners, call APIs, etc.

---

## 요약 한 문장 (One-sentence Summary)

- **KO+EN**: `chatgpt.com` 입력 후 엔터를 누르면 브라우저가 URL을 해석하고 DNS로 IP를 찾은 뒤 TCP/TLS 연결을 맺어 HTTP 요청·응답을 주고받고, 받은 HTML/CSS/JS를 파싱·렌더링하여 화면에 그립니다 / After you press Enter on `chatgpt.com`, the browser resolves the domain via DNS, establishes a TCP/TLS connection, exchanges encrypted HTTP requests and responses, then parses and renders the returned HTML/CSS/JS to display the page.
