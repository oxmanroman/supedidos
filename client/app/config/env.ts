module supedidos.config {
	'use strict';

	angular
		.module('supedidos.config')
        .constant('envConfig', envConfig());
    
    function envConfig() {
        return {lang:'es-ar',country:'Argentina'};
    }
    
}
