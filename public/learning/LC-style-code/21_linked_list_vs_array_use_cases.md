# 21. 배열 vs 연결 리스트 사용 사례 (Array vs Linked List Use Cases)

> Related LeetCode: [Design Linked List](https://leetcode.com/problems/design-linked-list/)

## 문제 설명 (Problem Description)

**배열(Array)** 과 **단일 연결 리스트(Singly Linked List)** 의 특성을 비교하고,
각 자료구조를 어떤 상황에서 사용하는 것이 적절한지 설명하는 문제입니다.

또한, 단일 연결 리스트의 기본 구조와
- 맨 앞에 노드 추가 (push front)
- 값 검색 (search)
을 구현합니다.

Compare **arrays** and **singly linked lists** in terms of their characteristics and
explain typical use cases for each.

Then, implement a basic singly linked list with operations:
- Push a node to the front
- Search for a value

---

## 배열 vs 연결 리스트 개념 비교 (Conceptual Comparison)

### 설명 (Korean)

- **배열(Array)**
  - 메모리상에 **연속적인 영역**에 저장됩니다.
  - 인덱스를 통한 임의 접근(random access)이 가능합니다. `O(1)`
  - 중간에 원소를 삽입/삭제하면, 뒤의 원소들을 이동해야 하므로 `O(n)` 시간이 걸립니다.
  - 캐시 친화적(cache friendly)입니다.

- **연결 리스트(Linked List)**
  - 각 노드는 값과 다음 노드를 가리키는 포인터(참조)를 가집니다.
  - 메모리상에 **연속적으로 존재할 필요가 없습니다.**
  - 임의 접근은 불가능하고, 노드를 찾으려면 앞에서부터 순차적으로 탐색해야 합니다. `O(n)`
  - 중간에 노드를 삽입/삭제할 때, 포인터만 수정하면 되므로 해당 위치에 도달했다는 가정 하에 `O(1)` 입니다.

**언제 무엇을 사용할까?**

- 배열을 선호하는 경우:
  - 인덱스를 이용한 빠른 임의 접근이 중요할 때
  - 크기가 자주 변하지 않고, 읽기 위주일 때
  - 캐시 효율이 중요한 경우

- 연결 리스트를 선호하는 경우:
  - 리스트 중간에 원소를 자주 삽입/삭제할 때
  - 크기가 자주 변하고, 메모리 재할당 비용을 피하고 싶을 때

### Description (English)

- **Array**
  - Stored in a **contiguous memory block**.
  - Supports `O(1)` random access by index.
  - Inserting/deleting in the middle requires shifting elements → `O(n)`.
  - Cache-friendly due to spatial locality.

- **Linked List**
  - Each node holds a value and a reference to the next node.
  - Nodes do **not** need to be contiguous in memory.
  - No random access; to reach a node you must traverse from the head → `O(n)` search.
  - Insert/delete at a known position can be `O(1)` (just adjusting pointers).

**Use cases:**

- Prefer **arrays** when:
  - You need fast random access by index.
  - The size is relatively stable and operations are mostly reads.

- Prefer **linked lists** when:
  - You frequently insert/delete elements in the middle.
  - You want to avoid reallocating contiguous memory when the collection grows.

---

## JavaScript 코드 (JavaScript Code)

```javascript
class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

class SinglyLinkedList {
  constructor() {
    this.head = null;
  }

  // Add a new node with value val at the front of the list
  pushFront(val) {
    const newNode = new ListNode(val, this.head);
    this.head = newNode;
  }

  // Search for a value in the list, return true if found
  search(target) {
    let current = this.head;
    while (current !== null) {
      if (current.val === target) return true;
      current = current.next;
    }
    return false;
  }

  // Convert list to array (for debugging / visualization)
  toArray() {
    const result = [];
    let current = this.head;
    while (current !== null) {
      result.push(current.val);
      current = current.next;
    }
    return result;
  }
}
```

## 코드 라인별 설명 (Line-by-Line Explanation)

- `class ListNode { constructor(val, next = null) { ... } }`
  - **KO:** 단일 연결 리스트의 하나의 노드를 표현하는 클래스입니다. 값과 다음 노드 참조를 가집니다.
  - **EN:** Represents a node in a singly linked list with a value and pointer to the next node.

- `class SinglyLinkedList { constructor() { this.head = null; } }`
  - **KO:** 단일 연결 리스트 전체를 나타내는 클래스입니다. `head` 포인터를 가집니다.
  - **EN:** Encapsulates the singly linked list, keeping a pointer to the head node.

- `pushFront(val) { ... }`
  - **KO:** 새 노드를 리스트 맨 앞에 추가합니다.
    - 새 노드의 `next`를 현재 `head`로 설정하고, `head`를 새 노드로 갱신합니다.
  - **EN:** Inserts a new node at the front by pointing it to the current head and updating `head`.

- `search(target) { ... }`
  - **KO:** 리스트를 순회하면서 `target` 값을 가진 노드가 있는지 확인합니다.
  - **EN:** Traverses the list, returning true if a node with value `target` is found.

- `toArray() { ... }`
  - **KO:** 디버깅이나 출력용으로 리스트의 내용을 배열로 변환합니다.
  - **EN:** Converts the linked list into an array for easier visualization.

---

## 시간 및 공간 복잡도 (Time and Space Complexity)

- `pushFront`
  - 시간 복잡도 (Time): `O(1)`
  - 공간 복잡도 (Space): `O(1)` (새 노드 하나)

- `search`
  - 시간 복잡도 (Time): `O(n)` (최악의 경우 리스트 전체를 순회)
  - 공간 복잡도 (Space): `O(1)`

- `toArray`
  - 시간 복잡도 (Time): `O(n)`
  - 공간 복잡도 (Space): `O(n)` (배열에 모든 값을 저장)
