---
home: true
# heroImage: /hero.png
heroText: Axios-Sugar
tagline: A wrapper for axios
actionText: quick start →
actionLink: /guide/
features:
- title: Axios-Like
  details: Its usage is similar to Axios that easy to use.
- title: Out of the box
  details: All features can be used after simple configuration。
- title: Custom
  details: Through callback to ensure a certain degree of customization function.
footer: MIT Licensed | Copyright © 2020 maoyonglong
---
### Axios-Like Usage
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
  console.log(err.reason.message); // all errors are put in reason property
});
```

::: tip
Similar points:  
1. AxiosSugar and axios
2. AxiosSugar.create and axios.create
3. AxiosSugar.defaults and axios.defaults
4. AxiosSugar.isCancel and axios.isCancel
5. A series of methods to send a request, such as request, get, post, delete
6. AxiosSugar.interceptors

::: warning
They are not completely equivalent, just similar in usage.
:::

### Features

* Axios-Like Methods 
* Cancel Repeated Requests
* Retry
* Response Storage
* Broken Network Retransmission
* Handlers for Http-Status-Code Responses
* Cancel All Requests Matched By Filter

::: tip
More informations about features in [config](/guide/config)
:::
