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
				location: '='
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

		var place = {
			name: 'Súper chino',
			/*jshint multistr: true */
			description: 'Súpermercado de las cadenas más grandes de súpers de latino-américa, \
			inigualable servicio y calidad.',
			rating: 3.5
		};
		ctrl.places = [];
		for (var placeI = 0; placeI < 9; placeI++) {
			var placeDemoI = angular.copy(place);
			placeDemoI.id = placeI;
			ctrl.places[placeI] = placeDemoI;
		}

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
