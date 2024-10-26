import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactRefreshPlugin from 'eslint-plugin-react-refresh';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
    js.configs.recommended,
    {
        files: ['**/*.{js,jsx}'],
        ignores: ['dist/**', 'build/**', 'node_modules/**'],
        languageOptions: {
            ecmaVersion: 2024,
            sourceType: 'module',
            parserOptions: {
                ecmaFeatures: {
                    jsx: true
                }
            },
            globals: {
                document: 'readonly',
                window: 'readonly',
                console: 'readonly',
                setTimeout: 'readonly',
                clearTimeout: 'readonly',
                requestAnimationFrame: 'readonly',
                cancelAnimationFrame: 'readonly',
                alert: 'readonly'
            },
        },
        plugins: {
            'react': reactPlugin,
            'react-hooks': reactHooksPlugin,
            'react-refresh': reactRefreshPlugin,
            'import': importPlugin,
        },
        settings: {
            react: {
                version: 'detect',
            },
            'import/resolver': {
                alias: {
                    map: [['@', './src']],
                    extensions: ['.js', '.jsx']
                },
                node: {
                    node: true
                }
            },
        },
        rules: {
            // React specific rules
            'react/jsx-uses-react': 'error',
            'react/jsx-uses-vars': 'error',
            'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
            'react/prop-types': 'off',
            'react/react-in-jsx-scope': 'off',
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',

            // General JavaScript rules
            'no-unused-vars': ['warn', {
                argsIgnorePattern: '^_',
                varsIgnorePattern: '^_',
                caughtErrorsIgnorePattern: '^_'
            }],
            'prefer-const': 'error',
            'semi': ['error', 'always'],
            'quotes': ['error', 'single'],
            'no-console': ['warn', { allow: ['warn', 'error'] }],

            // Import rules
            'import/order': ['error', {
                'groups': ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
                'newlines-between': 'always',
                'alphabetize': { order: 'asc', caseInsensitive: true }
            }],
            'import/no-cycle': 'off'  // Disabled globally
        },
    },
    {
        files: ['**/*.{js,jsx}'],
        rules: prettier.rules,
    },
    {
        files: ['*.config.js', 'vite.config.js', 'tailwind.config.js'],
        languageOptions: {
            globals: {
                module: 'readonly',
                require: 'readonly',
                __dirname: 'readonly',
                process: 'readonly',
                alert: 'readonly',
            }
        },
        rules: {
            'no-undef': 'off',
            'import/no-unresolved': ['error', {
                caseSensitive: false
            }]
        }
    }
];