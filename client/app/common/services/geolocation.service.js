(function() {
    'use strict';

    angular
        .module('supedidos.common.services')
        .service('Geolocation', GeolocationService);

    /**
     * @ngdoc service
     * @name supedidos.common.services.service:Geolocation
     *
     * @description
     * Alter html head and load external script
     *
     */

    GeolocationService.$inject = ['$q', '$http'];

    function GeolocationService($q, $http) {
        // Service definition
        return {
            getByIp: getByIp,
            getCoordinates: getCoordinates
        };

        function getByIp () {
            return $q(function(resolve, reject) {
                $http.get('https://api.ipify.org/').then(function(ip) {
                    $http.get('http://ipinfo.io/' + ip.data + '/geo').then(function(location) {
                        resolve(location.data);
                    }, reject);
                }, reject);
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
