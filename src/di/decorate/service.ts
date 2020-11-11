import { getDependenciesIntances } from '../index';
import { Dict } from '../index';

// 问题：react类里的构造器参数中的props和类里其他地方的this.props是不是一样的，如果不一样，那为什么不一样？？？
export function Service(servicesId?: string[]) {
  return <T extends { new (...args: any[]): {} }>(cotr: T) => {
    class ProxyClassWithSevicies extends cotr {
      public services: {};
      constructor(...params: any[]) {
        const services = getDependenciesIntances(servicesId || []);
        console.log('[Service Decorate] ', params);

        super(...params, services);
        this.services = services;

        console.log('[Service Decorate]:this ', this);
      }
    }

    (ProxyClassWithSevicies as Dict).cotrName = cotr.name;

    return <T>ProxyClassWithSevicies;
  };
}


export const Inject = (servicesId?: string[]) => (component: (...params: any[]) => React.ReactNode) => {
  const services = getDependenciesIntances(servicesId || []);
  (component as Dict).services = services;

  return (...params: any[]) => {
    return component(...params, services) as JSX.Element;
  }
}
