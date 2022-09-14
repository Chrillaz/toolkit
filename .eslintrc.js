const { base: prettierConfig } = require('@chrillaz/prettier-config');

module.exports = {
  "root": true,
  "extends": [
    "plugin:@chrillaz/eslint-plugin/recommend",
    "prettier"
  ],
  "plugins": [
    "@chrillaz/eslint-plugin",
    "prettier"
  ],
  "rules": {
    "prettier/prettier": ["error", prettierConfig]
  }
}