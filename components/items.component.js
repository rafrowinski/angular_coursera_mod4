(function() {
    'use strict';
    angular.module('data').component('itemsList', {
        templateUrl: 'templates/list.template.html',
        bindings: {
            items: '<'
        }
    });
})();
