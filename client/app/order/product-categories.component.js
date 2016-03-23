(function() {
	'use strict';

	angular
		.module('supedidos.order')
		.directive('orderProductCategories', orderProductCategoriesDirective);

	/**
	 * @ngdoc directive
	 * @name supedidos.order.directive:orderProductCategories
	 * @restrict E
	 * @scope
	 *
	 * @description
	 * Order products categories
	 *
	 */

	orderProductCategoriesDirective.$inject = [];

	function orderProductCategoriesDirective() {
		return {
			restrict: 'E',
			templateUrl: '/app/order/product-categories.component.html',
			scope: {
				categories: '='
			},
			controller: angular.noop,
			controllerAs: 'ctrl',
			bindToController: true
		};
	}

})();
