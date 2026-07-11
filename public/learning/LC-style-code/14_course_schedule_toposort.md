# 14. 코스 스케줄 (Course Schedule with Topological Sort)

> Related LeetCode: [Course Schedule](https://leetcode.com/problems/course-schedule/)

## 문제 설명 (Problem Description)

총 `numCourses` 개의 코스(0부터 `numCourses - 1`까지 번호)가 있고,
각 코스를 듣기 위한 선수 과목 관계가 `prerequisites[i] = [a, b]` (코스 `a`를 듣기 위해 `b`를 먼저 들어야 함) 형태로 주어집니다.

모든 코스를 수강할 수 있는지 여부를 판단하는 문제입니다.

There are `numCourses` courses labeled from `0` to `numCourses - 1`.
You are given an array `prerequisites` where `prerequisites[i] = [a, b]` indicates that
you must take course `b` first if you want to take course `a`.

Return `true` if you can finish all courses, otherwise return `false`.

---

## 입력 (Input)

- 정수 `numCourses`
- 2차원 정수 배열 `prerequisites`, 각 원소는 `[a, b]`

An integer `numCourses` and a 2D integer array `prerequisites`.

---

## 출력 (Output)

- 모든 코스를 수강할 수 있으면 `true`, 그렇지 않으면 `false`.

Return `true` if it is possible to finish all courses, `false` otherwise.

---

## 예시 (Example)

### 예시 1

- 입력 / Input: `numCourses = 2`, `prerequisites = [[1,0]]`
- 출력 / Output: `true`
- 설명 / Explanation:
  - 0번 과목을 먼저 듣고, 그 다음 1번 과목을 들으면 됩니다.

### 예시 2

- 입력 / Input: `numCourses = 2`, `prerequisites = [[1,0],[0,1]]`
- 출력 / Output: `false`
- 설명 / Explanation:
  - 0을 듣기 위해 1이 필요하고, 1을 듣기 위해 0이 필요하므로 사이클이 존재합니다.

---

## 접근 방법 (Approach)

### 설명 (Korean)

이 문제는 **유향 그래프에서 사이클이 있는지 판별**하는 문제로 볼 수 있으며,
**위상 정렬(Topological Sort)** 을 활용할 수 있습니다.

여기서는 **진입 차수(Kahn 알고리즘)** 를 이용한 위상 정렬 방식으로 풉니다.

1. 각 코스를 노드로 보고, `b -> a` 방향의 간선을 갖는 인접 리스트 `adj`를 만듭니다.
2. 각 노드의 진입 차수(in-degree)를 기록하는 배열 `inDegree`를 만듭니다.
3. 진입 차수가 0인 노드들을 큐에 넣고 BFS를 시작합니다.
4. 큐에서 노드를 하나씩 꺼내면서, 그 노드를 수강했다고 가정하고,
   - 해당 노드에서 나가는 간선의 도착 노드들의 진입 차수를 1씩 감소시킵니다.
   - 이때 진입 차수가 0이 된 노드들을 큐에 추가합니다.
5. 큐에서 꺼낸 노드(수강한 코스)의 개수를 `taken`이라고 할 때,
   - 최종적으로 `taken === numCourses` 이면, 모든 코스를 수강할 수 있다는 의미입니다.
   - 그렇지 않으면, 그래프에 사이클이 있어 일부 코스를 수강할 수 없다는 뜻입니다.

### Description (English)

This problem is equivalent to checking whether a **directed graph has a cycle**.
We can use **topological sort** (Kahn's algorithm with in-degrees).

1. Treat each course as a node and each prerequisite pair `[a, b]` as a directed edge `b -> a`.
2. Build an adjacency list `adj` and an array `inDegree` to count the in-degree of each node.
3. Push all nodes with in-degree 0 into a queue.
4. While the queue is not empty:
   - Pop a node `u`, increment `taken` (the count of courses we can take).
   - For each neighbor `v` of `u`, decrement `inDegree[v]`.
   - If `inDegree[v]` becomes 0, push `v` into the queue.
5. At the end, if `taken === numCourses`, we can finish all courses; otherwise, there is a cycle.

---

## JavaScript 코드 (JavaScript Code)

```javascript
function canFinish(numCourses, prerequisites) {
  const adj = Array.from({ length: numCourses }, () => []);
  const inDegree = Array(numCourses).fill(0);

  for (const [a, b] of prerequisites) {
    adj[b].push(a);
    inDegree[a]++;
  }

  const queue = [];
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) {
      queue.push(i);
    }
  }

  let taken = 0;

  while (queue.length > 0) {
    const u = queue.shift();
    taken++;

    for (const v of adj[u]) {
      inDegree[v]--;
      if (inDegree[v] === 0) {
        queue.push(v);
      }
    }
  }

  return taken === numCourses;
}
```

## 코드 라인별 설명 (Line-by-Line Explanation)

- `function canFinish(numCourses, prerequisites) {`
  - **KO:** 전체 코스 수와 선수 과목 관계를 받아, 모든 코스를 들을 수 있는지 판별하는 함수입니다.
  - **EN:** Declares a function that determines whether all courses can be finished.

- `const adj = Array.from({ length: numCourses }, () => []);`
  - **KO:** 각 코스에 대한 인접 리스트를 초기화합니다.
  - **EN:** Initializes an adjacency list for the graph.

- `const inDegree = Array(numCourses).fill(0);`
  - **KO:** 각 노드(코스)의 진입 차수를 0으로 초기화합니다.
  - **EN:** Initializes the in-degree array with zeros.

- `for (const [a, b] of prerequisites) { ... }`
  - **KO:** `b -> a` 간선을 추가하고, `a`의 진입 차수를 증가시킵니다.
  - **EN:** Builds the edges and updates in-degrees.

- `const queue = [];`
  - **KO:** 진입 차수가 0인 노드를 담을 큐입니다.
  - **EN:** A queue for nodes with in-degree 0.

- `for (let i = 0; i < numCourses; i++) { if (inDegree[i] === 0) queue.push(i); }`
  - **KO:** 초기 상태에서 진입 차수가 0인 모든 코스를 큐에 넣습니다.
  - **EN:** Enqueues all courses that have no prerequisites.

- `let taken = 0;`
  - **KO:** 실제로 수강 가능한 코스 개수를 셀 변수입니다.
  - **EN:** Counts how many courses we can actually take.

- `while (queue.length > 0) { ... }`
  - **KO:** 큐가 빌 때까지 위상 정렬을 수행합니다.
  - **EN:** Performs Kahn's algorithm while the queue is not empty.

- `const u = queue.shift(); taken++;`
  - **KO:** 진입 차수가 0인 코스를 하나 꺼내고, 수강한 것으로 간주합니다.
  - **EN:** Pops a course with in-degree 0 and increments `taken`.

- `for (const v of adj[u]) { ... }`
  - **KO:** 코스 `u`를 선수 과목으로 가지는 후속 코스들을 순회합니다.
  - **EN:** Iterates through all courses that depend on `u`.

- `inDegree[v]--; if (inDegree[v] === 0) queue.push(v);`
  - **KO:** `u`를 수강했다고 가정하여, 후속 코스 `v`의 진입 차수를 줄이고, 0이 되면 큐에 추가합니다.
  - **EN:** Decrements the in-degree of `v` and enqueues it when it becomes 0.

- `return taken === numCourses;`
  - **KO:** 수강한 코스 수가 전체 코스 수와 같으면 `true`, 아니면 `false`.
  - **EN:** Returns whether we have taken all courses.

---

## 시간 및 공간 복잡도 (Time and Space Complexity)

- 시간 복잡도 (Time Complexity): `O(V + E)`
  - `V = numCourses`, `E = prerequisites.length`.
- 공간 복잡도 (Space Complexity): `O(V + E)`
  - 인접 리스트와 진입 차수 배열을 저장합니다.
