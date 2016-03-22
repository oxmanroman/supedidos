/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

import _ from 'lodash';

import ProductCategory from '../../api/product-category/product-category.model';
import Product from '../../api/product/product.model';
import MarketCategory from '../../api/market-category/market-category.model';
import Market from '../../api/market/market.model';
import User from '../../api/user/user.model';

import productsSeed from './products';
import productCategoriesSeed from './product-categories';
import marketCategoriesSeed from './market-categories';
import marketsSeed from './markets';
import usersSeed from './users';

var reset = false;

function seedFn(model, data) {
    model.count((err, count) => {
        if (count === 0) {
            model.resetCount(() => {
                model.createAsync(data).then(() => {
                    console.log('Finished populating ' + model.modelName);
                });
            });
        }
    });
}

var seed;
if (reset) {
    seed = function(model, data) {
        model.find({}).removeAsync().then(_.partial(seedFn, model, data));
    }
} else {
    seed = seedFn;
}

seed(ProductCategory, productCategoriesSeed.list);
seed(Product, productsSeed.list);
seed(MarketCategory, marketCategoriesSeed.list);
seed(Market, marketsSeed.list);
seed(User, usersSeed.list);
