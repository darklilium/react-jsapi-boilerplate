# CSS Modules: Search paths to resolve compose directives

[![Build Status](https://travis-ci.org/raisebook/postcss-modules-resolve-path.svg?branch=master)](https://travis-ci.org/raisebook/postcss-modules-resolve-path)
[![NPM version](http://img.shields.io/npm/v/postcss-modules-resolve-path.svg)](https://www.npmjs.org/package/postcss-modules-resolve-paths)


With this config:

```javascript
{
  'paths': [ 'src/style', 'components/style' ]
}
```

given two files: 'src/style/base.css' and 'components/style/button.css:

```css
.myClass {
  composes: button from "button.css";
  color: green;
}
```

into:

```css
.myClass {
  composes: button from "components/style/button.css";
  color: green;
}
```

It will ignore absolute and relative paths, so:

```css
.myClass {
  composes: button from "button.css";
  color: green;
}

.myClass2 {
  composes: button from "/button.css";
  color: green;
}


.myClass3 {
  composes: button from "./button.css";
  color: green;
}
```

will still be:

```css
.myClass {
  composes: button from "components/style/button.css";
  color: green;
}

.myClass2 {
  composes: button from "/button.css";
  color: green;
}


.myClass3 {
  composes: button from "./button.css";
  color: green;
}
```

## Options

- _paths_ - array of search paths

## Building

```
npm install
npm build
npm test
```

## Development

- `npm watch` will watch `src` for changes and rebuild
- `npm autotest` will watch `src` and `test` for changes and retest

## License

MIT
