# LeetCode 핵심 패턴 정리 + 연습 문제 (1–33)

이 문서는 `LC-style-code` 폴더의 **1–33번 문제**를 기반으로,
LeetCode에서 자주 등장하는 알고리즘/자료구조 **패턴과 연습 문제**를
**한국어 + English**로 정리한 개요입니다.

---

## 1. 투 포인터 (Two Pointers)

### 패턴 설명 (Pattern Description)

**KO**  
두 개의 인덱스(`left`, `right`)를 사용해 배열/문자열을 탐색하는 패턴입니다.
- 양 끝에서 시작해 안쪽으로 이동하거나, 같은 방향으로 이동합니다.
- 주로 정렬된 배열에서의 탐색, 팰린드롬 검사, 구간 내 조건 검사 등에 사용됩니다.

**EN**  
Use two indices (`left`, `right`) to traverse an array or string.
- They may move towards each other (from both ends) or in the same direction.
- Common for sorted array problems, palindrome checks, and range-based conditions.

### 연습 문제 (Practice from 1–33)

- **#1** 중복 없는 가장 긴 부분 문자열 (Longest Substring Without Repeating Characters)  
  Sliding window + two pointers feel
- **#2** 세 수의 합 (3Sum with Two Pointers)  
  Classic two pointers on a sorted array
- **#17** 특수 문자를 제외하고 문자열 뒤집기 (Reverse String In Place Ignoring Special Characters)
- **#23** 유효한 팰린드롬 (Valid Palindrome with Two Pointers)
- **#31** 빗물 트래핑 (Trapping Rain Water with Two Pointers)

---

## 2. 슬라이딩 윈도우 (Sliding Window)

### 패턴 설명 (Pattern Description)

**KO**  
연속된 구간(subarray/substring)을 왼쪽/오른쪽으로 **슬라이드**하면서,
구간 합, 길이, 빈도 등을 O(1)에 가깝게 업데이트하는 패턴입니다.

**EN**  
Maintain a **moving window** over the array/string and update its state
(sum, length, counts) incrementally, instead of recomputing from scratch.

### 연습 문제 (Practice from 1–33)

- **#1** 중복 없는 가장 긴 부분 문자열 (Longest Substring Without Repeating Characters)
- **#22** 피벗 인덱스 찾기 (Find Pivot Index with Prefix Sum) –
  prefix sum 중심이지만, 구간 합 사고방식에 익숙해지는 데 도움

---

## 3. 프리픽스 합 / 누적 합 (Prefix Sum)

### 패턴 설명 (Pattern Description)

**KO**  
`prefix[i] = 0 ~ i-1까지의 합`을 미리 계산해 두고,
구간 `[l, r]`의 합을 `prefix[r+1] - prefix[l]` 로 O(1)에 구하는 기법입니다.
부분 합, 특정 합을 갖는 subarray 개수, 차이 배열 등에서 자주 사용됩니다.

**EN**  
Prefix sums let you answer range sum queries quickly:  
`prefix[i] = sum of nums[0..i-1]`, so `sum(l..r) = prefix[r+1] - prefix[l]`.
Useful in subarray-sum counting and other cumulative computations.

### 연습 문제 (Practice from 1–33)

- **#3** 부분 배열의 합이 K (Subarray Sum Equals K with Prefix Sum)
- **#22** 피벗 인덱스 찾기 (Find Pivot Index with Prefix Sum)

---

## 4. 해시맵 / 빈도수 카운팅 (Hash Map & Frequency Counting)

### 패턴 설명 (Pattern Description)

**KO**  
`Map` 또는 `Object`를 사용해 **값 → 빈도, 마지막 인덱스, 그룹** 등을 저장하는 패턴입니다.
애너그램 묶기, Two Sum, 중복 여부 검사, 윈도우 내 문자/숫자 개수 관리에 필수입니다.

**EN**  
Use hash maps to store **value → frequency / index / group** information.
Central to problems like grouping anagrams, two-sum, and frequency-based logic.

### 연습 문제 (Practice from 1–33)

- **#1** 중복 없는 가장 긴 부분 문자열 (Longest Substring Without Repeating Characters) –
  character → last index
- **#3** 부분 배열의 합이 K (Subarray Sum Equals K with Prefix Sum) –
  prefix sum → count
