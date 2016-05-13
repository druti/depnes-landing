var http = require('http');
var root = require('./routes/root');
var css = require('./routes/css');
var js = require('./routes/js');
var hostname = '127.0.0.1';
var port = process.env.PORT || 3333;

var server = http.createServer(function (req, res) {
  root(req, res);
  css(req, res);
  js(req, res);
});

server.listen(port, function () {
  console.log('Server running at http://' + hostname + ':' + port + '/');
});
