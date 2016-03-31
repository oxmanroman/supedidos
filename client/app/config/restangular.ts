module supedidos.config {
	'use strict';

	angular
		.module('supedidos.config')
		.config(appConfig);

	appConfig.$inject = ['RestangularProvider'];

    function appConfig(RestangularProvider) {
        RestangularProvider.setBaseUrl('/api');

        RestangularProvider.setRestangularFields({
            id: '_id'
        });
    }

}
