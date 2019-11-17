module.exports = {
  extends: [
    'airbnb',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:jsx-a11y/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint'
  ],
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'react',
    'react-hooks',
    'jsx-a11y',
    'json',
    'prettier'
  ],
  env: {
    browser: true
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx']
    },
    'import/resolver': {
      typescript: {}
    },
    react: {
      version: 'detect'
    }
  },
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/jsx-filename-extension': [
      2,
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] }
    ],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'import/prefer-default-export': [0],
    'react/jsx-props-no-spreading': [0],
    'react/jsx-one-expression-per-line': [0],
    'no-shadow': [1],
    '@typescript-eslint/no-explicit-any': [1],
    '@typescript-eslint/interface-name-prefix': [0],
    'no-underscore-dangle': [0],
    'react/jsx-wrap-multilines': [
      'error',
      { declaration: false, assignment: false }
    ],
    'no-console': [1, { allow: ['warn', 'error'] }]
  }
};
