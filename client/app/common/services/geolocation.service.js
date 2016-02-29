(function() {
    'use strict';

    angular
        .module('deliveryYa.common')
        .service('dyGeolocation', dyGeolocationService);

    /**
     * @ngdoc service
     * @name deliveryYa.common.service:dyGeolocation
     *
     * @description
     * Alter html head and load external script
     *
     */

    dyGeolocationService.$inject = ['$q', 'dyExternalScript'];

    function dyGeolocationService($q, dyExternalScript) {
        // Service definition
        return {
            getByIp: getByIp
        };

        function getByIp () {
            return $q(function(resolve, reject) {
                dyExternalScript.load('HTTP://l2.io/ip.js?var=myip').then(function() {
                    /* global myip */
                    window.locationCallback = function(data) {
                        window.approxLocation = data;
                    };
                    dyExternalScript.load('http://ip-api.com/json/' + myip + '?callback=locationCallback').then(
                        function() {
                            resolve(window.approxLocation);
                        }, reject
                    );
                });
            });
        }

    }
})();
