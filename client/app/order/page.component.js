(function() {
	'use strict';

	angular
		.module('supedidos.order')
		.directive('orderPage', orderPageDirective);

	/**
	 * @ngdoc directive
	 * @name supedidos.order.directive:orderPage
	 * @restrict E
	 * @scope
	 *
	 * @description
	 * Order container page
	 *
	 */

	orderPageDirective.$inject = [];

	function orderPageDirective() {
		return {
			restrict: 'E',
			templateUrl: '/app/order/page.component.html',
			scope: {},
			controller: orderPageController,
			controllerAs: 'ctrl',
			bindToController: true
		};
	}

	orderPageController.$inject = ['$state', 'Order'];

	function orderPageController($state, Order) {
		var ctrl = this;

		ctrl.order = Order.getLocal();

		ctrl.ammountNumbers = _.range(1, 100);

		ctrl.submit = function() {
			ctrl.order.create().then(function(order) {
				$state.go('order.markets', {orderId: order._id});
			});
		};
	}

})();
