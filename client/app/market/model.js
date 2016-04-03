(function() {
	'use strict';

	angular
		.module('supedidos.market')
		.factory('Market', MarketFactory);

	MarketFactory.$inject = ['Restangular'];

	function MarketFactory(Restangular) {

        // Constructor
        function Market(market) {
			_.assignIn(this, market);
        }

        Restangular.extendModel('markets', function(market) {
            return new Market(market);
        });

		_.assignIn(Market, Restangular.service('markets'));

        // Return the constructor function
        return Market;
	}

})();
