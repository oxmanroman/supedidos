(function() {
	'use strict';

	angular
		.module('supedidos.order')
		.directive('orderProductList', orderProductListDirective);

	/**
	 * @ngdoc directive
	 * @name supedidos.order.directive:orderProductList
	 * @restrict E
	 * @scope
	 *
	 * @description
	 * Order products list
	 *
	 */

	orderProductListDirective.$inject = [];

	function orderProductListDirective() {
		return {
			restrict: 'E',
			templateUrl: '/app/order/product-list.component.html',
			scope: {
				products: '=',
				category: '='
			},
			controller: orderProductListController,
			controllerAs: 'ctrl',
			bindToController: true,
			require: ['orderProductList', '^orderPage'],
			link: link
		};

		function link(scope, elm, attrs, ctrls) {
			var ctrl = ctrls[0];
			var orderPageCtrl = ctrls[1];

			ctrl.order = orderPageCtrl.order;
		}
	}

	orderProductListController.$inject = ['$stateParams'];

	function orderProductListController($stateParams) {
		var ctrl = this;

		ctrl.srefParams = $stateParams;
	}

})();
