# WordPress Setup

## 1. Confirm REST API access

Open this URL in your browser:

```txt
https://your-wordpress-site.com/wp-json/wp/v2/posts
```

If you get JSON, the API is ready.

## 2. Configure CORS (when domains differ)

If Next.js and WordPress run on different domains, allow your Next.js origin in WordPress CORS settings.

Recommended approach:

1. Install a CORS plugin in WordPress.
2. Allow your Next.js domain (for example `http://localhost:3000` in dev).

## 3. Add environment variables

In `.env.local`:

```env
WORDPRESS_URL=https://your-wordpress-site.com
NEXT_PUBLIC_WORDPRESS_URL=https://your-wordpress-site.com
```

## 4. Test locally

```bash
npm run dev
```

Visit:

- `http://localhost:3000` for posts
- `http://localhost:3000/posts/<slug>` for a single post
- `http://localhost:3000/api/posts` for JSON API output

## Troubleshooting

- `Missing WORDPRESS_URL`: `.env.local` is missing or invalid.
- `WordPress request failed 401/403`: endpoint requires auth.
- No posts shown: verify posts are published and not private.
- CORS errors in browser: add correct allowed origin in WordPress.
