var use = require('../controllers/posts.js');
var jwt = require('express-jwt');
var secret = 'sauce';
var auth = jwt({secret: secret, userProperty: 'payload'});
var request = require('request');

module.exports = function(app){
  app.post('/newSearch', function(req, res){
    var pack = {};

    if(req.body.gitHub === true && req.body.dice === true){
      request('https://jobs.github.com/positions.json?description='+req.body.jobType+'&location='+req.body.location, function(err, data, body){

        pack.git = JSON.parse(body);
        if(req.body.dice === true){
          request('http://service.dice.com/api/rest/jobsearch/v1/simple.json?text='+req.body.jobType+'&city='+req.body.location+','+req.body.state, function(err, data, body){

            pack.dice = JSON.parse(body);
            res.json(pack)
          })
        }
      })
    }
    else if(req.body.gitHub === true && !req.body.dice === true){
      request('https://jobs.github.com/positions.json?description='+req.body.jobType+'&location='+req.body.location, function(err, data, body){

        res.json(JSON.parse(body));
      })
    }

    else if(!req.body.gitHub === true && req.body.dice === true){
      request('http://service.dice.com/api/rest/jobsearch/v1/simple.json?text='+req.body.jobType+'&city='+req.body.location+','+req.body.state, function(err, data, body){


        res.json(JSON.parse(body))
      })
    }


  });

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
