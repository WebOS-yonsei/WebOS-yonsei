/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ['enact-proxy', 'airbnb', 'airbnb/hooks', 'prettier'],
  ignorePatterns: ['node_modules/', 'build/', 'dist/', 'coverage/', 'scripts/', 'config/'],
  rules: {
    'import/no-named-as-default': 'off',
    'import/no-named-as-default-member': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'import/prefer-default-export': 'off',
    'react/function-component-definition': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': 'off',
    'react/prop-types': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-no-bind': 'off',
    'react/destructuring-assignment': 'off',
    'react/no-array-index-key': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      // _로 시작하는 변수는 사용하지 않아도 괜찮음
      {
        args: 'all',
        argsIgnorePattern: '^_',
        caughtErrors: 'all',
        caughtErrorsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        ignoreRestSiblings: true,
      },
    ],

    // @typescript-eslint/no-explicit-any와 중복되므로
    'no-unused-vars': 'off',

    // Text, Image 등의 이름을 가진 컴포넌트를 사용하기 위해서
    'no-shadow': 'off',
  },
  env: {
    browser: true,
    node: true,
  },
};
