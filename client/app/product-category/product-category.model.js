(function() {
	'use strict';

	angular
		.module('supedidos.productCategory')
		.factory('ProductCategory', ProductCategoryFactory);

	ProductCategoryFactory.$inject = ['Restangular'];

	function ProductCategoryFactory(Restangular) {

        Restangular.extendModel('product-category', function(productCategory) {
            return productCategory;
        });

        return Restangular.all('product-category');
	}

})();
