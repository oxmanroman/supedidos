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

    dyGeolocationService.$inject = ['$q', '$http', 'dyExternalScript'];

    function dyGeolocationService($q, $http, dyExternalScript) {
        // Service definition
        return {
            getByIp: getByIp,
            getCoordinates: getCoordinates
        };

        function getByIp () {
            return $q(function(resolve, reject) {
                dyExternalScript.load('//l2.io/ip.js?var=myip').then(function() {
                    /* global myip */
                    window.locationCallback = function(data) {
                        window.approxLocation = data;
                    };
                    dyExternalScript.load('//ip-api.com/json/' + myip + '?callback=locationCallback').then(
                        function() {
                            resolve(window.approxLocation);
                        }, reject
                    );
                });
            });
        }

        function getCoordinates(address) {
            return $http.get('//maps.google.com/maps/api/geocode/json', {
                params: {
                    sensor: false,
                    address: address
                }
            }).then(function(res) {
                return res.data.results[0].geometry.location;
            });
        }

    }
})();
