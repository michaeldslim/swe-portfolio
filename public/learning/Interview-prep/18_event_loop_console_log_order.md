# 18. 콘솔 로그 실행 순서 (이벤트 루프) / Console Log Order (Event Loop)

## 질문 (Question)

아래 코드의 **실제 출력 순서**를 예측해 보세요.

```javascript
console.log('Start');

setTimeout(() => console.log('Timeout 1'), 0);
setTimeout(() => console.log('Timeout 2'));
setTimeout(() => console.log('Timeout 3'), 3);

Promise.resolve().then(() => console.log('Promise 1'));
Promise.resolve().then(() => console.log('Promise 2'));

console.log('End');
```

1. 어떤 순서로 로그가 찍히는지?
2. **왜** 그런 순서가 되는지 이벤트 루프 관점에서 설명해 보세요.

---

## 정답 (Answer)

### 예상 출력 순서 (Typical Order)

```text
Start
End
Promise 1
Promise 2
Timeout 1
Timeout 2
Timeout 3
```

※ 타이머 최소 지연 시간 및 환경에 따라 미세한 차이는 있을 수 있지만, 핵심 개념은 아래와 같습니다.

---

## 이벤트 루프 개념 정리 (Event Loop Overview)

### 한국어 (Korean)

- 자바스크립트는 **싱글 스레드**로, 한 번에 한 가지 일만 수행합니다.
- 작업은 크게
  - **콜 스택(call stack)**
  - **마이크로태스크 큐(microtask queue)**: `Promise.then`, `queueMicrotask` 등
  - **태스크 큐(task/macrotask queue)**: `setTimeout`, `setInterval`, `DOM 이벤트` 등
  로 나뉩니다.
- 이벤트 루프는 다음 순서로 동작합니다.
  1. 콜 스택이 빌 때까지 **동기 코드** 실행
  2. 마이크로태스크 큐에서 작업 처리 (비어 있을 때까지)
  3. 태스크 큐에서 다음 작업 하나를 가져와 실행
  4. 2–3을 반복

### English

- JavaScript is **single-threaded**; it executes one thing at a time.
- Work is organized into:
  - **Call stack** for synchronous code.
  - **Microtask queue** for things like `Promise.then`.
  - **Task (macrotask) queue** for `setTimeout`, `setInterval`, DOM events, etc.
- The event loop roughly does:
  1. Run synchronous code until the call stack is empty.
  2. Run all **microtasks**.
  3. Then run the next **task/macrotask**.
  4. Repeat.

---

## 코드 분석 (Line-by-line Reasoning)

### 1) 동기 코드 먼저 (Synchronous First)

```javascript
console.log('Start');
...
console.log('End');
```

- **KO**: 가장 먼저 콜 스택에서 실행되므로 `Start`, `End` 가 바로 출력됩니다.
- **EN**: These are synchronous, so `Start` and `End` are logged immediately.

### 2) setTimeout 들은 태스크 큐 (Macrotasks)

```javascript
setTimeout(() => console.log('Timeout 1'), 0);
setTimeout(() => console.log('Timeout 2'));
setTimeout(() => console.log('Timeout 3'), 3);
```

- **KO**
  - 세 개 모두 **태스크 큐(macrotask queue)** 로 들어갈 콜백을 등록합니다.
  - 지연 시간(`0`, 생략=기본값, `3`)은 "최소 지연" 이며, 실제 실행은 **현재 실행 중인 스크립트와 모든 마이크로태스크가 끝난 뒤**에야 가능해집니다.
- **EN**
  - All three schedule callbacks into the macrotask queue.
  - Delays (`0`, default, `3`) are minimum delays; actual execution waits until synchronous code and microtasks finish.

### 3) Promise.then 은 마이크로태스크 (Microtasks)

```javascript
Promise.resolve().then(() => console.log('Promise 1'));
Promise.resolve().then(() => console.log('Promise 2'));
```

- **KO**: `then` 콜백은 **마이크로태스크 큐**에 들어가며, 동기 코드가 끝난 직후에 우선 실행됩니다.
- **EN**: `then` handlers go into the **microtask queue**, which runs before any macrotasks.

---

## 실제 실행 순서 정리 (Execution Order)

1. **콜 스택에서 동기 코드 실행**
   - `console.log('Start')` → `Start`
   - `setTimeout(...)` 3개: 콜백만 등록, 아직 실행 X
   - `Promise.resolve().then(...)` 2개: 마이크로태스크 큐에 콜백 추가
   - `console.log('End')` → `End`

2. **마이크로태스크 실행 (Promises)**
   - `Promise 1`
   - `Promise 2`

3. **태스크 큐 실행 (setTimeout)**
   - 지연 시간이 0 또는 기본값인 타이머들이 먼저 만료되었다고 가정 → `Timeout 1`, `Timeout 2`
   - 그 다음 약간 더 큰 지연(`3ms`) 의 `Timeout 3`

따라서 전형적인 출력 순서는:

```text
Start
End
Promise 1
Promise 2
Timeout 1
Timeout 2
Timeout 3
```

---

## 요약 (Summary)

- **KO**: 동기 코드 → `Promise.then` 같은 마이크로태스크 → `setTimeout` 같은 태스크 순으로 실행되므로, `Start`, `End` 가 먼저 찍히고, 그 다음 `Promise 1`, `Promise 2`, 마지막으로 `Timeout` 들이 실행됩니다.
- **EN**: Because synchronous code runs first, then microtasks (Promises), and finally macrotasks (setTimeout), we see `Start`, `End`, then `Promise 1`, `Promise 2`, and only afterwards the `Timeout` logs.
