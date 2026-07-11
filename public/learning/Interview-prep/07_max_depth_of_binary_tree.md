# 07. 이진 트리의 최대 깊이 / Maximum Depth of a Binary Tree

## 질문 (Question)

- **KO**: "이진 트리(Binary Tree)가 주어졌을 때, 최대 깊이(max depth)를 구하는 방법을 설명해 보세요. 재귀/반복(BFS) 접근 모두 가능하면 설명해 주세요."
- **EN**: "Given a binary tree, how would you compute its maximum depth? Explain both recursive and iterative (BFS) approaches if possible."

---

## 개념 (Concept)

### 한국어 (Korean)

- **최대 깊이**(또는 높이): root 노드에서 가장 깊은 leaf 노드까지의 **노드 개수**
- 예: root 혼자만 있으면 깊이는 1

### English

- **Maximum depth (height)**: The number of nodes on the longest path from the root down to a leaf.
- Example: A single root node has depth 1.

---

## 재귀 DFS 접근 (Recursive DFS Approach)

### 아이디어 (Idea)

- 왼쪽 서브트리의 최대 깊이와 오른쪽 서브트리의 최대 깊이를 각각 구한 뒤, **둘 중 큰 값 + 1** (현재 노드) 를 반환합니다.
- 빈 노드(null) 의 깊이는 0 으로 둡니다.

### 자바스크립트 예시 (JavaScript Example)

```javascript
class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

function maxDepth(root) {
  if (root === null) return 0;

  const leftDepth = maxDepth(root.left);
  const rightDepth = maxDepth(root.right);

  return Math.max(leftDepth, rightDepth) + 1;
}
```

### 라인별 설명 (Korean & English)

- `if (root === null) return 0;`
  - **KO**: 노드가 없으면 깊이는 0입니다.
  - **EN**: An empty subtree has depth 0.
- `const leftDepth = maxDepth(root.left);`
  - **KO**: 왼쪽 서브트리의 최대 깊이를 재귀로 구합니다.
  - **EN**: Recursively compute max depth of the left subtree.
- `const rightDepth = maxDepth(root.right);`
  - **KO**: 오른쪽 서브트리의 최대 깊이를 구합니다.
  - **EN**: Recursively compute max depth of the right subtree.
- `return Math.max(leftDepth, rightDepth) + 1;`
  - **KO**: 둘 중 더 큰 깊이에 현재 노드(1)를 더합니다.
  - **EN**: Take the larger of the two depths and add 1 for the current node.

---

## 반복 BFS 접근 (Iterative BFS with Queue)

### 아이디어 (Idea)

- 레벨 순회(level-order traversal, BFS)를 사용하면 **트리의 높이 = 레벨 개수** 입니다.
- 큐(queue)에 root 를 넣고, 각 레벨마다 큐의 사이즈만큼 노드를 처리하면서 `depth++` 합니다.

### 자바스크립트 예시 (JavaScript Example)

```javascript
function maxDepthBFS(root) {
  if (root === null) return 0;

  const queue = [root];
  let depth = 0;

  while (queue.length > 0) {
    const levelSize = queue.length; // 현재 레벨에 있는 노드 수

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      if (node.left !== null) queue.push(node.left);
      if (node.right !== null) queue.push(node.right);
    }

    depth++; // 한 레벨을 모두 처리할 때마다 깊이 +1
  }

  return depth;
}
```

### 라인별 설명 (Korean & English)

- `const queue = [root]; let depth = 0;`
  - **KO**: BFS를 위한 큐를 만들고, 현재까지의 깊이를 0으로 둡니다.
  - **EN**: Initialize a queue for BFS and a depth counter.
- `const levelSize = queue.length;`
  - **KO**: 현재 레벨에 있는 노드 수를 기록합니다.
  - **EN**: Number of nodes in the current level.
- `for (let i = 0; i < levelSize; i++) { ... }`
  - **KO**: 해당 레벨의 노드들만 처리합니다.
  - **EN**: Process exactly one level at a time.
- `depth++;`
  - **KO**: 한 레벨 처리가 끝날 때마다 깊이를 1 증가시킵니다.
  - **EN**: After each level, increment the depth.

---

## 시간 및 공간 복잡도 (Time & Space Complexity)

- `n` = 트리의 노드 개수
- **재귀 DFS / BFS 공통**
  - 시간(Time): `O(n)` — 모든 노드를 정확히 한 번씩 방문
  - 공간(Space):
    - DFS: 재귀 호출 스택이 최악의 경우 `O(h)` (`h` = 트리 높이, 편향 트리에서는 `O(n)`)
    - BFS: 큐에 최대 한 레벨의 노드들이 들어가므로 최악의 경우 `O(n)`

---

## 면접에서 추가로 말할 포인트 (Extra Interview Points)

- 재귀가 허용되지 않거나 스택 오버플로가 걱정되는 환경에서는 BFS/스택을 이용한 **반복 구현**이 유용하다고 언급할 수 있습니다.
- 최대 깊이뿐만 아니라 **최소 깊이(min depth)** 문제도 유사한 방식으로 풀 수 있습니다.

---

## 요약 (Summary)

- **KO**: 이진 트리의 최대 깊이는 "왼쪽/오른쪽 서브트리의 최대 깊이 중 큰 값 + 1" 이라는 재귀 정의로 `O(n)` 에 구하거나, BFS로 레벨 수를 세는 방식으로 구할 수 있습니다.
- **EN**: The maximum depth of a binary tree can be computed in `O(n)` either recursively as `max(leftDepth, rightDepth) + 1` or iteratively using BFS by counting the number of levels.
