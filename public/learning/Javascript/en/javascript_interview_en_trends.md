# JavaScript Developer Interview Questions (Latest Trends)

## Latest Trends

29. **What are the advantages of TypeScript and how does it differ from JavaScript?**

    TypeScript is a superset of JavaScript that adds a static type system to enhance code stability and readability. JavaScript is a dynamically typed language where type errors can occur at runtime, but TypeScript detects type errors at compile time, preventing bugs in advance.
    
    **Advantages:**
    - Type safety and bug prevention
    - Enhanced IDE support (code auto-completion, refactoring, etc.)
    - Advanced type features like interfaces and generics
    - Better code documentation
    
    **Disadvantages:**
    - Additional compilation step required
    - Learning curve
    - Complexity of setup and configuration

    **Example:**
    ```typescript
    // JavaScript
    function add(a, b) {
      return a + b; // Concatenates if strings, adds if numbers
    }
    
    console.log(add(5, 3)); // 8
    console.log(add("5", "3")); // "53" (unintended result)
    
    // TypeScript
    function addTS(a: number, b: number): number {
      return a + b; // Type safety guaranteed
    }
    
    console.log(addTS(5, 3)); // 8
    // console.log(addTS("5", "3")); // Compilation error
    ```

30. **What are Web Components and what are their benefits?**

    Web Components are a set of web platform APIs that allow you to create reusable custom HTML elements. The key technologies include Custom Elements, Shadow DOM, HTML Templates, and ES Modules.
    
    **Advantages:**
    - Framework independence (can be used with any framework)
    - Encapsulated styles and markup (Shadow DOM)
    - Reusability and extensibility
    - Browser-native technology
    
    **Disadvantages:**
    - Lack of state management features
    - Polyfills needed for older browsers
    - Less ecosystem and tooling support compared to React, Vue, etc.

    **Example:**
    ```javascript
    // Creating a custom element
    class UserCard extends HTMLElement {
      constructor() {
        super();
        
        // Create Shadow DOM
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
            <h3>User: <slot name="username"></slot></h3>
            <div><slot name="email"></slot></div>
            <button id="details">Details</button>
          </div>
        `;
        
        this.shadowRoot.querySelector('#details')
          .addEventListener('click', () => this.showDetails());
      }
      
      showDetails() {
        alert('Showing details');
      }
    }
    
    // Register the element
    customElements.define('user-card', UserCard);
    
    // Usage in HTML
    // <user-card>
    //   <span slot="username">John Doe</span>
    //   <span slot="email">john@example.com</span>
    // </user-card>
    ```

31. **Explain the relationship between Serverless architecture and JavaScript.**

    Serverless architecture is a cloud computing model that allows developers to focus on functions rather than managing server infrastructure. JavaScript/Node.js is one of the most widely used languages in serverless environments.
    
    **Advantages:**
    - Reduced infrastructure management burden
    - Automatic scalability (scales automatically with requests)
    - Usage-based cost model (pay for execution time)
    - Rapid deployment and shortened development cycles
    
    **Disadvantages:**
    - Cold start latency
    - Vendor lock-in
    - Execution time limits (typically 5-15 minutes)
    - Debugging complexity

    **Example:**
    ```javascript
    // AWS Lambda function example (Node.js)
    exports.handler = async (event) => {
      try {
        // Parse request
        const body = JSON.parse(event.body || '{}');
        const { name } = body;
        
        // Business logic
        if (!name) {
          return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Name is required' })
          };
        }
        
        // Process data (e.g., save to database, call another service)
        // ...
        
        // Return response
        return {
          statusCode: 200,
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

32. **What is a Progressive Web App (PWA) and what are its benefits?**

    A Progressive Web App (PWA) is a web application built with web technologies but provides a user experience similar to native apps. It utilizes technologies like Service Workers, Web App Manifest, and HTTPS.
    
    **Advantages:**
    - Works offline or with poor network connectivity
    - Installable on the home screen without app store
    - Fast loading and smooth performance
    - Push notifications
    - Responsive design for all device types
    - Lower development and maintenance costs compared to native apps
    
    **Disadvantages:**
    - Limited access to device features compared to native apps
    - iOS support is more limited than Android
    - Battery consumption can be higher than native apps

    **Example:**
    ```javascript
    // manifest.json
    {
      "name": "My PWA App",
      "short_name": "PWA",
      "start_url": "/index.html",
      "display": "standalone",
      "background_color": "#ffffff",
      "theme_color": "#2196F3",
      "icons": [
        {
          "src": "/images/icon-192.png",
          "sizes": "192x192",
          "type": "image/png"
        },
        {
          "src": "/images/icon-512.png",
          "sizes": "512x512",
          "type": "image/png"
        }
      ]
    }
    
    // Register service worker
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then(registration => {
            console.log('Service Worker registered:', registration);
          })
          .catch(error => {
            console.error('Service Worker registration failed:', error);
          });
      });
    }
    
    // sw.js (Service Worker file)
    const CACHE_NAME = 'my-pwa-cache-v1';
    const urlsToCache = [
      '/',
      '/index.html',
      '/styles/main.css',
      '/scripts/app.js'
    ];
    
    // Install event - cache resources
    self.addEventListener('install', event => {
      event.waitUntil(
        caches.open(CACHE_NAME)
          .then(cache => cache.addAll(urlsToCache))
      );
    });
    
    // Fetch event - use cached resources
    self.addEventListener('fetch', event => {
      event.respondWith(
        caches.match(event.request)
          .then(response => response || fetch(event.request))
      );
    });
    ```

33. **What is a Monorepo and what are its benefits for JavaScript/TypeScript projects?**

    A Monorepo (monolithic repository) is a version control strategy where multiple projects or packages are stored in a single repository. Tools like Nx, Turborepo, Lerna, and pnpm workspaces are commonly used to manage JavaScript/TypeScript monorepos.
    
    **Advantages:**
    - Simplified dependency management
    - Code sharing and reuse across projects
    - Atomic commits across multiple packages
    - Coordinated versioning and releases
    - Centralized configuration and tooling
    - Simplified CI/CD setup
    
    **Disadvantages:**
    - Increased repository size
    - Potential performance issues with large repos
    - Steeper learning curve for new team members
    - More complex initial setup

    **Example:**
    ```javascript
    // package.json (root)
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
    
    // turbo.json (Turborepo configuration)
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
    
    // packages/ui/package.json (shared UI library)
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
    
    // packages/utils/package.json (shared utilities library)
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
    
    // apps/web/package.json (web application)
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
    
    // apps/mobile/package.json (mobile application)
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
    
    // Shared component usage example
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
    
    // Using in web application
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
    
    // Using in mobile application
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
