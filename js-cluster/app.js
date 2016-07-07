var cluster = require('cluster');
var http = require('http');
var numCpus = require('os').cpus().length;

if(cluster.isMaster) {
  console.log("master start, cpu count is: " + numCpus);

  cluster.on('listening', function(worker, address) {
    console.log('listening: worker ' + worker.process.pid + ', Address: ' + address.address + ':' + address.port)
    console.log('address' + address.parameters);
  });

  cluster.on('exit', function() {
    console.log('worker ' + worker.process.pid + ' died');
  });

  for (var i = 0; i < numCpus; i++) {
    cluster.fork();
  }
}else {
  http.createServer(function(req, res) {
    console.log('start http');
    res.writeHead(200);
    res.end('hello world!\n');
  }).listen(0);
}