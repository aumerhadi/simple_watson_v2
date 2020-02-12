/*
* Simple Watson Assistant project using IBM Watson assistant v2
* To start the application run this command: npm start
* You can test the application send REST API request with the follow information
* 	URL: http://localhost:3000
* 	Method: POST
* 	Header: Content-Type:application/json
* 	Body: { "text": "Your_Message_here" }
* Change the following values in the code
* 	version: From IBM Watson API Document
* 	Your_api_key: Assistant API keys
* 	URL: Assistnat url
* 	Your_assistant_id: Assistant ID
*/

'use strict';

const express = require('express'); // app server
const bodyParser = require('body-parser'); // parser for post requests
const AssistantV2 = require('ibm-watson/assistant/v2'); // IBM Assistant SDK v2
// const { BasicAuthenticator } = require('ibm-watson/auth'); // username password authentication
const { IamAuthenticator } = require('ibm-watson/auth'); // Iam Authentication
const mcache = require('memory-cache'); //memory cache

const app = express();

//POST request
app.use(bodyParser.json());

app.post('/', function (req, res) {
    console.log(JSON.stringify(req.body));
    process(req.body.text);
    var msg = {
        'text': 'post request'
    };
    res.send(msg);
});

// Process request 
var process = function (textMsg) {
    //Code for username/password authentication
    // const service = new AssistantV2({
    //     version: 'version',
    //     authenticator: new BasicAuthenticator({
    //         username: 'username',
    //         password: 'password',
    //     }),
    //     url: 'URL',
    // });
    
    //Code for Iam authentication
    const service = new AssistantV2({
        version: 'version',
        authenticator: new IamAuthenticator({
            apikey: 'Your_api_key',
        }),
        url: 'URL',
    });

    var assistant_id = 'Your_assistant_id';
    var session_id = mcache.get('sessionIdKey');
    if(mcache.get('sessionIdKey')){
        var session_id = mcache.get('sessionIdKey');
        processRequest(assistant_id, session_id, service, textMsg);
    }else{
        service.createSession({
            assistantId: assistant_id
        })
            .then(res => {
                var session_id = res.result.session_id;
                mcache.put('sessionIdKey', session_id);
                processRequest(assistant_id, session_id, service, textMsg);
            })
            .catch(err => {
                console.log(err);
                return err;
            });
        }
};

//Process NLP request
var processRequest = function (assistant_id, session_id, service, textMsg) {
    service.message({
        'assistantId': assistant_id,
        'sessionId': session_id,
        'input': {
            'message_type': 'text',
            'text': textMsg,
            'options': {
                'return_context': true,
				'debug': false
            }
        },
        context: {}
    })
        .then(res => {
            console.log(">>> Watson nlp response : ", JSON.stringify(res.result));
            return res.result;
        })
        .catch(err => {
            console.log(err);
            return err;
        })
};

let port = 3000;
app.listen(port);
console.log('App listening on port %s', port);