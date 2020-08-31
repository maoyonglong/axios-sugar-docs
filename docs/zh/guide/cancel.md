# 取消请求
本章内容涉及页面请求的取消。axios-sugar通过一个叫做`cancelAll`的函数取消页面上所有没有完成的请求。

## 取消页面请求
在跳转页面时，常常会希望取消所有没有完成的页面请求，就可以使用cancelAll取消。
```js
import AxiosSugar from 'axios-sugar';

AxiosSugar.get('/r1');
AxiosSugar.get('/r2');

// 假设r1和r2请求都没有完成
AxiosSugar.cancelAll();
```

## 让请求不可取消
虽然在页面跳转时取消所有页面请求是常用场景，但是有时候有些请求可能不希望被取消（比如心跳发送等）。
```js
import AxiosSugar from 'axios-sugar';

AxiosSugar.get('/r1', {}, {
  cancelDisabled: true // cancelAll不能取消该请求
})
```

## 请求取消过滤器
上面说的`cancelDisabled`功能是通过一个叫`cancelFilter`的函数过滤掉不可取消请求，然后将剩下的请求全部取消实现的。  
```ts
interface MiddleRequestConfig {
  axios: AxiosRequestConfig;
  sugar: AxiosSugarConfig;
  index: number;
  count?: number;
  sendingTime: number;
  cacheTime?: number;
  completeTime: number;
}

interface CancelConfig {
  cancel: Function;
  config: MiddleRequestConfig;
}

function cancelFilter (cancelConfigs: Array<CancelConfig>): Array<CancelConfig> {
  return cancelConfigs.filter((c) => !c.config.sugar.cancelDisabled);
}
```
上面的代码就是默认的`cancelFilter`，它定义在`AxiosSugar`而不是它的实例上。它应该返回可以被取消的请求，这些请求会在`cancelAll`调用后被取消。  
::: tip
通过覆写`AxiosSugar.cancelFilter`可以自定义取消请求的过滤规则。
:::