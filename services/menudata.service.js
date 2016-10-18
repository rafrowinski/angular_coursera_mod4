(function() {
    'use strict';
    angular.module('data').service('MenuDataService', MenuDataService)
        //There is no point in putting constants in separate files
        .constant('categoriesUrl', 'https://davids-restaurant.herokuapp.com/categories.json')
        .constant('menuItemsUrl', 'https://davids-restaurant.herokuapp.com/menu_items.json?category=');

    MenuDataService.$inject = ['$http', 'categoriesUrl'];

    function MenuDataService($http, categoriesUrl) {
        var service = this;

        service.getAllCategories = function() {
            return $http({
                method: 'GET',
                url: (categoriesUrl)
            });
        };

        service.getItemsForCategory = function(categoryShortName) {
            return $http({
                method: 'GET',
                url: (menuItemsUrl + categoryShortName)
            });
        };
    };
})();
