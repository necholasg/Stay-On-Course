var mongoose = require('mongoose');
var Name = mongoose.model('Name');

module.exports = {
  newName: function(req, res){
    var new_name = new Name({name:req.body.name})

    new_name.save(function(err, name){
      if(err){
        res.json({status:'error'})
      }else{
        res.json(name)
      }
    })
  },
  getNames: function(req, res){
    Name.find({}, function(err, names){
      if(err){
        console.log('Error in get Names');
        res.json({status: 'error'})
      }else{
        res.json(names)
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
}
