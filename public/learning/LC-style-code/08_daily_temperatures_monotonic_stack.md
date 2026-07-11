# 8. 매일의 온도 (Daily Temperatures with Monotonic Stack)

> Related LeetCode: [Daily Temperatures](https://leetcode.com/problems/daily-temperatures/)

## 문제 설명 (Problem Description)

정수 배열 `temperatures`가 주어졌을 때,
각 날짜마다 **앞으로 몇 일 뒤에 더 따뜻한 날이 오는지**를 계산하는 문제입니다.

만약 더 따뜻한 날이 오지 않는다면 `0`을 넣습니다.

Given an array of integers `temperatures`, return an array `answer` such that `answer[i]` is the number
of days you have to wait after the `i`-th day to get a warmer temperature.
If there is no future day for which this is possible, put `0` instead.

---

## 입력 (Input)

- 정수 배열 `temperatures`

An integer array `temperatures`.

---

## 출력 (Output)

- 정수 배열 `answer`를 반환합니다.
- `answer[i]` 는 `i`번째 날 이후 몇 일 뒤에 더 따뜻한 날이 나오는지 나타냅니다.
- 더 따뜻한 날이 없다면 `answer[i] = 0` 입니다.

Return an integer array `answer`.

---

## 예시 (Example)

### 예시 1

- 입력 / Input: `temperatures = [73, 74, 75, 71, 69, 72, 76, 73]`
- 출력 / Output: `[1, 1, 4, 2, 1, 1, 0, 0]`

---

## 접근 방법 (Approach)

### 설명 (Korean)

이 문제는 **단조 스택(Monotonic Stack)** 을 활용해 효율적으로 풀 수 있습니다.

아이디어:

- 스택에는 **인덱스**를 저장합니다.
- 스택을 **내림차순(temperature 기준)** 으로 유지합니다.
  - 즉, 스택의 아래에서 위로 갈수록 온도가 **작거나 같다**고 유지합니다.

알고리즘:

1. 결과 배열 `answer`를 모두 `0`으로 초기화합니다.
2. 빈 스택 `stack`을 준비합니다. (스택에는 인덱스를 저장)
3. 인덱스 `i`를 0부터 끝까지 순회합니다.
   - 현재 온도 `curr = temperatures[i]` 를 확인합니다.
   - **현재 온도가 스택의 top 인덱스에 해당하는 온도보다 높을 동안**:
     - `idx = stack.pop()` 으로 인덱스를 꺼내고,
     - `answer[idx] = i - idx` (해당 idx 이후 i일 뒤에 더 따뜻해진다는 의미)
   - 위 과정을 마친 후, 현재 인덱스 `i`를 스택에 push 합니다.
4. 순회를 마치면, 스택에 남아 있는 인덱스들은 **앞으로 더 따뜻해지지 않는 날**이므로, 기본값 0을 유지합니다.

이 방식은 각 인덱스가 스택에 한 번 push 되고 최대 한 번 pop 되므로 시간 복잡도는 `O(n)` 입니다.

### Description (English)

We use a **monotonic stack** to solve this in linear time.

Idea:

- The stack stores **indices** of `temperatures`.
- We maintain the stack so that `temperatures[stack[i]]` is in **decreasing order** from bottom to top.

Algorithm:

1. Initialize the result array `answer` with zeros.
2. Use an empty stack `stack` to store indices.
3. Iterate `i` from `0` to `n - 1`:
   - Let `curr = temperatures[i]`.
   - While the stack is not empty and `curr > temperatures[stack[stack.length - 1]]`:
     - Pop the top index `idx = stack.pop()`.
     - Set `answer[idx] = i - idx` (the number of days until a warmer day).
   - Push the current index `i` onto the stack.
4. Any indices left in the stack have no warmer day in the future, so their value remains `0`.

Each index is pushed and popped at most once, so the time complexity is `O(n)`.

---

## JavaScript 코드 (JavaScript Code)

```javascript
function dailyTemperatures(temperatures) {
  const n = temperatures.length;
  const answer = Array(n).fill(0);
  const stack = []; // will store indices

  for (let i = 0; i < n; i++) {
    const curr = temperatures[i];

    // While current temperature is higher than the temperature at the top index of the stack
    while (stack.length > 0 && curr > temperatures[stack[stack.length - 1]]) {
      const idx = stack.pop();
      answer[idx] = i - idx; // number of days until a warmer temperature
    }

    stack.push(i);
  }

  return answer;
}
```

## 코드 라인별 설명 (Line-by-Line Explanation)

- `function dailyTemperatures(temperatures) {`
  - **KO:** 온도 배열 `temperatures`를 받아, 각 날마다 몇 일 뒤에 더 따뜻한 날이 나오는지 계산하는 함수입니다.
  - **EN:** Declares a function that computes, for each day, how many days until a warmer temperature.

- `const n = temperatures.length;`
  - **KO:** 배열 길이(날 수)를 `n`에 저장합니다.
  - **EN:** Stores the number of days in `n`.

- `const answer = Array(n).fill(0);`
  - **KO:** 결과 배열을 0으로 초기화합니다. 기본값 0은 더 따뜻한 날이 없다는 의미입니다.
  - **EN:** Initializes the result array with zeros, meaning no warmer day by default.

- `const stack = []; // will store indices`
  - **KO:** 단조 스택으로 활용할 배열입니다. 인덱스를 저장합니다.
  - **EN:** A stack (array) that will store indices of days.

- `for (let i = 0; i < n; i++) {`
  - **KO:** 각 날짜 인덱스 `i`를 순회합니다.
  - **EN:** Iterates through each day.

- `const curr = temperatures[i];`
  - **KO:** 현재 날짜의 온도를 `curr`에 저장합니다.
  - **EN:** Gets the current day’s temperature.

- `while (stack.length > 0 && curr > temperatures[stack[stack.length - 1]]) {`
  - **KO:** 스택이 비어 있지 않고, 현재 온도가 스택 top에 해당하는 인덱스의 온도보다 높다면,
    더 따뜻한 날을 찾은 것이므로 루프를 돕니다.
  - **EN:** While there is an index on the stack and `curr` is warmer than that day’s temperature, we’ve found a warmer day.

- `const idx = stack.pop();`
  - **KO:** 더 따뜻해질 날을 기다리던 과거의 인덱스를 꺼냅니다.
  - **EN:** Pops the index of the previous day that is now seeing a warmer day.

- `answer[idx] = i - idx;`
  - **KO:** 현재 인덱스 `i`와 과거 인덱스 `idx`의 차이가 기다린 일수입니다.
  - **EN:** Sets the waiting days for `idx` as the difference `i - idx`.

- `stack.push(i);`
  - **KO:** 현재 인덱스 `i`도 앞으로 더 따뜻한 날을 기다려야 하므로 스택에 넣습니다.
  - **EN:** Pushes the current index `i` onto the stack to await a future warmer day.

- `return answer;`
  - **KO:** 모든 날짜를 처리한 후, 각 날짜별 결과 배열을 반환합니다.
  - **EN:** Returns the final array of waiting days for each day.

---

## 시간 및 공간 복잡도 (Time and Space Complexity)

- 시간 복잡도 (Time Complexity): `O(n)`
  - 각 인덱스는 스택에 최대 한 번 push, 한 번 pop 됩니다.
- 공간 복잡도 (Space Complexity): `O(n)`
  - 결과 배열과 스택에 최대 `n`개의 인덱스가 저장될 수 있습니다.
