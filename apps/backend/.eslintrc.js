module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'import', 'prettier'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'airbnb-typescript/base',
    'plugin:prettier/recommended',
    'prettier',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  rules: {
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      { allowExpressions: true },
    ],
    '@typescript-eslint/no-explicit-any': 'error',
    'prettier/prettier': 'error',
    'arrow-body-style': 'warn',
    'import/named': 'error',
    'import/namespace': 'error',
    'import/default': 'error',
    'import/export': 'error',
    'import/no-dynamic-require': 'error',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/*.e2e-spec.{js,ts}',
          '**/*.spec.{js,ts}',
          'test/**/*',
        ],
      },
    ],
    'import/first': 'error',
    'import/no-duplicates': 'error',
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        pathGroups: [
          {
            pattern: '@utils',
            group: 'external',
            position: 'after',
          },
          {
            pattern: '@constants',
            group: 'external',
            position: 'after',
          },
          {
            pattern: '@configs',
            group: 'external',
            position: 'after',
          },
          {
            pattern: '@modules',
            group: 'external',
            position: 'after',
          },
        ],
        'newlines-between': 'never',
      },
    ],
    'import/newline-after-import': 'error',
    'import/prefer-default-export': 'off',
  },
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: 'tsconfig.json',
      },
    },
  },
};
