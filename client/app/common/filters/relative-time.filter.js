(function() {
    'use strict';

    angular
        .module('supedidos.common')
        .filter('relativeTime', relativeTimeFilter);

    /**
     * @ngdoc filter
     * @name supedidos.common.filter:relativeTime
     * @restrict A
     *
     * @description
     * Get duration in minutes and returns the corresponding relative time with qty and unit
     *
     * @param {string}       type       Type of the duration
     *                                  Types: seconds, minutes, hours, days, weeks, months, years
     *                                  Default: milliseconds
     *
     */

    relativeTimeFilter.$inject = ['$translate'];

    function relativeTimeFilter($translate) {
        return function (value, type) {
            var duration = moment.duration(value, type);
            var types = ['year', 'month', 'week', 'day', 'hour', 'minute', 'second', 'millisecond'];

            for (var i = 0; i < types.length; i++) {
                var typeQty = duration[types[i] + 's']();
                if (typeQty > 0) {
                    var unit = typeQty > 1 ? types[i] + 's' : types[i];
                    return typeQty + ' ' + $translate.instant(unit.toUpperCase());
                }
            }
        };

    }
})();
