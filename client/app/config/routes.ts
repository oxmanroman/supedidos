module supedidos.config {
	'use strict';

	angular
		.module('supedidos.config')
		.config(appConfig);

	appConfig.$inject = ['$urlRouterProvider', '$locationProvider'];

    function appConfig($urlRouterProvider, $locationProvider) {
        $urlRouterProvider.otherwise('/');
        $locationProvider.html5Mode(true);
    }

}
