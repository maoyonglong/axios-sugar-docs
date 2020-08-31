# 并发
除此之外，axios-sugar也将axios的并发方法移到AxiosSugar上。

```js
import AxiosSugar from 'axios-sugar';

AxiosSugar.all([
  AxiosSugar.get('/r1'),
  AxiosSugar.get('/r2')
]).then(AxiosSugar.spread(function () {

}));
```
