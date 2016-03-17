(function() {
	'use strict';

	angular
		.module('deliveryYa.marketCategory')
		.factory('MarketCategory', MarketCategoryFactory);

	MarketCategoryFactory.$inject = ['Restangular'];

	function MarketCategoryFactory(Restangular) {

        Restangular.extendModel('market-category', function(marketCategory) {
            return marketCategory;
        });

        return Restangular.all('market-category');
	}

})();
