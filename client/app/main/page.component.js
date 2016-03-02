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
				markets: '=',
				categories: '='
			},
			controller: mainPageController,
			controllerAs: 'ctrl',
			bindToController: true
		};
	}

	mainPageController.$inject = ['envConfig', 'dyGeolocation', '$state'];

	function mainPageController(envConfig, dyGeolocation, $state) {
		var ctrl = this;

		ctrl.country = envConfig.country;

		ctrl.finder = {
			city: ctrl.location.city,
			search: search
		};

		function search() {
			var address = (ctrl.finder.address ? ctrl.finder.address + ', ' : '') +
			              (ctrl.finder.city ? ctrl.finder.city + ', ' : '') +
						  ctrl.country;

			dyGeolocation.getCoordinates(address).then(function(coords) {
				$state.go('markets', _.assign(
					coords,
					{ filter: ctrl.finder.filter }
				));
			});

		}
	}

})();
