(function() {
    'use strict';

    angular
        .module('supedidos.common.directives')
        .directive('spColor', spColorDirective);

    /**
     * @ngdoc directive
     * @name supedidos.common.directives.directive:spColor
     * @restrict A
     *
     * @description
     * Set color
     *
	 * @param {string=}      spColor   Image url
     *
     */

    spColorDirective.$inject = ['$parse'];

    function spColorDirective($parse) {
        // Directive definition
        return {
            restrict: 'A',
            link: link
        };

        function link (scope, elm, attrs) {
            attrs.$observe('spColor', function(value) {
    			var color = value.indexOf('#') === 0 ? value : $parse(value)(scope);
    			elm.css({
    				'color': color
    			});
    		});
        }

    }
})();
