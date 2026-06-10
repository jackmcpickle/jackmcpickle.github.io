import { defineConfig } from 'oxlint';

export default defineConfig({
    rules: {
        unambiguous: 'off',
        'require-await': 'off',
        'no-warning-comments': 'off',
        'no-console': ['warn', { allow: ['warn', 'error'] }],
        'no-void': ['warn', { allowAsStatement: true }],
        'no-undefined': 'off',
        'import/no-default-export': 'off',
        'import/no-relative-parent-imports': 'off',
        'import/max-dependencies': ['error', { max: 50 }],
        'import/no-unassigned-import': [
            'warn',
            { allow: ['**/*.css', '**/*.svg', '**/index.ts'] },
        ],
        'max-lines': ['warn', { max: 500 }],
        'max-lines-per-function': ['warn', { max: 500 }],
        'react/react-in-jsx-scope': 'off',
        'react/only-export-components': 'off',
        'react-perf/jsx-no-new-function-as-prop': 'off',
        'react_perf/jsx-no-new-object-as-prop': 'off',
        'react_perf/jsx-no-new-array-as-prop': 'off',
        'func-style': [
            'error',
            'declaration',
            { overrides: { namedExports: 'ignore' } },
        ],
        'typescript/no-floating-promises': [
            'error',
            {
                checkThenables: true,
            },
        ],
        'typescript/no-deprecated': 'error',
        'typescript/strict-boolean-expressions': 'off',
        'typescript/prefer-readonly-parameter-types': 'off',
        'typescript/explicit-module-boundary-types': [
            'warn',
            { allowArgumentsExplicitlyTypedAsAny: true },
        ],
        'typescript/no-unsafe-type-assertion': 'off',
        'typescript/only-throw-error': 'off',
        'typescript/explicit-function-return-type': [
            'error',
            {
                allowExpressions: true,
                allowTypedFunctionExpressions: true,
            },
        ],
        'jsx_a11y/anchor-is-valid': 'warn',
        'react/jsx-filename-extension': [
            'warn',
            {
                extensions: ['.jsx', '.tsx'],
            },
        ],
    },
    overrides: [
        {
            files: ['astro.config.mjs'],
            rules: {
                'typescript/no-unsafe-assignment': 'off',
            },
        },
        {
            files: ['scripts/**'],
            rules: {
                'no-console': 'off',
            },
        },
    ],
    categories: {
        perf: 'error',
        restriction: 'error',
        correctness: 'error',
        suspicious: 'error',
        pedantic: 'warn',
    },
    plugins: [
        'eslint',
        'typescript',
        'import',
        'react',
        'jsx-a11y',
        'react-perf',
    ],
    ignorePatterns: ['node_modules/', 'build/', '.astro', 'dist/', 'static/'],
});
