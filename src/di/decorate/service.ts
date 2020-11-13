import { getDependenciesIntances } from '../index';
import { Dict } from '../index';

const { isValidElementType } = require('react-is');
const  isReactClassComponent = (c: Function) => !!c.prototype.isReactComponent;

const stringifyComponent = (Comp: any) => {
  try {
    return JSON.stringify(Comp)
  } catch (err) {
    return String(Comp)
  }
}

const generateWrappedClass = (servicesId?: string[]) => (
  <T extends { new (...args: any[]): {} }>(cotr: T) => {
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
  }
)

export function Service(servicesId?: string[]) {
  return generateWrappedClass(servicesId);
}


export const InjectToFunction = (servicesId?: string[]) => (component: (...params: any[]) => React.ReactNode) => {
  const services = getDependenciesIntances(servicesId || []);
  (component as Dict).services = services;

  return (...params: any[]) => {
    return component(...params, services) as JSX.Element;
  }
}

export const InjectToClass = (servicesId?: string[]) => generateWrappedClass(servicesId);

// for react
export const Inject = (servicesId?: string[]) => (component: any) => {
  
  const throwError = () => {
    throw new Error('You must pass a component to the function' +
    `${component.name ?  'returned by component.name' : ''}. Instead received ${stringifyComponent(
      component
    )}`)
  };
  

  if(!isValidElementType(component)) {
    throwError();
  }

  if(isReactClassComponent(component)) {
    return InjectToClass(servicesId)(component);
  } else if (typeof component === 'function') {
    return InjectToFunction(servicesId)(component);
  } else {
    throwError();
  }
}
