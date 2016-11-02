(function() {
    'use strict';
    angular.module('data')
        .controller('DetailsController', DetailsController)
        .constant('noImageUrl', "{{ site.baseurl }}/images/noimage.jpg");
    DetailsController.$inject = ['ImageService', 'images', 'itemDetails', 'noImageUrl'];

    function DetailsController(ImageService, images, itemDetails, noImageUrl) {
        var controller = this;
        controller.item = itemDetails;
        controller.image = noImageUrl;
        if (images.data.items.length > 0) {
            controller.image = images.data.items[0]['media']['m'];
        }
    };
})();
