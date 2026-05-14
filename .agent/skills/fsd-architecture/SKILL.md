# Skill: FSD Architecture & Fullstack Integration

## Context

Project Stack: React, Vite, TypeScript, pnpm, FSD (Feature-Sliced Design), MUI, Framer Motion, Prisma, tRPC.

## Rules for Code Generation

### 1. FSD Structure

Follow the layers strictly:

- **Shared**: Reusable UI (MUI based), API clients (tRPC), utils, constants.
- **Entities**: Business entities (e.g., User, Product). Only logic and data related to the entity.
- **Features**: User interactions (e.g., AddToCart, AuthByEmail).
- **Widgets**: Composition of entities and features (e.g., Header, ProductCard).
- **Pages**: Full pages composed of widgets.

### 2. Component Guidelines

- Use **MUI** for base components.
- Use **Framer Motion** for animations (prefix animations with `motion.` from `framer-motion`).
- Every FSD slice must have a **Public API** (`index.ts` file) exporting only necessary parts.
- Files should be named in `kebab-case`.

### 3. Fullstack & Tools

- Package Manager: Always use **pnpm**.
- Database: Use **Prisma**. After schema changes, run `pnpm prisma generate`.
- Communication: Use **tRPC** for API calls. If a new procedure is needed, update the backend router first.

### 4. Code Style

- Use Functional Components with Arrow Functions.
- Use TypeScript interfaces instead of types for props.
- Follow the project's Prettier and ESLint configs.
