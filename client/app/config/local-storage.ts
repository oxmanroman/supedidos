module supedidos.config {
	'use strict';

	angular
		.module('supedidos.config')
		.config(appConfig);

	appConfig.$inject = ['localStorageServiceProvider'];

    function appConfig(localStorageServiceProvider) {
        localStorageServiceProvider.setPrefix('supedidos');
    }

}
