import eslint from '@eslint/js'
import { defineConfig } from 'eslint/config'
import tseslint from 'typescript-eslint'

export default defineConfig({
  ignores: [
    'src/modules/**/repo/queries/**'
  ]
},eslint.configs.recommended, tseslint.configs.recommended, tseslint.configs.strict)
