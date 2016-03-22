(function() {
    'use strict';

    angular
        .module('supedidos.common')
        .directive('dyBackImg', dyBackImgDirective);

    /**
     * @ngdoc directive
     * @name supedidos.common.directive:dyBackImg
     * @restrict A
     *
     * @description
     * Set background image
     *
	 * @param {string=}      dyBackImg   Image url
     *
     */

    dyBackImgDirective.$inject = ['$parse'];

    function dyBackImgDirective($parse) {
        // Directive definition
        return {
            restrict: 'A',
            link: link
        };

        function link (scope, elm, attrs) {
            attrs.$observe('dyBackImg', function(value) {
    			var url = value.indexOf('http') === 0 ? value : $parse(value)(scope);
    			elm.css({
    				'background-image': 'url(' + url + ')'
    			});
    		});
        }

    }
})();
