var mongoose = require('mongoose');
var fs = require('fs');
var path = require('path');

mongoose.connect('mongodb://heroku_0fvw2hcd:3fenrq3jp6qqhmgaqsptq7ac1e@ds013738.mlab.com:13738/heroku_0fvw2hcd');

var models_path = path.join(__dirname, './../models');

fs.readdirSync(models_path).forEach(function(file){
  if(file.indexOf('.js') >= 0){
    require(models_path + '/' + file);
  }
});
