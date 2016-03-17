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
