/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Market from '../api/market/market.model';
import MarketCategory from '../api/market-category/market-category.model';
import Product from '../api/product/product.model';
import ProductCategory from '../api/product-category/product-category.model';
import User from '../api/user/user.model';

function seed(model, data) {
    // model.find({}).removeAsync().then(() => {
    model.count((err, count) => {
        if (count === 0) {
            model.resetCount(() => {
                model.createAsync(data).then(() => {
                    console.log('Finished populating ' + model.modelName);
                });
            });
        }
    });
    // });
}

seed(MarketCategory, [{
    name: 'Súpermercados',
    description: 'Desde productos del hogar hasta ingredientes para cocinar',
    color: '#009688',
    image: 'http://www.apertura.com/export/sites/revistaap/img/SUPERMERCADOS/supermercado_dos.jpg_977672561.jpg',
    productCategories: [0, 1, 2],
    markets: [0]
}, {
    name: 'Verdulerías',
    description: 'Frutas, verduras y más, todo fresco',
    color: '#4CAF50',
    image: 'http://www.fns.usda.gov/sites/default/files/images/schooltoolkit_fv.jpg',
    productCategories: [],
    markets: [6, 7]
}, {
    name: 'Pescaderías',
    description: 'Todo el pescado del planeta',
    color: '#2196F3',
    image: 'http://www.elarco.es/upload/sample_08.jpg',
    productCategories: [],
    markets: [1, 2, 3, 4, 8, 9, 10]
}, {
    name: 'Carnicerías',
    description: 'Carnes y más',
    color: '#FF5722',
    image: 'http://www.cafexmedio.com.ar/images/carniceriaG.jpg',
    productCategories: [],
    markets: []
}, {
    name: 'Fiambrerías',
    description: 'Jamón, queso, lomo, todo lo que necesites',
    color: '#E91E63',
    image: 'http://www.guiagustosa.com/images/550ancho/15.jpg',
    productCategories: [],
    markets: [5]
}]);

seed(Market, [{
    name: 'Li Yuan Pun',
    description: 'El mejor súpermercado en la mejor zona, lo que quieras en tiempo record',
    category: 0,
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
    ],
    deliveryTime: 45,
    minOrder: 90,
    productCategories: [0, 1, 2],
    products: [0, 1, 2, 3]
}, {
    name: 'La esquina de Juan',
    description: 'El mejor súpermercado en la mejor zona, lo que quieras en tiempo record',
    category: 0,
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
    ],
    deliveryTime: 45,
    productCategories: [],
    products: [4, 5]
}, {
    name: 'Carlitos',
    description: 'El mejor súpermercado en la mejor zona, lo que quieras en tiempo record',
    category: 0,
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
    ],
    minOrder: 90,
    productCategories: [],
    products: [6, 7]
}, {
    name: 'Rosa',
    description: 'El mejor súpermercado en la mejor zona, lo que quieras en tiempo record',
    category: 0,
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
    ],
    deliveryTime: 70,
    minOrder: 200,
    productCategories: [],
    products: []
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
    ],
    deliveryTime: 30,
    minOrder: 60,
    productCategories: [],
    products: []
}, {
    name: 'San Manuel',
    description: 'El mejor súpermercado en la mejor zona, lo que quieras en tiempo record',
    category: 4,
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
    ],
    deliveryTime: 45,
    productCategories: [],
    products: []
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
    ],
    productCategories: [],
    products: []
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
    ],
    productCategories: [],
    products: []
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
    ],
    productCategories: [],
    products: []
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
    ],
    productCategories: [],
    products: []
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
    ],
    productCategories: [],
    products: []
}]);

seed(ProductCategory, [{
    name: 'Limpieza',
    image: 'http://www.apertura.com/export/sites/revistaap/img/SUPERMERCADOS/supermercado_dos.jpg_977672561.jpg'
}, {
    name: 'Higiene',
    image: 'http://www.apertura.com/export/sites/revistaap/img/SUPERMERCADOS/supermercado_dos.jpg_977672561.jpg'
}, {
    name: 'Cuidado facial',
    image: 'http://www.apertura.com/export/sites/revistaap/img/SUPERMERCADOS/supermercado_dos.jpg_977672561.jpg'
}]);

seed(Product, [{
    name: 'Ala',
    price: 10,
    barcode: '0000000001',
    description: 'Quita manchas al instante',
    category: 0
}, {
    name: 'Ala 2',
    price: 20,
    barcode: '0000000002',
    description: 'Quita manchas al instante',
    category: 0
}, {
    name: 'Ala 3',
    price: 30,
    barcode: '0000000003',
    description: 'Quita manchas al instante',
    category: 0
}, {
    name: 'Ala 4',
    price: 40,
    barcode: '0000000004',
    description: 'Quita manchas al instante',
    category: 0
}, {
    name: 'Papel higienico',
    price: 100,
    barcode: '0000000005',
    category: 1
}, {
    name: 'Papel higienico de oro',
    price: 2000,
    barcode: '0000000006',
    description: 'Vale la pena, no dudes al comprar un producto como este',
    category: 1
}, {
    name: 'Crema para los ojos',
    price: 30,
    barcode: '0000000007',
    description: 'Quita manchas al instante',
    category: 2
}, {
    name: 'Crema humectante',
    price: 40,
    barcode: '0000000008',
    description: 'Piel hidratada en cuestión de minutos',
    category: 2
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
