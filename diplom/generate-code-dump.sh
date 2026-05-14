#!/bin/bash
# ============================================================
# Генератор дампа кода проекта Eduflow для загрузки в Claude
#
# Использование:
#   bash diplom/generate-code-dump.sh              — все 4 манифеста (полный дамп)
#   bash diplom/generate-code-dump.sh db-section   — только файлы для раздела 2.1
#   bash diplom/generate-code-dump.sh <имя>        — любой diplom/files-<имя>.txt
#
# Чтобы добавить/убрать файлы — редактируй манифесты в diplom/files-*.txt
# Каждая строка = путь к файлу от корня проекта.
# Строки начинающиеся с # и пустые строки игнорируются.
# ============================================================

set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DUMP_DIR="$PROJECT_ROOT/diplom"
OUTPUT="$DUMP_DIR/eduflow-code-dump.txt"

cd "$PROJECT_ROOT"

# --- Определяем какие манифесты использовать ---
if [ $# -gt 0 ]; then
  # Указан конкретный манифест (или несколько)
  MANIFESTS=()
  for arg in "$@"; do
    manifest_path="$DUMP_DIR/files-${arg}.txt"
    if [ ! -f "$manifest_path" ]; then
      echo "❌ Манифест не найден: $manifest_path"
      echo "   Доступные манифесты:"
      ls "$DUMP_DIR"/files-*.txt 2>/dev/null | sed 's|.*/files-||;s|\.txt||;s|^|     |'
      exit 1
    fi
    MANIFESTS+=("$manifest_path")
  done
else
  # По умолчанию — все 4 основных манифеста
  MANIFESTS=(
    "$DUMP_DIR/files-root.txt"
    "$DUMP_DIR/files-packages.txt"
    "$DUMP_DIR/files-api.txt"
    "$DUMP_DIR/files-web.txt"
  )
fi

echo "🔧 Генерируем дамп кода проекта Eduflow..."
echo "   Манифесты: ${MANIFESTS[*]##*/}"

# --- Заголовок ---
cat > "$OUTPUT" <<'HEADER'
================================================================
ПРОЕКТ: Eduflow — Платформа онлайн-обучения
АРХИТЕКТУРА: Fullstack Monorepo (pnpm workspaces)
СТЕК: React + Vite (frontend) | Express + tRPC (backend) | Prisma + PostgreSQL (DB)
ПАТТЕРН: Feature-Sliced Design (FSD) на фронтенде
================================================================

Структура монорепозитория:
├── apps/
│   ├── api/         — Backend (Express, tRPC, Prisma Client)
│   └── web/         — Frontend (React, Vite, MUI, tRPC Client)
├── packages/
│   ├── db/          — Prisma schema, миграции, клиент БД
│   ├── shared/      — Общие типы и утилиты (Zod-схемы)
│   └── logger/      — Логгер (pino)

FSD-слои фронтенда (apps/web/src):
├── app/       — Инициализация приложения, провайдеры, роутинг
├── pages/     — Страницы (композиция виджетов и фич)
├── widgets/   — Самостоятельные блоки UI (хедер, сайдбар)
├── features/  — Бизнес-фичи (авторизация, решение шагов)
├── entities/  — Бизнес-сущности (курс, урок, шаг)
├── shared/    — Переиспользуемое (UI-kit, API, конфиг, утилиты)

================================================================
СОДЕРЖИМОЕ ФАЙЛОВ ПРОЕКТА НИЖЕ
================================================================

HEADER

# --- Добавляем дерево проекта в начало дампа ---
echo "🌳 Добавляем дерево проекта..."
echo "" >> "$OUTPUT"
echo "СТРУКТУРА ДИРЕКТОРИЙ (дерево):" >> "$OUTPUT"
echo "----------------------------------------------------------------" >> "$OUTPUT"

# Используем tree, если он установлен, иначе выводим предупреждение
if command -v tree >/dev/null 2>&1; then
  # Исключаем мусор, логи, кэши и сгенерированные файлы Prisma
  tree -L 5 -I 'node_modules|dist|.git|.turbo|.next|generated|pnpm-lock.yaml|*.tsbuildinfo|*.log' ./ >> "$OUTPUT"
else
  echo "⚠️ Команда 'tree' не найдена. Дерево пропущено." >> "$OUTPUT"
  echo "   (Установите её через: brew install tree или sudo apt install tree)"
fi

echo "----------------------------------------------------------------" >> "$OUTPUT"

# --- Счётчики ---
total_files=0
missing_files=0

# --- Читаем каждый манифест ---
for manifest in "${MANIFESTS[@]}"; do
  manifest_name=$(basename "$manifest" .txt)

  echo "📄 Обрабатываю $manifest_name..."

  echo "" >> "$OUTPUT"
  echo "╔══════════════════════════════════════════════════════════╗" >> "$OUTPUT"
  echo "║  РАЗДЕЛ: $manifest_name" >> "$OUTPUT"
  echo "╚══════════════════════════════════════════════════════════╝" >> "$OUTPUT"

  while IFS= read -r filepath || [ -n "$filepath" ]; do
    # Пропускаем комментарии и пустые строки
    [[ -z "$filepath" || "$filepath" == \#* ]] && continue

    # Убираем пробелы по краям
    filepath=$(echo "$filepath" | xargs)

    if [ ! -f "$filepath" ]; then
      echo "   ⚠️  Не найден: $filepath"
      ((missing_files++))
      continue
    fi

    echo "" >> "$OUTPUT"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" >> "$OUTPUT"
    echo "📄 FILE: $filepath" >> "$OUTPUT"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" >> "$OUTPUT"
    cat "$filepath" >> "$OUTPUT"
    echo "" >> "$OUTPUT"

    ((total_files++))
  done < "$manifest"
done

# --- Итого ---
FILE_SIZE=$(wc -c < "$OUTPUT" | tr -d ' ')
FILE_SIZE_KB=$((FILE_SIZE / 1024))
APPROX_TOKENS=$((FILE_SIZE / 4))

echo ""
echo "✅ Готово!"
echo "   Файл:    $OUTPUT"
echo "   Файлов:  $total_files"
[ "$missing_files" -gt 0 ] && echo "   ⚠️  Пропущено (не найдено): $missing_files"
echo "   Размер:  ${FILE_SIZE_KB} КБ (~${APPROX_TOKENS} токенов)"
echo ""
echo "📋 Загрузи eduflow-code-dump.txt как вложение в Claude (claude.ai)"
