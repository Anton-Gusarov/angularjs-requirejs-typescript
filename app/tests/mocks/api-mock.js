var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", './reqres-mock'], function (require, exports, reqres) {
    var API = (function () {
        function API() {
            this.items = new APIItemsMock(true);
            this.items.parent = this;
        }
        return API;
    })();
    exports.API = API;
    var APIRequest = (function (_super) {
        __extends(APIRequest, _super);
        function APIRequest(options, response, callback) {
            _super.call(this, response, callback);
            this.options = options;
            this.response = response;
        }
        return APIRequest;
    })(reqres.Request);
    exports.APIRequest = APIRequest;
    var APIItemsMock = (function (_super) {
        __extends(APIItemsMock, _super);
        function APIItemsMock() {
            _super.apply(this, arguments);
            this.requests = [];
        }
        APIItemsMock.prototype.getItems = function (options, callback) {
            return this.request(new APIRequest(options), callback);
        };
        return APIItemsMock;
    })(reqres.ReqRes);
    exports.APIItemsMock = APIItemsMock;
});
//# sourceMappingURL=api-mock.js.map