(function() {
   'use strict';

   angular
       .module('deliveryYa')
       .config(appConfig);

    appConfig.$inject = ['$urlRouterProvider', '$locationProvider'];
    
    function appConfig($urlRouterProvider, $locationProvider) {
        $urlRouterProvider.otherwise('/');
        $locationProvider.html5Mode(true);
    }

})();
