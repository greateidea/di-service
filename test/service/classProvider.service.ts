import { RegisterServiceByProvider } from '../../src/di/decorate/injector'
// import { RegisterServiceByProvider } from 'di-service'; // npm pack test

class ClassService {
    log(...params: any[]) {
        console.log('[ClassService]', ...params);
    }
}

RegisterServiceByProvider(() => ClassService, 'Class');
