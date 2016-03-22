/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/markets              ->  index
 * POST    /api/markets              ->  create
 * GET     /api/markets/:id          ->  show
 * PUT     /api/markets/:id          ->  update
 * DELETE  /api/markets/:id          ->  destroy
*/

'use strict';

import _ from 'lodash';
var Market = require('./market.model');
var MarketCategory = require('../market-category/market-category.model');
var Order = require('../order/order.model');
var Product = require('../product/product.model');

function handleError(res, statusCode) {
    statusCode = statusCode || 500;
    return function(err) {
        res.status(statusCode).send(err);
    };
}

function responseWithResult(res, statusCode) {
    statusCode = statusCode || 200;
    return function(entity) {
        if (entity) {
            res.status(statusCode).json(entity);
        }
    };
}

function handleEntityNotFound(res) {
    return function(entity) {
        if (!entity) {
            res.status(404).end();
            return null;
        }
        return entity;
    };
}

function saveUpdates(updates) {
    return function(entity) {
        var updated = _.merge(entity, updates);
        return updated.saveAsync().spread(updated => {
            return updated;
        });
    };
}

function removeEntity(res) {
    return function(entity) {
        if (entity) {
            return entity.removeAsync().then(() => {
                res.status(204).end();
            });
        }
    };
}

function getLimit(limit, def, max) {
    var limitNumber = Number(limit);
    return limitNumber ? (limitNumber > max ? max : limitNumber) : def;
}

// Gets a list of Markets
export function index(req, res) {
    var categoryFields = 'name color image';
    if (req.query.lat && req.query.lng) {
        Market.geoNear(
            {
                coordinates: [
                    Number(req.query.lat),
                    Number(req.query.lng)
                ],
                type: 'Point'
            },
            {
                spherical: true,
                limit: getLimit(req.query.limit, 20, 20)
            },
            function(err, data) {
                if (err) {
                    handleError(res);
                }

                MarketCategory.populate( data, { path: 'obj.category', select: categoryFields }, function(err, populatedData) {
                    if (err) res.json(err);

                    var markets = populatedData.map(function(market) {
                        var parsed = market.obj.toJSON();
                        parsed.distance = market.dis;
                        return parsed;
                    });
                    return res.json(markets);
                });
            }
        );
    } else {
        Market.find()
              .populate('category', categoryFields)
              .limit(getLimit(req.query.limit, 5, 20))
              .execAsync()
              .then(responseWithResult(res))
              .catch(handleError(res));
    }
}

function getOrderMarkets(order) {
    // Get markets near your zone
    return Market
        .aggregate()
        .near({
            near: {
                type: "Point",
                coordinates: order.location.coordinates
            },
            distanceField: "distance", // required
            maxDistance: 10000, // distance in meters
            spherical: true
        })
        .sort('-distance') // Sort nearest first
        .exec()
        .then(function(markets) {
            order.markets = markets;
            return order;
        });
}

function populateOrderMarketsProducts(path) {
    return function(order) {
        // Populate markets with products
        return Product.populate(order.markets, {
            path: path,
            select: 'name price barcode'
        }).then(function(populatedMarkets) {
            order.markets = populatedMarkets;
            return order;
        });
    }
}

function getOrderMarketsPrice(order) {
    return _.assign(
        {},
        _.omit(order, 'markets'),
        {
            markets: order.markets.map(function(market) {
                market.price = order.products.reduce(function(acc, curr) {
                    var marketProduct = _.find(market.products, ['barcode', curr]);
                    if (marketProduct) {
                        return acc + marketProduct.price;
                    }
                    return acc;
                }, 0);
                return market;
            })
        }
    )
}

function getOrderMarketsMissingProducts(order) {
    return _.assign(
        {},
        _.omit(order, 'markets'),
        {
            markets: order.markets.map(function(market) {
                market.missingProducts = order.products.reduce(function(acc, curr) {
                    var marketProduct = _.find(market.products, ['barcode', curr]);
                    if (!marketProduct) {
                        acc.push(curr);
                    }
                    return acc;
                }, []);
                return market;
            })
        }
    )
}

