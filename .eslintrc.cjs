module.exports = {
  env: {
    node: true,
    'vitest/globals': true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  rules: {
    'semi': ['error', 'never'],
    "no-unused-vars": "error",
    "no-extra-semi": "error",
    "eqeqeq": "error",
    "camelcase": "error",
    'vue/no-unused-vars': 'error',
    "tailwindcss/no-unknown-class": "error"
  },
  plugins: [
    '@typescript-eslint',
    'tailwindcss',
    'vitest'
  ]
}