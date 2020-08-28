# Repeated request

Unlike other configuration items, there is no enable option for `repeat`, which means it is always on.

It can take effect without any configuration.

## A simple example

```js
import AxiosSugar from 'axios-sugar';

// Suppose the request can be responded to normally
AxiosSugar.get('/path').catch((err) => {
  if (AxiosSugar.isCancel(err)) {
    console.log('The request was cancelled.');
  }
});
AxiosSugar.get('/path').then(() => {
  console.log('The request was successful.');
});
```

## The judgment basis of repetition
Since duplicate requests are involved, how to judge duplicate requests?
axios-sugar identifies a request with a string. If two requests have the same identity, the request is repeated.  
The format of this string is:
```js
`method=${method}&url=${url}&data=${data}`
```
Among them, method, URL and data represent the requested method, path and data respectively.  
Of course, this does not always satisfy the requirements, for example, because the data above is passed through the `JSON.stringify` what you get, such as file objects, may not work. This requires a custom identity string.

```js
import AxiosSugar from 'axios-sugar';

// Here, axiosConfig and sugarConfig indicate the configuration of Axios and axios-sugar respectively
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
The axiosConfig in the repeattag parameter only contains the configuration data at each call request, not its default configuration.
:::
## Callback
Sometimes you may need to output something like "please don't click the send button frequently" when encountering repeated requests.
```js
import AxiosSugar from 'axios-sugar';

// The callback function when repeated requests are cancelled
AxiosSugar.on('repeated', function (config) {
  // This points to the axiossugar instance, and config is the configuration information of axios-sugar
  console.log(this, config);
});
```
::: tip
Similarly, there are other callback events that are monitored through on.
:::
::: warning
It is worth noting that these events are common to all instances, so you should not listen to these events in the instance, and use `the AxiosSugar.on` Better.
:::

## Set the time interval for judging repeated requests
Within the default interval of 2000ms, repeated requests will be cancelled. If you need to send repeated requests less than 2000 ms, such as sending a heartbeat once a second, you need to use the
`repeat.interval` Settings
```js
import AxiosSugar from 'axios-sugar';

// global configuration
AxiosSugar.defaults = {
  repeat: {
    interval: 1000 // 表示1s
  }
};

// request configuration
AxiosSugar.head('/heartbeat', {}, {
  repeat: {
    interval: 1000
  }
});
```
