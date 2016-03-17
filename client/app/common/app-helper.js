(function() {
    'use strict';

    angular
        .module('deliveryYa.common')
        .service('appHelper', appHelperService);

    /**
     * @ngdoc service
     * @name deliveryYa.common.service:appHelper
     *
     * @description
     * Alter html head and load external script
     *
     */

    appHelperService.$inject = [];

    function appHelperService() {
        // Service definition
        return {
            composeCtrl: composeCtrl,
            passCtrlData: passCtrlData,
            execAllowedOnAuthChange: execAllowedOnAuthChange,
            reloadOnAuthChange: reloadOnAuthChange
        };

        /**
         * Compose functions to create a controller function for a state
         */
        function composeCtrl(...composablesFns) {
            var injection = _.union.apply(_, composablesFns.map(fn => fn.$inject));

            composedController.$inject = injection;
            function composedController(...args) {
                var ctrl = this;
                composablesFns.forEach(composableFn => {
                    var fnInjection = composableFn.$inject.map((module) => {
                        return args[injection.indexOf(module)];
                    });
                    composableFn.apply(ctrl, fnInjection);
                });
            };
            return composedController;
        }

        /**
         * Create a function that injects the angular keys passed in the obj of the parameters
         * and expose the keys in the scope named as the value
         */
        function passCtrlData(modules) {
            var injection = _.union(['$scope'], _.keys(modules));
            ctrl.$inject = injection;
            function ctrl(...args) {
                var $scope = args[0];
                _.slice(injection, 1).map((module, index) => {
                    $scope[modules[module]] = args[index + 1];
                });
            }
            return ctrl;
        }

        /**
         * Injects the RouteAllowed and runs the execOnAuthChange with injected module
         *
         * This function assumes:
         * 		* The parameter will correspond to and injectable module that will be a function
         */
        function execAllowedOnAuthChange(module) {
            ctrl.$inject = ['$scope', 'Auth', module];
            function ctrl($scope, Auth, rule) {
                Auth.onLogChange(rule).disposeOnDestroy($scope);
            }
            return ctrl;
        }

        /**
         * Reload the state on Auth log change
         */
        function reloadOnAuthChange() {
            ctrl.$inject = ['$scope', 'Auth', '$state'];
            function ctrl($scope, Auth, $state) {
                Auth.onLogChange($state.reload).disposeOnDestroy($scope);
            }
            return ctrl;
        }

    }
})();
