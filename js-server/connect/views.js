var path = require('path');
var fs = require('fs');

exports.views = function(req, res, next) {
  res.render = function(view) {
    var path = __dirname + '/../views/' + view + '.html';
    fs.exists(path, function(exist) {
      if(!exist) {
        res.writeHead(404, {
          'Content-Type': 'text/plain'
        });
        res.write('404');
        res.end();
      }else {
        fs.readFile(path, 'binary', function(err, result) {
          if(err) {
            res.writeHead(500, {
              'Content-Type': 'text/plain'
            });
            res.end();
          }else {
            res.writeHead(200, {
              'Content-Type': 'text/html'
            });
            res.write(result, 'binary');
            res.end();
          }
        });
      }
    });
  }

  res.send = function (string) {
    res.writeHead(200, {
      'Content-Type': 'text/plain'
    });
    res.write(string);
    res.end();
  }

  res.json = function (json) {
    if(json && json instanceof Object){
      json = JSON.stringify(json);
    }
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    res.write(json);
    res.end();
  }

  next();
}