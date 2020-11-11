import { Injectable } from '../../di/decorate/injector';

@Injectable()
export default class Log2Service {
  constructor() {}

  log(...params: (string | number)[]) {
    console.log('[Log2Service] ', ...params);
  }
}
