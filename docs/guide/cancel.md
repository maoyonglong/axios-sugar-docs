# Cancel Requests
This chapter deals with the cancellation of page requests. axios-sugar cancels all outstanding requests on the page through a function called `cancelAll`.

## Cancel Page Requests
When you jump to a page, you often want to cancel all unfinished page requests, so you can use cancel all to cancel.
```js
import AxiosSugar from 'axios-sugar';

AxiosSugar.get('/r1');
AxiosSugar.get('/r2');

// Suppose neither R1 nor R2 requests have been completed
AxiosSugar.cancelAll();
```

## Make the request non cancellable
Although it is a common scenario to cancel all page requests during page Jump, sometimes some requests may not want to be cancelled (such as heartbeat sending).
```js
import AxiosSugar from 'axios-sugar';

AxiosSugar.get('/r1', {}, {
  cancelDisabled: true // Cancelall cannot cancel this request
})
```

## cancelFilter 
The `cancelDisabled` function mentioned above filters out non cancelable requests through a function called `cancelFilter`, and then cancels all the remaining requests.
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
The above code is the default `cancelfilter`, which is defined on `AxiosSugar` instead of its instance. It should return requests that can be cancelled, which will be cancelled after the `cancelAll` call.
::: tip
By rewriting` AxiosSugar.cancelFilter`, you can customize the filtering rules for cancellation requests.
:::