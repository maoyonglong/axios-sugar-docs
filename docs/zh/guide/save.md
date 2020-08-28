# 响应存储
axios-sugar提供两种存储的方式，一种是内存存储（默认），另一种是LocalStorage存储。

## 用法
```js
import AxiosSugar, { storage } from 'axios-sugar';

AxiosSugar.defaults = {
  save: {
    enable: true,
    storage: new storage.inner()
    // 或者
    // storage: new storage.local()
  }
}
```
## Callback
在存储时，存储器会触发`stored`事件。
```js
import AxiosSugar from 'axios-sugar';

AxiosSugar.on('stored', function (config) {
  console.log(config.response);
});
```

## 自定义存储
存储器实际上是一个对外暴露`set`和`get`方法的对象。
```ts
export interface StorageData {
  response: AxiosResponse;
  time: number; // 存储时间 timestamp
  [key: string]: any;
}

interface AxiosSugarStorage {
  set (tag: string, data: StorageData): Boolean;
  get (tag: string): StorageData | null;
}
```
所以，实现了上面接口的对象都可以作为存储器，它会在需要时被调用。  
一个简单的例子：
```js
const customStorage = {
  data: {},
  // 这里的tag就是之前重复请求一章中提到的字符串标识
  set (tag, data) {
    this.data[tag] = {
      response: 
      time: data.time,
      type: 'custom-storage'
    };
    return true;
  },
  get (tag) {
    if (this.data[tag]) {
      console.log(this.data[tag].type) // 'custom-storage'
      return this.data[tag];
    } else {
      return null;
    }
  }
};
```
::: warning
即使`StorageData`类型含有`time`字段，但是结果取自存储器的返回结果仍然只有`response`；
`time`字段仅仅用于记录数据存储的时间，方便一些逻辑的实现。
:::