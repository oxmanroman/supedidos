module supedidos.user {
    'use strict';

	export class AuthInterceptorService {

        static $inject = ['$rootScope', '$q', '$cookies', '$injector', 'Util'];

		constructor($rootScope, $q, private $cookies, $injector, Util) {

		}

        // Add authorization token to headers
        request(config) {
            config.headers = config.headers || {};
            // TODO check if the request is going to the same origin, check config.url
            if (this.$cookies.get('token')) {
                config.headers.Authorization = 'Bearer ' + this.$cookies.get('token');
            }
            return config;
        }

	}

	angular
		.module('supedidos.user')
		.service('AuthInterceptor', AuthInterceptorService);

}
