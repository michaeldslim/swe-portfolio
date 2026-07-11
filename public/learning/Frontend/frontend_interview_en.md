# Frontend Engineer Interview - Web Technology Questions and Answers

## HTML

### Q1: What are the key features of HTML5?
**A:** HTML5 has the following key features:
- Introduction of semantic tags (`<header>`, `<footer>`, `<article>`, `<section>`, etc.)
- Support for audio and video elements (`<audio>`, `<video>`)
- Canvas and SVG support
- Local storage and session storage
- Support for various APIs such as Web Workers, WebSockets, Geolocation API
- Mobile-friendly features

### Q2: What is semantic HTML and why is it important?
**A:** Semantic HTML is marking up content in a way that the tags clearly convey the meaning of the content. Instead of using `<div>` or `<span>`, it uses tags like `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>`, etc.

Importance:
- Improved accessibility: Assistive technologies like screen readers can better understand the content
- SEO optimization: Search engines can better determine the importance and relevance of content
- Enhanced code readability and maintainability
- Support for consistent display across different devices

### Q3: What is the role of DOCTYPE?
**A:** DOCTYPE (Document Type Declaration) is positioned at the beginning of an HTML document and informs the browser which version of HTML the document is written in. This allows the browser to render the document correctly.

DOCTYPE declaration for HTML5:
```html
<!DOCTYPE html>
```

Earlier versions of HTML used more complex DOCTYPE declarations.

## CSS

### Q1: Please explain the CSS box model.
**A:** The CSS box model defines the space that an HTML element occupies. It consists of four areas:

1. **Content**: The actual content area where text or images are displayed
2. **Padding**: The space between the content and the border
3. **Border**: The border that surrounds the padding
4. **Margin**: The space outside the border, providing spacing between elements

The calculation method of the box model can be changed through the `box-sizing` property:
- `content-box` (default): width and height include only the content area
- `border-box`: width and height include content, padding, and border

### Q2: Please explain the different values of the position property in CSS and their differences.
**A:** The CSS position property determines how an element is positioned in a document:

1. **static (default)**: Positioned according to the normal document flow. The top, right, bottom, and left properties do not apply
2. **relative**: Positioned according to the normal flow, then offset by the specified amount. Does not affect the layout of other elements
3. **absolute**: Positioned relative to the nearest positioned ancestor (non-static). If none exists, it's positioned relative to the initial containing block
4. **fixed**: Positioned relative to the viewport, so it doesn't move when scrolled
5. **sticky**: Toggles between relative and fixed depending on the scroll position

### Q3: How is CSS selector specificity calculated?
**A:** CSS selector specificity is calculated as follows:

