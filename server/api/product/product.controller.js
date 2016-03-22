/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/products              ->  index
 * POST    /api/products              ->  create
 * GET     /api/products/:id          ->  show
 * PUT     /api/products/:id          ->  update
 * DELETE  /api/products/:id          ->  destroy
*/

'use strict';

import _ from 'lodash';
var Market = require('../market/market.model');
var Product = require('./product.model');
var ProductCategory = require('../product-category/product-category.model');

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

function findNearMarkets(req) {
    return Market
        .aggregate()
        .near({
            near: {
                type: "Point",
                coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]
            },
            distanceField: "distance", // required
            // "maxDistance": 10000 // distance in meters,
            spherical: true
        })
        .sort('-distance') // Sort nearest first
        .match({
            category: 0
        })
        .exec();
}

function populateMarketsProductsByCategory(category) {
    return function(markets) {
        // Populate markets with product categories
        var productFields = 'name barcode description category price';
        return Product.populate(markets, {
            match: {category: category},
            path: 'products',
            select: productFields
        });
    }
}

function flattenMarketsProducts(markets) {
    return _.uniqBy(_.flatten(markets.map(function(market) {
        return market.products;
    })), 'barcode');
}

// Gets a list of Products
export function index(req, res) {
    // Handle errors
    if (!req.query.lat || !req.query.lng) {
        return res.status(400).send('Must send coordinates to bring products near your zone');
    }

    findNearMarkets(req)
        .then(handleEntityNotFound(res))
        .then(populateMarketsProductsByCategory(req.query.category))
        .then(flattenMarketsProducts)
        .then(responseWithResult(res))
        .catch(handleError(res));
}

// Gets a single Product from the DB
export function show(req, res) {
    Product.findByIdAsync(req.params.id)
          .then(handleEntityNotFound(res))
          .then(responseWithResult(res))
          .catch(handleError(res));
}

// Creates a new Product in the DB
export function create(req, res) {
    Product.createAsync(req.body)
          .then(responseWithResult(res, 201))
          .catch(handleError(res));
}

// Updates an existing Product in the DB
export function update(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    Product.findByIdAsync(req.params.id)
          .then(handleEntityNotFound(res))
          .then(saveUpdates(req.body))
          .then(responseWithResult(res))
          .catch(handleError(res));
}

// Deletes a Product from the DB
export function destroy(req, res) {
    Product.findByIdAsync(req.params.id)
          .then(handleEntityNotFound(res))
          .then(removeEntity(res))
          .catch(handleError(res));
}
