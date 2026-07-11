# 44. Next.js: Client vs Server Component, useEffect on server?

## 질문 (Question)

다음 코드는 Next.js App Router (`app/` 디렉토리) 환경이라고 가정합니다.

```javascript
// app/page.tsx (또는 page.jsx)

export default function Page() {
  console.log('render on server? client?');

  React.useEffect(() => {
    console.log('useEffect in Page');
  }, []);

  return <div>Home</div>;
}
```

1. 이 코드는 빌드/실행 시 어떤 문제가 발생할까요?
2. 왜 `useEffect` 를 바로 사용할 수 없는지, Next.js 의 **Server Component / Client Component** 개념을 기준으로 설명해 보세요.
3. 올바른 코드는 어떻게 작성해야 할까요?

---

## 정답 & 해설 (Answer & Explanation)

### 한국어 (Korean)

- App Router에서 `app/page.tsx` 는 기본적으로 **Server Component** 입니다.
- Server Component 에서는:
  - 브라우저에 없는 API(`window`, `document`, 이벤트 핸들러 등)를 사용할 수 없고,
  - `useState`, `useEffect` 같은 **Client Hooks 도 사용할 수 없습니다.**
- 따라서 위 코드는:
  - `React` 가 import 되어 있지 않은 문제 외에도,
  - `useEffect` 를 Server Component 에서 사용했기 때문에 Next.js 가 **"useEffect는 Client Component에서만 사용할 수 있다"** 는 에러/경고를 냅니다.

### English

- In the App Router, `app/page.tsx` is a **Server Component by default**.
- Server Components **cannot use client-only hooks** like `useEffect` or `useState`.
- So this code will fail with an error similar to: _"useEffect is not supported in Server Components"_.

---

## 올바른 패턴 (Proper Pattern)

### 1) Client Component 로 선언하기

```javascript
'use client';

import React from 'react';

export default function Page() {
  console.log('render on client only');

  React.useEffect(() => {
    console.log('useEffect in Page');
  }, []);

  return <div>Home</div>;
}
```

- 파일 최상단에 `'use client';` 를 선언하면 이 컴포넌트는 **Client Component** 가 됩니다.
- 이제 `useEffect` 를 사용할 수 있고, 브라우저 환경에서만 실행됩니다.

### 2) 서버/클라이언트 역할 분리하기

```javascript
// app/page.tsx (Server Component)
import ClientPart from './ClientPart';

export default function Page() {
  console.log('Server render');
  return (
    <div>
      <h1>Home</h1>
      <ClientPart />
    </div>
  );
}

// app/ClientPart.tsx
'use client';

import React from 'react';

export default function ClientPart() {
  React.useEffect(() => {
    console.log('Client effect');
  }, []);

  return <div>Client-only logic here</div>;
}
```

- **KO**: 서버에서만 필요한 부분은 Server Component 로 두고, 브라우저 API/이벤트/상태 관리가 필요한 부분만 별도의 Client Component 로 분리합니다.
- **EN**: Keep server-only logic in Server Components and move browser-dependent logic into Client Components.

---

## 요약 (Summary)

- **KO**: Next.js App Router 에서 `app/page.tsx` 는 기본적으로 Server Component 이기 때문에, `useEffect` 같은 Client Hook 을 직접 사용할 수 없습니다. 브라우저 전용 로직이 필요하면 `'use client';` 로 Client Component 를 선언하거나, 별도의 Client Component 로 분리해야 합니다.
- **EN**: In Next.js App Router, `app/page.tsx` is a Server Component by default, so you can’t use `useEffect` directly there; mark it as a client component with `'use client';` or move client-only logic into a separate client component.
