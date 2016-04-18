module supedidos.user {
	'use strict';

	let Restangular;

    angular
        .module('supedidos.user')
        .factory('User', UserFactory);

    UserFactory.$inject = ['Restangular'];

    function UserFactory(_Restangular) {
        Restangular = _Restangular;
        return User;
    }

    export class User {

        constructor(user) {
			_.assignIn(this, user);

            Restangular.extendModel('products', function(user) {
                return new User(user);
            });

            _.assignIn(User, Restangular.service('users'));
		}
    }
}
