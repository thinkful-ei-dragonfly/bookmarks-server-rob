/* eslint-disable no-console */
/* eslint-disable strict */
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const winston = require('winston');
const bookmarks = require('./bookmarks');
const bookmarkRouter = require('./bookmark-router');
const logger = require('./logger')

const app = express();

const morganOption = (NODE_ENV === 'production') ? 'tiny' : 'dev'; // change dev back to common??

app.use(morgan(morganOption));
app.use(cors());
app.use(helmet());

// logger.info('am i working');

// does the user's API Key match?
app.use( function validateBearerToken(req, res, next) {
  const apiKey = process.env.API_KEY;
  const authKey = req.get('Authorization');
  if ( !authKey || apiKey !== authKey.split(' ')[1] ) {
    /**  TODO: not sure logger is working */
    logger.error(`Unauthorized request to path: ${req.path}`);
    return res.status(401).json({error: 'Unauthorized request'});
  }
  next(); // is next here?? need param??
});

// BEGIN SENDING REQUESTS TO bookmark router
app.use('/bookmarks', bookmarkRouter);

// error handling
app.use(function generalErrorHandler(req, res, next) {
  let response;
  if (NODE_ENV === 'production') {
    response = { error: { message: 'server error' } };
  } else {
    console.error(logger.error);
    // LOGGER INFO???? HOW TO GET TO LOG???
    response = { message: logger.error };
  }
  res.status(400).json(response);
});


app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === 'production') {
  // 
    response = { error: { message: 'server error' } };
  } else {
    console.error(error);
    logger.info(error); // necessary??
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});

module.exports = app;
