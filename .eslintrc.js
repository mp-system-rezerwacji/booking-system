module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended',
    'prettier',
  ],
  plugins: [],
  // add your custom rules here
  rules: {
    'vue/multi-word-component-names': 0,
    '@typescript-eslint/no-unused-vars': 0,
    'import/no-named-as-default': 0,
    'import/no-named-as-default-member': 0,
  },
}
