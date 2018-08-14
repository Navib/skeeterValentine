const mongoose = require('mongoose');
const PostServices = require('../controllers/posts');

module.exports = app => {
  app.get('/test', (req, res) => {
    PostServices.addPost(req, res);
  });
};
