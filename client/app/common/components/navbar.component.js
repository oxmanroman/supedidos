(function() {
	'use strict';

	angular
		.module('supedidos.common')
		.directive('dyNavbar', dyNavbarDirective);

	/**
	 * @ngdoc directive
	 * @name supedidos.common.directive:dyNavbar
	 * @restrict E
	 * @scope
	 *
	 * @description
	 * Navigation bar, includes logo, profile, list view and search
	 *
	 */

	dyNavbarDirective.$inject = [];

	function dyNavbarDirective() {
		return {
			restrict: 'E',
			templateUrl: '/app/common/components/navbar.component.html',
			scope: {},
			controller: dyNavbarController,
			controllerAs: 'navCtrl',
			bindToController: true
		};
	}

	dyNavbarController.$inject = ['$stateParams', '$document', '$scope'];

	function dyNavbarController($stateParams, $document, $scope) {
		var ctrl = this;

		var body = angular.element($document[0].body);
		body.addClass('with-navbar');
		$scope.$on('$destroy', function() {
			body.removeClass('with-navbar');
		});

        ctrl.search = $stateParams.addr;
	}

})();
