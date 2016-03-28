(function() {
   'use strict';

   angular
       .module('supedidos')
       .config(appConfig);

    appConfig.$inject = ['lazyImgConfigProvider'];

    function appConfig(lazyImgConfigProvider) {
        lazyImgConfigProvider.setOptions({
            offset: 1000
        });
    }

})();
