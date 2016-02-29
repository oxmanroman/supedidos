'use strict';

angular.module('deliveryYa.auth', [
  'deliveryYa.constants',
  'deliveryYa.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
