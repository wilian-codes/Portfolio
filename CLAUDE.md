# CLAUDE.md

Project rules for Claude Code. Read this before every task.

## Project

- Name: Wilian Nunag — Portfolio
- What it does (one sentence): A personal portfolio site that shows my projects, skills, education, and experience to internship and job recruiters.
- Users and roles: Visitors only (recruiters, hiring managers). No accounts, no admin.
- Main features: sticky responsive nav with a hamburger menu below `md`, landing section with an interactive 3D cartoon avatar, logo-only tech carousel, bento overview grid, project detail pages, contact links, light/dark mode.
- Business rules that must not change:
  - Dark mode is the default; light mode only when the visitor picks it.
  - Public contact info is email, GitHub, and LinkedIn only. Never show my phone number.
  - The avatar's skin tone (`#f0c4a0`) stays as is.
  - Short text only: highlights over paragraphs.

### Scope for this project

Web only. This project uses `apps/web` and nothing else: no `apps/api`, no `packages/shared`, no database, no Docker, no auth. The API, database, and auth rules below apply only if those are added later.

### Design system

- Tokens live in `apps/web/src/styles/globals.css`. Use them; never hard-code colors, font sizes, or timings.
- Colors: monochrome. Dark `#09090b` page, `#111113` cards, white/gray text, `success` green only for status dots ("Open to internships" and the bento "Now" card).
- Type scale (Tailwind classes): `text-display` (name), `text-title` (section titles), `text-heading` (card titles), `text-body`, `text-meta`, `text-label` (mono labels with `font-mono`).
- Muted text: `text-muted-foreground` for supporting text, `text-subtle` for the dimmest labels.
- Motion: one easing curve (`ease-smooth`) and three speeds (`--duration-fast` 150ms hover, `--duration-base` 250ms menus, `--duration-slow` 500ms reveals). Every animation turns off under "reduce motion".
- Fonts: Geist and Geist Mono via Fontsource. Icons: Lucide for UI, Simple Icons for tech logos, Tabler for the GitHub and LinkedIn icons (Simple Icons no longer ships LinkedIn).
- Don't name custom utilities `shimmer`: shadcn's stylesheet already defines one. Ours is `sheen`.
- 3D avatar: plain three.js in `features/hero/lib/` (scene, head, hair, body, materials, input). It loads lazily, pauses when off-screen, and skips idle animation under "reduce motion". three.js uses physical light units, so light intensities are about 3× the old values.
- Tech stack list: `apps/web/src/data/tech-stack.ts`, shared by the logo carousel and the bento stack card. The carousel (`features/tech-marquee/`) moves at a constant (linear) speed, pauses on hover, and becomes a still, wrapped row under "reduce motion".
- Site content lives in `apps/web/src/data/` (profile, projects, experience, education, tech stack). Edit text there, not in components.
- Bento (`features/bento/`): every card uses `BentoCard` for the border, cursor `spotlight`, hover lift, and `rise-in` reveal. Clickable cards use `CardLink`, which stretches one real link over the whole card.
- Routes: `/` (home) and `/projects/:slug` (one page per project in `data/projects.ts`; unknown slugs show the 404 page). Project fields that are still empty (stack, live link, source link) are hidden, not faked.
- Scrolling: smooth within a page; changing pages jumps instantly. `useInstantScrollOnPageChange` handles that and must stay before `<ScrollRestoration />` in the root layout.
- In-page links use React Router's `Link` (e.g. `to="#top"`), not a plain `<a href="#…">`: the router treats a plain hash link as "back" and restores the old scroll position.
- Contact links (email, GitHub, LinkedIn) live in `data/social-links.ts`; the icon row, contact section, and footer all read from it. Never add a phone number there.

## Working agreement

1. **Report first.** Before writing or changing code, tell me:
   - files to create
   - files to edit
   - whether a database migration is needed
   - which Claude model fits the task (Haiku for small edits, Sonnet for normal features, Opus for planning and hard bugs)

   Then wait for my OK.
