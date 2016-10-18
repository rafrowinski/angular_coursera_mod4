(function() {
    'use strict';
    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .directive('foundItems', FoundItemsDirective)
        .directive('foundItemsTable', FoundItemsTableDirective)
        .directive('itemsLoaderIndicator', ItemsLoaderIndicatorDirective)
        .constant('menuJsonUrl', 'https://davids-restaurant.herokuapp.com/menu_items.json')
        .constant('listTemplate', 'templates/list.template.html')
        .constant('tableTemplate', 'templates/table.template.html')
        .constant('itemsLoaderTemplate', 'loader/itemsloaderindicator.template.html');

    NarrowItDownController.$inject = ['MenuSearchService'];

    function NarrowItDownController(MenuSearchService) {
        var controller = this;
        controller.phrase = '';
        controller.found = [];
        controller.loading = false;
        controller.itemsDisplayedAs = 'list'
        controller.isInitiated = false;

        controller.error = MenuSearchService.hasError()
        controller.doQuery = function() {
            controller.loading = true;
            controller.isInitiated = true;
            MenuSearchService.query(controller.phrase)
                .then(function(result) {
                    controller.found = result;
                    controller.loading = false;
                });
        }
        controller.remove = function(index) {
            controller.found.splice(index, 1)
        }
    };

    MenuSearchService.$inject = ['$http', '$filter', 'menuJsonUrl', '$q'];

    function MenuSearchService($http, $filter, menuJsonUrl, $q) {
        var service = this;
        var error = false;

        service.query = function(phrase) {
            if (phrase) {
                return $http({
                    method: 'GET',
                    url: (menuJsonUrl)
                }).then(function successCallback(response) {
                    var menuItems = response.data.menu_items;
                    var matchingItems = $filter('filter')(menuItems, {
                        'description': phrase
                    });
                    error = false;

                    return matchingItems;
                }, function errorCallback(response) {
                    error = true;

                    return {
                        'error': 'an unexpecteed error ocurred'
                    };
                });
            } else {
                return $q.when([]);
            }
        };

        service.hasError = function() {
            return error;
        };
    };

    FoundItemsDirective.$inject = ['listTemplate']

    function FoundItemsDirective(listTemplate) {
        var ddo = {
            templateUrl: listTemplate,
            restrict: 'E',
            scope: {
                foundItems: '<',
                onRemove: '='
            }
        };

        return ddo;
    };

    FoundItemsTableDirective.$inject = ['tableTemplate']

    function FoundItemsTableDirective(tableTemplate) {
        var ddo = {
            templateUrl: tableTemplate,
            restrict: 'E',
            scope: {
                foundItems: '<',
                onRemove: '='
            }
        };

        return ddo;
    };

    ItemsLoaderIndicatorDirective.$inject = ['itemsLoaderTemplate']

    function ItemsLoaderIndicatorDirective(itemsLoaderTemplate) {
        var ddo = {
            templateUrl: itemsLoaderTemplate,
            restrict: 'E'
        };

        return ddo;
    };

})();
