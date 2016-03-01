'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose')),
    autoIncrement = require('mongoose-auto-increment');

var MarketSchema = new mongoose.Schema({
    name: String,
    description: String
});

MarketSchema.plugin(autoIncrement.plugin, 'Market');

export default mongoose.model('Market', MarketSchema);
