'use strict';

const mongoose = require('bluebird').promisifyAll(require('mongoose'));
const autoIncrement = require('mongoose-auto-increment');

var ProviderSchema = new mongoose.Schema({
    _id: Number,
    name: { type: String, required: true },
    image: { type: String, default: 'http://cdn2.saveritemedical.com/product-default.jpg' },
    description: String
});

ProviderSchema.plugin(autoIncrement.plugin, 'Provider');

export default mongoose.model('Provider', ProviderSchema);
