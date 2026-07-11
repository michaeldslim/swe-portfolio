 # Event Loop & Promise Mechanics 완전 정리 (50 퀴즈로 이해하기)

 ## 1. 개요

 - 이 파일은 **이벤트 루프 / 마이크로태스크 / macrotask / React Hooks / async/await** 를
   50개의 작은 퀴즈로 연습하기 위한 자료입니다.
 - 아래의 `전체 퀴즈 코드` 블록은 **실제 실행 가능한 코드**를 그대로 모아둔 참고용 소스입니다.
 - 면접/복습 시에는 맨 아래 `실행 순서 핵심 정리 (Checklist)` 섹션을 위주로 보면서,
   궁금한 케이스가 있을 때만 해당 퀴즈 코드를 직접 실행해 보면 좋습니다.

 ## 2. 전체 퀴즈 코드 (실행 예제 모음)

 ```javascript
 // ========================================
 // 퀴즈 1: 기본 동기 vs 비동기
// ========================================
console.log('1');
setTimeout(() => console.log('2'), 0);
console.log('3');

// 출력 순서: 1 → 3 → 2
// 설명: 동기 코드(1, 3)가 먼저 실행되고, setTimeout은 macrotask queue에 들어가 마지막 실행


// ========================================
// 퀴즈 2: Promise vs setTimeout
// ========================================
console.log('A');
setTimeout(() => console.log('B'), 0);
Promise.resolve().then(() => console.log('C'));
console.log('D');

// 출력 순서: A → D → C → B
// 설명: 동기(A, D) → microtask(Promise C) → macrotask(setTimeout B)


// ========================================
// 퀴즈 3: 중첩된 Promise
// ========================================
console.log('start');
Promise.resolve()
  .then(() => {
    console.log('promise1');
    Promise.resolve().then(() => console.log('promise2'));
  })
  .then(() => console.log('promise3'));
console.log('end');

// 출력 순서: start → end → promise1 → promise2 → promise3
// 설명: 동기 실행 후, microtask queue를 순차 처리 (promise1이 새로운 microtask를 추가)


// ========================================
// 퀴즈 4: async/await 기본
// ========================================
async function test() {
  console.log('1');
  await Promise.resolve();
  console.log('2');
}
console.log('3');
test();
console.log('4');

// 출력 순서: 3 → 1 → 4 → 2
// 설명: await 이전까지 동기 실행, await 이후는 microtask로 등록


// ========================================
// 퀴즈 5: queueMicrotask
// ========================================
console.log('1');
queueMicrotask(() => console.log('2'));
Promise.resolve().then(() => console.log('3'));
console.log('4');

// 출력 순서: 1 → 4 → 2 → 3
// 설명: queueMicrotask와 Promise.then은 모두 microtask이며 등록 순서대로 실행


// ========================================
// 퀴즈 6: React useEffect 기본
// ========================================
function Component1() {
  console.log('render');
  
  useEffect(() => {
    console.log('effect');
  });
  
  return null;
}

// 출력 순서: render → effect
// 설명: 렌더링 후 useEffect는 commit phase 이후 비동기로 실행


// ========================================
// 퀴즈 7: React useLayoutEffect vs useEffect
// ========================================
function Component2() {
  console.log('render');
  
  useLayoutEffect(() => {
    console.log('layoutEffect');
  });
  
  useEffect(() => {
    console.log('effect');
  });
  
  return null;
}

// 출력 순서: render → layoutEffect → effect
// 설명: useLayoutEffect는 DOM 변경 직후 동기 실행, useEffect는 paint 후 비동기 실행


// ========================================
// 퀴즈 8: useEffect 내부 비동기
// ========================================
function Component3() {
  console.log('render');
  
  useEffect(() => {
    console.log('effect start');
    Promise.resolve().then(() => console.log('promise'));
    console.log('effect end');
  });
  
  return null;
}

// 출력 순서: render → effect start → effect end → promise
// 설명: useEffect 내부도 동기 → microtask 순서 유지


// ========================================
// 퀴즈 9: 여러 useEffect
// ========================================
function Component4() {
  console.log('render');
  
  useEffect(() => {
    console.log('effect1');
  });
  
  useEffect(() => {
    console.log('effect2');
  });
  
  useLayoutEffect(() => {
    console.log('layoutEffect');
  });
  
  return null;
}

// 출력 순서: render → layoutEffect → effect1 → effect2
// 설명: layoutEffect 먼저, 그 다음 useEffect들이 정의 순서대로 실행


// ========================================
// 퀴즈 10: Promise.resolve vs new Promise
// ========================================
console.log('1');
new Promise((resolve) => {
  console.log('2');
  resolve();
}).then(() => console.log('3'));
console.log('4');

// 출력 순서: 1 → 2 → 4 → 3
// 설명: Promise executor는 동기 실행, then은 microtask


// ========================================
// 퀴즈 11: 복잡한 async/await
// ========================================
async function func1() {
  console.log('A');
  await console.log('B');
  console.log('C');
}
async function func2() {
  console.log('D');
  await Promise.resolve();
  console.log('E');
}
func1();
func2();
console.log('F');

// 출력 순서: A → B → D → F → C → E
// 설명: await console.log은 동기값이라 즉시 실행, await Promise는 microtask 생성


// ========================================
// 퀴즈 12: setTimeout 중첩
// ========================================
setTimeout(() => {
  console.log('1');
  Promise.resolve().then(() => console.log('2'));
}, 0);
setTimeout(() => {
  console.log('3');
}, 0);
Promise.resolve().then(() => console.log('4'));

// 출력 순서: 4 → 1 → 2 → 3
// 설명: 현재 microtask(4) → 첫 setTimeout의 macrotask(1) → 그 안의 microtask(2) → 다음 macrotask(3)


// ========================================
// 퀴즈 13: React state 업데이트와 effect
// ========================================
function Component5() {
  const [count, setCount] = useState(0);
  
  console.log('render', count);
  
  useEffect(() => {
    console.log('effect', count);
    if (count === 0) {
      setCount(1);
    }
  });
  
  return null;
}

// 출력 순서: render 0 → effect 0 → render 1 → effect 1
// 설명: 첫 렌더 → effect 실행 → setState → 리렌더 → effect 재실행


// ========================================
// 퀴즈 14: Promise chain
// ========================================
Promise.resolve()
  .then(() => {
    console.log('1');
    return Promise.resolve();
  })
  .then(() => console.log('2'));

Promise.resolve()
  .then(() => console.log('3'))
  .then(() => console.log('4'));

// 출력 순서: 1 → 3 → 4 → 2
// 설명: Promise.resolve() 반환은 추가 microtask를 생성 (2단계 지연)


// ========================================
// 퀴즈 15: async 함수와 일반 Promise
// ========================================
async function test() {
  console.log('1');
  return '2';
}
console.log('3');
test().then(console.log);
console.log('4');

// 출력 순서: 3 → 1 → 4 → 2
// 설명: async 함수는 호출 시 동기 부분 실행, return은 Promise로 래핑되어 microtask


// ========================================
// 퀴즈 16: React useLayoutEffect 내부 setState
// ========================================
function Component6() {
  const [count, setCount] = useState(0);
  
  console.log('render', count);
  
  useLayoutEffect(() => {
    console.log('layoutEffect', count);
    if (count === 0) {
      setCount(1);
    }
  });
  
  useEffect(() => {
    console.log('effect', count);
  });
  
  return null;
}

// 출력 순서: render 0 → layoutEffect 0 → render 1 → layoutEffect 1 → effect 1
// 설명: layoutEffect에서 setState하면 paint 전 즉시 동기 리렌더 발생


// ========================================
// 퀴즈 17: 혼합 시나리오
// ========================================
console.log('start');

setTimeout(() => {
  console.log('timeout1');
  Promise.resolve().then(() => console.log('promise1'));
}, 0);

new Promise((resolve) => {
  console.log('executor');
  resolve();
}).then(() => {
  console.log('promise2');
  setTimeout(() => console.log('timeout2'), 0);
});

console.log('end');

// 출력 순서: start → executor → end → promise2 → timeout1 → promise1 → timeout2
// 설명: 동기 → 현재 microtask → macrotask와 그 내부 microtask → 다음 macrotask


// ========================================
// 퀴즈 18: await의 연쇄
// ========================================
async function test() {
  console.log('1');
  await Promise.resolve();
  console.log('2');
  await Promise.resolve();
  console.log('3');
}
console.log('4');
test();
Promise.resolve().then(() => console.log('5'));
console.log('6');

// 출력 순서: 4 → 1 → 6 → 2 → 5 → 3
// 설명: 각 await마다 microtask 생성, FIFO 순서로 처리


// ========================================
// 퀴즈 19: React 부모-자식 effect 순서
// ========================================
function Child() {
  console.log('child render');
  useEffect(() => console.log('child effect'));
  return null;
}

function Parent() {
  console.log('parent render');
  useEffect(() => console.log('parent effect'));
  return <Child />;
}

// 출력 순서: parent render → child render → child effect → parent effect
// 설명: 렌더는 부모→자식, effect는 자식→부모 (cleanup 역순 보장)


// ========================================
// 퀴즈 20: 종합 문제
// ========================================
console.log('1');

setTimeout(() => console.log('2'), 0);

Promise.resolve()
  .then(() => {
    console.log('3');
    setTimeout(() => console.log('4'), 0);
  })
  .then(() => console.log('5'));

async function test() {
  console.log('6');
  await Promise.resolve();
  console.log('7');
}

test();

queueMicrotask(() => console.log('8'));

console.log('9');

// 출력 순서: 1 → 6 → 9 → 3 → 8 → 5 → 7 → 2 → 4
// 설명:
// - 동기: 1, 6, 9
// - Microtask (FIFO): 3, 8, 5, 7
// - Macrotask: 2, 4
// - 3이 실행되며 새로운 macrotask(4) 등록
// - 7은 await 이후라 microtask queue 뒤쪽


// ========================================
// 퀴즈 21: Promise.all과 개별 Promise
// ========================================
console.log('start');

Promise.all([
  Promise.resolve().then(() => console.log('1')),
  Promise.resolve().then(() => console.log('2'))
]).then(() => console.log('3'));

Promise.resolve().then(() => console.log('4'));

console.log('end');

// 출력 순서: start → end → 1 → 2 → 4 → 3
// 설명: Promise.all 내부 Promise들이 먼저 resolve되고, 모두 완료 후 then 실행


// ========================================
// 퀴즈 22: async 함수 내부 동기/비동기 혼합
// ========================================
async function test() {
  console.log('1');
  const result = await (async () => {
    console.log('2');
    return '3';
  })();
  console.log(result);
}

console.log('4');
test();
console.log('5');

// 출력 순서: 4 → 1 → 2 → 5 → 3
// 설명: async IIFE는 동기 부분 실행 후, return 값은 microtask로 전달


// ========================================
// 퀴즈 23: React cleanup 함수
// ========================================
function Component() {
  const [count, setCount] = useState(0);
  
  console.log('render', count);
  
  useEffect(() => {
    console.log('effect', count);
    return () => console.log('cleanup', count);
  });
  
  if (count === 0) {
    setTimeout(() => setCount(1), 0);
  }
  
  return null;
}

// 출력 순서: render 0 → effect 0 → render 1 → cleanup 0 → effect 1
// 설명: 리렌더 시 이전 effect의 cleanup이 새 effect 전에 실행


// ========================================
// 퀴즈 24: Promise reject와 catch
// ========================================
console.log('1');

Promise.reject()
  .catch(() => console.log('2'))
  .then(() => console.log('3'));

Promise.resolve()
  .then(() => console.log('4'))
  .catch(() => console.log('5'));

console.log('6');

// 출력 순서: 1 → 6 → 2 → 4 → 3
// 설명: catch도 microtask, catch 이후 then은 계속 체이닝


// ========================================
// 퀴즈 25: setImmediate vs setTimeout (Node.js)
// ========================================
setTimeout(() => console.log('timeout'), 0);
setImmediate(() => console.log('immediate'));
Promise.resolve().then(() => console.log('promise'));

// 출력 순서: promise → immediate → timeout (Node.js)
// 설명: microtask → setImmediate(check phase) → setTimeout(timers phase)
// 주의: 브라우저에는 setImmediate가 없음


// ========================================
// 퀴즈 26: React useEffect 의존성 배열
// ========================================
function Component() {
  const [count, setCount] = useState(0);
  
  console.log('render', count);
  
  useEffect(() => {
    console.log('effect no deps', count);
  });
  
  useEffect(() => {
    console.log('effect empty deps', count);
  }, []);
  
  useEffect(() => {
    console.log('effect with deps', count);
  }, [count]);
  
  if (count === 0) {
    setTimeout(() => setCount(1), 0);
  }
  
  return null;
}

// 출력 순서: 
// render 0 → effect no deps 0 → effect empty deps 0 → effect with deps 0 
// → render 1 → effect no deps 1 → effect with deps 1
// 설명: 빈 배열 effect는 초기 마운트 시에만 실행


// ========================================
// 퀴즈 27: Promise.race
// ========================================
console.log('start');

Promise.race([
  new Promise(resolve => setTimeout(() => resolve('1'), 0)),
  Promise.resolve('2')
]).then(console.log);

Promise.resolve().then(() => console.log('3'));

console.log('end');

// 출력 순서: start → end → 2 → 3
// 설명: Promise.resolve가 먼저 완료되어 race 승리, setTimeout의 1은 출력 안됨


// ========================================
// 퀴즈 28: async/await try-catch
// ========================================
async function test() {
  console.log('1');
  try {
    await Promise.reject('error');
    console.log('2');
  } catch (e) {
    console.log('3');
  }
  console.log('4');
}

console.log('5');
test();
console.log('6');

// 출력 순서: 5 → 1 → 6 → 3 → 4
// 설명: reject된 Promise는 catch로, 이후 코드는 정상 실행


// ========================================
// 퀴즈 29: React useLayoutEffect와 DOM 조작
// ========================================
function Component() {
  const ref = useRef(null);
  
  console.log('render');
  
  useLayoutEffect(() => {
    console.log('layoutEffect - DOM:', ref.current ? 'exists' : 'null');
    if (ref.current) {
      ref.current.textContent = 'modified';
      console.log('DOM modified');
    }
  });
  
  useEffect(() => {
    console.log('effect - DOM:', ref.current ? 'exists' : 'null');
  });
  
  return <div ref={ref}>original</div>;
}

// 출력 순서: render → layoutEffect - DOM: exists → DOM modified → effect - DOM: exists
// 설명: layoutEffect는 DOM 생성 직후 paint 전 동기 실행


// ========================================
// 퀴즈 30: 중첩된 setTimeout
// ========================================
console.log('1');

setTimeout(() => {
  console.log('2');
  setTimeout(() => console.log('3'), 0);
  Promise.resolve().then(() => {
    console.log('4');
    setTimeout(() => console.log('5'), 0);
  });
}, 0);

Promise.resolve().then(() => console.log('6'));

console.log('7');

// 출력 순서: 1 → 7 → 6 → 2 → 4 → 3 → 5
// 설명: 동기(1,7) → microtask(6) → macrotask(2) → 그 안의 microtask(4) → macrotask들(3,5)


// ========================================
// 퀴즈 31: Promise then의 return 값
// ========================================
Promise.resolve()
  .then(() => {
    console.log('1');
  })
  .then(() => {
    console.log('2');
  });

Promise.resolve()
  .then(() => {
    console.log('3');
  })
  .then(() => {
    console.log('4');
  });

// 출력 순서: 1 → 3 → 2 → 4
// 설명: 첫 번째 then들이 실행되고, 그 다음 두 번째 then들이 실행 (interlaced)


// ========================================
// 퀴즈 32: React 여러 useState 업데이트
// ========================================
function Component() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  
  console.log('render', count1, count2);
  
  useEffect(() => {
    console.log('effect', count1, count2);
    if (count1 === 0) {
      setCount1(1);
      setCount2(1);
    }
  });
  
  return null;
}

// 출력 순서: render 0 0 → effect 0 0 → render 1 1 → effect 1 1
// 설명: React는 같은 이벤트의 여러 setState를 배치 처리하여 한 번만 리렌더


// ========================================
// 퀴즈 33: await 없는 async 함수
// ========================================
async function test1() {
  console.log('1');
  return '2';
}

function test2() {
  console.log('3');
  return Promise.resolve('4');
}

console.log('5');
test1().then(console.log);
test2().then(console.log);
console.log('6');

// 출력 순서: 5 → 1 → 3 → 6 → 2 → 4
// 설명: async 함수와 Promise 반환 함수는 동일하게 작동


// ========================================
// 퀴즈 34: Promise와 finally
// ========================================
console.log('1');

Promise.resolve()
  .then(() => console.log('2'))
  .finally(() => console.log('3'))
  .then(() => console.log('4'));

Promise.reject()
  .catch(() => console.log('5'))
  .finally(() => console.log('6'))
  .then(() => console.log('7'));

console.log('8');

// 출력 순서: 1 → 8 → 2 → 5 → 3 → 6 → 4 → 7
// 설명: finally도 microtask이며 resolve/reject 모두 실행


// ========================================
// 퀴즈 35: React 조건부 effect
// ========================================
function Component() {
  const [show, setShow] = useState(true);
  
  console.log('render', show);
  
  if (show) {
    useEffect(() => {
      console.log('effect when show');
    });
  }
  
  return null;
}

// 출력: 에러 발생!
// 설명: Hooks는 조건문 안에서 사용 불가 (Hooks 호출 순서 보장 필요)


// ========================================
// 퀴즈 36: 복잡한 Promise 체인
// ========================================
console.log('1');

new Promise((resolve) => {
  console.log('2');
  resolve();
})
  .then(() => {
    console.log('3');
    return new Promise((resolve) => {
      console.log('4');
      resolve();
    });
  })
  .then(() => console.log('5'));

console.log('6');

// 출력 순서: 1 → 2 → 6 → 3 → 4 → 5
// 설명: Promise executor는 동기, then 체인은 순차적 microtask


// ========================================
// 퀴즈 37: async/await와 Promise.all
// ========================================
async function test() {
  console.log('1');
  await Promise.all([
    (async () => console.log('2'))(),
    (async () => console.log('3'))()
  ]);
  console.log('4');
}

console.log('5');
test();
console.log('6');

// 출력 순서: 5 → 1 → 2 → 3 → 6 → 4
// 설명: Promise.all 내부 async 함수는 동기 실행, await는 모두 완료 대기


// ========================================
// 퀴즈 38: React 부모 effect에서 자식 state 변경
// ========================================
function Child({ onMount }) {
  console.log('child render');
  
  useEffect(() => {
    console.log('child effect');
    onMount();
  }, []);
  
  return null;
}

function Parent() {
  const [count, setCount] = useState(0);
  
  console.log('parent render', count);
  
  useEffect(() => {
    console.log('parent effect', count);
  });
  
  return <Child onMount={() => setCount(1)} />;
}

// 출력 순서: 
// parent render 0 → child render → child effect → parent render 1 
// → child render → parent effect 1
// 설명: 자식 effect가 부모 state 변경 → 전체 리렌더


// ========================================
// 퀴즈 39: queueMicrotask vs Promise
// ========================================
console.log('1');

Promise.resolve().then(() => {
  console.log('2');
  queueMicrotask(() => console.log('3'));
});

queueMicrotask(() => {
  console.log('4');
  Promise.resolve().then(() => console.log('5'));
});

console.log('6');

// 출력 순서: 1 → 6 → 2 → 4 → 3 → 5
// 설명: 두 microtask가 순차 실행되며 각각 새로운 microtask 추가


// ========================================
// 퀴즈 40: setTimeout의 실제 지연시간
// ========================================
console.log('1');

setTimeout(() => console.log('2'), 0);
setTimeout(() => console.log('3'), 10);

for (let i = 0; i < 1000000000; i++) {} // 긴 동기 작업

console.log('4');

// 출력 순서: 1 → 4 → 2 → 3
// 설명: setTimeout 지연시간은 최소값, 동기 코드가 끝나야 실행 가능


// ========================================
// 퀴즈 41: React StrictMode 이중 렌더
// ========================================
function Component() {
  console.log('render');
  
  useEffect(() => {
    console.log('effect');
    return () => console.log('cleanup');
  }, []);
  
  return null;
}

// StrictMode 내부에서:
// render → render → effect → cleanup → effect
// 설명: 개발 모드에서 의도적으로 이중 렌더/effect 실행


// ========================================
// 퀴즈 42: await의 thenable 객체
// ========================================
async function test() {
  console.log('1');
  await {
    then(resolve) {
      console.log('2');
      resolve();
    }
  };
  console.log('3');
}

console.log('4');
test();
console.log('5');

// 출력 순서: 4 → 1 → 2 → 5 → 3
// 설명: thenable 객체도 await 가능, then은 동기 실행되지만 resolve는 microtask


// ========================================
// 퀴즈 43: Promise 생성자에서 throw
// ========================================
console.log('1');

new Promise((resolve, reject) => {
  console.log('2');
  throw new Error('error');
})
  .then(() => console.log('3'))
  .catch(() => console.log('4'));

console.log('5');

// 출력 순서: 1 → 2 → 5 → 4
// 설명: executor 내부 throw는 자동으로 reject 처리


// ========================================
// 퀴즈 44: React useEffect 무한 루프 방지
// ========================================
function Component() {
  const [count, setCount] = useState(0);
  const obj = { value: count };
  
  console.log('render', count);
  
  useEffect(() => {
    console.log('effect', count);
    if (count < 2) {
      setCount(count + 1);
    }
  }, [obj]); // 객체는 매번 새로 생성되어 무한 루프!
  
  return null;
}

// 출력: render 0 → effect 0 → render 1 → effect 1 → render 2 → effect 2 → ...
// 설명: 객체 참조가 매번 달라져 의존성 체크 실패, 무한 렌더링


// ========================================
// 퀴즈 45: async 함수의 에러와 Promise
// ========================================
async function test1() {
  throw new Error('error');
}

function test2() {
  return Promise.reject(new Error('error'));
}

console.log('1');
test1().catch(() => console.log('2'));
test2().catch(() => console.log('3'));
console.log('4');

// 출력 순서: 1 → 4 → 2 → 3
// 설명: async throw와 Promise.reject는 동일하게 동작


// ========================================
// 퀴즈 46: 여러 await의 병렬 vs 순차
// ========================================
async function sequential() {
  console.log('seq start');
  await Promise.resolve();
  console.log('seq 1');
  await Promise.resolve();
  console.log('seq 2');
}

async function parallel() {
  console.log('par start');
  const [a, b] = await Promise.all([
    Promise.resolve().then(() => console.log('par 1')),
    Promise.resolve().then(() => console.log('par 2'))
  ]);
  console.log('par end');
}

sequential();
parallel();
console.log('sync');

// 출력 순서: seq start → par start → sync → seq 1 → par 1 → par 2 → seq 2 → par end
// 설명: Promise.all은 병렬 실행, 개별 await는 순차 실행


// ========================================
// 퀴즈 47: React Custom Hook
// ========================================
function useCustom() {
  console.log('custom hook');
  
  useEffect(() => {
    console.log('custom effect');
  });
}

function Component() {
  console.log('render');
  
  useCustom();
  
  useEffect(() => {
    console.log('component effect');
  });
  
  return null;
}

// 출력 순서: render → custom hook → custom effect → component effect
// 설명: Custom Hook도 일반 Hook과 동일한 순서로 실행


// ========================================
// 퀴즈 48: Promise.allSettled
// ========================================
console.log('1');

Promise.allSettled([
  Promise.resolve('2'),
  Promise.reject('3'),
  Promise.resolve('4')
]).then((results) => {
  console.log('5');
  results.forEach(r => console.log(r.value || r.reason));
});

Promise.resolve().then(() => console.log('6'));

console.log('7');

// 출력 순서: 1 → 7 → 6 → 5 → 2 → 3 → 4
// 설명: allSettled는 모든 Promise 완료 대기, reject도 에러 없이 처리


// ========================================
// 퀴즈 49: React 동시 state 업데이트
// ========================================
function Component() {
  const [count, setCount] = useState(0);
  
  console.log('render', count);
  
  const handleClick = () => {
    console.log('click start');
    setCount(count + 1);
    console.log('after first setState', count);
    setCount(count + 1);
    console.log('after second setState', count);
    setTimeout(() => console.log('timeout', count), 0);
  };
  
  useEffect(() => {
    if (count === 0) {
      handleClick();
    }
  }, []);
  
  return null;
}

// 출력 순서: 
// render 0 → click start → after first setState 0 → after second setState 0 
// → render 1 → timeout 0
// 설명: setState는 비동기, count는 클로저로 이전 값 유지, 두 setState는 같은 값으로 한 번만 렌더


// ========================================
// 퀴즈 50: 종합 고급 문제
// ========================================
console.log('A');

setTimeout(() => {
  console.log('B');
  Promise.resolve().then(() => {
    console.log('C');
    queueMicrotask(() => console.log('D'));
  });
  queueMicrotask(() => console.log('E'));
}, 0);

async function test() {
  console.log('F');
  await new Promise((resolve) => {
    console.log('G');
    setTimeout(() => {
      console.log('H');
      resolve();
    }, 0);
  });
  console.log('I');
}

Promise.resolve()
  .then(() => {
    console.log('J');
    return Promise.resolve();
  })
  .then(() => console.log('K'));

test();

queueMicrotask(() => console.log('L'));

console.log('M');

// 출력 순서: A → F → G → M → J → L → B → E → C → D → H → K → I
// 설명:
// 1. 동기: A, F, G, M
// 2. Microtask 1차: J (Promise.resolve 추가 지연), L
// 3. Macrotask 1: B → 내부 microtask: E, C, D
// 4. Macrotask 2: H → test의 resolve → microtask: K, I

```

