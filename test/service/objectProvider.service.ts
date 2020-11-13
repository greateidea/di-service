import { RegisterServiceByProvider } from '../../src/di/decorate/injector';
// import { RegisterServiceByProvider } from 'di-service'; // npm pack test

RegisterServiceByProvider(() => ({ Score: 211 }), 'Const', 'ObjectService');