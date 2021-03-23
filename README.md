[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

NPM for Pocket
===============

A promised based npm for the [Pocket API](http://getpocket.com/developer/docs/overview)

## Install

First, install the pocket api with npm.

`npm install pocket-api`

## How to use

Please review the [Pocket API](http://getpocket.com/developer/docs/overview) for expected inputs and outputs and [authentication](http://getpocket.com/developer/docs/authentication) flow. Specifically Step 3, where you need to redirect the user to Pocket for authorization, which is not covered in this npm.

***Version ^0.3.0 is a breaking change***

```
let getPocket = require('pocket-api')

let consumer_key = 'your consumer_key';

let pocket = new getPocket(consumer_key);

pocket.getRequestToken()
.then(response => {
	console.log(response)
	//returns request_token
})

// Once you have you have received you request token, you have to send you user to the getPocket site
// It must also include a redirect URL, example:
// https://getpocket.com/auth/authorize?request_token=YOUR_REQUEST_TOKEN&redirect_uri=YOUR_REDIRECT_URI
// Please refer to the getPocket API site

pocket.getAccessToken()
.then(response => {
	console.log(response);
	// returns access token
});

pocket.getArticles(parameter_object)
.then(response => {
	console.log(response);
	//Returns articles
});

pocket.addArticles(add_object)
.then(response => {
	console.log(response)
	//Returns success
});

// Modify a URL
pocket.modifyArticles(actions_array)
.then(response => {
	console.log(response);
	//Returns success
})
```

The below methods set the access token and request token respectively

```
//sets request_token
pocket.setRequestToken(request_token)

//sets access_token
pocket.setAccessToken(access_token)
```

Finally, the API does still support callbacks, it is depreciated and will be removed in a future release.

Example:
```
pocket.getRequestToken( function( data ) {
	console.log( data );
	//returns request_token
});
