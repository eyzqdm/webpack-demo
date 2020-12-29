const ph = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    module:{
        rules:[
            {  // 配置处理css的loader
                test:/\.css$/, // 通过正则匹配css文件
                use:["style-loader","css-loader"]
            },
            {
                //配置处理图片的loader
                test:/\.(png|jpg|gif)$/i,
                use:{
                    loader:'url-loader',
                    options:{
                        // limit:设置大小阈值 小于该值 将图片生成字符串
                        // 大于该值 通过物理文件重新生成该值
                        limit:8192,
                        outputPath:"images"
                    }
                }
            },
            {
                // 配置处理less的loader
                // less样式文件处理需要3个loader,它们有严格的顺序如下，它们有做工作交接
                test:/\.less$/,
                use:["style-loader","css-loader","less-loader"]
            },
            {
                // 处理es6的babel-loader
                test:/\.js$/,
                exclude:/node_modules/,
                use:"babel-loader"
            }
        ]
    },
    mode: 'development',
    devServer:{ // 配置实时打包

        host:"127.0.0.1",// 主机域名地址 修改代码后不需要打包就可以在浏览器看到效果
        port:"11111", // 端口号
        open:true, //自动打开浏览器
        compress:true // 对网络请求进行压缩 

    },
    entry: ph.resolve('./src/app.js'), // 入口文件 绝对路径 
    output: {
        path: ph.resolve('./dist'), // 配置出口目录
        filename: "main.js" // 配置出口文件名称
    },
    plugins:[ // 编译模板 不需要再模板中手动引入js文件了
        new HtmlWebpackPlugin({
            template:ph.resolve('./index.html')
        })
    ]
}