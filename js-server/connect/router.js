var url = require('url');
//定义所在的路由
var index = require('../routes/index');

var routes = [];
var allReturn = {};

//初始化路由，将每个路由监听加到队列
exports.init = function(){
  index.start(this);
}

//将路由事件加入数组
exports.get = function(url, next) {
  var route = {url: url, next: next};
  if(url == '*'){
    allReturn = route;
    return;
  }
  routes.push(route);
}

//路由的中间件
exports.router = function(req, res, next) {
  //是否有返回
  var isReturn = false;
  var i = 0;
  function run(){
    for(var i = 0; i < routes.length; i++){
      var task = routes[i];
      if(!task || isReturn) return;

      var route = url.parse(req.url).pathname;
      //判断当前路由是否与之相等
      if(task.url == route){
        task.next(req, res);
        isReturn = true;
      }
    }

    //如果当前没有返回，又配置了*路由，则返回
    if(!isReturn){
      if(allReturn && allReturn.next){
        allReturn.next(req, res);
      }
    }
  }

  

  run();

  next();
}