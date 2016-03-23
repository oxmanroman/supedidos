(function() {
    'use strict';

    angular
        .module('supedidos.common')
        .directive('spWhiteframeElevate', spWhiteframeElevateDirective);

    /**
     * @ngdoc directive
     * @name supedidos.common.directive:spWhiteframeElevate
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

    spWhiteframeElevateDirective.$inject = [];

    function spWhiteframeElevateDirective() {
        // Directive definition
        return {
            restrict: 'A',
            link: link
        };

        function link (scope, elm, attrs) {
            var elevation = 'md-whiteframe-' + attrs.mdWhiteframe + 'dp';
            var hoverElevation = 'md-whiteframe-' + attrs.spWhiteframeElevate + 'dp';

            elm.on('mouseenter', function() {
                elm.removeClass(elevation);
                elm.addClass(hoverElevation);
            });
            elm.on('mouseleave', function() {
                elm.removeClass(hoverElevation);
                elm.addClass(elevation);
            });
        }

    }
})();
