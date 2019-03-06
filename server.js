//Install express server
const express = require('express');
const path = require('path');
const request = require('request');
// const cors = require('cors');

const app = express();

// Enable CORS
// app.use(cors());

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

app.get('/api/*', function(req,res) {
	var newurl = 'https://hockeymanager.ch';
	request(newurl).pipe(res);
});

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/hm'));

app.get('/*', function(req,res) {
	res.sendFile(path.join(__dirname+'/dist/hm/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);