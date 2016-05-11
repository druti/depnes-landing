var fs = require('fs'),
    querystring = require('querystring'),
    renderer = require('./renderer');

function root(req, res) {
  if (req.url === '/') {
    if (req.method.toLowerCase() === 'get') {
      res.writeHead(200, {'Content-Type': 'text/html'});

      var html = '';
      html += fs.readFileSync('./views/head.html', 'utf8');
      html += fs.readFileSync('./views/poster.html', 'utf8');
      html += fs.readFileSync('./views/wrapper.html', 'utf8');
      // render home page
      res.write(html);
      res.end();
    } else {
      req.on('data', function (chunk) {
        res.writeHead(200, {'Content-Type': 'text/html'});

        var email = querystring.parse(chunk.toString()).email+'\n',
            notif = 'Thanks for signing up!';

        fs.appendFileSync('./server/emails.txt', email,'utf8');

        renderer('head', {}, res);
        renderer('notification', {message: notif}, res);
        renderer('poster', {}, res);
        renderer('wrapper', {}, res);
        res.end();
      });
    }
  }
}

function css(req, res) {
  var path = '/public/css/style.css';
  if (req.url === path) {
    res.writeHead(200, {'Content-Type': 'text/css'});

    var js = fs.readFileSync('.'+path, 'utf8');
    res.write(js);
    res.end();
  }
}

function js(req, res) {
  var path = '/public/js/main.js';
  if (req.url === path) {
    res.writeHead(200, {'Content-Type': 'application/javascript'});

    var css = fs.readFileSync('.'+path, 'utf8');
    res.write(css);
    res.end();
  }
}

module.exports.root = root;
module.exports.css = css;
module.exports.js = js;
