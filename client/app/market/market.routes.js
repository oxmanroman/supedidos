(function() {
    'use strict';

    appConfig.$inject = ['$stateProvider'];

    function appConfig($stateProvider) {
        $stateProvider

        .state('markets', {
            url: '/mercados?lat&lng&filter',
            template: '<market-list-page markets="::markets"></market-list-page>',
            controller: ['$scope', 'markets', function($scope, markets) {
                $scope.markets = markets;
            }],
            resolve: {
                markets: ['Market', '$stateParams', function(Market, $stateParams) {
                    return Market.getList($stateParams);
                }]
            }
        });
    }

    angular
        .module('deliveryYa.market')
        .config(appConfig);
})();
