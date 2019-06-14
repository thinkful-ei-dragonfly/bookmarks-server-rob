'use strict';

const express = require('express');
const bookmarks = require('./bookmarks');
const logger = require('./logger');
const uuid = require('uuid');

const bookmarkRouter = express.Router();

// app.use( function bodyParser(req, res, next) {

//   // if (!req.body)
// })

// TODO: error handling
// get all bookmarks
bookmarkRouter.route('/').get((req, res, next) => {
  res.json(bookmarks);
});

// get bookmark by id
bookmarkRouter.route('/:id')
  .get( (req, res, next) => {
    console.log(req.params);
    const bookmarkId = req.params.id;
    const bookmark = bookmarks.find( bookmark => bookmarkId == bookmark.id );
    // probably dont need to check if ID exists since we are in path already
    if (!bookmark) {
      logger.error = `Bookmark with id ${bookmarkId} not found.`;
      return res.status(404).send('Bookmark not found');  
    }
    return res.json(bookmark);
  });


bookmarkRouter.route('/')
  .post( (req, res, next) => {
    if (!req.body) {
      logger.error = 'No bookmark data included';
      return res.status(400).end();
    }

    console.log(req.body);

    // if ()
  });

module.exports = bookmarkRouter;
