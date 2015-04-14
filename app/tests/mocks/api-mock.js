/// <reference path='../../../typings/all.d.ts' />
define(["require", "exports"], function (require, exports) {
    var API = (function () {
        function API() {
            this.items = new APIItems();
        }
        return API;
    })();
    exports.API = API;
    var APIItems = (function () {
        function APIItems() {
        }
        APIItems.prototype.getItems = function (options, callback) {
        };
        return APIItems;
    })();
    exports.APIItems = APIItems;
});
//# sourceMappingURL=api-mock.js.map