(function() {
    'use strict';

    appConfig.$inject = ['$stateProvider'];

    function appConfig($stateProvider) {
        $stateProvider

        .state('main', {
            url: '/',
            template: '<main-page location="::location" markets="::markets" categories="::categories"></main-page>',
            controller: ['$scope', 'location', 'markets', 'categories',
                         function($scope, location, markets, categories) {
                $scope.location = location;
                $scope.markets = markets;
                $scope.categories = categories;
            }],
            resolve: {
                location: ['dyGeolocation', function(dyGeolocation) {
                    return dyGeolocation.getByIp();
                }],
                markets: ['Market', function(Market) {
                    return Market.getList({limit: 5});
                }],
                categories: ['Category', function(Category) {
                    return Category.getList();
                }]
            }
        });
    }

    angular
        .module('deliveryYa.main')
        .config(appConfig);
})();
