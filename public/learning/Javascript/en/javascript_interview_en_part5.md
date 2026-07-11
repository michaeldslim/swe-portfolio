# JavaScript Developer Interview Questions Part 5: Performance and Optimization

## Performance and Optimization

19. **Explain how to optimize JavaScript code performance.**
    - How can you prevent memory leaks?
    
    **Description:** JavaScript performance optimization involves various techniques to improve execution speed and memory usage. It's crucial to minimize DOM manipulations and use DocumentFragment to reduce reflows/repaints. In loops, cache array lengths, avoid unnecessary calculations, and use appropriate data structures (Map, Set). Memoization prevents repetitive calculations, and event delegation reduces the number of event listeners. To prevent memory leaks, avoid unnecessary global variables, properly remove event listeners, and be cautious of circular references. When using closures, minimize references to external variables, and set large data to null after use. Always clean up timers (setTimeout, setInterval), and use WeakMap and WeakSet to manage object references.
    
    **Example:**
    ```javascript
    // 1. Performance optimization techniques
    
    // Bad example: Repeated DOM access
    function badPerformance() {
      for (let i = 0; i < 1000; i++) {
        document.getElementById('myElement').innerHTML += 'Item ' + i + '<br>';
      }
    }
    
    // Good example: Using DocumentFragment
    function goodPerformance() {
      const fragment = document.createDocumentFragment();
      for (let i = 0; i < 1000; i++) {
        const item = document.createElement('div');
        item.textContent = 'Item ' + i;
        fragment.appendChild(item);
      }
      document.getElementById('myElement').appendChild(fragment);
    }
    
    // 2. Loop optimization
    
    // Bad example: Repeated calculations
    function slowLoop() {
      const arr = [];
      for (let i = 0; i < 10000; i++) {
        arr.push(i * i); // Repeated calculation
      }
    }
    
    // Good example: Avoiding repeated calculations
    function fastLoop() {
      const arr = [];
      const len = 10000;
      for (let i = 0; i < len; i++) { // Cached array length
        arr.push(i * i);
      }
    }
    
    // 3. Memory leak examples
    
    // Memory leak example 1: Unremoved event listeners
    function setupEvents() {
      const button = document.getElementById('myButton');
      button.addEventListener('click', function() {
        // References large data
        const largeData = new Array(10000000).fill('x');
        console.log('Button clicked, data size:', largeData.length);
      });
    }
    
    // Removing event listeners
    function cleanupEvents() {
      const button = document.getElementById('myButton');
      button.removeEventListener('click', handleClick);
    }
    
    function handleClick() {
      console.log('Button clicked');
    }
    
    // Memory leak example 2: Closures causing leaks
    function createLeakyClosures() {
      const leakyData = [];
      
      function leak() {
        const largeData = new Array(1000000).fill('leak');
        leakyData.push(function() {
          // Closure referencing largeData
          return largeData[0];
        });
      }
      
      for (let i = 0; i < 100; i++) {
        leak();
      }
    }
    
    // 4. Memoization for expensive calculations
    
    // Without memoization
    function fibonacci(n) {
      if (n <= 1) return n;
      return fibonacci(n - 1) + fibonacci(n - 2);
    }
    
    // With memoization
    function memoizedFibonacci() {
      const cache = {};
      
      return function fib(n) {
        if (n in cache) {
          return cache[n];
        }
        
        let result;
        if (n <= 1) {
          result = n;
        } else {
          result = fib(n - 1) + fib(n - 2);
        }
        
        cache[n] = result;
        return result;
      };
    }
    
    const memoizedFibonacci = memoizedFibonacci();
    
    console.time('Without memoization');
    fibonacci(35);
    console.timeEnd('Without memoization');
    
    console.time('With memoization');
    memoizedFibonacci(35);
    console.timeEnd('With memoization');
    
    // 5. Data structure optimization
    
    // Bad example: Finding items in an array
    function findItemInArray(array, item) {
      for (let i = 0; i < array.length; i++) {
        if (array[i] === item) return i;
      }
      return -1;
    }
    
    // Good example: Using objects (Map) for faster lookups
    function findItemWithMap(items) {
      const map = new Map();
      items.forEach((item, index) => {
        map.set(item, index);
      });
      
      return function(item) {
        return map.has(item) ? map.get(item) : -1;
      };
    }
    ```

