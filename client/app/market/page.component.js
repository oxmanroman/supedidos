(function() {
	'use strict';

	angular
		.module('supedidos.market')
		.directive('marketPage', marketPageDirective);

	/**
	 * @ngdoc directive
	 * @name supedidos.market.directive:marketPage
	 * @restrict E
	 * @scope
	 *
	 * @description
	 * Main page
	 *
	 */

	marketPageDirective.$inject = [];

	function marketPageDirective() {
		return {
			restrict: 'E',
			templateUrl: 'app/market/page.component.html',
			scope: {
				market: '='
			},
			controller: marketPageController,
			controllerAs: 'ctrl',
			bindToController: true
		};
	}

	marketPageController.$inject = [];

	function marketPageController() {
		// var ctrl = this;
	}

})();
