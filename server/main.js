#!/bin/node
const fs = require('fs'); 
const http = require('http');
const { exec } = require('child_process');
require('dotenv').config()

const hostname = process.env.HOST;
const port = process.env.PORT;

const server = http.createServer((req, res) => {
	let body = [];
	req.on('data', (chunk) => {
		body.push(chunk);
	}).on('end', () => {
		body = Buffer.concat(body).toString();
		let data = JSON.parse(body);

		fs.writeFile('request.rkt~', data.content, function (err) {
			if (err) throw err;

			console.log('Saved!');

			exec('raco test request.rkt', (err, stdout, stderr) => {
				if (err) {
				  throw err;
				}

				console.log(`stdout: ${stdout}`);
				
				res.statusCode = 200;
				res.setHeader('Content-Type', 'text/plain');
				res.end(stdout);
			});
		});
	});
});

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});

