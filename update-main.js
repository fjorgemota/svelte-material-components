const fs = require("fs");
var contentNode = [];
var contentModule = [];
var getComponentName = (name) => name.substr(0, name.length-5);
var isComponent = (name) => name.substr(name.length-5) === ".html";
var getComponentAndFileName = (name) => {return {filename: name, componentName: getComponentName(name)}};

fs.readdirSync("src/")
    .filter(isComponent)
    .map(getComponentAndFileName)
    .forEach(({filename, componentName}) => {
        contentNode.push(`module.exports.${componentName} = require('./${filename}');`);
        contentModule.push(`export {default as ${componentName}} from './${filename}';`);
    });
fs.writeFileSync("src/index.node.js", contentNode.join("\n"));
fs.writeFileSync("src/index.module.js", contentModule.join("\n"));
