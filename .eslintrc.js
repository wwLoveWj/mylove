module.exports = {
  extends: [require.resolve("@umijs/fabric/dist/eslint")],
  rules: {
    "no-unused-vars": "warn",
    "@typescript-eslint/no-unused-vars": "warn",
  },
  globals: {
    __WebpackModuleApi: true,
  },
};
