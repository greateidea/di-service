import { Injectable } from '../../src/di/decorate/injector';
import { Service } from '../../src/di/decorate/service';
import { Ilog2 } from './serviceInterface/log2';

// import { Injectable, Service } from 'di-service'; // npm pack test

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
