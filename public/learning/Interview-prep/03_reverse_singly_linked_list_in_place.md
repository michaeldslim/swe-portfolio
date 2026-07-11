# 03. 단일 연결 리스트 뒤집기 (제자리) / Reverse a Singly Linked List In-place

## 질문 (Question)

- **KO**: "단일 연결 리스트(singly linked list)를 **추가 메모리 없이(제자리, in-place)** 뒤집는 코드를 작성해 보세요. 시간/공간 복잡도도 설명해 주세요."
- **EN**: "How would you reverse a singly linked list **in-place** (without using extra data structures)? Provide the algorithm and explain its time and space complexity."

---

## 아이디어 (Idea)

### 한국어 (Korean)

- 단일 연결 리스트는 각 노드가 `value` 와 `next` 포인터만 가집니다.
- 뒤집는다는 것은, **모든 `next` 방향을 반대로 바꾸는 것**입니다.
- 반복(iterative) 방법
  - 포인터 3개를 사용합니다: `prev`, `current`, `next`.
  - 순회하면서 `current.next` 를 `prev` 로 돌리고, 포인터들을 한 칸씩 앞으로 이동시킵니다.
  - 마지막에 `prev` 가 새로운 head 가 됩니다.
- 이렇게 하면 **추가 배열/리스트를 쓰지 않고** 링크만 바꾸므로 공간은 `O(1)` 입니다.

### English

- A singly linked list node typically has a `value` and a `next` pointer.
- Reversing the list means **reversing all `next` pointers**.
- Iterative approach:
  - Use three pointers: `prev`, `current`, and `next`.
  - While traversing the list, redirect `current.next` to point to `prev`, then move all pointers one step forward.
  - In the end, `prev` will point to the new head of the reversed list.
- This requires **no extra data structures**, so the space complexity is `O(1)`.

---

## 자바스크립트 예시 코드 (JavaScript Example)

노드 정의 예시:

```javascript
class ListNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}
```

리스트 뒤집기 함수:

```javascript
function reverseLinkedList(head) {
  let prev = null;      // 이전 노드 (처음에는 없음)
  let current = head;   // 현재 노드

  while (current !== null) {
    // 다음 노드 미리 저장
    const next = current.next;

    // 링크 방향 뒤집기
    current.next = prev;

    // 포인터 한 칸씩 이동
    prev = current;
    current = next;
  }

  // prev가 새 head
  return prev;
}

// 헬퍼: 배열로부터 연결 리스트 만들기
function buildLinkedList(values) {
  if (values.length === 0) return null;

  const head = new ListNode(values[0]);
  let current = head;

  for (let i = 1; i < values.length; i++) {
    current.next = new ListNode(values[i]);
    current = current.next;
  }

  return head;
}

// 헬퍼: 연결 리스트를 배열로 변환 (디버깅용)
function toArray(head) {
  const result = [];
  let current = head;
  while (current !== null) {
    result.push(current.value);
    current = current.next;
  }
  return result;
}

// 사용 예시 (Usage)
const head = buildLinkedList([1, 2, 3, 4, 5]);
console.log('원본:', toArray(head)); // [1, 2, 3, 4, 5]

const reversed = reverseLinkedList(head);
console.log('뒤집힌 리스트:', toArray(reversed)); // [5, 4, 3, 2, 1]
```

---

## 라인별 설명 (Line-by-line Explanation)

### 한국어 (Korean)

- `let prev = null;`
  - 현재 노드의 이전 노드를 가리키는 포인터입니다. 시작 시에는 이전 노드가 없으므로 `null` 입니다.
- `let current = head;`
  - 현재 처리 중인 노드를 가리킵니다.
- `while (current !== null) { ... }`
  - 리스트 끝까지 순회합니다.
- `const next = current.next;`
  - 링크를 바꾸기 전에, 다음 노드를 잃어버리지 않도록 미리 저장합니다.
- `current.next = prev;`
  - 링크 방향을 역전시켜, 현재 노드가 이전 노드를 가리키도록 합니다.
- `prev = current; current = next;`
  - 한 스텝 앞으로 이동합니다. `prev` 는 현재 노드로, `current` 는 원래의 다음 노드로 이동합니다.
- 반복이 끝나면, `prev` 는 원래 리스트의 마지막 노드를 가리키고, 이것이 뒤집힌 리스트의 head 가 됩니다.

### English

- `let prev = null;`
  - Pointer to the previous node; initially there is none.
- `let current = head;`
  - Pointer to the current node being processed.
- `while (current !== null) { ... }`
  - Iterate until we reach the end of the list.
- `const next = current.next;`
  - Save the next node before we change `current.next`.
- `current.next = prev;`
  - Reverse the link: make current node point to the previous node.
- `prev = current; current = next;`
  - Move both pointers one step forward.
- After the loop, `prev` points to the original tail, which is now the head of the reversed list.

---

## 시간 및 공간 복잡도 (Time & Space Complexity)

- **시간(Time)**: `O(n)`
  - 각 노드를 한 번씩 방문합니다.
- **공간(Space)**: `O(1)`
  - 링크를 제자리에서 바꾸므로, 추가 배열/리스트 없이 상수 개수의 포인터만 사용합니다.

---

## 면접에서 더 말할 수 있는 포인트 (Extra Interview Points)

- 재귀(recursive) 버전도 구현할 수 있지만, 재귀 깊이가 리스트 길이에 비례하므로 **스택 오버플로우 위험**이 있을 수 있다고 언급하면 좋습니다.
- 단일 연결 리스트이기 때문에, 이전 노드를 가리키는 포인터가 없어 **`prev` 를 명시적으로 유지**해야 한다는 점을 강조할 수 있습니다.

---

## 요약 (Summary)

- **KO**: 세 개의 포인터(`prev`, `current`, `next`)를 사용해, 각 노드의 `next` 포인터를 역전시키면 단일 연결 리스트를 `O(n)` 시간, `O(1)` 공간으로 제자리에서 뒤집을 수 있습니다.
- **EN**: By using three pointers (`prev`, `current`, `next`) and reversing each node’s `next` pointer, we can reverse a singly linked list in-place in `O(n)` time and `O(1)` extra space.
