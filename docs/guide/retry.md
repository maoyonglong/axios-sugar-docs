# Error retransmission
Error retransmission is to resend a request that returns an HTTP response code that represents an error. For general errors (e.g. common Promise.reject）Not to be dealt with.

## Automatic retransmission
```js
import AxiosSugar from 'axios-sugar';

AxiosSugar.defaults = {
  retry: {
    enable: true,
    auto: true
  }
};
```
In this way, the wrong request is automatically resend.
::: warning
Because of this function depends on the `response.status`, we should avoid using Axios' transformresponse 'as far as possible, because this may lead to missing status and error. If it must be used, it must be guaranteed `response.status` the existence of the field.
:::
::: tip
You can use `interceptors` instead of `transformresponse`, so that the HTTP response code has been processed and is no longer needed `response.status`
```js
import AxiosSugar from 'axios-sugar';

AxiosSugar.interceptors.response.use(() => {

}, () => {
  // When changing the error, the value of response
})
```
Of course, it is better to use [HTTP response status code processor] (/guide/httpstatushandlers) to handle:  
```js
import AxiosSugar from 'axios-sugar';

// Set the processing of status code 200
AxiosSugar.httpStatusProcessor.setStatusHandler('200', function (
  status, payload, result, retry
) {
  // When no other processing function related to 200 status code is set, the value of result is equal to response
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
    delay: 1000 // Try again in 1 seconds
  }
}
```
During retransmission, related events will be triggered.
```js
import AxiosSugar from 'axios-sugar';

// After each retransmission
AxioSugar.on('retried', function (err) {
  console.log(`第${err.count}次重新发送！`);
});

// After failure
AxiosSugar.on('retryFailed', function (err) {
  console.log(`错误重传失败！`);
});
```

## 手动重传
Manual retransmission needs to be implemented with the help of [HTTP response status code processor] (/ guide/httpstatushandlers).
```js
import AxiosSugar from 'axios-sugar';

// status is http-reponse-code
// Payload is the response (successful result or error)
// result is response. If payload is an error，it will be undefined
AxiosSugar.httpStatusProcessor.on('statusAfter', function (
  status, payload, result, retry
) {
  // If the status is not 2XX, it will be retransmitted
  if (status > 300 || status < 200) {
    retry();
  }
});
```