20. **Explain the browser rendering process.**
    - What are reflow and repaint, and how can you minimize them?
    
    **Description:** The browser rendering process involves several steps: parsing HTML to create the DOM, parsing CSS to create the CSSOM, combining them into the render tree, calculating element positions (layout/reflow), and painting pixels to the screen. Reflow (or layout) occurs when the browser recalculates element positions and dimensions, triggered by changes to element size, content, or structure. Repaint happens when visual styles change without affecting layout. Reflows are more expensive than repaints as they require recalculating element geometry. To minimize these operations, batch DOM updates, use CSS classes instead of inline styles, avoid repeatedly accessing layout properties, use document fragments, and leverage CSS transforms and opacity for animations. Techniques like debouncing window resize handlers and using requestAnimationFrame for animations also help optimize rendering performance.
    
    **Example:**
    ```javascript
    // 1. Reflow and repaint examples
    
    // Causing repaint (only changes appearance)
    function causeRepaint() {
      const element = document.getElementById('myElement');
      // Color changes only trigger repaint
      element.style.color = 'red';
      element.style.backgroundColor = 'blue';
    }
    
    // Causing reflow (changes affecting layout)
    function causeReflow() {
      const element = document.getElementById('myElement');
      // Size or position changes trigger reflow
      element.style.width = '200px';
      element.style.height = '100px';
      element.style.margin = '10px';
      
      // Accessing properties that require layout calculation
      // forces synchronous reflow
      console.log(element.offsetHeight); // Forces reflow
      
      element.style.padding = '20px'; // Another reflow
      console.log(element.offsetWidth); // Another forced reflow
    }
    
    // 2. Minimizing reflows and repaints
    
    // Bad example: Multiple style changes causing multiple reflows
    function badStyleChanges() {
      const element = document.getElementById('myElement');
      element.style.width = '200px'; // Reflow
      element.style.height = '100px'; // Reflow
      element.style.margin = '10px'; // Reflow
      element.style.padding = '20px'; // Reflow
      element.style.border = '1px solid black'; // Reflow
    }
    
    // Good example 1: Batching style changes with classes
    function goodStyleChangesWithClass() {
      const element = document.getElementById('myElement');
      // Single reflow by adding a class that contains all style changes
      element.classList.add('new-styles');
    }
    
    // Good example 2: Using cssText
    function goodStyleChangesWithCssText() {
      const element = document.getElementById('myElement');
      element.style.cssText = 'width: 200px; height: 100px; margin: 10px; padding: 20px; border: 1px solid black;';
    }
    
    // Good example 3: Hide, modify, show
    function styleChangesWithHide() {
      const element = document.getElementById('myElement');
      // 1. Hide the element
      element.style.display = 'none';
      
      // 2. Apply multiple changes
      element.style.width = '200px';
      element.style.height = '100px';
      element.style.margin = '10px';
      element.style.padding = '20px';
      element.style.border = '1px solid black';
      
      // 3. Show the element again (only one reflow)
      element.style.display = 'block';
    }
    
    // Good example 4: Using DocumentFragment for multiple DOM changes
    function addItemsWithFragment() {
      const list = document.getElementById('myList');
      const fragment = document.createDocumentFragment();
      
      for (let i = 0; i < 100; i++) {
        const item = document.createElement('li');
        item.textContent = `Item ${i}`;
        fragment.appendChild(item);
      }
      
      // Add to DOM all at once
      list.appendChild(fragment);
    }
    
    // 3. Additional methods for rendering optimization
    
    // Using requestAnimationFrame
    function animateWithRAF() {
      const element = document.getElementById('myElement');
      let position = 0;
      
      function animate() {
        position += 5;
        element.style.transform = `translateX(${position}px)`;
        
        if (position < 300) {
          // Schedule the next frame
          requestAnimationFrame(animate);
        }
      }
      
      // Start animation
      requestAnimationFrame(animate);
    }
    
    // Using GPU-accelerated properties
    function useGPUAcceleration() {
      const element = document.getElementById('myElement');
      
      // GPU accelerated properties
      element.style.transition = 'transform 0.5s, opacity 0.5s';
      element.style.transform = 'translateX(100px)';
      element.style.opacity = '0.5';
    }
    ```

