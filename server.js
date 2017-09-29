var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
});

app.get('/event/:id', function(req, res){
  io.emit('chat message', "this is a message from an event -> " + req.params.id);
  res.send('Message sent to all clients');
});

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

http.listen(8080, function(){
  console.log('listening on *:8080');
});

// Create periodical which ends a message to the client every 5 seconds
var interval = setInterval(function() {
  io.emit('chat message', 'This is a message from the server!  ' + new Date().getTime());
},5000);