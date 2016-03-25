'use strict';

var list = [
    { name: 'Arroz', image: '//s3-us-west-2.amazonaws.com/supedidos/assets/img/product-categories/rice.jpg' },
    { name: 'Garbanzos', image: '//s3-us-west-2.amazonaws.com/supedidos/assets/img/product-categories/chickpeas.jpg' },
    { name: 'Condimentos', image: '//s3-us-west-2.amazonaws.com/supedidos/assets/img/product-categories/spices.jpg' },
    { name: 'Aderezos', image: '//s3-us-west-2.amazonaws.com/supedidos/assets/img/product-categories/condiments.jpg' },
    { name: 'Salsas', image: '//s3-us-west-2.amazonaws.com/supedidos/assets/img/product-categories/sauces.jpg' },
    { name: 'Azúcar', image: '//s3-us-west-2.amazonaws.com/supedidos/assets/img/product-categories/sugar.jpg' },
    { name: 'Golosinas', image: '//s3-us-west-2.amazonaws.com/supedidos/assets/img/product-categories/candies.jpg' },
    { name: 'Harina', image: '//s3-us-west-2.amazonaws.com/supedidos/assets/img/product-categories/flour.jpg' },
    { name: 'Huevos', image: '//s3-us-west-2.amazonaws.com/supedidos/assets/img/product-categories/eggs.jpg' },
    { name: 'Puré', image: '//s3-us-west-2.amazonaws.com/supedidos/assets/img/product-categories/mashed-potatoes.jpg' },
    { name: 'Postres', image: '//s3-us-west-2.amazonaws.com/supedidos/assets/img/product-categories/desserts.jpg' },
    { name: 'Sopas', image: '//s3-us-west-2.amazonaws.com/supedidos/assets/img/product-categories/soups.jpg' },
    { name: 'Caldos', image: '//s3-us-west-2.amazonaws.com/supedidos/assets/img/product-categories/broths.jpg' }
];

exports.list = list.map(function(category, index) {
    category._id = index;
    return category;
});
