# 6. 무가중치 그래프 최단 경로 (Shortest Path in Unweighted Graph with BFS)

> Related LeetCode: [Shortest Path in Binary Matrix](https://leetcode.com/problems/shortest-path-in-binary-matrix/)

## 문제 설명 (Problem Description)

노드가 `0`부터 `n - 1`까지 번호 매겨진 무가중치 그래프가 있습니다.
간선 목록 `edges`와 시작 노드 `src`, 도착 노드 `dst`가 주어졌을 때,
**최단 경로의 길이(간선의 개수)** 를 구하는 문제입니다.

만약 `src`에서 `dst`로 갈 수 없다면 `-1`을 반환합니다.

You are given an unweighted graph with nodes labeled from `0` to `n - 1`.
Given the edge list `edges`, a source node `src`, and a destination node `dst`,
return the **length of the shortest path** (in number of edges) from `src` to `dst`.
If no path exists, return `-1`.

---

## 입력 (Input)

- 정수 `n`: 노드의 개수 (노드 번호는 `0..n-1`)
- 2차원 배열 `edges`: 각 원소는 `[u, v]` 형태의 간선 (무가중치, 무방향 그래프라고 가정)
- 정수 `src`: 시작 노드
- 정수 `dst`: 도착 노드

Inputs:

- Integer `n` (number of nodes)
- 2D array `edges`, each element is `[u, v]`
- Integers `src`, `dst`

---

## 출력 (Output)

- `src`에서 `dst`까지의 **최단 경로 길이(간선 수)** 를 정수로 반환합니다.
- 경로가 없으면 `-1`을 반환합니다.

Return the **length (number of edges)** of the shortest path from `src` to `dst`, or `-1` if unreachable.

---

## 예시 (Example)

### 예시 1

- 입력 / Input:

```text
n = 6
edges = [[0,1],[0,2],[1,3],[2,3],[3,4],[4,5]]
src = 0
dst = 5
```

- 출력 / Output: `4`
- 가능한 최단 경로 / One shortest path: `0 -> 1 -> 3 -> 4 -> 5` (간선 4개)

---

## 접근 방법 (Approach)

### 설명 (Korean)

무가중치 그래프에서 최단 경로를 구할 때는 **너비 우선 탐색(BFS)** 을 사용하는 것이 정석입니다.

1. 먼저 인접 리스트(Adjacency List)를 만듭니다.
   - `adj[u]` 는 노드 `u`와 인접한 모든 노드들의 배열입니다.
2. `dist` 배열을 만들어, 각 노드까지의 거리를 저장합니다.
   - 처음에는 모든 거리를 `Infinity` 로 설정합니다.
   - 시작 노드 `src`의 거리를 0으로 설정합니다.
3. `queue`에 시작 노드 `src`를 넣고 BFS를 시작합니다.
   - 큐에서 노드를 하나씩 꺼내면서, 인접한 노드들을 확인합니다.
   - 아직 방문하지 않은 노드(`dist[neighbor] === Infinity`)의 경우,
     - `dist[neighbor] = dist[current] + 1` 로 갱신하고,
     - 큐에 `neighbor`를 추가합니다.
   - 도중에 `dst`를 만나면, 그때의 거리를 바로 반환할 수 있습니다.
4. BFS가 끝날 때까지 `dst`에 도달하지 못했다면, `-1`을 반환합니다.

무가중치 그래프에서 BFS는 최단 간선 수를 보장합니다.

### Description (English)

For an unweighted graph, **Breadth-First Search (BFS)** naturally gives the shortest path
in terms of number of edges.

1. Build an adjacency list `adj` such that `adj[u]` is the list of neighbors of `u`.
2. Create an array `dist` to store the distance from `src` to each node.
   - Initialize all distances to `Infinity`.
   - Set `dist[src] = 0`.
3. Use a queue and start BFS from `src`.
   - Pop a node `node` from the queue.
   - For each neighbor `nei` of `node`:
     - If `dist[nei]` is still `Infinity`, this is the first time we visit `nei`.
       - Set `dist[nei] = dist[node] + 1`.
       - Push `nei` into the queue.
     - If at any point `nei === dst`, we can return `dist[nei]`.
4. If BFS finishes without reaching `dst`, return `-1`.

BFS guarantees the shortest path length in an unweighted graph.

---

## JavaScript 코드 (JavaScript Code)

```javascript
function shortestPathUnweighted(n, edges, src, dst) {
  // Build adjacency list
  const adj = Array.from({ length: n }, () => []);
  for (const [u, v] of edges) {
    adj[u].push(v);
    adj[v].push(u); // undirected
  }

  const dist = Array(n).fill(Infinity);
  const queue = [];

  dist[src] = 0;
  queue.push(src);

  while (queue.length > 0) {
    const node = queue.shift();

    if (node === dst) {
      return dist[node];
    }

    for (const nei of adj[node]) {
      if (dist[nei] === Infinity) {
        dist[nei] = dist[node] + 1;
        queue.push(nei);
      }
    }
  }

  return -1; // unreachable
}
```

## 코드 라인별 설명 (Line-by-Line Explanation)

- `function shortestPathUnweighted(n, edges, src, dst) {`
  - **KO:** 노드 개수 `n`, 간선 목록 `edges`, 시작 노드 `src`, 도착 노드 `dst`를 입력으로 받아 최단 경로 길이를 반환하는 함수입니다.
  - **EN:** Declares a function that computes the shortest path length from `src` to `dst` in an unweighted graph.

- `const adj = Array.from({ length: n }, () => []);`
  - **KO:** 길이 `n`의 배열을 만들고, 각 원소를 빈 배열로 초기화하여 인접 리스트를 위한 2차원 배열을 생성합니다.
  - **EN:** Creates an adjacency list with `n` empty arrays, one for each node.

- `for (const [u, v] of edges) { ... }`
  - **KO:** 각 간선 `[u, v]`에 대해, 무방향 그래프이므로 `u`의 리스트에 `v`를, `v`의 리스트에 `u`를 추가합니다.
  - **EN:** For each undirected edge, adds `v` to `u`’s neighbors and `u` to `v`’s neighbors.

- `const dist = Array(n).fill(Infinity);`
  - **KO:** 각 노드까지의 거리를 `Infinity`로 초기화한 배열입니다.
  - **EN:** Initializes all distances to `Infinity`, meaning unvisited.

- `const queue = [];`
  - **KO:** BFS 탐색을 위한 큐를 초기화합니다.
  - **EN:** Initializes the queue used for BFS.

- `dist[src] = 0;`
  - **KO:** 시작 노드의 거리는 0으로 설정합니다.
  - **EN:** Sets the distance from `src` to itself as 0.

- `queue.push(src);`
  - **KO:** BFS 시작을 위해 시작 노드를 큐에 넣습니다.
  - **EN:** Enqueues the source node as the starting point.

- `while (queue.length > 0) {`
  - **KO:** 큐가 빌 때까지 BFS를 진행합니다.
  - **EN:** Processes nodes in BFS order while the queue is not empty.

- `const node = queue.shift();`
  - **KO:** 큐에서 하나의 노드를 꺼내 현재 처리할 노드로 사용합니다.
  - **EN:** Dequeues the next node to process.

- `if (node === dst) { return dist[node]; }`
  - **KO:** 현재 노드가 도착 노드이면, 그 노드까지의 거리를 즉시 반환합니다.
  - **EN:** If we have reached the destination, returns its recorded distance as the shortest path length.

- `for (const nei of adj[node]) { ... }`
  - **KO:** 현재 노드와 인접한 모든 이웃 노드들을 순회합니다.
  - **EN:** Iterates through all neighbors of the current node.

- `if (dist[nei] === Infinity) { ... }`
  - **KO:** 아직 방문하지 않은 이웃 노드인 경우에만 거리 갱신 및 큐 추가를 수행합니다.
  - **EN:** Checks if the neighbor has not been visited yet (distance still `Infinity`).

- `dist[nei] = dist[node] + 1;`
  - **KO:** 현재 노드까지의 거리보다 1만큼 더 큰 값으로 이웃 노드의 거리를 설정합니다 (간선 하나 추가).
  - **EN:** Sets the neighbor’s distance to the current node’s distance plus one edge.

- `queue.push(nei);`
  - **KO:** 앞으로 탐색할 노드로 큐에 이웃 노드를 추가합니다.
  - **EN:** Enqueues the neighbor for further BFS processing.

- `return -1; // unreachable`
  - **KO:** BFS가 끝날 때까지 `dst`에 도달하지 못했다면, 도달 불가능하므로 `-1`을 반환합니다.
  - **EN:** If BFS finishes without reaching `dst`, returns `-1` to indicate no path exists.

---

## 시간 및 공간 복잡도 (Time and Space Complexity)

- 시간 복잡도 (Time Complexity): `O(n + m)`
  - `n`은 노드 수, `m`은 간선 수입니다.
  - 인접 리스트를 만드는 데 `O(m)`, BFS에서 각 간선과 노드를 한 번씩 처리합니다.
- 공간 복잡도 (Space Complexity): `O(n + m)`
  - 인접 리스트 저장에 `O(n + m)`, 거리 배열과 큐에 최대 `O(n)`.
