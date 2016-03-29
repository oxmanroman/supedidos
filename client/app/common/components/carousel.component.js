(function() {
	'use strict';

	angular
		.module('supedidos.common')
		.directive('spCarousel', spCarouselDirective);

	spCarouselDirective.$inject = [];

	function spCarouselDirective() {
		return {
			restrict: 'E',
			templateUrl: 'app/common/components/carousel.component.html',
			scope: {},
            controller: angular.noop,
            controllerAs: 'carouselCtrl',
            require: 'spCarousel',
            link: link,
            transclude: true
		};

        function link(scope, elm, attrs, ctrl) {
            var activeInterval;
            ctrl.activeIndex = 0;
            ctrl.items = elm[0].querySelectorAll('sp-carousel-item');

            function update() {
                var translation = -ctrl.activeIndex * 100;
                angular.element(elm[0].querySelector('.items')).css('transform', 'translateX(' + translation + '%)');
            }

            function createInterval() {
				clearInterval(activeInterval);
                activeInterval = setInterval(function() {
                    ctrl.activeIndex = ctrl.activeIndex === ctrl.items.length - 1 ? 0 : ctrl.activeIndex + 1;
                    update();
                    scope.$apply();
                }, Number(attrs.duration));
            }

            ctrl.changeIndex = function(index) {
                ctrl.activeIndex = index;
                update();
                createInterval();
            };

            elm.on('mouseenter', function() {
                clearInterval(activeInterval);
            });

            elm.on('mouseleave', _.flowRight(update, createInterval));

            createInterval();
        }
	}

})();
