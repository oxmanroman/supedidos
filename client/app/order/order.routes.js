(function() {
    'use strict';

    appConfig.$inject = ['$stateProvider'];

    function appConfig($stateProvider) {
        $stateProvider

        .state('order', {
            url: '/pedido',
            abstract: true,
            views: {
                'main': {
                    template: '<order-page></order-page>'
                }
            }
        })

        .state('order.productCategories', {
            url: '/categorias?addr&lat&lng',
            views: {
                'order': {
                    template: '<order-product-categories categories="::categories"></order-product-categories>',
                    controller: ['$scope', 'categories', function($scope, categories) {
                        $scope.categories = categories;
                    }]
                }
            },
            resolve: {
                categories: ['ProductCategory', function(ProductCategory) {
                    return ProductCategory.getList();
                }]
            }
        })

        .state('order.products', {
            url: '/{categoryId:[0-9]{1,10}}/productos?addr&lat&lng',
            views: {
                'order': {
                    template: '<order-product-list products="::products" category="::category"></order-product-list>',
                    controller: ['$scope', 'products', 'category', function($scope, products, category) {
                        $scope.products = products;
                        $scope.category = category;
                    }]
                }
            },
            resolve: {
                category: ['ProductCategory', '$stateParams', function(ProductCategory, $stateParams) {
                    return ProductCategory.get($stateParams.categoryId);
                }],
                products: ['Product', '$stateParams', function(Product, $stateParams) {
                    return Product.getList({
                        category: $stateParams.categoryId,
                        lat: $stateParams.lat,
                        lng: $stateParams.lng
                    });
                }]
            }
        })

        .state('order.markets', {
            url: '/{orderId:[0-9]{1,10}}/negocios',
            views: {
                'order': {
                    template: '<order-market-list markets="::markets" order="::order"></order-market-list>',
                    controller: ['$scope', 'markets', 'order', function($scope, markets, order) {
                        $scope.markets = markets;
                        $scope.order = order;
                        debugger;
                    }]
                }
            },
            resolve: {
                markets: ['Market', '$stateParams', function(Market, $stateParams) {
                    return Market.one('order', $stateParams.orderId).getList().then(function(list) {
                        console.log('ready market list', list);
                        return list;
                    });
                }],
                order: ['Order', '$stateParams', function(Order, $stateParams) {
                    return Order.get($stateParams.orderId).then(function(order) {
                        console.log('ready market order', order);
                        return order;
                    });
                }]
            }
        });
    }

    angular
        .module('supedidos.order')
        .config(appConfig);
})();
