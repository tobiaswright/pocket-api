var request = require('request');

var config = {
	pocketUrl: {
		request : "https://getpocket.com/v3/oauth/request",
		authorize : "https://getpocket.com/v3/oauth/authorize",
		get: "https://getpocket.com/v3/get",
		add: "https://getpocket.com/v3/add",
		modify: "https://getpocket.com/v3/send"
	},
	headers: {
		"content-type": "application/x-www-form-urlencoded",
		"X-Accept": "application/json"
	}
}

var getRequestToken = function(key, callback) {

	var options = {
		headers: config.headers,
		body: "consumer_key="+key+"&redirect_uri=pocketapp1234:authorizationFinished",
		url: config.pocketUrl.request
	}

	request.post(options, function (error, response, body) {
		callback(JSON.parse(body));
	});
}

var getAccessToken = function(key, requestToken, callback){

	var options = {
		headers: config.headers,
		url: config.pocketUrl.authorize,
		body: "consumer_key="+key+"&code="+requestToken+"&redirect_uri=pocketapp1234:authorizationFinished"
	}

	request.post(options, function (error, response, body) {
		callback(JSON.parse(body));
	});

}

var getArticles = function(key, accessToken, callback){

	var options = {
		headers: config.headers,
		url: config.pocketUrl.get,
		body: "consumer_key="+key+"&access_token="+accessToken
	}

	request.post(options, function (error, response, body) {
		completePost(error, response, body, callback);
	});

}

var addArticles = function(addurl, key, accessToken, callback){

	var options = {
		headers: config.headers,
		url: config.pocketUrl.add,
		body: "url="+addurl+"&consumer_key="+key+"&access_token="+accessToken
	}

	request.post(options, function (error, response, body) {
		completePost(error, response, body, callback);
	});

}

var modifyArticles = function(actions, key, accessToken, callback){

	actions = JSON.stringify(actions);

	var options = {
		headers: config.headers,
		url: config.pocketUrl.modify,
		body: "actions="+encodeURIComponent(actions)+"&consumer_key="+key+"&access_token="+accessToken
	}

	request.post(options, function (error, response, body) {
		completePost(error, response, body, callback);
	});

}

function completePost(error, response, body, callback) {
	if (error) {
		callback(error, null);
	} else if (response.headers.hasOwnProperty('x-error')) {
		callback(response.headers['x-error'], null);
	} else {
		callback(null, JSON.parse(body));
	}
}

module.exports = {
	getRequestToken: getRequestToken,
	getAccessToken: getAccessToken,
	getArticles: getArticles,
	addArticles: addArticles,
	modifyArticles: modifyArticles
}
