(function() {
	'use strict';

	angular
		.module('deliveryYa.product')
		.factory('Product', ProductFactory);

	ProductFactory.$inject = ['Restangular'];

	function ProductFactory(Restangular) {

        Restangular.extendModel('products', function(product) {

			if (product.distance) {
				product.distanceBlocks = Math.ceil(product.distance / 100);
			}

            return product;
        });

        return Restangular.all('products');
	}

})();
