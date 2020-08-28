# Configuration
All built-in features can be implemented with simple configuration.

It should be noted that the configuration includes native configuration of Axios and configuration of axios-sugar.

## Gobal Configuration
```js
import AxiosSugar from 'axios-sugar';

// configuration of axios-sugar
AxiosSugar.defaults = {};
// configuration of axios
AxiosSugar.axiosDefaults = {};
```
The configuration item of Axios is its original configuration item. For the configuration item of Axios sugar, please refer to[AxiosSugarConfig](#AxiosSugarConfig)。

## Configration of Instance
```js
import AxiosSugar from 'axios-sugar';

const instance = AxiosSugar.create({
  // configuration of axios
}, {
  // configuration of axios-sugar
});
```
## Request Configuration
```js
import AxiosSugar from 'axios-sugar';

AxiosSugar.request({
  // Axios request configuration
}, {
  // axios-sugar configuration
})
```
Similarly: other request methods also add parameters for configuring Axios sugar on the basis of Axios.

## AxiosSugarConfig
The values shown below are all default values
```js
repeat: {
  interval: 2000 // Repeated requests within this interval will be cancelled
},
onlineCheck: {
  enable: false, // Whether to enable the networking detection or not, and the reconnect will take effect only after it is enabled
  reconnect: {
    enable: true // Whether to turn on the function of network disconnection and retransmission
  }
},
save: {
  enable: false, // Whether to turn on the response storage function
  storage:  <AxiosSugarInnerStorage instance>. // The default is memory storage
},
retry: {
  enable: false, // Is error retransmission enabled
  auto: true, // Whether to automatically retransmit. If it is changed to false, it needs to be implemented by the relevant callback function
  count: 3, // Number of retransmissions supported
  delay: 2000 // Waiting time for retransmission
}
```
It doesn't matter if we don't know what they mean for the time being. We will introduce them in the following chapters.