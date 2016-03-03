(function() {
	'use strict';

	angular
		.module('deliveryYa.market')
		.directive('marketListPage', marketListPageDirective);

	/**
	 * @ngdoc directive
	 * @name deliveryYa.market.directive:marketListPage
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
			templateUrl: '/app/market/list-page.component.html',
			scope: {
				markets: '='
			},
			controller: marketListPageController,
			controllerAs: 'ctrl',
			bindToController: true
		};
	}

	marketListPageController.$inject = [];

	function marketListPageController() {
		// var ctrl = this;
	}

})();