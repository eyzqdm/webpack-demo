const fs = require("fs");
const path = require("path");
const parser = require("@babel/parser"); // 转AST
const traverse = require("@babel/traverse").default; // 遍历AST
const babel = require("@babel/core");
/*
读取主文件内容
获取其依赖模块
转为ast
语法降级
 */
const getModuleInfo = (file) => {
  const deps = {};
  const body = fs.readFileSync(file, "utf-8");
  // 拿到ast
  const ast = parser.parse(body, {
    sourceType: "module", // 表示要解析的是es6模块
  });
  // console.log(ast.program.body)
  // 收集依赖的绝对路径
  traverse(ast, {
    ImportDeclaration({ node }) {
      const dirName = path.dirname(file);
      const absPath = "./" + path.join(dirName, node.source.value);
      deps[node.source.value] = absPath.replace("\\", "\/");
    },
  });
  //console.log(deps)
  const { code } = babel.transformFromAst(ast, null, {
    presets: ["@babel/preset-env"],
  });
  const moduleMsg = {
    file,
    deps,
    code,
  };
  return moduleMsg;
};
const parseModules = (file) => {
  // 获取入口文件信息
  const entry = getModuleInfo(file);
  const temp = [entry];
  const depsGraph = {};
  for (let i = 0; i < temp.length; i++) {
    const deps = temp[i].deps;
    if (deps) {
      // 遍历模块依赖 获取模块信息
      for (const key in deps) {
        // 检测是不是自身属性 而不是原型链上的
        if (deps.hasOwnProperty(key)) {
          temp.push(getModuleInfo(deps[key]));
        }
      }
    }
  }

  temp.forEach((info) => {
    depsGraph[info.file] = {
      deps: info.deps,
      code: info.code,
    };
  });
  console.log(depsGraph);
  return depsGraph;
};


// bfs遍历依赖树
const parseModule = (file) => {
  let q = [];
  let depsGraph = {};
  q.push(file);
  while (q.length) {
    const info = getModuleInfo(q.shift());
    depsGraph[info.file] = {
      deps: info.deps,
      code: info.code,
    };
    let deps = info.deps
    if (deps) {
      // 遍历模块依赖 获取模块信息
      for (const key in deps) {
        // 检测是不是自身属性 而不是原型链上的
        if (deps.hasOwnProperty(key)) {
          q.push(deps[key]);
        }
      }
    }
  }
  console.log(depsGraph);
  return depsGraph;
};

parseModules("./src/index.js");
