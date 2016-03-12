var use = require('../controllers/posts.js');
var jwt = require('express-jwt');
var secret = 'sauce';
var auth = jwt({secret: secret, userProperty: 'payload'});

module.exports = function(app){
  app.post('/posts/new', function(req, res){
    use.newPost(req, res)
  });

  app.get('/posts/:_id', function(req, res){
    use.getPosts(req, res)
  });

  app.get('/lastpost/:_id',function(req,res){
    use.getLast(req,res)
  })

  app.post('/posts/edit/', function(req, res){
    use.updatePost(req, res)
  });

  app.get('/posts/delete/:id', function(req, res){
    use.deleteName(req, res)
  });

  app.post('/register', function(req, res, next){
    // console.log(req.body);
    use.newReg(req, res, next)
  });

  app.post('/login', function(req, res, next){
    use.logIn(req, res, next)
  });
}
