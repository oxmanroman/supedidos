(function() {
	'use strict';

	angular
		.module('deliveryYa.category')
		.factory('Category', CategoryFactory);

	CategoryFactory.$inject = ['Restangular'];

	function CategoryFactory(Restangular) {

        Restangular.extendModel('categories', function(category) {
            return category;
        });

        return Restangular.all('categories');
	}

})();
