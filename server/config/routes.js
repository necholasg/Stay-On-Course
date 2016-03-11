var use = require('../controllers/names.js');

module.exports = function(app){
  app.post('/names/new', function(req, res){
    use.newName(req, res)
  });

  app.get('/names', function(req, res){
    use.getNames(req, res)
  });

  app.get('/name/:id', function(req, res){
    use.getName(req, res)
  });

  app.post('/name/edit/', function(req, res){
    use.updateName(req, res)
  });

  app.get('/name/delete/:id', function(req, res){
    use.deleteName(req, res)
  });

}
