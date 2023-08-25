module.exports = {
  root: true,
  parser: '@typescript-eslint/parser', // TypeScript parser
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: [
    'eslint:recommended', // Use recommended ESLint rules
    'plugin:@typescript-eslint/recommended', // Use recommended TypeScript rules
    'plugin:react/recommended', // Use recommended React rules
    'plugin:prettier/recommended', // Use Prettier rules
  ],
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'no-console': 'warn',
    '@typescript-eslint/explicit-module-boundary-types': 'off', // Allowing implicit return types
    'react/prop-types': 'off', // Disable prop-types rule when using TypeScript
  },
};
