/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Market from '../api/market/market.model';
import User from '../api/user/user.model';

Market.find({}).removeAsync()
  .then(() => {
    Market.create({
      name: 'Súpermercado chino',
      description: 'El mejor súpermercado en la mejor zona, lo que quieras en tiempo record'
    }, {
      name: 'Verdulería de Juan',
      description: 'El mejor súpermercado en la mejor zona, lo que quieras en tiempo record'
    }, {
      name: 'Verdulería de Juan',
      description: 'El mejor súpermercado en la mejor zona, lo que quieras en tiempo record'
    }, {
      name: 'Verdulería de Juan',
      description: 'El mejor súpermercado en la mejor zona, lo que quieras en tiempo record'
    }, {
      name: 'Verdulería de Juan',
      description: 'El mejor súpermercado en la mejor zona, lo que quieras en tiempo record'
    }, {
      name: 'Verdulería de Juan',
      description: 'El mejor súpermercado en la mejor zona, lo que quieras en tiempo record'
    }, {
      name: 'Verdulería de Juan',
      description: 'El mejor súpermercado en la mejor zona, lo que quieras en tiempo record'
    }, {
      name: 'Verdulería de Juan',
      description: 'El mejor súpermercado en la mejor zona, lo que quieras en tiempo record'
    }, {
      name: 'Verdulería de Juan',
      description: 'El mejor súpermercado en la mejor zona, lo que quieras en tiempo record'
    }, {
      name: 'Verdulería de Juan',
      description: 'El mejor súpermercado en la mejor zona, lo que quieras en tiempo record'
    }, {
      name: 'Verdulería de Juan',
      description: 'El mejor súpermercado en la mejor zona, lo que quieras en tiempo record'
    }).then(() => {
      console.log('finished populating markets');
    });
  });

User.find({}).removeAsync()
  .then(() => {
    User.createAsync({
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
    })
    .then(() => {
      console.log('finished populating users');
    });
  });
