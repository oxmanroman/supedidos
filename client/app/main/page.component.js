(function() {
	'use strict';

	angular
		.module('deliveryYa.main')
		.directive('mainPage', mainPageDirective);

	/**
	 * @ngdoc directive
	 * @name deliveryYa.main.directive:mainPage
	 * @restrict E
	 * @scope
	 *
	 * @description
	 * Main page
	 *
	 */

	mainPageDirective.$inject = [];

	function mainPageDirective() {
		return {
			restrict: 'E',
			templateUrl: '/app/main/page.component.html',
			scope: {
				location: '=',
				markets: '='
			},
			controller: mainPageController,
			controllerAs: 'ctrl',
			bindToController: true
		};
	}

	mainPageController.$inject = ['envConfig'];

	function mainPageController(envConfig) {
		var ctrl = this;

		ctrl.country = envConfig.country;

		ctrl.finder = {
			city: ctrl.location.city
		};

		var service = {
			name: 'Súpermercado',
			description: 'Todo lo que necesites al alcance de tu mano'
		};
		ctrl.services = [];
		for (var serviceI = 0; serviceI < 7; serviceI++) {
			var serviceDemoI = angular.copy(service);
			serviceDemoI.id = serviceI;
			ctrl.services[serviceI] = serviceDemoI;
		}

	}

})();
