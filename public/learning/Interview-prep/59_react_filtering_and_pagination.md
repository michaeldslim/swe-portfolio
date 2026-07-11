# 59. React에서 Filtering & Pagination 구현하기

## 1. 질문 (Question)

- React 프론트엔드에서 **검색/필터링(filtering)** 과 **페이지네이션(pagination)** 을 어떻게 구현하나요?
- 클라이언트에서만 처리하는 방식 vs 서버와 함께 동작하는 방식의 차이를 설명해 보세요.

---

## 2. 개념 정리 (Concept Overview)

### Filtering (검색/필터링)

#### 한국어 (Korean)

- 사용자가 입력한 검색어 또는 선택한 조건에 따라 **리스트에서 일부만 보여 주는 작업**.
- 보통:
  - `items` 전체 리스트는 state 또는 props 로 가지고 있고,
  - `filterText` / `selectedCategory` 등 필터 상태를 별도 state 로 관리한 뒤,
  - `items.filter(...)` 로 화면에 보여 줄 리스트를 계산.

#### English

- Filtering means showing **only a subset** of a list based on user input (search text, category, etc.).
- Typically:
  - Keep the full list (`items`) in state/props.
  - Keep filter state like `filterText` in separate state.
  - Use `items.filter(...)` to compute the visible list.

---

### Pagination (페이지네이션)

#### 한국어 (Korean)

- 한 번에 모든 데이터를 보여 주지 않고, **페이지 단위로 나누어** 보여 주는 것.
- 기본 아이디어:
  - `currentPage`, `pageSize` 상태를 관리.
  - `startIndex = (currentPage - 1) * pageSize`.
  - `endIndex = startIndex + pageSize`.
  - `visibleItems = items.slice(startIndex, endIndex)`.

#### English

- Pagination splits the list into pages so the user sees only a portion at a time.
- Compute visible items using `slice` based on `currentPage` and `pageSize`.

---

## 3. 예제: 클라이언트 사이드 Filtering + Pagination

```tsx
import React, { useState, useMemo } from 'react';

type Item = {
  id: number;
  name: string;
  category: 'fruit' | 'vegetable';
};

const ALL_ITEMS: Item[] = [
  { id: 1, name: 'Apple', category: 'fruit' },
  { id: 2, name: 'Banana', category: 'fruit' },
  { id: 3, name: 'Carrot', category: 'vegetable' },
  { id: 4, name: 'Daikon', category: 'vegetable' },
  { id: 5, name: 'Eggplant', category: 'vegetable' },
  { id: 6, name: 'Fig', category: 'fruit' },
  // ... more
];

const PAGE_SIZE = 2;

export function FilterAndPaginateExample() {
  const [filterText, setFilterText] = useState('');
  const [category, setCategory] = useState<'all' | 'fruit' | 'vegetable'>('all');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredItems = useMemo(() => {
    return ALL_ITEMS.filter((item) => {
      const matchesText = item.name.toLowerCase().includes(filterText.toLowerCase());
      const matchesCategory =
        category === 'all' ? true : item.category === category;
      return matchesText && matchesCategory;
    });
  }, [filterText, category]);

  const totalPages = Math.ceil(filteredItems.length / PAGE_SIZE);

  const visibleItems = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    return filteredItems.slice(startIndex, startIndex + PAGE_SIZE);
  }, [filteredItems, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // 필터가 바뀔 때는 페이지를 1로 리셋해 주는 것이 UX 상 자연스러움
  const handleFilterTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(e.target.value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value as any);
    setCurrentPage(1);
  };

  return (
    <div>
      <h2>Filtering & Pagination Example</h2>

      <div style={{ marginBottom: '1rem' }}>
        <input
          placeholder="Search by name"
          value={filterText}
          onChange={handleFilterTextChange}
        />
        <select value={category} onChange={handleCategoryChange}>
          <option value="all">All</option>
          <option value="fruit">Fruit</option>
          <option value="vegetable">Vegetable</option>
        </select>
      </div>

      <ul>
        {visibleItems.map((item) => (
          <li key={item.id}>
            {item.name} ({item.category})
          </li>
        ))}
      </ul>

      <div style={{ marginTop: '1rem' }}>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            disabled={page === currentPage}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
}
```

### KO 설명

- `filterText`, `category`, `currentPage` 를 각각 별도 state 로 관리.
- `useMemo` 로 `filteredItems` 와 `visibleItems` 를 계산:
  - `filteredItems` = 검색어/카테고리 조건을 만족하는 전체 리스트.
  - `visibleItems` = `filteredItems` 중 현재 페이지에 해당하는 부분 (`slice`).
- 필터가 바뀔 때 `setCurrentPage(1)` 으로 페이지를 초기화하는 것이 중요 (사용자 입장에서 자연스러운 UX).
- 페이지 버튼은 `totalPages` 만큼 만들어서, `currentPage` 인 버튼은 `disabled` 처리.

### EN Explanation

- Maintain separate pieces of state for `filterText`, `category`, and `currentPage`.
- Use `useMemo` to derive:
  - `filteredItems` from filters.
  - `visibleItems` from `filteredItems` + `currentPage`.
- Reset `currentPage` to `1` whenever filters change for better UX.
- Render page buttons based on `totalPages`; disable the button for the current page.

---

## 4. 클라이언트 vs 서버 사이드 Filtering/Pagination

### 한국어 (Korean)

- **클라이언트 사이드**
  - 장점: 구현이 간단, 한 번 받은 데이터를 브라우저에서 자유롭게 필터/페이지네이션.
  - 단점: 데이터가 매우 많으면 브라우저 메모리/성능 이슈.
- **서버 사이드**
  - `GET /items?query=apple&page=2&pageSize=20` 처럼 서버에 필터/페이지 정보를 함께 보내서,
  - 서버가 해당 조건에 맞는 데이터만 보내 줌.
  - 장점: 대용량 데이터에도 확장 가능, 네트워크/메모리 효율.
  - 단점: 구현이 더 복잡, 각 필터/페이지 변경 때마다 API 호출 필요.

### English

- **Client-side** filtering/pagination:
  - Simple to implement, great when the dataset is small.
  - Can become slow/heavy if data grows large.
- **Server-side** filtering/pagination:
  - Query parameters (`page`, `pageSize`, `search`) drive what the server returns.
  - Scales better for large datasets but requires API support and more complex logic.

---

## 5. 면접 포인트 (Interview Angle)

### 한국어 (Korean)

- 상태 분리: **데이터(state)** 와 **뷰 파생 상태(필터링된 리스트, 현재 페이지)** 를 분리해서 `useMemo` 등으로 계산.
- UX 고려: 필터 변경 시 페이지 번호 초기화, disabled 상태의 페이지 버튼 등.
- 규모에 따른 전략: 작은 데이터는 클라이언트 사이드, 큰 데이터/실서비스는 서버 사이드 페이지네이션.

### English

- Emphasize separating **source data** from **derived view state** (filtered items, current page).
- Mention UX details like resetting the page on filter change.
- Explain when you’d move from client-side to server-side filtering/pagination.

---

## 6. 한 줄 요약 (Summary)

- **KO**: React 에서 filtering/pagination 은 전체 데이터와 필터/페이지 상태를 분리하고, 파생된 리스트를 계산해서 렌더링하는 패턴이며, 데이터 규모에 따라 클라이언트/서버 사이드 전략을 선택하는 것이 중요합니다.
- **EN**: In React, filtering and pagination are about keeping raw data separate from filter and page state, deriving the visible list, and choosing between client-side and server-side strategies depending on data size and performance needs.
