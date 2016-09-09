
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Schema
 */

var Schema1 = new Schema({
  asset_number: String,
  last_cal: Date,
  schedule: Number,
  next_cal: Date,
  file: {
    data: Buffer,
    contentType: String
  },
  models: [{
    model: String,
    location: {
      id: Number,
      desc: String
    }
  }]
});

mongoose.model('User', Schema1);