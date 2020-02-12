# Simple IBM Watson Assistant v2 Code
Simple IBM Watson Assistant project is simple code demonstrates how to use IBM Watson SDK v2, how to user IaM Authentication and how to recognize a string

## Before run the code

Change the following values in the code

* version: From IBM Watson API Document
* Your_api_key: Assistant API keys
* URL: Assistnat url
* Your_assistant_id: Assistant ID

## How to run
To start the application run this command: 

`npm start`

## How to test

You can test the application by send REST API request with the follow information:

* URL: http://localhost:3000
* Method: POST
* Header: Content-Type:application/json
* Body: { "text": "Your_Message_here" }
