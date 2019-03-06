//Install express server
const express = require('express');
const path = require('path');
const request = require('request');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/hm'));

app.get('/*', function(req,res) {
	res.sendFile(path.join(__dirname+'/dist/hm/index.html'));
});

app.get('/api/*', function(req,res) {
	var newurl = 'https://hockeymanager.ch';
	request(newurl).pipe(res);
	// res.sendFile(path.join(__dirname+'/dist/hm/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);