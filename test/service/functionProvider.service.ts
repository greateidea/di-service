import { RegisterServiceByProvider } from '../../src/di/decorate/injector';
// import { RegisterServiceByProvider } from 'di-service'; // npm pack test

RegisterServiceByProvider(
    () => function FunctionService(...params: any[]) {
        console.log('[Function Service]', ...params)
    },
    'Function',
);