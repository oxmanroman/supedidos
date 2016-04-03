module supedidos.user {
    'use strict';

	export class AuthService {

        static $inject = [];

		constructor() {

		}
	}

	angular
		.module('supedidos.user')
		.service('Auth', AuthService);

}
