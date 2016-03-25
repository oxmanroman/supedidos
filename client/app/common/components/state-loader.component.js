(function() {
	'use strict';

	angular
		.module('supedidos.common')
		.directive('spStateLoader', spStateLoaderDirective);

	/**
	 * @ngdoc directive
	 * @name supedidos.common.directive:spStateLoader
	 * @restrict E
	 * @scope
	 *
	 * @description
	 * Show loading indicator when a state is loading
	 *
	 */

	spStateLoaderDirective.$inject = ['$rootScope', '$compile', '$templateRequest'];

	function spStateLoaderDirective ($rootScope, $compile, $templateRequest) {
		return {
			restrict: 'A',
			compile: function() {
				// Get the template
				var loadingUrl = 'app/common/components/state-loader.component.html';

				return function link (scope, element) {
                    $templateRequest(loadingUrl).then(function(template) {
                        element.append($compile(template)(scope));
                    });

					// Listen to state changes
					$rootScope.$on('$stateChangeStart', function() {
						updateStatus(true);
					});
					$rootScope.$on('$stateChangeSuccess', function() {
						updateStatus(false);
					});
					$rootScope.$on('$stateChangeError', function() {
						updateStatus(false);
					});
					$rootScope.$on('$stateNotFound', function() {
						updateStatus(false);
					});

					function updateStatus(status) {
						if (status) {
							element.addClass('loading');
							scope.loadingOn = true;
						} else {
							element.removeClass('loading');
							scope.loadingOn = false;
						}
					}
				};
			}
		};
	}
})();
