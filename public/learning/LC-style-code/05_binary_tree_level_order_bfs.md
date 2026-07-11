# 5. 이진 트리 레벨 순회 (Binary Tree Level Order Traversal with BFS)

> Related LeetCode: [Binary Tree Level Order Traversal](https://leetcode.com/problems/binary-tree-level-order-traversal/)

## 문제 설명 (Problem Description)

이진 트리의 루트 노드 `root`가 주어졌을 때,
**각 레벨(level)의 노드 값들을 왼쪽에서 오른쪽 순서로** 모아 2차원 배열로 반환하는 문제입니다.

Given the `root` of a binary tree, return the **level order traversal** of its nodes' values
(from left to right, level by level).

---

## 입력 (Input)

- 이진 트리의 루트 노드 `root` (null일 수도 있음)

The root node `root` of a binary tree (may be `null`).

트리 노드 구조는 다음과 같다고 가정합니다:

Assume the tree node structure:

```javascript
function TreeNode(val, left = null, right = null) {
  this.val = val;
  this.left = left;
  this.right = right;
}
```

---

## 출력 (Output)

- 각 레벨의 노드 값들을 담은 2차원 배열을 반환합니다.
- `result[i]` 는 트리의 `i`번째 레벨(0-indexed)에 있는 노드 값 배열입니다.

Return a 2D array `result` where `result[i]` is the list of node values at level `i`.

---

## 예시 (Example)

### 예시 1

트리 구조:

```text
    3
   / \
  9  20
    /  \
   15   7
```

- 출력 / Output: `[[3], [9, 20], [15, 7]]`

---

## 접근 방법 (Approach)

### 설명 (Korean)

이 문제는 **너비 우선 탐색(BFS, Breadth-First Search)** 을 사용하여 각 레벨을 순서대로 방문하면 쉽게 해결할 수 있습니다.

1. 루트 노드가 `null` 이면 빈 배열 `[]` 을 바로 반환합니다.
2. `queue` (배열 또는 큐 자료구조)를 사용하여 탐색할 노드들을 관리합니다.
   - 처음에는 `queue = [root]` 로 시작합니다.
3. 큐가 빌 때까지 반복합니다.
   - 현재 레벨에 있는 노드의 개수를 `levelSize = queue.length` 로 기록합니다.
   - 길이가 `levelSize` 인 루프를 돌면서, 그 레벨에 있는 모든 노드를 처리합니다.
     - `node = queue.shift()` 로 큐에서 하나를 꺼내고, `level` 배열에 `node.val` 을 추가합니다.
     - `node.left` 가 존재하면 `queue.push(node.left)`
     - `node.right` 가 존재하면 `queue.push(node.right)`
   - 이 레벨의 탐색이 끝나면, `level` 배열을 결과 배열 `result` 에 추가합니다.

이 방식으로 한 레벨씩 순서대로 탐색할 수 있으며, 모든 노드를 정확히 한 번씩 방문하므로
시간 복잡도는 `O(n)` 입니다.

### Description (English)

We can solve this using **Breadth-First Search (BFS)** to traverse the tree level by level.

1. If `root` is `null`, return an empty array `[]`.
2. Use a `queue` to store nodes to be processed.
   - Initialize `queue = [root]`.
3. While the queue is not empty:
   - Let `levelSize = queue.length` (the number of nodes in the current level).
   - For `levelSize` iterations:
     - Dequeue a node `node = queue.shift()`.
     - Append `node.val` to the current `level` array.
     - If `node.left` exists, enqueue it.
     - If `node.right` exists, enqueue it.
   - After processing all nodes of the current level, push `level` into the `result` array.

Each node is visited exactly once, so the time complexity is `O(n)`.

---

## JavaScript 코드 (JavaScript Code)

```javascript
function levelOrder(root) {
  if (!root) return [];

  const result = [];
  const queue = [root];

  while (queue.length > 0) {
    const levelSize = queue.length;
    const level = [];

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      level.push(node.val);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    result.push(level);
  }

  return result;
}
```

## 코드 라인별 설명 (Line-by-Line Explanation)

- `function levelOrder(root) {`
  - **KO:** 이진 트리의 루트 노드 `root`를 받아, 레벨 순회 결과를 반환하는 함수입니다.
  - **EN:** Declares a function that takes the tree root and returns its level order traversal.

- `if (!root) return [];`
  - **KO:** 루트가 없으면(트리가 비어 있으면) 빈 배열을 바로 반환합니다.
  - **EN:** If the tree is empty, returns an empty array immediately.

- `const result = [];`
  - **KO:** 각 레벨의 노드 값 배열들을 담을 결과 배열입니다.
  - **EN:** Stores arrays of node values for each level.

- `const queue = [root];`
  - **KO:** BFS를 위한 큐를 초기화하고, 시작 노드로 루트를 넣습니다.
  - **EN:** Initializes the BFS queue with the root node.

- `while (queue.length > 0) {`
  - **KO:** 큐에 노드가 있는 동안 계속해서 레벨 단위로 탐색합니다.
  - **EN:** Continues processing while there are nodes left in the queue.

- `const levelSize = queue.length;`
  - **KO:** 현재 레벨에 있는 노드의 개수를 기록합니다.
  - **EN:** Records how many nodes belong to the current level.

- `const level = [];`
  - **KO:** 현재 레벨의 노드 값들을 저장할 배열입니다.
  - **EN:** Will hold the values of nodes in the current level.

- `for (let i = 0; i < levelSize; i++) {`
  - **KO:** 현재 레벨에 있는 노드 수만큼 반복하여 처리합니다.
  - **EN:** Iterates exactly over the nodes of the current level.

- `const node = queue.shift();`
  - **KO:** 큐의 앞에서 하나의 노드를 꺼냅니다.
  - **EN:** Dequeues the next node to process from the queue.

- `level.push(node.val);`
  - **KO:** 현재 노드의 값을 현재 레벨 배열에 추가합니다.
  - **EN:** Appends the node’s value to the current level’s list.

- `if (node.left) queue.push(node.left);`
  - **KO:** 왼쪽 자식이 있으면, 다음 레벨 처리를 위해 큐에 추가합니다.
  - **EN:** If there is a left child, enqueues it for future processing.

- `if (node.right) queue.push(node.right);`
  - **KO:** 오른쪽 자식이 있으면, 마찬가지로 큐에 추가합니다.
  - **EN:** If there is a right child, enqueues it as well.

- `result.push(level);`
  - **KO:** 현재 레벨의 모든 노드 처리가 끝나면, 그 레벨 배열을 결과에 추가합니다.
  - **EN:** After finishing the level, appends this level’s list to `result`.

- `return result;`
  - **KO:** 모든 레벨의 탐색을 마친 뒤, 레벨 순회 결과를 반환합니다.
  - **EN:** Returns the full level order traversal as a 2D array.

---

## 시간 및 공간 복잡도 (Time and Space Complexity)

- 시간 복잡도 (Time Complexity): `O(n)`
  - 트리의 모든 노드를 정확히 한 번 방문합니다.
- 공간 복잡도 (Space Complexity): `O(n)`
  - 큐에 최대한 많이 저장될 수 있는 노드 수는 최악의 경우 `n`개입니다.
  - 결과 배열에도 모든 노드 값이 저장됩니다.
