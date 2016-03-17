'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose')),
    autoIncrement = require('mongoose-auto-increment');

var MarketSchema = new mongoose.Schema({
    _id: Number,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    name: { type: String, required: true },
    description: String,
    category: { type: Number, ref: 'MarketCategory', required: true },
    address: { type: String, required: true},
    phone: { type: String, required: true, select: false },
    location: { type: { type: String }, coordinates: [] },
    image: String,
    schedule: [{ dayOfWeek: Number, opening: Number, closing: Number }],
    deliveryTime: Number,
    minOrder: Number,
    productCategories: [{type: Number, ref: 'ProductCategory'}],
    products: [{type: Number, ref: 'Product'}]
});

MarketSchema.index({ location: '2dsphere' });

MarketSchema.plugin(autoIncrement.plugin, 'Market');

MarketSchema.options.toJSON = {
    transform: function(market) {
        delete market.phone;
    }
};

export default mongoose.model('Market', MarketSchema);
