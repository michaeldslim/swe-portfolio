# 실행 컨텍스트와 호이스팅

## 실행 컨텍스트
JavaScript 코드는 실행 컨텍스트 내에서 실행되며, 이는 본질적으로 코드가 실행되는 환경입니다. 모든 실행 컨텍스트에는 세 가지 주요 구성 요소가 있습니다:

1. **변수 환경 (VariableObject)**:
   - 변수, 함수 선언, 함수 매개변수를 저장합니다
   - 실행 컨텍스트의 생성 단계에서 생성됩니다
   - 전역 스코프에서는 전역 객체입니다 (브라우저에서는 window)
   - 함수 스코프에서는 arguments 객체와 지역 변수를 포함합니다

2. **렉시컬 환경**:
   - 코드가 작성된 방식과 위치를 결정합니다
   - 환경 레코드(실제 변수 저장소)를 포함합니다
   - 외부 환경에 대한 참조를 가집니다 (스코프 체인)
   - 실행 중 변수 조회에 사용됩니다

3. **`this` 바인딩**:
   - 함수가 호출될 때 결정됩니다
   - 전역 컨텍스트에서: `window` (브라우저) 또는 `global` (Node.js)
   - 함수 컨텍스트에서: 함수가 호출되는 방식에 따라 다릅니다
   - `call()`, `apply()`, `bind()`를 사용하여 명시적으로 설정할 수 있습니다

### 실행 컨텍스트의 유형:
- **전역 실행 컨텍스트**: 스크립트가 처음 실행될 때 생성됩니다
- **함수 실행 컨텍스트**: 함수가 호출될 때 생성됩니다
- **Eval 실행 컨텍스트**: `eval` 함수 내에서 생성됩니다

### 실행 컨텍스트 생명주기:
1. **생성 단계**:
   - 변수 객체(VO) 생성
   - 스코프 체인 설정
   - `this` 값 결정

2. **실행 단계**:
   - 변수에 값 할당
   - 코드 실행

## 호이스팅
호이스팅은 코드가 실행되기 전 컴파일 단계에서 선언을 포함하는 스코프의 최상단으로 이동시키는 JavaScript의 기본 동작입니다. 이는 변수와 함수 선언이 코드가 실행되기 전에 처리된다는 것을 의미합니다.

### 호이스팅 작동 방식:
1. **컴파일 단계**:
   - JavaScript 엔진이 변수와 함수 선언을 찾기 위해 코드를 스캔합니다
   - 이러한 선언을 위한 메모리를 할당합니다
   - 함수 선언을 메모리에 초기화합니다
   - `var` 변수를 `undefined`로 초기화합니다 (`let`/`const`는 TDZ)

2. **실행 단계**:
   - 코드가 한 줄씩 실행됩니다
   - 할당 및 기타 실행 가능한 코드가 처리됩니다
   - 함수 표현식은 실행이 해당 위치에 도달할 때만 정의됩니다

```javascript
// 변수 호이스팅
console.log(x); // undefined (ReferenceError가 아님)
var x = 5;
// 일어나는 일:
// 1. 컴파일 중: var x가 호이스팅되고 undefined로 초기화됨
// 2. 실행 중: console.log가 실행되고, 그 다음 x에 5가 할당됨

// 함수 선언 호이스팅
sayHello(); // "Hello!" - 전체 함수가 호이스팅되어 작동함
function sayHello() {
  console.log("Hello!");
}

// 함수 표현식 호이스팅
sayHi(); // TypeError: sayHi is not a function
var sayHi = function() {
  console.log("Hi!");
};
// 실패하는 이유:
// 1. var sayHi가 호이스팅되고 undefined로 초기화됨
// 2. undefined를 함수로 호출하려고 하면 TypeError 발생

// Let과 Const 호이스팅 (일시적 사각지대)
console.log(y); // ReferenceError: Cannot access 'y' before initialization
let y = 10;

// 일시적 사각지대 (TDZ)
// let과 const는 호이스팅되지만 초기화되지 않음
// 선언 전에 접근하면 ReferenceError 발생
```

### 호이스팅 규칙:
1. **함수 선언**: 완전히 호이스팅됩니다 (선언과 정의 모두)
2. **var 변수**: 선언만 호이스팅되고 undefined로 초기화됩니다
3. **let/const 변수**: 호이스팅되지만 TDZ에 있어 접근할 수 없습니다
4. **함수 표현식**: 변수 호이스팅 규칙을 따릅니다
5. **클래스 선언**: 호이스팅되지만 TDZ에 있습니다

```javascript
// 호이스팅 우선순위
console.log(typeof foo); // "function"
var foo = "variable";
function foo() {
  return "function";
}
console.log(typeof foo); // "string"

// 설명:
// 1. 함수 선언이 먼저 호이스팅됨
// 2. 변수 선언이 호이스팅되지만 이미 존재하므로 무시됨
// 3. 실행 중에 변수 할당이 함수를 덮어씀
```

### 모범 사례:
- 변수를 사용하기 전에 선언하세요
- 함수 선언보다 함수 표현식을 선호하세요 (명확성을 위해)
- `var` 대신 `let`과 `const`를 사용하세요
- 스코프의 최상단에 변수를 선언하세요
- 호이스팅에 의존하지 마세요 - 명시적으로 작성하세요

### 일반적인 함정:
```javascript
// 함정 1: 루프에서 var 사용
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// 출력: 3, 3, 3 (예상: 0, 1, 2)
// 해결책: let 사용
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// 출력: 0, 1, 2

// 함정 2: 함수 표현식 호이스팅
var myFunc = function() {
  console.log(innerFunc); // undefined
  var innerFunc = function() {
    return "inner";
  };
};

// 함정 3: 블록 스코프 무시
if (true) {
  var blockVar = "accessible";
}
console.log(blockVar); // "accessible" - var는 블록 스코프가 아님
```

### 인터뷰 질문:
1. **호이스팅이란 무엇이며 어떻게 작동하나요?**
   - 선언이 스코프 최상단으로 이동하는 것
   - 컴파일 단계에서 발생함
   - 함수 선언은 완전히 호이스팅됨
   - 변수는 선언만 호이스팅됨

2. **var, let, const의 호이스팅 차이점은?**
   - var: undefined로 초기화됨
   - let/const: TDZ에 있어 접근 불가
   - 모두 호이스팅되지만 동작이 다름

3. **일시적 사각지대(TDZ)란?**
   - 변수가 호이스팅되었지만 초기화되지 않은 기간
   - let/const에만 적용됨
   - 접근 시 ReferenceError 발생
