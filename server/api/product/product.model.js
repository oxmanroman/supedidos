'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose')),
    autoIncrement = require('mongoose-auto-increment');

var ProductSchema = new mongoose.Schema({
    _id: Number,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    name: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    barcode: { type: String, required: true },
    description: String,
    weight: String,
    category: { type: Number, ref: 'ProductCategory', required: true }
});

ProductSchema.plugin(autoIncrement.plugin, 'Product');

export default mongoose.model('Product', ProductSchema);
