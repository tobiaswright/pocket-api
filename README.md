[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

Node for Pocket
===============

Node npm for the Pocket API

## Install

First, install the pocket api with npm.

`npm install pocket-api`

## How to use

Please review the [pocket API](http://getpocket.com/developer/docs/overview) for expected inputs and outputs and [authentication](http://getpocket.com/developer/docs/authentication) flow. Specifically Step 3, where you need to redirect the user to Pocket for authorization, which is not covered in this npm.

***Version ^3.0 is a breaking change***

```
let pocket = require('pocket-api')

let consumer_key = 'your consumer_key';

let pocket = new getPocket(consumer_key);

//returns request_token
pocket.getRequestToken().then(reponse => console.log(response))

//sets request_token
pocket.setRequestToken(request_token)


pocket.getRequestToken( consumer_key , function( data ) {
	console.log( data );
	//returns request_token
});

pocket.getAccessToken( consumer_key , request_token, function( data ) {
	console.log( data );
	//returns username and access_token
});

pocket.getArticles( consumer_key , access_token, function( error, data ) {
	console.log( error, data );
	//returns articles
});

pocket.addArticles( url-to-add, consumer_key , access_token, function( error, data ) {
	console.log( error, data );
});

pocket.modifyArticles( actions, consumer_key , access_token, function( error, data ) {
	console.log( error, data )
});
```
