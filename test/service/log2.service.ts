import { Injectable } from '../../src/di/decorate/injector';
// import { Injectable } from 'di-service'; // npm pack test

@Injectable()
export default class Log2Service {
  constructor() {}

  log(...params: (string | number)[]) {
    console.log('[Log2Service] ', ...params);
  }
}
