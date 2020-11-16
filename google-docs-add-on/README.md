# Google Docs Add-on



## Installation

1. Open document.
2. Go to `Tools > Script editor`.
3. Paste the contents of [main.gs](main.gs).
4. Go to `Run > Run function > onOpen`.



## Use

### Google Docs

Copy paste the raw data of the \*.rkt file into Google Docs.
Do not copy paste from DrRacket as it will remove metadata, use a text editor such as notepad instead.
The document should include the first few lines at the top, which may looks something like:

```rkt
;; The first three lines of this file were inserted by DrRacket. They record metadata
;; about the language level of this file in a form that our tools can easily process.
#reader(lib "htdp-intermediate-lambda-reader.ss" "lang")((modname pset-09-starter) (read-case-sensitive #t) (teachpacks ()) (htdp-settings #(#t constructor repeating-decimal #f #t none #f () #t)))
```

### Set Target

Go to `Racket Add-on` in the document.
Click `Set Target` and enter the address of the server.


### Run code

Go to `Racket Add-on` in the document.
Click `Run Racket.


## Tips

To use Google Docs when writing code, go to `Tools > Preferences`:

 * Uncheck all boxes in the `General` tab.
 * Uncheck `automatic substitution`.

