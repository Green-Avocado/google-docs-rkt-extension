# rkt-extension server



## Installation

### Setup Racket

1. Install the `racket` package or build from https://github.com/racket/racket if necessary.
2. Install any required plugins with `raco install <plugin>`.

### Setup Server

1. Download the server files.
2. Install `nodejs` and `npm` if necessary.
3. Run `npm install` to download required packages.
4. Create a `.env` file in the server directory with the lines:
```
HOST=<host address>
PORT=<port number>
```
Replace `<host address>` with the IPv4 address, and `<port number>` with an open port.

5. Start the server with `./main.js` or `node main.js`.

