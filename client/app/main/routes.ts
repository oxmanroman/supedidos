module supedidos.main {
	'use strict';
	import SP = supedidos.common;

	angular
		.module('supedidos.main')
		.config(config);

	config.$inject = ['$stateProvider'];

	function config($stateProvider) {
        $stateProvider

        .state('main', {
            url: '/',
            views: {
                'main': {
                    template: '<main-page location="::location" markets="::markets"></main-page>',
					controller: SP.passCtrlData({location: 'location', markets: 'markets'})
                }
            },
            resolve: {
                location: ['Geolocation', (Geolocation) => Geolocation.getByIp()],
				markets: ['Market', (Market) => Market.getList({limit: 5})]
            }
        });
	}
}
