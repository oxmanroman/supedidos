(function() {
   'use strict';

   angular.module('supedidos', [
       'supedidos.templates',
       'supedidos.common',
       'supedidos.main',
       'supedidos.market',
       'supedidos.product',
       'supedidos.productCategory',
       'supedidos.order'
   ]);

    var commonLibs = [
        // UI
        'ngMaterial',
        'pascalprecht.translate',
        'angularLazyImg',
        'angular-parallax',
        'angular-carousel',
        // Back-end
        'LocalStorageModule',
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ui.router',
        'validation.match',
        'restangular'
    ];

    // Modules
    angular.module('supedidos.common', commonLibs);
    angular.module('supedidos.templates', ['supedidos.common']);
    angular.module('supedidos.main', ['supedidos.common']);
    angular.module('supedidos.market', ['supedidos.common']);
    angular.module('supedidos.product', ['supedidos.common']);
    angular.module('supedidos.productCategory', ['supedidos.common']);
    angular.module('supedidos.order', ['supedidos.common']);
})();
