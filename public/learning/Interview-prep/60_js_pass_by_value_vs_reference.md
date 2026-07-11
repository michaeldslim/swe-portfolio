# 60. JavaScript: Pass by Value vs Pass by Reference?

## 1. 질문 (Question)

- JavaScript 에서 **pass by value** 와 **pass by reference** 의 차이는 무엇인가요?
- 함수에 인자를 넘겼을 때, **원본 값이 언제 바뀌고 언제 안 바뀌는지** 예제를 통해 설명해 보세요.

> 인터뷰에서 자주 나오는 질문: "JS는 pass by reference 인가요, pass by value 인가요?" → 이 질문에 정확히 답하는 것이 목표.

---

## 2. 기본 개념 (Core Concept)

### 한국어 (Korean)

- JavaScript는 **항상 pass by value** 입니다.
- 하지만 **값의 종류**(primitive vs object)에 따라 **그 "value" 안에 무엇이 들어 있는지**가 달라서 혼란이 생깁니다.

1. **원시 타입(Primitive)**
   - `number`, `string`, `boolean`, `null`, `undefined`, `bigint`, `symbol` 등.
   - 값 자체가 복사됨.

2. **객체 타입(Object)**
   - `Object`, `Array`, `Function`, Date 등.
   - 변수 안에는 **객체 자체가 아니라, 객체를 가리키는 참조(reference)가 저장**됩니다.
   - 함수를 호출할 때, 이 **참조값(=포인터 같은 것)** 이 복사되어 넘어갑니다.

즉:
- 원시 타입: **값이 복사**되므로, 함수 안에서 변경해도 원본에 영향 X.
- 객체 타입: **참조값이 복사**되므로, 함수 안에서 그 참조로 가리키는 객체의 속성을 바꾸면 원본 객체가 바뀐 것처럼 보입니다.

### English

- JavaScript is **always pass-by-value**.
- For primitives, the value is the actual data (e.g., `42`, `'hello'`).
- For objects/arrays/functions, the value is a **reference** to the object in memory.
- When passing arguments to functions:
  - Primitives: copy the primitive value.
  - Objects: copy the reference value.

---

## 3. 예제 1: 원시 타입 (Primitive) 인자

```js
function changePrimitive(x) {
  x = x + 1;
  console.log('inside changePrimitive, x =', x);
}

let a = 10;
console.log('before, a =', a);
changePrimitive(a);
console.log('after, a =', a);
```

### 결과 (Output)

```text
before, a = 10
inside changePrimitive, x = 11
after, a = 10
```

### 설명 (KO)

- `a` 의 값 10이 `x` 에 **복사**됩니다.
- 함수 안에서 `x` 를 11로 바꿔도, 이는 **로컬 복사본**만 바뀌는 것.
- 함수가 끝나면 `x` 는 사라지고, `a` 는 여전히 10.

### Explanation (EN)

- The value `10` is copied into `x`.
- Modifying `x` doesn’t affect `a` because they are separate values.

---

## 4. 예제 2: 객체(Object) 인자 – 속성 변경

```js
function changeObject(obj) {
  obj.value = obj.value + 1;
  console.log('inside changeObject, obj.value =', obj.value);
}

const myObj = { value: 10 };
console.log('before, myObj.value =', myObj.value);
changeObject(myObj);
console.log('after, myObj.value =', myObj.value);
```

### 결과 (Output)

```text
before, myObj.value = 10
inside changeObject, obj.value = 11
after, myObj.value = 11
```

### 설명 (KO)

- `myObj` 변수에는 실제 객체가 아니라 **객체를 가리키는 참조값** 이 들어 있습니다.
- 이 참조값이 `obj` 에 **복사**되어 넘어감.
- 함수 안에서 `obj.value` 를 변경하면, 두 변수(`myObj`, `obj`)가 같은 객체를 가리키므로 **원본 객체의 속성도 변경**됩니다.

### Explanation (EN)

- The reference to the object is copied into `obj`.
- Both `myObj` and `obj` point to the same underlying object, so mutating `obj.value` also changes `myObj.value`.

---

## 5. 예제 3: 객체 인자 – 변수 자체를 재할당할 때

```js
function replaceObject(obj) {
  obj = { value: 999 };
  console.log('inside replaceObject, obj.value =', obj.value);
}

const original = { value: 10 };
console.log('before, original.value =', original.value);
replaceObject(original);
console.log('after, original.value =', original.value);
```

### 결과 (Output)

```text
before, original.value = 10
inside replaceObject, obj.value = 999
after, original.value = 10
```

### 설명 (KO)

- `original` 의 참조값이 `obj` 에 복사되어 넘어옴.
- 함수 안에서 `obj = { value: 999 }` 로 **새 객체를 할당**하면,
  - 이제 `obj` 는 새 객체를 가리키지만,
  - `original` 은 여전히 기존 객체를 가리킵니다.
- 즉, **참조값 자체는 pass by value 로 복사**되었기 때문에,
  - 복사본(`obj`)을 재할당해도 원본(`original`)에는 영향이 없습니다.

### Explanation (EN)

- The reference is passed by value, so `obj` gets a copy of the reference.
- Reassigning `obj` to a new object doesn’t change what `original` refers to.
- This is the key argument for saying **JavaScript is pass-by-value, not pass-by-reference**.

---

## 6. 용어 정리 (Term Clarification)

### 한국어 (Korean)

- **Pass by value**: 인자로 넘길 때 **값을 복사해서 전달**.
- **Pass by reference**: 인자로 넘길 때 **참조(포인터)를 직접 전달**해서, 함수 안에서 변수 자체를 바꿀 수 있는 모델 (C++의 reference, C# ref/out 등).
- JavaScript 에서는:
  - 원시 타입: 값 자체를 복사.
  - 객체 타입: **참조값을 복사**.
  - 그러나 참조값도 "값"이므로, 전체적으로는 **pass by value** 라고 보는 것이 정확합니다.

### English

- **Pass-by-value**: the function receives a copy of the value.
- **Pass-by-reference**: the function receives something like an alias to the original variable itself.
- In JavaScript:
  - Primitives: pass-by-value of the primitive.
  - Objects: pass-by-value of the **reference**.
  - That’s why we say JS is pass-by-value.

---

## 7. 면접 포인트 (Interview Angle)

### 한국어 (Korean)

- JS 는 **항상 pass by value** 이고, 객체는 "참조를 값으로 전달"한다고 정리.
- 예제 2/3 처럼:
  - 속성을 바꾸면 원본이 바뀌지만,
  - 변수 자체를 새 객체로 재할당하면 원본이 안 바뀌는 예시를 들어 설명.
- 이 차이를 코드로 명확히 설명할 수 있으면 좋은 인상을 줄 수 있습니다.

### English

- Clearly state: **JavaScript is pass-by-value**, where objects are passed by value of their reference.
- Use examples to show:
  - Mutating properties affects the original object.
  - Reassigning the parameter does not affect the original variable.

---

## 8. 한 줄 요약 (Summary)

- **KO**: JavaScript 에서는 원시 타입이든 객체든 **값을 복사해서 전달(pass by value)** 하며, 객체의 경우에는 참조값을 복사하기 때문에 함수 안에서 객체 속성을 바꾸면 원본이 바뀌지만, 매개변수에 새 객체를 재할당해도 원본 변수는 바뀌지 않습니다.
- **EN**: JavaScript always passes arguments by value; primitives copy their actual value, while objects copy a reference value, which is why property mutations affect the original object but reassigning the parameter does not change the original variable.
