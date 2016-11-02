(function() {
    'use strict';
    angular.module('data').component('itemsList', {
        templateUrl: 'templates/item-list.template.html',
        bindings: {
            items: '<'
        }
    });
})();
