(function() {
    'use strict';

    appConfig.$inject = ['$stateProvider'];

    function appConfig($stateProvider) {
        $stateProvider

        .state('main', {
            url: '/',
            template: '<main-page location="::location" markets="::markets"></main-page>',
            controller: ['$scope', 'location', 'markets', function($scope, location, markets) {
                $scope.location = location;
                $scope.markets = markets;
            }],
            resolve: {
                location: ['dyGeolocation', function(dyGeolocation) {
                    return dyGeolocation.getByIp();
                }],
                markets: ['Market', function(Market) {
                    return Market.getList();
                }]
            }
        });
    }

    angular
        .module('deliveryYa.main')
        .config(appConfig);
})();
