const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
require('./models/Posts');

mongoose.connect(keys.mongoURI);

const app = express();

require('./routes/postRoutes')(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('listening on port', PORT);
});
