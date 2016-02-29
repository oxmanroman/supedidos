(function() {
    'use strict';

    angular
        .module('deliveryYa.common')
        .service('dyExternalScript', dyExternalScriptService);

    /**
     * @ngdoc service
     * @name deliveryYa.common.service:dyExternalScript
     *
     * @description
     * Alter html head and load external script
     *
     */

    dyExternalScriptService.$inject = ['$document', '$q'];

    function dyExternalScriptService($document, $q) {
        // Service definition
        return {
            load: load
        };

        function load (src) {
            var deferred = $q.defer();
            var script = $document[0].createElement('script');
            script.onload = script.onreadystatechange = deferred.resolve;
            script.onerror = deferred.reject;
            script.src = src;
            $document[0].body.appendChild(script);
            return deferred.promise;
        }

    }
})();
