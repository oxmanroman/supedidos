(function() {
	'use strict';

	angular
		.module('supedidos.order')
		.factory('Product', ProductFactory);

	ProductFactory.$inject = ['Restangular'];

	function ProductFactory(Restangular) {

        // Constructor
        function Product(product) {
			_.assignIn(this, product);
        }

        Restangular.extendModel('products', function(product) {
            return new Product(product);
        });

		_.assignIn(Product, Restangular.service('products'));

        // Return the constructor function
        return Product;
	}

})();
