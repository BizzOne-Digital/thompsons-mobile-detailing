# Thompson's Mobile Detailing AZ

Production-ready full-stack Next.js website for Thompson's Mobile Detailing AZ — public marketing site, booking flow, and secure admin portal in **one** project folder (no separate frontend/backend).

## Stack

- Next.js App Router + TypeScript + Tailwind CSS
- MongoDB Atlas + Mongoose
- Route Handlers (API)
- Framer Motion, GSAP-ready structure, Lenis smooth scroll
- React Hook Form + Zod
- Cloudinary uploads
- Nodemailer notifications
- Recharts admin dashboard
- Sonner toasts
- Lucide icons

## Getting Started

```bash
cd thompsons-mobile-detailing
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

Copy `.env.example` to `.env.local` and fill in:

- `MONGODB_URI` — MongoDB Atlas connection string
- `AUTH_SECRET` — at least 32 characters
- `ADMIN_SETUP_TOKEN` — one-time token for first admin setup
- `NEXT_PUBLIC_SITE_URL` — e.g. `http://localhost:3000`
- Cloudinary + SMTP variables for uploads and email

## Database Seed

After MongoDB is configured:

Set in `.env.local` (then run seed — admin is created or updated each time):

```env
SEED_ADMIN_EMAIL=your@email.com
SEED_ADMIN_PASSWORD=your-secure-password-12chars-min
SEED_ADMIN_NAME=Thompson Admin
```

```bash
npm run seed
```

Login at `/admin/login` with the email and password above.

Or create the first admin via API:

```bash
curl -X POST http://localhost:3000/api/auth/setup \
  -H "Content-Type: application/json" \
  -d "{\"token\":\"YOUR_ADMIN_SETUP_TOKEN\",\"name\":\"Admin\",\"email\":\"you@example.com\",\"password\":\"your-secure-password\"}"
```

## Admin Portal

- Login: `/admin/login`
- Dashboard: `/admin`
- Manage bookings, services, gallery, blog, FAQs, settings, and more

## Production Build

```bash
npm ci
npm run lint
npm run build
npm start
```

Default port is **3000** (`PORT=3000 npm start` to override).

### Production checklist

1. Set all required env vars on the host (Vercel, Railway, VPS, etc.) — never commit `.env.local`.
2. `NEXT_PUBLIC_SITE_URL` must be your live HTTPS URL (SEO, sitemap, emails).
3. `AUTH_SECRET` — at least 32 random characters.
4. `MONGODB_URI` — Atlas cluster with IP allowlist / VPC for your host.
5. Run `npm run seed` once against production DB (or use `/api/auth/setup`) before go-live.
6. Configure SMTP for booking/contact emails (optional but recommended).
7. After deploy, smoke-test: home, booking submit, `/admin/login`, image upload in admin.

### Deploy (Node server)

Build output is standard Next.js:

```bash
npm run build
npm start
```

For **Vercel**: connect repo, set environment variables, deploy — MongoDB and `AUTH_SECRET` required.

### Health

- Public site works without MongoDB (empty fallbacks); booking and dynamic pages need DB.
- Admin routes require `AUTH_SECRET` in middleware.

## Project Structure (high level)

```text
src/
  app/
    (marketing)/     # Public pages
    admin/             # Admin portal
    api/               # Backend route handlers
  components/
  lib/
  models/
scripts/
  seed.ts
public/
  logo.jpg
```

## Notes

- Booking requests are **pending review** until confirmed by the business.
- Images are stored in MongoDB (`StoredUpload`) and served from `/api/uploads/{folder}/{filename}` (serverless-safe).
- Admin uploads: `POST /api/upload` with `file` + `folder` (`products` | `gallery` | `pages` | `misc`), admin session required.
- Customer booking photos: `POST /api/upload/booking` (rate limited, `misc` folder).
- Legacy `/uploads/...` URLs fall back to a placeholder on the public site.
- Replace placeholder gallery/hero images via admin settings and gallery.

Factory Fresh Results Guaranteed.
