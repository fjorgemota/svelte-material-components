const svelte = require('rollup-plugin-svelte');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const fs  = require('fs');
var names = fs.readdirSync('./src/').filter((name) => name.split('.')[1] == 'html').map((name) => name.split('.')[0]);
let imports = [];
var config = [];
for(let name of names) {
    config.push({
		input: 'src/'+name+'.html',
		output: [
			{ file: 'dist/'+name+'.js', 'format': 'es' },
			{ file: 'dist/'+name+'.umd.js', 'format': 'umd', name: name }
		],
		plugins: [
			resolve(),
            commonjs(),
			svelte()
		]
	});
}

export default config;
