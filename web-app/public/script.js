var auth2;

function authenticate() {
    return gapi.auth2.getAuthInstance()
        .signIn({scope: "https://www.googleapis.com/auth/documents.readonly"})
        .then(function() { console.log("Sign-in successful"); },
                function(err) { console.error("Error signing in", err); });
}

function loadClient() {
    return gapi.client.load("https://content.googleapis.com/discovery/v1/apis/docs/v1/rest")
        .then(function() { console.log("GAPI client loaded for API"); },
            function(err) { console.error("Error loading GAPI client for API", err); });
}

function execute(id) {
    return gapi.client.docs.documents.get({
        "documentId": id,
        "suggestionsViewMode": "PREVIEW_WITHOUT_SUGGESTIONS",
        "prettyPrint": true
    })
        .then(function(response) {
            console.log("Response", response);
            
            body = JSON.parse(response.body).body.content;

            content = "";
            displayContent = "";

            for(let i = 1; i < body.length; i++) {
                newContent = body[i].paragraph.elements[0].textRun.content;
                content += newContent;

                if(i > 3) {
                    displayContent += '\u200c' + (i-3).padStart(8, ' ') + '  ' + newContent;
                }
            }

            console.log(content);
            document.getElementById('docContent').innerText = displayContent;

            send_to_server(content);
        },
        function(err) { console.error("Execute error", err); });
}

gapi.load("client:auth2", function() {
    auth2 = gapi.auth2.init({client_id: "570616045500-um4d2qq5ii78dqof943ohrndpv356gr7.apps.googleusercontent.com"});
});

function check_rkt() {
    var documentURL = document.getElementById('docsURL').value;
    var documentID = documentURL.split('/')[documentURL.split('/').length-2];

    console.log('doc id = ', documentID);
    get_from_docs(documentID);
}

function get_from_docs(id) {
    if(auth2.isSignedIn.get()) {
        execute(id);
    }
    else {
        authenticate();
    }
}

function send_to_server(content) {
    ip = document.getElementById('serverAddress').value;

    fetch(ip, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({content: content})
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            response = document.getElementById('response')
            response.innerText = data.output;
            if(data.status == "Success") {
                response.style.color = "green";
            }
            else {
                response.style.color = "red";
            }
        });
}

