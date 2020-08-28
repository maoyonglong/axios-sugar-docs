# 重复请求

与其它配置项不同，`repeat`不存在enable选项，这表示它总是开启的。
不需要任何的配置它就能够生效。

## 简单的例子

```js
import AxiosSugar from 'axios-sugar';

// 假设请求能够被正常响应
AxiosSugar.get('/path').catch((err) => {
  if (AxiosSugar.isCancel(err)) {
    console.log('请求被取消');
  }
});
AxiosSugar.get('/path').then(() => {
  console.log('请求被正常响应');
});
```

## 重复的判断依据
既然涉及到重复请求，那么怎么判断重复请求呢？  
axios-sugar通过一个字符串来标识一个请求。如果两个请求的标识相同，那么表示请求重复。   
这个标识的格式是：
```js
`method=${method}&url=${url}&data=${data}`
```
其中，method，url，data分别表示请求的方法，路径和数据。  
当然，这并不总是满足需求, 比如，由于上面的data是通过`JSON.stringify`得到的，比如文件对象可能不能使用。这需要自定义标识字符串。

```js
import AxiosSugar from 'axios-sugar';

// 这里的axiosConfig, sugarConfig分别表示axios的配置和axios-sugar的配置
const originRepeatTag = AxiosSugar.repeatTag;
AxiosSugar.repeatTag = function (axiosConfig, sugarConfig) {
  if (
    axiosConfig.method === 'post' &&
    axiosConfig.url === '/upload'
  ) {
    return `file: ${axiosConfig.filename}`;
  } else {
    return originRepeatTag.apply(this, arguments);
  }
};
```
::: warning
repeatTag参数里的axiosConfig只包含每次调用请求时的配置数据，并不包含其默认配置。
:::
## Callback
有时可能需要在遇到重复请求时输出类似“请不要频繁点击发送按钮！”的字样。
```js
import AxiosSugar from 'axios-sugar';

// 每当遇到重复请求被取消后的回调函数
AxiosSugar.on('repeated', function (config) {
  // this指向AxiosSugar实例，config是axios-sugar的配置信息
  console.log(this, config);
});
```
::: tip
同理，还有其它的回调事件，它们都通过on来监听。  
:::
::: warning
值得注意的是所有实例共有这些事件，所以不应该在实例中监听这些事件，直接使用AxiosSugar.on为佳。
:::

## 设置判断重复请求的时间间隔
默认间隔2000ms内，重复发送的请求会被取消。如果需要发送低于2000ms内的重复请求，比如一秒发送一次心跳，则需要使用
`repeat.interval`设置。
```js
import AxiosSugar from 'axios-sugar';

// 全局设置
AxiosSugar.defaults = {
  repeat: {
    interval: 1000 // 表示1s
  }
};

// 请求配置
AxiosSugar.head('/heartbeat', {}, {
  repeat: {
    interval: 1000
  }
});
```
