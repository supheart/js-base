var url = require('url');
var query = require('querystring');

exports.parser = function(req, res, next) {
  // var urlObj = url.parse(req.url);
  // var href = urlObj.href;
  // var path = urlObj.path;
  // var pathname = urlObj.pathname;
  // var query = urlObj.query;
  // var search = urlObj.search;
  // console.log('href is: ' + href);
  // console.log('path is: ' + path);
  // console.log('pathname is: ' + pathname);
  // console.log('query is: ' + query);
  // console.log('search is: ' + search);
  // console.log('href is: ' + href);
  // console.log('href is: ' + href);
  // next();

  if(req.method == "GET"){
    req.query = url.parse(req.url,true).query || {};
    next();
  }else {
    var postdata = "";
    req.addListener("data", function(postchunk) {
        postdata += postchunk;
    })

    //POST结束输出结果
    req.addListener("end", function() {
        req.body = query.parse(postdata) || {};
        next();
    })
  }
}