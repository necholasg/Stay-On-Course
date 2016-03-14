var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
  _user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  company_name: String,
  job_title: String,
  location: String,
  salary: String,
  status: String,
  url: String,
  notes: String,
  index: Number,
  created_at: { type: Date, default: Date.now }
})
mongoose.model('Post', postSchema);
