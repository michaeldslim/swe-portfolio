# 25. async/await + 이벤트 루프 순서 / Async-Await and Event Loop Order

## 질문 (Question)

아래 코드의 실제 출력 순서를 예측해 보세요.

```javascript
async function main() {
  console.log('A');

  setTimeout(() => console.log('B (timeout)'), 0);

  await Promise.resolve().then(() => console.log('C (then inside await)'));

  console.log('D (after await)');
}

console.log('E (top-level)');
main();
console.log('F (after main call)');
```

1. 콘솔에 어떤 순서로 로그가 찍힐까요?
2. `async/await` 이 실제로는 `Promise` + 마이크로태스크 위에서 어떻게 동작하는지 설명해 보세요.

---

## 정답 (Answer)

### 예상 출력 (Typical Order)

```text
E (top-level)
A
F (after main call)
C (then inside await)
D (after await)
B (timeout)
```

---

## 이유 (Why This Happens)

### 한국어 (Korean)

1. **동기 코드 먼저 실행**
   - `console.log('E (top-level)');`
   - `main()` 호출 → `main` 의 첫 부분 실행
     - `console.log('A');`
     - `setTimeout(..., 0);` 으로 태스크 큐에 콜백 등록
     - `await Promise.resolve().then(...)` 을 만나면:
       - `Promise.resolve().then(...)` 의 `then` 콜백이 **마이크로태스크 큐**에 들어감
       - `await` 는 이 Promise 가 resolve 될 때까지 **main 함수의 나머지 부분(D 로그)을 일시 중단**하고, 제어를 이벤트 루프에 돌려줌
   - 그 다음 줄 `console.log('F (after main call)');` 실행

2. **마이크로태스크 (Promise.then, await)**
   - 콜 스택이 비면, 마이크로태스크 큐의 `then` 콜백 실행 → `C (then inside await)`
   - 그 후 `await` 가 깨지면서, `main` 함수의 나머지 부분이 **마이크로태스크로 이어서 실행** → `D (after await)`

3. **태스크 큐 (setTimeout)**
   - 마지막으로, 0ms 타이머 콜백이 태스크로 실행 → `B (timeout)`

### English

1. **Synchronous code first**
   - Log `E (top-level)`.
   - Call `main()`:
     - Log `A`.
     - Schedule `setTimeout(..., 0)` (macrotask).
     - Encounter `await Promise.resolve().then(...)`:
       - The `then` callback goes to the **microtask queue**.
       - `await` pauses the rest of `main` and returns control to the event loop.
   - Then `console.log('F (after main call)');` runs.

2. **Microtasks (Promise.then and await)**
   - When the stack is clear, the microtask with the `then` runs → `C (then inside await)`.
   - After that, the `await` resumes `main`’s execution as a microtask → `D (after await)`.

3. **Macrotasks (setTimeout)**
   - Finally, the `setTimeout` callback runs → `B (timeout)`.

---

## 요약 (Summary)

- **KO**: `async/await` 는 문법적으로는 동기처럼 보이지만, 실제로는 `Promise` 와 마이크로태스크 위에서 동작합니다. 따라서 동기 코드 → 마이크로태스크(`then`, `await` 이후) → 태스크(`setTimeout`) 순서로 실행된다는 점을 기억해야 합니다.
- **EN**: Although `async/await` looks synchronous, it’s built on top of Promises and microtasks. The real order is synchronous code first, then microtasks (`then`, resumed `await`), and finally macrotasks (`setTimeout`).
