const fs = require("fs");
var contentNode = [];
var contentModule = [];
var directory = "src/";
if (process.argv.length > 2 && process.argv.pop() === "dist") {
    directory = "dist/";
}
var getComponentName = (name) => name.split(".")[0];
var isComponent = (name) => name[0] === name[0].toUpperCase() && name.split(".").length === 2 && name.split(".")[1] === "js";
var getComponentAndFileName = (name) => {return {nodeFilename: name, esFilename: name.replace(".js", ".mjs"), componentName: getComponentName(name)}};

fs.readdirSync(directory)
    .filter(isComponent)
    .map(getComponentAndFileName)
    .forEach(({nodeFilename, esFilename, componentName}) => {
        contentNode.push(`module.exports.${componentName} = require('./${nodeFilename}');`);
        contentModule.push(`export {default as ${componentName}} from './${esFilename}';`);
    });
fs.writeFileSync(directory+"index.js", contentNode.join("\n"));
fs.writeFileSync(directory+"index.mjs", contentModule.join("\n"));
