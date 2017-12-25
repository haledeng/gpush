#!/usr/bin/env node




const shell = require('shelljs');
const path = require('path');
const fs = require('fs');

shell.config.fatal = true;
shell.config.verbose = true;



function getJSON() {
	var jsonPath = path.dirname(__dirname) + '/package.json';
	if (fs.existsSync(jsonPath)) {
		var content = fs.readFileSync(jsonPath);
		content = JSON.parse(content);
		return content;
	}
	return {};
}

function index() {
	var slice = Array.prototype.slice,
	message = process.argv[2] || '';

	var packageJson = getJSON();

	if (/\-[vV]/.test(message)) {
		console.log(packageJson.version);
	} else {
		console.log(message);
		if (message) {
			shell
				.exec(`git add .`)
				.exec(`git commit -m "${message}"`)
				.exec(`git push`)
		} else {
			console.log('must provide a message info');
		}
	}
}

index();