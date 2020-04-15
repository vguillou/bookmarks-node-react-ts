module.exports = {
    extends: [
        'react-app',
        'prettier/@typescript-eslint',
        'plugin:prettier/recommended',
    ],
    rules: {
        'prettier/prettier': [
            'warn',
            {
                semi: false,
                tabWidth: 4,
                arrowParens: 'always',
                printWidth: 100,
                singleQuote: true,
            },
        ],
        'no-param-reassign': [2, {"props": true}],
    }
};
