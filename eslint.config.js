import importPlugin from 'eslint-plugin-import';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactPlugin from 'eslint-plugin-react';
import typescriptParser from '@typescript-eslint/parser'; // 导入解析器
import typescriptPlugin from '@typescript-eslint/eslint-plugin';

export default [
  // Base configuration
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: typescriptParser, // 使用解析器作为对象
      globals: {
        browser: true,
        commonjs: true,
        es6: true,
      },
    },
    ignores: ["!**/.server", "!**/.client"], // 更新为 ignores
    plugins: {
      react: reactPlugin,
      'jsx-a11y': jsxA11yPlugin, // 添加 jsx-a11y 插件并确保使用引号
      'react-hooks': reactHooksPlugin, // 加入 react-hooks 插件
      '@typescript-eslint': typescriptPlugin, // 使用插件时需要带引号
      import: importPlugin,
    },
    rules: {
      "no-console": "warn",
      "no-unused-vars": "warn",
      'react-hooks/exhaustive-deps': 'off', // 禁用该规则
    },
  },

  // React 配置
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parser: typescriptParser, // 使用解析器作为对象
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        jsx: true, // 将 jsx 移到 globals 中
      },
    },
    plugins: {
      react: reactPlugin,
      'jsx-a11y': jsxA11yPlugin, // 添加 jsx-a11y 插件并确保使用引号
    },
    settings: {
      react: {
        version: "detect",
      },
      formComponents: ["Form"],
      linkComponents: [
        { name: "Link", linkAttribute: "to" },
        { name: "NavLink", linkAttribute: "to" },
      ],
      "import/resolver": {
        typescript: {},
      },
    },
    rules: {
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
      "jsx-a11y/anchor-is-valid": "warn",
    },
  },

  // TypeScript 配置
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: typescriptParser, // 使用解析器作为对象
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin, // 使用插件时需要带引号
      import: importPlugin,
    },
    settings: {
      "import/internal-regex": "^~/",
      "import/resolver": {
        node: {
          extensions: [".ts", ".tsx"],
        },
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
    },
  },

  // Node 配置
  {
    files: [".eslintrc.cjs"],
    languageOptions: {
      globals: {
        node: true,
      },
    },
    rules: {
      "no-console": "off",
    },
  },
];
