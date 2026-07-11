# 19. 두 자식을 가진 이진 트리 노드 개수 세기 (Count Binary Tree Nodes with Two Children)

> Related LeetCode: [Count Complete Tree Nodes](https://leetcode.com/problems/count-complete-tree-nodes/)

## 문제 설명 (Problem Description)

이진 트리의 루트 노드 `root`가 주어졌을 때,
**왼쪽 자식과 오른쪽 자식을 모두 가진 노드(자식이 두 개인 노드)** 의 개수를 세는 문제입니다.

Given the root of a binary tree, return the number of nodes that have **both left and right children** (i.e., nodes with exactly two children).

---

## 입력 (Input)

- 이진 트리의 루트 노드 `root`

The root node `root` of a binary tree.

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

- 두 자식을 모두 가진 노드의 **개수**를 정수로 반환합니다.

Return an integer representing how many nodes have both left and right children.

---

## 예시 (Example)

### 예시 1

트리 구조:

```text
    1
   / \
  2   3
 /   / \
4   5   6
```

- 두 자식을 가진 노드: `1`, `3` → 총 `2`개
- 출력 / Output: `2`

---

## 접근 방법 (Approach)

### 설명 (Korean)

이 문제는 **DFS(깊이 우선 탐색)** 또는 **BFS(너비 우선 탐색)** 으로 간단히 해결할 수 있습니다.

재귀 DFS로 풀어 보겠습니다.

1. 노드가 `null` 이면 0을 반환합니다.
2. 왼쪽 서브트리에서의 결과와 오른쪽 서브트리에서의 결과를 재귀적으로 구합니다.
3. 현재 노드가 `left` 와 `right` 를 모두 가지고 있으면, 1을 더합니다.
4. 왼쪽 결과 + 오른쪽 결과 + (현재 노드가 두 자식을 가지면 1, 아니면 0)을 반환합니다.

### Description (English)

We can solve this with a simple **DFS** traversal.

1. If the node is `null`, return 0.
2. Recursively count in the left and right subtrees.
3. If the current node has both `left` and `right` children, add 1.
4. Return `leftCount + rightCount + (hasTwoChildren ? 1 : 0)`.

---

## JavaScript 코드 (JavaScript Code)

```javascript
function countNodesWithTwoChildren(root) {
  if (!root) return 0;

  const leftCount = countNodesWithTwoChildren(root.left);
  const rightCount = countNodesWithTwoChildren(root.right);

  const hasTwoChildren = root.left !== null && root.right !== null;

  return leftCount + rightCount + (hasTwoChildren ? 1 : 0);
}
```

## 코드 라인별 설명 (Line-by-Line Explanation)

- `function countNodesWithTwoChildren(root) { ... }`
  - **KO:** 루트 노드를 받아, 자식이 두 개인 노드의 개수를 세는 함수입니다.
  - **EN:** Takes the root and returns the number of nodes with exactly two children.

- `if (!root) return 0;`
  - **KO:** 노드가 없으면 더 이상 셀 것이 없으므로 0을 반환합니다.
  - **EN:** Base case: an empty subtree contributes 0 to the count.

- `const leftCount = countNodesWithTwoChildren(root.left);`
  - **KO:** 왼쪽 서브트리에서 두 자식을 가진 노드 수를 재귀적으로 계산합니다.
  - **EN:** Recursively counts such nodes in the left subtree.

- `const rightCount = countNodesWithTwoChildren(root.right);`
  - **KO:** 오른쪽 서브트리에서도 동일하게 계산합니다.
  - **EN:** Recursively counts in the right subtree.

- `const hasTwoChildren = root.left !== null && root.right !== null;`
  - **KO:** 현재 노드가 왼쪽과 오른쪽 자식을 모두 가지는지 여부를 불리언으로 저장합니다.
  - **EN:** Checks whether the current node has both left and right children.

- `return leftCount + rightCount + (hasTwoChildren ? 1 : 0);`
  - **KO:** 왼쪽, 오른쪽 결과를 더하고, 현재 노드가 두 자식을 가지면 1을 더해 반환합니다.
  - **EN:** Returns the total count including the current node if applicable.

---

## 시간 및 공간 복잡도 (Time and Space Complexity)

- 시간 복잡도 (Time Complexity): `O(n)`
  - 트리의 모든 노드를 한 번씩 방문합니다.
- 공간 복잡도 (Space Complexity): `O(h)`
  - 재귀 호출 스택에 최대 트리 높이 `h` 만큼 쌓일 수 있습니다 (평균 `O(log n)`, 최악 `O(n)`).
