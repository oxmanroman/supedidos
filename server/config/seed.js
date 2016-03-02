/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Category from '../api/category/category.model';
import Market from '../api/market/market.model';
import User from '../api/user/user.model';

function seed(model, data) {
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

seed(Category, [{
    name: 'Súpermercados',
    description: 'Desde productos del hogar hasta ingredientes para cocinar'
}, {
    name: 'Verdulerías',
    description: 'Frutas, verduras y más, todo fresco'
}, {
    name: 'Pescaderías',
    description: 'Todo el pescado del planeta'
}, {
    name: 'Carnicerías',
    description: 'Carnes y más'
}, {
    name: 'Fiambrerías',
    description: 'Jamón, queso, lomo, todo lo que necesites'
}]);

seed(Market, [{
    name: 'Súpermercado chino',
    description: 'El mejor súpermercado en la mejor zona, lo que quieras en tiempo record',
    category: 1,
    address: 'Nicaragua 5518',
    location: { type: 'Point', coordinates: [-34.582211, -58.432834]}
}, {
    name: 'Verdulería de Juan',
    description: 'El mejor súpermercado en la mejor zona, lo que quieras en tiempo record',
    category: 2,
    address: 'Carranza 2045',
    location: { type: 'Point', coordinates: [-34.579551, -58.434979]}
}, {
    name: 'Verdulería de Juan',
    description: 'El mejor súpermercado en la mejor zona, lo que quieras en tiempo record',
    category: 2,
    address: 'Carranza 2045',
    location: { type: 'Point', coordinates: [-34.579551, -58.434979]}
}, {
    name: 'Verdulería de Juan',
    description: 'El mejor súpermercado en la mejor zona, lo que quieras en tiempo record',
    category: 2,
    address: 'Carranza 2045',
    location: { type: 'Point', coordinates: [-34.579551, -58.434979]}
}, {
    name: 'Verdulería de Juan',
    description: 'El mejor súpermercado en la mejor zona, lo que quieras en tiempo record',
    category: 2,
    address: 'Carranza 2045',
    location: { type: 'Point', coordinates: [-34.579551, -58.434979]}
}, {
    name: 'Verdulería de Juan',
    description: 'El mejor súpermercado en la mejor zona, lo que quieras en tiempo record',
    category: 2,
    address: 'Carranza 2045',
    location: { type: 'Point', coordinates: [-34.579551, -58.434979]}
}, {
    name: 'Verdulería de Juan',
    description: 'El mejor súpermercado en la mejor zona, lo que quieras en tiempo record',
    category: 2,
    address: 'Carranza 2045',
    location: { type: 'Point', coordinates: [-34.579551, -58.434979]}
}, {
    name: 'Verdulería de Juan',
    description: 'El mejor súpermercado en la mejor zona, lo que quieras en tiempo record',
    category: 2,
    address: 'Carranza 2045',
    location: { type: 'Point', coordinates: [-34.579551, -58.434979]}
}, {
    name: 'Verdulería de Juan',
    description: 'El mejor súpermercado en la mejor zona, lo que quieras en tiempo record',
    category: 2,
    address: 'Carranza 2045',
    location: { type: 'Point', coordinates: [-34.579551, -58.434979]}
}, {
    name: 'Verdulería de Juan',
    description: 'El mejor súpermercado en la mejor zona, lo que quieras en tiempo record',
    category: 2,
    address: 'Carranza 2045',
    location: { type: 'Point', coordinates: [-34.579551, -58.434979]}
}, {
    name: 'Verdulería de Juan',
    description: 'El mejor súpermercado en la mejor zona, lo que quieras en tiempo record',
    category: 2,
    address: 'Carranza 2045',
    location: { type: 'Point', coordinates: [-34.579551, -58.434979]}
}]);

seed(User, [{
  provider: 'local',
  name: 'Test User',
  email: 'test@example.com',
  password: 'test'
}, {
  provider: 'local',
  role: 'admin',
  name: 'Admin',
  email: 'admin@example.com',
  password: 'admin'
}]);
