//Install express server
const express = require('express');
const path = require('path');
const request = require('request');
const app = express();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

app.get('/api/*', function(req,res) {
	var newurl = 'https://hockeymanager.ch' + req.url;
	request(newurl).pipe(res);
});

/*
app.post('/HockeyManager/*', function(req,res) {
	var newurl = 'https://www.c3style.ch/' + req.url;
	request(newurl).pipe(res);
});
*/

app.post('/HockeyManager/*', function(req,res) {
    request(
		{ 
			url: 'https://www.c3style.ch/' + req.url, 
			headers: req.headers
			// body: req.body 
		}, 
		function(err, remoteResponse, remoteBody) 
		{ 
			console.log(remoteBody); 
		}
	).pipe(res);
});

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/hm'));

app.get('/*', function(req,res) {
	res.sendFile(path.join(__dirname+'/dist/hm/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);