2. **Fit my level.** I read code well, but I can't write it from scratch yet. New syntax is my main gap. When you use syntax I may not know, explain it in one line in your reply, not in a code comment.
3. **I make the business decisions.** Ask before changing a business rule or adding something I didn't ask for.
4. **Teach the flow.** After each feature, walk me through one request across the files you changed, layer by layer.
5. **Save tokens.** Read only the files the task needs. Keep replies short.
6. **Stay free.** Never add a paid service or anything that needs a credit card.
7. **Keep this file current.** Update it when the structure or stack changes.

## Tech stack (final)

| Category | Pick |
|---|---|
| Language | TypeScript, strict mode |
| Runtime | Node.js, current LTS |
| Monorepo | npm workspaces |
| Frontend | React + Vite + React Router |
| Styling and UI | Tailwind CSS + shadcn/ui |
| Forms | React Hook Form + Zod |
| Server data | TanStack Query |
| Client state | React state first, Zustand only when needed |
| Backend | Express 5, REST API |
| Validation | Zod, shared through `packages/shared` |
| Database | PostgreSQL |
| ORM | Prisma |
| Auth | Better Auth |
| Real-time | Socket.IO |
| AI | Gemini API free tier (`@google/genai`), called only from the API |
| Email | Gmail API over HTTPS, only if the project needs it |
| File storage | Cloudinary free plan, only if the project needs uploads |
| Mobile | React Native + Expo + Expo Router |
| Testing | Vitest (unit and API), Playwright (end-to-end) |
| Code quality | ESLint, Prettier optional |
| Version control | Git + GitHub, public repos |
| CI | GitHub Actions |
| Local database | Docker (PostgreSQL container) |
| Web hosting | Cloudflare Pages |
| API hosting | Render free web service |
| Database hosting | Neon free plan |
| Error monitoring | Sentry free Developer plan |
| Mobile sharing | Android APK built on my machine, no app stores |
| Domains | Free subdomains (`pages.dev`, `onrender.com`) |

## Free-tier limits (plan around these)

- **Render:** the API sleeps after 15 idle minutes and takes about a minute to wake. The web app must show a "Waking up the server..." message when the first request is slow. Add `GET /api/health` for warm-up.
- **Render blocks SMTP ports.** Never send email over SMTP. Use the Gmail API over HTTPS.
- **Neon:** 1 GB per project, and the database sleeps after 5 idle minutes. Use the local Docker database for development. Use the pooled connection string in the app and the direct one for migrations.
- **Gemini free tier:** rate limited, and Google may use free-tier data. Handle HTTP 429 with a friendly message. Never send private or real customer data. The API key stays on the API server.
- **Cloudinary:** 25 credits a month. Keep uploads small.
- **Sentry:** 1 user, 5,000 errors a month.
- **GitHub Actions:** free because the repos are public.
- **Different domains:** the web app (`pages.dev`) and the API (`onrender.com`) are different sites, and some browsers block cross-site cookies. Don't depend on them. Propose the auth approach in the report before building auth (for example, proxy `/api` through Cloudflare Pages, or use Better Auth bearer tokens).

## Folder structure

