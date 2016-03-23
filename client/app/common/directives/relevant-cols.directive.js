(function() {
    'use strict';

    angular
        .module('supedidos.common')
        .directive('spRelevantCols', spRelevantColsDirective);

    /**
     * @ngdoc directive
     * @name supedidos.common.directive:spRelevantCols
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

    spRelevantColsDirective.$inject = [];

    function spRelevantColsDirective() {
        // Directive definition
        return {
            restrict: 'A',
            link: link
        };

        function link (scope, elm, attrs) {
            var min = Number(attrs.minCols);
            var max = Number(attrs.maxCols);
            var col;
            var specialClass;

            var i = 0;
            for (var row = min; !col; row++) {
                var relativeRow = row > max ? max : row;
                i += relativeRow;
                if (row > max && scope.$index < i) {
                    col = max;
                } else if (scope.$index < i) {
                    col = row;
                }
                if (scope.$index === i - relativeRow) {
                    specialClass = ' first-of-row';
                }
                if (scope.$index === i - 1) {
                    specialClass = ' last-of-row';
                }
            }

            elm.addClass('flex-' + String(Math.floor(100 / col)) + (specialClass || ''));
        }

    }
})();
