import { RegisterServiceByProvider } from '../../di/decorate/injector'

class ClassService {
    log(...params: any[]) {
        console.log('[ClassService]', ...params);
    }
}

RegisterServiceByProvider(() => ClassService, 'Class');
