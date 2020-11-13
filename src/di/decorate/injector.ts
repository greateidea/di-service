import { saveDependenciesIntances } from '../index';

type ctorType = { new (...args: any[]): {}; cotrName?: string };
type provider = () => any;
/**
 * @param key 服务名
 * @param supportsDelayedInstantiation 暂时不用
 */
export function Injectable(key?: string, supportsDelayedInstantiation?: boolean) {
  return (ctor: ctorType) => {
    const serviceKey = key || ctor.cotrName || ctor.name; // 默认以类名为键

    console.log(`[Injectable] ${serviceKey} `, ctor);

    saveDependenciesIntances({
      depenKey: serviceKey!,
      depenDes: {
        ctor,
        staticArguments: [],
        supportsDelayedInstantiation,
      },
    });
  };
}

export const RegisterServiceByProvider = (
  provider: provider,
  providerType: 'Class' | 'Function' | 'Const',
  serviceKey?: string,
  staticArguments?: any[],
  supportsDelayedInstantiation?: boolean,
) => {
  try {
    const result = provider();

    const defaultDepenKey = providerType !== 'Const' ?  result.name : undefined;
    const depenKey = serviceKey || defaultDepenKey;
  
    if(!depenKey) {
      throw new Error('need a serviceKey.');
    }

    if(!result) {
      throw new Error('Can not get Service from provider, check your provider\'s returns');
    }
  
    saveDependenciesIntances({
      depenKey, // 如果类型是'Class'或者'Function'，则可以默认为类型名或者函数名，否则必须传入depenKey
      depenDes: {
        ctor: providerType === 'Class' ? result : undefined,
        staticArguments: staticArguments || [],
        supportsDelayedInstantiation,
      },
      depenInstance: providerType !== 'Class' ? result : undefined,
    });
  } catch (e) {
    console.error(e);
  }
};

