# 35. React key, Reconciliation, List Rendering Pitfalls

## 1. 질문 (Question)

- React에서 `key` prop 은 왜 필요한가요?
- 잘못된 key 사용(예: index를 key로 사용)이 어떤 버그를 만들 수 있나요?
- Reconciliation 과정에서 key 가 어떤 역할을 하는지 설명해 보세요.

---

## 2. 개념 정리 (Concept)

### 한국어 (Korean)

- **Reconciliation**
  - 이전 렌더 트리와 새로운 렌더 트리를 비교하여, **최소한의 DOM 변경**으로 UI 를 업데이트하는 과정.

- **key prop**
  - 리스트 렌더링에서 각 항목을 **고유하게 식별**하기 위한 힌트.
  - React는 key를 사용해서 "어떤 항목이 추가/삭제/이동되었는지" 를 판단.

### English

- **Reconciliation**
  - The process React uses to **diff the previous and next virtual trees** and apply minimal DOM changes.

- **key prop**
  - A stable identifier for list items so React can track which items changed, were added, or removed.

---

## 3. index를 key로 쓸 때의 문제 (Problems with Index as Key)

```javascript
import React, { useState } from 'react';

function TodoList() {
  const [items, setItems] = useState([
    { id: 'a', text: 'Buy milk' },
    { id: 'b', text: 'Learn React' },
  ]);

  const removeFirst = () => {
    setItems((prev) => prev.slice(1));
  };

  return (
    <div>
      <button onClick={removeFirst}>Remove first</button>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <input defaultValue={item.text} />
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### KO 설명

- 인덱스를 key로 사용하면, 첫 번째 항목을 삭제할 때:
  - React 입장에서는 `index` 가 0,1 → 여전히 두 개의 항목이 있고, 각각의 key 는 그대로 0,1.
  - DOM 상에서는 **첫 번째 `li`가 재사용**되고, 그 안의 `input` 값이 기대와 다르게 남을 수 있음.
- 결과적으로, 사용자가 입력한 값이 **다른 항목으로 "옮겨 붙는"** 버그가 발생할 수 있습니다.

### EN Explanation

- When using `index` as `key`, removing the first item doesn’t change the keys (still 0, 1, ...).
- React reuses DOM nodes based on keys, so inputs can appear to "move" and preserve the wrong value.

---

## 4. 올바른 key 사용 (Using Keys Correctly)

### 한국어 (Korean)

- **안정적인 고유 ID 사용**
  - DB id, uuid, 비즈니스적으로 유의미한 unique key.
- key는 **리스트 내에서만 유일하면** 됩니다 (전역 유일 X).
- key는 **렌더마다 안정적**이어야 하며, 인덱스처럼 항목 이동에 따라 달라지면 안 됩니다.

### English

- Use **stable, unique identifiers** (e.g., DB ids, UUIDs, business keys).
- Keys only need to be unique **within a list**, not globally.
- Keys should not change when items move; otherwise React can’t track them reliably.

---

## 5. 한 줄 요약 (Summary)

- **KO**: React에서 key 는 Reconciliation 과정에서 각 리스트 항목을 안정적으로 추적하기 위한 식별자이며, 인덱스를 key로 쓰면 항목 추가/삭제/이동 시 input 값이 뒤섞이는 등 미묘한 버그가 생길 수 있으므로, 가능한 항상 안정적인 고유 ID를 key로 사용하는 것이 좋습니다.
- **EN**: Keys help React track list items during reconciliation; using indices as keys can cause subtle bugs when items are added, removed, or reordered, so prefer stable unique IDs as keys.
