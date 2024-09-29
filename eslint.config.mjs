import { createConfigForNuxt } from '@nuxt/eslint-config/flat';

export default createConfigForNuxt({})
  .prepend()
  .override('nuxt/javascript', {
    files: ['locales/*.js'],
    rules: {
      // 'sort-keys': 'warn',
    },
  })
  .override('nuxt/typescript/rules', {
    rules: {
      'sort-imports': 'warn',
    },
  });
