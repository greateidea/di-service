import { saveDependenciesIntances } from '../index';

type ctorType = { new (...args: any[]): {}; cotrName?: string };
type provider = () => any;
/**
 * @param key 
 * @param supportsDelayedInstantiation 
 * 申明和实现分离
 * 如何是服务申明执行
  1.像dva一样在应用启动的时候自己手动注册
  2.像VSCODE一样全部自己手动注册
  3.像umi一样读取生成临时文件自动执行注册（如何热更新？）
 */
export function Injectable(key?: string, supportsDelayedInstantiation?: boolean) {
  return (ctor: ctorType) => {
    const serviceKey = key || ctor.cotrName || ctor.name;

    console.log(`[Injectable] ${serviceKey} `, ctor);

    saveDependenciesIntances({
      depenKey: serviceKey!, // 直接以类名为键 也可以像angular一样提供proveder解析一下提供服务 来扩展服务的内容
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

