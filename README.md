## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Supabase Setup for Theme Persistence

This project uses [Supabase](https://supabase.com/) to persist the selected theme per device, so the theme is restored without flicker on reload.

### 1. Create a Supabase project (database)

1. Sign in to [Supabase](https://supabase.com/) and click **New project**.
2. Choose an organization (or create one).
3. Enter a **Project name** (for example, `swe-portfolio`).
4. Choose a **Database password** (store this somewhere secure; you will not commit it).
5. Select a **Region** close to your users.
6. Click **Create new project** and wait for Supabase to provision the database.

Once the project is ready, you will be taken to the project dashboard.

### 2. Create the `theme_preferences` table

In your Supabase project:

1. Go to **SQL** in the left navigation.
2. Click **New query**.
3. Paste and run the following SQL to create the table:

```sql
-- Enable uuid_generate_v4 if it's not already available
create extension if not exists "uuid-ossp";

create table if not exists public.theme_preferences (
  id uuid primary key default uuid_generate_v4(),
  anon_id text not null unique,
  theme text not null
);
```

Optionally, you can constrain `theme` to the allowed values used in this app:

```sql
alter table public.theme_preferences
  add constraint theme_preferences_theme_check
  check (theme in ('dark-teal', 'dark-green', 'light-neutral'));
```

### 3. Get Supabase project credentials

In the Supabase dashboard for your project:

1. Go to **Project Settings → API**.
2. Under **Project URL**, copy the value labeled **URL** (for example, `https://xyzcompany.supabase.co`).
3. Under **Project API keys**, copy the **service_role** key.

> **Important:** The `service_role` key is highly sensitive. Never commit it to git, never expose it in client-side code, and only use it via environment variables on the server.

### 4. Configure environment variables

In the project root, create a `.env.local` file if it does not already exist, and add:

```bash
SUPABASE_URL=your-supabase-url-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

Replace `your-supabase-url-here` and `your-service-role-key-here` with the values from step 3.

These variables are read by `src/server/supabaseClient.ts` to create a server-only Supabase client that powers the theme persistence logic.

After setting `.env.local`, restart the dev server:

```bash
npm run dev
```

Your selected theme should now be saved in Supabase and restored when you reload the page (without a theme flicker).

### Environment configuration summary

#### Local development (Supabase + switcher ON)

In `.env.local` (local only):

```bash
SUPABASE_URL=your-supabase-url
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_ENABLE_THEME_SWITCHER=true
```

This:

- **Enables** the Supabase client (`hasSupabaseTheme` is `true`).
- **Shows** the theme select.
- **Persists** theme to Supabase via `/api/theme`.

#### Netlify production (no Supabase, no switcher, fixed `dark-green`)

On Netlify, **do not** set:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_ENABLE_THEME_SWITCHER` (or set it to anything other than `"true"`)

Result:

- `hasSupabaseTheme` is `false` → `getThemeForRequest` always returns `"dark-green"`.
- Theme select is **hidden**.
- `/api/theme` is a **no-op** (returns 204, does nothing).
- No secrets are stored in Netlify, and no paid features are required.

**Summary**

- **Local:** use Supabase env vars + `NEXT_PUBLIC_ENABLE_THEME_SWITCHER=true` → full theme switcher + persistence.
- **Netlify:** don’t configure those env vars → no switcher, theme locked at `"dark-green"` and no DB usage.
