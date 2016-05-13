var fs = require('fs');

function renderer(tmpl, res, data) {
  var tmplStr = fs.readFileSync(__dirname + '/../views/' + tmpl + '.html', 'utf8');
  for (var key in data) {
    if (data.hasOwnProperty(key)) {
      tmplStr = tmplStr.split('{{' + key + '}}').join(data[key]);
    }
  }
  res.write(tmplStr);
}

module.exports = renderer;
