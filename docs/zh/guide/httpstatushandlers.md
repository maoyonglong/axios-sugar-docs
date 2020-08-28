# HTTP响应状态码处理
这可以说是axios-sugar的核心部分之一，许多功能依赖它来实现。
::: tip
错误重传，网络状态处理都依赖于它实现。
:::

## 处理流程
![http_status_process.png](../../assets/http_status_process.png)  
其中onStatusHander表示每个status对应调用的处理函数。
| 状态码 | 函数名 |
| --- | --- |
| 400 | onBadRequest |
| 401 | onUnauthorized |
| 403 | onForbidden |
| 404 | onNotFound |
| 405 | onMethodNotAllow |
| 406 | onNotAcceptable |
| 407 | onProxyAuthenticationRequired |
| 408 | onTimeout |
| 409 | onConflict |
| 500 | onInternalServerError |
| 501 | onNotImplemented |
| 502 | onBadGateway |

重写这些方法可以实现对对应状态码的自定义处理。
```ts
import AxiosSugar from 'axios-sugar';

// 重写onBadRequest
AxiosSugar.httpStatusProcessor.on('badRequest', function (
  status: string,
  err: MiddleResponseError,
  result: any,
  retry?: retry
) {
  // ....
  return result;
});

```
onStatusBefore和conStatusAfter则包括`onXXXBefore`，`onXXXAfter`和它们本身。

`onXXXBefore`和`onXXXAfter`的第一个X可以是1到5的数字，比如`on5XXBefore`。它们用于处理特定数字开头的状态码。
而`onStatusBefore`和`onStatusAfter`是全局的处理，对所有的状态码都处理，除非该状态码对应的`onXXXBefore`，`onXXXAfter`有定义。  

> 也就是说，优先选择`onXXXBefore`和`onXXXAfter`处理错误响应，匹配不到对应函数，就统一使用`onStatusBefore`和`onStatusAfter`处理。

::: warning
我们可以注意到，每一步处理都返回了result，这个result会被依次传递给每一步执行的函数。  
所以上一步函数返回的result，直接决定下一步函数所接收result参数的值。
:::
## 自定义状态码处理
可以发现，默认定义的状态码处理不全，比如对200状态码的处理函数就没有定义。这时，就需要自定义相应的函数。
```js
AxiosSugar.httpStatusProcessor.setStatusHandler('200', function (
  status: string,
  err: MiddleResponseError,
  result: any,
  retry?: retry
) {
  // ....
  return result;
});
```