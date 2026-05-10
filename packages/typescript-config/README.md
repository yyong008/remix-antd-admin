# @seeksaas/typescript-config

Shared TypeScript configuration for SeekSaaS projects.

## Configurations

- `base.json` - Base TypeScript configuration with strict settings
- `react-library.json` - Configuration for React libraries (extends base.json)
- `react-router.json` - Configuration for React Router projects (extends base.json, uses ESNext modules)

## Usage

In your `tsconfig.json`:

```json
{
  "extends": "@seeksaas/typescript-config/react-router.json",
  "include": ["**/*"],
  "exclude": ["dist", "build", "node_modules"]
}
```

## Features

- ✅ Strict type checking
- ✅ Modern ES2022 target
- ✅ Module resolution support (NodeNext/Bundler)
- ✅ React JSX support
- ✅ Declaration files generation
