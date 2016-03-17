'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose')),
    autoIncrement = require('mongoose-auto-increment');

var MarketCategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    color: String,
    image: String,
    productCategories: [{type: Number, ref: 'ProductCategory'}],
    markets: [{type: Number, ref: 'Market'}]
});

MarketCategorySchema.path('color').validate((value) => {
    return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value);
}, 'Invalid color');

MarketCategorySchema.plugin(autoIncrement.plugin, 'MarketCategory');

export default mongoose.model('MarketCategory', MarketCategorySchema);
