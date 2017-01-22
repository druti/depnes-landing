var fs = require('fs');

function handleImg(req, res) {
  if (req.url.indexOf('.png') !== -1) {
    var img = fs.readFileSync(__dirname + '/../..' + req.url);
    res.writeHead(200, { 'Content-Type': 'image/png' });
    res.end(img, 'binary');
  }
}

module.exports = handleImg;
