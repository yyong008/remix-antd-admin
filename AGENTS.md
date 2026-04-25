# Project Agents

## Project Overview

**Name:** react-router-antd-admin
**Description:** React Router Antd Admin - A modern admin dashboard built with React Router v7, Ant Design, and Hono
**Repository:** https://github.com/yyong008/remix-antd-admin.git

## Tech Stack

### Core

- **React Router v7** (Framework Mode) - Full-stack React framework with loaders/actions
- **React 19** - UI library
- **Hono 4** - Lightweight web framework for API routes
- **Ant Design 6** - React UI component library

### Database & ORM

- **Drizzle ORM** - TypeScript ORM for SQL databases
- **Better Auth** - Authentication framework
- **Cloudflare D1** - Serverless SQLite database (via Workers)

## Email

- **CLoudflare Email** - Cloudflare Email

### Build & Tooling

- **Vite+** - Build toolchain (wraps Vite, Rolldown, Vitest, tsdown, Oxlint, Oxfmt)
- **Native CSS** - CSS-in-JS via Ant Design theme tokens and inline styles
- **pnpm** - Package manager (v10.33.0)

### AI/ML

- **AI SDK** - AI SDK for React
- **Ollama** - Local LLM provider

### Other Dependencies

- **Day.js** - Date manipulation
- **Quill** - Rich text editor
- **Nanoid** - ID generation
- **Zod** - Schema validation

## Project Structure

```
app/
├── api-client/           # API client functions and queries
│   ├── queries/          # React Query hooks (blog, news, auth, etc.)
│   └── index.ts
├── components/          # Shared React components
│   ├── admin-table/      # Admin table component
│   ├── common/           # Common UI components (ButtonLink, FormatTime, etc.)
│   ├── page-container/   # Page layout wrapper
│   └── quill-editor/     # Rich text editor
├── features/             # Feature modules
│   ├── admin/            # Admin dashboard
│   │   └── modules/
│   │       ├── blog/    # Blog management (articles, categories, tags)
│   │       ├── dashboard/
│   │       ├── news/     # News management
│   │       ├── profile/
│   │       └── tools/   # Tools (mail, storage, etc.)
│   ├── ai/              # AI features
│   ├── auth/            # Authentication (login, signup)
│   ├── cms/             # CMS features
│   └── mkt/             # Marketing pages (about, index, etc.)
├── hooks/               # Custom React hooks
├── utils/               # Utility functions
│   └── client/          # Client-side utilities
└── routes/              # React Router routes
    └── routes.ts        # Route configuration

db/
├── schema/              # Drizzle ORM schema definitions
└── seed/                # Database seed scripts

public/                  # Static assets

wrangler.toml            # Cloudflare Workers configuration
react-router.config.ts   # React Router configuration
```

## Development Commands

```bash
# Install dependencies
pnpm install

# Development
pnpm dev                 # Start dev server
pnpm build              # Build for production
pnpm start              # Start production server

# Code Quality
pnpm lint               # Run linter (oxlint)
pnpm format             # Format code (oxfmt)
pnpm check              # Run lint + typecheck + format check
pnpm test               # Run tests (vitest)

# Database
pnpm drizzle:generate   # Generate Drizzle migrations
pnpm drizzle:push       # Push schema to database
pnpm drizzle:migrate    # Run migrations
pnpm db:studio:local     # Open Drizzle Studio
pnpm db:seed:local      # Seed local database

# TypeScript
pnpm typecheck          # Run full type check
```

## Important Conventions

### Vite+ Commands

- **Always use `vp` commands** instead of direct tool invocations
- `vp dev`, `vp build`, `vp test`, `vp lint`, `vp fmt` for all tooling
- Import test utilities from `vite-plus/test`, not `vitest`
- Do NOT install Vitest, Oxlint, or tsdown directly

### React Router Patterns

- Use **loaders** for data fetching
- Use **actions** for mutations
- Route files export `Route` component and optional `loader`/`action` functions
- Error boundaries handle errors at route level

### File Naming

- Route files: `route.tsx`
- Components: `index.tsx` in folder or `ComponentName.tsx`
- Lowercase for utilities, PascalCase for components

### API Queries

- Use React Query via `@tanstack/react-query`
- Query hooks are in `app/api-client/queries/`
- Follow pattern: `use<Entity>List`, `use<Entity>ById`, `useCreate<Entity>`, `useUpdate<Entity>`, `useDelete<Entity>`

### Ant Design Usage

- Use `theme.useToken()` for theme-aware styling
- Prefer `Flex` over `Space` for layout
- Use `Card` with `variant="borderless"` for content containers

### Styling

- Use inline styles with Ant Design theme tokens for most styling
- Use `clsx` for conditional class names when Tailwind CSS classes are still present
- CSS variables for Ant Design token overrides

## Environment Setup

Required environment variables (see `.env.example`):

- `AUTH_SECRET` - Better Auth secret
- `RESEND_API_KEY` - Email API key
- `AI_PROVIDER` - AI provider selection
- `OLLAMA_BASE_URL` - Ollama server URL

## Vite+ Configuration

Vite+ is configured via `package.json` and wraps:

- Vite for builds
- Rolldown for bundling
- Vitest for testing
- Oxlint for linting
- Oxfmt for formatting
- tsdown for TypeScript compilation

## Review Checklist

- [ ] Run `vp install` after pulling remote changes
- [ ] Run `vp check` and `vp test` before committing
- [ ] Use `pnpm` commands via Vite+ (`vp add`, `vp remove`, etc.)
- [ ] Follow React Router v7 data patterns (loaders/actions)
- [ ] Use Ant Design theme tokens for consistent styling
