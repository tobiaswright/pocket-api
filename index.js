var request = require('request');

var config = {
	pocketUrl: {
		request : "https://getpocket.com/v3/oauth/request",
		authorize : "https://getpocket.com/v3/oauth/authorize",
		userAuthorize: "https://getpocket.com/auth/authorize",
		get: "https://getpocket.com/v3/get",
		add: "https://getpocket.com/v3/add",
		modify: "https://getpocket.com/v3/send"
	},
	headers: {
		"content-type": "application/x-www-form-urlencoded",
		"X-Accept": "application/json"
	}
}

var pocket = {};

pocket.getRequestToken = function(err, params, callback){
	var options = {
		headers: config.headers,
		body: "consumer_key=" + params.consumer_key + "&redirect_uri=" + params.redirect_uri,
		url: config.pocketUrl.request
	}
	request.post(options, function(err, response, body){
		callback(err, JSON.parse(body));
	});
}

pocket.generateURL = function(err, params, callback){
	var queryParams = "?request_token=" + params.request_token + "&redirect_uri=" + params.redirect_uri
	var url = config.pocketUrl.userAuthorize + queryParams;
	callback(err, url);
}

pocket.getAccessToken = function(err, params, callback){
	var options = {
		headers: config.headers,
		url: config.pocketUrl.authorize,
		body: "consumer_key=" + params.consumer_key + "&code=" + params.request_token
	}
	request.post(options, function (err, response, body) {
		callback(err, JSON.parse(body));
	});
}

pocket.getArticles = function(err, params, callback){
	var options = {
		headers: config.headers,
		url: config.pocketUrl.get,
		body: "consumer_key=" + params.key + "&access_token=" + params.access_token
	}
	request.post(options, function (err, response, body) {
		completePost(err, response, body, callback);
	});
}

pocket.addArticles = function(err, params, callback){
	var options = {
		headers: config.headers,
		url: config.pocketUrl.add,
		body: "url=" + params.url + "&consumer_key=" + params.consumer_key + "&access_token=" + params.access_token + "&tweet_id=" + params.tweet_id + ((params.tags) ?("&tags=" + params.tags):'')
	}
	request.post(options, function (err, response, body) {
		completePost(err, response, body, callback);
	});
}

pocket.modifyArticles = function(err, params, callback){
	actions = JSON.stringify(actions);
	var options = {
		headers: config.headers,
		url: config.pocketUrl.modify,
		body: "actions=" + encodeURIComponent(params.actions) + "&consumer_key=" + params.consumer_key + "&access_token=" + params.access_token
	}
	request.post(options, function (err, response, body) {
		completePost(err, response, body, callback);
	});
}

var completePost = function(err, response, body, callback) {
	if (err) {
		callback(err, null);
	} else if (response.headers.hasOwnProperty('x-error')) {
		callback(response.headers['x-error'], null);
	} else {
		callback(err, JSON.parse(body));
	}
}

module.exports = pocket;
