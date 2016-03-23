(function() {
    'use strict';

    appConfig.$inject = ['$stateProvider'];

    function appConfig($stateProvider) {
        $stateProvider

        .state('main', {
            url: '/',
            views: {
                'main': {
                    template: '<main-page location="::location" markets="::markets"></main-page>',
                    controller: ['$scope', 'location', 'markets',
                    function($scope, location, markets) {
                        $scope.location = location;
                        $scope.markets = markets;
                    }]
                }
            },
            resolve: {
                location: ['Geolocation', function(Geolocation) {
                    return Geolocation.getByIp();
                }],
                markets: ['Market', function(Market) {
                    return Market.getList({limit: 5});
                }]
            }
        });
    }

    angular
        .module('supedidos.main')
        .config(appConfig);
})();
