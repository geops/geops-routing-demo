import { defineConfig } from "eslint/config";
import geopsFlatConfig from "@geops/eslint-config-react/flat";
import globals from "globals";
import importPlugin from "eslint-plugin-import";
import mocha from "eslint-plugin-mocha";
import tseslint from "typescript-eslint";

const cypressFiles = ["cypress/**/*.js"];
const testFiles = [
  "src/**/*.test.js",
  "src/**/*.test.jsx",
  "src/**/*.spec.js",
  "src/**/*.spec.jsx",
  "src/__mocks__/**/*.js",
  "src/test/mocks/**/*.js",
  "src/setupTests.js",
  "cypress/**/*.js",
];

const unitTestFiles = testFiles.filter((file) => file !== "cypress/**/*.js");
const typescriptRuleOverrides = Object.fromEntries(
  geopsFlatConfig
    .flatMap((config) => Object.keys(config.rules ?? {}))
    .filter(
      (rule, index, rules) =>
        rule.startsWith("@typescript-eslint/") && rules.indexOf(rule) === index,
    )
    .map((rule) => [rule, "off"]),
);
const perfectionistRuleOverrides = Object.fromEntries(
  geopsFlatConfig
    .flatMap((config) => Object.keys(config.rules ?? {}))
    .filter(
      (rule, index, rules) =>
        rule.startsWith("perfectionist/") && rules.indexOf(rule) === index,
    )
    .map((rule) => [rule, "off"]),
);
const mochaRuleOverrides = Object.fromEntries(
  Object.keys(mocha.configs.recommended.rules).map((rule) => [rule, "off"]),
);

export default defineConfig(
  {
    ignores: ["build/**", "docs/**", "**/*.css"],
  },
  ...geopsFlatConfig,
  {
    files: ["**/*.{js,jsx}"],
    extends: [tseslint.configs.disableTypeChecked],
    rules: {
      ...perfectionistRuleOverrides,
      ...typescriptRuleOverrides,
      "arrow-body-style": "off",
      "no-unused-vars": [
        "error",
        {
          varsIgnorePattern: "^React$",
        },
      ],
    },
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2020,
        ...globals.jest,
        ...globals.node,
      },
      parserOptions: {
        ecmaVersion: "latest",
      },
    },
    settings: {
      "import/resolver": {
        node: {
          extensions: [".js", ".jsx", ".json"],
        },
      },
      react: {
        version: "detect",
      },
    },
    plugins: {
      import: importPlugin,
    },
    rules: {
      "import/no-unresolved": [2, { ignore: ["\\?react$", "\\?raw$"] }],
    },
  },
  {
    files: unitTestFiles,
    rules: {
      ...mochaRuleOverrides,
      "mocha/no-setup-in-describe": "off",
    },
  },
  {
    files: cypressFiles,
    rules: {
      ...mochaRuleOverrides,
      "mocha/no-setup-in-describe": "off",
    },
  },
  {
    files: testFiles,
    languageOptions: {
      globals: {
        vi: "readonly",
      },
    },
    rules: {
      "import/no-extraneous-dependencies": [
        "error",
        {
          devDependencies: true,
        },
      ],
    },
  },
);
