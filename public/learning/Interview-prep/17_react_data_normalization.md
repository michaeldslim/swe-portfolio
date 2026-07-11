# 17. React 데이터 정규화 (React Data Normalization)

## 질문 (Question)

- **KO**: "React 애플리케이션에서 데이터 정규화(data normalization)가 무엇인지, 왜 필요한지, 예제와 함께 설명해 보세요."
- **EN**: "In a React application, what is data normalization, why is it useful, and can you show an example?"

---

## 개념 (Concept)

### 한국어 (Korean)

- **데이터 정규화(Data Normalization)**
  - 중첩된(nested) 구조의 데이터를 **ID 기준의 평탄(flat)한 구조**로 변환하는 것
  - 예: `posts` 안에 `comments` 배열이 중첩되어 있을 때, `postsById`, `commentsById` 처럼 분리해서 보관
- 목적
  - **중복 데이터 감소**
  - **업데이트 일관성 보장** (한 곳만 수정하면 됨)
  - React/Redux 상태 업데이트를 **쉽고 예측 가능**하게 만들기

### English

- **Data normalization** means transforming deeply nested data into **flat, ID-based structures**.
- Goals:
  - Reduce duplication.
  - Maintain consistency (update data in one place).
  - Make state updates simpler and more predictable in React/Redux.

---

## 문제 예시: 중첩 구조의 문제 (Problem with Nested Structures)

```javascript
const state = {
  posts: [
    {
      id: 1,
      title: 'First Post',
      comments: [
        { id: 101, text: 'Nice post!', author: 'Alice' },
        { id: 102, text: 'Thanks!', author: 'Bob' },
      ],
    },
    {
      id: 2,
      title: 'Second Post',
      comments: [
        { id: 101, text: 'Nice post!', author: 'Alice' }, // 중복
      ],
    },
  ],
};
```

- **KO**: `id: 101` 댓글이 여러 포스트에 중복으로 들어가 있으면, 이 댓글 내용을 수정할 때 **여러 곳을 동시에 수정**해야 합니다.
- **EN**: Comment `id: 101` is duplicated; updating it requires modifying multiple arrays.

---

## 정규화된 구조 예시 (Normalized Structure Example)

```javascript
const normalizedState = {
  postsById: {
    1: { id: 1, title: 'First Post', commentIds: [101, 102] },
    2: { id: 2, title: 'Second Post', commentIds: [101] },
  },
  commentsById: {
    101: { id: 101, text: 'Nice post!', author: 'Alice' },
    102: { id: 102, text: 'Thanks!', author: 'Bob' },
  },
  postIds: [1, 2],
};
```

- **KO**: 댓글 `101` 의 내용을 수정하려면 `commentsById[101]` 만 변경하면 되고, 이를 참조하는 모든 컴포넌트는 동일한 데이터 소스를 보게 됩니다.
- **EN**: To update comment `101`, you only modify `commentsById[101]`, and all components depending on it see the same updated data.

---

## React 컴포넌트에서의 사용 (Using in React Components)

```jsx
function Post({ postId, state }) {
  const post = state.postsById[postId];
  const comments = post.commentIds.map((id) => state.commentsById[id]);

  return (
    <article>
      <h2>{post.title}</h2>
      <ul>
        {comments.map((c) => (
          <li key={c.id}>
            {c.text} - {c.author}
          </li>
        ))}
      </ul>
    </article>
  );
}
```

- **KO**: `post` 와 `comments` 를 각각 ID로 조회하므로, 특정 댓글만 바뀌어도 관련 컴포넌트만 최소한으로 리렌더링되기 쉬움.
- **EN**: Because posts and comments are fetched by ID, updating a single comment tends to cause fewer and more predictable re-renders.

---

## 장점 (Advantages)

### 한국어 (Korean)

- **업데이트 로직 단순화**
  - 예: 댓글 수정/삭제 시 `commentsById` 만 수정하면 됨.
- **중복 데이터 제거**
  - 동일한 엔티티가 여러 곳에 중복 저장되지 않음.
- **성능/리렌더링 최적화에 유리**
  - React.memo, useSelector(Redux) 등과 함께 사용할 때 변경 여부를 쉽게 판단.

### English

- **Simplified updates**
  - Updates to an entity happen in one place.
- **Eliminates duplication**
  - A single source of truth per entity.
- **Helps with performance and memoization**
  - Easier to decide whether parts of the UI need to re-render.

---

## 실무 팁 (Practical Tips)

- Redux를 사용할 경우, [Redux Style Guide](https://redux.js.org/style-guide/) 에서도 **정규화된 상태 구조**를 권장.
- 도구
  - `normalizr` 라이브러리: API 응답을 자동으로 정규화해 주는 유틸리티.
- 모든 데이터를 정규화할 필요는 없고, **중첩이 깊거나 재사용/공유가 많은 엔티티** 위주로 적용하는 것이 실용적입니다.

---

## 요약 (Summary)

- **KO**: React에서 데이터 정규화는 중첩된 데이터를 `entitiesById` + `ids` 형태의 평탄한 구조로 바꾸어, 중복을 줄이고 업데이트를 단순화하며, 리렌더링을 예측 가능하게 만드는 패턴입니다.
- **EN**: In React, data normalization means flattening nested data into ID-based maps plus ID arrays, reducing duplication, simplifying updates, and making re-renders more predictable.
