

'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Schema
 */
var taskSchema = new Schema({
  taskId: Number,
  title: String,
  description: String,
  due: Date
});

var userSchema = new Schema({
  name: {
    type: String,
    default:'',
    trim: true
  },
  age: Number,
  home: String,
  location: [],
  projects: {
    id: Number,
    name: String
  },
  tasks: taskSchema,
  registered_date: Date,
  last_seen: Number,
  active: Number,
  roles: []
});

mongoose.model('User', userSchema);