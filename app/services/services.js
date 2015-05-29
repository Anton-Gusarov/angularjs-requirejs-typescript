define(["require", "exports", 'angular', './api/catalog'], function (require, exports, angular, _catalog) {
    var API = (function () {
        function API($resource, $location) {
            this.apiURL = '';
            this.$inject = ['$resource', '$location'];
            var l = $location;
            this.apiURL = l.protocol() + '://' + l.host() + (l.port() ? ':' + l.port() : '') + '/api';
            _catalog.API_Catalog.call(this, $resource);
            this.user = $resource(this.apiURL + '/user', {}, {
                getMalls: {
                    method: 'GET',
                    isArray: true
                }
            });
        }
        return API;
    })();
    exports.API = API;
    applyMixins(API, [_catalog.API_Catalog]);
    function applyMixins(derivedCtor, baseCtors) {
        baseCtors.forEach(function (baseCtor) {
            Object.getOwnPropertyNames(baseCtor.prototype).forEach(function (name) {
                derivedCtor.prototype[name] = baseCtor.prototype[name];
            });
        });
    }
    exports.applyMixins = applyMixins;
    exports.services = angular.module('services', ['ngResource']).service('API', API);
});
//# sourceMappingURL=services.js.map