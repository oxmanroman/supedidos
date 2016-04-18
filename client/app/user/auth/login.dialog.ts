module supedidos.user {
	'use strict';

	angular
		.module('supedidos.user')
		.directive('userAuthLoginDialog', userAuthLoginDialogDirective);

    let component : ng.IDirective = {
		restrict: 'E',
		templateUrl: 'app/user/auth/login.dialog.html',
		controllerAs: 'loginCtrl',
		bindToController: true,
		scope: {}
	};

	class MainPageController {

		static $inject = [];
		constructor() {

		}
	}

	function userAuthLoginDialogDirective() {
		// Directive definition
		component.controller = MainPageController;
		return component;
	}

}
