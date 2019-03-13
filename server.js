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
	
	var arr = [{
        Id : 10,
        FirstName: "123",
		LastName: "123",
		Role: "123",
		Club: "123",
		Price: "123",
		Points: "123",
		Presence: "123",
    }];
	
    request(
		{ 
			url: 'https://www.c3style.ch/' + req.url, 
			headers: req.headers
			body: req.body 
			
			headers: {
				'Content-Type':'application/json;charset=UTF-8',
				'Accept-Encoding':'gzip, deflate',
				'X-Requested-With': 'XMLHttpRequest',
				'Accept':'application/json, text/plain, */*',
				'User-Agent': 'UserAgent' 
			},
			json: true,
			body: arr
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