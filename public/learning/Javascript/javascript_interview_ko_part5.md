# JavaScript 개발자 인터뷰 질문 Part 5: 성능과 최적화

## 성능과 최적화

19. **JavaScript 코드의 성능을 최적화하는 방법에 대해 설명해주세요.**
    - 메모리 누수(Memory Leak)를 방지하는 방법은 무엇인가요?
    
    **설명:** JavaScript 코드의 성능 최적화는 실행 속도와 메모리 사용량을 개선하는 다양한 기법을 포함합니다. DOM 조작을 최소화하고 DocumentFragment를 사용하여 리플로우/리페인트를 줄이는 것이 중요합니다. 루프에서는 배열 길이를 캐싱하고, 불필요한 계산을 피하며, 적절한 데이터 구조(Map, Set)를 사용해야 합니다. 메모이제이션을 통해 반복 계산을 방지하고, 이벤트 위임으로 이벤트 리스너 수를 줄이는 것도 효과적입니다. 메모리 누수를 방지하기 위해서는 불필요한 전역 변수를 피하고, 이벤트 리스너를 적절히 제거하며, 순환 참조를 주의해야 합니다. 클로저 사용 시 외부 변수 참조를 최소화하고, 대용량 데이터는 사용 후 null 처리하는 것이 좋습니다. 또한 타이머(setTimeout, setInterval)를 사용 후 반드시 정리하고, WeakMap과 WeakSet을 활용하여 객체 참조를 관리하는 것이 중요합니다.

    **Description:** JavaScript performance optimization involves various techniques to improve execution speed and memory usage. It's crucial to minimize DOM manipulations and use DocumentFragment to reduce reflows/repaints. In loops, cache array lengths, avoid unnecessary calculations, and use appropriate data structures (Map, Set). Memoization prevents repetitive calculations, and event delegation reduces the number of event listeners. To prevent memory leaks, avoid unnecessary global variables, properly remove event listeners, and be cautious of circular references. When using closures, minimize references to external variables, and set large data to null after use. Always clean up timers (setTimeout, setInterval), and use WeakMap and WeakSet to manage object references.
    
    **예시:**
    ```javascript
    // 1. 성능 최적화 방법
    
    // 나쁜 예: DOM 접근 반복
    function badPerformance() {
      for (let i = 0; i < 1000; i++) {
        document.getElementById('myElement').innerHTML += 'Item ' + i + '<br>';
      }
    }
    
    // 좋은 예: 도큐먼트 프래그먼트 사용
    function goodPerformance() {
      const fragment = document.createDocumentFragment();
      for (let i = 0; i < 1000; i++) {
        const item = document.createElement('div');
        item.textContent = 'Item ' + i;
        fragment.appendChild(item);
      }
      document.getElementById('myElement').appendChild(fragment);
    }
    
    // 2. 루프 최적화
    
    // 나쁜 예: 반복되는 계산
    function slowLoop() {
      const arr = [];
      for (let i = 0; i < 10000; i++) {
        arr.push(i * i); // 반복되는 계산
      }
    }
    
    // 좋은 예: 반복되는 계산 피하기
    function fastLoop() {
      const arr = [];
      const len = 10000;
      for (let i = 0; i < len; i++) { // 배열 길이 캡쳐
        arr.push(i * i);
      }
    }
    
    // 3. 메모리 누수 예시
    
    // 메모리 누수 예시 1: 삭제되지 않는 이벤트 리스너
    function setupEvents() {
      const button = document.getElementById('myButton');
      button.addEventListener('click', function() {
        // 큰 데이터 참조
        const largeData = new Array(10000000).fill('x');
        console.log('Button clicked, data size:', largeData.length);
      });
    }
    
    // 이벤트 리스너 제거
    function cleanupEvents() {
      const button = document.getElementById('myButton');
      button.removeEventListener('click', handleClick);
    }
    
    function handleClick() {
      console.log('Button clicked');
    }
    
    // 메모리 누수 예시 2: 클로저에 의한 누수
    function createLeakyClosures() {
      const leakyData = [];
      
      function leak() {
        const largeData = new Array(1000000).fill('leak');
        leakyData.push(function() {
          // largeData를 참조하는 클로저
          return largeData[0];
        });
      }
      
      for (let i = 0; i < 100; i++) {
        leak();
      }
      
      return leakyData;
    }
    
    // 4. 성능 최적화 기법
    
    // 메모이제이션(Memoization) 예시
    function memoize(fn) {
      const cache = {};
      return function(...args) {
        const key = JSON.stringify(args);
        if (cache[key]) {
          console.log('Cache hit');
          return cache[key];
        }
        console.log('Cache miss');
        const result = fn.apply(this, args);
        cache[key] = result;
        return result;
      };
    }
    
    // 피보나치 함수
    function fibonacci(n) {
      if (n <= 1) return n;
      return fibonacci(n - 1) + fibonacci(n - 2);
    }
    
    // 메모이제이션 적용
    const memoizedFibonacci = memoize(fibonacci);
    
    console.time('Without memoization');
    fibonacci(35);
    console.timeEnd('Without memoization');
    
    console.time('With memoization');
    memoizedFibonacci(35);
    console.timeEnd('With memoization');
    
    // 5. 데이터 구조 최적화
    
    // 나쁜 예: 배열에서 항목 찾기
    function findItemInArray(array, item) {
      for (let i = 0; i < array.length; i++) {
        if (array[i] === item) return i;
      }
      return -1;
    }
    
    // 좋은 예: 객체(Map)를 사용하여 빠르게 찾기
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

20. **브라우저 렌더링 과정에 대해 설명해주세요.**
    - 리플로우(Reflow)와 리페인트(Repaint)란 무엇이며 어떻게 최소화할 수 있나요?
    
    **설명:** 브라우저 렌더링 과정은 HTML과 CSS를 화면에 표시하는 단계적 과정입니다. 먼저 HTML을 파싱하여 DOM(Document Object Model) 트리를 생성하고, CSS를 파싱하여 CSSOM(CSS Object Model) 트리를 만듭니다. 이 두 트리를 결합하여 렌더 트리를 구성하고, 각 요소의 정확한 위치와 크기를 계산하는 레이아웃(리플로우) 단계를 거칩니다. 그 후 픽셀로 변환하는 페인팅 과정을 통해 화면에 표시됩니다. 리플로우는 요소의 크기나 위치가 변경될 때 발생하는 계산 과정으로, 레이아웃 재계산이 필요합니다. 리페인트는 색상, 배경 등 시각적 속성만 변경될 때 발생하며, 리플로우보다 비용이 적습니다. 이를 최소화하기 위해 여러 DOM 변경을 일괄 처리하고, CSS 클래스나 cssText를 사용하여 스타일 변경을 한 번에 적용하며, 요소를 숨긴 상태에서 변경 후 다시 표시하는 방법이 효과적입니다. 또한 position: absolute/fixed 요소는 다른 요소에 영향을 덜 주므로 애니메이션에 적합하며, transform과 opacity 같은 GPU 가속 속성을 활용하고, requestAnimationFrame을 사용하여 애니메이션을 최적화할 수 있습니다.

    **Description:** Browser rendering is a step-by-step process of displaying HTML and CSS on screen. First, HTML is parsed to create the DOM (Document Object Model) tree, and CSS is parsed to create the CSSOM (CSS Object Model) tree. These trees are combined to form the render tree, followed by the layout (reflow) stage where exact positions and sizes of elements are calculated. Finally, the painting process converts everything to pixels for display. Reflow occurs when element dimensions or positions change, requiring layout recalculation. Repaint happens when only visual properties like color or background change, which is less costly than reflow. To minimize these operations, batch DOM changes, use CSS classes or cssText to apply style changes at once, and hide elements before making changes then show them again. Elements with position: absolute/fixed affect other elements less, making them suitable for animations. Utilize GPU-accelerated properties like transform and opacity, and use requestAnimationFrame to optimize animations.
    
    **예시:**
    ```javascript
    // 1. 리플로우와 리페인트 예시
    
    // 리페인트만 발생하는 예시 (레이아웃에 영향을 주지 않는 스타일 변경)
    function causeRepaint() {
      const element = document.getElementById('myElement');
      // 색상 변경은 리페인트만 발생
      element.style.color = 'red';
      element.style.backgroundColor = 'blue';
    }
    
    // 리플로우를 발생시키는 예시 (레이아웃에 영향을 주는 스타일 변경)
    function causeReflow() {
      const element = document.getElementById('myElement');
      // 크기나 위치 변경은 리플로우 발생
      element.style.width = '200px';
      element.style.height = '100px';
      element.style.position = 'absolute';
      element.style.top = '50px';
      element.style.left = '100px';
    }
    
    // 2. 리플로우와 리페인트 최소화 방법
    
    // 나쁜 예: 여러 스타일을 개별적으로 변경
    function badStyleChanges() {
      const element = document.getElementById('myElement');
      element.style.width = '200px';
      element.style.height = '100px';
      element.style.margin = '10px';
      element.style.padding = '20px';
      element.style.border = '1px solid black';
      // 각 스타일 변경마다 리플로우가 발생할 수 있음
    }
    
    // 좋은 예 1: CSS 클래스 사용
    function goodStyleChangesWithClass() {
      const element = document.getElementById('myElement');
      // 한 번에 모든 스타일 변경 적용
      element.className = 'new-style';
    }
    
    // 좋은 예 2: cssText 사용
    function goodStyleChangesWithCssText() {
      const element = document.getElementById('myElement');
      element.style.cssText = 'width: 200px; height: 100px; margin: 10px; padding: 20px; border: 1px solid black;';
    }
    
    // 좋은 예 3: 화면에서 숨기고 변경
    function styleChangesWithHide() {
      const element = document.getElementById('myElement');
      // 1. 요소를 숨김
      element.style.display = 'none';
      
      // 2. 여러 변경 적용
      element.style.width = '200px';
      element.style.height = '100px';
      element.style.margin = '10px';
      element.style.padding = '20px';
      element.style.border = '1px solid black';
      
      // 3. 요소를 다시 표시
      element.style.display = 'block';
    }
    
    // 좋은 예 4: DocumentFragment 사용
    function addManyItemsWithFragment() {
      const list = document.getElementById('myList');
      const fragment = document.createDocumentFragment();
      
      for (let i = 0; i < 1000; i++) {
        const item = document.createElement('li');
        item.textContent = `Item ${i}`;
        fragment.appendChild(item);
      }
      
      // 한 번에 DOM에 추가
      list.appendChild(fragment);
    }
    
    // 3. 렌더링 최적화를 위한 추가 방법
    
    // requestAnimationFrame 사용
    function animateWithRAF() {
      const element = document.getElementById('myElement');
      let position = 0;
      
      function animate() {
        position += 5;
        element.style.transform = `translateX(${position}px)`;
        
        if (position < 600) {
          // 다음 프레임에 애니메이션 업데이트
          requestAnimationFrame(animate);
        }
      }
      
      requestAnimationFrame(animate);
    }
    
    // transform과 opacity 사용 (성능이 좋은 속성)
    function performantAnimation() {
      const element = document.getElementById('myElement');
      
      // GPU 가속을 사용하는 속성들
      element.style.transition = 'transform 0.5s, opacity 0.5s';
      element.style.transform = 'translateX(100px)';
      element.style.opacity = '0.5';
    }
    ```

21. **웹 워커(Web Worker)란 무엇이며 어떤 상황에서 사용하나요?**
    
    **설명:** 웹 워커는 브라우저에서 백그라운드 스레드에서 스크립트를 실행할 수 있게 해주는 기술입니다. 메인 스레드와 별도로 동작하기 때문에, 복잡한 계산이나 데이터 처리를 수행하면서도 UI의 응답성을 유지할 수 있습니다. 웹 워커는 메인 스레드와 메시지 교환 방식으로 통신하며, DOM에 직접 접근할 수 없고 일부 Window 객체의 메서드와 속성만 사용할 수 있습니다. 주로 CPU 집약적인 작업(복잡한 계산, 암호화, 데이터 처리), 대용량 데이터 처리, 실시간 데이터 처리(오디오/비디오 처리, 이미지 필터링), 백그라운드 동기화, 주기적인 폴링 작업 등에 적합합니다. 웹 워커에는 전용 워커(Dedicated Worker)와 공유 워커(Shared Worker)가 있으며, 공유 워커는 여러 브라우저 컨텍스트(탭, 창)에서 공유할 수 있습니다. 웹 워커를 사용하면 멀티코어 CPU를 활용하여 JavaScript 애플리케이션의 성능을 향상시킬 수 있지만, 메시지 전달 오버헤드와 메모리 사용량 증가라는 단점도 있습니다.

    **Description:** Web Workers are a technology that allows scripts to run in background threads in the browser. Since they operate separately from the main thread, they can perform complex calculations or data processing while maintaining UI responsiveness. Web Workers communicate with the main thread through message exchange and cannot directly access the DOM, with limited access to Window object methods and properties. They're ideal for CPU-intensive tasks (complex calculations, encryption, data processing), large data processing, real-time data processing (audio/video processing, image filtering), background synchronization, and periodic polling tasks. There are two types: Dedicated Workers (used by a single script) and Shared Workers (shared across multiple browser contexts like tabs or windows). Web Workers enable JavaScript applications to leverage multi-core CPUs for improved performance, though they come with drawbacks like message passing overhead and increased memory usage.
    
    **예시:**
    ```javascript
    // 1. 웹 워커 사용 예시
    
    // main.js (메인 스레드)
    function startWebWorker() {
      // 웹 워커 생성
      const worker = new Worker('worker.js');
      
      // 워커에게 메시지 전송
      worker.postMessage({
        command: 'start',
        data: { numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], iterations: 10000000 }
      });
      
      // 워커로부터 메시지 수신
      worker.onmessage = function(event) {
        console.log('Result from worker:', event.data);
        // 작업이 완료되면 워커 종료
        if (event.data.status === 'completed') {
          worker.terminate();
        }
      };
      
      // 워커에서 오류 처리
      worker.onerror = function(error) {
        console.error('Worker error:', error.message);
        worker.terminate();
      };
    }
    
    // worker.js (워커 스레드)
    // self는 워커 자체를 가리킴
    self.onmessage = function(event) {
      const { command, data } = event.data;
      
      if (command === 'start') {
        const { numbers, iterations } = data;
        const result = performHeavyCalculation(numbers, iterations);
        
        // 결과를 메인 스레드로 전송
        self.postMessage({
          status: 'completed',
          result: result
        });
      }
    };
    
    function performHeavyCalculation(numbers, iterations) {
      // CPU 집약적인 작업 시뮬레이션
      let result = 0;
      for (let i = 0; i < iterations; i++) {
        for (let j = 0; j < numbers.length; j++) {
          result += Math.sqrt(numbers[j]) * Math.tan(numbers[j]);
        }
      }
      return result;
    }
    
    // 2. 웹 워커 사용 사례
    
    // 이미지 처리
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
    
    // 데이터 파싱
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
    
    // 3. SharedWorker 예시 (여러 탭/윈도우 간 공유)
    
    // main.js
    function connectToSharedWorker() {
      const sharedWorker = new SharedWorker('shared-worker.js');
      
      // SharedWorker는 port를 통해 통신
      sharedWorker.port.onmessage = function(event) {
        console.log('Message from shared worker:', event.data);
      };
      
      // 통신 시작
      sharedWorker.port.start();
      
      // 메시지 전송
      sharedWorker.port.postMessage({
        type: 'register',
        clientId: generateClientId()
      });
    }
    
    // shared-worker.js
    let connections = 0;
    const clients = new Map();
    
    // 새 연결이 시작될 때
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
          
          // 모든 클라이언트에게 새 연결 알림
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