## 3. 실행 순서 핵심 정리 (Checklist)

### 3.1 자바스크립트 실행 순서

 - **Call Stack (동기 코드)**
   - 일반 함수 호출, `console.log`, `new Promise` 의 executor 등
 - **Microtask Queue (우선순위 높음)**
   - `Promise.then / catch / finally`
   - `async/await` 의 `await` 이후 코드
   - `queueMicrotask`, `MutationObserver`
 - **Animation Frame**
   - 브라우저의 `requestAnimationFrame`
 - **Macrotask Queue (태스크 큐)**
   - `setTimeout / setInterval`
   - `setImmediate` (Node.js)
   - I/O operations, UI rendering 등

### 3.2 React 렌더링과 Hooks 규칙

 - **Render Phase (동기)**: 컴포넌트 함수 실행
 - **Commit Phase (동기)**: DOM 업데이트
 - **`useLayoutEffect`**: Commit 직후, Paint 전 동기 실행
 - **`useEffect`**: Paint 후, 별도 태스크에서 비동기 실행
 - **Effect 실행 순서**: 자식 → 부모
 - **Cleanup 순서**: 부모 → 자식
 - **`setState`**: 같은 이벤트 안에서는 배치 처리되어 리렌더 횟수를 최소화

### 3.3 특이 케이스에서 주의할 점

 - `Promise.resolve()` 로 다시 감싼 값을 반환하면
   - **2단계 microtask 지연**이 생길 수 있음 (체인이 한 번 더 밀림)
 - `async` 함수 내부 `throw`
   - `Promise.reject` 와 동일하게 동작하며, 외부에서 `catch` 해야 함
 - `thenable` 객체 (`{ then(resolve) { ... } }`) 도 `await` 가능
   - 내부 `then` 이 동기 실행된 뒤, `resolve` 를 통해 넘겨지는 부분은 microtask 로 처리됨
 - React **StrictMode (개발 모드)**
   - 의도적으로 렌더/Effect 를 **이중 실행**해서 부작용 및 안전하지 않은 코드를 드러냄
