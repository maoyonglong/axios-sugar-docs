# 开始
本章节涉及安装和文件引入部分。

::: tip
本库默认支持commonjs和iife（script标签引入的方式）。  
如果需要支持umd或者amd的格式，可以自行构建。
::: 

## 安装
### NPM
命令行安装
```sh
npm install -D axios-sugar
```
文件引入
```js
import AxiosSugar from 'axios-sugar';
```

### Script
标签引入[axios-sugar.js]()或者[axios-sugar.bundle.js]()
```html
<script src="/path/to/axios-sugar.js"></script>
<!-- or -->
<script src="/path/to/axios-sugar.bundle.js"></script>
```

## 使用
```js
AxiosSugar.get('/path/to/sevice').then(res => {
  console.log(res.data);
}).catch(err => {
  console.log(err.reason.message); // all errors are put in reason property
});
```
