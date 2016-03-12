var mongoose = require('mongoose');


var stateSchema = new mongoose.Schema({
  states: {}
})
mongoose.model('State', stateSchema);
