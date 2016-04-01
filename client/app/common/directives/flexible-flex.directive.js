(function() {
    'use strict';

    angular
        .module('supedidos.common.directives')
        .directive('spFlexibleFlex', spFlexibleFlexDirective);

    /**
     * @ngdoc directive
     * @name supedidos.common.directives.directive:spFlexibleFlex
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

    spFlexibleFlexDirective.$inject = [];

    function spFlexibleFlexDirective() {
        // Directive definition
        return {
            restrict: 'A',
            link: link
        };

        function link (scope, elm, attrs) {
            var flex;
            if (attrs.affectedIndex.split(',').indexOf(String(scope.$index)) !== -1) {
                flex = attrs.affectedFlex;
            } else {
                flex = attrs.defaultFlex;
            }

            elm.addClass('flex-' + flex);
        }

    }
})();
