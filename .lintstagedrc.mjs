export default {
  // Backend файлы (apps/api)
  'apps/api/**/*.{ts,tsx,js,jsx}': [
    'eslint --cache --cache-location ./node_modules/.cache/.eslintcache --fix',
    'prettier --log-level warn --write',
  ],

  // Webapp файлы (apps/web)
  'apps/web/**/*.{ts,tsx,js,jsx}': [
    'eslint --cache --cache-location ./node_modules/.cache/.eslintcache --fix',
    'prettier --log-level warn --write',
  ],

  // Shared файлы (packages/shared, packages/trpc)
  'packages/**/*.{ts,tsx,js,jsx}': [
    'eslint --cache --cache-location ./node_modules/.cache/.eslintcache --fix',
    'prettier --log-level warn --write',
  ],

  // Styles (так как stylelint убрали, оставляем только prettier)
  '**/*.{scss,css}': ['prettier --log-level warn --write'],

  // Prisma (полезное дополнение для твоего стека)
  'prisma/**/*.prisma': ['prisma format'],

  // Config files
  '**/*.{json,yml,yaml,md}': ['prettier --log-level warn --write'],
}