- **#4** 애너그램 묶기 (Group Anagrams with Hash Map)
- **#24** 두 수의 합 (Two Sum with Hash Map)
- **#32** 고유 빈도수 판별 (Unique Frequencies of Characters)

---

## 5. 이진 탐색 & 정답에 대한 이진 탐색 (Binary Search & Binary Search on Answer)

### 패턴 설명 (Pattern Description)

**KO**  
- 정렬된 배열에서 원하는 값을 찾는 **전통적인 이진 탐색**
- 어떤 값 `x`에 대해 "조건을 만족하는지"를 판별할 수 있고,
  이 조건이 `x`에 대해 **단조(monotonic)** 하다면, `x`를 이진 탐색으로 찾을 수 있습니다.  
  (예: 최소 속도, 최소 용량, 최소 시간 등)

**EN**  
- Classic binary search on sorted arrays.  
- Also, **binary search on the answer**: if `feasible(x)` is monotonic in `x`,
  you can binary-search for the minimum/maximum `x` that satisfies the condition.

### 연습 문제 (Practice from 1–33)

- **#9** 코코의 바나나 먹기 (Koko Eating Bananas with Binary Search on Answer)
- **#10** 가장 긴 증가하는 부분 수열 (LIS with DP + Binary Search) –
  uses binary search inside DP
- **#28** 이진 탐색 (Binary Search on Sorted Array)

---

## 6. 트리 / 그래프 탐색 (Tree & Graph Traversal: BFS / DFS)

### 패턴 설명 (Pattern Description)

**KO**  
- **BFS (너비 우선 탐색)**: 레벨 순회, 무가중치 그래프 최단 거리, 플러드 필 등에 사용.  
- **DFS (깊이 우선 탐색)**: 트리 높이, 경로 존재 여부, 연결 요소 개수, 카운팅 등에 사용.

**EN**  
- **BFS**: Level-order traversal, shortest path in unweighted graphs, grid expansion.  
- **DFS**: Recursively explore depth-first for tree height, existence of paths,
  and connected components.

### 연습 문제 (Practice from 1–33)

- 트리 (Tree)
  - **#5** 이진 트리 레벨 순회 (Binary Tree Level Order Traversal with BFS)
  - **#16** 이진 트리 설계 (Binary Tree Design: Basic Operations)
  - **#19** 두 자식을 가진 노드 개수 세기 (Count Binary Tree Nodes with Two Children) – DFS 카운팅
  - **#25** 이진 트리의 최대 깊이 (Maximum Depth of Binary Tree) – DFS

- 그래프 / 격자 (Graph / Grid)
  - **#6** 무가중치 그래프 최단 경로 (Shortest Path in Unweighted Graph with BFS)
  - **#14** 코스 스케줄 (Course Schedule with Topological Sort)
  - **#26** 플러드 필 (Flood Fill with DFS/BFS)

---

## 7. 동적 계획법 (Dynamic Programming, DP)

### 패턴 설명 (Pattern Description)

**KO**  
큰 문제를 **작은 부분 문제(subproblem)** 로 나누고, 그 결과를 저장하여 재사용하는 기법입니다.  
상태 정의(`dp[i]`, `dp[i][j]`), 점화식, 초기값 설정이 핵심입니다.

**EN**  
Break a problem into smaller overlapping subproblems and store their results
(memoization or tabulation).  
Key is to define the state, derive the recurrence, and set base cases.

### 연습 문제 (Practice from 1–33)

- **#10** 가장 긴 증가하는 부분 수열 (Longest Increasing Subsequence with DP + Binary Search)
- **#11** 격자에서의 유일한 경로 (Unique Paths in Grid with DP)
- **#12** 동전 교환 (Coin Change with DP)
- **#29** 계단 오르기 (Climbing Stairs with DP)

---

## 8. 백트래킹 (Backtracking)

### 패턴 설명 (Pattern Description)

**KO**  
모든 가능한 조합/순열/부분집합을 탐색하되,  
조건을 위반하는 경로는 **일찍 중단(가지치기)** 하는 재귀 패턴입니다.  
진입 시 상태 변경, 반환 시 상태 복원이 중요합니다.

**EN**  
Systematically build candidate solutions and **backtrack** when a partial solution
violates constraints.  
You modify state when going deeper and restore it when returning.

### 연습 문제 (Practice from 1–33)

