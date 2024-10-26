module.exports = {
  root: true,
  env: {
    node: true,
    es2024: true
  },
  extends: ['eslint:recommended'],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2024
  },
  rules: {
    'import/no-cycle': 'off'
  }
};