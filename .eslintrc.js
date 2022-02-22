module.exports = {
    env: {
        browser: true,
        'react-native/react-native': true,
        es2021: true,
    },
    extends: [
        'plugin:react/recommended',
        'airbnb',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
    },
    settings: {
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            },
        },
    },
    plugins: [
        'react',
        'react-native',
        '@typescript-eslint',
    ],
    rules: {
        'react/jsx-filename-extension': [2, { extensions: ['.jsx', '.tsx'] }],
        indent: [2, 4],
        'react/function-component-definition': [2, { namedComponents: 'arrow-function' }],
        'react/jsx-indent': [2, 4],
        'react/jsx-indent-props': [2, 4],
        'no-use-before-define': 0,
        'import/no-unresolved': [2, { ignore: ['@env'] }],
        'no-restricted-exports': ['error', { restrictedNamedExports: ['default'] }],
        'import/extensions': [
            'error',
            'ignorePackages',
            {
                js: 'never',
                jsx: 'never',
                ts: 'never',
                tsx: 'never',
                mjs: 'never',
            },
        ],
    },
};
