/**
 * 服务应该包含 类，函数，常量
 */

type depsDes = {
  ctor: { new (...args: any[]): {} }; // 类构造器
  staticArguments: any[];
  supportsDelayedInstantiation?: boolean;
};
type provider = () => any;
type dependenciesIntancy = { depenKey: string; depenDes: depsDes; depenInstance?: any};

export type Dict = { [key: string]: any }

const dependenciesIntances: dependenciesIntancy[] = [];
export  const Services: Dict = {};

export const saveDependenciesIntances = (depenInstace: dependenciesIntancy) => {
  try {
    // 服务已经存在抛出错误
    if (
      dependenciesIntances.some(
        (depen: dependenciesIntancy) => depen.depenKey === depenInstace.depenKey,
      )
    ) {
      throw new Error(` service '${depenInstace.depenKey}' is already exists.`);
    }
    dependenciesIntances.push(depenInstace);
    Services[depenInstace.depenKey] = depenInstace.depenKey; // 保存当前所有的服务名称

    console.log('[save dependenciesIntances] ', dependenciesIntances, Services);

  } catch (e) {
    console.warn(e);
  }
};



/**
 * ['service1', 'service2', 'service3',...]
=> {
     service1: service1Instance,
     service2: service2Instance,
     service3: service3Instance,
      ...
    }
*/

export const getDependenciesIntances: (depenKeys: string[]) => Dict = depenKeys => {
  const depens = depenKeys.reduce((result, currentKey) => {
    for (const depen of dependenciesIntances) {
      if (depen.depenKey === currentKey) {
        if (!depen.depenInstance) {
          const DepenConstrutor = depen.depenDes.ctor;
          depen.depenInstance = new DepenConstrutor();
        }

        result[currentKey] = depen.depenInstance;
      }
    }

    return result;
  }, {} as Dict);
  console.log('[get dependenciesIntances] ', depens);
  return depens;
};
