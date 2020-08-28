# Network Status
axios-sugar对错误的HTTP状态码的默认处理就是简单的打印信息和错误重传。  
除此之外，对408超时状态码添加了网络状态的判断和断网重传的功能。

## Bulit-in Function
默认情况下，网络检测是关闭的，需要配置一下。
```js
{
  offlineCheck: {
    enable: true
  }
}
```

### Monitoring of network status
```js
import AxiosSugar from 'axios-sugar';

// Triggered when the request is disconnected and reconnected
AxiosSugar.on('online', function (err, retry) {

});

// Connected to the network, but triggered by an unknown cause (not 404, because this is triggered in the 408 processing function)
AxiosSugar.on('onlineTimeout', function (err, retry) {

});

// Disconnection trigger
AxiosSugar.on('offline', function (err) {

});
```


### Automatic retransmission after disconnection
断网自动重传的配置如下：
```js
{
  onlineCheck: {
    enable: true,
    reconnect: {
      enable: true
    }
  },
  retry: {
    enable: true,
    auto: true
  }
}
```
以上所有的`enable`字段都是必须为true，`auto`字段也是自动重传必须的。

## Cancel automatic retransmission
Sometimes, it may be necessary to handle some specific errors, such as 4 `onlinetimeout`, and cancel the automatic retransmission function.
```js
AxiosSugar.on('onlineTimeout', function (err, retry) {
  AxiosSugar.cancelAutoRetry(err);

  console.log('Unknown error causing request timeout!');
});
```

## 自定义处理
The above functions are defined in the `ontimeout` method of the httpstatusprocessor prototype.

If the 408 status code needs to be processed, it can be realized by rewriting this method.
```js
AxiosSugar.httpStatusProcessor.onTimeout = function (
  status, err, result, retry
) {
  const originOnTimeout = AxiosSugar.httpStatusProcessor.prototype.onTimeout;
};
```
::: warning
If you override onTimeout, you can't use the functions described in this chapter any more.
:::
