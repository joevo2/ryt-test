// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');

module.exports = defineConfig([
  expoConfig,
  eslintPluginPrettierRecommended,
  {
    ignores: ['dist/*'],
    // Let Prettier handle quote style. Turn off ESLint's built-in `quotes` and
    // `jsx-quotes` rules so they don't conflict with Prettier's formatting.
    // Also explicitly configure the `prettier/prettier` rule to use
    // single quotes (this ensures the ESLint plugin uses the same setting
    // even if editor integrations don't pick up .prettierrc for some reason).
    rules: {
      quotes: 'off',
      'jsx-quotes': 'off',
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          trailingComma: 'es5',
        },
      ],
    },
  },
]);
