(function() {
    'use strict';
    angular.module('MenuApp')
        .config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function RoutesConfig($stateProvider, $urlRouterProvider) {

        // Redirect to tab 1 if no other URL matches
        $urlRouterProvider.otherwise('/');

        // Set up UI states
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'templates/home.template.html'
            })
            .state('categories', {
                url: '/categories',
                templateUrl: 'templates/categories.template.html',
                controller: 'CategoriesController as categoriesCtrl',
                resolve: {
                    categories: ['MenuDataService', function(MenuDataService) {
                        return MenuDataService.getAllCategories();
                    }]
                }
            })
            .state('items', {
                url: '/items/{categoryId}',
                templateUrl: 'templates/list.template.html',
                controller: 'ItemsController as itemsCtrl',
                resolve: {
                    items: ['MenuDataService','$stateParams', function(MenuDataService, $stateParams) {
                        return MenuDataService.getItemsForCategory($stateParams.categoryId);
                    }]
                }
            });
    }
})();
