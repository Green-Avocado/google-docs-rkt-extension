# Web App

## Installation (optional)

1. Download the files in the `public` directory.

## Usage

### Opening the web app

If you installed the web-app locally:

With firebase:

1. Run `firebase serve` in this directory.
2. Navigate to http://localhost:5000

With python3:

1. Run `python3 -m http.server 5000` in the [public](public) directory.
2. Navigate to http://localhost:5000

With python2:

1. Run `python -m SimpleHTTPServer 5000` in the [public](public) directory.
2. Navigate to http://localhost:5000

Otherwise:

1. Navigate to https://raco-test-web-app.web.app/

### Set up local server

1. Download the contents of the [server](../server) directory.
2. Follow the server installation instructions, but set `HOST` to `localhost` and set `PORT` to `8000` or an unused port of your choice.

### Set up Google Docs

1. Open a `*.rkt` file in a text editor (such as Notepad), and copy the contents of a file into Google Docs.

Make sure to include the three lines at the top.
They should look something like this:

```
;; The first three lines of this file were inserted by DrRacket. They record metadata
;; about the language level of this file in a form that our tools can easily process.
#reader(lib "htdp-intermediate-lambda-reader.ss" "lang")((modname pset-09-starter) (read-case-sensitive #t) (teachpacks ()) (htdp-settings #(#t constructor repeating-decimal #f #t none #f () #t)))
```

2. Follow the tips for using Racket in Google Docs at the bottom of this readme (optional).
3. Set the `Server URL` to `http://localhost:8000` or what you set up the server to use.
4. Set the `Google Docs URL` to the URL for the document with your Racket code.
5. Click `Go` to send your code to your server.

Note: As the app is unverified, Google will warn you against granting this app permissions.
To use this app, you have to click `Advanced` and click `Go to <app or page name>`.

## Tips

To use Google Docs when writing code, go to Tools > Preferences:

- Uncheck all boxes in the General tab.
- Uncheck automatic substitution.

