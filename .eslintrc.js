/* eslint-env node */
module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  rules: {
    // (This rule is poorly named. It should be "no-implicit-import".)
    'node/no-extraneous-import': 'error',
    // Be explicit when you must, but return type is usually inferred correctly.
    '@typescript-eslint/explicit-function-return-type': 'off',
    // Function return types can be inferred, so this is too onerous.
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    // Avoid using "any" or "as any" wherever possible, but this is too onerous.
    '@typescript-eslint/no-explicit-any': 'off',
    // Avoid foo!.bar wherever possible, but this is too onerous.
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    eqeqeq: ['error', 'always'],
  },
  root: true,
}
