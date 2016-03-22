(function() {
    'use strict';

    angular
        .module('supedidos.common')
        .directive('dyFlexibleFlex', dyFlexibleFlexDirective);

    /**
     * @ngdoc directive
     * @name supedidos.common.directive:dyFlexibleFlex
     * @restrict A
     *
     * @description
     * Add needed md-col class to element by its index on an ng-repat
     * to be every row smaller.
     *
	 * @param {number=}      minCols   With how many cols does this directive start
	 * @param {number=}      maxCols   The max of cols in a row
     *
     */

    dyFlexibleFlexDirective.$inject = [];

    function dyFlexibleFlexDirective() {
        // Directive definition
        return {
            restrict: 'A',
            link: link
        };

        function link (scope, elm, attrs) {
            var flex;
            if (attrs.dyAffectedIndex.split(',').indexOf(String(scope.$index)) !== -1) {
                flex = attrs.dyAffectedFlex;
            } else {
                flex = attrs.dyDefaultFlex;
            }

            elm.addClass('flex-' + flex);
        }

    }
})();
