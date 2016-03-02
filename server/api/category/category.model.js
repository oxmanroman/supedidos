'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose')),
    autoIncrement = require('mongoose-auto-increment');

var CategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true }
});

CategorySchema.plugin(autoIncrement.plugin, 'Category');

export default mongoose.model('Category', CategorySchema);
