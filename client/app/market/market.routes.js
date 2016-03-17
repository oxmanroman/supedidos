(function() {
    'use strict';

    appConfig.$inject = ['$stateProvider'];

    function appConfig($stateProvider) {
        $stateProvider

        .state('markets', {
            url: '/mercados?addr&lat&lng&filter',
            template: '<market-list-page markets="::markets" categories="::categories"></market-list-page>',
            controller: ['$scope', 'markets', 'categories', function($scope, markets, categories) {
                $scope.markets = markets;
                $scope.categories = categories;
            }],
            resolve: {
                markets: ['Market', '$stateParams', function(Market, $stateParams) {
                    return Market.getList($stateParams);
                }],
                categories: ['Category', function(Category) {
                    return Category.getList();
                }]
            }
        })

        .state('market', {
            url: '/mercados/{marketId:[0-9]{1,10}}/:marketName',
            template: '<market-page market="::market"></market-page>',
            controller: ['$scope', 'market', function($scope, market) {
                $scope.market = market;
            }],
            resolve: {
                market: ['Market', '$stateParams', function(Market, $stateParams) {
                    return Market.get($stateParams.marketId);
                }]
            }
        });
    }

    angular
        .module('deliveryYa.market')
        .config(appConfig);
})();
