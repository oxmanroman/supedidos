'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose')),
    autoIncrement = require('mongoose-auto-increment');

var ProductCategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: String
});

ProductCategorySchema.plugin(autoIncrement.plugin, 'ProductCategory');

export default mongoose.model('ProductCategory', ProductCategorySchema);
