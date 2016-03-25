(function() {
	'use strict';

	angular
		.module('supedidos.market')
		.directive('marketListPage', marketListPageDirective);

	/**
	 * @ngdoc directive
	 * @name supedidos.market.directive:marketListPage
	 * @restrict E
	 * @scope
	 *
	 * @description
	 * Main page
	 *
	 */

	marketListPageDirective.$inject = [];

	function marketListPageDirective() {
		return {
			restrict: 'E',
			templateUrl: 'app/market/list-page.component.html',
			scope: {
				markets: '=',
				categories: '='
			},
			controller: marketListPageController,
			controllerAs: 'ctrl',
			bindToController: true
		};
	}

	marketListPageController.$inject = [];

	function marketListPageController() {
		var ctrl = this;
		console.log(ctrl.markets);
	}

})();
