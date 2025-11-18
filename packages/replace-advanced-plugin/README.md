# ReplaceAdvancedPlugin

A webpack plugin to replace multiple strings in JS/CSS/HTML files with loader and build stage support.

## Installation

```bash
npm install --save-dev replace-advanced-plugin
```

## Usage

```js
const ReplaceAdvancedPlugin = require("replace-advanced-plugin");

module.exports = {
  plugins: [
    new ReplaceAdvancedPlugin({
      debug: true,
      replacements: [
        {
          from: /cdn\.jsdelivr\.net\/npm/g,
          to: "unpkg.com",
          exts: ["js", "css", "html"],
          useLoader: true
        }
      ]
    })
  ]
};
```
