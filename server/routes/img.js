var fs = require('fs');

function handleImg(req, res) {
  if (req.url.indexOf('.png') !== -1) {
    console.log('Loading img... ', req.url);
    var img = fs.readFileSync(__dirname + '/../..' + req.url);
    res.writeHead(200, { 'Content-Type': 'image/png' });
    res.end(img, 'binary');
    console.log('Done loading img... ', req.url);
  }
}

module.exports = handleImg;
