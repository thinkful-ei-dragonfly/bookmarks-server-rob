'use strict';

const express = require('express');
const bookmarks = require('./bookmarks');

const bookmarkRouter = express.Router();

// cardRouter.get()
//

bookmarkRouter.route('/').get((req, res, next) => {
  res.json(bookmarks);
});

module.exports = bookmarkRouter;
