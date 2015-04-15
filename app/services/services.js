define(["require", "exports", 'angular'], function (require, exports, angular) {
    var apiURL;
    var API = (function () {
        function API($resource, $location) {
            var l = $location;
            apiURL = l.protocol() + '://' + l.host() + (l.port() ? ':' + l.port() : '') + '/api';
            this.items = $resource(apiURL + '/items', {}, {
                getItems: {
                    method: 'GET',
                    isArray: true,
                    cache: true
                },
                saveItems: {
                    method: 'POST'
                }
            });
            this.malls = $resource(apiURL + '/malls', {}, {
                getMalls: {
                    method: 'GET',
                    isArray: true,
                    cache: true
                }
            });
        }
        return API;
    })();
    exports.API = API;
    exports.services = angular.module('services', ['ngResource', '$location']).service('API', API);
});
//# sourceMappingURL=services.js.map