(function() {
   'use strict';

   angular
       .module('deliveryYa')
       .config(appConfig);

    function appConfig($urlRouterProvider, $locationProvider) {
        $urlRouterProvider.otherwise('/');
        $locationProvider.html5Mode(true);
    }

})();