/**
 * Clean order markets that doesn't have any product of the order list
 */
function removeOrderUselessMarkets(order) {
    return _.assign(
        {},
        _.omit(order, 'markets'),
        {
            markets: order.markets.filter(function(market) {
                return market.missingProducts.length < order.products.length;
            })
        }
    )
}

function getFastest(markets) {
    return markets.reduce(function(fastest, curr) {
        if (!fastest.deliveryTime || curr.deliveryTime < fastest.deliveryTime) {
            return curr;
        }
        return fastest;
    });
}

/**
 * Evaluates cheapest market taking in count percentage of missing items of list
 * try to get cheapest market of all markets with at least 10% of items requested,
 * if there is no market at that range, try with 20%, then 30%, 40%, etc.
 */
function sortOrderMarketsByPrice(order) {
    // ranges is a bidimensional array for each range of items requested
    // first position represents 0% to 10%
    // second position 10% to 20%
    // and like this
    // in each range it contains the markets in that range, that's why it's bidimensional
    var ranges = Array(10).fill(undefined).map(function() {
        return [];
    });

    // Fill ranges array with each market in its corresponding position
    order.markets.forEach(function(market) {
        var range = Math.floor(market.missingProducts.length * 10 / order.products.length);
        ranges[range].push(market);
    });

    // Order markets in ranges by price
    var orderedRanges = ranges.map(function(range) {
        return range.sort(function(a, b) {
            var shared = _.difference(
                order.products,
                a.missingProducts,
                b.missingProducts
            );
            var sharedPriceA = shared.reduce(function(acc, curr) {
                var marketProduct = _.find(a.products, ['barcode', curr]);
                if (marketProduct) {
                    return acc + marketProduct.price;
                }
                return acc;
            }, 0);
            var sharedPriceB = shared.reduce(function(acc, curr) {
                var marketProduct = _.find(b.products, ['barcode', curr]);
                if (marketProduct) {
                    return acc + marketProduct.price;
                }
                return acc;
            }, 0);
            return sharedPriceA - sharedPriceB;
        });
    });

    // Flatten ranges and return
    return _.flatten(orderedRanges);
}

function evaluateOrderMarkets(order) {
    // Return fastest, cheapest and list
    var ordered = sortOrderMarketsByPrice(order);

    return _.concat(ordered[0], getFastest(order.markets), _.tail(ordered));
}

function shrinkMarkets(properties) {
    return function(markets) {
        return markets.map(_.partial(_.pick, _, properties));
    }
}

// Gets a list of Markets for order
export function indexForOrder(req, res) {
    Order.findById(req.params.id)
         .lean()
         .execAsync()
         .then(handleEntityNotFound(res))
         .then(getOrderMarkets)
         .then(populateOrderMarketsProducts('products'))
         .then(getOrderMarketsPrice)
         .then(getOrderMarketsMissingProducts)
         .then(removeOrderUselessMarkets)
        //  .then(populateOrderMarketsProducts('missingProducts'))
         .then(evaluateOrderMarkets)
         .then(shrinkMarkets([
             '_id',
             'name',
             'description',
             'deliveryTime',
             'minOrder',
             'distance',
             'image',
             'price',
             'missingProducts'
         ]))
         .then(responseWithResult(res))
         .catch(handleError(res));
}

// Gets a single Market from the DB
export function show(req, res) {
    Market.findByIdAsync(req.params.id)
          .then(handleEntityNotFound(res))
          .then(responseWithResult(res))
          .catch(handleError(res));
}

// Creates a new Market in the DB
export function create(req, res) {
    Market.createAsync(req.body)
          .then(responseWithResult(res, 201))
          .catch(handleError(res));
}

// Updates an existing Market in the DB
export function update(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    Market.findByIdAsync(req.params.id)
          .then(handleEntityNotFound(res))
          .then(saveUpdates(req.body))
          .then(responseWithResult(res))
          .catch(handleError(res));
}

// Deletes a Market from the DB
export function destroy(req, res) {
    Market.findByIdAsync(req.params.id)
          .then(handleEntityNotFound(res))
          .then(removeEntity(res))
          .catch(handleError(res));
}
