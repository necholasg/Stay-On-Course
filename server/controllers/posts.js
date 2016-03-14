var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var User = mongoose.model('User');
var passport = require('passport');
var jwt = require('express-jwt');
var secret = 'sauce';
var auth = jwt({secret: secret, userProperty: 'payload'});

module.exports = {

  getStates: function(req, res){
    State.find({}, function(err, states){
      if(err){
        console.log('Error in get states');
        res.json({status: 'error'})
      }else{
        // console.log(states);
        res.json(states)
      }
    })
  },
  newPost: function(req, res){
    var new_post = new Post(req.body)
    new_post.save(function(err, post){
      if(err){
        res.json({status:'error'})
      }else{
        res.json(post)
      }
    })
  },
  getPosts: function(req, res){
    Post.find({_user: req.params._id}, function(err, posts){
      if(err){
        console.log('Error in get Posts');
        res.json({status: 'error'})
      }else{
        res.json(posts)
      }
    })
  },

  getLast: function(req,res){
    Post.findOne({_user: req.params._id}, {}, { sort: { 'created_at' : -1 } }, function(err,post){
        if(err){
          console.log('Error in get Posts');
          res.json({status: 'error'})
        }
        else{
          res.json(post);
        }
    })
  },

  updatePost: function(req, res){
    console.log('HERE');
    Post.update({_id:req.body._id}, req.body, function(err, post){
      if(err){
        console.log('Error in update Posts');
        res.json({status: 'error'})
      }else{
        console.log(post);
        res.json(post)
      }
    })
  },
  deletePost: function(req, res){
    Post.remove({_id:req.params.id}, function(err, post){
      if(err){
        console.log('Error in delete Post');
        res.json({status: 'error'})
      }else{
        res.json(post)
      }
    })
  },

  newReg: function(req, res, next){
    if(!req.body.username || !req.body.password || !req.body.email){
      return res.status(400).json({message: 'Please fill out all fields'});
    }
    if(req.body.password !== req.body.confirm_password){
      return res.status(400).json({message: 'Passwords do not match'})
    }

    var user = new User();

    user.username = req.body.username;

    user.email = req.body.email;

    user.setPassword(req.body.password)

    user.save(function (err){
      if(err){ return next(err); }

      return res.json({token: user.generateJWT()})
    });
  },
  logIn: function(req, res, next){
    if(!req.body.username || !req.body.password){
      return res.status(400).json({message: 'Please fill out all fields'});
    }

    passport.authenticate('local', function(err, user, info){
      if(err){ return next(err); }

      if(user){
        return res.json({token: user.generateJWT()});
      } else {
        return res.status(401).json(info);
      }
    })(req, res, next);
  }
}
