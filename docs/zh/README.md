---
home: true
# heroImage: /hero.png
heroText: Axios-Sugar
tagline: Axios的二次封装库
actionText: 快速上手 →
actionLink: /zh/guide/
features:
- title: 类Axios用法
  details: 尽量保证和axios.js的用法保持一致，简单易用。
- title: 开箱即用
  details: 所有特性只要简单的配置即可使用。
- title: 定制化
  details: 通过回调函数实现一定程度上的逻辑自由。
footer: MIT Licensed | Copyright © 2020 maoyonglong
---
### 用法和axios相似
```js
import AxiosSugar from 'axios-sugar';

AxiosSugar.get('/path/to/sevice', {
  params: {
    /**/
  }
}, {
  retry: {
    enable: true
  }
}).then(res => {
  console.log(res.data);
}).catch(err => {
  console.log(err.reason.message); // 所有错误被放到了reason
});
```

::: tip
它和axios.js的相似点大致是：  
1. AxiosSugar和axios
2. AxiosSugar.create和axios.create
3. AxiosSugar.defaults和axios.defaults
4. AxiosSugar.isCancel和axios.isCancel
5. request, get, post, delete一系列发送请求的方法
6. 拦截器AxiosSugar.interceptors

::: warning
它们并非完全等价的，仅仅只是用法相似。
:::

### 支持的特性
* 取消重复请求
* 重试
* 响应存储器
* 断网重传
* Http状态代码响应的处理程序
* 取消筛选器匹配的所有请求

::: tip
更多详情请看[指南](/zh/guide/)
:::