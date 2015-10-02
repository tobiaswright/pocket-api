Node for Pocket
===============

Node npm for the Pocket API

## Install

First, install the pocket api with npm.

`npm install pocket-api`

## How to use

Please review the [pocket API](http://getpocket.com/developer/docs/overview) for expected inputs and outputs and [authentication](http://getpocket.com/developer/docs/authentication) flow.

```
var pocket = require('pocket-api')

var consumer_key = 'your consumer_key';
var redirect_uri = 'your redirect_uri'

params = {
	consumer_key: consumer_key,
	redirect_uri: redirect_uri
}
pocket.getRequestToken(err, params, function(err, request_token){
	console.log(request_token);
	params.request_token = request_token;
});

pocket.generateURL(err, params, function(err, url){
	//send user to this url
})

pocket.getAccessToken(err, params, function(data){
	console.log(data);
	params.access_token = data.access_token;
	//returns username and access_token
});

pocket.getArticles(err, params, function(err, data){
	//returns articles
});

add to params: {url, tweet_id, tags}
pocket.addArticles(err, params, function(err, data){
});

add to params: {actions}
pocket.modifyArticles(err, params, function(err, data) {
});

```