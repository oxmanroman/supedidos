'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose')),
    autoIncrement = require('mongoose-auto-increment');

var MarketSchema = new mongoose.Schema({
    _id: Number,
    name: { type: String, required: true },
    description: String,
    category: { type: Number, ref: 'Category', required: true },
    address: { type: String, required: true},
    phone: { type: String, required: true},
    location: { type: { type: String }, coordinates: [] },
    image: String,
    schedule: [{ dayOfWeek: Number, opening: Number, closing: Number }]
});

MarketSchema.index({ location: '2dsphere' });

MarketSchema.plugin(autoIncrement.plugin, 'Market');

export default mongoose.model('Market', MarketSchema);
