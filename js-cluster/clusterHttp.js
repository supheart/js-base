var cluster = require('cluster');
var http = require('http');
var numCpus = require('os').cpus().length;

//用于多核服务器的负载均衡
if(cluster.isMaster) {
  console.log('[master] ' + 'start master...');
  for (var i = 0; i < numCpus / 2 + 1; i++) {
    cluster.fork();
  }

  cluster.on('listening', function (worker, address) {
    console.log('[master] listening: worker' + worker.id + ', pid: ' + worker.process.pid + ', Address: ' + address.address + ':' + address.port + '.');
  });
}else if(cluster.isWorker) {
  console.log('[worker] start worker...' + cluster.worker.id);
  http.createServer(function(req, res) {
    console.log('worker' + cluster.worker.id);
    res.end('worker' + cluster.worker.id + ', pid: ' + process.id);
  }).listen(3000);
}