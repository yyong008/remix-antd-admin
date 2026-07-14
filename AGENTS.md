# Project Agents

React Router Antd Admin - A monorepo admin dashboard built with React Router v8, Ant Design, Hono, and Cloudflare Workers.

## Project Purpose

A full-stack admin dashboard platform featuring RBAC, content management (blog/news/docs), system administration, AI chat, email tools, file storage, and a public-facing marketing website. Built as a monorepo with shared packages for maximum code reuse between the admin and web apps.

## Technology Choices

| Choice                               | Rationale                                                                                             |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------- |
| **React Router v8** (Framework Mode) | Full-stack React with loaders/actions for data fetching, file-based routing, and SSR/SSG capabilities |
| **Hono 4**                           | Lightweight, fast, type-safe API framework with first-class RPC client support                        |
| **Ant Design 6**                     | Comprehensive enterprise UI component library with theming system                                     |
| **Drizzle ORM**                      | Type-safe SQL ORM with schema migrations and D1 support                                               |
| **Better Auth**                      | Full-featured auth framework with session management, RBAC, and social login                          |
| **Cloudflare D1**                    | Serverless SQLite with zero maintenance, global replication via Workers                               |
| **TanStack React Query**             | Server state management with caching, invalidation, and optimistic updates                            |
| **pnpm + Turborepo**                 | Fast package manager with strict dependency resolution + monorepo orchestration                       |
| **inlang Paraglide JS**              | Tree-shakable i18n with Type-safe messages and no runtime overhead                                    |
| **Tailwind CSS 4**                   | Utility-first CSS with JIT compilation, used alongside Ant Design tokens                              |
| **Vite**                             | Fast HMR, optimized builds with Rolldown/Rollup                                                       |

## Workspace Structure

```
├── apps/
│   ├── admin/          # Admin dashboard (React Router + Ant Design)
│   │   ├── app/        # Application source (components, routes, hooks, providers)
│   │   ├── messages/   # i18n message files (en.json, de.json)
│   │   ├── workers/    # Cloudflare Workers scripts
│   │   ├── project.inlang/  # inlang i18n settings
│   │   ├── react-router.config.ts
│   │   └── wrangler.jsonc
│   ├── api/            # Hono API entrypoint (Cloudflare Worker)
│   │   └── src/index.ts
│   └── web/            # Public marketing website (React Router)
│       ├── app/        # Application source
│       ├── messages/   # i18n message files (en.json, zh.json)
│       ├── content/    # Static content
│       ├── project.inlang/
│       ├── react-router.config.ts
│       └── wrangler.jsonc
└── packages/
    ├── api/            # @workspace/api — Hono API implementation (routes, middleware, helpers)
    ├── auth/           # @workspace/auth — Better Auth server/client config
    ├── config/         # @workspace/config — Shared configuration
    ├── database/       # @workspace/database — Drizzle schema, migrations, repositories, seeds
    ├── i18n/           # @workspace/i18n — Shared inlang paraglide messages
    ├── storage/        # @workspace/storage — Cloudflare R2 storage utilities
    ├── typescript-config/  # Shared tsconfig presets
    ├── ui/             # @workspace/ui — shadcn/ui components (tailwind-based)
    └── utils/          # @workspace/utils — Shared utility functions
```

### App Internal Structure (`apps/admin/app/`)

