# 스코프와 클로저

## 스코프
스코프는 변수가 접근 가능한 영역을 정의합니다. JavaScript에는 여러 유형의 스코프가 있습니다.

### 스코프의 유형:

#### 1. 전역 스코프
```javascript
// 전역 스코프
const globalVar = "I'm global";

function test() {
  console.log(globalVar); // 접근 가능
}

test(); // "I'm global"
console.log(globalVar); // "I'm global"
```

#### 2. 함수 스코프
```javascript
function outerFunction() {
  const functionVar = "I'm in function scope";
  
  function innerFunction() {
    console.log(functionVar); // 접근 가능
  }
  
  innerFunction(); // "I'm in function scope"
}

// console.log(functionVar); // ReferenceError
```

#### 3. 블록 스코프
```javascript
if (true) {
  let blockVar = "I'm in block scope";
  const anotherBlockVar = "Me too";
  var functionScopedVar = "I escape blocks";
}

// console.log(blockVar); // ReferenceError
// console.log(anotherBlockVar); // ReferenceError
console.log(functionScopedVar); // "I escape blocks"
```

### 스코프 체인
JavaScript는 변수를 찾을 때 스코프 체인을 사용합니다:

```javascript
const global = "global";

function outer() {
  const outerVar = "outer";
  
  function inner() {
    const innerVar = "inner";
    console.log(innerVar);  // "inner" - 로컬 스코프
    console.log(outerVar);  // "outer" - 외부 스코프
    console.log(global);    // "global" - 전역 스코프
  }
  
  inner();
}

outer();
```

### 렉시컬 스코프
JavaScript는 렉시컬(정적) 스코프를 사용합니다:

```javascript
const name = "Global";

function outer() {
  const name = "Outer";
  
  function inner() {
    console.log(name); // "Outer" - 정의된 위치의 스코프 사용
  }
  
  return inner;
}

const innerFunc = outer();
innerFunc(); // "Outer" (호출 위치가 아닌 정의 위치 기준)
```

## 클로저
클로저는 외부 함수의 변수에 접근할 수 있는 내부 함수입니다.

### 클로저 기본:
```javascript
function createCounter() {
  let count = 0; // private 변수
  
  return {
    increment() {
      count++;
      return count;
    },
    decrement() {
      count--;
      return count;
    },
    getCount() {
      return count;
    }
  };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.getCount());  // 2
console.log(counter.decrement()); // 1
// console.log(counter.count); // undefined - private
```

### 클로저의 실용적 사용:

#### 1. 데이터 프라이버시
```javascript
function createBankAccount(initialBalance) {
  let balance = initialBalance; // private
  
  return {
    deposit(amount) {
      balance += amount;
      return balance;
    },
    withdraw(amount) {
      if (amount <= balance) {
        balance -= amount;
        return balance;
      }
      return "Insufficient funds";
    },
    getBalance() {
      return balance;
    }
  };
}

const account = createBankAccount(1000);
console.log(account.getBalance()); // 1000
console.log(account.deposit(500)); // 1500
// console.log(account.balance); // undefined
```

#### 2. 함수 팩토리
```javascript
function createMultiplier(multiplier) {
  return function(number) {
    return number * multiplier;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5));  // 10
console.log(triple(5));  // 15
```

#### 3. 이벤트 핸들러
```javascript
function setupButtons() {
  const buttons = document.querySelectorAll('button');
  
  buttons.forEach((button, index) => {
    button.addEventListener('click', function() {
      console.log(`Button ${index} clicked`);
    });
  });
}
```

#### 4. 모듈 패턴
```javascript
const calculator = (function() {
  // private 변수와 함수
  let result = 0;
  
  function log(operation, value) {
    console.log(`${operation}: ${value}`);
  }
  
  // public API
  return {
    add(num) {
      result += num;
      log('Add', num);
      return this;
    },
    subtract(num) {
      result -= num;
      log('Subtract', num);
      return this;
    },
    getResult() {
      return result;
    }
  };
})();

calculator.add(10).subtract(3);
console.log(calculator.getResult()); // 7
```

### 클로저의 일반적인 함정:

#### 루프에서의 클로저
```javascript
// 문제
for (var i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i); // 3, 3, 3
  }, 100);
}

// 해결책 1: let 사용
for (let i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i); // 0, 1, 2
  }, 100);
}

// 해결책 2: IIFE
for (var i = 0; i < 3; i++) {
  (function(j) {
    setTimeout(function() {
      console.log(j); // 0, 1, 2
    }, 100);
  })(i);
}

// 해결책 3: 클로저 함수
for (var i = 0; i < 3; i++) {
  setTimeout(createLogger(i), 100);
}

function createLogger(value) {
  return function() {
    console.log(value); // 0, 1, 2
  };
}
```

### 메모리 고려사항:
```javascript
// 메모리 누수 가능성
function createHeavyObject() {
  const heavyData = new Array(1000000).fill('data');
  
  return {
    getData() {
      return heavyData; // heavyData가 메모리에 유지됨
    }
  };
}

// 더 나은 접근
function createLightObject() {
  let heavyData = new Array(1000000).fill('data');
  
  return {
    processData() {
      // 데이터 처리
      const result = heavyData.length;
      heavyData = null; // 명시적으로 해제
      return result;
    }
  };
}
```

### 인터뷰 질문:
1. **클로저란 무엇인가요?**
   - 외부 함수의 변수에 접근할 수 있는 내부 함수
   - 렉시컬 스코프의 결과
   - 데이터 캡슐화에 유용

2. **클로저는 언제 생성되나요?**
   - 함수가 생성될 때
   - 내부 함수가 외부 변수를 참조할 때
   - 외부 함수가 반환된 후에도 유지됨

3. **클로저의 실용적 사용 사례는?**
   - 데이터 프라이버시
   - 함수 팩토리
   - 이벤트 핸들러
   - 모듈 패턴