- **#15** 순열 생성 (Permutations with Backtracking)
- **#33** 모든 가능한 균형 괄호 생성 (Generate All Balanced Parentheses)

---

## 9. 그리디 + 정렬 / 구간 (Greedy + Sorting / Intervals)

### 패턴 설명 (Pattern Description)

**KO**  
각 단계에서 **가장 좋아 보이는 선택(지역 최적)** 을 함으로써,  
전체적으로도 최적인 해를 구하는 패턴입니다.  
대부분 먼저 **정렬**을 한 다음, 구간을 병합하거나 겹치지 않게 선택하는 식으로 풉니다.

**EN**  
Make locally optimal decisions at each step to hopefully reach a global optimum.  
Often combined with sorting, especially in **interval** and **scheduling** problems.

### 연습 문제 (Practice from 1–33)

- **#2** 세 수의 합 (3Sum with Two Pointers) – 정렬 + 양쪽 포인터
- **#7** 원점에서 가장 가까운 K개 점 (K Closest Points to Origin with Heap) – 정렬/힙 조합
- **#13** 구간 병합 (Merge Intervals with Greedy)

---

## 10. 힙 / 우선순위 큐 (Heap / Priority Queue)

### 패턴 설명 (Pattern Description)

**KO**  
가장 큰/작은 값을 **자주 꺼내야 할 때** 사용하는 자료구조입니다.  
- 삽입, 삭제: O(log n)  
- 최댓값/최솟값 조회: O(1)

**EN**  
A priority queue (heap) lets you efficiently push and pop the min or max element.  
Useful for top-k problems, streaming medians, task scheduling, etc.

### 연습 문제 (Practice from 1–33)

- **#7** 원점에서 가장 가까운 K개 점 (K Closest Points to Origin with Heap)
- **#27** 마지막 돌의 무게 (Last Stone Weight with Max Heap)

---

## 11. 모노토닉 스택 (Monotonic Stack)

### 패턴 설명 (Pattern Description)

**KO**  
스택 내부를 **단조 증가/감소** 상태로 유지하여,  
한 번의 순회로 “다음 더 큰 원소”, “이전 더 큰 원소” 등을 찾는 패턴입니다.

**EN**  
Maintain a stack in which elements are strictly increasing or decreasing.  
Allows you to find next/previous greater or smaller elements in linear time.

### 연습 문제 (Practice from 1–33)

- **#8** 매일의 온도 (Daily Temperatures with Monotonic Stack)

---

## 12. 정렬 & 분할 정복 (Sorting & Divide and Conquer)

### 패턴 설명 (Pattern Description)

**KO**  
정렬 기반 문제나, 배열을 반씩 나누어 재귀적으로 해결한 뒤  
결과를 합치는 **분할 정복(Divide and Conquer)** 패턴입니다.

**EN**  
Problems that rely on sorting as a core step, or use a **divide and conquer** strategy:
recursively split, solve, and merge.

### 연습 문제 (Practice from 1–33)

- **#7** 원점에서 가장 가까운 K개 점 (Heap + sort idea)
- **#13** 구간 병합 (Merge Intervals with Greedy + Sorting)
- **#20** 병합 정렬 구현 (Implement Merge Sort)

---

## 13. 링크드 리스트 & 기본 자료구조 (Linked List & Basic Data Structures)

### 패턴 설명 (Pattern Description)

**KO**  
배열과 연결 리스트의 특성을 이해하고,  
연결 리스트의 노드 연결/해제, 앞/뒤 삽입/삭제, 역순 변환 등을 구현하는 연습입니다.

**EN**  
Understand arrays vs linked lists (contiguous memory vs nodes with pointers) and
practice manipulating linked lists: insertion, deletion, and reversal.

### 연습 문제 (Practice from 1–33)

- **#21** 배열 vs 연결 리스트 사용 사례 (Array vs Linked List Use Cases)
- **#30** 연결 리스트 뒤집기 (Reverse Linked List Iteratively)

---

이 문서는 1–33번 문제를 **패턴별로 다시 보는 가이드**입니다.  
복습할 때는 한 패턴을 골라, 해당 패턴에 속한 문제들을 연속해서 풀면서
“언제 이 패턴을 떠올려야 하는지”를 스스로 설명해보는 연습을 해보세요.
```
