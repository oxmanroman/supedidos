(function() {
   'use strict';

   angular
       .module('supedidos')
       .config(appConfig);

    appConfig.$inject = ['localStorageServiceProvider'];

    function appConfig(localStorageServiceProvider) {
        localStorageServiceProvider.setPrefix('supedidos');
    }

})();
