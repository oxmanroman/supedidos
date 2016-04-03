(function() {
	'use strict';

	angular
		.module('supedidos.order')
		.factory('Order', OrderFactory);

	OrderFactory.$inject = ['Restangular', 'localStorageService', 'envConfig', 'Geolocation'];

	function OrderFactory(Restangular, localStorageService, envConfig, Geolocation) {

		var storageKey = 'order-inprogress';

        // Constructor
        function Order(order) {
			var self = this;
			self.products = {};
			self.location = new Location(order ? order.location : null);
			if (order) {
				_.forIn(order.products, function(product, productId) {
					self.products[productId] = new Product(product);
				});
			}
			_.assignIn(self, Restangular.service('orders'));
			_.assignIn(self, _.omit(order, ['products', 'location']));
        }

		function Location(location) {
			_.assignIn(this, location);
		}

		Location.prototype.getAddress = function() {
			return (this.address ? this.address + ', ' : '') +
			       (this.city ? this.city : '');
		};

		Location.prototype.getCoordinates = function() {
			var self = this;
			return Geolocation.getCoordinates(self.getAddress() + envConfig.country).then(function(coords) {
				self.coordinates = coords;
			});
		};

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
			this.saveLocal();
        };

        Order.prototype.remove = function(productId) {
            delete this.products[productId];
			this.saveLocal();
        };

		Order.prototype.clear = function() {
			this.products = {};
			this.saveLocal();
		};

		Order.prototype.delete = function() {
			localStorageService.remove(storageKey);
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
				address: this.location.address,
				location: this.location.coordinates
			});
        };

		Order.prototype.saveLocal = function() {
			localStorageService.set(storageKey, this);
		};

		Order.get = function(id) {
			return Restangular.one('orders').get(id);
		};

		Order.getLocal = function() {
			return new Order(localStorageService.get(storageKey));
		};

        Restangular.extendModel('orders', function(order) {
            return new Order(order);
        });

		_.assignIn(Order, Restangular.service('orders'));

        // Return the constructor function
        return Order;
	}

})();
