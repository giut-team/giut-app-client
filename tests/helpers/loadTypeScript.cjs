const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const ts = require("typescript");

// 실제 소스를 실행하며 테스트가 지정한 외부 경계만 대체한다.
function loadModule(relativePath, imports = {}, globals = {}) {
  const source = fs.readFileSync(path.join(__dirname, "../..", relativePath), "utf8")
    .replaceAll("import.meta.env", "{}");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022,
      jsx: ts.JsxEmit.ReactJSX,
    },
  });
  const result = { exports: {} };
  vm.runInNewContext(`(function(require, module, exports) { ${outputText}\n})`, { URL, Error, ...globals })(
    (name) => imports[name] ?? require(name), result, result.exports,
  );
  return result.exports;
}

module.exports = { loadModule };
