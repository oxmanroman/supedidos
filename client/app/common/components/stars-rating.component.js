(function() {
	'use strict';

	angular
		.module('supedidos.common')
		.directive('spStarsRating', spStarsRatingDirective);

	/**
	 * @ngdoc directive
	 * @name supedidos.common.directive:spStarsRating
	 * @restrict E
	 * @scope
	 *
	 * @description
	 * Show as many stars as the score says
	 *
	 */

	spStarsRatingDirective.$inject = [];

	function spStarsRatingDirective() {
		return {
			restrict: 'E',
			templateUrl: 'app/common/components/stars-rating.component.html',
			scope: {
                score: '='
            },
			controller: spStarsRatingController,
			controllerAs: 'ctrl',
			bindToController: true
		};
	}

	spStarsRatingController.$inject = [];

	function spStarsRatingController() {
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
