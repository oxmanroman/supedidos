'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose')),
    autoIncrement = require('mongoose-auto-increment');

var OrderSchema = new mongoose.Schema({
    _id: Number,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    cancelled: { type: Boolean, default: false },
    submitted: { type: Boolean, default: false },
    price: { type: Number },
    market: { type: Number, ref: 'Market' },
    products: [{type: Number, ref: 'Product'}]
});

OrderSchema.plugin(autoIncrement.plugin, 'Order');

export default mongoose.model('Order', OrderSchema);
