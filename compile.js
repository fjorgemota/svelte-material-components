const svelte = require("svelte");
const fs = require("fs");

var name = process.argv[2];

if (name) {
    var file = "src/"+name+".html";
    var content = fs.readFileSync(file).toString("utf-8");
    console.log(svelte.compile(content, {filename: file, name: name, format: "es", shared: true}).js.code);
    process.exit(0);
} else {
    var names = fs.readdirSync("./src/").filter((name) => name.split(".")[1] == "html").map((name) => name.split(".")[0]);
    let imports = [];
    for(let name of names) {
        imports.push(`export ${name} from './${name}.js'`);
        var file = "src/"+name+".html";
        console.log(file);
        var content = fs.readFileSync(file).toString("utf-8");
        fs.writeFileSync(`dist/${name}.js`, svelte.compile(content, {filename: file, name: name, format: "es", shared: true}).js.code);
    }
    fs.writeFileSync(`dist/index.js`, imports.join("\n"));

}
