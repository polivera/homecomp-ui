import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import eslintConfigPrettier from 'eslint-config-prettier'

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  eslintConfigPrettier,
  {
    ignores: ['dist/', 'node_modules/', '*.config.js', '*.config.ts'],
  },
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
      },
    },
  },
  {
    // Apply restriction to all files except composable internals
    files: ['**/*.ts', '**/*.vue'],
    ignores: ['src/composable/**/*'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@/composable/*/*', '@/composable/*/**'],
              message:
                'Direct imports from composable internals are not allowed. Please import from the module index file (e.g., "@/composable/entries" instead of "@/composable/entries/fetch").',
            },
          ],
        },
      ],
    },
  },
)
