# 23. 메서드 분리 시 `this` 손실 / Losing `this` When Extracting Methods

## 질문 (Question)

다음 코드에서 콘솔 출력 결과를 예측해 보세요.

```javascript
const counter = {
  value: 0,
  increment() {
    this.value++;
    console.log('counter value =', this.value);
  },
};

counter.increment();

const inc = counter.increment;
inc();
```

1. 두 번의 호출에서 각각 어떤 값이 출력될까요?
2. 두 번째 호출에서 왜 의도한 대로 동작하지 않는지 설명해 보세요.
3. 이를 고치는 방법은 무엇인가요?

---

## 정답 (Answer)

### 예상 출력 (Typical Output)

```text
counter value = 1
counter value = NaN   // 또는 에러 / 다른 값 (환경에 따라)
```

(두 번째 호출에서 `this` 가 `counter` 를 가리키지 않기 때문에 발생하는 문제입니다.)

---

## 이유 (Why This Happens)

### 한국어 (Korean)

- `counter.increment()`
  - **메서드 호출 방식**이므로, `this` 는 `counter` 를 가리킵니다.
  - 따라서 `this.value` 는 `counter.value` 이고, `0 → 1` 로 증가합니다.
- `const inc = counter.increment; inc();`
  - 여기서 `inc` 는 **그냥 함수 참조**일 뿐입니다.
  - `inc()` 를 호출하면, 브라우저의 비엄격 모드에서는 `this === window`, strict mode에서는 `this === undefined` 가 됩니다.
  - 즉, 더 이상 `counter` 와 연결되어 있지 않기 때문에 `this.value++` 가 의도대로 동작하지 않습니다.

### English

- `counter.increment()`
  - Called as a method, so `this` refers to `counter`.
  - `this.value` increments from `0` to `1`.
- `const inc = counter.increment; inc();`
  - `inc` is just a function reference.
  - When called as `inc()`, `this` is `window` (non-strict) or `undefined` (strict mode), not `counter`.
  - So `this.value++` does not behave as expected.

---

## 수정 방법 (How to Fix It)

### 1) `bind` 사용 (Use `bind`)

```javascript
const inc = counter.increment.bind(counter);
inc(); // this === counter
```

- **KO**: `bind(counter)` 로 함수의 `this` 를 영구적으로 `counter` 에 묶습니다.
- **EN**: `bind(counter)` permanently binds `this` inside `increment` to `counter`.

### 2) 항상 객체를 통해 호출 (Always Call Through the Object)

```javascript
setTimeout(() => counter.increment(), 0);
```

- **KO**: 콜백에서 메서드를 호출할 때도 `counter.increment()` 형태를 유지하면 `this` 를 잃지 않습니다.
- **EN**: When passing callbacks, wrap them so you still call `counter.increment()` rather than the bare function.

### 3) 클래스 + 인스턴스 메서드에서 화살표 함수 주의

- 클래스 필드에 화살표 함수로 메서드를 정의하면, 인스턴스 생성 시점에 `this` 가 고정되는 패턴도 있습니다.

```javascript
class Counter {
  value = 0;

  increment = () => {
    this.value++;
    console.log('value =', this.value);
  };
}

const c = new Counter();
const inc2 = c.increment;
inc2(); // this === c
```

---

## 요약 (Summary)

- **KO**: 객체의 메서드를 변수로 분리하면 `this` 바인딩이 사라져서 의도한 객체를 가리키지 않을 수 있습니다. `bind`, 래핑 호출, 클래스 필드 화살표 함수 등으로 `this` 를 고정할 수 있습니다.
- **EN**: Extracting a method into a standalone function loses its `this` binding. Use `bind`, call through the object, or arrow-function instance methods to keep `this` pointing at the correct object.
