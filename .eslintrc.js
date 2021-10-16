module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    curly: 0,
    'no-param-reassign': 0,
    'class-methods-use-this': 0,
    'no-plusplus': 0,
    'max-len': [1, 150, 4],
    'no-nested-ternary': 0,
    'nonblock-statement-body-position': 0,
    'no-lonely-if': 0,
    'brace-style': 0,
  },
};
