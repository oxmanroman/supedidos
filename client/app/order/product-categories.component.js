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
			controller: orderProductCategoriesController,
			controllerAs: 'ctrl',
			bindToController: true
		};
	}

	orderProductCategoriesController.$inject = ['$stateParams'];

	function orderProductCategoriesController($stateParams) {
		var ctrl = this;

		ctrl.getSrefParams = function(category) {
			console.log(_.assign({category: category}, $stateParams));
			return _.assign({categoryId: category}, $stateParams);
		};
	}

})();
