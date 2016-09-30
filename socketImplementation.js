var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.use(express.static(__dirname + '/client'));
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('Someone connected')
  io.emit('chatMessage', "Welcome... My name is Shubham, You can chat with me");
  socket.on('chatMessage', function(msg){
    io.emit('chatMessage', msg);
  });
});


http.listen(3011, function(){
  console.log('listening on *:3011');
});





// var fs = require('fs');
// var path = require('path');
// var express = require('express');
// var bodyParser = require('body-parser');
// var exp = express();
// var io = require('socket.io');
// var events = require('events');


// var eventEmitter = new events.EventEmitter();
// eventEmitter.on('eventName', eventHandler);
// eventEmitter.emit('eventName');

// function eventHandler(){
//     console.log('hola');
// }

// var COMMENTS_FILE = path.join(__dirname, 'database.json');

// exp.set('port', (process.env.PORT || 3000));

// exp.use('/', express.static(path.join(__dirname, 'public')));

// exp.use(bodyParser.json());
// exp.use(bodyParser.urlencoded({extended: true}));

// // // Additional middleware which will set headers that we need on each request.
// exp.use(function(req, res, next) {
//     // an API server in conjunction with something like webpack-dev-server.
//     res.setHeader('Access-Control-Allow-Origin', '*');

//     // Disable caching
//     res.setHeader('Cache-Control', 'no-cache');
//     next();
// });

// exp.get('/api/comments', function(req, res) {
//   fs.readFile(COMMENTS_FILE, function(err, data) {
//     if (err) {
//       console.error(err);
//       process.exit(1);
//     }
//     res.json(JSON.parse(data));
//   });
// });

// exp.post('/api/comments', function(req, res) {
//   fs.readFile(COMMENTS_FILE, function(err, data) {
//     if (err) {
//       console.error(err);
//       process.exit(1);
//     }
//     var comments = JSON.parse(data);
//     var newComment = {
//       id: Date.now(),
//       author: req.body.author,
//       text: req.body.text,
//     };
//     comments.push(newComment);
//     fs.writeFile(COMMENTS_FILE, JSON.stringify(comments, null, 4), function(err) {
//       if (err) {
//         console.error(err);
//         process.exit(1);
//       }
//       res.json(comments);
//     });
//   });
// });

// exp.listen(exp.get('port'), function() {
//   console.log('Server started: http://localhost:' + exp.get('port') + '/');
// });