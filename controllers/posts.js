const mongoose = require('mongoose');
const Post = mongoose.model('posts');

exports.addPost = (req, res) => {
  Post.findOne({ postID: '56789111' }, (err, existingPost) => {
    if (err) {
      throw err;
    }
    if (existingPost) {
      res.send({ message: 'exists' });
    } else {
      new Post({
        postID: 56789111,
        post: 'ivanCMS Rocks',
        title: 'Welcome to ivanCMS!',
        author: 'ibaena',
        category: ['home', 'welcome'],
        date: new Date()
      })
        .save()
        .then(post => res.send({ hit: post }));
    }
  });
};
