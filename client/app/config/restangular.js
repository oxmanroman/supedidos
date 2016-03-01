(function() {
   'use strict';

   angular
       .module('deliveryYa')
       .config(appConfig);

    appConfig.$inject = ['RestangularProvider'];

    function appConfig(RestangularProvider) {
        RestangularProvider.setBaseUrl('/api');

        RestangularProvider.setRestangularFields({
            id: '_id'
        });

    }

})();
