
Dependency Injection
=========================

## Installation
```sh
npm i @orange/di-service
```
### Using Inject Services To Your Component

Inject services into your components, the service could be a Class, Fuction, String, Number, Boolean.

Let's see how to use it:

```js
# implement a class type service
export default class LogService {
  constructor() {}

  log(...params: (string | number)[]) {
    console.log('[Log2Service] ', ...params);
  }
}



# before using it, we should register the service
# the best time of register services is the start of your app

import { RegisterServiceByProvider } from '@orange/di-service';
import LogService from '...';

RegisterServiceByProvider(() => LogService, 'Class');



# using the service in your component
import React from 'react';
import { Service } from '@orange/di-service';

@Service(['LogService'])
class LogComponent extendes React.Component {
    constructor(props, {}, private service) {
        super(props);
    }

    render() {
        <div onClick={() => { this.service.LogService.log('bravo! I got score 211!') }}>Click to Log<div>
    }
}
```
## Register Service
using `RegisterServiceByProvider` to register a service

```js
RegisterServiceByProvider(() => ClassService, 'Class');
RegisterServiceByProvider(() => FunctionService, 'Function');
RegisterServiceByProvider(() => 'I'm a service', 'Const', 'ServiceName');
RegisterServiceByProvider(() => 211, 'Const', 'ServiceName');
RegisterServiceByProvider(() => true, 'Const', 'ServiceName');
```

when the service's type is 'Class' or 'Function', the default ServiceName is the class/function's name.

If you are using typescript, we also provide the decorate
```js
// service.js
import { Injectable } from '@orange/di-service';

@Injectable()
Class LogService {
  log(...params: any[]) {
    console.log(...params);
  }
}
```
but you should import the service module before using this service.
```js
// app.js
import 'service'; // make the decorate work first
```

## Inject Service
we provide `InjectToFunction` `InjectToClass` to inject services to your component

Note the service object is always at the [last position] of constructor/function arguments

```js
import { InjectToFunction } from '@orange/di-service';

const ComponentWithService = (props, services) => {
  return() <div onClick={() => { service.LogService.log('bravo! I got score 211!') }}>Click to Log<div>
}

export default InjectToFunction(['LogService', ...])(ComponentWithService);
```

If you are using typescript, we also provide the decorate `Service`
```js
import React from 'react';
import { Service } from '@orange/di-service';

@Service(['LogService'])
class ComponentWithService  extends React.Component {
    constructor(props, {}, private service) {
        super(props);
    }

    render() {
        <div onClick={() => { this.service.LogService.log('bravo! I got score 211!') }}>Click to Log<div>
    }
}

```

## Inject Service In React Component
we provide the decorate `Inject` funtion, which don't need to distinguish whether the service type is ‘function’ or 'class'
```js
export default Inject(['serviceName', ...])(ReactComponent);
```


## License

[MIT](LICENSE)
