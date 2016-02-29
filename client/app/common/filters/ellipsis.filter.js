(function() {
    'use strict';

    angular
        .module('deliveryYa.common')
        .filter('ellipsis', ellipsisFilter);

    /**
     * @ngdoc filter
     * @name deliveryYa.common.filter:ellipsis
     * @restrict A
     *
     * @description
     * Limit text to specified length and add ... at the end
     *
     * @param {number}       max        Limit text to max
     * @param {boolean}      wordwise   Don't cut a word limiting text
     * @param {string}       tail       What to append at the end of text
     *
     */

    function ellipsisFilter() {
        return function (value, max, wordwise, tail) {
            if (!value) {
                return '';
            }

            max = max ? max : 100;
            if (!max) {
                return value;
            }
            if (value.length <= max) {
                return value;
            }

            value = value.substr(0, max);
            if (angular.isUndefined(wordwise) || wordwise) {
                var lastspace = value.lastIndexOf(' ');
                if (lastspace !== -1) {
                    value = value.substr(0, lastspace);
                }
            }

            return value + (tail || ' …');
        };

    }
})();
