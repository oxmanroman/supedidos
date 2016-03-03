(function() {
    'use strict';

    angular
        .module('deliveryYa.common')
        .directive('dyColor', dyColorDirective);

    /**
     * @ngdoc directive
     * @name deliveryYa.common.directive:dyColor
     * @restrict A
     *
     * @description
     * Set color
     *
	 * @param {string=}      dyColor   Image url
     *
     */

    dyColorDirective.$inject = ['$parse'];

    function dyColorDirective($parse) {
        // Directive definition
        return {
            restrict: 'A',
            link: link
        };

        function link (scope, elm, attrs) {
            attrs.$observe('dyColor', function(value) {
    			var color = value.indexOf('#') === 0 ? value : $parse(value)(scope);
    			elm.css({
    				'color': color
    			});
    		});
        }

    }
})();
