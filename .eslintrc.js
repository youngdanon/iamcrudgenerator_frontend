module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'standard'
  ],
  parser: '@typescript-eslint/parser',
  ignorePatterns: ['src/**/*.g.ts', 'enums.tsx'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest'
  },
  plugins: [
    'react',
    '@typescript-eslint'
  ],
  rules: {
    'react/no-array-index-key': 'error',
    'react/jsx-closing-bracket-location': 'error',
    'react/jsx-closing-tag-location': 'error',
    'react/jsx-first-prop-new-line': ['error', 'multiline-multiprop'],
    'react/jsx-indent': [2, 2, { indentLogicalExpressions: true }],
    'react/jsx-indent-props': [2, 2],
    'react/jsx-max-props-per-line': [1, { when: 'always' }],
    'react/jsx-one-expression-per-line': ['error', { allow: 'single-child' }],
    'react/jsx-pascal-case': ['error', { allowNamespace: true }],
    'react/jsx-props-no-multi-spaces': 'error',
    'react/jsx-sort-props': ['warn', { shorthandLast: true, reservedFirst: true }],
    'react/jsx-filename-extension': [1, { extensions: ['.jsx', '.tsx'] }],
    'react/require-default-props': 0
  }
}
