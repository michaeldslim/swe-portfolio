# 20. `this` 바인딩 트릭 (콜백에서의 `this`) / Tricky `this` Binding in Callbacks

## 질문 (Question)

아래 코드에서 콘솔 출력 결과를 예측해 보세요. 그리고 **왜 그런지** 설명해 보세요.

```javascript
const user = {
  name: 'Mike',
  sayHi() {
    console.log('Hi, I am ' + this.name);
  },
  sayHiLater() {
    setTimeout(function () {
      console.log('Later, I am ' + this.name);
    }, 0);
  },
};

user.sayHi();
user.sayHiLater();
```

1. 실제 출력 값은 무엇인가요?
2. `this` 가 각각 어디를 가리키는지 설명해 보세요.
3. 이를 고치는 방법은 무엇인가요? (최소 2가지)

---

## 정답 (Answer)

### 예상 출력 (Typical Output)

```text
Hi, I am Mike
Later, I am undefined      // 또는 브라우저에 따라 'Later, I am ' 만 출력
```

---

## 왜 이런가? (Why This Happens)

### 한국어 (Korean)

- `user.sayHi()`
  - `sayHi` 는 **메서드로 호출**되므로 `this` 는 `user` 객체를 가리킵니다.
  - 따라서 `this.name` 은 `'Mike'` 입니다.
- `user.sayHiLater()`
  - 여기서 `setTimeout` 콜백은 **일반 함수(function) 호출**입니다.
  - 브라우저 환경에서는 기본적으로 `this` 가 `window` (또는 `undefined` in strict mode)를 가리키게 됩니다.
  - `window.name` 이 별도로 설정되지 않았다면, `this.name` 은 `undefined` 가 됩니다.

### English

- `user.sayHi()`
  - Called as a method, so `this` refers to `user`.
  - `this.name` is `'Mike'`.
- `user.sayHiLater()`
  - The `setTimeout` callback is a **plain function call**.
  - In browsers, `this` inside that callback is `window` (or `undefined` in strict mode).
  - Unless `window.name` is set, `this.name` is `undefined`.

---

## 수정 방법 (How to Fix It)

### 1) 화살표 함수 사용 (Use Arrow Function)

```javascript
sayHiLater() {
  setTimeout(() => {
    console.log('Later, I am ' + this.name);
  }, 0);
}
```

- **KO**: 화살표 함수는 **자신만의 `this` 를 갖지 않고**, 외부 스코프의 `this` 를 캡처합니다. 따라서 `this` 는 `user` 를 유지합니다.
- **EN**: Arrow functions don’t have their own `this`; they capture `this` from the surrounding lexical scope, which is `user` here.

### 2) `bind` 사용 (Use `bind`)

```javascript
sayHiLater() {
  setTimeout(function () {
    console.log('Later, I am ' + this.name);
  }.bind(this), 0);
}
```

- **KO**: `bind(this)` 로 콜백 함수의 `this` 를 강제로 `user` 로 고정시킵니다.
- **EN**: `bind(this)` permanently binds the callback’s `this` to `user`.

### 3) `self` 변수에 저장 (Store `this` in a variable)

```javascript
sayHiLater() {
  const self = this;
  setTimeout(function () {
    console.log('Later, I am ' + self.name);
  }, 0);
}
```

- **KO**: 오래된 패턴이지만, `this` 를 다른 변수(`self`)에 저장해서 콜백 내부에서 사용합니다.
- **EN**: Older pattern: store `this` in `self` and use `self` inside the callback.

---

## 요약 (Summary)

- **KO**: 메서드로 호출될 때의 `this` 와, 콜백(특히 `setTimeout`) 안에서의 `this` 는 다를 수 있습니다. 화살표 함수, `bind`, `self = this` 패턴 등으로 원하는 객체에 바인딩해야 합니다.
- **EN**: `this` in a method call and in a callback (like `setTimeout`) can differ. Use arrow functions, `bind`, or `self = this` to keep `this` referring to the object you expect.
