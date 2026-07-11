# 45. React Query: staleTime과 cache key 트릭

## 질문 (Question)

다음 코드는 React Query (TanStack Query)를 사용한다고 가정합니다.

```javascript
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

function fetchUser(id) {
  console.log('fetchUser called with id =', id);
  return fetch(`/api/users/${id}`).then((res) => res.json());
}

function App() {
  const [userId, setUserId] = useState(1);

  const { data, isFetching } = useQuery({
    queryKey: ['user'], // ⚠ userId 미포함
    queryFn: () => fetchUser(userId),
    staleTime: 5000,
  });

  return (
    <div>
      <button onClick={() => setUserId(1)}>User 1</button>
      <button onClick={() => setUserId(2)}>User 2</button>

      {isFetching && <p>Loading...</p>}
      <pre>{JSON.stringify({ userId, data }, null, 2)}</pre>
    </div>
  );
}
```

1. 처음 `User 1` 을 보고 있다가 `User 2` 버튼을 누르면, 콘솔과 화면에 어떤 일이 일어날까요?
2. 왜 `userId` 를 바꿔도 예상대로 refetch 가 되지 않을 수 있는지 설명해 보세요.
3. 이 문제를 어떻게 고쳐야 할까요?

---

## 정답 & 해설 (Answer & Explanation)

### 한국어 (Korean)

- `queryKey` 가 `['user']` 로 **userId 를 포함하지 않고 있습니다.**
- React Query 는 `queryKey` 를 기준으로 캐시를 관리하므로:
  - `userId = 1` 일 때 첫 fetch가 `['user']` 캐시에 저장.
  - 이후 `userId = 2` 로 state 를 바꿔도, `queryKey` 가 동일하므로 **같은 캐시 엔트리를 재사용**합니다.
- `staleTime: 5000` 때문에, 5초 동안은 해당 캐시를 "fresh" 로 간주하고 **자동 refetch 를 하지 않습니다.**

결과적으로:

- 콘솔:
  - 처음에는 `fetchUser called with id = 1` 이 찍힙니다.
  - 5초 이내에 `User 2` 를 눌러도, `fetchUser` 가 다시 호출되지 않을 수 있습니다.
- 화면:
  - `userId` state 는 2로 바뀌지만,
  - `data` 는 여전히 **user 1 의 데이터**가 남아 있어서, `userId: 2` + user1 데이터라는 **헷갈리는 조합**이 보일 수 있습니다.

즉, **key 에 userId 를 포함하지 않아서 캐시와 staleTime 이 예상과 다르게 동작**하는 상황입니다.

### English

- The `queryKey` is just `['user']`, so it does **not include `userId`**.
- React Query manages its cache **based on the query key**, so:
  - When `userId = 1`, it fetches and caches under `['user']`.
  - When `userId` changes to 2, the key is still `['user']`, so it reuses the same cache.
- With `staleTime: 5000`, this cached data is considered "fresh" for 5 seconds and **won’t be refetched automatically**.

As a result:

- Console: you may only see `fetchUser called with id = 1`.
- UI: `userId` state shows 2, but `data` still contains user 1’s data.

This is a classic **wrong query key** + `staleTime` interaction bug.

---

## 올바른 수정 (Fix)

### 한국어 (Korean)

```javascript
const { data, isFetching } = useQuery({
  queryKey: ['user', userId],
  queryFn: () => fetchUser(userId),
  staleTime: 5000,
});
```

- `userId` 를 `queryKey` 에 포함하면, id 에 따라 **다른 캐시 엔트리**를 사용합니다.
- 이제 `userId` 가 바뀔 때마다 새로운 쿼리로 인식되어, 필요한 경우 fetch 가 발생합니다.

### English

- Include `userId` in the `queryKey` so the cache entry is specific to the user:

```javascript
const { data, isFetching } = useQuery({
  queryKey: ['user', userId],
  queryFn: () => fetchUser(userId),
  staleTime: 5000,
});
```

---

## 요약 (Summary)

- **KO**: React Query 에서 `staleTime` 은 "언제까지 캐시를 fresh 로 볼 것인가" 의 문제이고, 어떤 데이터를 같은 캐시에 묶을지는 **queryKey 설계에 달려 있습니다.** 파라미터를 key 에 포함하지 않으면, 서로 다른 파라미터 요청이 같은 캐시와 staleTime 을 공유해 버그처럼 보일 수 있습니다.
- **EN**: In React Query, `staleTime` controls how long data stays fresh, but **which requests share that data is entirely determined by the query key**; forgetting to include parameters (like `userId`) in the key can cause different requests to share the same cached result unexpectedly.
