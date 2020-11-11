import { Injectable } from '../../di/decorate/injector';
import { Service } from '../../di/decorate/service';
import { Ilog2 } from './serviceInterface/log2';

console.log('[Service Log] Load');

@Injectable()
@Service(['Log2Service'])
export default class LogService {
  constructor(private services: { Log2Service: Ilog2 }) {}

  log(...params: (string | number)[]) {
    this.services.Log2Service.log(...params);
    console.log('[LogService] ', ...params);
  }
}
