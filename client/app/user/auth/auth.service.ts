module supedidos.user {
    'use strict';

	export class AuthService {
        currentUser: any;
        userRoles: any;

        static $inject = ['$http', '$cookies', 'User', '$mdDialog'];

		constructor(private $http, private $cookies, private User, private $mdDialog) {
            this.currentUser = {};

            if ($cookies.get('token')) {
                debugger;
                this.currentUser = User.get();
            }
		}

        /**
         * Authenticate user and save token
         *
         * @param  {Object}   user     - login info
         * @return {Promise}
         */
        login(ev) {
            return this.$mdDialog.show({
                template: '<user-auth-login-dialog></user-auth-login-dialog>',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            }).then(() => {
                console.log('great');
            }, () => {
                console.log('not logged');
            });
            // return this.$http.post('/auth/local', {email, password})
            // .then(res => {
            //     this.$cookies.put('token', res.data.token);
            //     this.currentUser = this.User.get();
            //     return this.currentUser.$promise;
            // })
            // .catch(err => {
            //     this.logout();
            //     return err.data;
            // });
        }

        /**
         * Delete access token and user info
         */
        logout() {
            this.$cookies.remove('token');
            this.currentUser = {};
        }

        /**
         * Create a new user
         *
         * @param  {Object}   user     - user info
         * @return {Promise}
         */
        createUser(user) {
          return this.User.save(user,
            data => {
              this.$cookies.put('token', data.token);
              this.currentUser = this.User.get();
              return user;
            },
            err => {
              this.logout();
              return err;
            }).$promise;
        }

        /**
         * Change password
         *
         * @param  {String}   oldPassword
         * @param  {String}   newPassword
         * @return {Promise}
         */
        changePassword(oldPassword, newPassword) {
            return this.User.changePassword({ id: this.currentUser._id }, {
                oldPassword: oldPassword,
                newPassword: newPassword
            }).$promise;
        }

        /**
         * Gets all available info on a user
         *   (synchronous|asynchronous)
         *
         * @return {Object|Promise}
         */
        getCurrentUser() {
            if (arguments.length === 0) {
                return this.currentUser;
            }

            return this.currentUser.hasOwnProperty('$promise') ? this.currentUser.$promise : this.currentUser;
        }

        /**
         * Check if a user is logged in
         *   (synchronous|asynchronous)
         *
         * @return {Bool|Promise}
         */
        isLoggedIn() {
            if (arguments.length === 0) {
                return this.currentUser.hasOwnProperty('role');
            }

            return this.getCurrentUser()
            .then(user => user.hasOwnProperty('role'));
        }

        /**
         * Check if a user has a specified role or higher
         *   (synchronous|asynchronous)
         *
         * @param  {String}     role     - the role to check against
         * @return {Bool|Promise}
         */
        hasRole(role) {
            var hasRole = (r, h) =>
                this.userRoles.indexOf(r) >= this.userRoles.indexOf(h);

            if (arguments.length < 2) {
                return hasRole(this.currentUser.role, role);
            }

            return this.getCurrentUser()
            .then(user =>
                user.hasOwnProperty('role') ? hasRole(user.role, role) : false
            );
        }

        /**
         * Check if a user is an admin
         *   (synchronous|asynchronous)
         *
         * @return {Bool|Promise}
         */
        isAdmin() {
            return this.hasRole(['admin']);
        }

        /**
         * Get auth token
         *
         * @return {String} - a token string used for authenticating
         */
        getToken() {
            return this.$cookies.get('token');
        }
	}

	angular
		.module('supedidos.user')
		.service('Auth', AuthService);

}
