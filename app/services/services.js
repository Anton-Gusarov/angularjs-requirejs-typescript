define(["require", "exports", 'angular', './api/catalog', './api/user'], function (require, exports, angular, _catalog, _user) {
    var API = (function () {
        function API($resource, $location) {
            this.userToken = '';
            this.apiURL = '';
            this.$inject = ['$resource', '$location'];
            var l = $location;
            this.apiURL = l.protocol() + '://' + l.host() + (l.port() ? ':' + l.port() : '') + '/api';
            _catalog.API_Catalog.call(this, $resource);
            _user.API_User.call(this, $resource);
        }
        return API;
    })();
    exports.API = API;
    applyMixins(API, [_catalog.API_Catalog, _user.API_User]);
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