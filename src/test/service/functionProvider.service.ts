import { RegisterServiceByProvider } from '../../di/decorate/injector'

RegisterServiceByProvider(
    () => function FunctionService(...params: any[]) {
        console.log('[Function Service]', ...params)
    },
    'Function',
);