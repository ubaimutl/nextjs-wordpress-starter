# Next.js WordPress Starter (JavaScript)

JavaScript-only WordPress starter template built with:

- Next.js 16 App Router
- React 19
- Tailwind CSS 4
- Route Handlers (`app/api/*`) as the API layer

This is the same feature set as the TypeScript version, but implemented with plain JavaScript.

## 1. Quick start

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000.

## 2. Configure WordPress URL

Set your WordPress site URL in `.env.local`:

```env
WORDPRESS_URL=https://your-wordpress-site.com
NEXT_PUBLIC_WORDPRESS_URL=https://your-wordpress-site.com
```

Only `WORDPRESS_URL` is required. `NEXT_PUBLIC_WORDPRESS_URL` is optional.

## 3. App structure

```txt
src/
  app/
    api/
      posts/
      categories/
      comments/
    posts/[slug]/page.js
    page.js
  components/
    post-card.jsx
    post-content.jsx
    comments-list.jsx
    category-filter.jsx
    pagination.jsx
  lib/
    wordpress/
      server.js
      query.js
    utils.js
```

## 4. API route handlers

- `GET /api/posts`
- `GET /api/posts/[slug]`
- `GET /api/categories`
- `GET /api/comments?post=<id>`

## 5. Features included

- Home page with search, category filter, and pagination
- Post detail page by slug
- Comments listing
- Embedded featured images and author metadata
- Server-side content fetching with revalidation

## 6. Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## 7. WordPress requirements

- WordPress REST API enabled (`/wp-json/wp/v2/posts` responds)
- Public posts/pages available
- CORS configured if frontend and WordPress are on different domains

See `WORDPRESS_SETUP.md` for details.
