(function() {
    'use strict';

    appConfig.$inject = ['$stateProvider'];

    function appConfig($stateProvider) {
        $stateProvider

        .state('main', {
            url: '/',
            template: '<main-page location="::location"></main-page>',
            controller: ['$scope', 'location', function($scope, location) {
                $scope.location = location;
            }],
            resolve: {
                location: ['dyGeolocation', function(dyGeolocation) {
                    return dyGeolocation.getByIp();
                }]
            }
        });
    };

    angular
        .module('deliveryYa.main')
        .config(appConfig);
})();
