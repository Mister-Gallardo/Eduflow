import { defineConfig, globalIgnores } from 'eslint/config'
import tseslint from 'typescript-eslint'
import eslintJs from '@eslint/js'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import nodePlugin from 'eslint-plugin-n'
import globals from 'globals'
import hooksPlugin from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default defineConfig([
  /* -------------------------------------------------- */
  /* Global ignores                                     */
  /* -------------------------------------------------- */
  globalIgnores([
    'node_modules/',
    '**/dist/',
    '**/*.d.ts',
    '**/*.tsbuildinfo',
    'eslint.config.mjs',
    '*/jest.config.mjs',
    'jest.config.mjs',
    'packages/db/prisma/seed.ts',
    'packages/db/prisma.config.ts',
  ]),

  /* -------------------------------------------------- */
  /* Base JS rules                                      */
  /* -------------------------------------------------- */
  eslintJs.configs.recommended,

  /* -------------------------------------------------- */
  /* TypeScript (type-aware)                            */
  /* -------------------------------------------------- */
  ...tseslint.configs.stylisticTypeChecked,
  ...tseslint.configs.recommendedTypeChecked,

  /* -------------------------------------------------- */
  /* Shared parser options                              */
  /* -------------------------------------------------- */
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },

    languageOptions: {
      parserOptions: {
        // project: [
        //   './apps/api/tsconfig.eslint.json',
        //   './apps/web/tsconfig.eslint.json',
        //   './packages/shared/tsconfig.eslint.json',
        //   './packages/trpc/tsconfig.eslint.json',
        // ],
        projectService: {
          allowDefaultProject: ['*.mjs', 'eslint.config.mjs'],
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },

    rules: {
      /* ---------- IMPORT SORT (simple-import-sort) ---------- */
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // 1. env imports first
            ['^.+/env(\\..*)?$'],
            // 2. Side effect imports (e.g., polyfills)
            ['^\\u0000'],
            // 3. Node.js builtins
            ['^node:'],
            // 4. External packages
            ['^@?\\w'],
            // 5. Internal packages (aliases starting with @/ or ~)
            ['^@/', '^~'],
            // 6. Parent imports (../)
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            // 7. Sibling imports (./)
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
            // 8. Style imports at the end
            ['^.+\\.s?css$'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-new': 'off',
      'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
    },
  },

  /* -------------------------------------------------- */
  /* 🟦 BACKEND — apps/api                              */
  /* -------------------------------------------------- */
  {
    files: ['apps/api/**/*.ts'],
    languageOptions: {
      globals: globals.node,
    },
    plugins: {
      n: nodePlugin,
    },
    rules: {
      'n/no-process-env': 'error',
    },
  },

  /* -------------------------------------------------- */
  /* 🟩 FRONTEND — apps/web                             */
  /* -------------------------------------------------- */
  {
    files: ['apps/web/**/*.{ts,tsx}'],
    languageOptions: {
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': hooksPlugin,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...hooksPlugin.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      '@typescript-eslint/no-misused-promises': [
        'error',
        { checksVoidReturn: { attributes: false } },
      ],

      '@typescript-eslint/no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: [
                '@api/**',
                // '!@eduflow/backend/**/',
                // '!@ideanick/backend/**/input',
                // '!@ideanick/backend/**/can',
              ],
              allowTypeImports: true,
              message:
                // 'Only types and input schemas are allowed to be imported from backend workspace',
                'Only types are allowed to be imported from backend workspace',
            },
          ],
        },
      ],

      'no-restricted-syntax': [
        'error',
        {
          selector: '[object.type=MetaProperty][property.name=env]',
          message: 'Use instead import { env } from "shared/config/env"',
        },
      ],
    },
  },

  /* -------------------------------------------------- */
  /* 🟩 🟦 Packages                                      */
  /* -------------------------------------------------- */
  {
    files: ['packages/**/*.{ts,tsx}'],
    plugins: {
      // n: nodePlugin,
    },
    rules: {
      // 'n/no-process-env': 'error',
    },
  },

  /* -------------------------------------------------- */
  /* 🛠 CONFIG FILES FIX (Root configs)                 */
  /* -------------------------------------------------- */
  {
    files: ['*.mjs'],
    // Применяем это только к файлам в корне
    ignores: ['apps/**/*', 'packages/**/*'],
    rules: {
      // Отключаем правила, требующие строгой типизации для конфигов
      '@typescript-eslint/prefer-nullish-coalescing': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
    },
  },
])
