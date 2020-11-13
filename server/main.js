#!/bin/node
const fs = require('fs'); 
const http = require('http');

const { exec } = require('child_process');
require('dotenv').config()
const hostname = process.env.HOST;
const port = process.env.PORT;

const { v4: uuidv4 } = require('uuid');

const server = http.createServer((req, res) => {
	let body = [];
	req.on('data', (chunk) => {
		body.push(chunk);
	}).on('end', () => {
		body = Buffer.concat(body).toString();
		let data = JSON.parse(body);
        let filename = uuidv4() + '.rkt~';

		fs.writeFile(filename, data.content, function (err) {
			if (err) throw err;

			console.log('Saved!');

			exec(`raco test ${filename}`, (err, stdout, stderr) => {
				if (err) {
				  throw err;
				}

				console.log(`stdout: ${stdout}`);
				
				res.statusCode = 200;
				res.setHeader('Content-Type', 'text/plain');
				res.end(stdout);
			});

            fs.unlinkSync(filename)
		});
	});
});

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});

