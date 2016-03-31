module supedidos.main {
	'use strict';

	angular
		.module('supedidos.main')
		.directive('mainPage', mainPageDirective);

	let component : ng.IDirective = {
		restrict: 'E',
		templateUrl: 'app/main/page.component.html',
		controllerAs: 'ctrl',
		bindToController: true,
		scope: {
			location: '=',
			markets: '='
		}
	};

	class MainPageController {
		country: string;
		order: any;
		location: any;

		static $inject = ['envConfig', 'Geolocation', '$state', 'Order'];
		constructor(envConfig, Geolocation, private $state, private Order) {
			this.country = envConfig.country;
			this.order = Order.getLocal();

			if (!this.order.location.city) {
				this.order.location.city = this.location.city;
			}
		}

		search() {
			if (_.isMatch(this.Order.getLocal().location, this.order.location)) {
				this.$state.go('order.productCategories');
			} else {
				this.order.clear();
				this.order.location.getCoordinates().then(function() {
					this.order.saveLocal();
					this.$state.go('order.productCategories');
				});
			}
		};
	}

	function mainPageDirective(){
		// Directive definition
		component.controller = MainPageController;
		return component;
	}

}
