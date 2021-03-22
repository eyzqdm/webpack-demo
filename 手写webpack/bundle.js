const fs = require('fs')
const path = require('path')
const parser = require('@babel/parser') // 转AST
const traverse = require('@babel/traverse').default // 遍历AST
/*
读取主文件内容
获取其依赖模块
转为ast
语法降级
 */
const getModuleInfo = (file) => {
    const deps = {}
    const body = fs.readFileSync(file,'utf-8')
    // 拿到ast
    const ast = parser.parse(body,{
        sourceType:'module' // 表示要解析的是es6模块
    })
    // console.log(ast.program.body)
    // 收集依赖的绝对路径
    traverse(ast,{
        ImportDeclaration({node}){
            const dirName = path.dirname(file)
            console.log(path.join(dirName,node.source.value))
            const absPath = "./" + path.join(dirName,node.source.value)
            deps[node.source.value] = absPath
        }
    })
    console.log(deps)
}

getModuleInfo('./src/index.js')