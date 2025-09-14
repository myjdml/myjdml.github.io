module.exports = {
  env: {
    node: true,
    es2022: true,
    browser: true,
  },
  extends: ["eslint:recommended", "plugin:astro/recommended"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  overrides: [
    {
      files: ["*.astro"],
      parser: "astro-eslint-parser",
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".astro"],
      },
      rules: {},
    },
    {
      files: ["*.ts", "*.tsx"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
      extends: [
        // 放在 overrides 内，避免影响 .astro 的推荐规则
        "plugin:@typescript-eslint/recommended",
      ],
      rules: {},
    },
    {
      files: ["*.d.ts"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        sourceType: "module",
      },
      rules: {
        "@typescript-eslint/triple-slash-reference": "off",
      },
    },
  ],
};
