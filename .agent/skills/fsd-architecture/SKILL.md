---
name: fsd-architecture
description: Архитектурный стандарт FSD для Fullstack проекта (React, Vite, Prisma, tRPC, MUI)
---

# Skill: FSD Architecture & Fullstack Integration

## Context

Project Stack: React, Vite, TypeScript, pnpm, FSD (Feature-Sliced Design), MUI, Framer Motion, Prisma, tRPC.

## Rules for Code Generation

### 1. FSD Structure

Follow the layers strictly:

- **Shared**: Reusable UI (MUI based), API clients (tRPC), utils, constants.
- **Entities**: Business entities (e.g., User, Product). Только логика и данные сущности.
- **Features**: Взаимодействия (например, AddToCart, AuthByEmail).
- **Widgets**: Композиция entities и features (Header, ProductCard).
- **Pages**: Сборка страниц из виджетов.

### 2. Component Guidelines

- Use **MUI** (Material UI) for all base components.
- Use **Framer Motion** for animations (always use `motion.` components).
- Every FSD slice MUST have a **Public API** (`index.ts`) exporting ONLY needed parts.
- Files: `kebab-case`.

### 3. Fullstack & pnpm

- Package Manager: Always use **pnpm**.
- Database: Use **Prisma**. After schema changes, run `pnpm prisma generate`.
- API: Use **tRPC**. Update backend routers before frontend hooks.

### 4. Code Style

- Functional Components + Arrow Functions.
- TS interfaces for props.
- Use project ESLint/Prettier.
