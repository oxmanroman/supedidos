'use strict';

import _ from 'lodash';

var totalProducts = 621;

function getRandomProducts() {
    var products = [];
    var quantity = _.random(totalProducts * 0.6, totalProducts);
    for (var i = 0; i < quantity; i++) {
        var product = null;
        while (!product) {
            var possible = _.random(totalProducts);
            if (products.indexOf(possible) === -1) {
                product = possible;
            }
        }
        products.push(product);
    }
    return products;
}

exports.list = [
    {
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
        productCategories: _.range(13),
        products: getRandomProducts()
    },
    {
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
        productCategories: _.range(13),
        products: getRandomProducts()
    },
    {
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
        productCategories: _.range(13),
        products: getRandomProducts()
    },
    {
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
        productCategories: _.range(13),
        products: getRandomProducts()
    },
    {
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
        productCategories: _.range(13),
        products: getRandomProducts()
    },
    {
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
        productCategories: _.range(13),
        products: getRandomProducts()
    },
    {
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
        productCategories: _.range(13),
        products: getRandomProducts()
    },
    {
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
        productCategories: _.range(13),
        products: getRandomProducts()
    },
    {
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
        productCategories: _.range(13),
        products: getRandomProducts()
    },
    {
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
        productCategories: _.range(13),
        products: getRandomProducts()
    },
    {
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
        productCategories: _.range(13),
        products: getRandomProducts()
    }
];
