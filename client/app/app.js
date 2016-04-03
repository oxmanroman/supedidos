(function() {
   'use strict';

   angular.module('supedidos', [
       'supedidos.templates',
       'supedidos.common',
       'supedidos.common.components',
       'supedidos.common.directives',
       'supedidos.common.filters',
       'supedidos.common.services',
       'supedidos.config',
       'supedidos.main',
       'supedidos.market',
       'supedidos.product',
       'supedidos.productCategory',
       'supedidos.order',
       'supedidos.user',
       // UI
       'ngMaterial',
       'pascalprecht.translate',
       'angularLazyImg',
       // Back-end
       'LocalStorageModule',
       'ngCookies',
       'ngResource',
       'ngSanitize',
       'ui.router',
       'validation.match',
       'restangular'
   ]);

    // Modules
    angular.module('supedidos.config', [
        'angularLazyImg',
        'LocalStorageModule',
        'restangular',
        'ui.router',
        'pascalprecht.translate'
    ]);
    angular.module('supedidos.common', []);
    angular.module('supedidos.common.components', []);
    angular.module('supedidos.common.directives', []);
    angular.module('supedidos.common.filters', []);
    angular.module('supedidos.common.services', []);
    angular.module('supedidos.templates', []);
    angular.module('supedidos.main', []);
    angular.module('supedidos.market', []);
    angular.module('supedidos.product', []);
    angular.module('supedidos.productCategory', []);
    angular.module('supedidos.order', []);
    angular.module('supedidos.user', []);
})();
