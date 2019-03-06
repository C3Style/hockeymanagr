//Install express server
const express = require('express');
const path = require('path');
var http = require('http');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/hm'));

app.get('/api/*', function(req,res) {

  var options = {
    // host to forward to
    host:   'https://hockeymanager.ch',
    // request method
    method: 'GET',
    // headers to send
    headers: req.headers
  };

  var creq = http.request(options, function(cres) {

    // set encoding
    cres.setEncoding('utf8');

    // wait for data
    cres.on('data', function(chunk){
      res.write(chunk);
    });

    cres.on('close', function(){
      // closed, let's end client request as well 
      res.writeHead(cres.statusCode);
      res.end();
    });

    cres.on('end', function(){
      // finished, let's finish client request as well 
      res.writeHead(cres.statusCode);
      res.end();
    });

  }).on('error', function(e) {
    // we got an error, return 500 error to client and log error
    console.log(e.message);
    res.writeHead(500);
    res.end();
  });

  creq.end();

});

app.get('/*', function(req,res) { 
	res.sendFile(path.join(__dirname+'/dist/hm/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);