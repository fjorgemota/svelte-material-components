const svelte = require("svelte");
const fs = require("fs");

var name = process.argv[2];

var file = "src/"+name+".html";
var content = fs.readFileSync(file).toString("utf-8");
console.log(svelte.compile(content, {filename: file, name: name, format: "es", shared: true}).js.code);
