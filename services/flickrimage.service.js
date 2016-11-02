(function() {
    'use strict';
    angular.module('data').service('ImageService', ImageService)
        //There is no point in putting constants in separate files
        .constant('flickImageAPIUrl', 'https://api.flickr.com/services/feeds/photos_public.gne');

    ImageService.$inject = ['$http', 'flickImageAPIUrl'];

    function ImageService($http, flickImageAPIUrl) {
        var service = this;

        service.getImage = function(query) {
            return $http({
                method: 'JSONP',
                url: (flickImageAPIUrl),
                params: {
                    tags: query.replace(/[^a-zA-Z ]/g, "").trim(),
                    tagmode: "any",
                    safe_search: 1,
                    content_type: 1,
                    sort: "interestingness-desc",
                    jsoncallback: 'JSON_CALLBACK',
                    format: "json"
                }
            });
        };
    };
})();