```
app/
├── api-client/              # Hono RPC client
│   ├── get-api-client.ts    # hc<AppType>() factory
│   ├── index.ts
│   └── queries/             # TanStack React Query hooks
│       ├── auth/            # useSession, useLogin, etc.
│       ├── blog/            # useBlogList, useCreateBlog, etc.
│       ├── dashboard/
│       ├── news/
│       ├── profile/
│       ├── system/          # config/, dept/, dict/, menu/, monitor/, role/, user/
│       ├── tools/
│       └── *.ts             # docs-changelog, docs-feedback, public-blog, etc.
├── components/              # Shared React components
│   ├── admin-table/         # AdminTable — Ant Design Table wrapper with toolbar
│   ├── common/              # 22+ shared UI components (ButtonLink, FormatTime, etc.)
│   ├── page-container/      # Page layout wrapper (title, loading, responsive)
│   ├── pro-form-kit/        # ProForm/ModalForm/DrawerForm — Ant Design Form abstractions
│   └── react-email/
├── config/                  # App configuration (lang, product, ai, turnstile)
├── context/
├── hooks/                   # Custom React hooks
├── layout/                  # Admin and auth layout components
├── paraglide/               # Generated inlang paraglide runtime
├── providers/               # QueryClient provider
├── routes/                  # All route pages organized by feature
│   ├── admin/               # Dashboard, blog, news, docs, system, tools, profile, ai, about
│   ├── auth/                # Login, signup
│   └── home.tsx
├── routes.ts                # Route configuration with :locale? prefix
├── root.tsx
├── session/
├── types/
└── utils/                   # Client and server utilities
```

## Workspace Rules

- **Package naming**: `@workspace/<name>` for all internal packages
- **Consumer apps**: `apps/admin` depends on `@workspace/api`, `@workspace/auth`, `@workspace/ui`, etc.
- **API flow**: `apps/api` re-exports `@workspace/api` as the Cloudflare Worker entry point
- **Shared i18n**: `packages/i18n` contains base messages; each app can extend with app-specific messages
- **Database access**: Only `packages/api` (and seed scripts) should import from `@workspace/database`
- **UI separation**: `@workspace/ui` is for tailwind-based components; Ant Design components live in `apps/admin/app/components/`
- **Dependency direction**: `apps/*` → `packages/*` (never the reverse)

## Security & Sensitive Content

- Never read, display, or commit `.env`, `.env.local`, `.env.production` files — they contain secrets, API keys, and database credentials
- Never write or modify `wrangler.jsonc` or `wrangler.toml` files without explicit user request — they contain Cloudflare account bindings, D1 database IDs, R2 bucket names, and other deployment-critical config
- Never include secrets, tokens, passwords, or API keys in code, messages, or generated files
- `.gitignore` already excludes `.env*`, `node_modules/`, `dist/`, `build/`, `.wrangler/` — respect these boundaries

## Dependency Management

- **pnpm catalogs** in `pnpm-workspace.yaml` define shared versions across all packages
- Use `"catalog:"` protocol in package.json to reference catalog entries
- Run `pnpm install` at root after adding/changing any dependency
- Never commit `pnpm-lock.yaml` changes without a corresponding package.json change

## Turbo Orchestration Rules

Tasks defined in `turbo.json`:

| Task           | Caching  | Depends On | Notes                             |
| -------------- | -------- | ---------- | --------------------------------- |
| `build`        | disabled | `^build`   | Outputs to `dist/**`, `build/**`  |
| `dev`          | disabled | `^build`   | `persistent: true` (long-running) |
| `lint`         | enabled  | `^build`   | Outputs empty (no artifacts)      |
| `format`       | enabled  | `^build`   | Outputs empty                     |
| `deploy`       | disabled | `^build`   | Deployment gate                   |
| `generate`     | disabled | -          | Code generation                   |
| `clean`        | disabled | -          | Clean builds                      |
| `react-doctor` | disabled | -          | React diagnosis                   |

- Root scripts use turbo: `turbo build`, `turbo dev`, `turbo lint`, `turbo fmt`, `turbo test`
- Use `-F` flag for per-package commands: `pnpm -F @workspace/database run migrate`
- Persistent tasks (`dev`) run in the background and don't block task graph completion

## i18n (Internationalization)

Framework: **inlang Paraglide JS** — compile-time i18n with tree-shakeable messages.

### Message Files

| Location                  | Languages | Scope              |
| ------------------------- | --------- | ------------------ |
| `packages/i18n/messages/` | en, zh    | Shared messages    |
| `apps/admin/messages/`    | en, de    | Admin app messages |
| `apps/web/messages/`      | en, zh    | Web app messages   |

### Configuration

