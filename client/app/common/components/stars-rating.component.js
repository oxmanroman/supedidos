(function() {
	'use strict';

	angular
		.module('deliveryYa.common')
		.directive('dyStarsRating', dyStarsRatingDirective);

	/**
	 * @ngdoc directive
	 * @name deliveryYa.common.directive:dyStarsRating
	 * @restrict E
	 * @scope
	 *
	 * @description
	 * Show as many stars as the score says
	 *
	 */

	dyStarsRatingDirective.$inject = [];

	function dyStarsRatingDirective() {
		return {
			restrict: 'E',
			templateUrl: '/app/common/components/stars-rating.component.html',
			scope: {
                score: '='
            },
			controller: dyStarsRatingController,
			controllerAs: 'ctrl',
			bindToController: true
		};
	}

	dyStarsRatingController.$inject = [];

	function dyStarsRatingController() {
		var ctrl = this;

        var filled = Math.floor(ctrl.score);
        var empty = 5 - Math.round(ctrl.score);

        ctrl.filled = range(filled);
        ctrl.half = (ctrl.score - filled) >= 0.5;
        ctrl.empty = range(empty);

        function range(n) {
            return new Array(n);
        }
	}

})();
