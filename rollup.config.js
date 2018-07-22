const svelte = require('rollup-plugin-svelte');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const fs  = require('fs');
var names = fs.readdirSync('./src/').filter((name) => name.split('.')[1] == 'html').map((name) => name.split('.')[0]);
let imports = [];
var config = [];
let pathES = {};
let pathUMD = {};
let svelteShared = "svelte/shared.js";
let svelteSharedComputed = require.resolve(svelteShared);
pathES[svelteSharedComputed] = "./shared.js";
pathUMD[svelteSharedComputed] = "./shared.umd.js";
var globals = {};
globals[svelteSharedComputed] = "svelteShared";
config.push({
    input: svelteSharedComputed,
    output: [
        { file: 'dist/shared.js', 'format': 'es'}, 
        { file: 'dist/shared.umd.js', 'format': 'umd', 'name': "svelteShared"}
    ]
})
for(let name of names) {
    config.push({
		input: 'src/'+name+'.html',
		output: [
			{ file: 'dist/'+name+'.js', 'format': 'es', paths: pathES }
		],
        external: [
            svelteSharedComputed,
        ],
		plugins: [
			resolve(),
	        commonjs(),
			svelte()
		]
	});
    config.push({
		input: 'src/'+name+'.html',
		output: [
            { file: 'dist/'+name+'.umd.js', 'format': 'umd', name: name, paths: pathUMD, globals: globals }
		],
        external: [
            svelteSharedComputed,
        ],
		plugins: [
			resolve(),
	        commonjs(),
			svelte()
		]
	});
}

export default config;
