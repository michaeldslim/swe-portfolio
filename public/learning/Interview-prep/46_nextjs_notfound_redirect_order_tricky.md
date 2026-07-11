# 46. Next.js: dynamic route에서 notFound() vs redirect() 순서

## 질문 (Question)

다음 코드는 Next.js App Router 의 dynamic route (`app/posts/[slug]/page.tsx`) 라고 가정합니다.

```typescript
// app/posts/[slug]/page.tsx
import { notFound, redirect } from 'next/navigation';

async function getPost(slug: string) {
  const res = await fetch(`https://example.com/api/posts/${slug}`);
  if (res.status === 404) return null;
  const post = await res.json();
  return post as { title: string; isPublic: boolean };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  if (!post.isPublic) {
    redirect('/login');
  }

  return <div>{post.title}</div>;
}
```

1. `slug` 에 해당하는 게시물이 없을 때, 어떤 페이지가 보이나요?
2. 게시물이 있지만 `isPublic = false` 인 경우, 어떤 페이지가 보이나요?
3. 위 조건문의 순서를 바꾸면 어떤 차이가 생길 수 있는지 설명해 보세요.

---

## 정답 & 해설 (Answer & Explanation)

### 한국어 (Korean)

- `notFound()` 와 `redirect()` 는 각각 **특수한 예외를 throw** 해서 Next.js 가 라우팅을 제어합니다.
  - `notFound()` → 404 페이지로 이동.
  - `redirect('/login')` → 3xx redirect 응답/클라이언트 네비게이션.

- 위 코드에서는:
  - `!post` 인 경우 → `notFound()` 가 먼저 호출되어 **404 페이지**가 보입니다.
  - `post` 는 있지만 `!post.isPublic` 인 경우 → `redirect('/login')` 이 실행되어 **로그인 페이지로 리다이렉트**됩니다.

- 만약 순서를 바꾸어 이렇게 작성하면:

```typescript
if (!post?.isPublic) {
  redirect('/login');
}

if (!post) {
  notFound();
}
```

- `post` 가 `null` 인 경우, 첫 번째 조건에서 `!post?.isPublic` 가 `true` 가 되어 **404 대신 로그인 페이지로 리다이렉트**되는 등, 의도와 다른 동작을 할 수 있습니다.

### English

- Both `notFound()` and `redirect()` work by throwing special errors that Next.js intercepts.
- In the original order:
  - If `post` is `null` → `notFound()` is called → user sees the **404 page**.
  - If `post` exists but `isPublic` is `false` → `redirect('/login')` → user is **redirected to the login page**.
- If you reverse the checks and call `redirect` first, you might accidentally redirect users to `/login` even when the post truly doesn’t exist, instead of showing a proper 404.

---

## 요약 (Summary)

- **KO**: Next.js App Router 에서 `notFound()` / `redirect()` 는 단순 if 분기처럼 보이지만, 실제로는 각각 404/리다이렉트 예외를 던지는 구조라 **조건 순서가 매우 중요**합니다. 존재하지 않는 리소스에는 `notFound()` 가 먼저 처리되도록 하고, 권한 문제 등은 그 이후에 `redirect()` 로 분기하는 것이 자연스럽습니다.
- **EN**: In Next.js App Router, `notFound()` and `redirect()` throw special errors to control routing; since they short-circuit rendering, the **order of your checks matters**. Prefer calling `notFound()` first for truly missing resources, then `redirect()` for authorization or visibility rules.
