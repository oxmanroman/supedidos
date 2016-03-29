(function() {
	'use strict';

	angular
		.module('supedidos.main')
		.directive('mainPage', mainPageDirective);

	/**
	 * @ngdoc directive
	 * @name supedidos.main.directive:mainPage
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
			templateUrl: 'app/main/page.component.html',
			scope: {
				location: '=',
				markets: '='
			},
			controller: mainPageController,
			controllerAs: 'ctrl',
			bindToController: true
		};
	}

	mainPageController.$inject = ['envConfig', 'Geolocation', '$state', 'Order'];

	function mainPageController(envConfig, Geolocation, $state, Order) {
		var ctrl = this;

		ctrl.country = envConfig.country;

		ctrl.order = Order.getLocal();

		if (!ctrl.order.location.city) {
			ctrl.order.location.city = ctrl.location.city;
		}

		ctrl.search = function() {
			if (_.isMatch(Order.getLocal().location, ctrl.order.location)) {
				$state.go('order.productCategories');
			} else {
				ctrl.order.clear();
				ctrl.order.location.getCoordinates().then(function() {
					ctrl.order.saveLocal();
					$state.go('order.productCategories');
				});
			}
		};
	}

})();
