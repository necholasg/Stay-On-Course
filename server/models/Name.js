var mongoose = require('mongoose');

var nameSchema = new mongoose.Schema({
  name: String,
  created_at: { type: Date, default: Date.now }
})
mongoose.model('Name', nameSchema);
