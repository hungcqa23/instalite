module.exports = {
  extends: [
    'next/core-web-vitals',
    'plugin:@tanstack/eslint-plugin-query/recommended',
    'prettier',
    'plugin:prettier/recommended'
  ],
  rules: {
    'prettier/prettier': [
      'warn',
      {
        arrowParens: 'avoid',
        semi: true,
        trailingComma: 'none',
        tabWidth: 2,
        endOfLine: 'auto',
        useTabs: false,
        singleQuote: true,
        printWidth: 100,
        jsxSingleQuote: true,
        importOrder: ['^@core/(.*)$', '^@server/(.*)$', '^@ui/(.*)$', '^[./]'],
        importOrderSeparation: true,
        importOrderSortSpecifiers: true,
        plugins: ['@trivago/prettier-plugin-sort-imports']
      }
    ]
  }
};
