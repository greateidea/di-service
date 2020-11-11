import { Injectable } from '../../di/decorate/injector';

@Injectable()
export default class Log3Service {
  constructor() {}

  log(...params: (string | number)[]) {
    console.log('[Log3Service]', ...params);
  }
}
