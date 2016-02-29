(function() {
   'use strict';

   angular.module('deliveryYa', [
       'deliveryYa.common',
       'deliveryYa.main'
   ]);

    var commonLibs = [
        // UI
        'ngMaterial',
        // Back-end
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ui.router',
        'validation.match'
    ];

    // Modules
    angular.module('deliveryYa.common', commonLibs);
    angular.module('deliveryYa.main', ['deliveryYa.common']);
})();
