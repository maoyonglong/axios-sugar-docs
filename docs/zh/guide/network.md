# 网络状态
axios-sugar对错误的HTTP状态码的默认处理就是简单的打印信息和错误重传。  
除此之外，对408超时状态码添加了网络状态的判断和断网重传的功能。

## 内置功能
默认情况下，网络检测是关闭的，需要配置一下。
```js
{
  offlineCheck: {
    enable: true
  }
}
```

### 网络状态的监听
```js
import AxiosSugar from 'axios-sugar';

// 请求断网后重新联网时触发
AxiosSugar.on('online', function (err, retry) {

});

// 联网，但是被不知名原因（非404，因为这在408处理函数中触发）导致超时时触发
AxiosSugar.on('onlineTimeout', function (err, retry) {

});

// 断网触发
AxiosSugar.on('offline', function (err) {

});
```


### 断网自动重传
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

## 取消自动重传
有时，可能需要对个别特定的错误，比如4`onlineTimeout`进行更加细致的处理，需要取消自动重传的功能。
```js
AxiosSugar.on('onlineTimeout', function (err, retry) {
  // 如果retry.auto设置为true，那么408相关错误都会自动重传
  // 如果希望onlineTimeout错误不自动重传，其它错误照旧自动重传，
  // 可以调用以下函数
  AxiosSugar.cancelAutoRetry(err);

  console.log('未知错误导致请求超时！');
});
```

## 自定义处理
以上功能都定义在httpStatusProcessor原型的`onTimeout`方法中。  
如果需要对408状态码的处理，可以通过覆写该方法实现。
```js
AxiosSugar.httpStatusProcessor.onTimeout = function (
  status, err, result, retry
) {
  // 不能使用this.prototype.onTimeout来获取原来在原型上的onTimeout
  // 因为所有处理函数的this被重置指向了AxiosSugar实例。
  const originOnTimeout = AxiosSugar.httpStatusProcessor.prototype.onTimeout;
};
```
::: warning
覆写了onTimeout不使用原来的onTimeout方法，会导致本章介绍的功能不可用。
:::
