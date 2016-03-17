(function() {
    'use strict';

    appConfig.$inject = ['$stateProvider'];

    function appConfig($stateProvider) {
        $stateProvider

        .state('products', {
            url: '/productos?addr&lat&lng&category',
            template: '<product-list-page products="::products"></product-list-page>',
            controller: ['$scope', 'products', function($scope, products) {
                $scope.products = products;
            }],
            resolve: {
                products: ['Product', '$stateParams', function(Product, $stateParams) {
                    return Product.getList($stateParams);
                }]
            }
        })

        .state('product', {
            url: '/productos/{productId:[0-9]{1,10}}/:productName',
            template: '<product-page product="::product"></product-page>',
            controller: ['$scope', 'product', function($scope, product) {
                $scope.product = product;
            }],
            resolve: {
                product: ['Product', '$stateParams', function(Product, $stateParams) {
                    return Product.get($stateParams.productId);
                }]
            }
        });
    }

    angular
        .module('deliveryYa.product')
        .config(appConfig);
})();
