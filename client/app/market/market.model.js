(function() {
	'use strict';

	angular
		.module('deliveryYa.market')
		.factory('Market', MarketFactory);

	MarketFactory.$inject = ['Restangular'];

	function MarketFactory(Restangular) {

        Restangular.extendModel('markets', function(market) {

			if (market.distance) {
				market.distanceBlocks = Math.ceil(market.distance / 100);
			}

            return market;
        });

        return Restangular.all('markets');
	}

})();
