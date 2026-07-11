# 54. React 데이터 정규화 (Data Normalization) Deep Dive

## 1. 질문 (Question)

- React 앱에서 **데이터 정규화(Data Normalization)** 는 무엇을 의미하나요?
- 왜 리스트/트리/중첩 구조 데이터를 정규화해서 관리하는 것이 좋은가요?
- 정규화된 상태 구조는 **어떻게 설계**하고, 어떤 장단점이 있는지 설명해 보세요.

---

## 2. 개념 정리 (Concept)

### 한국어 (Korean)

- **데이터 정규화란?**
  - 중첩된(raw) 데이터를 **ID 기반의 평탄화(flattened) 구조**로 바꿔서 저장하는 것.
  - DB 정규화와 비슷하게, **중복을 줄이고, 참조를 ID 로 통일**하는 패턴.

- 예: 서버에서 오는 raw 데이터

```json
[
  {
    "id": 1,
    "title": "Post 1",
    "author": { "id": 10, "name": "Alice" }
  },
  {
    "id": 2,
    "title": "Post 2",
    "author": { "id": 10, "name": "Alice" }
  }
]
```

- 정규화된 구조 (개념)

```ts
interface IUser {
  id: number;
  name: string;
}

interface IPost {
  id: number;
  title: string;
  authorId: number;
}

interface INormalizedState {
  users: Record<number, IUser>;
  posts: {
    byId: Record<number, IPost>;
    allIds: number[];
  };
}
```

### English

- **What is data normalization in React?**
  - Storing data in **flat, ID-based structures** instead of deeply nested objects.
  - Similar to DB normalization: reduce duplication, reference related entities by IDs.

- Raw server response can be nested and repetitive; normalized state keeps:
  - **entities**: `users[id]`, `posts[id]`
  - **lists**: arrays of IDs like `posts.allIds`.

---

## 3. 왜 정규화가 필요한가? (Why Normalize?)

### 1) 중복 데이터 제거 & 일관성 유지

- **KO**
  - 같은 `author` 정보가 여러 post 안에 중복으로 들어 있으면, 한 곳을 수정했을 때 나머지도 모두 업데이트해야 함.
  - 정규화하면 `users[10]` 한 곳만 업데이트하면, 그 유저를 참조하는 모든 컴포넌트가 한 번에 최신 상태를 보게 됩니다.
- **EN**
  - Avoid duplicating the same user/object in many places.
  - Update `users[10]` once instead of searching and mutating many nested structures.

### 2) 업데이트 로직 단순화

- **KO**
  - 정규화된 구조에서는 "특정 ID 의 엔티티만 수정" 이 쉬움:

    ```ts
    setState(prev => ({
      ...prev,
      users: {
        ...prev.users,
        [user.id]: user,
      },
    }));
    ```

- **EN**
  - Updates are simple key-based writes: `state.entities[id] = updatedEntity`.

### 3) 렌더링 최적화

- **KO**
  - React 컴포넌트가 **필요한 엔티티만 props로 받아서** memoization 하기가 쉬워짐.
  - 리스트 전체를 새 객체로 만들어서 넘기기보다, `postIds` 배열과 각 `post` 를 별도로 관리.
- **EN**
  - Helps avoid passing huge nested objects that change identity all the time.
  - Encourages smaller, focused components that subscribe to specific IDs.

---

## 4. 상태 구조 예시 (State Shape Example with TS)

```ts
// types/index.ts 에 있을 법한 인터페이스들
export interface IUser {
  id: number;
  name: string;
}

export interface IPost {
  id: number;
  title: string;
  authorId: number;
}

export interface IEntitiesState {
  users: Record<number, IUser>;
  posts: Record<number, IPost>;
}

export interface IPostsUIState {
  allIds: number[];
  selectedPostId: number | null;
}

export interface IRootState {
  entities: IEntitiesState;
  postsUI: IPostsUIState;
}
```

- **KO 설명**
  - `entities` 안에 실제 데이터(유저, 포스트)를 ID 기반 map 으로 저장.
  - `postsUI` 처럼 UI 전용 상태(정렬, 선택된 ID, 페이지네이션 정보 등)를 분리.
- **EN Explanation**
  - Keep **data** in `entities` and **view/UI state** (sorting, selection) in separate slices.
  - This mirrors patterns used by Redux Toolkit, React Query caches, etc.

---

## 5. 컴포넌트에서 어떻게 쓰나? (How Components Use Normalized Data)

```tsx
// 예시 React 컴포넌트 (TSX 스타일)

import React from 'react';
import type { IRootState } from './types';

interface IPostListProps {
  state: IRootState;
}

export function PostList({ state }: IPostListProps) {
  const { allIds, selectedPostId } = state.postsUI;
  const { posts, users } = state.entities;

  return (
    <ul>
      {allIds.map((id) => {
        const post = posts[id];
        const author = users[post.authorId];
        const isSelected = id === selectedPostId;

        return (
          <li key={id} style={{ fontWeight: isSelected ? 'bold' : 'normal' }}>
            {post.title} - {author?.name}
          </li>
        );
      })}
    </ul>
  );
}
```

- **KO 설명**
  - 리스트는 `allIds` 를 기준으로 순서만 관리.
  - 각 항목 렌더링 시 `posts[id]`, `users[post.authorId]` 로 필요한 엔티티를 lookup.
  - 선택 상태는 `selectedPostId` 하나로 관리 → 다른 곳에서 선택 변경해도 일관됨.

- **EN Explanation**
  - The list uses IDs to drive rendering.
  - Components look up normalized entities by ID, so updates are localized.

---

## 6. 언제 정규화를 하지 않아도 되는가? (When Not to Normalize)

### 한국어 (Korean)

- **규모가 작은 폼/로컬 상태**
  - 예: 단일 모달에서만 쓰는 작은 객체.
- **중첩 구조를 그대로 쓰는 것이 더 직관적일 때**
  - 예: 매우 작은 트리/계층 데이터.
- **과도한 추상화 피하기**
  - 모든 것을 무조건 entities/byId/allIds 로 만들면 오히려 복잡해질 수 있음.

### English

- Small, local component state doesn’t always need normalization.
- Over-normalizing can hurt readability when the data is simple.

---

## 7. 면접 포인트 (Interview Angle)

### 한국어 (Korean)

- 정규화의 핵심 포인트 정리:
  - **중복 제거 / 단일 소스 유지 (single source of truth)**
  - **ID 기반 업데이트의 단순함**
  - **렌더링 최적화 & 컴포넌트 분리 용이**
- 추가로 얘기하면 좋은 것들:
  - Redux Toolkit, React Query, Apollo Cache 등에서 비슷한 정규화 패턴 사용.
  - 정규화 + memoization(`React.memo`, `useMemo`)을 조합해서 성능 튜닝.

### English

- Emphasize:
  - Single source of truth for each entity.
  - Simple ID-based updates and lookups.
  - Better performance and simpler component boundaries.
- Mention tools that use similar ideas (RTK, React Query, Apollo cache).

---

## 8. 한 줄 요약 (Summary)

- **KO**: React 데이터 정규화는 중첩된 서버 응답을 ID 기반 평탄 구조(`entities + ids`)로 바꿔 저장함으로써, 중복을 줄이고 업데이트/렌더링을 단순화하는 패턴입니다. 규모가 커질수록 이런 정규화된 상태 구조가 유지보수성과 성능에 큰 도움이 됩니다.
- **EN**: React data normalization means storing nested server responses in flat, ID-based entity maps plus ID lists, reducing duplication and simplifying updates and rendering; as your app grows, this structure greatly improves maintainability and performance.
