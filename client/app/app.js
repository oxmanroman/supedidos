(function() {
   'use strict';

   angular.module('deliveryYa', [
       'deliveryYa.common',
       'deliveryYa.main',
       'deliveryYa.market',
       'deliveryYa.category'
   ]);

    var commonLibs = [
        // UI
        'ngMaterial',
        'pascalprecht.translate',
        // Back-end
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ui.router',
        'validation.match',
        'restangular'
    ];

    // Modules
    angular.module('deliveryYa.common', commonLibs);
    angular.module('deliveryYa.main', ['deliveryYa.common']);
    angular.module('deliveryYa.market', ['deliveryYa.common']);
    angular.module('deliveryYa.category', ['deliveryYa.common']);
})();
