//一个简单的express
exports.express = function() {
  var funcs = [];

  var expr = function(req, res) {
    var i = 0;
    function next() {
      var task = funcs[i++];
      if(!task) return;
      task(req, res, next); 
    }
    next();
  }

  expr.use = function(f) {
    funcs.push(f);
  }

  return expr;
}