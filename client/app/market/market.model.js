(function() {
	'use strict';

	angular
		.module('deliveryYa.market')
		.factory('Market', MarketFactory);

	MarketFactory.$inject = ['Restangular'];

	function MarketFactory(Restangular) {

        Restangular.extendModel('markets', function(market) {

            market.logTest = function() {
                console.log('log', market);
            };

            return market;
        });

        return Restangular.all('markets');
	}

})();
