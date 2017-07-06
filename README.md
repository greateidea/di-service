# webpack-plugin-code-document
the document of webpack plugin code, learn how to write webpack plugin (CN).

webpack 描述如何写插件的文档并不完善，并且部分地方解释的并不清晰，同时需要阅读较多的源代码，
导致写一个webpack插件的门槛相当的高，这也是webpack的插件如此至少的重要原因
写这个README的是原因就是记录关于插件源代码的记录和理解，每一段时间记录一点。
根据官方介绍，先从 tapable 这个类开始，官方建议阅读源代码中，compiler 和 compilation 类扩展自它。
这里也只分部介绍，起一个引导的作用。

Tapable 有四组成员函数:

plugin(name:string, handler:function) 
- 注册一个事件，名字由 name 参数指定，回调函数由 handler 指定，如果名字是系统没有的，则这个事件是自定义的，反之是系统定义好的事件。
 当这个指定的事件触发则调用回掉函数，事件的触发可以由下面的 applyPlugins* 来直接触发。
 
apply(…pluginInstances: (AnyPlugin|function)[])
- AnyPlugin 是 AbstractPlugin 的子类，或者是一个有 apply 方法的类（或者，少数情况下是一个对象），或者只是一个有注册代码的函数。(官方原话)
这个函数的作用是直接向 tapable 实例中注册你写的插件类，这些插件类都有一个 apply 方法，也就是说这个你写的插件类就是官方说的需要在原型上写个 apply 方法的类。
猜测这些插件类会挨个被 apply(…pluginInstances: (AnyPlugin|function)[]) 这个东西调用一遍，加入实例中。

applyPlugins*(name:string, …)：
- 这个就是发射一个事件，事件名称由参数 name 指定，这个事件也即是系统已有的事件或者上面 plugin(name:string, handler:function) 参数指定的事件，
如果是你自定义的事件则触发对应的 handler。
- applyPlugins* 代表几种不同类型的方法：
applyPluginsWaterfall， 
applyPluginsAsync，
applyPluginsBailResult，
applyPluginsAsyncWaterfall，
applyPluginsAsyncSeries，
applyPluginsParallel，
applyPluginsParallelBailResult

(官方原话)不同的 applyPlugins* 方法对应以下使用情况:
串行执行插件
并行执行插件
插件一个接一个的执行,并且每个插件接收上一个插件的返回值(瀑布)
异步执行插件
保护模式终止插件执行: 一旦某个插件返回 non-undefined，会退出运行流程并返回 这个插件的返回值。这看起来像 EventEmitter 的 once()，但他们是完全不同的。

