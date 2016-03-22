(function() {
	'use strict';

	angular
		.module('supedidos.order')
		.directive('orderMarketList', orderMarketListDirective);

	/**
	 * @ngdoc directive
	 * @name supedidos.order.directive:orderMarketList
	 * @restrict E
	 * @scope
	 *
	 * @description
	 * Order markets list page
	 *
	 */

	orderMarketListDirective.$inject = [];

	function orderMarketListDirective() {
		return {
			restrict: 'E',
			templateUrl: '/app/order/market-list.component.html',
			scope: {
				markets: '='
			},
			controller: orderMarketListController,
			controllerAs: 'ctrl',
			bindToController: true
		};
	}

	orderMarketListController.$inject = [];

	function orderMarketListController() {
		var ctrl = this;

		console.log(ctrl.markets);
	}

})();
