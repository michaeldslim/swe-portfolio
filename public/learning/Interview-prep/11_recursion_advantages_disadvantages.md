# 11. 재귀(Recursion)란? 장점과 단점 / What is Recursion? Advantages & Disadvantages

## 질문 (Question)

- **KO**: "재귀(Recursion)가 무엇인지, 장점과 단점을 예제와 함께 설명해 보세요."
- **EN**: "What is recursion? Explain its advantages and disadvantages with examples."

---

## 정의 (Definition)

### 한국어 (Korean)

- **재귀(Recursion)**: 함수가 **자기 자신을 직접 혹은 간접적으로 호출**하는 프로그래밍 기법
- 보통 문제를 **더 작은 하위 문제(subproblem)** 로 쪼갤 수 있을 때 사용
- 필수 요소
  - **기저 사례(Base case)**: 더 이상 재귀 호출을 하지 않고 값을 바로 반환하는 조건
  - **재귀 단계(Recursive step)**: 문제를 더 작은 문제로 줄여서 자기 자신을 다시 호출

### English

- **Recursion**: A technique where a function **calls itself**, directly or indirectly.
- Typically used when a problem can be naturally divided into **smaller subproblems**.
- Two key parts:
  - **Base case**: The condition under which the recursion stops.
  - **Recursive step**: Reduces the problem and calls itself again.

---

## 예시: 팩토리얼 (Example: Factorial)

`n! = n × (n-1) × (n-2) × ... × 1`, with `0! = 1`.

```javascript
function factorial(n) {
  if (n === 0) {
    // base case
    return 1;
  }
  // recursive step
  return n * factorial(n - 1);
}

console.log(factorial(5)); // 120
```

- **KO 설명**: `factorial(5)` 는 `5 * factorial(4)` → `4 * factorial(3)` → ... → `factorial(0)` 까지 내려갔다가, `1` 부터 다시 곱해 올라갑니다.
- **EN explanation**: `factorial(5)` expands to `5 * factorial(4)` → `4 * factorial(3)` → ... down to `factorial(0)`, then unwinds multiplying back up.

---

## 장점 (Advantages)

### 한국어 (Korean)

- **코드가 더 간결하고 읽기 쉬워지는 경우가 많음**
  - 트리/그래프 탐색, 분할 정복(Divide & Conquer, 예: Merge Sort, Quick Sort) 문제에서 특히 자연스럽습니다.
- **문제 정의 자체가 재귀적인 경우**
  - 예: 트리의 높이, 피보나치 수, DFS 등은 수학/정의 관점에서 재귀와 잘 맞습니다.

### English

- Can make code **shorter and more readable**, especially for:
  - Tree/graph traversals
  - Divide & conquer algorithms (merge sort, quick sort)
- If the problem itself has a **recursive structure**, the code directly mirrors the definition.

---

## 단점 (Disadvantages)

### 한국어 (Korean)

- **함수 호출 스택 사용**
  - 각 재귀 호출마다 스택 프레임이 쌓입니다.
  - 입력 크기가 크면 **스택 오버플로(stack overflow)** 발생 가능.
- **오버헤드**
  - 반복문에 비해 함수 호출 오버헤드가 존재.
- 잘못 작성하면 **기저 사례 없음 / 탈출 조건 오류** 로 인해 무한 재귀에 빠질 수 있음.

### English

- Uses the **call stack**
  - Each recursive call consumes stack space.
  - For large inputs, this may cause **stack overflow**.
- **Overhead** from repeated function calls compared to a simple loop.
- If the base case or termination condition is incorrect, it can lead to **infinite recursion**.

---

## 예시: 반복으로 바꾸기 (Iterative Version)

팩토리얼의 반복문 버전:

```javascript
function factorialIterative(n) {
  let result = 1;
  for (let i = 1; i <= n; i++) {
    result *= i;
  }
  return result;
}

console.log(factorialIterative(5)); // 120
```

- **KO**: 반복 버전은 호출 스택을 추가로 사용하지 않으므로, 큰 `n` 에 대해서 더 안전할 수 있습니다.
- **EN**: The iterative version avoids deep recursion and is safer for large `n`.

---

## 언제 재귀를 쓸까? (When to Use Recursion)

- **재귀 사용이 자연스럽고 코드 가독성이 높을 때**
  - 예: 트리 탐색, 백트래킹 (DFS, 순열/조합 생성)
- 깊이가 너무 깊지 않은 경우 (또는 tail recursion 최적화가 있는 언어)
- 반대로, 입력 크기가 매우 크면 **반복문 또는 명시적 스택**으로 바꾸는 것이 좋습니다.

---

## 요약 (Summary)

- **KO**: 재귀는 함수가 자기 자신을 호출하는 기법으로, 문제를 작은 하위 문제로 나누어 해결할 때 유용하지만, 호출 스택 사용과 스택 오버플로 위험, 오버헤드라는 단점이 있습니다.
- **EN**: Recursion is a technique where a function calls itself, great for naturally recursive problems but with downsides like stack usage, potential stack overflow, and function call overhead.
