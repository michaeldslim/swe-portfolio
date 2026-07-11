# 16. 이진 트리 설계 (Binary Tree Design: Basic Operations)

> Related LeetCode: [Insert into a Binary Search Tree](https://leetcode.com/problems/insert-into-a-binary-search-tree/)

## 문제 설명 (Problem Description)

이진 트리(Binary Tree)를 표현하는 `TreeNode` 구조를 설계하고,
주어진 값들을 이용해 **이진 검색 트리(Binary Search Tree, BST)** 를 구성한 뒤
다음 연산들을 구현하는 문제입니다.

1. 값 삽입 (`insert`)
2. 값 검색 (`search`)
3. 중위 순회 결과 반환 (`inorderTraversal`)

Design a `TreeNode` structure to represent a **Binary Search Tree (BST)** and
implement the following operations:

1. Insert a value into the BST (`insert`)
2. Search for a value in the BST (`search`)
3. Return the inorder traversal of the BST (`inorderTraversal`)

---

## 입력 (Input)

- 정수 배열 `values`: BST에 순서대로 삽입할 값들
- 정수 `target`: 검색할 값

An array of integers `values` to insert into a BST (in order),
and an integer `target` to search for.

---

## 출력 (Output)

- `insert` 후 구성된 BST에서:
  - `search(target)` 가 `true` 또는 `false` 를 반환
  - `inorderTraversal(root)` 가 **정렬된 순서의 배열**을 반환

After building the BST from `values`:

- `search(target)` returns `true` or `false`
- `inorderTraversal(root)` returns the sorted order of the inserted values.

---

## 예시 (Example)

### 예시 1

- 입력 / Input:
  - `values = [5, 3, 7, 2, 4, 6, 8]`
  - `target = 4`
- 출력 / Output:
  - `search(4) -> true`
  - `inorderTraversal(root) -> [2, 3, 4, 5, 6, 7, 8]`

---

## 접근 방법 (Approach)

### 설명 (Korean)

이진 검색 트리(BST)는 다음 성질을 가집니다.

- 어떤 노드 `node` 에 대해:
  - 왼쪽 서브트리의 모든 값 < `node.val`
  - 오른쪽 서브트리의 모든 값 > `node.val`

이 성질을 이용해 삽입과 검색을 재귀적으로 구현할 수 있습니다.

1. **TreeNode 설계**
   - 각 노드는 `val`, `left`, `right` 세 개의 필드를 가집니다.
2. **삽입 (insert)**
   - 현재 노드가 `null` 이면, 새 노드를 생성해 반환합니다.
   - 삽입할 값이 현재 노드 값보다 작으면 왼쪽 서브트리로 재귀 호출합니다.
   - 크면 오른쪽 서브트리로 재귀 호출합니다.
3. **검색 (search)**
   - 현재 노드가 `null` 이면 `false`.
   - `target === node.val` 이면 `true`.
   - `target < node.val` 이면 왼쪽으로, 크면 오른쪽으로 재귀 탐색합니다.
4. **중위 순회 (inorderTraversal)**
   - 왼쪽 서브트리 방문 → 현재 노드 방문 → 오른쪽 서브트리 방문 순으로 재귀 호출합니다.
   - BST에서 중위 순회 결과는 항상 **정렬된 순서**가 됩니다.

### Description (English)

A Binary Search Tree (BST) satisfies:

- For any node `node`:
  - All values in the left subtree < `node.val`
  - All values in the right subtree > `node.val`

This property lets us implement insertion and search recursively:

1. **TreeNode design**
   - Each node has `val`, `left`, `right`.
2. **Insert**
   - If the current node is `null`, create and return a new node.
   - If `value < node.val`, insert into the left subtree.
   - If `value > node.val`, insert into the right subtree.
3. **Search**
   - If the current node is `null`, return `false`.
   - If `target === node.val`, return `true`.
   - If `target < node.val`, search left; otherwise search right.
4. **Inorder traversal**
   - Recursively visit: left subtree → current node → right subtree.
   - For a BST, this produces values in sorted order.

---

## JavaScript 코드 (JavaScript Code)

```javascript
function TreeNode(val, left = null, right = null) {
  this.val = val;
  this.left = left;
  this.right = right;
}

function insertIntoBST(root, val) {
  if (root === null) {
    return new TreeNode(val);
  }

  if (val < root.val) {
    root.left = insertIntoBST(root.left, val);
  } else if (val > root.val) {
    root.right = insertIntoBST(root.right, val);
  }

  return root;
}

function searchBST(root, target) {
  if (root === null) return false;
  if (root.val === target) return true;
  if (target < root.val) return searchBST(root.left, target);
  return searchBST(root.right, target);
}

function inorderTraversal(root) {
  const result = [];

  function dfs(node) {
    if (!node) return;
    dfs(node.left);
    result.push(node.val);
    dfs(node.right);
  }

  dfs(root);
  return result;
}

// Helper to build a BST from an array of values
function buildBST(values) {
  let root = null;
  for (const v of values) {
    root = insertIntoBST(root, v);
  }
  return root;
}
```

## 코드 라인별 설명 (Line-by-Line Explanation)

- `function TreeNode(val, left = null, right = null) { ... }`
  - **KO:** 이진 트리의 노드를 표현하는 생성자 함수입니다. 값과 왼쪽/오른쪽 자식을 가집니다.
  - **EN:** Constructor for a tree node, holding a value and left/right children.

- `function insertIntoBST(root, val) { ... }`
  - **KO:** BST에 새로운 값을 삽입하는 함수입니다.
  - **EN:** Inserts a new value into the BST.

- `if (root === null) { return new TreeNode(val); }`
  - **KO:** 현재 위치가 비어 있으면, 새 노드를 생성하여 해당 위치에 삽입합니다.
  - **EN:** If we reached a null spot, create and return a new node.

- `if (val < root.val) { root.left = insertIntoBST(root.left, val); }`
  - **KO:** 삽입할 값이 더 작으면 왼쪽 서브트리에 재귀적으로 삽입합니다.
  - **EN:** For smaller values, recurse into the left subtree.

- `else if (val > root.val) { root.right = insertIntoBST(root.right, val); }`
  - **KO:** 더 크면 오른쪽 서브트리에 재귀적으로 삽입합니다.
  - **EN:** For larger values, recurse into the right subtree.

- `function searchBST(root, target) { ... }`
  - **KO:** BST에서 값 `target` 이 존재하는지 검색하는 함수입니다.
  - **EN:** Searches for `target` in the BST.

- `if (root === null) return false;`
  - **KO:** 리프를 지나 null에 도달하면 값이 없으므로 `false` 입니다.
  - **EN:** If we hit null, the value is not present.

- `if (root.val === target) return true;`
  - **KO:** 현재 노드 값이 `target` 과 같으면 찾았으므로 `true` 를 반환합니다.
  - **EN:** If the current node matches the target, return true.

- `if (target < root.val) return searchBST(root.left, target);`
  - **KO:** `target` 이 더 작으면 왼쪽 서브트리에서 계속 검색합니다.
  - **EN:** Search in the left subtree for smaller target.

- `return searchBST(root.right, target);`
  - **KO:** 그렇지 않으면 오른쪽 서브트리에서 검색합니다.
  - **EN:** Otherwise search in the right subtree.

- `function inorderTraversal(root) { ... }`
  - **KO:** BST의 중위 순회를 수행하여 값을 정렬된 순서로 반환합니다.
  - **EN:** Performs inorder traversal and returns values in sorted order.

- `function dfs(node) { ... }`
  - **KO:** 재귀 DFS를 사용하여 왼쪽 → 현재 → 오른쪽 순으로 방문합니다.
  - **EN:** Recursive helper that visits left, then node, then right.

- `function buildBST(values) { ... }`
  - **KO:** 주어진 배열을 순회하며 BST를 구성하는 헬퍼 함수입니다.
  - **EN:** Helper to build a BST by inserting all values in order.

---

## 시간 및 공간 복잡도 (Time and Space Complexity)

- 삽입 (Insert)
  - 평균 시간 복잡도: `O(h)` (평균적으로 `O(log n)`, h는 트리 높이)
  - 최악 시간 복잡도: `O(n)` (한쪽으로 치우친 트리)
- 검색 (Search)
  - 평균 시간 복잡도: `O(h)` (평균 `O(log n)`)
  - 최악 시간 복잡도: `O(n)`
- 중위 순회 (Inorder Traversal)
  - 시간 복잡도: `O(n)` (모든 노드를 한 번씩 방문)
  - 공간 복잡도: `O(h)` (재귀 호출 스택)