```
project-name/
├── CLAUDE.md
├── README.md
├── package.json                # npm workspaces + root scripts
├── tsconfig.base.json
├── docker-compose.yml          # local PostgreSQL
├── .github/workflows/ci.yml    # lint, typecheck, test
├── apps/
│   ├── web/                    # React + Vite → Cloudflare Pages
│   │   ├── src/
│   │   │   ├── app/            # router, providers, layouts
│   │   │   │   └── routes/     # one file per page
│   │   │   ├── features/
│   │   │   │   └── orders/
│   │   │   │       ├── api/         # get-orders.ts, create-order.ts
│   │   │   │       ├── components/  # order-card.tsx, order-list.tsx
│   │   │   │       └── hooks/       # use-order-filters.ts
│   │   │   ├── components/ui/  # shadcn/ui components
│   │   │   ├── hooks/          # hooks used by many features
│   │   │   ├── lib/            # api-client.ts, query-client.ts, auth-client.ts, utils.ts
│   │   │   ├── stores/         # Zustand, only if needed
│   │   │   ├── styles/globals.css
│   │   │   └── main.tsx
│   │   ├── e2e/                # Playwright tests
│   │   └── .env.example
│   ├── api/                    # Express → Render
│   │   ├── src/
│   │   │   ├── modules/
│   │   │   │   └── orders/
│   │   │   │       ├── order.routes.ts
│   │   │   │       ├── order.controller.ts
│   │   │   │       ├── order.service.ts
│   │   │   │       ├── order.service.test.ts
│   │   │   │       └── order.repository.ts
│   │   │   ├── shared/
│   │   │   │   ├── middleware/ # auth, validate, error
│   │   │   │   └── errors/     # app-error.ts
│   │   │   ├── lib/            # prisma.ts, auth.ts, gemini.ts, cloudinary.ts, gmail.ts, socket.ts
│   │   │   ├── config/env.ts   # reads and validates env vars
│   │   │   ├── app.ts          # Express setup
│   │   │   └── server.ts       # starts HTTP + Socket.IO
│   │   ├── prisma/schema.prisma
│   │   └── .env.example
│   └── mobile/                 # Expo, only if the project has a phone app
│       ├── app/                # Expo Router screens
│       ├── src/
│       │   ├── features/
│       │   ├── components/
│       │   └── lib/
│       └── .env.example
└── packages/
    └── shared/                 # imported as @repo/shared
        └── src/
            ├── schemas/        # order.schema.ts (Zod)
            └── index.ts
```

## Architecture rules

### API (`apps/api`)

- Request flow: route → middleware (auth, validate) → controller → service → repository → Prisma.
- **Controller:** reads the request, calls one service function, and sends the response. No business rules. No Prisma.
- **Service:** holds the business rules. Never touches `req` or `res`. Throws `AppError` subclasses.
- **Repository:** the only layer that uses Prisma. No business rules.
- **lib/:** one wrapper file per outside service (Gemini, Cloudinary, Gmail). The rest of the code calls the wrapper, never the SDK directly.
- Validate every request (body, params, query) with Zod in the route.
- Schemas used by more than one app live in `packages/shared`. API-only schemas live in the module as `<feature>.schema.ts`.
- One central error middleware. Error response shape:
  `{ "error": { "code": "ORDER_NOT_FOUND", "message": "Order not found." } }`
- Status codes: 200 OK, 201 created, 204 no content, 400 invalid input, 401 not logged in, 403 not allowed, 404 not found, 409 conflict, 500 server error.
- Read env vars only in `src/config/env.ts`, validated with Zod. The app stops at startup if one is missing.
- Migrations use Prisma Migrate. Never edit a migration that already ran. Make a new one.
- Security: helmet for headers, CORS allows only the web app's origin, rate-limit auth routes, and never log passwords or tokens.

### Web (`apps/web`)

- Components display things. Logic goes in hooks.
- Server data comes from TanStack Query hooks in `features/<feature>/api/`. Never copy server data into Zustand.
- All HTTP calls go through `src/lib/api-client.ts`.
- Forms use React Hook Form with the Zod schema from `@repo/shared`.
- Use shadcn/ui components from `src/components/ui/` before writing new ones.
- Style with Tailwind classes only. No inline styles.
- Mobile-first: style for small screens first, then add `md:` and `lg:` classes.
- Every screen that loads data handles loading, error, and empty states.
- Every input has a label. Every image has alt text.

### Mobile (`apps/mobile`)

- Same feature structure as web.
- Screens in `app/` (Expo Router) stay thin. Logic lives in `src/features/`.
- Reuse schemas and types from `@repo/shared`.

### Shared (`packages/shared`)

- Zod schemas and the TypeScript types made from them.
- No React, no Express, no Prisma here.

### Dependency direction

- Apps can import `@repo/shared`. `@repo/shared` never imports from an app.
- Features can import from shared folders (`components/`, `hooks/`, `lib/`).
- Features never import from other features. Combine features in pages (`app/routes/`). If two features need the same code, move it to a shared folder.

