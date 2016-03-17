(function() {
	'use strict';

	angular
		.module('deliveryYa.product')
		.directive('productListPage', productListPageDirective);

	/**
	 * @ngdoc directive
	 * @name deliveryYa.product.directive:productListPage
	 * @restrict E
	 * @scope
	 *
	 * @description
	 * Main page
	 *
	 */

	productListPageDirective.$inject = [];

	function productListPageDirective() {
		return {
			restrict: 'E',
			templateUrl: '/app/product/list-page.component.html',
			scope: {
				products: '='
			},
			controller: productListPageController,
			controllerAs: 'ctrl',
			bindToController: true
		};
	}

	productListPageController.$inject = ['Order'];

	function productListPageController(Order) {
		var ctrl = this;

		ctrl.order = new Order();
		ctrl.ammountNumbers = _.range(1, 100);

		ctrl.submit = function() {
			ctrl.order.create().then(function(order) {
				console.log(order);
			});
		}
	}

})();
