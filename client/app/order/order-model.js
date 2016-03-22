(function() {
	'use strict';

	angular
		.module('supedidos.order')
		.factory('Order', OrderFactory);

	OrderFactory.$inject = ['Restangular'];

	function OrderFactory(Restangular) {

        // Constructor
        function Order(order) {
			console.log(order);
            this.products = {};
			_.assignIn(this, order, Restangular.all('orders'));
        }

		function Product(product) {
			this.ammount = 1;
			_.assignIn(this, product);
		}

		Product.prototype.getPrice = function() {
			return this.ammount * this.price;
		};

        Order.prototype.add = function(product) {
            var orderProduct = this.products[product._id];
            if (orderProduct) {
                if (orderProduct.ammount < 99) {
                    orderProduct.ammount++;
                }
            } else {
                this.products[product._id] = new Product(product);
            }
        };

        Order.prototype.remove = function(productId) {
            delete this.products[productId];
        };

		Order.prototype.clear = function() {
			this.products = {};
		};

        Order.prototype.count = function(id) {
            return this.products[id] ? this.products[id].ammount : 0;
        };

		Order.prototype.getPrice = function() {
			var price = 0;
			_.forIn(this.products, function(product) {
				price += product.getPrice();
			});
			return price;
        };

		Order.prototype.isEmpty = function() {
            return _.keys(this.products).length === 0;
        };

		Order.prototype.create = function() {
            return this.post({
				products: _.values(this.products).map(function(item) {
					return item.barcode;
				}),
				address: this.address,
				location: this.location
			});
        };

		Order.prototype.make = function() {
            return this.post({
				products: _.values(this.products).map(function(item) {
					return item._id;
				}),
				market: this.market
			});
        };

		Order.get = function(id) {
			return Restangular.one('orders').get(id);
		}

        Restangular.extendModel('orders', function(order) {
            return new Order(order);
        });

		_.assignIn(Order, Restangular.service('orders'));

        // Return the constructor function
        return Order;
	}

})();
