# Response storage
axios-sugar provides two storage methods, one is memory storage (default), the other is local storage storage.

## Usage
```js
import AxiosSugar, { storage } from 'axios-sugar';

AxiosSugar.defaults = {
  save: {
    enable: true,
    storage: new storage.inner()
    // or
    // storage: new storage.local()
  }
}
```
## Callback
When storing, the memory will trigger the `stored` event.
```js
import AxiosSugar from 'axios-sugar';

AxiosSugar.on('stored', function (config) {
  console.log(config.response);
});
```

## Custom Storage
Memory is actually a javascript object that exposes the `set` and `get` methods.
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
Therefore, any object that implements the above interface can be used as memory, and it will be called when necessary.  
A simple example:
```js
const customStorage = {
  data: {},
  // The tag here is the string identifier mentioned in the previous chapter repeat requests
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
Even if the `storagedata` type contains a `time` field, only `response` is returned from the storage;
The `time` field is only used to record the time of data storage, which facilitates the implementation of some logic.
:::