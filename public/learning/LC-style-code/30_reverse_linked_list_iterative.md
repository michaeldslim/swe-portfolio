# 30. 연결 리스트 뒤집기 (Reverse Linked List Iteratively)

> Related LeetCode: [Reverse Linked List](https://leetcode.com/problems/reverse-linked-list/)

## 문제 설명 (Problem Description)

단일 연결 리스트의 헤드 노드 `head` 가 주어졌을 때,
리스트를 **뒤집은(reverse) 후의 헤드 노드**를 반환하는 문제입니다.

Given the `head` of a singly linked list, reverse the list and return the new head.

---

## 입력 (Input)

- 단일 연결 리스트의 헤드 노드 `head`

The head node `head` of a singly linked list.

노드 구조는 다음과 같다고 가정합니다:

Assume the node structure:

```javascript
function ListNode(val, next = null) {
  this.val = val;
  this.next = next;
}
```

---

## 출력 (Output)

- 뒤집힌 연결 리스트의 헤드 노드.

Return the head node of the reversed linked list.

---

## 예시 (Example)

### 예시 1

- 입력 / Input: `head = [1,2,3,4,5]`
- 출력 / Output: `[5,4,3,2,1]`

### 예시 2

- 입력 / Input: `head = []`
- 출력 / Output: `[]`

---

## 접근 방식 (Approach)

### 아이디어 (Korean)

- **세 개의 포인터**를 사용하여 연결 리스트를 한 번 순회하면서 뒤집습니다.
  - `prev`: 현재 노드의 이전 노드 (초기값은 `null`).
  - `curr`: 현재 노드를 가리킵니다 (초기값은 `head`).
  - `nextTemp`: 다음 노드를 잠시 저장하는 변수.
- 각 단계에서:
  - 다음 노드를 `nextTemp` 에 저장합니다.
  - `curr.next` 를 `prev` 로 돌려 링크 방향을 뒤집습니다.
  - `prev` 를 `curr` 로 옮기고, `curr` 을 `nextTemp` 로 옮깁니다.
- 리스트 끝까지 반복하면, `prev` 가 새 헤드가 됩니다.

### Idea (English)

- Use **three pointers** to iteratively reverse the list:
  - `prev` (starts as `null`),
  - `curr` (starts as `head`),
  - `nextTemp` to temporarily store the next node.
- For each node:
  - Store `curr.next` in `nextTemp`.
  - Set `curr.next = prev` to reverse the link.
  - Move `prev` to `curr`, and `curr` to `nextTemp`.
- When `curr` becomes `null`, `prev` will be the new head of the reversed list.

---

## 자바스크립트 코드 (JavaScript Code)

```javascript
function reverseList(head) {
  let prev = null;
  let curr = head;

  while (curr !== null) {
    const nextTemp = curr.next; // 다음 노드 저장
    curr.next = prev;           // 링크 뒤집기
    prev = curr;                // prev를 한 칸 앞으로
    curr = nextTemp;            // curr를 한 칸 앞으로
  }

  return prev;
}
```

---

## 코드 라인별 설명 (Line-by-line Explanation)

### 한국어 (Korean)

- `function reverseList(head) { ... }`  
  - 연결 리스트를 뒤집고 새 헤드를 반환하는 함수입니다.
- `let prev = null;`  
  - 현재 노드의 이전 노드를 가리킬 포인터입니다. 초기에는 아무 것도 가리키지 않습니다.
- `let curr = head;`  
  - 현재 노드를 가리키는 포인터로, 처음에는 헤드에서 시작합니다.
- `while (curr !== null) { ... }`  
  - 리스트 끝(`curr === null`)에 도달할 때까지 반복합니다.
- `const nextTemp = curr.next;`  
  - 현재 노드의 다음 노드를 임시 변수에 저장해, 링크를 바꾼 뒤에도 다음으로 이동할 수 있게 합니다.
- `curr.next = prev;`  
  - 현재 노드의 `next` 를 이전 노드를 가리키도록 변경하여 링크 방향을 뒤집습니다.
- `prev = curr;`  
  - `prev` 포인터를 현재 노드 위치로 한 칸 이동합니다.
- `curr = nextTemp;`  
  - `curr` 포인터를 원래의 다음 노드로 한 칸 이동합니다.
- `return prev;`  
  - 루프가 끝나면 `prev` 는 리스트의 마지막 노드를 가리키며, 이것이 새 헤드입니다.

### English

- `function reverseList(head) { ... }`  
  - Function that reverses the linked list and returns the new head.
- `let prev = null;`  
  - Pointer to the previous node; initially set to `null`.
- `let curr = head;`  
  - Pointer to the current node; starts at the head.
- `while (curr !== null) { ... }`  
  - Loop until we pass the last node (`curr` becomes `null`).
- `const nextTemp = curr.next;`  
  - Temporarily store the next node so we don't lose it after reversing the link.
- `curr.next = prev;`  
  - Reverse the `next` pointer of the current node so it points to the previous node.
- `prev = curr;`  
  - Move `prev` forward to the current node.
- `curr = nextTemp;`  
  - Move `curr` forward to the original next node.
- `return prev;`  
  - After the loop, `prev` points to the new head of the reversed list.

---

## 시간 및 공간 복잡도 (Time and Space Complexity)

- 시간 복잡도 (Time Complexity): `O(n)`  
  - 각 노드를 정확히 한 번씩 방문합니다.
- 공간 복잡도 (Space Complexity): `O(1)`  
  - 포인터 몇 개만 사용하는 **상수 공간** 알고리즘입니다.
