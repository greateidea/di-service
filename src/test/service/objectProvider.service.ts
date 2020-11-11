import { RegisterServiceByProvider } from '../../di/decorate/injector'

RegisterServiceByProvider(() => ({ Score: 211 }), 'Const', 'ObjectService');