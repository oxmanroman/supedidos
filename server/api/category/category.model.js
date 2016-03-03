'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose')),
    autoIncrement = require('mongoose-auto-increment');

var CategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    color: String,
    image: String
});

CategorySchema.path('color').validate((value) => {
    return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value);
}, 'Invalid color');

CategorySchema.plugin(autoIncrement.plugin, 'Category');

export default mongoose.model('Category', CategorySchema);
