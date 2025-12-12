# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

homecomp-ui is a Vue 3 + TypeScript personal finance management application for tracking household expenses and entries. It uses Vite as the build tool and features a modern UI built with shadcn-vue components (New York style).

## Commands

### Development
```bash
npm run dev              # Start dev server with hot reload (runs on all network interfaces with --host)
npm run build            # Type-check and build for production
npm run build-only       # Build without type-checking
npm run type-check       # Run Vue TypeScript compiler
npm run preview          # Preview production build locally
npm run test:unit        # Run unit tests with Vitest
```

### Testing
```bash
npm run test:unit                          # Run all tests in watch mode with Vitest
npm run test:unit -- path/to/test.spec.ts # Run a specific test file
```

Test configuration:
- Uses Vitest with jsdom environment for DOM testing
- Configuration in `vitest.config.ts` (merges with vite.config.ts)
- Test utilities: @vue/test-utils for component testing

## Architecture

### Layout System
The app uses a two-layout system controlled via route metadata:
- **Simple Layout** (`route.meta.layout === 'simple'`): Renders RouterView directly without app chrome (used for login)
- **App Layout** (default): Wraps content in `AppLayout.vue` which includes the sidebar navigation and main content area

The root `App.vue` conditionally renders these layouts based on route metadata.

### Authentication Flow
Authentication is managed by `useAuth` composable with:
- Global state stored in `compState.isAuthenticated` and `user` refs
- Persistence via localStorage (key: `"xap-user"`)
- Route guard in `router/index.ts` that redirects unauthenticated users to `/login`
- Currently using mock authentication (test@test.local / test)

### State Management Pattern
The app uses a **composable-based state pattern** instead of Pinia/Vuex:
- Each domain has a composable (e.g., `useAuth`, `useAccounts`, `useEntries`)
- State is stored in module-level refs outside the composable function
- Composables return computed properties and methods
- This creates singleton-like behavior with shared state across components

Example pattern:
```typescript
// Module-level state
const state = ref<StateType>({...})

// Composable returns computed views
export const useFeature = () => {
  return {
    data: computed(() => state.value),
    methods: ...
  }
}
```

### Modular Composable Architecture
Complex domains follow a consistent modular structure pattern:
- `fetch.ts`: Data fetching logic with typed interfaces (e.g., `IEntryFetch`, `ICategoryFetch`)
- `store.ts`: Mutation operations (create/update/delete) with separate state
- `mock.ts`: Mock data generation using @faker-js/faker
- `use[Domain].ts`: Main composable that orchestrates fetch and store operations
- `index.ts`: Barrel exports for clean imports

Examples of this pattern:
- `src/composable/entries/`: Entry management with pagination (`entryStore` for mutations, `entryFetch` for list data)
- `src/composable/categories/`: Category management
- `src/composable/reminders/`: Reminder management

Simpler domains (like `useAccounts`, `useAuth`) use a single file with the composable pattern.

### Mock Data
Currently, all backend interactions are mocked:
- Authentication: Hardcoded credentials (test@test.local / test)
- Accounts, entries, categories, reminders: Generated via mock functions with setTimeout to simulate API latency
- Mock data uses @faker-js/faker for realistic test data

### Component Structure
- `src/components/ui/`: shadcn-vue components (Card, Button, Input, Sidebar, Toast, etc.)
- `src/components/`: Application-specific components (LoginForm, EntryForm, EntryList, AppSidebar)
- `src/views/`: Route-level view components
- `src/layout/`: Layout wrapper components

### Import Patterns
**Path Aliases:**
TypeScript and Vite are configured with `@/` alias pointing to `src/`:
```typescript
import { useAuth } from '@/composable/useAuth.ts'
import Button from '@/components/ui/button/Button.vue'
```

**Barrel Exports:**
Modular composables use `index.ts` for clean imports:
```typescript
// In components, import from the domain folder
import { useEntries, type IEntry } from '@/composable/entries'
// Instead of: import { useEntries } from '@/composable/entries/useEntry.ts'
```

### UI Component System
Using shadcn-vue with configuration in `components.json`:
- Style: "new-york"
- Base color: "stone"
- Icon library: lucide-vue-next
- Components use reka-ui primitives under the hood
- Form validation with vee-validate + zod

### Styling
- TailwindCSS v4 (via @tailwindcss/vite plugin)
- Main styles in `src/assets/main.css`
- Components use Tailwind utility classes
- CSS variables for theming (cssVariables: true)

## Node Version Requirements
Requires Node.js `^20.19.0 || >=22.12.0` (specified in package.json engines)
- Never use 'any' in type declaration on typescript. Create interfaces