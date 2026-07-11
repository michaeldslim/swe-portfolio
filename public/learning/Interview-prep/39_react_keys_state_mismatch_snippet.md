# 39. key 실수로 인한 상태(state) 꼬임 예제

## 질문 (Question)

다음 코드에서 버튼을 눌러 첫 번째 항목을 삭제하면, 입력 값들이 어떻게 보일까요?

```javascript
import React, { useState } from 'react';

function Row({ label }) {
  const [value, setValue] = useState('');

  return (
    <div>
      <span>{label}: </span>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}

function App() {
  const [rows, setRows] = useState([
    { id: 'a', label: 'Row A' },
    { id: 'b', label: 'Row B' },
    { id: 'c', label: 'Row C' },
  ]);

  const removeFirst = () => {
    setRows((prev) => prev.slice(1));
  };

  return (
    <div>
      <button onClick={removeFirst}>Remove first</button>
      {rows.map((row, index) => (
        <Row key={index} label={row.label} />
      ))}
    </div>
  );
}
```

1. `Row A`, `Row B`, `Row C` 각 input에 서로 다른 텍스트를 입력한 뒤, `Remove first` 를 누르면 어떤 일이 일어날까요?
2. 왜 이런 현상이 발생하는지, `key` 관점에서 설명해 보세요.
3. 어떻게 수정해야 할까요?

---

## 정답 & 해설 (Answer & Explanation)

### 한국어 (Korean)

- 인덱스를 key 로 쓰고 있기 때문에, 첫 번째 항목을 삭제하면:
  - React는 기존 index 1, 2 를 **같은 key(1, 2)를 가진 컴포넌트로 간주하고 DOM/컴포넌트를 재사용**합니다.
  - 그 결과, 두 번째/세 번째 `Row` 의 state (`value`) 가 **한 칸씩 위로 밀려 보이는** 현상이 발생할 수 있습니다.
- 즉, 사용자가 `Row A = "aaa"`, `Row B = "bbb"`, `Row C = "ccc"` 를 입력한 뒤 첫 번째를 삭제하면:
  - 화면에는 `Row B` input에 여전히 `"bbb"` 가 남아 있는 것처럼 보이지만,
  - 실제로는 **이전 `Row C` 컴포넌트의 state가 reused** 되는 등, 사용자의 기대와 다른 동작이 발생할 수 있습니다.

### English

- Because `index` is used as `key`, when you remove the first row:
  - React reuses the existing component instances for indices 1 and 2.
  - The state (`value`) for each `Row` gets **shifted** and ends up attached to the wrong label.
- In practice, it can look like the text you typed for one row appears under a different row after deletion.

---

## 올바른 수정 (Fix)

### 한국어 (Korean)

```javascript
{rows.map((row) => (
  <Row key={row.id} label={row.label} />
))}
```

- `id` 처럼 **안정적인 고유 식별자**를 key로 사용해야 합니다.
- 그러면 React가 각 `Row` 의 state를 올바르게 유지할 수 있습니다.

### English

- Use a **stable unique id** as the key:

```javascript
{rows.map((row) => (
  <Row key={row.id} label={row.label} />
))}
```

- This way, React can keep each row’s state attached to the correct item, even when items are removed or reordered.

---

## 요약 (Summary)

- **KO**: 리스트에서 index를 key로 쓰면 항목을 삭제/이동할 때 컴포넌트 인스턴스와 state가 엇갈려, 사용자가 입력한 값이 다른 행으로 이동하는 것처럼 보이는 버그가 생길 수 있습니다. 항상 안정적인 고유 ID를 key로 사용하는 습관을 들이는 것이 좋습니다.
- **EN**: Using indices as keys can cause component state to shift between items when the list changes. Always prefer stable unique IDs for keys so that each item’s state stays with the correct row.
