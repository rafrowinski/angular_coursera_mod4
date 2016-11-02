(function() {
    'use strict';
    angular.module('data').component('categories', {
        templateUrl: 'templates/category.template.html',
        controller: 'MenuDataService', //will be available as $ctrl by default
        bindings: {
            categories: "<"
        }
    });
})();
