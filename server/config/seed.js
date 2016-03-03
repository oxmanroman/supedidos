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
    description: 'Desde productos del hogar hasta ingredientes para cocinar',
    color: '#009688',
    image: 'http://www.apertura.com/export/sites/revistaap/img/SUPERMERCADOS/supermercado_dos.jpg_977672561.jpg'
}, {
    name: 'Verdulerías',
    description: 'Frutas, verduras y más, todo fresco',
    color: '#4CAF50',
    image: 'http://www.fns.usda.gov/sites/default/files/images/schooltoolkit_fv.jpg'
}, {
    name: 'Pescaderías',
    description: 'Todo el pescado del planeta',
    color: '#2196F3',
    image: 'http://www.elarco.es/upload/sample_08.jpg'
}, {
    name: 'Carnicerías',
    description: 'Carnes y más',
    color: '#FF5722',
    image: 'http://www.cafexmedio.com.ar/images/carniceriaG.jpg'
}, {
    name: 'Fiambrerías',
    description: 'Jamón, queso, lomo, todo lo que necesites',
    color: '#E91E63',
    image: 'http://www.guiagustosa.com/images/550ancho/15.jpg'
}]);

seed(Market, [{
    name: 'Li Yuan Pun',
    description: 'El mejor súpermercado en la mejor zona, lo que quieras en tiempo record',
    category: 1,
    address: 'Nicaragua 5518, Palermo',
    phone: '4595-9875',
    location: { type: 'Point', coordinates: [-34.582211, -58.432834]},
    schedule: [
        { dayOfWeek: 1, opening: 800, closing: 1700 },
        { dayOfWeek: 2, opening: 800, closing: 1700 },
        { dayOfWeek: 3, opening: 800, closing: 1700 },
        { dayOfWeek: 4, opening: 800, closing: 1700 },
        { dayOfWeek: 5, opening: 800, closing: 1700 },
        { dayOfWeek: 6, opening: 800, closing: 1200 }
    ]
}, {
    name: 'La esquina de Juan',
    description: 'El mejor súpermercado en la mejor zona, lo que quieras en tiempo record',
    category: 2,
    address: 'Carranza 2045, Palermo',
    phone: '4595-9875',
    location: { type: 'Point', coordinates: [-34.579551, -58.434979]},
    schedule: [
        { dayOfWeek: 1, opening: 800, closing: 1700 },
        { dayOfWeek: 2, opening: 800, closing: 1700 },
        { dayOfWeek: 3, opening: 800, closing: 1700 },
        { dayOfWeek: 4, opening: 800, closing: 1700 },
        { dayOfWeek: 5, opening: 800, closing: 1700 },
        { dayOfWeek: 6, opening: 800, closing: 1200 }
    ]
}, {
    name: 'Carlitos',
    description: 'El mejor súpermercado en la mejor zona, lo que quieras en tiempo record',
    category: 2,
    address: 'Blanco Encalada 5299, Villa Urquiza',
    phone: '4595-9875',
    location: { type: 'Point', coordinates: [-34.576851, -58.488956]},
    schedule: [
        { dayOfWeek: 1, opening: 800, closing: 1700 },
        { dayOfWeek: 2, opening: 800, closing: 1700 },
        { dayOfWeek: 3, opening: 800, closing: 1700 },
        { dayOfWeek: 4, opening: 800, closing: 1700 },
        { dayOfWeek: 5, opening: 800, closing: 1700 },
        { dayOfWeek: 6, opening: 800, closing: 1200 }
    ]
}, {
    name: 'Rosa',
    description: 'El mejor súpermercado en la mejor zona, lo que quieras en tiempo record',
    category: 2,
    address: 'Bauness 2205, Villa Urquiza',
    phone: '4595-9875',
    location: { type: 'Point', coordinates: [-34.579551, -58.434979]},
    schedule: [
        { dayOfWeek: 1, opening: 800, closing: 1700 },
        { dayOfWeek: 2, opening: 800, closing: 1700 },
        { dayOfWeek: 3, opening: 800, closing: 1700 },
        { dayOfWeek: 4, opening: 800, closing: 1700 },
        { dayOfWeek: 5, opening: 800, closing: 1700 },
        { dayOfWeek: 6, opening: 800, closing: 1200 }
    ]
}, {
    name: 'Los Bambinos',
    description: 'El mejor súpermercado en la mejor zona, lo que quieras en tiempo record',
    category: 2,
    address: 'Franklin D. Roosevelt 5227, Villa Urquiza',
    phone: '4595-9875',
    location: { type: 'Point', coordinates: [-34.574487, -58.488732]},
    schedule: [
        { dayOfWeek: 1, opening: 800, closing: 1700 },
        { dayOfWeek: 2, opening: 800, closing: 1700 },
        { dayOfWeek: 3, opening: 800, closing: 1700 },
        { dayOfWeek: 4, opening: 800, closing: 1700 },
        { dayOfWeek: 5, opening: 800, closing: 1700 },
        { dayOfWeek: 6, opening: 800, closing: 1200 }
    ]
}, {
    name: 'San Manuel',
    description: 'El mejor súpermercado en la mejor zona, lo que quieras en tiempo record',
    category: 5,
    address: 'Gral. José Gervasio Artigas 5153, Villa Urquiza',
    phone: '4595-9875',
    location: { type: 'Point', coordinates: [-34.579715, -58.500900]},
    schedule: [
        { dayOfWeek: 1, opening: 800, closing: 1700 },
        { dayOfWeek: 2, opening: 800, closing: 1700 },
        { dayOfWeek: 3, opening: 800, closing: 1700 },
        { dayOfWeek: 4, opening: 800, closing: 1700 },
        { dayOfWeek: 5, opening: 800, closing: 1700 },
        { dayOfWeek: 6, opening: 800, closing: 1200 }
    ]
}, {
    name: 'Don Carlos',
    description: 'El mejor súpermercado en la mejor zona, lo que quieras en tiempo record',
    category: 1,
    address: 'Bauness 2697, Villa Urquiza',
    phone: '4595-9875',
    location: { type: 'Point', coordinates: [-34.572397, -58.489385]},
    schedule: [
        { dayOfWeek: 1, opening: 800, closing: 1700 },
        { dayOfWeek: 2, opening: 800, closing: 1700 },
        { dayOfWeek: 3, opening: 800, closing: 1700 },
        { dayOfWeek: 4, opening: 800, closing: 1700 },
        { dayOfWeek: 5, opening: 800, closing: 1700 },
        { dayOfWeek: 6, opening: 800, closing: 1200 }
    ]
}, {
    name: 'Carrefour Express',
    description: 'El mejor súpermercado en la mejor zona, lo que quieras en tiempo record',
    category: 1,
    address: 'Av Olazábal 5179, Villa Urquiza',
    phone: '0800-444-8484',
    location: { type: 'Point', coordinates: [-34.576665, -58.486537]},
    image: 'http://www.hausgroupsa.com.ar/grandesobras/carrefour_02.jpg',
    schedule: [
        { dayOfWeek: 1, opening: 830, closing: 2100 },
        { dayOfWeek: 2, opening: 830, closing: 2100 },
        { dayOfWeek: 3, opening: 830, closing: 2100 },
        { dayOfWeek: 4, opening: 830, closing: 2100 },
        { dayOfWeek: 5, opening: 830, closing: 2100 },
        { dayOfWeek: 6, opening: 830, closing: 2100 },
        { dayOfWeek: 7, opening: 1100, closing: 2000 }
    ]
}, {
    name: 'Verdulería de Juan',
    description: 'El mejor súpermercado en la mejor zona, lo que quieras en tiempo record',
    category: 2,
    address: 'Carranza 2045',
    phone: '4595-9875',
    location: { type: 'Point', coordinates: [-34.579551, -58.434979]},
    schedule: [
        { dayOfWeek: 1, opening: 800, closing: 1700 },
        { dayOfWeek: 2, opening: 800, closing: 1700 },
        { dayOfWeek: 3, opening: 800, closing: 1700 },
        { dayOfWeek: 4, opening: 800, closing: 1700 },
        { dayOfWeek: 5, opening: 800, closing: 1700 },
        { dayOfWeek: 6, opening: 800, closing: 1200 }
    ]
}, {
    name: 'Verdulería de Juan',
    description: 'El mejor súpermercado en la mejor zona, lo que quieras en tiempo record',
    category: 2,
    address: 'Carranza 2045',
    phone: '4595-9875',
    location: { type: 'Point', coordinates: [-34.579551, -58.434979]},
    schedule: [
        { dayOfWeek: 1, opening: 800, closing: 1700 },
        { dayOfWeek: 2, opening: 800, closing: 1700 },
        { dayOfWeek: 3, opening: 800, closing: 1700 },
        { dayOfWeek: 4, opening: 800, closing: 1700 },
        { dayOfWeek: 5, opening: 800, closing: 1700 },
        { dayOfWeek: 6, opening: 800, closing: 1200 }
    ]
}, {
    name: 'Verdulería de Juan',
    description: 'El mejor súpermercado en la mejor zona, lo que quieras en tiempo record',
    category: 2,
    address: 'Carranza 2045',
    phone: '4595-9875',
    location: { type: 'Point', coordinates: [-34.579551, -58.434979]},
    schedule: [
        { dayOfWeek: 1, opening: 800, closing: 1700 },
        { dayOfWeek: 2, opening: 800, closing: 1700 },
        { dayOfWeek: 3, opening: 800, closing: 1700 },
        { dayOfWeek: 4, opening: 800, closing: 1700 },
        { dayOfWeek: 5, opening: 800, closing: 1700 },
        { dayOfWeek: 6, opening: 800, closing: 1200 }
    ]
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
