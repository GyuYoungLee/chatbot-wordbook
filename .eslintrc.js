module.exports = {
  extends: ["airbnb-base", "prettier"],
  plugins: ["import"],
  env: {
    browser: false,
    node: true,
  },
  rules: {
    "import/no-extraneous-dependencies": [2, { devDependencies: true }],
    "no-console": 0,
    "no-use-before-define": 0,
    "global-require": 0,
    "no-restricted-globals": 0,
    "no-shadow": 0,
    "guard-for-in": 0,
    "no-restricted-syntax": 0,
    "no-await-in-loop": 0,
  },
};
