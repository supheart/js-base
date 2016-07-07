var http = require('http');
var server = require('./core/server');
var app = server.express();
var router = require('./connect/router');
var body = require('./connect/bodyParser');
var view = require('./connect/views');

app.use(body.parser);
app.use(view.views)
router.init();
app.use(router.router);

http.createServer(app).listen('3001', function(){
  console.log('start server, listen the port is: ' + 3001);
});