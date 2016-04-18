/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

import _ from 'lodash';

import Provider from '../../api/provider/provider.model';
import User from '../../api/user/user.model';

import providersSeed from './providers';
import usersSeed from './users';

var reset = true;

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

seed(Provider, providersSeed.list);
seed(User, usersSeed.list);
