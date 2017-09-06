var app = require('express')();
var http = require('http').Server(app);

app.get('/hi', function(req, res){
  res.send('<h1>Hello world</h1>');
});

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

http.listen(8080, function(){
  console.log('listening on *:8080');
});