(function() {
   'use strict';

    var appConfig = function($urlRouterProvider, $locationProvider) {
        $urlRouterProvider.otherwise('/');
        $locationProvider.html5Mode(true);
    };

    angular
        .module('deliveryYa')
        .config(appConfig);
})();
