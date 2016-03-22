'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose')),
    autoIncrement = require('mongoose-auto-increment');

var OrderSchema = new mongoose.Schema({
    _id: Number,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    cancelled: { type: Boolean, default: false },
    price: Number,
    market: { type: Number, ref: 'Market' },
    location: { type: { type: String }, coordinates: [] },
    address: { type: String, required: true},
    phone: String,
    products: [String]
});

OrderSchema.index({ location: '2dsphere' });

OrderSchema.plugin(autoIncrement.plugin, 'Order');

export default mongoose.model('Order', OrderSchema);
