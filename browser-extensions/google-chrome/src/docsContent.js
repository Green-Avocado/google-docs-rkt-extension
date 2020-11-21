makeUI();

function makeFunctions() {
    var script = document.createElement('script');
    script.src = chrome.runtime.getURL('script.js');

    document.documentBody.appendChild(script);
}

function makeUI() {
    var btn_run = document.createElement("button");
    btn_run.innerText = "Run Racket";
    btn_run.setAttribute("onclick","run()");

    var parent = document.getElementById("docs-menubar");
    parent.appendChild(btn_run);
}

