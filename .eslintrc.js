module.exports = {
  extends: [require.resolve("@umijs/fabric/dist/eslint")],
  rules: {
    "no-unused-vars": "warn",
    "@typescript-eslint/no-unused-vars": "warn",
  },
  globals: {
    __WebpackModuleApi: true,
  },
  // 以下三行为nodejs中解析html不报错配置
  parserOptions: {
    extraFileExtensions: [".html"], // 添加这一行
  },
  plugins: ["@typescript-eslint/eslint-plugin", "eslint-plugin-html"],
};
