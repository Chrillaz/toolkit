const { base: prettierConfig } = require('@chrillaz/prettier-config');

module.exports = {
  "root": true,
  "extends": [
    "plugin:@chrillaz/recommended",
    "prettier"
  ],
  "plugins": [
    "@chrillaz",
    "prettier"
  ],
  "rules": {
    "prettier/prettier": ["error", prettierConfig]
  }
}