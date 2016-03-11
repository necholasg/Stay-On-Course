var use = require('../controllers/names.js');
var jwt = require('express-jwt');
var secret = 'sauce';
var auth = jwt({secret: secret, userProperty: 'payload'});

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

  app.post('/register', function(req, res, next){
    // console.log(req.body);
    angels.newReg(req, res, next)
  });

  app.post('/login', function(req, res, next){
    angels.logIn(req, res, next)
  });
}
