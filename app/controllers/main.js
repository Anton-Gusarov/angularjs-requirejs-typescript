/// <reference path='../../typings/all.d.ts' />
define(["require", "exports"], function (require, exports) {
    var MainController = (function () {
        function MainController($scope, API) {
            this.$scope = $scope;
            this.API = API;
            this.loading = false;
            /*$scope.items = this.API.items.getItems({
                length:10
            });*/
            $scope.items = [];
            $scope.vm = this;
        }
        MainController.prototype.loadMore = function () {
            var $scope = this.$scope, controller = this;
            this.loading = true;
            this.API.items.getItems({
                length: 10,
                start: this.$scope.items.length
            }, function (data) {
                $scope.items = $scope.items.concat(data);
                controller.loading = false;
            });
        };
        MainController.$inject = ['$scope', 'API'];
        return MainController;
    })();
    exports.MainController = MainController;
});
//# sourceMappingURL=main.js.map