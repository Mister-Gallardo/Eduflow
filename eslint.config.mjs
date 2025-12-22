import { defineConfig, globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";
import eslintJs from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import nodePlugin from "eslint-plugin-n";

export default defineConfig([
  /* -------------------------------------------------- */
  /* Global ignores                                     */
  /* -------------------------------------------------- */
  globalIgnores([
    "node_modules/",
    "**/dist/",
    "**/*.d.ts",
    "**/*.tsbuildinfo",
    "eslint.config.mjs",
    "*/jest.config.mjs",
    "jest.config.mjs",
  ]),

  /* -------------------------------------------------- */
  /* Base JS rules                                      */
  /* -------------------------------------------------- */
  eslintJs.configs.recommended,

  /* -------------------------------------------------- */
  /* TypeScript (type-aware)                            */
  /* -------------------------------------------------- */
  ...tseslint.configs.recommendedTypeChecked,

  /* -------------------------------------------------- */
  /* Shared parser options                              */
  /* -------------------------------------------------- */
  {
    plugins: {
      import: importPlugin,
    },

    languageOptions: {
      parserOptions: {
        // project: [
        //   './apps/api/tsconfig.eslint.json',
        //   './apps/web/tsconfig.eslint.json',
        //   './packages/shared/tsconfig.eslint.json',
        //   './packages/trpc/tsconfig.eslint.json',
        // ],
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },

    rules: {
      /* ---------- IMPORT ORDER (РАБОТАЕТ) ---------- */
      "import/order": [
        "error",
        {
          alphabetize: { order: "asc", caseInsensitive: true },
          "newlines-between": "always",
          pathGroups: [
            {
              pattern: "{.,..}/**/env{,.*}",
              group: "builtin",
              position: "before",
            },
          ],
          pathGroupsExcludedImportTypes: ["builtin"],
        },
      ],
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
      "no-new": "off",
      "no-console": ["error", { allow: ["warn", "error", "info"] }],
    },
  },

  /* -------------------------------------------------- */
  /* 🟦 BACKEND — apps/api                              */
  /* -------------------------------------------------- */
  {
    files: ["apps/api/**/*.ts"],
    plugins: {
      n: nodePlugin,
    },
    rules: {
      "n/no-process-env": "error",
    },
  },

  /* -------------------------------------------------- */
  /* 🟩 FRONTEND — apps/web                             */
  /* -------------------------------------------------- */
  {
    files: ["apps/web/**/*.{ts,tsx}"],
    rules: {},
  },

  /* -------------------------------------------------- */
  /* 🟩 🟦 SHARED — packages/shared + trpc              */
  /* -------------------------------------------------- */
  {
    files: ["packages/**/*.{ts,tsx}"],
    plugins: {
      n: nodePlugin,
    },
    rules: {
      "n/no-process-env": "error",
    },
  },
]);