21. **What are Web Workers and when would you use them?**
    
    **Description:** Web Workers are a browser feature that allows JavaScript to run in background threads separate from the main execution thread. They enable true multi-threading in JavaScript, which is otherwise single-threaded. Web Workers can perform CPU-intensive tasks without blocking the UI, as they run independently from the main thread. However, they have limitations: they cannot directly access the DOM, window object, or parent variables, and communication with the main thread happens through message passing. There are three types: Dedicated Workers (used by a single script), Shared Workers (shared between multiple scripts/windows), and Service Workers (act as proxy servers for web applications). Web Workers are ideal for tasks like complex calculations, data processing, image/video manipulation, and background synchronization.
    
    **Example:**
    ```javascript
    // 1. Web Worker example
    
    // main.js (main thread)
    function startWebWorker() {
      // Create a web worker
      const worker = new Worker('worker.js');
      
      // Send message to worker
      worker.postMessage({
        command: 'start',
        data: { numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], iterations: 10000000 }
      });
      
      // Receive message from worker
      worker.onmessage = function(event) {
        console.log('Result from worker:', event.data);
        // Terminate worker when task is complete
        if (event.data.status === 'completed') {
          worker.terminate();
        }
      };
      
      // Handle worker errors
      worker.onerror = function(error) {
        console.error('Worker error:', error.message);
        worker.terminate();
      };
    }
    
    // worker.js (worker thread)
    // self refers to the worker itself
    self.onmessage = function(event) {
      const { command, data } = event.data;
      
      if (command === 'start') {
        const { numbers, iterations } = data;
        const result = performHeavyCalculation(numbers, iterations);
        
        // Send result back to main thread
        self.postMessage({
          status: 'completed',
          result: result
        });
      }
    };
    
    function performHeavyCalculation(numbers, iterations) {
      // Simulate CPU-intensive task
      let result = 0;
      for (let i = 0; i < iterations; i++) {
        for (let j = 0; j < numbers.length; j++) {
          result += Math.sqrt(numbers[j]) * Math.tan(numbers[j]);
        }
      }
      return result;
    }
    
    // 2. Web Worker use cases
    
    // Image processing
    function processImageWithWorker(imageData) {
      const worker = new Worker('image-processor.js');
      
      worker.postMessage({
        imageData: imageData,
        filter: 'grayscale'
      });
      
      worker.onmessage = function(event) {
        const processedImageData = event.data.processedImageData;
        displayProcessedImage(processedImageData);
        worker.terminate();
      };
    }
    
    // Data parsing
    function parseLogsWithWorker(logs) {
      const worker = new Worker('log-parser.js');
      
      worker.postMessage({
        logs: logs,
        options: { filterLevel: 'error', timeRange: [startDate, endDate] }
      });
      
      worker.onmessage = function(event) {
        updateDashboard(event.data.parsedLogs);
      };
    }
    
    // 3. SharedWorker example (shared between tabs/windows)
    
    // main.js
    function connectToSharedWorker() {
      const sharedWorker = new SharedWorker('shared-worker.js');
      
      // SharedWorker communicates through port
      sharedWorker.port.onmessage = function(event) {
        console.log('Message from shared worker:', event.data);
      };
      
      // Start communication
      sharedWorker.port.start();
      
      // Send message
      sharedWorker.port.postMessage({
        type: 'register',
        clientId: generateClientId()
      });
    }
    
    // shared-worker.js
    let connections = 0;
    const clients = new Map();
    
    // When a new connection starts
    self.onconnect = function(event) {
      const port = event.ports[0];
      connections++;
      
      port.onmessage = function(event) {
        const { type, clientId } = event.data;
        
        if (type === 'register') {
          clients.set(clientId, port);
          port.postMessage({
            type: 'registered',
            totalConnections: connections,
            message: `You are client #${connections}`
          });
          
          // Notify all clients about new connection
          broadcastMessage({
            type: 'newConnection',
            totalConnections: connections
          }, clientId);
        }
      };
      
      port.start();
    };
    
    function broadcastMessage(message, excludeClientId) {
      for (const [clientId, port] of clients.entries()) {
        if (clientId !== excludeClientId) {
          port.postMessage(message);
        }
      }
    }
    ```
