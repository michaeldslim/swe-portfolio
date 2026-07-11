# 25. 이진 트리의 최대 깊이 (Maximum Depth of Binary Tree)

> Related LeetCode: [Maximum Depth of Binary Tree](https://leetcode.com/problems/maximum-depth-of-binary-tree/)

## 문제 설명 (Problem Description)

이진 트리의 루트 노드 `root`가 주어졌을 때,
트리의 **최대 깊이(maximum depth)** 를 구하는 문제입니다.

최대 깊이란, 루트 노드에서 시작해서 **가장 깊은 리프 노드**까지 가는 경로에 포함된 노드의 개수입니다.

Given the `root` of a binary tree, return its **maximum depth**.
A leaf is a node with no children.

---

## 입력 (Input)

- 이진 트리의 루트 노드 `root` (null일 수 있음)

The root node `root` of a binary tree (may be `null`).

노드 구조는 다음과 같다고 가정합니다:

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

- 이진 트리의 최대 깊이를 나타내는 정수.

Return an integer representing the maximum depth of the tree.

---

## 예시 (Example)

### 예시 1

- 입력 / Input:

```text
    3
   / \
  9  20
    /  \
   15   7
```

- 출력 / Output: `3`

### 예시 2

- 입력 / Input: `root = null`
- 출력 / Output: `0`

---

## 접근 방식 (Approach)

### 아이디어 (Korean)

- **재귀 DFS** 를 사용해 왼쪽 서브트리와 오른쪽 서브트리의 깊이를 구합니다.
- 노드가 `null` 이면 깊이는 0입니다.
- 그렇지 않다면, `leftDepth = 왼쪽 서브트리 깊이`, `rightDepth = 오른쪽 서브트리 깊이` 를 구한 뒤,
  `Math.max(leftDepth, rightDepth) + 1` 이 현재 노드의 깊이가 됩니다.

### Idea (English)

- Use **recursive DFS** to compute the depth of the left and right subtrees.
- If the node is `null`, its depth is 0.
- Otherwise:
  - Let `leftDepth` be the depth of the left subtree.
  - Let `rightDepth` be the depth of the right subtree.
  - The depth at the current node is `Math.max(leftDepth, rightDepth) + 1`.

---

## 자바스크립트 코드 (JavaScript Code)

```javascript
function maxDepth(root) {
  if (root === null) {
    return 0;
  }

  const leftDepth = maxDepth(root.left);
  const rightDepth = maxDepth(root.right);

  return Math.max(leftDepth, rightDepth) + 1;
}
```

---

## 코드 라인별 설명 (Line-by-line Explanation)

### 한국어 (Korean)

- `function maxDepth(root) { ... }`  
  - 이진 트리의 최대 깊이를 계산하는 재귀 함수입니다.
- `if (root === null) { return 0; }`  
  - 노드가 없으면(빈 트리) 깊이는 0입니다.
- `const leftDepth = maxDepth(root.left);`  
  - 왼쪽 서브트리의 최대 깊이를 재귀적으로 구합니다.
- `const rightDepth = maxDepth(root.right);`  
  - 오른쪽 서브트리의 최대 깊이를 재귀적으로 구합니다.
- `return Math.max(leftDepth, rightDepth) + 1;`  
  - 현재 노드를 포함하므로 더 깊은 서브트리의 깊이에 1을 더해 반환합니다.

### English

- `function maxDepth(root) { ... }`  
  - Recursive function to compute the maximum depth of a binary tree.
- `if (root === null) { return 0; }`  
  - If the node is `null`, the depth is 0.
- `const leftDepth = maxDepth(root.left);`  
  - Recursively compute the depth of the left subtree.
- `const rightDepth = maxDepth(root.right);`  
  - Recursively compute the depth of the right subtree.
- `return Math.max(leftDepth, rightDepth) + 1;`  
  - The depth at this node is the larger of the two depths plus 1 (for the current node).

---

## 시간 및 공간 복잡도 (Time and Space Complexity)

- 시간 복잡도 (Time Complexity): `O(n)`  
  - 각 노드를 정확히 한 번씩 방문합니다 (`n`은 노드 개수).
- 공간 복잡도 (Space Complexity): `O(h)`  
  - 재귀 호출 스택의 깊이는 트리 높이 `h`에 비례합니다. 최악의 경우(한쪽으로 치우친 트리)는 `O(n)` 이고, 균형 잡힌 트리는 `O(log n)` 입니다.
