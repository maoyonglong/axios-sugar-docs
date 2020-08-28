# 配置
所有内置的功能都可以使用简单的配置进行实现。  
需要关注的是配置包括对axios的原生配置和对axios-sugar进行配置。

## 全局配置
```js
import AxiosSugar from 'axios-sugar';

// 对axios-sugar的配置
AxiosSugar.defaults = {};
// 对原生axios的配置
AxiosSugar.axiosDefaults = {};
```
axios的配置项就是它原来的配置项，而axios-sugar的配置项请看[AxiosSugarConfig](#AxiosSugarConfig)。

## 实例配置
```js
import AxiosSugar from 'axios-sugar';

const instance = AxiosSugar.create({
  // axios的配置
}, {
  // axios-sugar的配置
});
```
## 请求配置
```js
import AxiosSugar from 'axios-sugar';

AxiosSugar.request({
  // axios的请求配置
}, {
  // axios-sugar的配置
})
```
同理：其它请求方法也是在axios的基础上添加了用于配置axios-sugar的参数。

## AxiosSugarConfig
下面所显示的值都是默认值
```js
repeat: {
  interval: 2000 // 该时间间隔内的重复请求都将被取消
},
onlineCheck: {
  enable: false, // 是否开启联网检测，开启后reconnect才能生效
  reconnect: {
    enable: true // 是否开启断网重传功能
  }
},
save: {
  enable: false, // 是否开启响应存储功能
  storage:  <AxiosSugarInnerStorage instance>. // 默认为内存存储
},
retry: {
  enable: false, // 是否开启错误重传功能
  auto: true, // 是否自动重传，如果改为false，则需要通过相关回调函数自行实现
  count: 3, // 支持的重传次数
  delay: 2000 // 重传的等待时间
}
```
暂时不知道它们所代表的意思也不要紧，下面的章节会一一介绍。