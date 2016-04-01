(function() {
	'use strict';

	angular
		.module('supedidos.common.components')
		.directive('spNavbar', spNavbarDirective);

	/**
	 * @ngdoc directive
	 * @name supedidos.common.components.directive:spNavbar
	 * @restrict E
	 * @scope
	 *
	 * @description
	 * Navigation bar, includes logo, profile, list view and search
	 *
	 */

	spNavbarDirective.$inject = [];

	function spNavbarDirective() {
		return {
			restrict: 'E',
			templateUrl: 'app/common/components/navbar.component.html',
			scope: {},
			controller: spNavbarController,
			controllerAs: 'navCtrl',
			bindToController: true
		};
	}

	spNavbarController.$inject = ['Order', '$document', '$scope'];

	function spNavbarController(Order, $document, $scope) {
		var ctrl = this;

		var body = angular.element($document[0].body);
		body.addClass('with-navbar');
		$scope.$on('$destroy', function() {
			body.removeClass('with-navbar');
		});

        ctrl.search = Order.getLocal().location.getAddress();
	}

})();
