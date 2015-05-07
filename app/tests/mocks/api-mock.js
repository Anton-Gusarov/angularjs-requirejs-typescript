define(["require", "exports"], function (require, exports) {
    var API = (function () {
        function API() {
            this.items = new APIItemsMock();
            this.items.parent = this;
        }
        return API;
    })();
    exports.API = API;
    var APIRequest = (function () {
        function APIRequest(options, response) {
            this.options = options;
            this.response = response;
        }
        APIRequest.prototype.setResponse = function (response) {
            this.response = response;
        };
        return APIRequest;
    })();
    exports.APIRequest = APIRequest;
    var APIItemsMock = (function () {
        function APIItemsMock() {
            this.requests = [];
        }
        APIItemsMock.prototype.getItems = function (options, callback) {
            // there no any dependency injection is possible
            var request = new APIRequest(options);
            this.requests.push(request);
            setTimeout(function () {
                callback(request.response);
            }, 10);
        };
        APIItemsMock.prototype.clearRequests = function () {
            this.requests = [];
        };
        return APIItemsMock;
    })();
    exports.APIItemsMock = APIItemsMock;
});
//# sourceMappingURL=api-mock.js.map