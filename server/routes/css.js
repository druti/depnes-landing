var fs = require('fs');

function css(req, res) {
  var path = '/public/css/style.css';

  if (req.url === path) {
    res.writeHead(200, { 'Content-Type': 'text/css' });

    fs.createReadStream(__dirname + '/../..' + path).pipe(res);
  }
}

module.exports = css;
