import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import tsParser from '@typescript-eslint/parser'
import eslintConfigPrettier from 'eslint-config-prettier'
import path from 'path'
import { defineConfig, globalIgnores } from 'eslint/config'

/** @type {import('eslint').Linter.Config[]} */
export default defineConfig([
    globalIgnores(['node_modules/', 'dist/']),
    { files: ['**/*.{ts}'] },
    {
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                project: path.join(import.meta.dirname, 'tsconfig.json')
            },
            globals: globals.node
        }
    },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    {
        rules: {
            'no-console': 'error',
            quotes: ['error', 'single', { allowTemplateLiterals: true }],
            ...eslintConfigPrettier.rules
        }
    }
])
