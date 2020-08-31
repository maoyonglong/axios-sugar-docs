# Concurrency
In addition, it also moves the concurrent methods of Axios to AxiosSugar.

```js
import AxiosSugar from 'axios-sugar';

AxiosSugar.all([
  AxiosSugar.get('/r1'),
  AxiosSugar.get('/r2')
]).then(AxiosSugar.spread(function () {

}));
```