- Each app has its own `project.inlang/settings.json` with locale config
- Admin: `sourceLanguageTag: "en"`, `languageTags: ["en", "zh"]`
- Web: `baseLocale: "zh"`, `locales: ["zh", "en"]`
- All routes wrapped in `prefix(":locale?", [...])` for optional locale prefix
- Use generated paraglide runtime at `app/paraglide/` for `m.*()` message functions

### Lang Config

- Admin: `app/config/lang.ts` — `langs = ["en", "zh"]`, `defaultLang = langs[0]`
- Web: `app/config/lang.ts` — `defaultLang = "zh"`, `langs = ["en", "zh"]`

## Important Conventions

### React Router Patterns

- Use **loaders** for data fetching, **actions** for mutations
- Route files export `Route` component and optional `loader`/`action` functions
- Error boundaries handle errors at route level
- All routes wrapped in `:locale?` prefix for i18n support

### API Client

- **Admin app**: Hono RPC via `hc<AppType>()` — type-safe client from `app/api-client/get-api-client.ts`
- **Web app**: Simple fetch-based `apiGet`/`apiPost` utilities
- Query hooks follow: `use<Entity>List`, `use<Entity>ById`, `useCreate<Entity>`, `useUpdate<Entity>`, `useDelete<Entity>`

### Form Handling

- Use `ProForm`/`ModalForm`/`DrawerForm` from `components/pro-form-kit/` for forms, not raw Ant Design Form
- ProForm provides: `ProFormText`, `ProFormTextArea`, `ProFormDigit`, `ProFormSelect`, `ProFormDateTimePicker`, `ProFormTreeSelect`, `ProFormRadio.Group`, `ProFormUploadButton`, `ProFormDependency`
- ProForm mimics `@ant-design/pro-components` API without external dependency

### AdminTable

- Use `AdminTable` from `components/admin-table/` for all list pages
- Props: `headerTitle`, `toolBarRender`, `columns`, `AdminTableOptions` (with `reload`)
- Renders in a Card container with toolbar

### Database Repositories

- Keep repository modules in `packages/database/src/repositories/<domain>/`
- Use kebab-case filenames: `blog-category.ts`
- Export each database operation as an independent function with `db` as its first parameter
- Import repository modules as namespaces: `blogCategory.getById(db, id)`

### Ant Design Usage

- Use `theme.useToken()` for theme-aware styling
- Prefer `Flex` over `Space` for layout
- Use `Card` with `variant="borderless"` for content containers

### Styling

- Use inline styles with Ant Design theme tokens for most styling
- Use `clsx` for conditional class names when Tailwind CSS classes are still present
- CSS variables for Ant Design token overrides
- `@workspace/ui` uses tailwind + class-variance-authority for component variants

## Development Commands

```bash
# Install dependencies
pnpm install

# Development (all apps)
pnpm dev                 # turbo dev — starts admin, api, web concurrently

# Build
pnpm build               # turbo build

# Code Quality
pnpm lint                # turbo lint
pnpm format              # turbo fmt
pnpm test                # turbo test

# Database
pnpm drizzle:generate    # Generate Drizzle migrations
pnpm drizzle:push        # Push schema to database
pnpm drizzle:migrate     # Run migrations
pnpm db:studio:local     # Open Drizzle Studio
pnpm db:seed:local       # Seed local database
pnpm db:setup:local      # migrate + seed

# i18n
pnpm -F @workspace/i18n run compile  # Compile inlang messages

# Deploy
pnpm build && pnpm -F apps/api run deploy
```

## Agent Prohibitions

- Do not manually edit compiled outputs, caches, build outputs, or dependency installation directories.
- Do not manually edit i18n paraglide output.
- Do not read, print, or summarize real sensitive configs such as `.env*`, `.dev.vars*`, `wrangler.json`, or `wrangler.jsonc`; only example/template files may be read.
- Do not reformat the whole repository or perform unrelated refactors without a clear reason.
- Do not put shared logic into a single app in a way that causes duplicate implementations.
- Do not bypass pnpm workspace rules or the turbo pipeline.
- Do not add external services, frameworks, or runtime dependencies without an explicit requirement.
