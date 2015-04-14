define(["require", "exports", 'angular'], function (require, exports, angular) {
    var apiURL = 'http://localhost:8081/api';
    var API = (function () {
        function API($resource) {
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
    exports.services = angular.module('services', ['ngResource']).service('API', API);
});
//# sourceMappingURL=services.js.map