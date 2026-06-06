# 📚 Eduflow — LMS с ручной проверкой заданий

> Веб-платформа с ролями «студент» / «преподаватель». Автоматическая и ручная проверка, реактивный UI, типобезопасный API.

## ✨ Особенности

- 🔐 Регистрация, логин, роли (STUDENT/TEACHER)
- 📚 Иерархия: Курс → Модуль → Урок → Шаг
- 🧩 Типы шагов: текст, видео, тесты, ввод числа/строки, сопоставление, упорядочивание, свободный ответ
- 🤖 Автопроверка тестов и заданий с эталоном
- ✍️ Ручная проверка свободных ответов (статус + комментарий преподавателя)
- ⚡ Реактивный SPA (без перезагрузок)
- 🔗 Сквозная типизация API (tRPC)
- 🛡️ Безопасность: Argon2id, JWT+refresh, HttpOnly куки

## 🛠 Стек

| Категория | Технологии                                             |
| --------- | ------------------------------------------------------ |
| Frontend  | React, Vite, TS, MUI, tRPC client, RHF, TanStack Query |
| Backend   | Node.js, Express, tRPC, Prisma, PostgreSQL, Winston    |
| Dev/Tools | pnpm workspaces, Vitest, ESLint, Prettier, Husky       |

## 🚀 Быстрый старт

```bash
git clone https://github.com/Mister-Gallardo/Eduflow.git
cd eduflow
pnpm install
# настройте .env (DATABASE_URL, JWT_SECRET)
pnpm db:push
pnpm db:seed
pnpm dev
```

## 🧪 Тестирование

```bash
pnpm test   # 86/86 passed
```
