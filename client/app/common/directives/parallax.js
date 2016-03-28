(function() {
    'use strict';

    angular
        .module('supedidos.common')
        .directive('spParallax', spParallaxDirective)
        .directive('spParallaxBackground', spParallaxBackgroundDirective);

    spParallaxDirective.$inject = ['$window'];

    function spParallaxDirective($window) {
        // Directive definition
        return {
            restrict: 'A',
            link: link
        };

        function link (scope, elm, attrs) {

            function setPosition() {
                var middleFromTop = elm[0].getBoundingClientRect().top + (elm[0].offsetHeight / 2);
                var middleOfWindow = ($window.innerHeight / 2);
                var translation = (middleFromTop - middleOfWindow) * 1 / middleOfWindow;
                var parsedTranslation = translation < 0 ? 0 : translation;
                elm.css('transform', 'translateY(' + (attrs.verticalMargin * parsedTranslation) + 'px)');
            }

            setPosition();

            angular.element($window).bind('scroll', setPosition);
            angular.element($window).bind('touchmove', setPosition);
        }
    }

    spParallaxBackgroundDirective.$inject = ['$window'];

    function spParallaxBackgroundDirective($window) {
        // Directive definition
        return {
            restrict: 'A',
            transclude: true,
            template: '<div ng-transclude></div>',
            link: link
        };

        function link (scope, elm, attrs) {
            var ratio = Number(attrs.ratio);
            elm.css('background-size', 'calc(100% * ' + (ratio + 1) + ')');

            function setPosition() {
                var calcValY = -(elm.prop('offsetTop') - $window.pageYOffset) * ratio;
                elm.css('background-position', '50% ' + calcValY + 'px');
            }

            // set our initial position - fixes webkit background render bug
            angular.element($window).bind('load', function() {
                setPosition();
                scope.$apply();
            });

            angular.element($window).bind('scroll', setPosition);
            angular.element($window).bind('touchmove', setPosition);
        }
    }
})();
