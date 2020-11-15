
Dependency Injection
=========================

## Installation
```sh
npm i @orange/di-service
```
### Using Inject Service To Your Component

Inject services into your components, the service could be a Class, Fuction, String, Number, Boolean.

Let's see how to use it:

```js
# implement a class type service
import { RegisterServiceByProvider } from '@orange/di-service';

export default class LogService {
  constructor() {}

  log(...params: (string | number)[]) {
    console.log('[Log2Service] ', ...params);
  }
}

RegisterServiceByProvider(() => LogService, 'Class');



# using the service in your component
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
RegisterServiceByProvider(() => (...params) => { console.log(...params); }, 'Function');
RegisterServiceByProvider(() => 'I'm a service', 'Const', 'ServiceName');
RegisterServiceByProvider(() => 211, 'Const', 'ServiceName');
RegisterServiceByProvider(() => true, 'Const', 'ServiceName');
```

when the service's type is 'Class' or 'Function', the default Service Name is the class/function's name.

If you are using typescript, we are also provide a decorator
```js
// service.js
// NOTE: the decorator only can be used to decorate the class in typescripte
import { Injectable } from '@orange/di-service';

@Injectable()
Class LogService {
  log(...params: any[]) {
    console.log(...params);
  }
}
```
but you should import/require the service module before using this service.
```js
// app.js
import 'service'; // make the decorate work first
```

## Inject Service
we provide `InjectToFunction` `InjectToClass` to inject the service to your component

Note the service object is always at the [last position] of constructor/function's arguments

```js
import { InjectToFunction } from '@orange/di-service';

const ComponentWithService = (props, services) => {
  return() <div onClick={() => { service.LogService.log('bravo! I got score 211!') }}>Click to Log<div>
}

export default InjectToFunction(['LogService', ...])(ComponentWithService);
```

If you are using typescript, we are also provide the decorator `Service`
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
we provide the decorate `Inject` funtion, which don't need to distinguish whether the service is a ‘function’ or 'class'
```js
export default Inject(['serviceName', ...])(ReactComponent);
```


## License

[MIT](LICENSE)
