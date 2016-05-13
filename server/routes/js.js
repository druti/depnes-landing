var fs = require('fs');

function js(req, res) {
  var path = '/public/js/main.js';

  if (req.url === path) {
    res.writeHead(200, { 'Content-Type': 'application/javascript' });

    fs.createReadStream(__dirname + '/../..' + path).pipe(res);
  }
}

module.exports = js;
