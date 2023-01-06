module.exports = {
  overrides: [
    {
      files: ['**/*.scss'],
      customSyntax: 'postcss-scss',
    },
  ],
  extends: [
    'stylelint-config-standard',
    'stylelint-config-css-modules',
    'stylelint-config-rational-order',
    'stylelint-config-recommended-scss',
    'stylelint-config-prettier',
    'stylelint-no-unsupported-browser-features',
    'stylelint-scss',
  ],
  plugins: [
    'stylelint-order',
    'stylelint-declaration-block-no-ignored-properties',
  ],
  rules: {
    'color-hex-case': 'lower',
    'string-quotes': 'single',
    'at-rule-no-unknown': null,
    'no-invalid-position-at-import-rule': null,
    'scss/at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'tailwind',
          'apply',
          'variants',
          'responsive',
          'screen',
        ],
      },
    ],
    'declaration-block-trailing-semicolon': null,
    'no-descending-specificity': null,
    'function-url-quotes': null,
    'keyframes-name-pattern': null,
  },
};
