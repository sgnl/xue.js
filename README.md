
# xue.js

add a pixel snowflake effect to your DOM elements.

![xue js-snowfall](https://cloud.githubusercontent.com/assets/3915598/21381630/7b92a3a8-c700-11e6-9361-def03a7b74a4.gif)

# Features

- add pixel snow to any element on your webpage
- target `body` to have it snow over your entire web page
- target individual elements to decorate your web page

# Installation

- have yarn installed: [follow directions here][yarn_install_url]
- clone and run `yarn install && npm run build`
- use files located in `dist/`

# Usage

- `window.Xue or Xue` will be available globally after including one of the files in `dist/` into your html via `<script>` or bundling tool

```javascript

Xue.init({selector: '.banner-to-have-snowfall'});

```

# Why
why not

**what does `xue` mean?**
It's loosely "snow" in the Chinese language

# Contribute
PRs are welcomed

[yarn_install_url]: https://yarnpkg.com/en/docs/install
