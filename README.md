
Dependency Injection
=========================

## Installation
```sh
npm @orange/di-sevice
```
### Using Inject Services To Your Components

Inject services into your components, the service could be a Class, Fuction, String, Number, Boolean.

Let's see how to use it:

```bash
# implement a class type service
export default class LogService {
  constructor() {}

  log(...params: (string | number)[]) {
    console.log('[Log2Service] ', ...params);
  }
}

# before using it, we should register the service
# the best time of register services is the start of your app

import { RegisterServiceByProvider } from '../../src/di/decorate/injector';
import LogService from '...';

RegisterServiceByProvider(() => LogService, 'Class');

# using the service in you component
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

Powered by Orange.