1. **Inline styles** (1000 points)
2. **ID selectors** (#example) (100 points)
3. **Class selectors** (.example), attribute selectors ([type="text"]), pseudo-classes (:hover) (10 points)
4. **Element selectors** (div, p), pseudo-element selectors (::before) (1 point)

!important overrides all specificity and has the highest priority.

## JavaScript

### Q1: What are the differences between var, let, and const?
**A:**
- **var**: Function-scoped, initialized as undefined when hoisted, can be redeclared and reassigned
- **let**: Block-scoped, not initialized when hoisted (TDZ), cannot be redeclared, can be reassigned
- **const**: Block-scoped, not initialized when hoisted (TDZ), cannot be redeclared or reassigned (though properties of objects can be changed)

### Q2: What is the difference between event bubbling and event capturing?
**A:** These are two phases of event propagation:

- **Event Capturing**: The event starts from the top-most element and travels down to the element where the event occurred
- **Event Bubbling**: The event starts from the element where it occurred and bubbles up to the top-most element

By default, events are handled in the bubbling phase, but you can set the third parameter of addEventListener to true to handle events in the capturing phase.

```javascript
element.addEventListener('click', handler, true); // Capturing phase
element.addEventListener('click', handler, false); // Bubbling phase (default)
```

### Q3: What are the differences and advantages/disadvantages of Promises and async/await?
**A:** Both are methods for handling asynchronous operations:

**Promise**:
- Advantages: Handling sequential asynchronous operations through chaining, error handling
- Disadvantages: Code can become complex in complex asynchronous logic (not callback hell, but the then chain can get long)

**async/await**:
- Advantages: Improved readability with syntax similar to synchronous code, error handling with try/catch
- Disadvantages: Additional work needed for parallel processing (e.g., Promise.all)

async/await is syntactic sugar based on Promises, internally using Promises.

## Web Performance Optimization

### Q1: What are some methods to optimize web performance?
**A:** Web performance optimization methods:

1. **Resource Optimization**:
   - Image compression and use of appropriate formats (WebP, AVIF)
   - CSS/JS file minification and bundling
   - Code splitting and lazy loading
   - Tree shaking to remove unnecessary code

2. **Network Optimization**:
   - Using HTTP/2 or HTTP/3
   - Utilizing CDNs
   - Implementing browser caching strategies
   - Considering server-side rendering (SSR) or static site generation (SSG)

3. **Rendering Optimization**:
   - Optimizing the critical rendering path
   - Preventing unnecessary re-renders
   - Using transform/opacity instead of CSS animations
   - Implementing virtual scrolling

### Q2: What is the Critical Rendering Path?
**A:** The Critical Rendering Path is a series of steps the browser takes to process HTML, CSS, and JavaScript and render pixels on the screen:

1. **DOM Construction**: Parsing HTML to create the DOM tree
2. **CSSOM Construction**: Parsing CSS to create the CSSOM tree
3. **Render Tree Construction**: Combining DOM and CSSOM to create the render tree
4. **Layout (Reflow)**: Calculating the size and position of each element
5. **Painting**: The process of painting pixels on the screen

Optimization methods:
- Place CSS in the head and JavaScript at the end of the body
- Include critical CSS inline
- Use async/defer attributes
- Utilize media queries
- Delay unnecessary JavaScript execution

## Frontend Frameworks/Libraries

### Q1: What is the Virtual DOM in React and what are its advantages?
**A:** The Virtual DOM is a lightweight copy of the actual DOM that exists in memory as a JavaScript object. React works through the following process:

1. Creates a new Virtual DOM tree when state changes
2. Compares the previous Virtual DOM with the new one (Diffing)
3. Applies only the changed parts to the actual DOM (Reconciliation)

Advantages:
- Performance improvement by minimizing unnecessary DOM manipulations
- Development convenience through declarative API
- Cross-platform support (e.g., React Native)

### Q2: Please explain the state management methods in React.
**A:** State management methods in React:

1. **Local State**:
   - useState hook: State management in functional components
   - this.state: State management in class components

2. **Context API**:
   - createContext, useContext: Provides data throughout the component tree
   - Useful for solving Props Drilling problems

3. **External State Management Libraries**:
   - Redux: Predictable state container, unidirectional data flow
   - MobX: Based on reactive programming, reduces boilerplate code
   - Recoil: State management library designed for React
   - Zustand: Simple and lightweight state management solution

### Q3: What are the differences and advantages/disadvantages of SPA (Single Page Application) and MPA (Multi Page Application)?
**A:** Comparison of SPA and MPA:

**SPA (Single Page Application)**:
- Advantages: Fast user experience (after initial load), reduced server load, separation of frontend and backend
- Disadvantages: Initial load time can be longer, SEO optimization difficulties (can be resolved with SSR), possibility of memory leaks

**MPA (Multi Page Application)**:
- Advantages: Easy SEO optimization, fast initial page load, traditional web development approach
- Disadvantages: Entire page reload during page transitions, increased server load, high coupling between frontend and backend

## Web Security

### Q1: What is CORS (Cross-Origin Resource Sharing) and how does it work?
**A:** CORS is a security mechanism that allows resources from one origin (domain, protocol, port) to be accessed from another origin.

How it works:
1. The browser includes an Origin header when sending a request to a different origin
2. The server responds with an Access-Control-Allow-Origin header specifying allowed origins
3. The browser checks this header to determine the success/failure of the request

For non-simple requests (e.g., using PUT, DELETE methods, including certain headers), the browser first sends a preflight request (OPTIONS method) to check if the server allows the request.

### Q2: What are XSS (Cross-Site Scripting) and CSRF (Cross-Site Request Forgery) attacks and how can they be defended against?
**A:** Two major web security vulnerabilities:

**XSS (Cross-Site Scripting)**:
- Attack method: Inserting malicious scripts into web pages to be executed in users' browsers
- Defense methods:
  - Input data validation and output escaping
  - Setting Content-Security-Policy (CSP) headers
  - Using HttpOnly and Secure cookie flags
  - Utilizing automatic escaping features of frameworks like React and Vue

**CSRF (Cross-Site Request Forgery)**:
- Attack method: Making authenticated users perform actions unintentionally as intended by the attacker
- Defense methods:
  - Using CSRF tokens
  - Setting Same-Site cookie attributes
  - Referer checking
  - Requiring additional authentication for important actions

## Web Accessibility

### Q1: What is web accessibility and why is it important?
**A:** Web accessibility means making web content perceivable, understandable, navigable, and interactive for all users, including those with disabilities.

Importance:
- Providing equal access opportunities to all users
- Meeting legal requirements (many countries require accessibility compliance for public websites)
- Overall improvement of user experience
- Improvement of search engine optimization (SEO)
- Reaching a wider user base

### Q2: What is ARIA (Accessible Rich Internet Applications) and how is it used?
**A:** ARIA is a set of attributes that supplement HTML elements with accessibility features. It's mainly used to enhance the accessibility of dynamic content and JavaScript UI widgets.

Key ARIA attributes:
- **Roles**: Define the purpose of an element (e.g., `role="button"`, `role="navigation"`)
- **Properties**: Describe characteristics of an element (e.g., `aria-required="true"`, `aria-label="Search"`)
- **States**: Indicate the current state of an element (e.g., `aria-expanded="false"`, `aria-checked="true"`)

Usage example:
```html
<div role="button" aria-pressed="false" tabindex="0" onclick="toggleButton(this)">
  Toggle Button
</div>
```

## Latest Web Technology Trends

### Q1: What is a PWA (Progressive Web App) and what are its advantages?
**A:** A PWA is a web application that combines the advantages of web and native apps.

Key features and advantages:
- **Offline operation**: Works without a network through caching with Service Workers
- **Installable**: Can be added to the home screen, distributed without app stores
- **Responsive**: Adapts to various screen sizes and devices
- **Secure**: Requires secure connection through HTTPS
- **Push notifications**: Increases user engagement
- **Native app-like experience**: Full-screen mode, splash screen, etc.

### Q2: What is WebAssembly (WASM) and what is it used for?
**A:** WebAssembly is a binary instruction format that runs in browsers, allowing code written in languages like C, C++, and Rust to run on the web at near-native speed.

Key uses:
- High-performance games and graphics processing
- Video/audio editing tools
- CAD and 3D modeling applications
- Image recognition and machine learning
- Encryption and compression algorithms
- Web porting of existing C/C++ libraries

### Q3: What is JAMstack and what are its benefits?
**A:** JAMstack stands for JavaScript, API, and Markup, and is a web development architecture that utilizes static site generation and serverless architecture.

Key benefits:
- **Enhanced security**: Reduced attack surface
- **Improved performance**: Fast loading through static file serving
- **Scalability**: Easy worldwide deployment through CDNs
- **Developer experience**: Increased development efficiency through frontend and backend separation
- **Cost efficiency**: Cost reduction through serverless functions and static hosting
- **SEO friendly**: Fast loading times and pre-rendered content
