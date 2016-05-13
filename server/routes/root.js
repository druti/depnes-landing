var fs = require('fs');
var querystring = require('querystring');
var renderer = require('./../renderer');

function root(req, res, path) {
  if (req.url === '/') {
    if (req.method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'text/html' });

      renderer('head', res);
      renderer('poster', res);
      renderer('wrapper', res);
      renderer('feet', res);
      res.end();
    } else {
      var body = '';

      req.on('data', function (chunk) {
        body += chunk.toString();
      });

      req.on('end', function () {
        var filePath = __dirname + '/../data/emails.json';
        var notif = 'Thanks for signing up!';
        var user = {
          email: querystring.parse(body).email,
          date: new Date()
        };

        fs.readFile(filePath, 'utf8', function (err, data) {
          if (err) {
            console.log(err.message);
            process.exit(1);
          }

          var file = JSON.parse(data);

          file.push(user);

          file = JSON.stringify(file, null, 4);

          fs.writeFile(filePath, file, function (err) {
            if (err) {
              console.log(err.message);
              process.exit(1);
            }

            res.writeHead(200, { 'Content-Type': 'text/html' });

            renderer('head', res);
            renderer('callout', res, { type: 'success', message: notif });
            renderer('poster', res);
            renderer('wrapper', res);
            renderer('feet', res);
            res.end();
          });
        });
      });
    }
  }
}

fs.writeFile(__dirname + '/../data/emails.json', '[]', { flag: 'wx' }, function (err) {
  if (err) console.log(err.message);
});

module.exports = root;
