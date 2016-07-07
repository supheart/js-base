exports.start = function(router) {

  router.get('/index', function(req, res) {
    res.render('index');
  });

  router.get('/test1', function(req, res) {
    res.send('test1');
  })

  router.get('/test2', function(req, res) {
    var obj = {haha: req.query.aa};
    res.json(obj);
  })

  router.get('/test3', function(req, res) {
    var obj = '{"haha": "hahaha"}';
    res.json(obj);
  })

  router.get('*', function(req, res) {
    res.end('all return');
  });
}