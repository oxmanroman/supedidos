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

	mainPageController.$inject = [];

	function mainPageController() {
		var ctrl = this;

		ctrl.finder = {
			city: ctrl.location.city
		};

		var demo = {
			name: 'Súper chino',
			/*jshint multistr: true */
			description: 'Súpermercado de las cadenas más grandes de súpers de latino-américa, \
			inigualable servicio y calidad.',
			rating: 3.5
		};
		ctrl.places = [];
		for (var i = 0; i < 15; i++) {
			var demoI = angular.copy(demo);
			demoI.id = i;
			ctrl.places[i] = demoI;
		}

	}

})();
