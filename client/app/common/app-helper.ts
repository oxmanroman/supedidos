module supedidos.common {

    export interface IZeroConstructor {
		(...args: any[]) : void;
	}

    export interface IPromiseConstructor {
		(...args: any[]) : ng.IPromise<any|void>;
	}

    export interface IInjectionObject {
        [x: string]: string;
    };

    /**
     * Injects the RouteAllowed and runs the execOnAuthChange with injected module
     *
     * This function assumes:
     * 		* The parameter will correspond to and injectable module that will be a function
     */
    export function execAllowedOnAuthChange(module:string) {
        ctrl.$inject = ['$scope', 'Auth', module];
        function ctrl($scope, Auth, rule) {
            Auth.onLogChange(rule).disposeOnDestroy($scope);
        }
        return ctrl;
    }

    /**
     * Reload the state on Auth log change
     */
    export function reloadOnAuthChange() {
        ctrl.$inject = ['$scope', 'Auth', '$state'];
        function ctrl($scope, Auth, $state) {
            Auth.onLogChange(() => {
                $state.go($state.current.name, $state.params, {reload: true});
            }).disposeOnDestroy($scope);
        }
        return ctrl;
    }

    /**
     * Reload the state on Auth log change
     */
    export function redirectOnAuthChange(state:string, params?:Object) {
        ctrl.$inject = ['$scope', 'Auth', '$state'];
        function ctrl($scope, Auth, $state) {
            Auth.onLogChange(() => {
                $state.go(state, params, {reload: true});
            }).disposeOnDestroy($scope);
        }
        return ctrl;
    }

	/**
     * Create promise constructor
     */
    export function partialPromiseConstructor(...partial) : IPromiseConstructor {
        return (...args) => {
            return partial[0].apply(this, _.tail(partial).concat(args));
        };
    }

    /**
     * Create route expected rule
     */
    export function routeRule(modules:[string], rule:IPromiseConstructor|IZeroConstructor) {
        ctrl.$inject = modules;
        function ctrl(...args) {
            function checkPermissions() {
                return rule.apply(this, args);
            }
            return checkPermissions().then(() => checkPermissions);
        }
        return ctrl;
    }
}
