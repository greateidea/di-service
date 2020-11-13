import { Injectable } from '../../src/di/decorate/injector';
// import { Injectable } from 'di-service'; // npm pack test

@Injectable()
export default class Log3Service {
  constructor() {}

  log(...params: (string | number)[]) {
    console.log('[Log3Service]', ...params);
  }
}
