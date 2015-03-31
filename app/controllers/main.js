/// <reference path='../../typings/all.d.ts' />
define(["require", "exports"], function (require, exports) {
    var MainController = (function () {
        function MainController($scope, API, adminMode) {
            this.$scope = $scope;
            this.API = API;
            this.adminMode = adminMode;
            this.loading = false;
            $scope.items = [];
            $scope.vm = this;
            $scope.adminMode = this.adminMode;
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
        MainController.prototype.select = function (index) {
            var $scope = this.$scope;
            $scope.items[index].selected = !$scope.items[index].selected;
        };
        MainController.$inject = ['$scope', 'API', 'admin'];
        return MainController;
    })();
    exports.MainController = MainController;
});
//# sourceMappingURL=main.js.map