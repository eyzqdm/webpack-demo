# webpack-demo
前端构建工具就是把开发环境的代码转化成运行环境代码。一般来说，开发环境的代码是为了更好的阅读，而运行环境的代码则是为了能够更快地执行。因此开发环境和运行环境的代码形式也不相同。比如，开发环境的代码，要通过混淆压缩后才能放在线上运行，这样代码体积更小，而且对代码执行也不会有任何影响。
loader和plugin
Loader直译为加载器或装载器。Webpack将一切文件视为模块，但是webpack原生是只能解析js文件，如果想将其他文件也打包的话，就会用到loader。如处理css img less 的loader 所以Loader的作用是让webpack拥有了加载和解析非JavaScript文件的能力。

webpack本身就是一个**打包机器**，其不能对具体代码内容部分进行**处理**(或处理得非常有限)，不同的代码内容(less/scss/ES6(ES7)/image/css等等)需要webpack找到不同的**loader**(装载器)实现转码、编译、降级处理。

Plugin直译为"插件"。Plugin可以扩展webpack的功能，让webpack具有更多的灵活性。 在 Webpack 运行的生命周期中会广播出许多事件，Plugin 可以监听这些事件，在合适的时机通过 Webpack 提供的 API 改变输出结果。