const doc = DocumentApp.getActiveDocument();
const ui = DocumentApp.getUi();
const cache = CacheService.getDocumentCache();

function onOpen() {
    ui.createMenu('Racket Add-on')
        .addItem('Run Racket', 'run')
        .addItem('Set Target', 'seturl')
        .addToUi();
}

function geturl() {
    var url = cache.get('url');
    ui.alert(url);
}

function seturl() {
    var response = ui.prompt("Enter URL:")
    var url = response.getResponseText();
    cache.put('url', url, 1209600);
    ui.alert("Target set to " + url);
}

function run() {
    var url = cache.get('url');

    if(url != null && url != "") ui.alert(send(url));
    else ui.alert("Error: missing target");
}

function send(url) {
    var body = doc.getBody().getText();

    var data = {
        'content': body
    };

    var options = {
        'method' : 'post',
        'contentType': 'application/json',
        'payload' : JSON.stringify(data)
    };

    var response = JSON.parse(UrlFetchApp.fetch(url, options));

    Logger.log(response.status);

    return response.output;
}

