module supedidos.order {
	'use strict';
	import SP = supedidos.common;

	angular
		.module('supedidos.order')
		.config(config);

	config.$inject = ['$stateProvider'];

	function config($stateProvider) {
		$stateProvider

        .state('order', {
            url: '/pedido',
            abstract: true,
            views: {
                'main': {
                    template: '<order-page></order-page>'
                }
            }
        })

        .state('order.productCategories', {
            url: '/categorias',
            views: {
                'order': {
                    template: '<order-product-categories categories="::categories"></order-product-categories>',
                    controller: SP.passCtrlData({categories: 'categories'})
                }
            },
            resolve: {
                categories: ['ProductCategory', ProductCategory => ProductCategory.getList()]
            }
        })

        .state('order.products', {
            url: '/{categoryId:[0-9]{1,10}}/productos',
            views: {
                'order': {
                    template: '<order-product-list products="::products" category="::category"></order-product-list>',
                    controller: SP.passCtrlData({category: 'category', products: 'products'})
                }
            },
            resolve: {
                category: ['ProductCategory', '$stateParams', (ProductCategory, $stateParams) =>
                    ProductCategory.get($stateParams.categoryId)
                ],
                products: ['Product', '$state', '$stateParams', 'Order',
                          (Product, $state, $stateParams, Order) => {
                    var localOrder = Order.getLocal();
                    if (!localOrder.location.coordinates) {
                        $state.go('main');
                    } else {
                        return Product.getList(_.assign(
                            {category: $stateParams.categoryId},
                            localOrder.location.coordinates
                        ));
                    }
                }]
            }
        })

        .state('order.markets', {
            url: '/{orderId:[0-9]{1,10}}/negocios',
            views: {
                'order': {
                    template: '<order-market-list markets="::markets" order="::order"></order-market-list>',
                    controller: SP.passCtrlData({markets: 'markets', order: 'order'})
                }
            },
            resolve: {
                markets: ['Market', '$stateParams', (Market, $stateParams) =>
                    Market.one('order', $stateParams.orderId).getList()
                ],
                order: ['Order', '$stateParams', (Order, $stateParams) =>
                    Order.one($stateParams.orderId).get()
                ]
            }
        });
    }
}
