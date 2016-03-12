var mongoose = require('mongoose');
var Name = mongoose.model('Name');
var User = mongoose.model('User');
var State = mongoose.model('State');
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
  getName: function(req, res){
    Name.findOne({_id:req.params.id}, function(err, name){
      if(err){
        console.log('Error in get Names');
        res.json({status: 'error'})
      }else{
        res.json(name)
      }
    })
  },
  updateName: function(req, res){
    Name.update({_id:req.body._id},{name:req.body.name}, function(err, name){
      if(err){
        console.log('Error in update Names');
        res.json({status: 'error'})
      }else{
        res.json(name)
      }
    })
  },
  deleteName: function(req, res){
    Name.remove({_id:req.params.id}, function(err, name){
      if(err){
        console.log('Error in delete Name');
        res.json({status: 'error'})
      }else{
        res.json(name)
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
