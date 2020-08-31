# Start
This section deals with installation and documentation.

::: tip
The library supports commonjs and Iife by default.
If you need to support UMD or AMD format, you can build it yourself.
:::

## Installation

### NPM

Command line installation
```sh
npm install -D axios-sugar
```

Add files by `import` statement

```js
import AxiosSugar from 'axios-sugar';
```
### Script

insert [axios-sugar.js](https://github.com/maoyonglong/axios-sugar/blob/master/dist/axios-sugar.js) or [axios-sugar.bundle.js](https://github.com/maoyonglong/axios-sugar/blob/master/dist/axios-sugar.bundle.js) by using `<script>` tag

```html
<script src="/path/to/axios-sugar.js "></script>
<!-- or -->
<script src="/path/to/axios-sugar.bundle.js "></script>
```

## Use

```js
AxiosSugar.get ('/path/to/sevice').then(res => {
  console.log (res.data);
}).catch(err => {
  console.log (err.reason.message); // all errors are put in reason property
};