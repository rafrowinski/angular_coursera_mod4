(function() {
    'use strict';
    angular.module('data')
        .controller('ItemsController', ItemsController);
    ItemsController.$inject = ['MenuDataService', 'items'];

    function ItemsController(MenuDataService, items) {
        var controller = this;
        controller.groupName = items.data['category'].name;
        controller.items = items.data['menu_items'];
    };

})();
