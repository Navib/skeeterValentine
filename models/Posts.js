const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
  postID: Number,
  post: String,
  title: String,
  author: String,
  category: [],
  date: Date
});

mongoose.model('posts', postSchema);
