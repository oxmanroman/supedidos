(function() {
    'use strict';

    angular
        .module('supedidos.common')
        .directive('spBackImg', spBackImgDirective);

    /**
     * @ngdoc directive
     * @name supedidos.common.directive:spBackImg
     * @restrict A
     *
     * @description
     * Set background image
     *
	 * @param {string=}      spBackImg   Image url
     *
     */

    spBackImgDirective.$inject = ['$parse'];

    function spBackImgDirective($parse) {
        // Directive definition
        return {
            restrict: 'A',
            link: link
        };

        function link (scope, elm, attrs) {
            attrs.$observe('spBackImg', function(value) {
    			var url = value.indexOf('http') === 0 ? value : $parse(value)(scope);
    			elm.css({
    				'background-image': 'url(' + url + ')'
    			});
    		});
        }

    }
})();