## Naming

| What | Style | Example |
|---|---|---|
| Folders | kebab-case | `order-items/` |
| Files, including components | kebab-case | `order-card.tsx`, `use-cart.ts` |
| API layer files | `<feature>.<layer>.ts` | `order-item.service.ts` |
| Unit test files | `<file>.test.ts` | `order.service.test.ts` |
| End-to-end tests | `<flow>.spec.ts` | `checkout.spec.ts` |
| Variables | camelCase | `orderTotal` |
| Booleans | camelCase starting with is/has/can/should | `isPaid`, `hasStock` |
| Functions | camelCase, verb first | `createOrder()`, `getOrderById()` |
| Event handlers | `handle` inside a component, `on` for props | `handleSubmit`, `onSubmit` |
| React components | PascalCase | `OrderCard` |
| Hooks | camelCase starting with `use` | `useOrders()` |
| Types and interfaces | PascalCase, no `I` prefix | `Order`, `OrderCardProps` |
| Zod schemas | camelCase ending in `Schema` | `createOrderSchema` |
| Types from schemas | PascalCase | `CreateOrderInput` |
| Constants | UPPER_SNAKE_CASE | `MAX_CART_ITEMS` |
| Env variables | UPPER_SNAKE_CASE | `DATABASE_URL`, `VITE_API_URL`, `EXPO_PUBLIC_API_URL` |
| Prisma models | PascalCase, singular | `OrderItem` |
| Prisma fields | camelCase | `createdAt` |
| Prisma enums | PascalCase name, UPPER_SNAKE_CASE values | `OrderStatus.PENDING` |
| Database tables and columns | snake_case through `@@map` and `@map` | `order_items`, `created_at` |
| API routes | kebab-case, plural nouns, no verbs | `GET /api/order-items/:id` |
| JSON keys | camelCase | `{ "orderTotal": 120 }` |
| Socket.IO events | `resource:action` | `message:send` |
| Git branches | `type/kebab-case` | `feature/order-checkout` |
| Commits | Conventional Commits | `feat: add order checkout` |

Why kebab-case files: Windows and Mac ignore letter case in file names, but Linux servers (Render, GitHub Actions) don't. One style for every file prevents imports that work locally and break after deploy.

## Code rules

- TypeScript strict mode. No `any`. Use `unknown` and narrow it.
- One job per function and per file. If the description needs "and", split it.
- Clear names over comments. Comments explain why, not what.
- Use early returns instead of deep nesting.
- No magic numbers or strings. Use named constants.
- Copying code twice is fine. On the third copy, make a shared helper.
- No commented-out code. Git keeps the history.
- Never swallow errors. Handle them or let them reach the error middleware.
- Secrets live in `.env`, never in Git. Update `.env.example` when you add a variable.
- Anything starting with `VITE_` or `EXPO_PUBLIC_` is visible to users. Never put secrets there.

## Testing

- Every service function with a business rule gets a Vitest unit test.
- Main API routes get Vitest tests.
- The main user flow gets a Playwright test in `apps/web/e2e/`.
- Unit tests sit next to the file they test: `order.service.test.ts` beside `order.service.ts`.

## Git

- `main` always works and deploys.
- Branch names start with `feature/`, `fix/`, or `chore/`.
- Small commits with Conventional Commits: `feat:`, `fix:`, `refactor:`, `test:`, `docs:`, `chore:`.
- Merge through a pull request after CI passes.
- I commit and push myself. Claude never runs `git commit` or `git push`; it sends me the commands instead.
- No `Co-Authored-By: Claude` line in commit messages.

## Commands

- `docker compose up -d` starts the local database (not used in this web-only project).
- `npm install` at the root installs every app.
- `npm run dev` starts the API and the web app together.
- `npm run dev -w apps/api` starts one app. Same for `apps/web` and `apps/mobile`.
- `npm run lint`, `npm run typecheck`, and `npm run test` check every app. CI runs the same three.
