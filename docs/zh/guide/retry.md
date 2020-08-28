# 错误重传
错误重传是对返回表示错误的HTTP响应码的请求进行重新发送。对于一般错误（比如普通的Promise.reject）不予处理。

## 自动重传
```js
import AxiosSugar from 'axios-sugar';

AxiosSugar.defaults = {
  retry: {
    enable: true,
    auto: true
  }
};
```
这样，错误的请求就会自动重新发送了。
::: warning
由于该功能依赖axios返回的错误中的`response.status`，所以应尽量避免使用axios的`transformResponse`, 因为这可能导致status的缺失而出错。如果一定要使用，一定要保证`response.status`字段的存在。
:::
::: tip
可以使用`interceptors`取代`transformResponse`，这样HTTP响应码已经处理过了，不再需要`response.status`
```js
import AxiosSugar from 'axios-sugar';

AxiosSugar.interceptors.response.use(() => {

}, () => {
  // 改变错误时，response的值
})
```
当然，更好地做法是统一使用[HTTP响应状态码处理器](/zh/guide/httpstatushandlers)处理：  
```js
import AxiosSugar from 'axios-sugar';

// 设置对状态码200的处理
AxiosSugar.httpStatusProcessor.setStatusHandler('200', function (
  status, payload, result, retry
) {
  // 没设置其它和200状态码相关的处理函数时，result的值等于response
  return result.data;
});
```
:::

## 重传次数
默认只会尝试重传3次，可以通过count字段来设置。
```js
{
  retry: {
    enable: true,
    count: 3,
    delay: 1000 // 1秒后再次尝试
  }
}
```
重传的过程中，相关事件会被触发。
```js
import AxiosSugar from 'axios-sugar';

// 每次重传后
AxioSugar.on('retried', function (err) {
  console.log(`第${err.count}次重新发送！`);
});

// 完成失败后
AxiosSugar.on('retryFailed', function (err) {
  console.log(`错误重传失败！`);
});
```

## 手动重传
手动重传需要借助[HTTP响应状态码处理器](/zh/guide/httpstatushandlers)来实现
```js
import AxiosSugar from 'axios-sugar';

// status是状态码
// payload是响应（成功结果或者错误）
// result是response，如果payload是错误，则为undefined
AxiosSugar.httpStatusProcessor.on('statusAfter', function (
  status, payload, result, retry
) {
  // 如果status不是2XX，就重传
  if (status > 300 || status < 200) {
    retry();
  }
});
```