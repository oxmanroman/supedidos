module supedidos.main {
	'use strict';

	angular
		.module('supedidos.main')
		.config(config);

	config.$inject = ['$stateProvider'];

	function config($stateProvider) {
        $stateProvider

        .state('main', {
            url: '/',
            views: {
                'main': {
                    template: '<main-page location="::location" markets="::markets"></main-page>',
                    controller: ['$scope', 'location', 'markets',
                    ($scope, location, markets) => {
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
}
