var GoogleAuth;
var isAuthorized;
var currentApiRequest;

function initClient() {
  gapi.client.init({
      'apiKey': 'AIzaSyD7qk5VrQFjogROphN_Lr1oQMpOYAQLov4',
      'clientId': '570616045500-um4d2qq5ii78dqof943ohrndpv356gr7.apps.googleusercontent.com',
      'scope': 'https://www.googleapis.com/auth/documents.readonly',
      'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest']
  }).then(function () {
      GoogleAuth = gapi.auth2.getAuthInstance();
      GoogleAuth.isSignedIn.listen(updateSigninStatus);
  });
}

function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        isAuthorized = true;
        console.log('signed in');
    }
    else {
        isAuthorized = false;
        console.log('not signed in');
    }
}

function check_rkt() {
    var documentURL = document.getElementById('docsURL').value;
    var documentID = documentURL.split('/')[documentURL.split('/').length-2];

    console.log('doc id = ', documentID);
    get_from_docs(documentID);
}

function get_from_docs(id) {
    if (isAuthorized) {
        var request = gapi.client.request({
            'method': 'GET',
            'path': '/v3/documents',
            'params': {
                'documentId': id
            }
        });

        console.log(request);

        request.execute(function(response) {
            console.log(response);
        });
    }
    else {
        GoogleAuth.signIn();
    }
}

function send_to_server(content) {
}

