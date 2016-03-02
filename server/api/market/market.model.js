'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose')),
    autoIncrement = require('mongoose-auto-increment');

var MarketSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    category: { type: Number, required: true },
    address: { type: String, required: true},
    location: { type: { type: String }, coordinates: [] }
});

MarketSchema.index({ location: '2dsphere' });

MarketSchema.plugin(autoIncrement.plugin, 'Market');

export default mongoose.model('Market', MarketSchema);
