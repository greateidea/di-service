function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it;

  if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;

      var F = function () {};

      return {
        s: F,
        n: function () {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function (e) {
          throw e;
        },
        f: F
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var normalCompletion = true,
      didErr = false,
      err;
  return {
    s: function () {
      it = o[Symbol.iterator]();
    },
    n: function () {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function (e) {
      didErr = true;
      err = e;
    },
    f: function () {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}

/**
 * 服务应该包含 类，函数，常量
 */
var dependenciesIntances = [];
var Services = {};
var saveDependenciesIntances = function saveDependenciesIntances(depenInstace) {
  try {
    // 服务已经存在抛出错误
    if (dependenciesIntances.some(function (depen) {
      return depen.depenKey === depenInstace.depenKey;
    })) {
      throw new Error(" service '".concat(depenInstace.depenKey, "' is already exists."));
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

var getDependenciesIntances = function getDependenciesIntances(depenKeys) {
  var depens = depenKeys.reduce(function (result, currentKey) {
    var _iterator = _createForOfIteratorHelper(dependenciesIntances),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var depen = _step.value;

        if (depen.depenKey === currentKey) {
          if (!depen.depenInstance) {
            var DepenConstrutor = depen.depenDes.ctor;
            depen.depenInstance = new DepenConstrutor();
          }

          result[currentKey] = depen.depenInstance;
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    return result;
  }, {});
  console.log('[get dependenciesIntances] ', depens);
  return depens;
};

var _require = require('react-is'),
    isValidElementType = _require.isValidElementType;

var isReactClassComponent = function isReactClassComponent(c) {
  return !!c.prototype.isReactComponent;
};

var stringifyComponent = function stringifyComponent(Comp) {
  try {
    return JSON.stringify(Comp);
  } catch (err) {
    return String(Comp);
  }
};

var generateWrappedClass = function generateWrappedClass(servicesId) {
  return function (cotr) {
    var ProxyClassWithSevicies = /*#__PURE__*/function (_cotr) {
      _inherits(ProxyClassWithSevicies, _cotr);

      var _super = _createSuper(ProxyClassWithSevicies);

      function ProxyClassWithSevicies() {
        var _this;

        _classCallCheck(this, ProxyClassWithSevicies);

        var services = getDependenciesIntances(servicesId || []);

        for (var _len = arguments.length, params = new Array(_len), _key = 0; _key < _len; _key++) {
          params[_key] = arguments[_key];
        }

        console.log('[Service Decorate] ', params);
        _this = _super.call.apply(_super, [this].concat(params, [services]));
        _this.services = services;
        console.log('[Service Decorate]:this ', _assertThisInitialized(_this));
        return _this;
      }

      return ProxyClassWithSevicies;
    }(cotr);

    ProxyClassWithSevicies.cotrName = cotr.name;
    return ProxyClassWithSevicies;
  };
};

function Service(servicesId) {
  return generateWrappedClass(servicesId);
}
var InjectToFunction = function InjectToFunction(servicesId) {
  return function (component) {
    var services = getDependenciesIntances(servicesId || []);
    component.services = services;
    return function () {
      for (var _len2 = arguments.length, params = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        params[_key2] = arguments[_key2];
      }

      return component.apply(void 0, params.concat([services]));
    };
  };
};
var InjectToClass = function InjectToClass(servicesId) {
  return generateWrappedClass(servicesId);
}; // for react

var Inject = function Inject(servicesId) {
  return function (component) {
    var throwError = function throwError() {
      throw new Error('You must pass a component to the function' + "".concat(component.name ? 'returned by component.name' : '', ". Instead received ").concat(stringifyComponent(component)));
    };

    if (!isValidElementType(component)) {
      throwError();
    }

    if (isReactClassComponent(component)) {
      return InjectToClass(servicesId)(component);
    } else if (typeof component === 'function') {
      return InjectToFunction(servicesId)(component);
    } else {
      throwError();
    }
  };
};

/**
 * @param key 服务名
 * @param supportsDelayedInstantiation 暂时不用
 */

function Injectable(key, supportsDelayedInstantiation) {
  return function (ctor) {
    var serviceKey = key || ctor.cotrName || ctor.name; // 默认以类名为键

    console.log("[Injectable] ".concat(serviceKey, " "), ctor);
    saveDependenciesIntances({
      depenKey: serviceKey,
      depenDes: {
        ctor: ctor,
        staticArguments: [],
        supportsDelayedInstantiation: supportsDelayedInstantiation
      }
    });
  };
}
var RegisterServiceByProvider = function RegisterServiceByProvider(provider, providerType, serviceKey, staticArguments, supportsDelayedInstantiation) {
  try {
    var result = provider();
    var defaultDepenKey = providerType !== 'Const' ? result.name : undefined;
    var depenKey = serviceKey || defaultDepenKey;

    if (!depenKey) {
      throw new Error('need a serviceKey.');
    }

    if (!result) {
      throw new Error('Can not get Service from provider, check your provider\'s returns');
    }

    saveDependenciesIntances({
      depenKey: depenKey,
      depenDes: {
        ctor: providerType === 'Class' ? result : undefined,
        staticArguments: staticArguments || [],
        supportsDelayedInstantiation: supportsDelayedInstantiation
      },
      depenInstance: providerType !== 'Class' ? result : undefined
    });
  } catch (e) {
    console.error(e);
  }
};

export { Inject, InjectToClass, InjectToFunction, Injectable, RegisterServiceByProvider, Service };
