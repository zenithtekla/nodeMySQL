
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
  equipment_model: String,
  asset_number: String,
  location_id: Number,
  equipment_attributes: [{
    last_cal: Date ,
    schedule: Number ,
    next_cal: Date ,
    files: {
      name: String ,
      data: Buffer ,
      contentType: String
    }
  }],
  location: {
    id: Number,
    desc: String
  }
});

mongoose.model('User', Schema1);

/*
 An equipment has a model.
 Each model has its own attributes.

 equipment_model is a parent to equipment_attributes (children).


The collection above resembles the following:

[
  {
    "model": "brts32",
    "asset_number": "2",
    "location_id": 2,
    "ECMS_Attributes": [
      {
        "last_cal": "2012-08-22T07:00:00.000Z",
        "schedule": 3,
        "next_cal": "2013-08-22T07:00:00.000Z",
        "file": {
          "type": "Buffer",
          "data": [
            102,
            105,
            108,
            101,
            95,
            112,
            108,
            97,
            99,
            101,
            104,
            111,
            108,
            100,
            101,
            114
          ]
        }
      }
    ],
    "ECMS_Location": {
      "desc": "production"
    }
  },
  {
    "model": "brts32",
    "asset_number": "5",
    "location_id": 4,
    "ECMS_Attributes": [
      {
        "last_cal": "2012-08-22T07:00:00.000Z",
        "schedule": 3,
        "next_cal": "2013-08-22T07:00:00.000Z",
        "file": {
          "type": "Buffer",
          "data": [
            102,
            105,
            108,
            101,
            95,
            112,
            108,
            97,
            99,
            101,
            104,
            111,
            108,
            100,
            101,
            114
          ]
        }
      }
    ],
    "ECMS_Location": {
      "desc": "labroom"
    }
  }
]

*/