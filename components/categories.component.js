(function() {
    'use strict';
    angular.module('data').component('categoriesList', {
        templateUrl: 'templates/categories-list.template.html',
        bindings: {
            categories: "<"
        }
    });
})();
