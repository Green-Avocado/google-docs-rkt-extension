#!/bin/node
const fs = require('fs'); 
const http = require('http');

const { exec } = require('child_process');
require('dotenv').config()
const hostname = process.env.HOST;
const port = process.env.PORT;

const { v4: uuidv4 } = require('uuid');

const server = http.createServer((req, res) => {
    const headers = {
        'Access-Control-Allow-Origin': '*'
    };

    let body = [];
    req.on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();
        let data = JSON.parse(body);
        let filename = uuidv4() + '.rkt~';

        fs.writeFile(filename, data.content, function (err) {
            if (err) throw err;
            else{
                console.log(`Saved to ${filename}`);

                exec(`raco test --timeout 120 ${filename}`, (err, stdout, stderr) => {
                    if (err) {
                        console.log(`stderr: ${stderr}`);

                        fs.unlinkSync(filename)
                        
                        res.writeHead(200, headers);
                        res.end(JSON.stringify({
                            status: "Error",
                            output: stderr
                        }));
                    }
                    else {
                        console.log(`stdout: ${stdout}`);

                        fs.unlinkSync(filename)
                        
                        res.writeHead(200, headers);
                        res.end(JSON.stringify({
                            status: "Success",
                            output: stdout
                        }));
                    }
                });
            }
        });
    });
});

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});

process.on('SIGINT', function() {
    console.log('\nGracefully shutting down from SIGINT (Ctrl-C)\n');

    console.log('Removing .rkt~ files... ');

    exec('rm -f *.rkt~', (err, stdout, stderr) => {
        if(err) console.log(err);

        console.log('done\n');
        process.exit();
    });
});

process.on('uncaughtException', function(err) {
    console.log(`\nUncaught Error:\n${err}`);
});

