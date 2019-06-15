'use strict';

const express = require('express');
const bookmarks = require('./bookmarks');
const logger = require('./logger');
const uuid = require('uuid');

// console.log('logger', logger);

const bookmarkRouter = express.Router();
const bodyParser = express.json();
// app.use( function bodyParser(req, res, next) {

//   // if (!req.body)
// })

// TODO: error handling
// get all bookmarks
bookmarkRouter
  .route('/')
  .get((req, res, next) => {
    res.json(bookmarks);
  })
  .post(bodyParser, (req, res, next) => {
    const newBookmark = req.body;
    if (Object.keys(newBookmark).length === 0) {
      logger.error = 'No bookmark data included';
      return res.status(400).end();
    }
    
    // VALIDATE THAT REQ FIELDS ARE PROVIDED
    if (!newBookmark.title) {
      logger.error = 'Title required';
      return res.status(400).end();
    }
    
    if (!newBookmark.url) {
      logger.error = 'url required';
      return res.status(400).end();
    }

    if (!newBookmark.rating) {
      newBookmark.rating = '';
    } else if (!newBookmark.desc) {
      newBookmark.desc = '';
    }
     
    // if ()
    // create id for valid bookmark
    newBookmark.id = uuid();
    bookmarks.push(newBookmark);
    // bookmark valid, add to list
    logger.info(`bookmark with id ${newBookmark.id} added`);
    res.status(201).json(`bookmark with id ${newBookmark.id} added`);
  });

// get bookmark by id
bookmarkRouter.route('/:id')
  .get( (req, res, next) => {
    // console.log(req.params);
    const bookmarkId = req.params.id;
    const bookmark = bookmarks.find( bookmark => bookmarkId == bookmark.id );
    if (!bookmark) {
      logger.error = `Bookmark with id ${bookmarkId} not found.`;
      return res.status(404).send('Bookmark not found');  
    }
    return res.json(bookmark);
  })
  .delete( (req, res, next) => {
    const bookmarkId = req.params.id;
    const bookmarkIdx = bookmarks.findIndex( bookmark => bookmarkId == bookmark.id );
    if (bookmarkIdx === -1) {
      // console.error??
      logger.error = `Bookmark with id ${bookmarkId} not found.`;
      return res.status(404).send('Bookmark not found');  
    }
    bookmarks.splice(bookmarkIdx, 1);
    logger.info = `List with id ${bookmarkId} deleted.`;
    return res.status(204).end();
  });



  
module.exports = bookmarkRouter;
