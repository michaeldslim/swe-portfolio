# 26. 함수 인자 vs 루프 범위 / Function Argument vs Loop Range

## 질문 (Question)

다음 코드에서 콘솔 출력 결과를 예측해 보세요.

```javascript
function a(n) {
  for (let i = 0; i < 3; i++) {
    console.log(i);
  }
}

a(3);
console.log('number', 3);
```

1. 실제 콘솔 출력은 무엇인가요?
2. 함수 인자 `n` 은 어떤 역할을 하고 있나요?
3. 인터뷰어가 이 코드를 던져주고 무엇을 노릴 수 있는지 생각해 보세요.

---

## 정답 (Answer)

### 실제 출력 (Actual Output)

```text
0
1
2
number 3
```

- `a(3)` 호출에서 `0, 1, 2` 가 순서대로 출력됩니다.
- 그 다음에 `'number', 3` 이 한 줄로 출력됩니다.

---

## 이유 (Why This Happens)

### 한국어 (Korean)

- `function a(n) { ... }`
  - 인자로 `n` 을 받지만, 함수 본문 안에서 **전혀 사용하지 않습니다.**
- `for (let i = 0; i < 3; i++) { console.log(i); }`
  - `i = 0, 1, 2` 에 대해만 루프를 돌고, 각 단계에서 `console.log(i)` 호출 → `0`, `1`, `2` 출력.
- `a(3);`
  - `n = 3` 이지만, 루프와는 무관하게 항상 `0, 1, 2` 만 출력합니다.
- `console.log('number', 3);`
  - 마지막 줄에서 `'number', 3` 이 출력됩니다.

### English

- `function a(n) { ... }`
  - The parameter `n` is **never used** inside the function.
- `for (let i = 0; i < 3; i++) { console.log(i); }`
  - Loops for `i = 0, 1, 2` and logs each value.
- `a(3);`
  - Passes `3` as `n`, but since `n` is unused, the loop still runs for `0, 1, 2` only.
- `console.log('number', 3);`
  - Finally, logs `'number', 3`.

---

## 인터뷰에서 노릴 수 있는 포인트 (What the Interviewer May Be Testing)

### 한국어 (Korean)

- **코드를 그대로 읽고 정확한 실행 순서를 예측하는지**
  - 인자 `n` 에 너무 집중하면 `for (let i = 0; i < n; i++)` 로 착각할 수 있습니다.
- **이 코드를 어떻게 개선할지**
  - `n` 을 실제로 루프 범위에 반영:

    ```javascript
    function a(n) {
      for (let i = 0; i < n; i++) {
        console.log(i);
      }
    }
    ```

  - 또는 사용하지 않는 인자를 제거:

    ```javascript
    function a() {
      for (let i = 0; i < 3; i++) {
        console.log(i);
      }
    }
    ```

### English

- **Whether you actually read the code as written**
  - Easy to assume the loop is `i < n` and say it prints `0, 1, 2` up to `n - 1`, but here `n` is unused.
- **How you would improve the code**
  - Either use `n` in the loop condition or remove the unused parameter.

---

## 요약 (Summary)

- **KO**: 이 코드는 항상 `0, 1, 2` 를 출력한 뒤 `'number', 3` 을 출력하며, 인자 `n` 은 전혀 사용되지 않습니다. 인터뷰에서는 코드를 정확히 읽는지와, 필요 없는 인자를 제거/사용하도록 리팩터링할 수 있는지를 볼 수 있습니다.
- **EN**: The function always logs `0, 1, 2` and then `'number', 3`; the parameter `n` is unused. An interviewer may use this to see if you read the code carefully and how you’d refactor it to either use `n` or remove it.
